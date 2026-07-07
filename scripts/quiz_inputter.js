// ==UserScript==
// @name         NeoLMS Quiz Inputter
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Bulk paste quiz questions from Markdown and submit sequentially
// @match        https://urios.neolms.com/quiz_question_bank/new_question/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const PANEL_PREFIX = "quiz";
  const STORAGE_KEY = "quiz_batch_queue";
  const AUTO_KEY = "quiz_auto_continue";
  const LOG_KEY = "quiz_logs";
  const TOTAL_KEY = "quiz_total_count";

  const fields = [
    "#question_description",
    "#text_1",
    "#text_2",
    "#text_3",
    "#text_4",
  ];

  let isRunning = false;

  // --- Helpers ---

  function log(message, type = "info") {
    const entry = { message, type, time: new Date().toLocaleTimeString() };

    const logs = JSON.parse(sessionStorage.getItem(LOG_KEY) || "[]");
    logs.push(entry);
    sessionStorage.setItem(LOG_KEY, JSON.stringify(logs));

    renderLogEntry(entry);
  }

  function renderLogEntry(entry) {
    const logEl = document.getElementById(`${PANEL_PREFIX}-log`);
    if (!logEl) return;
    const colors = {
      info: "#aaa",
      success: "#2ed573",
      error: "#ff4757",
      warning: "#ffa502",
    };
    const div = document.createElement("div");
    div.style.color = colors[entry.type] || colors.info;
    div.textContent = `[${entry.time}] ${entry.message}`;
    logEl.appendChild(div);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function restoreLogs() {
    const logs = JSON.parse(sessionStorage.getItem(LOG_KEY) || "[]");
    logs.forEach(renderLogEntry);
  }

  function clearLogs() {
    sessionStorage.removeItem(LOG_KEY);
    const logEl = document.getElementById(`${PANEL_PREFIX}-log`);
    if (logEl) logEl.innerHTML = "";
  }

  function updateStatus(message) {
    const el = document.getElementById(`${PANEL_PREFIX}-status`);
    if (el) el.textContent = message;
  }

  function updateProgress(current, total) {
    const el = document.getElementById(`${PANEL_PREFIX}-progress`);
    if (el) el.style.width = `${(current / total) * 100}%`;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // --- Parsing ---

  function parseInput(text) {
    const normalizedText = text.replace(/\\n/g, "\n");

    const blocks = normalizedText
      .split(/---/)
      .map((b) => b.trim())
      .filter((b) => b);

    return blocks.map((block) => {
      const lines = block.split("\n");
      const firstBulletIndex = lines.findIndex((line) =>
        line.trim().startsWith("- "),
      );

      if (firstBulletIndex !== -1) {
        const question = lines.slice(0, firstBulletIndex).join("\n").trim();
        const options = lines
          .slice(firstBulletIndex)
          .map((line) => line.trim())
          .filter((line) => line.startsWith("- "))
          .map((line) => line.substring(2).trim());

        return [question, ...options];
      }

      return block
        .split(/\s*-\s+/)
        .map((p) => p.trim())
        .filter((p) => p);
    });
  }

  // --- Queue Processing ---

  function processNext() {
    let queue = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    const total = parseInt(sessionStorage.getItem(TOTAL_KEY) || "0", 10);

    if (queue.length === 0) {
      updateStatus("Queue empty — paste questions to begin");
      sessionStorage.removeItem(AUTO_KEY);
      sessionStorage.removeItem(TOTAL_KEY);
      isRunning = false;
      return;
    }

    const current = queue.shift();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(queue));

    const done = total - queue.length;
    updateStatus(`${done}/${total} — processing question ${done}`);
    updateProgress(done, total);

    if (current && Array.isArray(current)) {
      fields.forEach((sel, i) => {
        const el = document.querySelector(sel);
        if (el && current[i]) el.value = current[i];
      });

      log(`Filled: ${current[0].substring(0, 60)}...`, "success");

      const submitBtn = document.querySelector(
        'a[href*="commit_and_another_same"]',
      );
      if (submitBtn) {
        const isLast = queue.length === 0;
        setTimeout(() => {
          submitBtn.click();
          if (isLast) {
            updateStatus(`Done — ${total} questions submitted`);
            updateProgress(total, total);
            log(`Batch complete — ${total} questions`, "success");
            sessionStorage.removeItem(AUTO_KEY);
            sessionStorage.removeItem(TOTAL_KEY);
            clearLogs();
            isRunning = false;
          }
        }, 500);
      } else {
        log("Submit button not found", "error");
        updateStatus("Error — submit button not found");
        sessionStorage.removeItem(STORAGE_KEY);
        isRunning = false;
      }
    } else {
      log("Skipping invalid queue item", "warning");
      if (queue.length > 0) {
        setTimeout(processNext, 300);
      } else {
        updateStatus("Done");
        sessionStorage.removeItem(AUTO_KEY);
        isRunning = false;
      }
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

  // --- Start / Stop ---

  function start() {
    if (isRunning) return;

    const input = document.getElementById(`${PANEL_PREFIX}-input`);
    const raw = input ? input.value.trim() : "";

    let queue = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");

    if (queue.length === 0 && !raw) {
      log("No questions in queue and nothing pasted", "warning");
      return;
    }

    if (queue.length === 0 && raw) {
      queue = parseInput(raw);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
      sessionStorage.setItem(TOTAL_KEY, String(queue.length));
      log(`Parsed ${queue.length} questions from input`, "info");
      input.value = "";
    }

    isRunning = true;
    sessionStorage.setItem(AUTO_KEY, "1");
    updateStatus(`Starting — ${queue.length} questions in queue`);
    log(`Processing ${queue.length} questions`, "info");
    processNext();
  }

  function stop() {
    isRunning = false;
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(AUTO_KEY);
    sessionStorage.removeItem(TOTAL_KEY);
    updateStatus("Stopped — queue cleared");
    updateProgress(0, 1);
    log("Stopped by user", "warning");
  }

  // --- UI ---

  function createUI() {
    if (document.getElementById(`${PANEL_PREFIX}-panel`)) return;

    const collapsed =
      sessionStorage.getItem(`${PANEL_PREFIX}_collapsed`) === "1";
    const savedPos =
      localStorage.getItem(`${PANEL_PREFIX}_dock_position`) || "tr";
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
            Quiz Inputter
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
          <div style="margin-bottom: 10px;">
            <div style="background: #333; border-radius: 4px; overflow: hidden;">
              <div id="${PANEL_PREFIX}-progress" style="
                background: linear-gradient(90deg, #00d2ff, #3a7bd5);
                height: 8px;
                width: 0%;
                transition: width 0.3s;
              "></div>
            </div>
          </div>
          <textarea id="${PANEL_PREFIX}-input" style="
            width: 100%;
            height: 80px;
            margin-bottom: 10px;
            padding: 8px;
            border: 1px solid #333;
            border-radius: 4px;
            background: #111;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            resize: vertical;
            box-sizing: border-box;
          " placeholder="Paste quiz markdown here..."></textarea>
          <div style="display: flex; gap: 8px;">
            <button id="btn-start" style="
              flex: 1;
              padding: 8px 12px;
              background: #00d2ff;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-weight: bold;
              color: #000;
            ">Start</button>
            <button id="btn-stop" style="
              flex: 1;
              padding: 8px 12px;
              background: #ff4757;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-weight: bold;
              color: #fff;
            ">Stop</button>
          </div>
          <div id="${PANEL_PREFIX}-log" style="
            margin-top: 10px;
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
    restoreLogs();

    // Events
    document
      .getElementById(`${PANEL_PREFIX}-collapse-btn`)
      .addEventListener("click", toggleCollapse);
    document.getElementById("btn-start").addEventListener("click", start);
    document.getElementById("btn-stop").addEventListener("click", stop);

    // Dock buttons
    document.querySelectorAll(`.${PANEL_PREFIX}-dock-btn`).forEach((btn) => {
      btn.style.background = btn.dataset.pos === savedPos ? "#3a7bd5" : "none";
      btn.style.color = btn.dataset.pos === savedPos ? "#fff" : "#aaa";
      btn.addEventListener("click", () => setDockPosition(btn.dataset.pos));
    });
  }

  // --- Init ---

  function init() {
    createUI();

    const queue = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    const autoContinue = sessionStorage.getItem(AUTO_KEY) === "1";
    const total = parseInt(sessionStorage.getItem(TOTAL_KEY) || "0", 10);

    if (autoContinue && queue.length > 0) {
      const done = total - queue.length;
      updateStatus(
        `Resuming — ${done}/${total} done, ${queue.length} remaining`,
      );
      updateProgress(done, total);
      log(`Auto-resuming — ${queue.length} questions left`, "info");
      isRunning = true;
      setTimeout(processNext, 800);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
