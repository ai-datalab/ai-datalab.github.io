# DataHub - FinOps demo provenance

- Source repository: https://github.com/ai-datalab/DataHub-FinOps
- Source revision: `5fda4afe46787b3d1b4eb6feb8eda3dfb74c2eb7`.
- Source directory: `demo/` (the build also reads `app/web/` and the parser modules in `app/`).
- Build command (run from the repository root): `python demo/build_demo.py --back-link /#solutions`; output `dist/demo/`.
- Build runtime: Python 3.12.10. Pyodide 0.29.5 is fetched from the npm registry and refused unless it matches
  the SHA-512 pinned in `demo/build_demo.py`.
- Reproducibility: built from a clean `git archive` of the revision above. Builds from CRLF and LF exports
  produced the same `SHA256SUMS.txt` (SHA-256 `a81bb21c13b894db158ab879b4bbe82598460c71712001216e010855f74f282e`),
  which lists every file except itself and this record.
- Data provenance: every bundled record is invented. The AI scenario comes from `app/ai_sample.py`, the
  multi-cloud scenario from `demo/cloud_scenario.py` (`demo-*` accounts, October 2026) and the product-usage
  feeds from the fictional Contoso Health samples in `samples/`. The anonymised FinOps Foundation sample used
  by the local app is not bundled.
- Runtime behaviour: no sign-in, server, API, telemetry or admin action. The dashboard's Python runs in the
  browser through Pyodide (WebAssembly, so the manifest sets `webAssembly: true`). It fetches only its own
  files, and CSV files a visitor imports stay in the browser tab.
- Public distribution permission: published at the request of the repository owner on 2026-11-18.
- Repository licence: no licence has been chosen for the DataHub-FinOps code yet; the repository grants no
  general open-source licence.
- Third-party licences: Pyodide 0.29.5 (MPL-2.0), unmodified, which includes CPython 3.13.2 (PSF License
  Agreement) and Emscripten 4.0.9 runtime code (MIT / University of Illinois/NCSA). See `pyodide/NOTICE.txt`.
  No other third-party code or assets are bundled.
