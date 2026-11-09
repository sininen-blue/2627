// ==UserScript==
// @name         NeoLMS Freeform View
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  On a quiz grading page, hide questions that are not freeform or are worth no points
// @match        https://urios.neolms.com/teacher_quiz_assignment/grade/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const PANEL_PREFIX = "ffview";
  const HIDDEN_ATTR = "data-ffview-hidden";
  const FILTER_KEY = `${PANEL_PREFIX}_filtered`;

  const DOCK_POSITIONS = {
    tr: "top: 10px; right: 10px;",
    tl: "top: 10px; left: 10px;",
    br: "bottom: 10px; right: 10px;",
    bl: "bottom: 10px; left: 10px;",
  };

  function gradeForm() {
    return document.getElementById("grade_form");
  }

  function isQuestionHeading(node) {
    return (
      node &&
      node.nodeType === 1 &&
      node.tagName === "H2" &&
      /^Question\s+\d+\b/.test(node.textContent.replace(/\s+/g, " ").trim())
    );
  }

  function questionBlocks(form) {
    const children = [...form.childNodes];
    const starts = children
      .map((node, index) => (isQuestionHeading(node) ? index : -1))
      .filter((index) => index >= 0);

    return starts.map((start, i) => {
      const end = starts[i + 1] ?? children.length;
      const nodes = [];
      for (let index = start; index < end; index++) {
        const node = children[index];
        if (node.nodeType === 1 && node.classList.contains("optionsRibbon")) break;
        nodes.push(node);
      }
      return nodes;
    });
  }

  function typeParagraph(nodes) {
    return nodes.find(
      (node) => node.nodeType === 1 && node.tagName === "P" && node.querySelector("i"),
    );
  }

  function isFreeform(nodes) {
    const paragraph = typeParagraph(nodes);
    if (!paragraph) return false;
    const icon = paragraph.querySelector("i");
    const title = icon?.getAttribute("title") || "";
    if (/freeform/i.test(title) || icon?.classList.contains("pencil")) return true;
    return /^Freeform\b/i.test(paragraph.textContent.replace(/\s+/g, " ").trim());
  }

  function maxPoints(nodes) {
    for (const node of nodes) {
      if (node.nodeType !== 1) continue;
      if (!node.querySelector('input[name^="scores["]')) continue;
      const text = node.textContent.replace(/\s+/g, " ");
      const match = text.match(/out of\s+(\d+(?:\.\d+)?)/i);
      if (!match) return 0;
      const points = Number(match[1]);
      return Number.isFinite(points) ? points : 0;
    }
    return 0;
  }

  function questionNumber(nodes) {
    const heading = nodes.find(isQuestionHeading);
    const match = heading?.textContent.match(/Question\s+(\d+)/);
    return match ? Number(match[1]) : null;
  }

  function classify(nodes) {
    const freeform = isFreeform(nodes);
    const points = maxPoints(nodes);
    return {
      number: questionNumber(nodes),
      freeform,
      points,
      keep: freeform && points > 0,
    };
  }

  function hideNode(node) {
    if (node.nodeType !== 1 || node.hasAttribute(HIDDEN_ATTR)) return;
    node.setAttribute(HIDDEN_ATTR, node.style.display || "");
    node.style.display = "none";
  }

  function showNode(node) {
    if (node.nodeType !== 1 || !node.hasAttribute(HIDDEN_ATTR)) return;
    node.style.display = node.getAttribute(HIDDEN_ATTR);
    node.removeAttribute(HIDDEN_ATTR);
  }

  function setFiltered(on) {
    sessionStorage.setItem(FILTER_KEY, on ? "1" : "0");
  }

  function isFiltered() {
    return sessionStorage.getItem(FILTER_KEY) !== "0";
  }

  function applyView() {
    const form = gradeForm();
    const button = document.getElementById(`${PANEL_PREFIX}-toggle`);
    if (!form) {
      updateStatus("No grading form on this page");
      if (button) button.textContent = "Freeform only";
      return null;
    }

    const blocks = questionBlocks(form).map((nodes) => ({
      nodes,
      ...classify(nodes),
    }));
    const filtering = isFiltered();

    for (const block of blocks) {
      for (const node of block.nodes) {
        if (filtering && !block.keep) hideNode(node);
        else showNode(node);
      }
    }

    const kept = blocks.filter((block) => block.keep);
    const hidden = blocks.length - kept.length;
    const worth = kept.reduce((sum, block) => sum + block.points, 0);

    if (!filtering) {
      updateStatus(`Showing all ${blocks.length} questions`);
    } else if (kept.length === 0) {
      updateStatus(`No freeform questions worth points. Hid ${hidden}.`);
    } else {
      const nums = kept.map((block) => block.number).filter((n) => n != null);
      updateStatus(
        `Showing ${kept.length} freeform (${worth} pts): ${nums.join(", ")}. Hid ${hidden}.`,
      );
    }

    if (button) button.textContent = filtering ? "Show all" : "Freeform only";
    return { blocks, kept, hidden };
  }

  function updateStatus(message) {
    const el = document.getElementById(`${PANEL_PREFIX}-status`);
    if (el) el.textContent = message;
  }

  function toggleCollapse() {
    const body = document.getElementById(`${PANEL_PREFIX}-body`);
    const btn = document.getElementById(`${PANEL_PREFIX}-collapse-btn`);
    const title = document.getElementById(`${PANEL_PREFIX}-titlebar`);
    if (!body || !btn) return;
    const collapsed = body.style.display === "none";
    body.style.display = collapsed ? "" : "none";
    btn.textContent = collapsed ? "\u2212" : "+";
    if (title) title.style.marginBottom = collapsed ? "10px" : "0";
    sessionStorage.setItem(`${PANEL_PREFIX}_collapsed`, collapsed ? "0" : "1");
  }

  function setDockPosition(pos) {
    const panel = document.getElementById(`${PANEL_PREFIX}-panel`);
    if (!panel) return;
    const inner = panel.querySelector("div");
    if (!inner) return;

    inner.style.removeProperty("top");
    inner.style.removeProperty("right");
    inner.style.removeProperty("bottom");
    inner.style.removeProperty("left");

    const css = DOCK_POSITIONS[pos] || DOCK_POSITIONS.tl;
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

  function createUI() {
    if (document.getElementById(`${PANEL_PREFIX}-panel`)) return;
    if (!gradeForm()) return;

    const collapsed = sessionStorage.getItem(`${PANEL_PREFIX}_collapsed`) === "1";
    const savedPos = localStorage.getItem(`${PANEL_PREFIX}_dock_position`) || "tl";
    const posCSS = DOCK_POSITIONS[savedPos] || DOCK_POSITIONS.tl;

    const panel = document.createElement("div");
    panel.id = `${PANEL_PREFIX}-panel`;
    panel.innerHTML = `
      <div style="
        position: fixed;
        ${posCSS}
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
        <div id="${PANEL_PREFIX}-titlebar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${collapsed ? "0" : "10px"};">
          <div style="font-weight: bold; font-size: 16px;">Freeform view</div>
          <div style="display: flex; gap: 4px; align-items: center;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-right: 4px;">
              <button class="${PANEL_PREFIX}-dock-btn" data-pos="tl" style="width: 16px; height: 16px; background: none; border: 1px solid #555; border-radius: 2px; cursor: pointer; font-size: 8px; color: #aaa; display: flex; align-items: center; justify-content: center; padding: 0;" title="Dock top-left">◱</button>
              <button class="${PANEL_PREFIX}-dock-btn" data-pos="tr" style="width: 16px; height: 16px; background: none; border: 1px solid #555; border-radius: 2px; cursor: pointer; font-size: 8px; color: #aaa; display: flex; align-items: center; justify-content: center; padding: 0;" title="Dock top-right">◲</button>
              <button class="${PANEL_PREFIX}-dock-btn" data-pos="bl" style="width: 16px; height: 16px; background: none; border: 1px solid #555; border-radius: 2px; cursor: pointer; font-size: 8px; color: #aaa; display: flex; align-items: center; justify-content: center; padding: 0;" title="Dock bottom-left">◰</button>
              <button class="${PANEL_PREFIX}-dock-btn" data-pos="br" style="width: 16px; height: 16px; background: none; border: 1px solid #555; border-radius: 2px; cursor: pointer; font-size: 8px; color: #aaa; display: flex; align-items: center; justify-content: center; padding: 0;" title="Dock bottom-right">◳</button>
            </div>
            <button id="${PANEL_PREFIX}-collapse-btn" style="width: 24px; height: 24px; background: none; border: 1px solid #555; border-radius: 4px; color: #aaa; cursor: pointer; font-size: 16px; font-weight: bold; display: flex; align-items: center; justify-content: center; line-height: 1;" title="Toggle panel">${collapsed ? "+" : "\u2212"}</button>
          </div>
        </div>
        <div id="${PANEL_PREFIX}-body" style="display: ${collapsed ? "none" : ""};">
          <div id="${PANEL_PREFIX}-status" style="margin-bottom: 10px; color: #aaa;">Ready</div>
          <button id="${PANEL_PREFIX}-toggle" style="width: 100%; padding: 8px 12px; background: #00d2ff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; color: #000;">Show all</button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    document.getElementById(`${PANEL_PREFIX}-collapse-btn`).addEventListener("click", toggleCollapse);
    document.querySelectorAll(`.${PANEL_PREFIX}-dock-btn`).forEach((btn) => {
      btn.addEventListener("click", () => setDockPosition(btn.dataset.pos));
    });
    document.getElementById(`${PANEL_PREFIX}-toggle`).addEventListener("click", () => {
      setFiltered(!isFiltered());
      applyView();
    });

    setDockPosition(savedPos);
    applyView();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createUI);
  } else {
    createUI();
  }
})();
