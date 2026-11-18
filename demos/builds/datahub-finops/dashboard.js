import {
  PALETTE, NEUTRAL, TOKEN_COLORS, el, svg, legend, dataTable, sparkline,
  stackedColumns, lineChart, bars, pairedBars, stackedShare, heatmap,
} from "./charts.js";

const $ = (id) => document.getElementById(id);
const filterNames = ["month", "provider", "service", "currency", "model", "workload", "dimension", "dimensionValue"];
const defaults = {
  month: "All periods", provider: "All vendors", service: "All services", model: "All models", workload: "All workloads",
  dimension: "All dimensions", dimensionValue: "All values",
};
const TOKEN_KEYS = ["InputTokens", "CachedInputTokens", "CacheWriteTokens", "OutputTokens"];
const TOKEN_NAMES = { InputTokens: "Uncached input", CachedInputTokens: "Cache reads", CacheWriteTokens: "Cache writes", OutputTokens: "Output" };
const CROSS_TABS = [["portfolio", "Portfolio"], ["spend", "Spend & trends"], ["explorer", "Cost explorer"], ["tokens", "Models & tokens"], ["evidence", "Cost & evidence"], ["coverage", "Source coverage"]];
const SECTIONS = {
  "cross-vendor": { title: "Cross-vendor view", sub: "Compare vendor spend on the same billing fields, period and currency.", dynamic: true },
  consumption: { title: "Product usage", sub: "Explore product activity alongside cloud spend.", dynamic: true },
  sources: { title: "Data sources", sub: "Load a sample or replace this session with a checked cloud cost CSV snapshot.", dynamic: false },
  methodology: { title: "Methodology", sub: "How totals are built, and what this prototype does not claim.", dynamic: false },
};
const BUDGET_KEY = "focus-budgets";
const ERROR_COLOR = "#a4262c";

let data = null, busy = false, requestId = 0, focusTab = false, lastPath = "";

const number = new Intl.NumberFormat(undefined);
const compact = new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 });
const formats = new Map();
const currency = () => data?.filters.currency ?? "USD";
function formatter(options) {
  const key = currency() + JSON.stringify(options);
  if (!formats.has(key)) formats.set(key, new Intl.NumberFormat(undefined, { style: "currency", currency: currency(), currencyDisplay: "symbol", ...options }));
  return formats.get(key);
}
const money = (value) => formatter({ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value));
const moneyShort = (value) => Math.abs(Number(value)) >= 100000
  ? formatter({ minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(value)) : money(value);
const moneyFine = (value) => formatter({ minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(Number(value));
const moneyAxis = (value) => formatter({ notation: "compact", maximumFractionDigits: 1 }).format(value);
const tokenText = (value) => value === null || value === undefined ? "Not supplied" : number.format(BigInt(value));
const tokenCompact = (value) => compact.format(Number(value));
const pct = (ratio) => `${(ratio * 100).toFixed(ratio > 0 && ratio < .1 ? 1 : 0)}%`;
const plural = (count, word) => `${number.format(count)} ${word}${count === 1 ? "" : "s"}`;
const colorOf = (name) => {
  const index = data.options.provider.indexOf(name);
  return index < 0 ? NEUTRAL : PALETTE[index % PALETTE.length];
};
const daysBetween = (from, to) => Math.round((Date.parse(to) - Date.parse(from)) / 864e5);
const addDays = (day, count) => new Date(Date.parse(day) + count * 864e5).toISOString().slice(0, 10);
const positiveTotal = () => Number(data.billed) - Number(data.credits);

function tokenTotal(tokens) {
  const present = TOKEN_KEYS.filter((key) => tokens[key] !== null);
  return present.length ? present.reduce((sum, key) => sum + BigInt(tokens[key]), 0n) : null;
}
const tokenSub = (tokens) => {
  const total = tokenTotal(tokens);
  if (total === null) return "Tokens not supplied";
  return `${tokenCompact(total)} tokens${TOKEN_KEYS.some((key) => tokens[key] === null) ? " (some counters missing)" : ""}`;
};

const swatch = (color) => { const item = el("span", "swatch"); item.style.backgroundColor = color; return item; };
const empty = (text, ...extra) => el("p", "empty", text, ...extra);
const stage = (title, text) => el("div", "stage", el("h2", "", title), el("p", "", text));
const grid = (kind, ...children) => el("div", `grid ${kind}`, ...children);
const card = (title, note, ...content) => el("section", "card",
  el("header", "card-head", el("h3", "", title), note ? el("p", "", note) : null), ...content);
const facts = (pairs) => el("dl", "facts", pairs.flatMap(([key, value]) => [el("dt", "", key), el("dd", "", value)]));
function link(text, href) {
  const anchor = el("a", "", text);
  anchor.href = href;
  return anchor;
}
function kpi({ label, value, sub, title, color, spark, accent }) {
  const amount = el("strong", "kpi-value", value);
  if (title) amount.title = title;
  return el("div", accent ? "kpi accent" : "kpi", el("span", "kpi-label", color ? swatch(color) : null, label), amount,
    el("div", "kpi-foot", el("span", "kpi-sub", sub), spark ?? null));
}
function progress(ratio, color, label) {
  const filled = Math.min(Math.max(ratio, 0), 1) * 100;
  return svg("svg", { viewBox: "0 0 100 6", preserveAspectRatio: "none", class: "progress", role: "img", "aria-label": label },
    svg("rect", { width: 100, height: 6, fill: "#f0f0f0" }), svg("rect", { width: filled, height: 6, fill: color }));
}

function node(tag, value, className) {
  const element = document.createElement(tag);
  if (value !== undefined) element.textContent = value;
  if (className) element.className = className;
  return element;
}

function setBusy(value, message) {
  busy = value;
  document.querySelectorAll("button, select, input").forEach((control) => { control.disabled = value; });
  if (message) $("status").textContent = message;
  $("main").setAttribute("aria-busy", String(value));
}

function showError(error) {
  const box = $("error");
  box.replaceChildren(node("strong", error.message || "Unable to load data. Try again."));
  if (error.issues?.length) {
    const list = node("ul");
    error.issues.forEach((issue) => list.append(node("li", issue)));
    box.append(list);
  }
  box.hidden = false;
  box.scrollIntoView({ block: "nearest" });
}

async function api(url, payload) {
  const response = await fetch(url, payload === undefined ? {} : {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
  });
  const body = await response.json();
  if (!response.ok) {
    const error = new Error(body.error);
    error.issues = body.issues;
    throw error;
  }
  return body;
}

// ---- Shared data shapes ----------------------------------------------------

function dailyByProvider() {
  const map = new Map();
  for (const row of data.trendProvider) {
    if (!map.has(row.provider)) map.set(row.provider, []);
    map.get(row.provider).push([row.date, Number(row.billed)]);
  }
  return map;
}

function dailyCard(title, note, rows, keyOf, series) {
  const days = new Map();
  for (const row of rows) {
    const key = keyOf(row), day = days.get(row.date) ?? { name: row.date, values: {} };
    day.values[key] = (day.values[key] ?? 0) + Number(row.billed);
    days.set(row.date, day);
  }
  const list = [...days.values()].sort((a, b) => a.name < b.name ? -1 : 1);
  const chart = stackedColumns({
    days: list, series, format: money, axisFormat: moneyAxis,
    description: `${title}, ${currency()}. Values are in the data table below the chart.`,
  });
  const table = dataTable(["Date", ...series.map((item) => item.name)],
    list.map((day) => [day.name, ...series.map((item) => day.values[item.name] === undefined ? "No charges" : money(day.values[item.name]))]),
    `${title} data`);
  return card(title, note, legend(series), chart, el("details", "data-details", el("summary", "", "Show data table"), table));
}

function groupBars(groups, { max, tokens = false, quantity = false, color, colorFor } = {}) {
  const positive = groups.filter((group) => Number(group.billed) > 0);
  const rows = positive.map((group) => {
    const total = tokens ? tokenTotal(group.tokens) : null;
    const consumed = quantity && group.consumedQuantity !== null
      ? group.consumedQuantity.includes(".")
        ? group.consumedQuantity.replace(/0+$/, "").replace(/\.$/, "") : group.consumedQuantity
      : null;
    return {
      label: group.name, value: Number(group.billed), text: moneyShort(group.billed),
      note: total !== null ? `${tokenCompact(total)} tokens`
        : consumed !== null ? `${consumed} ${group.consumedUnit}` : null,
      color: color ?? colorFor?.(group) ?? (group.provider ? colorOf(group.provider) : NEUTRAL),
      title: `${group.billed} ${currency()}${consumed !== null ? `; exact quantity ${group.consumedQuantity} ${group.consumedUnit}` : ""}`,
    };
  });
  const dropped = groups.length - positive.length;
  return [rows.length ? bars(rows, { max }) : empty("No positive charges in this selection."),
    dropped ? el("p", "hint", "Credits and negative charges are not drawn here; see Cost & evidence.") : null];
}

function shareBars(groups) {
  const total = positiveTotal();
  const positive = groups.filter((group) => Number(group.billed) > 0);
  const rows = positive.map((group) => ({
    label: group.name, value: Number(group.billed), text: `${pct(Number(group.billed) / total)} \u00b7 ${moneyShort(group.billed)}`,
    color: group.provider ? colorOf(group.provider) : NEUTRAL, title: `${group.billed} ${currency()}`,
  }));
  const shown = positive.reduce((sum, group) => sum + Number(group.billed), 0);
  return [rows.length ? bars(rows, { max: total }) : empty("No positive charges in this selection."),
    el("p", "hint", `Bar length is the share of total spend on a 0\u2013100% scale. Shown groups cover ${pct(total ? shown / total : 0)} of positive spend.`)];
}

const labelledModels = () => data.models.filter((group) => group.model);
const hasTokens = () => TOKEN_KEYS.some((key) => data.tokens[key] !== null);
const completeTokens = (group) => TOKEN_KEYS.every((key) => group.tokens[key] !== null);

function noTokens() {
  return card("No token columns in this file", null,
    empty("Token charts need x_InputTokens, x_CachedInputTokens, x_CacheWriteTokens and x_OutputTokens. This snapshot does not include them, so tokens are shown as Not supplied rather than zero."));
}

function tokenMixCard(groups, title = "Token mix by model") {
  const rows = groups.filter((group) => group.model && completeTokens(group))
    .map((group) => ({ group, parts: TOKEN_KEYS.map((key) => Number(group.tokens[key])) }))
    .filter((item) => item.parts.some((part) => part > 0)).slice(0, 8)
    .map(({ group, parts }) => ({
      label: group.name, parts, text: `${tokenCompact(tokenTotal(group.tokens))} tokens`,
      title: TOKEN_KEYS.map((key) => `${TOKEN_NAMES[key]}: ${tokenText(group.tokens[key])}`).join(" / "),
    }));
  const segments = TOKEN_KEYS.map((key) => ({ name: TOKEN_NAMES[key], color: TOKEN_COLORS[key] }));
  return card(title, "Share of each model's tokens by type. Only models that report all four counters.",
    rows.length ? [legend(segments), stackedShare(rows, segments)] : empty("No model reports all four token counters."));
}

function emptyData() {
  const reset = node("button", "Reset filters", "button");
  reset.type = "button";
  reset.addEventListener("click", () => load());
  return card("No charges match these filters", null, empty("Nothing to draw for this selection."), reset);
}

// ---- Cross-vendor pages ------------------------------------------------------

function heatCard() {
  const heat = data.heat, byModel = heat.kind === "workload-model";
  if (!heat.rows.length) return card("Where spend concentrates", null, empty("No charges in this selection."));
  const note = byModel
    ? `Workload by model, billed cost. Uses ${number.format(heat.rowsUsed)} of ${number.format(heat.rowsTotal)} rows that carry both labels.`
    : "Service by vendor, billed cost. This file has no model and workload labels, so services stand in.";
  return card("Where spend concentrates", note, heatmap({
    label: byModel ? "Billed cost by workload and model" : "Billed cost by service and vendor",
    corner: byModel ? "Workload / Model" : "Service / Vendor", rows: heat.rows,
    cols: heat.cols.map((column) => ({ label: column.label, color: colorOf(column.provider) })),
    values: heat.values.map((row) => row.map((value) => value === null ? null : Number(value))),
    format: moneyShort, low: "Lower spend", high: "Higher spend",
  }));
}

function snapshotCards() {
  const cards = data.coverage.map((item) => el("article", "snapshot",
    el("h4", "", swatch(colorOf(item.name)), item.name),
    facts([
      ["Rows", number.format(item.rows)], ["Billing accounts", number.format(item.accounts)],
      ["Charge dates", item.first === item.last ? item.first : `${item.first} to ${item.last}`],
      ["Model labels", `${number.format(item.modelRows)} of ${number.format(item.rows)} rows`],
      ["All token counters", `${number.format(item.tokenRows)} of ${number.format(item.rows)} rows`],
    ])));
  cards.push(el("article", "snapshot dashed", el("h4", "", "Live connectors"), el("span", "pill", "Not connected"),
    el("p", "", "Claude, OpenAI and Azure billing connectors are not built. Everything here comes from the imported snapshot.")));
  return grid("snapshots", cards);
}

function portfolioPage() {
  const total = Number(data.billed), daily = dailyByProvider();
  const shown = data.providers.slice(0, 5);
  const cards = [kpi({
    label: "Total billed", value: moneyShort(data.billed), title: `${data.billed} ${currency()}`, accent: true,
    sub: `${plural(data.providers.length, "vendor")} \u00b7 ${currency()}`, spark: sparkline(data.trend.map((row) => Number(row.billed)), PALETTE[0]),
  })];
  for (const provider of shown) {
    const billed = Number(provider.billed);
    cards.push(kpi({
      label: provider.name, color: colorOf(provider.name), value: moneyShort(provider.billed), title: `${provider.billed} ${currency()}`,
      sub: billed < 0 ? "Net credit" : total > 0 ? `${pct(billed / total)} of total` : `${plural(provider.rows, "row")}`,
      spark: sparkline((daily.get(provider.name) ?? []).map((point) => point[1]), colorOf(provider.name)),
    }));
  }
  const series = data.providers.map((provider) => ({ name: provider.name, color: colorOf(provider.name) }));
  return [
    stage("Different vendors. One honest view.",
      `Every vendor is read from the same billing fields, so spend lines up without custom mapping. ${currency()} only: currencies are never converted or added.`),
    grid("kpis", cards),
    data.providers.length > shown.length ? el("p", "hint", `Cards show the five largest of ${data.providers.length} vendors; every vendor appears in the charts.`) : null,
    dailyCard("Daily spend by vendor", "Billed cost per charge day, stacked by vendor.", data.trendProvider, (row) => row.provider, series),
    heatCard(),
    el("h3", "section-title", "Source snapshots"),
    snapshotCards(),
  ];
}

function cumulativeCard() {
  const daily = dailyByProvider(), first = data.trend[0].name, last = data.trend[data.trend.length - 1].name;
  const xMax = daysBetween(first, last), middle = Math.round(xMax / 2);
  const series = data.providers.map((provider) => {
    let sum = 0;
    return {
      name: provider.name, color: colorOf(provider.name),
      points: (daily.get(provider.name) ?? []).map(([day, value]) => [daysBetween(first, day), sum += value]),
    };
  });
  const xTicks = xMax === 0 ? [{ x: 0, label: first.slice(5) }]
    : [{ x: 0, label: first.slice(5) }, { x: middle, label: addDays(first, middle).slice(5) }, { x: xMax, label: last.slice(5) }];
  return card("Cumulative spend by vendor", "Running total of billed cost. The dot marks the latest charge day.",
    legend(series.map((item) => ({ name: item.name, color: item.color }))),
    lineChart({ series, xMax, xTicks, format: money, axisFormat: moneyAxis, description: `Cumulative billed cost by vendor in ${currency()}.` }));
}

function spendPage() {
  const models = labelledModels();
  const byModel = models.length > 0;
  const unlabelled = data.models.find((group) => !group.model && Number(group.billed) > 0);
  const share = card(byModel ? "Share of spend by model" : "Share of spend by service",
    byModel ? (unlabelled ? `${pct(Number(unlabelled.billed) / positiveTotal())} of spend has no model label and is not shown.` : "Each model's slice of positive spend.")
      : "No model labels in this snapshot, so services stand in.",
    shareBars(byModel ? models : data.services));
  return [
    stage("Where the money went", "Shares, trend and breakdowns for the current filters. Credits are excluded from share charts."),
    grid("two", share, cumulativeCard()),
    grid("two", card("Spend by team or sub-account", "Billed cost by sub-account.", groupBars(data.subaccounts, { color: PALETTE[0] })),
      card("Spend by service", "The ten largest services.", groupBars(data.services))),
  ];
}

function costExplorerPage() {
  const dimension = data.filters.dimension;
  const breakdown = dimension ? data.dimensionValueCount : 0;
  const heading = dimension || "Choose a dimension";
  const rateRows = data.unitPriceComparisons.map((item) => ({
    label: `${item.name} (${item.unit})`,
    a: Math.max(0, Number(item.listUnitPrice)), b: Math.max(0, Number(item.contractedUnitPrice)),
    aText: `List ${moneyFine(item.listUnitPrice)}`, bText: `Contracted ${moneyFine(item.contractedUnitPrice)}`,
  }));
  const negativeRate = data.unitPriceComparisons.some((item) =>
    Number(item.listUnitPrice) < 0 || Number(item.contractedUnitPrice) < 0);
  return [
    stage("Follow spend to its source", "Break down the same filtered cloud charges by account, service, region, resource, SKU, charge type or allocation tags. Use Filter by / Value above to carry a selection across pages."),
    grid("two",
      card("Charge mix", "Billed cost by charge category. Credits remain visible in Cost & evidence.",
        groupBars(data.chargeMix)),
      card("Cost by service", "Billed cost, with consumed quantity only where the unit is consistent.",
        groupBars(data.services, { quantity: true, color: PALETTE[0] }))),
    grid("two",
      card("Cost by region", "Resource geography from the source export.", groupBars(data.regions)),
      card("Cost by billing account", "Uses the account name when supplied; otherwise the source ID.", groupBars(data.accountsById))),
    grid("two",
      card("Cost by resource", "Top resources by absolute billed cost.", groupBars(data.resources)),
      card("Cost by SKU", "SKU identifiers from the source; blank identifiers remain Unassigned.", groupBars(data.skus))),
    grid("two",
      card("Allocation by business unit", "Tag values are read from the source billing export; untagged charges remain outside these bars.", groupBars(data.allocation.businessUnit)),
      card("Allocation by cost centre", "Recognises common CostCenter / CostCentre tag spellings.", groupBars(data.allocation.costCenter))),
    card("List vs contracted unit price", "Matched rows with the same SKU price ID and pricing unit. These are source prices, not savings.",
      rateRows.length ? pairedBars(rateRows, [{ color: PALETTE[0] }, { color: PALETTE[1] }])
        : empty("No rows provide both unit prices, a SKU price ID and a pricing unit."),
      negativeRate ? el("p", "hint", "Negative unit prices are omitted from this zero-based chart; the exact values remain in the detail below.") : null,
      rateRows.length ? el("details", "data-details", el("summary", "", "Show exact rate values"),
        dataTable(["SKU price ID", "Pricing unit", "List unit price", "Contracted unit price", "Rows"],
          data.unitPriceComparisons.map((item) => [item.name, item.unit, `${item.listUnitPrice} ${currency()}`,
            `${item.contractedUnitPrice} ${currency()}`, number.format(item.rows)]), "Matched unit price comparisons")) : null),
    card(`Current breakdown: ${heading}`, dimension
      ? `${number.format(breakdown)} available values after the other filters. Type an exact value above to filter every compatible chart; suggestions show at most 100.`
      : "Choose a dimension in the filter bar to see its available values.",
      dimension ? groupBars(data.dimensionGroups) : empty("Choose a dimension to inspect the available values.")),
  ];
}

function tokensPage() {
  const intro = stage("What the models consumed",
    hasTokens() ? `${number.format(data.tokenRows)} of ${number.format(data.rows)} rows report all four token counters. Missing counters are shown as Not supplied, never zero.`
      : "This snapshot has no token columns.");
  if (!hasTokens()) return [intro, noTokens()];
  const tokens = data.tokens, input = tokens.InputTokens, cached = tokens.CachedInputTokens;
  const cards = TOKEN_KEYS.map((key) => kpi({
    label: TOKEN_NAMES[key], value: tokens[key] === null ? "Not supplied" : tokenCompact(tokens[key]),
    title: tokenText(tokens[key]), sub: tokens[key] === null ? "Counter missing" : "tokens",
  }));
  if (input !== null && cached !== null && BigInt(input) + BigInt(cached) > 0n) {
    cards.push(kpi({
      label: "Cache-read share", accent: true, value: pct(Number(cached) / (Number(input) + Number(cached))),
      sub: "of input read from cache", title: "Cache reads / (uncached input + cache reads)",
    }));
  }
  const perMillion = labelledModels().filter((group) => group.cover.perMillion !== null)
    .sort((a, b) => Number(b.cover.perMillion) - Number(a.cover.perMillion))
    .map((group) => ({
      label: group.name, value: Number(group.cover.perMillion), text: moneyFine(group.cover.perMillion),
      note: `${number.format(group.cover.rows)} of ${number.format(group.rows)} rows`, color: colorOf(group.provider),
      title: `${group.cover.perMillion} ${currency()} per million tokens`,
    }));
  return [
    intro, grid("kpis", cards),
    grid("two", tokenMixCard(data.models),
      card("Blended cost per million tokens", "Only rows reporting all four counters. Mixes input, output and cache pricing, so it is not a price benchmark.",
        perMillion.length ? bars(perMillion) : empty("No model has token-complete rows."))),
  ];
}

function evidencePage() {
  const rows = data.providers.map((provider) => ({
    label: provider.name, a: Math.max(0, Number(provider.billed)), b: Math.max(0, Number(provider.effective)),
    aText: `Billed ${moneyShort(provider.billed)}`, bText: `Effective ${moneyShort(provider.effective)}`,
  }));
  const credits = data.providers.filter((provider) => Number(provider.credits) < 0).map((provider) => ({
    label: provider.name, value: Math.abs(Number(provider.credits)), text: money(provider.credits), color: ERROR_COLOR,
    title: `${provider.credits} ${currency()}`,
  }));
  const missing = [
    ["Invoice reconciliation", "Totals are not matched to a vendor invoice or source document."],
    ["Price benchmark", "Unit costs are blended from the file, not list prices."],
    ["Outcome value / ROI", "No outcome or business-value data is imported."],
    ["Forecast", "Run-rate is a straight-line pace, not a prediction."],
  ];
  const notCalculated = card("Not calculated", "These claims are deliberately left out of the prototype.",
    el("ul", "not-calculated", missing.map(([name, text]) => el("li", "", el("strong", "", name), text))));
  notCalculated.classList.add("dashed");
  const basis = data.providers.filter((item) => item.comparisonRows > 0);
  const comparison = basis.map((item) => ({
    label: item.name, a: Math.max(0, Number(item.comparisonListCost)), b: Math.max(0, Number(item.comparisonContractedCost)),
    aText: `List ${moneyShort(item.comparisonListCost)}`,
    bText: `Contracted ${moneyShort(item.comparisonContractedCost)}`,
  }));
  const negativeBasis = basis.some((item) => Number(item.comparisonListCost) < 0 || Number(item.comparisonContractedCost) < 0);
  return [
    stage("Billed, effective and credits", "How cost looks before and after commitments and credits. Negative charges stay negative."),
    grid("two",
      card("Billed vs effective cost", "Per vendor, in the selected currency.",
        legend([{ name: "Billed", color: PALETTE[0] }, { name: "Effective", color: PALETTE[1] }]),
        rows.length ? pairedBars(rows, [{ color: PALETTE[0] }, { color: PALETTE[1] }]) : empty("No vendors in this selection.")),
      card("Credits and negative charges", "Money returned or discounted, by vendor.",
        credits.length ? bars(credits) : empty("No negative charges in this selection."))),
    grid("two",
      card("List vs contracted cost", "Both amounts use the same rows that supply both fields. This is not a savings calculation.",
        comparison.length ? pairedBars(comparison, [{ color: PALETTE[0] }, { color: PALETTE[1] }]) : empty("No list or contracted cost fields in this selection."),
        negativeBasis ? el("p", "hint", "Negative list/contracted amounts are omitted from this zero-based comparison; inspect the source rows before interpreting the totals.") : null,
        el("details", "data-details", el("summary", "", "Show cost-basis coverage"),
          dataTable(["Vendor", "Comparable rows", "List cost coverage", "Contracted cost coverage", "List unit price", "Contracted unit price"],
            data.coverage.map((item) => {
            const provider = data.providers.find((row) => row.name === item.name);
            return [item.name, `${number.format(provider?.comparisonRows ?? 0)} / ${number.format(item.rows)}`,
              `${number.format(item.listCostRows)} / ${number.format(item.rows)}`,
              `${number.format(item.contractedCostRows)} / ${number.format(item.rows)}`,
              `${number.format(item.listUnitPriceRows)} / ${number.format(item.rows)}`,
              `${number.format(item.contractedUnitPriceRows)} / ${number.format(item.rows)}`];
            }),
            "Cloud price field coverage"))),
      card("Allocation coverage", "Billed cost attributed by supplied tags; tags are not proof that the allocation is complete.",
        heatmap({
          label: "Tag allocation coverage by vendor", corner: "Vendor", rows: data.allocationCoverage.map((item) => item.name),
          cols: [{ label: "Any tag" }, { label: "Business unit" }, { label: "Cost centre" }],
          values: data.allocationCoverage.map((item) => [
            item.rows ? item.taggedRows / item.rows * 100 : 0,
            item.rows ? item.businessUnitRows / item.rows * 100 : 0,
            item.rows ? item.costCenterRows / item.rows * 100 : 0,
          ]),
          format: (value) => `${value.toFixed(0)}%`, max: 100, low: "0%", high: "100%",
        }),
        el("details", "data-details", el("summary", "", "Show allocation amounts"),
          dataTable(["Vendor", "Tagged rows", "Business unit rows", "Cost centre rows", "Business unit billed", "Cost centre billed"],
            data.allocationCoverage.map((item) => [item.name, `${number.format(item.taggedRows)} / ${number.format(item.rows)}`,
              `${number.format(item.businessUnitRows)} / ${number.format(item.rows)}`,
              `${number.format(item.costCenterRows)} / ${number.format(item.rows)}`,
              money(item.businessUnitCost), money(item.costCenterCost)]), "Allocation coverage by vendor"))),
    ),
    notCalculated,
  ];
}

function coveragePage() {
  const percent = (part, whole) => whole ? part / whole * 100 : 0;
  const connectors = [
    ["Claude / Anthropic", "Not connected", "No live billing collector yet. Claude spend appears only if it is in your imported file."],
    ["OpenAI", "Not connected", "No live billing collector yet. OpenAI spend appears only if it is in your imported file."],
    ["Azure OpenAI", "Not connected", "A standardized Azure Cost Management export is a planned path; none is configured."],
    ["Microsoft Fabric", "Not deployed", "The loader is included, but nothing has been run against a live workspace."],
  ];
  return [
    stage("What the data can support", "Share of rows that carry each field. Gaps explain empty charts elsewhere."),
    card("Coverage by vendor", "Percent of rows with each field, using the current filters.", heatmap({
      label: "Field coverage by vendor", corner: "Vendor",
      rows: data.coverage.map((item) => item.name),
      cols: ["Model", "Workload", "Tokens", "List cost", "Contracted", "Quantity", "Resource", "Tags", "Commitment"].map((label) => ({ label })),
      values: data.coverage.map((item) => [
        percent(item.modelRows, item.rows), percent(item.workloadRows, item.rows), percent(item.tokenRows, item.rows),
        percent(item.listCostRows, item.rows), percent(item.contractedCostRows, item.rows), percent(item.quantityRows, item.rows),
        percent(item.resourceRows, item.rows), percent(item.tagRows, item.rows), percent(item.commitmentRows, item.rows),
      ]),
      format: (value) => `${value.toFixed(0)}%`, max: 100, low: "0%", high: "100%",
    })),
    el("h3", "section-title", "Connectors"),
    grid("snapshots", connectors.map(([name, status, text]) => el("article", "snapshot dashed", el("h4", "", name), el("span", "pill", status), el("p", "", text)))),
    el("p", "hint", `Loaded ${plural(data.files.length, "file")} with ${number.format(data.totalRows)} rows. Hashes and structural checks are on the `, link("Data sources", "#/sources"), " page."),
  ];
}

// ---- Consumption pages -------------------------------------------------------

function allVendorsPage() {
  const total = Number(data.billed), daily = dailyByProvider(), top = data.providers[0];
  const cards = data.providers.slice(0, 6).map((provider) => kpi({
    label: provider.name, color: colorOf(provider.name), value: moneyShort(provider.billed), title: `${provider.billed} ${currency()}`,
    sub: tokenSub(provider.tokens), spark: sparkline((daily.get(provider.name) ?? []).map((point) => point[1]), colorOf(provider.name)),
  }));
  const headline = top && Number(top.billed) > 0 && total > 0
    ? `${top.name} is the largest cost: ${moneyShort(top.billed)}, ${pct(Number(top.billed) / total)} of total spend.` : "No single vendor leads this selection.";
  const totals = dataTable(["Vendor", "Billed", "Effective", "Rows", "Tokens"],
    data.providers.map((provider) => [provider.name, money(provider.billed), money(provider.effective), number.format(provider.rows),
      tokenTotal(provider.tokens) === null ? "Not supplied" : number.format(tokenTotal(provider.tokens))]), "Aligned source totals");
  const models = labelledModels(), byModel = models.length > 0;
  const workloads = data.workloads.filter((group) => group.name !== "Workload not supplied");
  const tokenRows = data.providers.filter((provider) => tokenTotal(provider.tokens) !== null).map((provider) => ({
    label: provider.name, value: Number(tokenTotal(provider.tokens)), text: `${tokenCompact(tokenTotal(provider.tokens))} \u00b7 ${moneyShort(provider.billed)}`,
    color: colorOf(provider.name), title: `${tokenText(tokenTotal(provider.tokens).toString())} tokens / ${provider.billed} ${currency()}`,
  }));
  const reading = el("details", "card reading", el("summary", "", "Reading these figures"), el("ul", "", [
    `Costs are billed cost in ${currency()}. Credits stay negative and are not drawn in bars.`,
    "Bars share one scale per chart, starting at zero.",
    "Tokens sit beside spend and are never added to it.",
    "Rows without a model or workload label are left out of those charts, not counted as zero.",
  ].map((text) => el("li", "", text))));
  reading.open = true;
  return [
    stage("What each vendor consumed", "Cost and tokens side by side, from the same snapshot."),
    grid("kpis", cards),
    card("Aligned source totals", headline, totals),
    grid("wide",
      card(byModel ? "Cost by model" : "Cost by service", byModel ? "Billed cost with token volume where supplied." : "No model labels in this snapshot, so services stand in.",
        groupBars(byModel ? models : data.services, { tokens: true })),
      reading),
    grid("two",
      card(workloads.length ? "Cost by workload" : "Cost by sub-account", workloads.length ? "Billed cost for each labelled workload." : "No workload labels in this snapshot.",
        groupBars(workloads.length ? workloads : data.subaccounts, { color: PALETTE[0] })),
      card("Tokens beside spend", "Bar length is tokens. Spend is in the label; the two are never added.",
        tokenRows.length ? bars(tokenRows) : empty("No token columns in this snapshot."))),
  ];
}

function readBudgets() {
  try {
    const stored = JSON.parse(localStorage.getItem(BUDGET_KEY) ?? "{}");
    return stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
  } catch { return {}; }
}
function writeBudgets(budgets) {
  try { localStorage.setItem(BUDGET_KEY, JSON.stringify(budgets)); } catch { /* storage unavailable: budget lasts until reload */ }
}

function runRateCard(item, index) {
  const key = `${currency()}|${item.name}`, color = colorOf(item.name);
  const spent = Number(item.spent), projected = item.projected === null ? null : Number(item.projected), done = item.elapsed >= item.days;
  const outside = item.through === null;
  const readout = el("div", "budget-box");
  const input = el("input");
  input.type = "number"; input.min = "0"; input.step = "any"; input.inputMode = "decimal"; input.id = `budget-${index}`;
  const stored = Number(readBudgets()[key]);
  let budget = Number.isFinite(stored) && stored > 0 ? stored : null;
  if (budget !== null) input.value = String(budget);

  function refresh() {
    if (budget === null) { readout.replaceChildren(el("p", "hint", "Optional. Stored in this browser only; nothing is sent anywhere.")); return; }
    const basis = projected ?? spent, over = basis - budget;
    readout.replaceChildren(
      progress(basis / budget, over > 0 ? ERROR_COLOR : color, `${pct(basis / budget)} of budget`),
      el("p", "", `${money(basis)} ${done || outside ? "spent" : "projected at month end"} against ${money(budget)}: `,
        el("strong", over > 0 ? "over" : "", over > 0 ? `${money(over)} over` : `${money(-over)} under`)));
  }
  input.addEventListener("change", () => {
    const value = Number(input.value), valid = input.value.trim() !== "" && Number.isFinite(value) && value > 0;
    const budgets = readBudgets();
    if (valid) budgets[key] = value; else delete budgets[key];
    writeBudgets(budgets);
    budget = valid ? value : null;
    if (!valid) input.value = "";
    refresh();
  });
  refresh();
  return el("article", "runrate",
    el("h4", "", swatch(color), item.name),
    el("p", "runrate-label", "Spent to date"),
    el("strong", "kpi-value", moneyShort(item.spent)),
    el("p", "runrate-line", outside ? "No projection: no charge dates fall inside this billing period."
      : done ? "Month complete. No projection needed." : `Straight-line month end: ${moneyShort(item.projected)}`),
    progress(item.elapsed / item.days, color, outside ? "No charge days in period" : `Day ${item.elapsed} of ${item.days}`),
    el("p", "hint", outside ? `Billing period ${item.start} to ${item.end}. The charges are dated before it.`
      : `Day ${item.elapsed} of ${item.days} \u00b7 data through ${item.through}`),
    el("label", "budget-field", el("span", "", `Monthly budget (${currency()})`), input), readout);
}

function runRateChart(rate) {
  const xMax = Math.max(...rate.providers.map((item) => item.days));
  const middle = Math.round(xMax / 2);
  const series = [];
  for (const item of rate.providers) {
    let sum = 0;
    const points = [[0, 0]];
    for (const row of data.trendProvider) {
      if (row.provider !== item.name || row.date < item.start || row.date >= item.end) continue;
      points.push([daysBetween(item.start, row.date) + 1, sum += Number(row.billed)]);
    }
    series.push({ name: item.name, color: colorOf(item.name), points });
    if (item.projected !== null) {
      series.push({ name: `${item.name} (straight-line)`, color: colorOf(item.name), dash: true, points: [points[points.length - 1], [item.days, Number(item.projected)]] });
    }
  }
  return card("Cumulative spend this month", "Solid line is spend to date. Dashed line extends the current pace to month end; it is not a forecast.",
    legend(rate.providers.map((item) => ({ name: item.name, color: colorOf(item.name) }))),
    lineChart({
      series, xMax, xTicks: [{ x: 0, label: "Start" }, { x: middle, label: `Day ${middle}` }, { x: xMax, label: `Day ${xMax}` }],
      format: money, axisFormat: moneyAxis, description: `Cumulative billed cost this month by vendor in ${currency()}.`,
    }));
}

function runRatePage() {
  const rate = { ...data.runRate, providers: [...data.runRate.providers].sort((a, b) => Number(b.spent) - Number(a.spent)) };
  if (!rate.providers.length) return [stage("Month to date", "Nothing to project for this selection."), empty("No charges in this selection.")];
  return [
    stage(`Month to date: ${rate.month}`, "Spend so far, and what the same daily pace would reach by month end. It ignores weekends, launches and price changes."),
    grid("runrates", rate.providers.map(runRateCard)),
    runRateChart(rate),
  ];
}

function vendorPage(name) {
  const provider = data.providers.find((item) => item.name === name), color = colorOf(name);
  const daily = dailyByProvider().get(name) ?? [], total = Number(data.billed), billed = Number(provider.billed);
  const cards = [
    kpi({ label: "Billed cost", color, accent: true, value: moneyShort(provider.billed), title: `${provider.billed} ${currency()}`, sub: `${plural(provider.rows, "row")}`, spark: sparkline(daily.map((point) => point[1]), color) }),
    kpi({ label: "Effective cost", value: moneyShort(provider.effective), title: `${provider.effective} ${currency()}`, sub: "after commitments and credits" }),
    kpi({ label: "Tokens", value: tokenTotal(provider.tokens) === null ? "Not supplied" : tokenCompact(tokenTotal(provider.tokens)),
      title: tokenTotal(provider.tokens) === null ? "" : number.format(tokenTotal(provider.tokens)),
      sub: tokenTotal(provider.tokens) === null ? "no token columns" : TOKEN_KEYS.some((key) => provider.tokens[key] === null) ? "some counters missing" : "all counters reported" }),
    kpi({ label: "Share of total", value: total > 0 && billed >= 0 ? pct(billed / total) : "n/a", sub: `of ${moneyShort(data.billed)} across vendors` }),
  ];
  const rows = data.trendModel.filter((row) => row.provider === name);
  const hasModels = rows.some((row) => row.model);
  const keyOf = (row) => row.model || (hasModels ? "Model not supplied" : name);
  const totals = new Map();
  for (const row of rows) totals.set(keyOf(row), (totals.get(keyOf(row)) ?? 0) + Math.abs(Number(row.billed)));
  const base = Math.max(data.options.provider.indexOf(name), 0);
  const series = [...totals.entries()].sort((a, b) => b[1] - a[1]).map(([key], index) => ({ name: key, color: PALETTE[(base + index) % PALETTE.length] }));
  const modelColor = new Map(series.map((item) => [item.name, item.color]));
  const models = data.models.filter((group) => group.provider === name && group.model);
  const services = data.vendorServices.find((item) => item.provider === name)?.services ?? [];
  const primary = models.length ? card("Cost by model", "Billed cost with token volume where supplied.", groupBars(models, { tokens: true, colorFor: (group) => modelColor.get(group.model) }))
    : card("Cost by service", "No model labels for this vendor, so services stand in.", groupBars(services));
  const secondary = models.length && hasTokens() && models.some(completeTokens) ? tokenMixCard(models)
    : models.length ? card("Cost by service", "The vendor's largest services.", groupBars(services)) : null;
  return [
    stage(`${name}: what it consumed`, "Spend, models and tokens for this vendor only, using the current filters."),
    grid("kpis", cards),
    dailyCard("Daily spend", hasModels ? "Billed cost per charge day, stacked by model." : "Billed cost per charge day.", rows, keyOf, series),
    secondary ? grid("two", primary, secondary) : primary,
  ];
}

// ---- Product-native Consumption Central sample ------------------------------

const numericValue = (value) => value === null || value === undefined || value === "" ? null
  : Number.isFinite(Number(value)) ? Number(value) : null;
const nativeNumber = (value) => numericValue(value) === null ? "Not supplied" : number.format(numericValue(value));
const nativeCompact = (value) => numericValue(value) === null ? "Not supplied" : compact.format(numericValue(value));
const nativeMoney = (value, code = "USD") => {
  if (numericValue(value) === null) return "Not supplied";
  if (!/^[A-Z]{3}$/.test(code)) return nativeNumber(value);
  return new Intl.NumberFormat(undefined, { style: "currency", currency: code, maximumFractionDigits: 2 }).format(numericValue(value));
};
const nativeData = () => data.nativeConsumption;

function nativeBarRows(items, color, format = nativeNumber) {
  const rows = items.filter((item) => Number(item.value) > 0).map((item) => ({
    label: item.name, value: Number(item.value), text: format(item.value), color,
  }));
  return rows.length ? bars(rows) : empty("No rows in this sample feed.");
}

function nativeDailyCard(title, note, days, fields, format = nativeCompact, axisFormat = nativeCompact) {
  const rows = days.map((day) => ({
    name: day.date,
    values: Object.fromEntries(fields.map((field) => [field.name, Number(day[field.key] || 0)])),
  }));
  if (!rows.length) return card(title, note, empty("No dated rows in this sample feed."));
  return card(title, note, legend(fields.map((field) => ({ name: field.name, color: field.color }))),
    stackedColumns({
      days: rows, series: fields.map(({ name, color }) => ({ name, color })),
      format: (value) => format(value), axisFormat,
      description: `${title}. Only source-reported dates are plotted; missing dates are not filled with zero.`,
    }));
}

function foundryMeterDailyCards(f, title = "Foundry meter spend") {
    return f.costByCurrency.map((item) => nativeDailyCard(
      `${title} · ${item.currency}`,
      "Azure AI meter spend. Keep this separate from Cost Management solution spend.",
      f.days.filter((row) => row.currency === item.currency),
      [{ name: `Meter spend (${item.currency})`, key: "cost", color: PALETTE[2] }],
      (value) => nativeMoney(value, item.currency), (value) => nativeMoney(value, item.currency),
    ));
}

function foundrySolutionDailyCards(f) {
    return f.solutionTotals.map((item) => nativeDailyCard(
      `Solution spend · ${item.currency}`,
      "Cost Management actual and amortized cost are separate bases, not additive.",
      f.solutionDays.filter((row) => row.currency === item.currency),
      [{ name: "Actual", key: "actual", color: PALETTE[0] }, { name: "Amortized", key: "amortized", color: PALETTE[4] }],
      (value) => nativeMoney(value, item.currency), (value) => nativeMoney(value, item.currency),
    ));
}

function nativeCoverage() {
  const rows = nativeData().coverage.map((item) => [
    item.source, item.grain, item.status, number.format(item.rows),
    item.from && item.to ? `${item.from} to ${item.to}` : "No dated rows",
  ]);
  return card("Sample feed coverage", "Each feed keeps its own grain; missing optional feeds remain empty.",
    el("details", "data-details", el("summary", "", "Show source coverage"),
      dataTable(["Feed", "Native grain", "Status", "Rows", "Date range"], rows, "Consumption Central sample feed coverage")));
}

const friendlyLicenseBasis = (basis) => basis === "Billed in FOCUS" ? "Included in cloud cost data" : basis;

function licenseOverviewCard(license) {
  if (!license?.available) return null;
  const body = license.totals.length
    ? facts(license.totals.flatMap((total) => [
      [`Estimated monthly seat cost · ${total.currency}`, nativeMoney(total.monthlyRunRate, total.currency)],
      [`Priced seats · ${total.currency}`, nativeNumber(total.seats)],
    ]))
    : empty("No plan has a rate in the rate card yet.");
  return card("License cost", "Seats × rate card. A separate estimate, not part of cloud spend or product usage totals.",
    body, el("p", "hint", link("Open Licenses", "#/consumption/licenses")));
}

function nativeUsageOverview() {
  const n = nativeData(), cowork = n.cowork, studio = n.studio, github = n.github, foundry = n.foundry;
  const solutionValue = foundry.solutionTotals.length === 1
    ? nativeMoney(foundry.solutionTotals[0].actual, foundry.solutionTotals[0].currency)
    : foundry.solutionTotals.length ? `${foundry.solutionTotals.length} currencies` : "Not supplied";
  return [
    stage("Product-native usage", "Consumption Central sample feeds, shown on their own terms rather than forced into one total."),
    el("div", "notice", el("p", "", `${n.description} Credits, tokens and currency amounts are not combined. Task-level attribution is not present in these feeds.`)),
    grid("kpis", [
      kpi({ label: "Cowork / Work IQ", value: nativeCompact(cowork.credits), sub: `${nativeNumber(cowork.users)} people · ${nativeNumber(cowork.weeks.length)} weeks`, color: PALETTE[0] }),
      kpi({ label: "Copilot Studio", value: nativeCompact(studio.credits), sub: `${nativeNumber(studio.days.length)} dated tenant rows · PAYG ${pct(studio.paygShare)}`, color: PALETTE[1] }),
      kpi({ label: "GitHub Copilot", value: nativeCompact(github.credits), sub: `${nativeNumber(github.users)} active usernames · AI credits`, color: PALETTE[4] }),
      kpi({ label: "Azure AI solution spend", value: solutionValue, sub: "Cost Management actual · separate from meter spend", color: PALETTE[2] }),
    ]),
    grid("two",
      card("Cowork / Work IQ weekly credits", "Person × service × policy × week.", nativeBarRows(cowork.weeks.map((row) => ({ name: row.date, value: row.credits })), PALETTE[0], nativeCompact)),
      nativeDailyCard("Copilot Studio tenant usage", "Dated tenant export. Prepaid and pay-as-you-go remain separate.", studio.days, [
        { name: "Prepaid", key: "prepaid", color: PALETTE[1] }, { name: "Pay-as-you-go", key: "payg", color: PALETTE[3] },
      ])),
    grid("two",
      nativeDailyCard("GitHub Copilot AI credits", "Daily reported credits. Net amount has no currency column in this export.", github.days, [
        { name: "AI credits", key: "credits", color: PALETTE[4] },
      ]),
      card("Foundry billing views", "Meter spend and Cost Management actual/amortized spend are shown separately on the Azure AI Foundry tab.",
        link("Open Azure AI Foundry", "#/consumption/foundry"))),
    licenseOverviewCard(n.licenses),
    nativeCoverage(),
  ];
}

function coworkUsagePage() {
  const c = nativeData().cowork;
  return [
    stage("Cowork / Work IQ", "Weekly credits at person × service × policy grain. Costs are not inferred without an explicit commercial rate basis."),
    grid("kpis", [
      kpi({ label: "Credits used", value: nativeCompact(c.credits), sub: "source-reported weekly credits", color: PALETTE[0] }),
      kpi({ label: "People", value: nativeNumber(c.users), sub: "distinct person IDs in the selected sample" }),
      kpi({ label: "Sessions", value: nativeNumber(c.sessions), sub: "reported sessions" }),
      kpi({ label: "Weeks", value: nativeNumber(c.weeks.length), sub: c.weeks.length ? `${c.weeks[0].date} to ${c.weeks.at(-1).date}` : "No dated feed rows" }),
    ]),
    grid("two",
      card("Weekly credits", "One point per reported week; gaps are not filled.", nativeBarRows(c.weeks.map((row) => ({ name: row.date, value: row.credits })), PALETTE[0], nativeCompact)),
      card("Credits by service", "Service names are source values, not a closed list.", nativeBarRows(c.services, PALETTE[1], nativeCompact))),
    card("Credits by spending policy", "Usage distribution only; policy limits are not added across people or weeks.",
      nativeBarRows(c.policies, PALETTE[4], nativeCompact)),
  ];
}

function studioUsagePage() {
  const s = nativeData().studio;
  const snapshot = s.snapshotMonth
    ? `Separate ${s.snapshotMonth} month-to-date agent and user exports; do not add them to the dated tenant series.`
    : "No agent or user snapshot rows are available.";
  return [
    stage("Copilot Studio", "Tenant consumption is dated. Per-agent and per-user exports are separate month-to-date snapshots."),
    grid("kpis", [
      kpi({ label: "Tenant credits", value: nativeCompact(s.credits), sub: `${nativeNumber(s.days.length)} reported days`, color: PALETTE[1] }),
      kpi({ label: "Prepaid", value: nativeCompact(s.prepaid), sub: "tenant daily export" }),
      kpi({ label: "Pay-as-you-go", value: nativeCompact(s.payg), sub: `${pct(s.paygShare)} of tenant credits`, color: PALETTE[3] }),
      kpi({ label: "Snapshot agents", value: nativeNumber(s.snapshotAgents), sub: `${nativeCompact(s.snapshotCredits)} billed + non-billed credits` }),
    ]),
    nativeDailyCard("Daily tenant consumption", "Prepaid and pay-as-you-go quantities from StudioTenantDaily.csv.", s.days, [
      { name: "Prepaid", key: "prepaid", color: PALETTE[1] }, { name: "Pay-as-you-go", key: "payg", color: PALETTE[3] },
    ]),
    grid("two",
      card("Agent snapshot by billable feature", snapshot, nativeBarRows(s.features, PALETTE[0], nativeCompact)),
      card("User snapshot", snapshot, facts([
        ["Distinct users", nativeNumber(s.snapshotUsers)],
        ["User-snapshot credits", nativeCompact(s.snapshotUserCredits)],
        ["Snapshot month", s.snapshotMonth ?? "Not supplied"],
      ]))),
  ];
}

function githubUsagePage() {
  const g = nativeData().github;
  return [
    stage("GitHub Copilot", "AI-credit activity and source-reported amounts. Included quota is retained in the source but not summed across daily rows."),
    grid("kpis", [
      kpi({ label: "AI credits", value: nativeCompact(g.credits), sub: "quantity from GitHub AI usage", color: PALETTE[4] }),
      kpi({ label: "Gross amount", value: nativeNumber(g.gross), sub: "source amount; currency not supplied" }),
      kpi({ label: "Discount", value: nativeNumber(g.discount), sub: "source amount; currency not supplied" }),
      kpi({ label: "Net amount", value: nativeNumber(g.net), sub: "source amount; currency not supplied", color: PALETTE[3] }),
    ]),
    grid("two",
      nativeDailyCard("Daily AI credits", "Quantities by reported date. The sample has no user-level display in this view.", g.days, [
        { name: "AI credits", key: "credits", color: PALETTE[4] },
      ]),
      card("Credits by model", "Model is the source-provided model label.", nativeBarRows(g.models, PALETTE[0], nativeCompact))),
    card("Credits by organization", "Repository and cost-center fields are available in the source; user-level detail stays out of this summary.",
      nativeBarRows(g.organizations, PALETTE[1], nativeCompact)),
  ];
}

function foundryUsagePage() {
  const f = nativeData().foundry;
  const solution = f.solutionTotals;
  const costCards = foundryMeterDailyCards(f);
  const solutionCards = foundrySolutionDailyCards(f);
  const solutionRows = solution.map((row) => [
    row.currency, nativeMoney(row.actual, row.currency), nativeMoney(row.amortized, row.currency),
    nativeMoney(row.taggedCost, row.currency), number.format(row.rows),
  ]);
  const healthRows = f.health.map((row) => [
    row.deployment, row.model || "Not supplied", row.sku || "Not supplied", row.region || "Not supplied",
    row.utilization ? `${nativeNumber(row.utilization)}%` : "Not supplied",
    nativeNumber(row.requests), nativeNumber(row.errors), nativeNumber(row.throttles),
  ]);
  const tokenDays = f.tokenDays;
  return [
    stage("Azure AI Foundry", "Meter spend, Cost Management solution spend, token telemetry and deployment health are distinct feeds."),
    grid("kpis", [
      kpi({ label: "Meter spend", value: f.costByCurrency.length === 1 ? nativeMoney(f.costByCurrency[0].cost, f.costByCurrency[0].currency) : f.costByCurrency.length ? `${f.costByCurrency.length} currencies` : "Not supplied", sub: `${nativeNumber(f.meterRows)} meter rows · not invoice actual`, color: PALETTE[2] }),
      kpi({ label: "Solution actual cost", value: solution.length === 1 ? nativeMoney(solution[0].actual, solution[0].currency) : `${solution.length} currencies`, sub: "Cost Management · separate source", color: PALETTE[0] }),
      kpi({ label: "Input tokens", value: nativeCompact(f.inputTokens), sub: "Azure Monitor token metrics" }),
      kpi({ label: "Output tokens", value: nativeCompact(f.outputTokens), sub: "Azure Monitor token metrics" }),
    ]),
    grid("two",
      ...costCards,
      nativeDailyCard("Daily token telemetry", "Input and output tokens from Azure Monitor, separate from billable meter quantities.", tokenDays, [
        { name: "Input tokens", key: "inputTokens", color: PALETTE[0] },
        { name: "Output tokens", key: "outputTokens", color: PALETTE[4] },
      ])),
    grid("two",
      ...solutionCards,
      card("Cost Management solution spend", "Actual and amortized cost are separate billing bases. Currency totals are never combined.",
        solutionRows.length ? el("details", "data-details", el("summary", "", "Show cost by currency"), dataTable(
          ["Currency", "Actual", "Amortized", "Tagged actual", "Rows"], solutionRows, "Azure solution spend by currency"))
          : empty("No solution-spend rows in this sample.")),
      ...f.costByCurrency.map((item) => card(`Meter cost by meter · ${item.currency}`, "Meter names and quantities remain source-native.",
        nativeBarRows(f.meters.filter((row) => row.currency === item.currency), PALETTE[3], (value) => nativeMoney(value, item.currency))))),
    card("Deployment health", f.healthSnapshot
      ? `Latest deployment snapshot: ${f.healthSnapshot}. Monthly deployment metrics are snapshots, not daily additive usage.`
      : "No deployment-health snapshot is available.",
      healthRows.length ? el("details", "data-details", el("summary", "", "Show latest deployment snapshot"),
        dataTable(["Deployment", "Model", "SKU", "Region", "Mean utilization", "Requests", "5xx", "429"], healthRows, "Azure deployment health"))
        : empty("No deployment-health rows in this sample.")),
  ];
}

const licenseMonthLabel = (name) => name;

function licenseEstimated(license, currency) {
  return license.plans.filter((plan) => plan.currency === currency && plan.windowCost !== null);
}

function licenseSeatCard(license, plans, currency) {
  const rows = plans.filter((plan) => plan.usageSignalComplete).map((plan) => ({
    label: plan.plan, parts: [plan.seatsWithUsage, plan.seatsWithoutUsage],
    text: `${nativeNumber(plan.seatsWithoutUsage)} of ${nativeNumber(plan.seats)} with no credit usage`,
    title: `${plan.plan}: ${plan.seatsWithUsage} seats with ${plan.usageSignal}, ${plan.seatsWithoutUsage} without`,
  }));
  const partial = plans.filter((plan) => !plan.usageSignalComplete);
  const segments = [{ name: "Credit usage", color: PALETTE[0] }, { name: "No credit usage", color: "#c8c8c8" }];
  const note = `Seats matched against ${[...new Set(plans.map((plan) => plan.usageSignal))].join(" and ")}. No credit usage does not show a seat is unused.`;
  return card("Seats and credit usage", note,
    rows.length ? [legend(segments), stackedShare(rows, segments)] : empty("No plan has a complete usage signal in this sample."),
    partial.length ? el("p", "hint", partial.map((plan) => `${plan.plan}: ${nativeNumber(plan.seatsWithUsage)} of ${nativeNumber(plan.seats)} seats appear in the ${plan.usageSignal} feed, which meters one capability, so no-usage seats are not counted.`).join(" ")) : null);
}

function licenseGithubCard(license, currency) {
  const seatMonths = new Map();
  for (const row of license.monthly.filter((item) => item.product === "GitHub Copilot" && item.currency === currency)) {
    seatMonths.set(row.month, (seatMonths.get(row.month) ?? 0) + Number(row.cost));
  }
  if (!seatMonths.size && !license.githubUsage.length) return null;
  if (license.githubUsageComparable) {
    const rows = [...seatMonths.keys()].map((month) => {
      const net = Number(license.githubUsage.find((item) => item.month === month)?.net ?? 0), seat = seatMonths.get(month);
      return { label: month, a: seat, b: net, aText: nativeMoney(seat, currency), bText: nativeMoney(net, currency) };
    });
    return card("GitHub seats and usage charges", "Seat estimate (top) and net usage charges (bottom), both in the same currency.",
      legend([{ name: "Seat estimate", color: PALETTE[4] }, { name: "Net usage", color: PALETTE[3] }]),
      pairedBars(rows, [{ color: PALETTE[4] }, { color: PALETTE[3] }]));
  }
  const usage = license.githubUsage.map((item) => ({ label: item.month, value: Number(item.net), text: nativeNumber(item.net), color: PALETTE[1] }));
  return card("GitHub usage amounts", "Net amount reported by the usage export. It has no currency column, so it is shown apart from the seat estimate and not added to it.",
    bars(usage),
    el("p", "hint", usage.every((item) => item.value === 0)
      ? "Net is gross less discount, and it is zero in every reported month. Source amounts, currency not supplied."
      : "Net is gross less discount; a zero month means discounts offset the gross amount. Source amounts, currency not supplied."));
}

function licenseCurrencySection(license, total) {
  const currency = total.currency, plans = licenseEstimated(license, currency), months = license.months;
  const colors = new Map(plans.map((plan, index) => [plan.plan, PALETTE[(index * 2) % PALETTE.length]]));
  const monthly = months.map((month) => ({
    name: month,
    values: Object.fromEntries(plans.map((plan) => [plan.plan, Number(license.monthly.find((row) =>
      row.month === month && row.plan === plan.plan && row.currency === currency)?.cost ?? 0)])),
  }));
  const review = total.reviewSeats
    ? kpi({ label: "Seats with no credit usage", value: `${nativeNumber(total.noUsageSeats)} of ${nativeNumber(total.reviewSeats)}`,
      sub: `${nativeMoney(total.noUsageCost, currency)} estimated over ${plural(months.length, "month")} · plans with a full usage signal`, color: "#c8c8c8" })
    : kpi({ label: "Seats with no credit usage", value: "Not measurable", sub: "usage feeds cover only part of each plan" });
  return [
    el("h3", "section-title", `Seat cost in ${currency}`),
    grid("kpis", [
      kpi({ label: "Estimated monthly seat cost", value: nativeMoney(total.monthlyRunRate, currency), accent: true,
        sub: `latest month, ${months.at(-1) ?? "n/a"} · at current rates` }),
      kpi({ label: "Licensed seats priced", value: nativeNumber(total.seats), sub: `${plural(plans.length, "plan")} in ${currency}`, color: PALETTE[0] }),
      kpi({ label: `${plural(months.length, "month")} of seat cost`, value: nativeMoney(total.windowCost, currency),
        sub: months.length ? `${months[0]} to ${months.at(-1)}` : "No dated usage" }),
      review,
    ]),
    grid("two",
      card("Seat cost by month", "Seats × the rate in effect on the first of each month, stacked by plan.",
        legend(plans.map((plan) => ({ name: plan.plan, color: colors.get(plan.plan) }))),
        stackedColumns({
          days: monthly, series: plans.map((plan) => ({ name: plan.plan, color: colors.get(plan.plan) })),
          format: (value) => nativeMoney(value, currency), axisFormat: (value) => nativeCompact(value), label: licenseMonthLabel,
          description: `Estimated seat cost by month in ${currency}, stacked by plan.`,
        })),
      card("Seat cost by plan", `Estimated ${currency} over the window.`,
        bars(plans.map((plan) => ({
          label: plan.plan, value: Number(plan.windowCost), text: nativeMoney(plan.windowCost, currency), color: colors.get(plan.plan),
        }))))),
    grid("two", licenseSeatCard(license, plans, currency), licenseGithubCard(license, currency) ?? empty("No GitHub licence or usage rows.")),
  ];
}

function licensesPage() {
  const license = nativeData().licenses;
  if (!license?.available) {
    return [stage("Licenses", "Seat cost needs seat assignments and a rate card."),
      el("div", "notice", el("p", "", "No seat assignment feeds were found in this sample. Add PeopleMetaData.csv or GitHubUserMap.csv, plus LicenseRateCard.csv."))];
  }
  const unpriced = license.plans.filter((plan) => plan.windowCost === null);
  const noSeat = license.withoutSeat.filter((item) => item.users > 0);
  const rateRows = license.rates.map((rate) => [
    rate.product, rate.plan, nativeMoney(rate.price, rate.currency), rate.from || "Not supplied", rate.to || "Open",
    friendlyLicenseBasis(rate.basis), rate.source || "Not supplied",
  ]);
  const planRows = license.plans.map((plan) => [
    plan.plan, nativeNumber(plan.seats), nativeNumber(plan.seatsWithUsage), plan.usageSignal,
    plan.monthlyRate === null ? "No rate" : nativeMoney(plan.monthlyRate, plan.currency),
    plan.windowCost === null ? "Not priced" : nativeMoney(plan.windowCost, plan.currency), friendlyLicenseBasis(plan.status),
  ]);
  return [
    stage("Licenses", "Estimated seat cost: assigned seats × the rate card. A separate layer from cloud usage cost, so the two are never added together."),
    el("div", "notice", el("p", "", `${license.assumption} Sample rates are illustrative, not list prices. Plans already included in cloud cost data are excluded from the estimate to avoid counting them twice.`)),
    noSeat.length ? el("div", "notice", el("p", "", `${noSeat.map((item) => `${nativeNumber(item.users)} ${item.product} users show usage without a seat assignment`).join("; ")}.`)) : null,
    unpriced.length ? el("div", "notice", el("p", "", `Not priced: ${unpriced.map((plan) => `${plan.plan} (${plan.status})`).join(", ")}. Add an effective rate to LicenseRateCard.csv.`)) : null,
    ...(license.totals.length ? license.totals.flatMap((total) => licenseCurrencySection(license, total))
      : [empty("No plan has an estimable rate, so there is no seat cost to show.")]),
    card("Plans and rate card", "Seats, usage match and the rate behind each estimate.",
      el("details", "data-details", el("summary", "", "Show plan detail"),
        dataTable(["Plan", "Seats", "Seats with credit usage", "Usage signal", "Rate / user / month", "Window cost", "Status"], planRows, "Licence seats by plan")),
      el("details", "data-details", el("summary", "", "Show rate card"),
        dataTable(["Product", "Plan", "Rate / user / month", "Effective from", "Effective to", "Basis", "Source"], rateRows, "Licence rate card"))),
  ];
}

// ---- Router ----------------------------------------------------------------

function parseRoute() {
  let parts;
  try { parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent); } catch { parts = []; }
  const section = Object.hasOwn(SECTIONS, parts[0]) ? parts[0] : "cross-vendor";
  return { section, tab: parts[1] ?? (section === "consumption" ? "usage" : "") };
}

function tabsFor(section) {
  return section === "cross-vendor" ? CROSS_TABS
    : [["usage", "Product usage"], ["all", "Cloud cost vendors"], ["run-rate", "Cloud cost run-rate"],
      ...data.providers.map((provider) => [`v-${provider.name}`, provider.name]),
      ["cowork", "Cowork"], ["studio", "Copilot Studio"], ["github", "GitHub Copilot"], ["foundry", "Azure AI Foundry"],
      ["licenses", "Licenses"]];
}

function renderTabs(tabs, active, section) {
  const host = $("tabs");
  host.replaceChildren(...tabs.map(([id, label], index) => {
    const tab = el("a", id === active ? "tab selected" : "tab", label);
    tab.href = `#/${section}/${encodeURIComponent(id)}`;
    tab.id = `tab-${index}`;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(id === active));
    tab.tabIndex = id === active ? 0 : -1;
    tab.dataset.label = label;
    return tab;
  }));
  host.hidden = false;
  const selected = host.querySelector("[aria-selected=true]");
  selected?.scrollIntoView({ block: "nearest", inline: "nearest" });
  const index = tabs.findIndex(([id]) => id === active);
  $("view").setAttribute("aria-labelledby", `tab-${index}`);
  if (focusTab) { selected?.focus(); focusTab = false; }
}

function pageFor(section, tab) {
  if (section === "cross-vendor") return {
    portfolio: portfolioPage, spend: spendPage, explorer: costExplorerPage, tokens: tokensPage,
    evidence: evidencePage, coverage: coveragePage,
  }[tab]();
  if (section === "consumption") {
    const nativePages = {
    usage: nativeUsageOverview, cowork: coworkUsagePage, studio: studioUsagePage,
    github: githubUsagePage, foundry: foundryUsagePage, licenses: licensesPage,
    };
    if (nativePages[tab]) return nativePages[tab]();
    if (tab === "all") return allVendorsPage();
    if (tab === "run-rate") return runRatePage();
    return vendorPage(tab.slice(2));
  }
  if (tab === "all") return allVendorsPage();
  if (tab === "run-rate") return runRatePage();
  return vendorPage(tab.slice(2));
}

function showRoute() {
  const { section, tab } = parseRoute(), meta = SECTIONS[section];
  const nativeTab = section === "consumption" && ["usage", "cowork", "studio", "github", "foundry", "licenses"].includes(tab);
  if (data) updateDatasetNotice(nativeTab);
  document.querySelectorAll("nav a").forEach((anchor) => {
    if (anchor.dataset.section === section) anchor.setAttribute("aria-current", "page"); else anchor.removeAttribute("aria-current");
  });
  const icon = document.querySelector(`nav a[data-section="${section}"] svg`);
  $("page-tile").replaceChildren(...(icon ? [icon.cloneNode(true)] : []));
  $("page-title").textContent = meta.title;
  $("page-sub").textContent = meta.sub;
  document.title = `${meta.title} | DataHub - FinOps`;
  updateViewSwitch(section === "cross-vendor" || (section === "consumption" && !nativeTab));
  $("sources-page").hidden = section !== "sources";
  $("methodology-page").hidden = section !== "methodology";
  const live = meta.dynamic && data;
  $("filters").hidden = !live || nativeTab;
  $("view").hidden = !meta.dynamic;
  $("import-link").hidden = nativeTab;
  $("status").hidden = section === "methodology";
  if (nativeTab) {
    $("page-data").textContent = "Data: bundled synthetic Consumption Central sample · not connected to a live tenant";
    $("status").textContent = "Source-native sample feeds / no cross-product total";
  } else if (data) {
    $("page-data").textContent = `Data: ${data.sampleKind === "ai" ? "Synthetic AI scenario" : data.sample ? "Synthetic multi-cloud scenario" : "Your CSV snapshot"} · ${currency()} · ${data.periodStart ? `${data.periodStart} to ${data.periodEnd} (exclusive)` : "no matching dates"}`;
  }
  const path = `${section}/${tab}`;
  if (path !== lastPath && !focusTab) window.scrollTo(0, 0);
  lastPath = path;
  if (!live) { $("tabs").hidden = true; return; }

  const tabs = tabsFor(section), active = tabs.some(([id]) => id === tab) ? tab : tabs[0][0];
  if (active !== tab) { history.replaceState(null, "", `#/${section}/${encodeURIComponent(active)}`); lastPath = `${section}/${active}`; }
  renderTabs(tabs, active, section);
  if (!data.rows && !nativeTab) { $("view").replaceChildren(emptyData()); return; }
  try {
    const notices = data.warnings.length ? el("div", "notice", data.warnings.map((warning) => el("p", "", warning))) : null;
    $("view").replaceChildren(...[notices, ...pageFor(section, active)].filter(Boolean));
  } catch (error) {
    console.error(error);
    $("view").replaceChildren(card("This page could not be drawn", null, empty("Reset the filters or reload the page. The data itself is unchanged.")));
  }
}

// The switch swaps the two bundled samples, so it is hidden once the user's own CSV is loaded.
function updateViewSwitch(show) {
  const group = $("view-switch");
  group.hidden = !(show && data?.sample);
  group.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.kind === data?.sampleKind));
  });
}

function renderFiles(files) {
  $("file-list").replaceChildren(dataTable(["Filename", "Column family", "Rows"],
    files.map((file) => [file.name, file.columns, number.format(file.rows)]), "Loaded files"));
  $("file-list").querySelectorAll("tbody tr").forEach((row, index) => { row.title = `SHA-256: ${files[index].sha256}`; });
  $("file-list").querySelectorAll("tr > :nth-child(2)").forEach((cell) => cell.classList.remove("number"));
}

function updateDatasetNotice(nativeTab) {
  if (nativeTab) {
    $("dataset-notice").replaceChildren(
      node("strong", "Consumption Central sample"),
      node("span", "Bundled synthetic product feeds. Not live tenant data; independent of the selected cloud cost CSV."),
    );
    return;
  }
  const label = data.sampleKind === "ai" ? "Synthetic AI scenario" : data.sample ? "Synthetic multi-cloud scenario" : "Your CSV snapshot";
  const description = data.sampleKind === "ai"
    ? "Claude / OpenAI / Azure OpenAI. Illustrative costs and tokens for Oct 2026, not actual prices or bills."
    : data.sample ? "AWS / Azure / Google Cloud / Oracle. Invented charges for Oct 2026, not actual prices or bills."
      : `${plural(data.files.length, "file")} loaded locally. No cloud sync. Reloading the page restores the AI scenario.`;
  $("dataset-notice").replaceChildren(node("strong", label), node("span", description));
}

function render(next) {
  data = next;
  for (const key of filterNames) {
    if (key === "dimensionValue") {
      $(key).value = data.filters[key];
      $("dimension-values-options").replaceChildren(...data.options[key].map((value) => new Option(value, value)));
      continue;
    }
    const select = $(key);
    select.replaceChildren();
    if (defaults[key]) select.append(new Option(defaults[key], ""));
    data.options[key].forEach((value) => select.append(new Option(value, value)));
    select.value = data.filters[key];
  }
  updateDatasetNotice(false);
  const label = data.sampleKind === "ai" ? "Synthetic AI scenario" : data.sample ? "Synthetic multi-cloud scenario" : "Your CSV snapshot";
  $("page-data").textContent = `Data: ${label} \u00b7 ${currency()} \u00b7 ${data.periodStart ? `${data.periodStart} to ${data.periodEnd} (exclusive)` : "no matching dates"}`;
  renderFiles(data.files);
  $("warnings").replaceChildren(...data.warnings.map((warning) => node("p", warning)));
  $("status").textContent = `${number.format(data.rows)} of ${number.format(data.totalRows)} rows / ${currency()} only / ${plural(data.files.length, "file")}`;
  showRoute();
}

async function load(url = "/api/dashboard", payload) {
  if (busy) return;
  const sequence = ++requestId;
  setBusy(true, payload ? "Validating the complete snapshot..." : "Updating spend...");
  $("error").hidden = true;
  try {
    const next = await api(url, payload);
    if (sequence === requestId) {
      if (payload !== undefined && parseRoute().section === "sources") history.replaceState(null, "", "#/cross-vendor/portfolio");
      render(next);
    }
  } catch (error) {
    $("status").textContent = "Could not update. The previous dataset is unchanged.";
    showError(error);
  } finally {
    setBusy(false);
  }
}

window.addEventListener("hashchange", showRoute);
$("tabs").addEventListener("keydown", (event) => {
  const tabs = [...$("tabs").querySelectorAll("[role=tab]")], index = tabs.indexOf(document.activeElement);
  if (index < 0) return;
  let next;
  switch (event.key) {
    case "ArrowRight": next = (index + 1) % tabs.length; break;
    case "ArrowLeft": next = (index - 1 + tabs.length) % tabs.length; break;
    case "Home": next = 0; break;
    case "End": next = tabs.length - 1; break;
    default: return;
  }
  event.preventDefault();
  focusTab = true;
  location.hash = tabs[next].getAttribute("href");
});
$("filters").addEventListener("submit", (event) => event.preventDefault());
$("filters").addEventListener("change", (event) => {
  if (event.target.name === "dimension") $("dimensionValue").value = "";
  load(`/api/dashboard?${new URLSearchParams(new FormData($("filters")))}`);
});
$("reset").addEventListener("click", () => load());
$("sample").addEventListener("click", () => load("/api/sample", { kind: "cloud" }));
$("ai-sample").addEventListener("click", () => load("/api/sample", { kind: "ai" }));
$("view-switch").addEventListener("click", (event) => {
  const kind = event.target.closest("button")?.dataset.kind;
  if (kind && kind !== data?.sampleKind) load("/api/sample", { kind });
});
$("files").addEventListener("change", () => {
  $("complete").checked = false;
  $("selection").textContent = `${$("files").files.length} file(s) selected. Include every partition once; importing replaces the entire dataset.`;
});
$("import-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (busy) return;
  const files = Array.from($("files").files);
  if (files.length > 100 || files.reduce((total, file) => total + file.size, 0) > 20 * 1024 * 1024) {
    showError(new Error("Select at most 100 CSV files totalling no more than 20 MiB."));
    return;
  }
  setBusy(true, "Reading local files...");
  try {
    const decoded = await Promise.all(files.map(async (file) => ({
      name: file.name,
      content: new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(await file.arrayBuffer()),
    })));
    setBusy(false);
    await load("/api/import", { files: decoded, sourceId: "upload" });
  } catch (error) {
    setBusy(false, "Could not read the files. Save them as UTF-8 CSV and retry.");
    showError(error);
  }
});
showRoute();
load();
