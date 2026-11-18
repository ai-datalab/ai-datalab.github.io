// Static-demo shim: serves the dashboard's /api calls from Python running in the browser (Pyodide).
// Loaded as a classic script before dashboard.js, so the dashboard code itself is unchanged.
(() => {
  const base = new URL("./", document.currentScript.src);
  const realFetch = window.fetch.bind(window);
  const PYTHON_FILES = ["focus_core.py", "ai_sample.py", "demo_api.py"];
  let ready;
  let banner;

  function setBanner(message, failed) {
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "demo-banner";
      banner.setAttribute("role", "status");
      document.body.prepend(banner);
    }
    banner.hidden = !message;
    banner.textContent = message || "";
    banner.classList.toggle("failed", Boolean(failed));
  }

  async function text(path) {
    const response = await realFetch(new URL(path, base));
    if (!response.ok) throw new Error(`Could not load ${path} (${response.status}).`);
    return response.text();
  }

  async function boot() {
    setBanner("Starting the in-browser engine. The first visit downloads about 12 MB; nothing is uploaded.");
    const { loadPyodide } = await import(new URL("pyodide/pyodide.mjs", base).href);
    const pyodide = await loadPyodide({ indexURL: new URL("pyodide/", base).href });
    pyodide.FS.mkdirTree("/demo");
    const [cloudCsv, nativeJson, ...sources] = await Promise.all([
      text("sample.csv"), text("native.json"), ...PYTHON_FILES.map((name) => text(`python/${name}`)),
    ]);
    PYTHON_FILES.forEach((name, index) => pyodide.FS.writeFile(`/demo/${name}`, sources[index]));
    pyodide.runPython("import sys; sys.path.insert(0, '/demo')");
    const api = pyodide.pyimport("demo_api");
    api.start(cloudCsv, nativeJson);
    setBanner("");
    return api;
  }

  window.fetch = async (input, init = {}) => {
    const raw = input instanceof Request ? input.url : String(input);
    if (!raw.startsWith("/api/")) return realFetch(input, init);
    try {
      ready ??= boot();
      const api = await ready;
      const url = new URL(raw, location.origin);
      const reply = JSON.parse(api.handle(
        (init.method || "GET").toUpperCase(), url.pathname, url.search.slice(1), init.body ?? "",
      ));
      return new Response(JSON.stringify(reply.body), {
        status: reply.status, headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      setBanner("The in-browser engine could not start. Use a current desktop browser and serve this folder over http(s).", true);
      return new Response(JSON.stringify({ error: "The in-browser engine could not start." }), {
        status: 500, headers: { "Content-Type": "application/json" },
      });
    }
  };
})();
