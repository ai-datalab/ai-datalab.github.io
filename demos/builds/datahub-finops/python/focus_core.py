"""Small-file FOCUS ingestion shared by the local prototype and Fabric loader."""
from __future__ import annotations

import csv
import hashlib
import io
import json
import re
from collections import defaultdict
from datetime import date, datetime, timezone
from decimal import Decimal, InvalidOperation, localcontext

MAX_BYTES = 20 * 1024 * 1024
MAX_ROWS = 100_000
MAX_FILES = 100
MONEY = ("BilledCost", "EffectiveCost")
OPTIONAL_MONEY = ("ListCost", "ContractedCost", "ListUnitPrice", "ContractedUnitPrice")
QUANTITIES = ("ConsumedQuantity", "PricingQuantity")
DECIMALS = (*MONEY, *OPTIONAL_MONEY, *QUANTITIES)
OPTIONAL_DECIMALS = (*OPTIONAL_MONEY, *QUANTITIES)
TOKENS = ("InputTokens", "OutputTokens", "CachedInputTokens", "CacheWriteTokens")
DATES = ("BillingPeriodStart", "BillingPeriodEnd", "ChargePeriodStart", "ChargePeriodEnd")
REQUIRED = (*MONEY, *DATES, "BillingCurrency", "BillingAccountId", "ServiceName")


def account_label(row):
    name = row["BillingAccountName"]
    suffix = f' ({row["BillingAccountId"]})' if name else row["BillingAccountId"]
    return f'{row["Provider"]} / {name}{suffix}'


def subaccount_label(row):
    name, identifier = row["SubAccountName"], row["SubAccountId"]
    if not name and not identifier:
        return ""
    suffix = f" ({identifier})" if name and identifier else ""
    return f'{row["Provider"]} / {name or identifier}{suffix}'


def resource_label(row):
    value = row["ResourceId"] or row["ResourceName"]
    return f'{row["Provider"]} / {value}' if value else ""


DIMENSIONS = {
    "Billing account": account_label,
    "Sub-account": subaccount_label,
    "Service": lambda row: row["ServiceName"],
    "Region": lambda row: row["RegionName"] or row["RegionId"],
    "Resource": resource_label,
    "SKU": lambda row: f'{row["Provider"]} / {row["SkuId"]}' if row["SkuId"] else "",
    "Charge category": lambda row: row["ChargeCategory"],
    "Charge frequency": lambda row: row["ChargeFrequency"],
    "Pricing category": lambda row: row["PricingCategory"],
    "Application tag": lambda row: row["TagApplication"],
    "Environment tag": lambda row: row["TagEnvironment"],
    "Business unit tag": lambda row: row["TagBusinessUnit"],
    "Cost centre tag": lambda row: row["TagCostCenter"],
}
FIELDS = (
    "SourceId", "SourceFile", "SourceHash", "SourceRow", "Provider", "BillingAccountId",
    "BillingAccountName", "SubAccountId", "SubAccountName", "ServiceName", "ServiceCategory",
    "RegionId", "RegionName", "AvailabilityZone", "ResourceId", "ResourceName", "ResourceType",
    "SkuId", "SkuPriceId", "ChargeCategory", "ChargeClass", "ChargeDescription", "ChargeFrequency",
    "PricingCategory", "CommitmentDiscountCategory", "CommitmentDiscountId", "CommitmentDiscountName",
    "CommitmentDiscountStatus", "CommitmentDiscountType", "ConsumedUnit", "PricingUnit",
    "Tags", "TagApplication", "TagEnvironment", "TagBusinessUnit", "TagCostCenter",
    "BillingCurrency", *DATES, *DECIMALS,
    "Model", "Workload", *TOKENS, "RawRecord",
)


class ImportFailure(ValueError):
    def __init__(self, issues: list[str]):
        self.issues = issues
        super().__init__("; ".join(issues))


def text(value: str | None) -> str:
    value = (value or "").strip()
    return "" if value.upper() == "NULL" else value


def amount(value: str, column: str) -> Decimal:
    if not re.fullmatch(r"[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?", value):
        raise ValueError(f"{column} must be a finite decimal, not {value!r}")
    try:
        result = Decimal(value)
    except InvalidOperation as error:
        raise ValueError(f"{column} is not a decimal") from error
    parts = result.as_tuple()
    trailing_zeros = len(parts.digits) - len("".join(map(str, parts.digits)).rstrip("0"))
    if result.copy_abs() >= Decimal("1e20") or (result and parts.exponent + trailing_zeros < -18):
        raise ValueError(f"{column} exceeds the prototype's decimal(38,18) precision")
    return result


def timestamp(value: str, column: str) -> str:
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError as error:
        raise ValueError(f"{column} must be an ISO date or timestamp") from error
    if parsed.tzinfo:
        parsed = parsed.astimezone(timezone.utc).replace(tzinfo=None)
    return parsed.isoformat(sep=" ", timespec="seconds")


def parse_files(files: list[dict[str, str]], source_id: str) -> dict:
    """Treat all files as one complete snapshot; never deduplicate charge rows."""
    if not isinstance(source_id, str) or not re.fullmatch(r"[A-Za-z0-9_-]{1,64}", source_id):
        raise ImportFailure(["Source ID must be 1-64 letters, digits, underscores or hyphens."])
    if not isinstance(files, list) or not 1 <= len(files) <= MAX_FILES:
        raise ImportFailure([f"Select between 1 and {MAX_FILES} CSV files."])
    rows, reports, issues, warnings = [], [], [], set()
    total_bytes = 0
    names, hashes = set(), set()
    for file in files:
        if not isinstance(file, dict) or not all(isinstance(file.get(k), str) for k in ("name", "content")):
            raise ImportFailure(["Each file needs a name and UTF-8 CSV content."])
        name, content = file["name"], file["content"]
        if not name.lower().endswith(".csv") or "/" in name or "\\" in name or len(name) > 200:
            raise ImportFailure(["Use CSV filenames without directory paths (up to 200 characters)."])
        encoded = content.encode("utf-8")
        total_bytes += len(encoded)
        if total_bytes > MAX_BYTES:
            raise ImportFailure(["The snapshot exceeds the 20 MiB prototype limit."])
        digest = hashlib.sha256(encoded).hexdigest()
        if name in names or digest in hashes:
            raise ImportFailure([f"{name}: duplicate filename or identical file in the same snapshot."])
        names.add(name)
        hashes.add(digest)
        reader = csv.DictReader(io.StringIO(content.lstrip("\ufeff"), newline=""), strict=True)
        try:
            headers = reader.fieldnames or []
            if not headers or len(headers) != len(set(headers)):
                raise ImportFailure([f"{name}: missing or duplicate column headers."])
            missing = [key for key in REQUIRED if key not in headers]
            if not ({"ProviderName", "ServiceProviderName"} & set(headers)):
                missing.append("ProviderName or ServiceProviderName")
            if missing:
                raise ImportFailure([f"{name}: missing required columns: {', '.join(missing)}."])
            family = "ServiceProviderName columns" if "ServiceProviderName" in headers else "ProviderName columns"
            count, start = 0, len(rows)
            for record in reader:
                count += 1
                if sum(report["rows"] for report in reports) + count > MAX_ROWS:
                    raise ImportFailure([f"The snapshot exceeds {MAX_ROWS:,} rows."])
                try:
                    if None in record or any(value is None for value in record.values()):
                        raise ValueError("the row has a different number of fields from the header")
                    clean = {key: text(value) for key, value in record.items()}
                    for column in REQUIRED:
                        if not clean[column]:
                            raise ValueError(f"{column} is empty")
                    provider = clean.get("ServiceProviderName") or clean.get("ProviderName")
                    if not provider:
                        raise ValueError("the provider is empty")
                    if not re.fullmatch(r"[A-Z]{3}", clean["BillingCurrency"]):
                        raise ValueError("BillingCurrency must be a three-letter uppercase code")
                    parsed_dates = {key: timestamp(clean[key], key) for key in DATES}
                    for prefix in ("BillingPeriod", "ChargePeriod"):
                        if parsed_dates[prefix + "End"] <= parsed_dates[prefix + "Start"]:
                            raise ValueError(f"{prefix}End must be after {prefix}Start")
                    row = {key: clean.get(key, "") for key in FIELDS}
                    row.update(parsed_dates)
                    row.update({key: amount(clean[key], key) for key in MONEY})
                    row.update({key: amount(clean[key], key) if clean.get(key) else None
                                for key in OPTIONAL_DECIMALS})
                    tags = {}
                    if clean.get("Tags"):
                        try:
                            tags = json.loads(clean["Tags"])
                        except json.JSONDecodeError as error:
                            raise ValueError("Tags must be a JSON object") from error
                        if not isinstance(tags, dict) or any(not isinstance(value, str) for value in tags.values()):
                            raise ValueError("Tags must be a JSON object with string values")
                    normalized_tags = defaultdict(set)
                    for key, value in tags.items():
                        normalized_tags[re.sub(r"[^a-z0-9]", "", key.lower())].add(value)

                    def tag_value(aliases, label):
                        values = set().union(*(normalized_tags.get(alias, set()) for alias in aliases))
                        if len(values) > 1:
                            raise ValueError(f"Tags contain conflicting values for {label}")
                        return next(iter(values), "")

                    row.update({
                        "Tags": json.dumps(tags, ensure_ascii=False) if tags else "",
                        "TagApplication": tag_value(("application",), "application"),
                        "TagEnvironment": tag_value(("environment",), "environment"),
                        "TagBusinessUnit": tag_value(("businessunit",), "business unit"),
                        "TagCostCenter": tag_value(("costcenter", "costcentre"), "cost centre"),
                    })
                    row.update(
                        SourceId=source_id, SourceFile=name, SourceHash=digest, SourceRow=count + 1,
                        Provider=provider, Model=clean.get("x_Model", ""), Workload=clean.get("x_Workload", ""),
                        RawRecord=json.dumps(record, ensure_ascii=False),
                    )
                    for column in TOKENS:
                        value = clean.get(f"x_{column}", "")
                        if value and (not re.fullmatch(r"\d{1,15}", value)):
                            raise ValueError(f"x_{column} must be a nonnegative integer with at most 15 digits")
                        row[column] = int(value) if value else None
                    rows.append(row)
                    if not clean.get("SubAccountName") and not clean.get("SubAccountId"):
                        warnings.add("Some charges have no sub-account; they appear as Unassigned.")
                    if clean.get("x_PreparedBy", "").lower() == "ai":
                        warnings.add("AI-prepared rows are present. Source-document reconciliation is not implemented.")
                except ValueError as error:
                    issues.append(f"{name}, record {count + 1}: {error}")
                    if len(issues) >= 20:
                        raise ImportFailure(issues + ["Stopped after 20 errors. No files were imported."])
            if count == 0:
                issues.append(f"{name}: no data rows. Empty snapshots cannot clear existing data.")
            reports.append({"name": name, "rows": count, "sha256": digest, "columns": family,
                            "accepted": len(rows) - start})
        except csv.Error as error:
            raise ImportFailure([f"{name}, line {reader.line_num}: invalid CSV: {error}"]) from error
    if issues:
        raise ImportFailure(issues)
    return {"rows": rows, "files": reports, "warnings": sorted(warnings), "sourceId": source_id}


def exact_sum(values) -> Decimal:
    with localcontext() as context:
        context.prec = 60
        return sum(values, Decimal(0))


def dashboard(dataset: dict, filters: dict[str, str]) -> dict:
    rows = dataset["rows"]
    options = {
        "currency": sorted({row["BillingCurrency"] for row in rows}),
        "provider": sorted({row["Provider"] for row in rows}),
        "month": sorted({row["BillingPeriodStart"][:7] for row in rows}),
        "service": sorted({row["ServiceName"] for row in rows}),
        "model": sorted({row["Model"] for row in rows if row["Model"]}),
        "workload": sorted({row["Workload"] for row in rows if row["Workload"]}),
        "dimension": list(DIMENSIONS),
    }
    selected = {key: filters.get(key, "") for key in options}
    selected["dimensionValue"] = filters.get("dimensionValue", "")
    selected["currency"] = selected["currency"] or options["currency"][0]
    for key, value in ((key, selected[key]) for key in options):
        if value and value not in options[key]:
            raise ValueError(f"Unknown {key} filter. Reset the filters and try again.")
    if selected["dimensionValue"] and not selected["dimension"]:
        raise ValueError("Choose a filter dimension before choosing its value.")
    mapping = {"currency": "BillingCurrency", "provider": "Provider", "service": "ServiceName",
               "model": "Model", "workload": "Workload"}
    base = [row for row in rows if
            all(not selected[key] or row[column] == selected[key] for key, column in mapping.items())
            and (not selected["month"] or row["BillingPeriodStart"][:7] == selected["month"])]
    dimension = DIMENSIONS.get(selected["dimension"])
    all_dimension_values = sorted({dimension(row) for row in rows if dimension and dimension(row)})
    dimension_values = sorted({dimension(row) for row in base if dimension and dimension(row)})
    if selected["dimensionValue"] and selected["dimensionValue"] not in all_dimension_values:
        raise ValueError("Unknown dimension value. Reset the filters and try again.")
    options["dimensionValue"] = dimension_values[:100]
    dimension_value_count = len(dimension_values)
    filtered = [row for row in base if not selected["dimensionValue"] or dimension(row) == selected["dimensionValue"]]

    def token_sum(group, column):
        values = [row[column] for row in group if row[column] is not None]
        # Strings preserve large counts exactly across the JSON boundary.
        return str(sum(values)) if values else None

    def single(group, column):
        values = {row[column] for row in group}
        return values.pop() if len(values) == 1 else None

    def cover(group):
        """Unit cost uses only rows that report all four token counters."""
        complete = [row for row in group if all(row[column] is not None for column in TOKENS)]
        billed = exact_sum(row["BilledCost"] for row in complete)
        total = sum(row[column] for row in complete for column in TOKENS)
        per_million = None
        if total:
            with localcontext() as context:
                context.prec = 60
                per_million = str((billed / total * 1_000_000).quantize(Decimal("0.000001")))
        return {"rows": len(complete), "billed": str(billed), "tokens": str(total), "perMillion": per_million}

    def groups(key, limit=None, source=None):
        grouped = defaultdict(list)
        for row in filtered if source is None else source:
            grouped[key(row) or "Unassigned"].append(row)
        result = []
        for name, group in grouped.items():
            item = {"name": name, "billed": str(exact_sum(r["BilledCost"] for r in group)),
                    "effective": str(exact_sum(r["EffectiveCost"] for r in group)), "rows": len(group),
                    "credits": str(exact_sum(r["BilledCost"] for r in group if r["BilledCost"] < 0)),
                    "provider": single(group, "Provider"), "model": single(group, "Model") or None,
                    "tokens": {column: token_sum(group, column) for column in TOKENS},
                    "cover": cover(group)}
            for column, output in (("ListCost", "listCost"), ("ContractedCost", "contractedCost")):
                available = [row[column] for row in group if row[column] is not None]
                item[output] = str(exact_sum(available)) if available else None
                item[output + "Rows"] = len(available)
            comparable = [row for row in group if row["ListCost"] is not None and row["ContractedCost"] is not None]
            item["comparisonRows"] = len(comparable)
            item["comparisonListCost"] = str(exact_sum(row["ListCost"] for row in comparable)) if comparable else None
            item["comparisonContractedCost"] = str(exact_sum(row["ContractedCost"] for row in comparable)) if comparable else None
            item["comparisonBilledCost"] = str(exact_sum(row["BilledCost"] for row in comparable)) if comparable else None
            item["comparisonEffectiveCost"] = str(exact_sum(row["EffectiveCost"] for row in comparable)) if comparable else None
            for column, output, unit_column in (
                ("ConsumedQuantity", "consumedQuantity", "ConsumedUnit"),
                ("PricingQuantity", "pricingQuantity", "PricingUnit"),
            ):
                unit = single(group, unit_column)
                available = [row[column] for row in group if row[column] is not None and row[unit_column] == unit]
                item[output] = str(exact_sum(available)) if available and unit else None
                item[output.replace("Quantity", "Unit")] = unit
                item[output + "Rows"] = len(available) if unit else 0
            result.append(item)
        result.sort(key=lambda group: abs(Decimal(group["billed"])), reverse=True)
        return result if limit is None else result[:limit]

    trend = groups(lambda row: row["ChargePeriodStart"][:10])
    trend.sort(key=lambda group: group["name"])

    daily = defaultdict(list)
    for row in filtered:
        daily[(row["ChargePeriodStart"][:10], row["Provider"])].append(row)
    trend_provider = [{"date": day, "provider": provider, "billed": str(exact_sum(r["BilledCost"] for r in group))}
                      for (day, provider), group in sorted(daily.items())]

    daily_model = defaultdict(list)
    for row in filtered:
        daily_model[(row["ChargePeriodStart"][:10], row["Provider"], row["Model"])].append(row)
    trend_model = [{"date": day, "provider": provider, "model": model,
                    "billed": str(exact_sum(r["BilledCost"] for r in group))}
                   for (day, provider, model), group in sorted(daily_model.items())]

    by_vendor = defaultdict(list)
    for row in filtered:
        by_vendor[row["Provider"]].append(row)
    vendor_services = [{"provider": name, "services": groups(lambda row: row["ServiceName"], 8, group)}
                       for name, group in sorted(by_vendor.items())]

    def heat(row_limit=8, column_limit=8):
        """Workload by model when labelled; otherwise service by provider."""
        labelled = [row for row in filtered if row["Model"] and row["Workload"]]
        kind = "workload-model" if labelled else "service-provider"
        source = labelled or filtered
        cells = defaultdict(list)
        for row in source:
            column = (row["Provider"], row["Model"]) if labelled else (row["Provider"], row["Provider"])
            cells[(row["Workload"] if labelled else row["ServiceName"], column)].append(row["BilledCost"])
        totals = {key: exact_sum(values) for key, values in cells.items()}

        def ranked(position):
            sums = defaultdict(Decimal)
            for key, value in totals.items():
                sums[key[position]] += abs(value)
            return [name for name, _ in sorted(sums.items(), key=lambda item: item[1], reverse=True)]

        row_names, column_names = ranked(0)[:row_limit], ranked(1)[:column_limit]
        return {"kind": kind, "rows": row_names, "rowsUsed": len(source), "rowsTotal": len(filtered),
                "cols": [{"label": column[1], "provider": column[0]} for column in column_names],
                "values": [[str(totals[(row_name, column)]) if (row_name, column) in totals else None
                            for column in column_names] for row_name in row_names]}

    def coverage():
        by_provider = defaultdict(list)
        for row in filtered:
            by_provider[row["Provider"]].append(row)
        return [{"name": name, "rows": len(group),
                 "modelRows": sum(bool(row["Model"]) for row in group),
                 "workloadRows": sum(bool(row["Workload"]) for row in group),
                 "tokenRows": sum(all(row[column] is not None for column in TOKENS) for row in group),
                 "listCostRows": sum(row["ListCost"] is not None for row in group),
                 "contractedCostRows": sum(row["ContractedCost"] is not None for row in group),
                 "listUnitPriceRows": sum(row["ListUnitPrice"] is not None for row in group),
                 "contractedUnitPriceRows": sum(row["ContractedUnitPrice"] is not None for row in group),
                 "quantityRows": sum(row["ConsumedQuantity"] is not None and bool(row["ConsumedUnit"]) for row in group),
                 "resourceRows": sum(bool(row["ResourceId"] or row["ResourceName"]) for row in group),
                 "tagRows": sum(bool(row["Tags"]) for row in group),
                 "commitmentRows": sum(bool(row["CommitmentDiscountId"]) for row in group),
                 "accounts": len({row["BillingAccountId"] for row in group}),
                 "first": min(row["ChargePeriodStart"][:10] for row in group),
                 "last": max(row["ChargePeriodStart"][:10] for row in group)}
                for name, group in sorted(by_provider.items())]

    def allocation_coverage():
        by_provider = defaultdict(list)
        for row in filtered:
            by_provider[row["Provider"]].append(row)
        return [{"name": name, "rows": len(group),
                 "taggedRows": sum(bool(row["Tags"]) for row in group),
                 "businessUnitRows": sum(bool(row["TagBusinessUnit"]) for row in group),
                 "costCenterRows": sum(bool(row["TagCostCenter"]) for row in group),
                 "businessUnitCost": str(exact_sum(row["BilledCost"] for row in group if row["TagBusinessUnit"])),
                 "costCenterCost": str(exact_sum(row["BilledCost"] for row in group if row["TagCostCenter"]))}
                for name, group in sorted(by_provider.items())]

    def unit_price_comparisons():
        grouped = defaultdict(list)
        for row in filtered:
            if row["SkuPriceId"] and row["PricingUnit"] and row["ListUnitPrice"] is not None and row["ContractedUnitPrice"] is not None:
                key = (row["Provider"], row["SkuPriceId"], row["PricingUnit"],
                       row["ListUnitPrice"], row["ContractedUnitPrice"])
                grouped[key].append(row)
        return [{"name": f"{provider} / {sku_price_id}", "unit": unit, "rows": len(group),
                 "listUnitPrice": format(list_price, "f"), "contractedUnitPrice": format(contracted_price, "f")}
                for (provider, sku_price_id, unit, list_price, contracted_price), group
                in sorted(grouped.items(), key=lambda item: (-len(item[1]), item[0][0], item[0][1]))[:12]]

    def charge_mix():
        return groups(lambda row: row["ChargeCategory"] or "Category not supplied")

    def run_rate():
        """Straight-line pace for one billing period per provider; not a forecast."""
        months = sorted({row["BillingPeriodStart"][:7] for row in filtered})
        if not months:
            return {"month": None, "providers": []}
        month = selected["month"] or months[-1]
        by_provider = defaultdict(list)
        for row in filtered:
            if row["BillingPeriodStart"][:7] == month:
                by_provider[row["Provider"]].append(row)
        result = []
        for name, group in sorted(by_provider.items()):
            start = min(row["BillingPeriodStart"][:10] for row in group)
            end = max(row["BillingPeriodEnd"][:10] for row in group)
            inside = [row["ChargePeriodStart"][:10] for row in group if start <= row["ChargePeriodStart"][:10] < end]
            through = max(inside) if inside else None
            days = max((date.fromisoformat(end) - date.fromisoformat(start)).days, 1)
            elapsed = min((date.fromisoformat(through) - date.fromisoformat(start)).days + 1, days) if through else 0
            spent = exact_sum(row["BilledCost"] for row in group)
            projected = None
            if 0 < elapsed < days:
                with localcontext() as context:
                    context.prec = 60
                    projected = str(spent / elapsed * days)
            result.append({"name": name, "spent": str(spent), "projected": projected, "start": start,
                           "end": end, "through": through, "elapsed": elapsed, "days": days})
        return {"month": month, "providers": result}

    return {
        "sample": dataset.get("sample", False), "sampleKind": dataset.get("sampleKind"),
        "sourceId": dataset["sourceId"],
        "options": options, "filters": selected, "files": dataset["files"],
        "warnings": dataset["warnings"], "totalRows": len(rows), "rows": len(filtered),
        "billed": str(exact_sum(row["BilledCost"] for row in filtered)),
        "effective": str(exact_sum(row["EffectiveCost"] for row in filtered)),
        "credits": str(exact_sum(row["BilledCost"] for row in filtered if row["BilledCost"] < 0)),
        "accounts": len({(row["Provider"], row["BillingAccountId"]) for row in filtered}),
        "providers": groups(lambda row: row["Provider"]),
        "services": groups(lambda row: row["ServiceName"], 10),
        "subaccounts": groups(lambda row: row["SubAccountName"] or row["SubAccountId"], 12),
        "regions": groups(lambda row: row["RegionName"] or row["RegionId"], 10),
        "accountsById": groups(account_label, 10),
        "resources": groups(resource_label, 12),
        "skus": groups(lambda row: f'{row["Provider"]} / {row["SkuId"]}' if row["SkuId"] else "", 12),
        "chargeMix": charge_mix(),
        "unitPriceComparisons": unit_price_comparisons(),
        "dimensionGroups": groups(lambda row: dimension(row) if dimension else "Unassigned", 12),
        "dimensionValueCount": dimension_value_count,
        "allocation": {
            "application": groups(lambda row: row["TagApplication"], 10),
            "environment": groups(lambda row: row["TagEnvironment"], 10),
            "businessUnit": groups(lambda row: row["TagBusinessUnit"], 10),
            "costCenter": groups(lambda row: row["TagCostCenter"], 10),
        },
        "models": groups(lambda row: f"{row['Provider']} / {row['Model']}" if row["Model"] else "Model not supplied", 12),
        "workloads": groups(lambda row: row["Workload"] or "Workload not supplied", 12),
        "tokens": {column: token_sum(filtered, column) for column in TOKENS},
        "tokenRows": sum(all(row[column] is not None for column in TOKENS) for row in filtered),
        "trend": trend, "trendProvider": trend_provider, "trendModel": trend_model,
        "vendorServices": vendor_services, "heat": heat(), "coverage": coverage(),
        "allocationCoverage": allocation_coverage(),
        "runRate": run_rate(),
        "periodStart": min((row["ChargePeriodStart"][:10] for row in filtered), default=None),
        "periodEnd": max((row["ChargePeriodEnd"][:10] for row in filtered), default=None),
    }
