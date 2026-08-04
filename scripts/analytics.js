// ==UserScript==
// @name         NeoLMS Quiz Analytics Export
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Parse quiz analytics and copy tab-separated data for spreadsheet import
// @match        https://urios.neolms.com/teacher_quiz_assignment/show_analytics/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const PANEL_PREFIX = "analytics";

  // --- Helpers ---

  function log(message, type = "info") {
    const logEl = document.getElementById(`${PANEL_PREFIX}-log`);
    if (!logEl) return;
    const colors = {
      info: "#aaa",
      success: "#2ed573",
      error: "#ff4757",
      warning: "#ffa502",
    };
    const entry = document.createElement("div");
    entry.style.color = colors[type] || colors.info;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logEl.appendChild(entry);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function updateStatus(message) {
    const el = document.getElementById(`${PANEL_PREFIX}-status`);
    if (el) el.textContent = message;
  }

  // --- Parsing ---

  function parseAnalytics() {
    const questions = [];

    const paragraphs = document.querySelectorAll("p");
    for (const p of paragraphs) {
      const bold = p.querySelector("b");
      if (!bold) continue;

      const match = bold.textContent.match(/Question\s+(\d+)/);
      if (!match) continue;

      const qnum = parseInt(match[1], 10);
      const ul = p.nextElementSibling;
      if (!ul || ul.tagName !== "UL") continue;

      const lis = ul.querySelectorAll("li");
      const counts = [];
      let correctIdx = -1;

      for (let i = 0; i < lis.length; i++) {
        const li = lis[i];
        const text = li.textContent || "";

        const countMatch = text.match(/:\s*(\d+)\s/);
        counts.push(countMatch ? parseInt(countMatch[1], 10) : 0);

        const tick = li.querySelector('i.tick, span[title="Yes"]');
        if (tick) correctIdx = i;
      }

      while (counts.length < 4) counts.push(0);

      const total = counts.reduce((a, b) => a + b, 0);
      const correctCount = correctIdx >= 0 ? counts[correctIdx] : 0;
      const pct = total > 0 ? Math.round((correctCount / total) * 1000) / 10 : 0;

      questions.push({
        num: qnum,
        pct,
        correctCount,
        choices: counts.slice(0, 4),
      });
    }

    return questions;
  }

  function buildTSV(questions) {
    const header = "Question #\t% Correct\tCorrect Count\tChoice 1\tChoice 2\tChoice 3\tChoice 4";
    const rows = questions.map((q) =>
      [q.num, q.pct, q.correctCount, ...q.choices].join("\t")
    );
    return [header, ...rows].join("\n");
  }

  // --- Copy ---

  async function copyToClipboard() {
    updateStatus("Parsing...");
    log("Scanning page for quiz data...", "info");

    const questions = parseAnalytics();

    if (questions.length === 0) {
      updateStatus("No quiz data found on page");
      log("No questions detected — make sure you're on the Analytics tab", "warning");
      return;
    }

    log(`Found ${questions.length} questions`, "success");

    const tsv = buildTSV(questions);

    try {
      await navigator.clipboard.writeText(tsv);
      updateStatus(`Copied ${questions.length} questions to clipboard`);
      log(`${questions.length} rows copied — paste into spreadsheet (Cmd+V)`, "success");
    } catch (err) {
      // Fallback: textarea copy
      const ta = document.createElement("textarea");
      ta.value = tsv;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      updateStatus(`Copied ${questions.length} questions to clipboard`);
      log(`${questions.length} rows copied (fallback method)`, "success");
    }
  }

  // --- Collapse ---

  function toggleCollapse() {
    const body = document.getElementById(`${PANEL_PREFIX}-body`);
    const btn = document.getElementById(`${PANEL_PREFIX}-collapse-btn`);
    if (!body || !btn) return;
    const collapsed = body.style.display === "none";
    body.style.display = collapsed ? "" : "none";
    btn.textContent = collapsed ? "\u2212" : "+";
    sessionStorage.setItem(`${PANEL_PREFIX}_collapsed`, collapsed ? "1" : "0");
  }

  // --- Dock ---

  const DOCK_POSITIONS = {
    tr: "top: 10px; right: 10px;",
    tl: "top: 10px; left: 10px;",
    br: "bottom: 10px; right: 10px;",
    bl: "bottom: 10px; left: 10px;",
  };

  function setDockPosition(pos) {
    const panel = document.getElementById(`${PANEL_PREFIX}-panel`);
    if (!panel) return;
    const inner = panel.querySelector("div");
    if (!inner) return;

    inner.style.removeProperty("top");
    inner.style.removeProperty("right");
    inner.style.removeProperty("bottom");
    inner.style.removeProperty("left");

    const css = DOCK_POSITIONS[pos] || DOCK_POSITIONS.tr;
    for (const rule of css.split(";")) {
      const [prop, val] = rule.split(":").map((s) => s.trim());
      if (prop && val) inner.style[prop] = val;
    }

    document.querySelectorAll(`.${PANEL_PREFIX}-dock-btn`).forEach((btn) => {
      btn.style.background = btn.dataset.pos === pos ? "#3a7bd5" : "none";
      btn.style.color = btn.dataset.pos === pos ? "#fff" : "#aaa";
    });

    localStorage.setItem(`${PANEL_PREFIX}_dock_position`, pos);
  }

  // --- UI ---

  function createUI() {
    if (document.getElementById(`${PANEL_PREFIX}-panel`)) return;

    const collapsed = sessionStorage.getItem(`${PANEL_PREFIX}_collapsed`) === "1";
    const savedPos = localStorage.getItem(`${PANEL_PREFIX}_dock_position`) || "tr";
    const dockCss = DOCK_POSITIONS[savedPos] || DOCK_POSITIONS.tr;

    const panel = document.createElement("div");
    panel.id = `${PANEL_PREFIX}-panel`;
    panel.innerHTML = `
      <div style="
        position: fixed;
        ${dockCss}
        z-index: 99999;
        background: #1a1a2e;
        color: #fff;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        font-family: Arial, sans-serif;
        font-size: 14px;
        min-width: 280px;
        max-height: 90vh;
        overflow-y: auto;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${collapsed ? "0" : "10px"};">
          <div style="font-weight: bold; font-size: 16px;">
            Quiz Analytics Export
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-right: 4px;">
              <button class="${PANEL_PREFIX}-dock-btn" data-pos="tl" style="
                width: 16px; height: 16px; background: none; border: 1px solid #555;
                border-radius: 2px; cursor: pointer; font-size: 8px; color: #aaa;
                display: flex; align-items: center; justify-content: center; padding: 0;
              " title="Dock top-left">◱</button>
              <button class="${PANEL_PREFIX}-dock-btn" data-pos="tr" style="
                width: 16px; height: 16px; background: none; border: 1px solid #555;
                border-radius: 2px; cursor: pointer; font-size: 8px; color: #aaa;
                display: flex; align-items: center; justify-content: center; padding: 0;
              " title="Dock top-right">◲</button>
              <button class="${PANEL_PREFIX}-dock-btn" data-pos="bl" style="
                width: 16px; height: 16px; background: none; border: 1px solid #555;
                border-radius: 2px; cursor: pointer; font-size: 8px; color: #aaa;
                display: flex; align-items: center; justify-content: center; padding: 0;
              " title="Dock bottom-left">◰</button>
              <button class="${PANEL_PREFIX}-dock-btn" data-pos="br" style="
                width: 16px; height: 16px; background: none; border: 1px solid #555;
                border-radius: 2px; cursor: pointer; font-size: 8px; color: #aaa;
                display: flex; align-items: center; justify-content: center; padding: 0;
              " title="Dock bottom-right">◳</button>
            </div>
            <button id="${PANEL_PREFIX}-collapse-btn" style="
              width: 24px;
              height: 24px;
              background: none;
              border: 1px solid #555;
              border-radius: 4px;
              color: #aaa;
              cursor: pointer;
              font-size: 16px;
              font-weight: bold;
              display: flex;
              align-items: center;
              justify-content: center;
              line-height: 1;
            " title="Toggle panel">${collapsed ? "+" : "\u2212"}</button>
          </div>
        </div>
        <div id="${PANEL_PREFIX}-body" style="display: ${collapsed ? "none" : ""};">
          <div id="${PANEL_PREFIX}-status" style="margin-bottom: 10px; color: #aaa;">
            Ready
          </div>
          <button id="btn-copy" style="
            width: 100%;
            padding: 8px 12px;
            background: #00d2ff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            color: #000;
            margin-bottom: 10px;
          ">Copy to Clipboard</button>
          <div id="${PANEL_PREFIX}-log" style="
            max-height: 150px;
            overflow-y: auto;
            font-size: 12px;
            color: #aaa;
            background: #111;
            padding: 8px;
            border-radius: 4px;
          "></div>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    document.getElementById(`${PANEL_PREFIX}-collapse-btn`).addEventListener("click", toggleCollapse);
    document.getElementById("btn-copy").addEventListener("click", copyToClipboard);

    document.querySelectorAll(`.${PANEL_PREFIX}-dock-btn`).forEach((btn) => {
      btn.style.background = btn.dataset.pos === savedPos ? "#3a7bd5" : "none";
      btn.style.color = btn.dataset.pos === savedPos ? "#fff" : "#aaa";
      btn.addEventListener("click", () => setDockPosition(btn.dataset.pos));
    });
  }

  // --- Init ---

  function init() {
    createUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
