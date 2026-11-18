// Dependency-free SVG/HTML chart components. Text always goes through text nodes, never innerHTML.
const SVG_NS = "http://www.w3.org/2000/svg";

export const PALETTE = ["#0f6cbd", "#0e7c7b", "#8f7200", "#a4262c", "#6b4fa0", "#b4530a"];
export const NEUTRAL = "#8a8a8a";
export const TOKEN_COLORS = { InputTokens: "#0f6cbd", CachedInputTokens: "#0e7c7b", CacheWriteTokens: "#8f7200", OutputTokens: "#6b4fa0" };

export function el(tag, className, ...children) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  for (const child of children.flat()) if (child !== null && child !== undefined && child !== false) element.append(child);
  return element;
}

export function svg(tag, attributes = {}, ...children) {
  const element = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
  for (const child of children.flat()) if (child !== null && child !== undefined && child !== false) element.append(child);
  return element;
}

export function ticks(min, max, count = 4) {
  if (max <= min) max = min + 1;
  const raw = (max - min) / count, magnitude = 10 ** Math.floor(Math.log10(raw)), normal = raw / magnitude;
  const step = (normal <= 1 ? 1 : normal <= 2 ? 2 : normal <= 5 ? 5 : 10) * magnitude;
  const result = [];
  for (let value = Math.floor(min / step) * step; value <= Math.ceil(max / step) * step + step / 2; value += step) {
    result.push(Number(value.toFixed(10)));
  }
  return result;
}

export function legend(items) {
  return el("ul", "legend", items.map((item) => {
    const swatch = el("span", "swatch");
    swatch.style.backgroundColor = item.color;
    return el("li", "", swatch, item.name);
  }));
}

export function dataTable(headers, rows, label) {
  const table = el("table");
  table.setAttribute("aria-label", label);
  const head = el("tr");
  headers.forEach((title, index) => {
    const cell = el("th", index ? "number" : "", title);
    cell.scope = "col";
    head.append(cell);
  });
  const body = el("tbody");
  for (const row of rows) body.append(el("tr", "", row.map((value, index) => el("td", index ? "number" : "", value))));
  table.append(el("thead", "", head), body);
  return el("div", "table-scroll", table);
}

export function sparkline(values, color) {
  const width = 112, height = 32, pad = 3;
  const chart = svg("svg", { viewBox: `0 0 ${width} ${height}`, class: "spark", "aria-hidden": "true", focusable: "false" });
  if (values.length === 1) chart.append(svg("circle", { cx: width - pad, cy: height / 2, r: 2.5, fill: color }));
  if (values.length < 2) return chart;
  const min = Math.min(...values), max = Math.max(...values), span = max - min;
  const points = values.map((value, index) => [
    pad + index * (width - 2 * pad) / (values.length - 1),
    span === 0 ? height / 2 : pad + (max - value) / span * (height - 2 * pad),
  ].map((part) => part.toFixed(1)));
  const line = points.map((point) => point.join(",")).join(" ");
  chart.append(
    svg("polygon", { points: `${pad},${height - pad} ${line} ${width - pad},${height - pad}`, fill: color, "fill-opacity": .12 }),
    svg("polyline", { points: line, fill: "none", stroke: color, "stroke-width": 1.75, "stroke-linejoin": "round", "stroke-linecap": "round" }),
  );
  return chart;
}

function frame(width, height, description) {
  return svg("svg", { viewBox: `0 0 ${width} ${height}`, class: "chart", role: "img", "aria-label": description });
}

// Axis charts redraw at their real width so labels stay a constant size from phone to wide card.
function responsive(build) {
  const box = el("div", "chart-box");
  let current = 0;
  const draw = (width) => { current = width; box.replaceChildren(build(width)); };
  draw(720);
  if (typeof ResizeObserver === "function") {
    new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      if (width >= 240 && Math.abs(width - current) > 8) draw(width);
    }).observe(box);
  }
  return box;
}

const chartHeight = (width) => Math.round(Math.min(300, Math.max(200, width * .38)));

function xLabels(chart, names, label, geometry) {
  const { left, step, height, width } = geometry;
  const every = Math.max(1, Math.ceil(names.length / Math.min(6, Math.max(2, Math.floor((width - left) / 90)))));
  const shown = names.map((_, index) => index).filter((index) => index % every === 0);
  const last = names.length - 1;
  if (last - shown[shown.length - 1] >= every * .6) shown.push(last);
  for (const index of shown) {
    chart.append(svg("text", { x: left + (index + .5) * step, y: height - 10,
      "text-anchor": index === 0 ? "start" : index === last ? "end" : "middle", class: "axis-text" }, label(names[index])));
  }
}

export function stackedColumns(options) {
  return responsive((width) => drawStackedColumns(width, options));
}

function drawStackedColumns(width, { days, series, format, axisFormat, description, label = (name) => name.slice(5) }) {
  const height = chartHeight(width), left = 58, right = 12, top = 12, bottom = 30;
  const extremes = days.map((day) => series.reduce((sum, item) => {
    const value = day.values[item.name] ?? 0;
    return value > 0 ? [sum[0], sum[1] + value] : [sum[0] + value, sum[1]];
  }, [0, 0]));
  const lines = ticks(Math.min(0, ...extremes.map((pair) => pair[0])), Math.max(0, ...extremes.map((pair) => pair[1])));
  const low = lines[0], high = lines[lines.length - 1], span = high - low || 1;
  const y = (value) => top + (high - value) / span * (height - top - bottom);
  const chart = frame(width, height, description);
  for (const value of lines) {
    chart.append(svg("line", { x1: left, x2: width - right, y1: y(value), y2: y(value), class: value === 0 ? "zero-line" : "grid-line" }),
      svg("text", { x: left - 8, y: y(value) + 4, "text-anchor": "end", class: "axis-text" }, axisFormat(value)));
  }
  const step = (width - left - right) / days.length;
  days.forEach((day, index) => {
    let up = 0, down = 0;
    for (const item of series) {
      const value = day.values[item.name];
      if (!value) continue;
      const from = value > 0 ? up : down, to = from + value;
      if (value > 0) up = to; else down = to;
      chart.append(svg("rect", {
        x: left + index * step + step * .14, y: y(Math.max(from, to)), width: Math.max(step * .72, 1),
        height: Math.abs(y(from) - y(to)), fill: item.color, stroke: "#fff", "stroke-width": .5,
      }, svg("title", {}, `${day.name} / ${item.name}: ${format(value)}`)));
    }
  });
  xLabels(chart, days.map((day) => day.name), label, { left, step, height, width });
  return chart;
}

export function lineChart(options) {
  return responsive((width) => drawLineChart(width, options));
}

function drawLineChart(width, { series, xMax, xTicks, format, axisFormat, description }) {
  const height = chartHeight(width), left = 58, right = 16, top = 14, bottom = 30;
  const every = series.flatMap((item) => item.points.map((point) => point[1]));
  const lines = ticks(Math.min(0, ...every), Math.max(0, ...every));
  const low = lines[0], high = lines[lines.length - 1], span = high - low || 1;
  const x = (value) => left + value / (xMax || 1) * (width - left - right);
  const y = (value) => top + (high - value) / span * (height - top - bottom);
  const chart = frame(width, height, description);
  for (const value of lines) {
    chart.append(svg("line", { x1: left, x2: width - right, y1: y(value), y2: y(value), class: value === 0 ? "zero-line" : "grid-line" }),
      svg("text", { x: left - 8, y: y(value) + 4, "text-anchor": "end", class: "axis-text" }, axisFormat(value)));
  }
  xTicks.forEach((tick, index) => chart.append(svg("text", {
    x: x(tick.x), y: height - 10, class: "axis-text",
    "text-anchor": index === 0 ? "start" : index === xTicks.length - 1 ? "end" : "middle",
  }, tick.label)));
  for (const item of series) {
    const points = item.points.map(([px, py]) => `${x(px).toFixed(1)},${y(py).toFixed(1)}`).join(" ");
    if (item.points.length > 1) {
      chart.append(svg("polyline", { points, fill: "none", stroke: item.color, "stroke-width": 2.25, "stroke-linejoin": "round",
        "stroke-linecap": "round", ...(item.dash ? { "stroke-dasharray": "6 5", "stroke-opacity": .7 } : {}) }));
    }
    const end = item.points[item.points.length - 1];
    if (end && !item.dash) chart.append(svg("circle", { cx: x(end[0]), cy: y(end[1]), r: 4, fill: item.color, stroke: "#fff", "stroke-width": 1.5 },
      svg("title", {}, `${item.name}: ${format(end[1])} to date`)));
  }
  return chart;
}

function track(value, top, color) {
  return svg("svg", { viewBox: "0 0 100 10", preserveAspectRatio: "none", class: "bar-svg", "aria-hidden": "true", focusable: "false" },
    svg("rect", { width: 100, height: 10, fill: "#f0f0f0" }),
    svg("rect", { width: top > 0 ? Math.max(value / top * 100, value > 0 ? .6 : 0) : 0, height: 10, fill: color }));
}

export function bars(rows, { max } = {}) {
  const top = max ?? Math.max(...rows.map((row) => row.value), 0);
  return el("div", "bars", rows.map((row) => {
    const line = el("div", "bar-row", el("span", "bar-label", row.label, row.note ? el("small", "", row.note) : null),
      track(row.value, top, row.color ?? PALETTE[0]), el("strong", "bar-value", row.text));
    if (row.title) line.title = row.title;
    return line;
  }));
}

export function pairedBars(rows, [first, second]) {
  const top = Math.max(...rows.flatMap((row) => [row.a, row.b]), 0);
  return el("div", "bars paired", rows.map((row) => {
    const chart = svg("svg", { viewBox: "0 0 100 21", preserveAspectRatio: "none", class: "bar-svg pair", "aria-hidden": "true", focusable: "false" },
      svg("rect", { width: 100, height: 21, fill: "#f7f7f7" }),
      svg("rect", { width: top ? Math.max(row.a / top * 100, row.a > 0 ? .6 : 0) : 0, height: 9, fill: first.color }),
      svg("rect", { y: 12, width: top ? Math.max(row.b / top * 100, row.b > 0 ? .6 : 0) : 0, height: 9, fill: second.color }));
    return el("div", "bar-row", el("span", "bar-label", row.label), chart,
      el("span", "bar-value two", el("strong", "", row.aText), el("small", "", row.bText)));
  }));
}

export function stackedShare(rows, segments) {
  return el("div", "bars", rows.map((row) => {
    const total = row.parts.reduce((sum, part) => sum + part, 0) || 1;
    let offset = 0;
    const chart = svg("svg", { viewBox: "0 0 100 10", preserveAspectRatio: "none", class: "bar-svg", "aria-hidden": "true", focusable: "false" },
      svg("rect", { width: 100, height: 10, fill: "#f0f0f0" }),
      row.parts.map((part, index) => {
        const width = part / total * 100, piece = svg("rect", { x: offset, width, height: 10, fill: segments[index].color, stroke: "#fff", "stroke-width": .3 },
          svg("title", {}, `${row.label} / ${segments[index].name}: ${(width).toFixed(1)}%`));
        offset += width;
        return piece;
      }));
    const line = el("div", "bar-row", el("span", "bar-label", row.label), chart, el("strong", "bar-value", row.text));
    if (row.title) line.title = row.title;
    return line;
  }));
}

const BINS = [["#f7fbd0", false], ["#c7e9b4", false], ["#7fcdbb", false], ["#1d6fa5", true], ["#253494", true]];
const EDGES = [.1, .3, .55, .8];

export function heatmap({ label, corner, rows, cols, values, format, max, low = "Lower", high = "Higher" }) {
  const top = max ?? Math.max(0, ...values.flat().filter((value) => value !== null).map(Math.abs));
  const head = el("tr", "", el("th", "corner", corner));
  head.firstChild.scope = "col";
  for (const column of cols) {
    const cell = el("th", "", column.color ? (() => { const dot = el("span", "swatch"); dot.style.backgroundColor = column.color; return dot; })() : null, column.label);
    cell.scope = "col";
    head.append(cell);
  }
  const body = el("tbody");
  rows.forEach((name, rowIndex) => {
    const line = el("tr");
    const header = el("th", "row-head", name);
    header.scope = "row";
    line.append(header);
    values[rowIndex].forEach((value, columnIndex) => {
      const cell = el("td", value === null ? "heat-empty" : "heat-cell", value === null ? "\u2014" : format(value));
      if (value === null) cell.title = `${name} / ${cols[columnIndex].label}: no charges`;
      else {
        const ratio = top ? Math.abs(value) / top : 0;
        const [background, light] = BINS[EDGES.filter((edge) => ratio >= edge).length];
        cell.style.backgroundColor = background;
        cell.style.color = light ? "#fff" : "#242424";
        cell.title = `${name} / ${cols[columnIndex].label}: ${format(value)}`;
      }
      line.append(cell);
    });
    body.append(line);
  });
  const table = el("table", "heat", el("thead", "", head), body);
  table.setAttribute("aria-label", label);
  const scale = el("div", "heat-scale", el("span", "", low), BINS.map(([color]) => {
    const swatch = el("span", "swatch wide");
    swatch.style.backgroundColor = color;
    return swatch;
  }), el("span", "", high));
  return el("div", "heat-wrap", el("div", "table-scroll", table), scale);
}
