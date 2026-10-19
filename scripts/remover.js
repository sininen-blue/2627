// ==UserScript==
// @name         NeoLMS Select Questions
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Check the boxes for a pasted list of question numbers
// @match        https://urios.neolms.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const PANEL_PREFIX = "remover";
  const EXAMPLE =
    "3, 6, 8, 10, 11, 16, 22, 26, 32, 34, 36, 40, 41, 43, 45, 47, 49, 53, 55, 56, 64, 66";

  function parseNumbers(text) {
    const seen = new Set();
    const numbers = [];
    for (const part of String(text).split(/[^0-9]+/)) {
      if (!part) continue;
      const n = Number(part);
      if (!Number.isInteger(n) || n < 1 || seen.has(n)) continue;
      seen.add(n);
      numbers.push(n);
    }
    return numbers;
  }

  function cellNumber(cell) {
    const clone = cell.cloneNode(true);
    clone.querySelectorAll("input, select, textarea, button").forEach((el) => el.remove());
    const text = clone.textContent.replace(/\s+/g, " ").trim();
    return /^\d+$/.test(text) ? Number(text) : null;
  }

  function containerOf(box) {
    return box.closest("tr, li, .question, [data-number]") || box.parentElement;
  }

  function displayNumber(box) {
    const marked = box.closest("[data-number]");
    if (marked && /^\d+$/.test(marked.dataset.number)) return Number(marked.dataset.number);

    const container = containerOf(box);
    if (!container) return null;

    const cells = [...container.querySelectorAll("td, th, label, span")];
    for (const cell of cells) {
      const n = cellNumber(cell);
      if (n) return n;
    }
    return cellNumber(container);
  }

  function pageCheckboxes() {
    return [...document.querySelectorAll('input[type="checkbox"]')].filter((box) => {
      if (box.closest(`#${PANEL_PREFIX}-panel`)) return false;
      if (box.closest("thead")) return false;
      return true;
    });
  }

  function checkBox(box) {
    if (box.checked) return;
    box.click();
    if (!box.checked) {
      box.checked = true;
      box.dispatchEvent(new Event("input", { bubbles: true }));
      box.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  function selectNumbers(text) {
    const wanted = parseNumbers(text);
    const boxes = pageCheckboxes();
    const found = new Set();

    for (const box of boxes) {
      const n = displayNumber(box);
      if (!wanted.includes(n) || found.has(n)) continue;
      checkBox(box);
      found.add(n);
    }

    return {
      wanted,
      found: [...found],
      missing: wanted.filter((n) => !found.has(n)),
    };
  }

  function setStatus(message, color) {
    const el = document.getElementById(`${PANEL_PREFIX}-status`);
    if (!el) return;
    el.textContent = message;
    el.style.color = color || "#aaa";
  }

  function createUI() {
    if (document.getElementById(`${PANEL_PREFIX}-panel`)) return;

    const panel = document.createElement("div");
    panel.id = `${PANEL_PREFIX}-panel`;
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
        min-width: 280px;
        max-width: 360px;
      ">
        <div style="margin-bottom: 10px; font-weight: bold; font-size: 16px;">
          Select question numbers
        </div>
        <div id="${PANEL_PREFIX}-status" style="margin-bottom: 10px; color: #aaa;">
          Ready
        </div>
        <textarea id="${PANEL_PREFIX}-input" style="
          width: 100%;
          height: 90px;
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
        " placeholder="3, 6, 8, 10">${EXAMPLE}</textarea>
        <button id="${PANEL_PREFIX}-select" style="
          width: 100%;
          padding: 8px 12px;
          background: #00d2ff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          color: #000;
        ">Select</button>
      </div>
    `;
    document.body.appendChild(panel);

    const input = document.getElementById(`${PANEL_PREFIX}-input`);
    const run = () => {
      const result = selectNumbers(input.value);
      if (result.wanted.length === 0) {
        setStatus("No numbers in the list", "#ff6b6b");
        return result;
      }
      if (result.missing.length === 0) {
        setStatus(`Selected ${result.found.length} of ${result.wanted.length}`, "#7dffa0");
        return result;
      }
      setStatus(
        `Selected ${result.found.length}. Missing ${result.missing.join(", ")}`,
        "#ffb86b",
      );
      return result;
    };

    document.getElementById(`${PANEL_PREFIX}-select`).addEventListener("click", run);

    // remover.html is only an example of the row markup. Select its number cells on open.
    if (document.getElementById("questions")) run();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createUI);
  } else {
    createUI();
  }
})();
