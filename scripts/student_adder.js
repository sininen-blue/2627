// ==UserScript==
// @name         NeoLMS Auto Enroll Students
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically enroll students by ID into a class
// @match        https://urios.neolms.com/teacher_students/list*
// @match        https://urios.neolms.com/class_students_picker/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  let STUDENT_IDS = [];
  let currentIndex = 0;
  let isRunning = false;

  function createUI() {
    if (document.getElementById("auto-enroll-panel")) return;

    const panel = document.createElement("div");
    panel.id = "auto-enroll-panel";
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
            ">
                <div style="margin-bottom: 10px; font-weight: bold; font-size: 16px;">
                    Auto Enroll Students
                </div>
                <div id="enroll-status" style="margin-bottom: 10px; color: #aaa;">
                    Ready
                </div>
                <div style="margin-bottom: 10px;">
                    <div style="background: #333; border-radius: 4px; overflow: hidden;">
                        <div id="enroll-progress" style="
                            background: linear-gradient(90deg, #00d2ff, #3a7bd5);
                            height: 8px;
                            width: 0%;
                            transition: width 0.3s;
                        "></div>
                    </div>
                </div>
                <textarea id="enroll-ids" style="
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
                " placeholder="Paste IDs here (space or newline separated)"></textarea>
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
                <div id="enroll-log" style="
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
        `;
    document.body.appendChild(panel);

    document
      .getElementById("btn-start")
      .addEventListener("click", startEnrollment);
    document
      .getElementById("btn-stop")
      .addEventListener("click", stopEnrollment);
  }

  function log(message, type = "info") {
    const logEl = document.getElementById("enroll-log");
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
    const el = document.getElementById("enroll-status");
    if (el) el.textContent = message;
  }

  function updateProgress(current, total) {
    const el = document.getElementById("enroll-progress");
    if (el) el.style.width = `${(current / total) * 100}%`;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function getNameInput() {
    return document.getElementById("Name");
  }

  function getFirstResult() {
    const matchedDiv = document.getElementById("people_matched");
    if (!matchedDiv) return null;

    const tbody = matchedDiv.querySelector("table tbody");
    if (!tbody) return null;

    const rows = tbody.querySelectorAll("tr");
    if (rows.length === 0) return null;

    const firstRow = rows[0];
    const checkbox = firstRow.querySelector(
      'input[type="checkbox"][name="pp_select[]"]',
    );
    const nameLink = firstRow.querySelector("a");

    return {
      checkbox: checkbox,
      name: nameLink ? nameLink.textContent.trim() : "Unknown",
    };
  }

  function selectFirstResult() {
    const result = getFirstResult();
    if (!result || !result.checkbox) return false;
    // Must use .click() to fire onclick="toggle(this, event)"
    result.checkbox.click();
    return result.name;
  }

  function clickMoveButton() {
    const moveBtns = document.querySelectorAll("button.pp_add");
    for (const moveBtn of moveBtns) {
      if (moveBtn.offsetParent !== null) {
        if (typeof $ !== "undefined" || typeof jQuery !== "undefined") {
          try {
            $(moveBtn).trigger("click");
          } catch (e) {
            moveBtn.click();
          }
        } else {
          moveBtn.click();
        }
        return true;
      }
    }
    const arrowIcon = document.querySelector("button.pp_add .arrowRight");
    if (arrowIcon) {
      arrowIcon.click();
      return true;
    }
    return false;
  }

  async function processNextStudent() {
    if (currentIndex >= STUDENT_IDS.length) {
      isRunning = false;
      updateStatus(`Completed! Processed all ${STUDENT_IDS.length} students`);
      log(
        'All students added to selected list. Click "Add" on the site to submit.',
        "success",
      );
      return;
    }

    if (!isRunning) return;

    const studentId = STUDENT_IDS[currentIndex];
    updateStatus(
      `Processing ${currentIndex + 1}/${STUDENT_IDS.length}: ${studentId}`,
    );
    log(`Searching for ID: ${studentId}`);

    const searchInput = getNameInput();
    if (!searchInput) {
      log(
        "Search input not found. Make sure the people picker modal is open.",
        "error",
      );
      isRunning = false;
      return;
    }

    // Clear and type the student ID
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    await sleep(200);

    searchInput.value = studentId;
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    searchInput.dispatchEvent(new Event("keyup", { bubbles: true }));
    await sleep(500);

    log("Waiting for results...");
    await sleep(2000);

    const firstResult = getFirstResult();
    if (firstResult) {
      const studentName = selectFirstResult();
      log(`Found: ${studentName}`, "success");
      await sleep(300);

      if (clickMoveButton()) {
        log(`Moved ${studentName} to selected list`, "success");
      } else {
        log("Move button not found", "error");
      }
    } else {
      log(`No results found for ID: ${studentId}`, "warning");
    }

    currentIndex++;
    updateProgress(currentIndex, STUDENT_IDS.length);
    updateStatus(`Processed ${currentIndex}/${STUDENT_IDS.length}`);

    await sleep(800);
    processNextStudent();
  }

  function startEnrollment() {
    if (isRunning) return;

    const textarea = document.getElementById("enroll-ids");
    if (!textarea) {
      log("Input textarea not found", "error");
      return;
    }

    const raw = textarea.value.trim();
    if (!raw) {
      log("No IDs provided. Paste IDs into the textarea.", "error");
      return;
    }

    STUDENT_IDS = raw.split(/[\s,]+/).filter((id) => id.length > 0);
    currentIndex = 0;

    if (STUDENT_IDS.length === 0) {
      log("No valid IDs found", "error");
      return;
    }

    isRunning = true;
    updateStatus(`Processing 0/${STUDENT_IDS.length}`);
    log(`Starting enrollment: ${STUDENT_IDS.length} students`);
    processNextStudent();
  }

  function stopEnrollment() {
    isRunning = false;
    updateStatus(`Stopped at ${currentIndex}/${STUDENT_IDS.length}`);
    log("Enrollment stopped", "warning");
  }

  function waitForModal() {
    const observer = new MutationObserver(() => {
      if (!document.getElementById("auto-enroll-panel")) {
        const searchInput = document.getElementById("Name");
        if (searchInput) createUI();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    if (document.getElementById("Name")) createUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForModal);
  } else {
    waitForModal();
  }
})();
