"""Browser stand-in for app/server.py: the same routes, run by Pyodide in the static demo.

The demo shim calls ``start`` once and then ``handle`` for every /api request, so the
dashboard JavaScript runs unchanged against either this module or the local server.
"""
from __future__ import annotations

import json
from urllib.parse import parse_qs

from ai_sample import sample_csv
from focus_core import ImportFailure, MAX_BYTES, dashboard, parse_files

CLOUD_SAMPLE_NAME = "multi-cloud-scenario.csv"
_state: dict = {}


def sample_dataset(kind="ai"):
    if kind not in ("ai", "cloud"):
        raise ValueError("Choose the ai or cloud sample.")
    content = sample_csv() if kind == "ai" else _state["cloud_csv"]
    name = "ai-scenario.csv" if kind == "ai" else _state["cloud_name"]
    dataset = parse_files([{"name": name, "content": content}], f"{kind}-sample")
    dataset["sample"] = True
    dataset["sampleKind"] = kind
    return dataset


def start(cloud_csv: str, native_json: str, cloud_name: str = CLOUD_SAMPLE_NAME) -> None:
    _state["cloud_csv"] = cloud_csv
    _state["cloud_name"] = cloud_name
    _state["native"] = json.loads(native_json)
    _state["dataset"] = sample_dataset("ai")


def _payload(filters):
    result = dashboard(_state["dataset"], filters)
    result["nativeConsumption"] = _state["native"]
    return result


def _reply(status, body):
    return json.dumps({"status": status, "body": body}, ensure_ascii=False)


def handle(method: str, path: str, query: str = "", body: str = "") -> str:
    """Return a JSON string: {"status": int, "body": object}."""
    try:
        if method == "GET" and path == "/api/dashboard":
            filters = {key: values[0] for key, values in parse_qs(query).items()}
            return _reply(200, _payload(filters))
        if method == "POST" and path in ("/api/import", "/api/sample"):
            if not 0 < len(body.encode("utf-8")) <= MAX_BYTES * 2:
                return _reply(413, {"error": "Request is empty or too large."})
            payload = json.loads(body)
            if not isinstance(payload, dict):
                raise ValueError("Expected a JSON object.")
            if path == "/api/import":
                dataset = parse_files(payload.get("files"), payload.get("sourceId", "upload"))
                dataset["sample"] = False
            else:
                dataset = sample_dataset(payload.get("kind", "ai"))
            # A rejected snapshot never replaces the last good dataset.
            _state["dataset"] = dataset
            return _reply(200, _payload({}))
        return _reply(404, {"error": "Not found."})
    except ImportFailure as error:
        return _reply(400, {"error": "Import rejected. The previous dataset is unchanged.",
                            "issues": error.issues})
    except (ValueError, TypeError, UnicodeError) as error:
        message = str(error) if method == "GET" else f"Invalid import: {error}"
        return _reply(400, {"error": message})
