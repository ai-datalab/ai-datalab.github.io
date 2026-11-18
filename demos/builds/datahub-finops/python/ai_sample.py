"""Illustrative AI scenario for DataHub - FinOps, not provider billing data or published prices."""
import csv
import io
from datetime import date, timedelta
from decimal import Decimal


def sample_csv() -> str:
    deployments = [
        ("Anthropic", "Claude Sonnet", "Support assistant", "Customer operations", 1700),
        ("Anthropic", "Claude Haiku", "Document triage", "Operations", 430),
        ("OpenAI", "GPT flagship", "Research agent", "Product", 2100),
        ("OpenAI", "GPT mini", "Support assistant", "Customer operations", 680),
        ("Microsoft", "Azure OpenAI deployment", "Knowledge search", "Engineering", 1150),
    ]
    rows = []
    for day in range(31):
        start = date(2026, 10, 1) + timedelta(days=day)
        for index, (provider, model, workload, team, cents) in enumerate(deployments):
            factor = 100 + (day * 7 + index * 13) % 40
            billed = (Decimal(cents) * factor / 10000).quantize(Decimal("0.01"))
            rows.append({
                "ProviderName": provider, "ServiceName": "Claude API" if provider == "Anthropic" else
                "OpenAI API" if provider == "OpenAI" else "Azure OpenAI",
                "BillingAccountId": f"demo-{provider.lower()}", "SubAccountName": team,
                "BillingCurrency": "USD", "BilledCost": str(billed), "EffectiveCost": str(billed),
                "BillingPeriodStart": "2026-10-01", "BillingPeriodEnd": "2026-11-01",
                "ChargePeriodStart": str(start), "ChargePeriodEnd": str(start + timedelta(days=1)),
                "ChargeCategory": "Usage", "x_Model": model, "x_Workload": workload,
                "x_InputTokens": str((2500 + index * 800) * factor),
                "x_OutputTokens": str((600 + index * 180) * factor),
                "x_CachedInputTokens": str((1200 + index * 500) * factor),
                "x_CacheWriteTokens": str(300 * factor if provider == "Anthropic" else 0),
                "x_DataOrigin": "Synthetic scenario; not actual rates, invoices or production usage",
            })
    output = io.StringIO(newline="")
    writer = csv.DictWriter(output, fieldnames=rows[0])
    writer.writeheader()
    writer.writerows(rows)
    return output.getvalue()
