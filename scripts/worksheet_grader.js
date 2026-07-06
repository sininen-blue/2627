// ==UserScript==
// @name         NeoLMS Worksheet Grader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bulk grade worksheet assignments with rubric rows
// @match        https://urios.neolms.com/teacher_dropbox_assignment/grade/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const INPUT_STYLE = `
        padding: 6px 8px;
        border: 1px solid #333;
        border-radius: 4px;
        background: #111;
        color: #fff;
        font-family: monospace;
        font-size: 12px;
        box-sizing: border-box;
    `;

  const ROW_STYLE = `
        display: flex;
        gap: 6px;
        margin-bottom: 6px;
        align-items: center;
    `;

  const LABEL_STYLE = `
        font-size: 11px;
        color: #aaa;
        margin-bottom: 2px;
    `;

  const PANEL_PREFIX = "grade";

  function toggleCollapse() {
    const body = document.getElementById(`${PANEL_PREFIX}-body`);
    const btn = document.getElementById(`${PANEL_PREFIX}-collapse-btn`);
    if (!body || !btn) return;
    const collapsed = body.style.display === "none";
    body.style.display = collapsed ? "" : "none";
    btn.textContent = collapsed ? "\u2212" : "+";
    sessionStorage.setItem(`${PANEL_PREFIX}_collapsed`, collapsed ? "1" : "0");
  }

  function createUI() {
    if (document.getElementById("grade-panel")) return;

    const collapsed = sessionStorage.getItem(`${PANEL_PREFIX}_collapsed`) === "1";

    const panel = document.createElement("div");
    panel.id = "grade-panel";
    panel.innerHTML = `
            <div style="
                position: fixed;
                top: 10px;
                right: 10px;
                z-index: 99999;
                background: #1a1a2e;
                color: #fff;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                font-family: Arial, sans-serif;
                font-size: 14px;
                min-width: 320px;
                max-height: 90vh;
                overflow-y: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${collapsed ? "0" : "10px"};">
                    <div style="font-weight: bold; font-size: 16px;">
                        Worksheet Grader
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
                <div id="${PANEL_PREFIX}-body" style="display: ${collapsed ? "none" : ""};">
                    <div id="grade-status" style="margin-bottom: 10px; color: #aaa;">
                        Ready
                    </div>

                    <div style="display: flex; gap: 8px; margin-bottom: 10px; align-items: center;">
                        <label style="font-size: 12px; color: #aaa; white-space: nowrap;">Rows:</label>
                        <input type="number" id="grade-row-count" value="3" min="1" max="20" style="
                            width: 50px;
                            ${INPUT_STYLE}
                        ">
                        <button id="btn-generate" style="
                            padding: 6px 12px;
                            background: #3a7bd5;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            font-weight: bold;
                            color: #fff;
                            font-size: 12px;
                        ">Generate</button>
                    </div>

                    <div style="margin-bottom: 6px;">
                        <div style="display: flex; gap: 6px; margin-bottom: 4px; padding: 0 2px;">
                            <div style="flex: 2; ${LABEL_STYLE}">Criteria</div>
                            <div style="flex: 1; ${LABEL_STYLE}">Max</div>
                            <div style="flex: 1; ${LABEL_STYLE}">Earned</div>
                            <div style="width: 24px;"></div>
                        </div>
                        <div id="grade-rows" style="
                            max-height: 250px;
                            overflow-y: auto;
                            padding-right: 4px;
                        "></div>
                    </div>

                    <div style="display: flex; gap: 8px; margin-bottom: 10px; align-items: center;">
                        <label style="font-size: 12px; color: #aaa; white-space: nowrap;">Multiplier:</label>
                        <input type="number" id="grade-multiplier" value="1" min="0" step="0.1" style="
                            width: 60px;
                            ${INPUT_STYLE}
                        ">
                        <span style="font-size: 11px; color: #aaa;">(applies to total)</span>
                    </div>

                    <div id="grade-total" style="
                        margin-bottom: 10px;
                        padding: 8px;
                        background: #111;
                        border-radius: 4px;
                        font-weight: bold;
                        font-size: 14px;
                        color: #00d2ff;
                        text-align: center;
                    ">
                        Total: 0 / 0
                    </div>

                    <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                        <button id="btn-apply" style="
                            flex: 1;
                            padding: 8px 12px;
                            background: #00d2ff;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            font-weight: bold;
                            color: #000;
                        ">Apply All</button>
                        <button id="btn-clear" style="
                            flex: 1;
                            padding: 8px 12px;
                            background: #ff4757;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            font-weight: bold;
                            color: #fff;
                        ">Clear</button>
                    </div>

                    <div id="grade-log" style="
                        max-height: 120px;
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
    document.getElementById("btn-generate").addEventListener("click", handleGenerate);
    document.getElementById("btn-apply").addEventListener("click", handleApply);
    document.getElementById("btn-clear").addEventListener("click", handleClear);
    document.getElementById("grade-multiplier").addEventListener("input", calculateTotal);

    generateRows(3);
  }

  function log(message, type = "info") {
    const logEl = document.getElementById("grade-log");
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
    const el = document.getElementById("grade-status");
    if (el) el.textContent = message;
  }

  function generateRows(count) {
    const container = document.getElementById("grade-rows");
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const row = document.createElement("div");
      row.style.cssText = ROW_STYLE;
      row.innerHTML = `
                <input type="text" class="grade-criteria-name" placeholder="e.g. Thesis" style="
                    flex: 2;
                    ${INPUT_STYLE}
                ">
                <input type="number" class="grade-max" placeholder="Max" min="0" style="
                    flex: 1;
                    ${INPUT_STYLE}
                ">
                <input type="number" class="grade-earned" placeholder="Pts" min="0" style="
                    flex: 1;
                    ${INPUT_STYLE}
                ">
                <button class="grade-remove-row" style="
                    width: 24px;
                    height: 24px;
                    background: none;
                    border: 1px solid #555;
                    border-radius: 4px;
                    color: #ff4757;
                    cursor: pointer;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                " title="Remove row">&times;</button>
            `;

      row
        .querySelector(".grade-earned")
        .addEventListener("input", calculateTotal);
      row.querySelector(".grade-max").addEventListener("input", calculateTotal);
      row
        .querySelector(".grade-remove-row")
        .addEventListener("click", function () {
          row.remove();
          calculateTotal();
        });

      container.appendChild(row);
    }

    calculateTotal();
    log(`Generated ${count} rows`);
  }

  function getRows() {
    const container = document.getElementById("grade-rows");
    if (!container) return [];

    const rows = [];
    const rowEls = container.children;

    for (const row of rowEls) {
      const name =
        row.querySelector(".grade-criteria-name")?.value.trim() || "";
      const max = parseFloat(row.querySelector(".grade-max")?.value) || 0;
      const earned = parseFloat(row.querySelector(".grade-earned")?.value) || 0;
      rows.push({ name, max, earned });
    }

    return rows;
  }

  function calculateTotal() {
    const rows = getRows();
    let totalEarned = 0;
    let totalMax = 0;

    for (const row of rows) {
      totalEarned += row.earned;
      totalMax += row.max;
    }

    const multiplier = parseFloat(document.getElementById("grade-multiplier")?.value) || 1;
    const finalEarned = totalEarned * multiplier;
    const finalMax = totalMax * multiplier;

    const el = document.getElementById("grade-total");
    if (el) {
      el.textContent = `Total: ${finalEarned} / ${finalMax}`;
      el.style.color = finalMax > 0 ? "#00d2ff" : "#aaa";
    }

    return { earned: finalEarned, max: finalMax };
  }

  function generateComment() {
    const rows = getRows();
    const lines = [];
    let totalEarned = 0;
    let totalMax = 0;

    for (const row of rows) {
      if (row.max === 0 && row.earned === 0) continue;
      const label = row.name || "Untitled";
      lines.push(`${label}: ${row.earned}/${row.max}`);
      totalEarned += row.earned;
      totalMax += row.max;
    }

    if (lines.length === 0) return null;

    const multiplier = parseFloat(document.getElementById("grade-multiplier")?.value) || 1;
    const finalEarned = totalEarned * multiplier;
    const finalMax = totalMax * multiplier;

    lines.push("");
    if (multiplier !== 1) {
      lines.push(`Total: ${finalEarned}/${finalMax} (x${multiplier})`);
    } else {
      lines.push(`Total: ${finalEarned}/${finalMax}`);
    }

    return lines.join("\n");
  }

  function setGrade(score) {
    const input = document.querySelector(".grade-input-field");
    if (!input) {
      log("Grade input field (.grade-input-field) not found", "error");
      return false;
    }

    input.value = score;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    log(`Set grade to ${score}`, "success");
    return true;
  }

  function insertComment(text) {
    if (!text) {
      log("No comment to insert", "warning");
      return false;
    }

    const html = "<p>" + text.replace(/\n/g, "<br>") + "</p>";

    // Try TinyMCE API
    if (typeof tinymce !== "undefined" && tinymce.activeEditor) {
      tinymce.activeEditor.setContent(html);
      log("Comment inserted via TinyMCE API", "success");
      return true;
    }

    // Fallback: iframe contentDocument
    const iframe = document.getElementById("comment_ifr");
    if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
      iframe.contentDocument.body.innerHTML = html;
      log("Comment inserted via iframe", "success");
      return true;
    }

    log("TinyMCE editor not found", "error");
    return false;
  }

  function handleGenerate() {
    const input = document.getElementById("grade-row-count");
    const count = parseInt(input?.value) || 3;
    generateRows(Math.max(1, Math.min(20, count)));
  }

  function handleApply() {
    const rows = getRows();
    if (rows.length === 0) {
      log("No rows defined. Generate rows first.", "error");
      return;
    }

    const filled = rows.filter((r) => r.earned !== 0 || r.max !== 0);
    if (filled.length === 0) {
      log("No scores entered. Fill in earned points.", "error");
      return;
    }

    const { earned, max } = calculateTotal();

    // Set grade
    setGrade(earned);

    // Generate and insert comment
    const comment = generateComment();
    if (comment) {
      insertComment(comment);
    }

    updateStatus(`Applied: ${earned}/${max}`);
    log(`Applied ${filled.length} criteria: ${earned}/${max}`, "success");
  }

  function handleClear() {
    const container = document.getElementById("grade-rows");
    if (!container) return;

    for (const row of container.children) {
      const name = row.querySelector(".grade-criteria-name");
      const max = row.querySelector(".grade-max");
      const earned = row.querySelector(".grade-earned");
      if (name) name.value = "";
      if (max) max.value = "";
      if (earned) earned.value = "";
    }

    const multiplier = document.getElementById("grade-multiplier");
    if (multiplier) multiplier.value = "1";

    calculateTotal();
    updateStatus("Cleared");
    log("All rows cleared");
  }

  function waitForEditor() {
    const observer = new MutationObserver(() => {
      if (!document.getElementById("grade-panel")) {
        if (
          document.querySelector(".grade-input-field") ||
          document.getElementById("comment_ifr")
        ) {
          createUI();
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    if (
      document.querySelector(".grade-input-field") ||
      document.getElementById("comment_ifr")
    ) {
      createUI();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForEditor);
  } else {
    waitForEditor();
  }
})();
