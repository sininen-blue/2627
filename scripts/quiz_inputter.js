// ==UserScript==
// @name         NeoLMS Quiz Inputter
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Bulk paste quiz questions (mc, many, blank, freeform, tf) from Markdown and submit sequentially
// @match        https://urios.neolms.com/quiz_question_bank/new_question/*
// @match        https://urios.neolms.com/teacher_quiz_assignment/questions/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const PANEL_PREFIX = "quiz";
  const STORAGE_KEY = "quiz_batch_queue";
  const AUTO_KEY = "quiz_auto_continue";
  const LOG_KEY = "quiz_logs";
  const TOTAL_KEY = "quiz_total_count";
  const PENDING_TYPE_KEY = "quiz_pending_type";

  const MODAL_WAIT_TIMEOUT_MS = 20000;
  const MODAL_POLL_INTERVAL_MS = 300;
  const MODAL_STILL_WAITING_LOG_MS = 4000;

  // Short markdown type key -> NeoLMS `type=` query param value.
  const TYPE_MAP = {
    mc: "MultipleChoiceOneAnswer",
    many: "MultipleChoiceManyAnswers",
    blank: "FillInTheBlanks",
    freeform: "Freeform",
    tf: "TrueOrFalse",
  };

  const TYPE_LABELS = {
    mc: "Multiple choice (one answer)",
    many: "Multiple choice (many answers)",
    blank: "Fill in the blanks",
    freeform: "Freeform",
    tf: "True/False",
  };

  const KNOWN_TYPES = Object.keys(TYPE_MAP);

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

  // --- Page detection ---

  function onNewQuestionPage() {
    return location.pathname.startsWith("/quiz_question_bank/new_question/");
  }

  function onQuestionBankPage() {
    return location.pathname.startsWith("/teacher_quiz_assignment/questions/");
  }

  function currentPageShortType() {
    const neoType = new URLSearchParams(location.search).get("type");
    if (!neoType) return null;
    return KNOWN_TYPES.find((k) => TYPE_MAP[k] === neoType) || null;
  }

  // --- Parsing ---

  const META_RE = /^(type|points)\s*:\s*(.*)$/i;
  const OPTION_RE = /^([-*])\s+(.*)$/;

  function splitBlocks(text) {
    const normalized = text.replace(/\r\n/g, "\n").replace(/\\n/g, "\n");
    return normalized
      .split(/^[ \t]*---[ \t]*$/m)
      .map((b) => b.trim())
      .filter((b) => b.length > 0);
  }

  function parseBlock(raw, blockNumber) {
    const errors = [];
    const lines = raw.split("\n");
    let i = 0;
    const meta = {};

    while (i < lines.length) {
      const m = META_RE.exec(lines[i].trim());
      if (!m) break;
      meta[m[1].toLowerCase()] = m[2].trim();
      i++;
    }

    if (Object.keys(meta).length > 0) {
      if (i >= lines.length || lines[i].trim() !== "") {
        errors.push(
          `Block ${blockNumber}: expected a blank line after the type:/points: metadata`,
        );
      } else {
        i++; // consume the blank line
      }
    }

    const bodyLines = lines.slice(i);

    const type = (meta.type || "mc").toLowerCase();
    if (!KNOWN_TYPES.includes(type)) {
      errors.push(
        `Block ${blockNumber}: unknown type "${meta.type}" (expected one of: ${KNOWN_TYPES.join(", ")})`,
      );
      return { errors };
    }

    let points = 1;
    if (meta.points !== undefined) {
      const n = Number(meta.points);
      if (!Number.isFinite(n) || n <= 0) {
        errors.push(`Block ${blockNumber}: invalid points "${meta.points}"`);
      } else {
        points = n;
      }
    }

    const optionStart = bodyLines.findIndex((l) => OPTION_RE.test(l.trim()));
    const questionLines =
      optionStart === -1 ? bodyLines : bodyLines.slice(0, optionStart);
    const question = questionLines.join("\n").trim();

    if (!question) {
      errors.push(`Block ${blockNumber}: missing question text`);
    }

    const optionLines =
      optionStart === -1
        ? []
        : bodyLines
            .slice(optionStart)
            .map((l) => l.trim())
            .filter((l) => l.length > 0);

    const options = [];
    for (const line of optionLines) {
      const m = OPTION_RE.exec(line);
      if (!m) {
        errors.push(`Block ${blockNumber}: malformed option line "${line}"`);
        continue;
      }
      options.push({ marker: m[1], text: m[2].trim() });
    }

    if (errors.length) return { errors };

    switch (type) {
      case "mc": {
        if (options.length < 2)
          errors.push(`Block ${blockNumber}: mc needs at least 2 options`);
        if (options.length > 12)
          errors.push(`Block ${blockNumber}: mc supports at most 12 options`);
        const correct = options.filter((o) => o.marker === "*");
        if (correct.length !== 1) {
          errors.push(
            `Block ${blockNumber}: mc needs exactly one "*" option (found ${correct.length})`,
          );
        }
        if (errors.length) return { errors };
        return {
          item: {
            type: "mc",
            points,
            question,
            options: options.map((o) => o.text),
            correctIndex: options.findIndex((o) => o.marker === "*") + 1,
          },
        };
      }

      case "many": {
        if (options.length < 2)
          errors.push(`Block ${blockNumber}: many needs at least 2 options`);
        if (options.length > 12)
          errors.push(
            `Block ${blockNumber}: many supports at most 12 options`,
          );
        const correctIndices = options
          .map((o, idx) => (o.marker === "*" ? idx + 1 : null))
          .filter((v) => v !== null);
        if (correctIndices.length === 0) {
          errors.push(
            `Block ${blockNumber}: many needs at least one "*" option`,
          );
        }
        if (errors.length) return { errors };
        return {
          item: {
            type: "many",
            points,
            question,
            options: options.map((o) => o.text),
            correctIndices,
          },
        };
      }

      case "blank": {
        const blankCount = (question.match(/BLANK/g) || []).length;
        if (blankCount === 0) {
          errors.push(
            `Block ${blockNumber}: blank question has no "BLANK" placeholder`,
          );
        }
        if (options.length !== blankCount) {
          errors.push(
            `Block ${blockNumber}: ${blankCount} BLANK placeholder(s) but ${options.length} answer line(s)`,
          );
        }
        if (options.some((o) => o.marker !== "-")) {
          errors.push(
            `Block ${blockNumber}: blank answers must use "-", not "*"`,
          );
        }
        if (errors.length) return { errors };
        return {
          item: {
            type: "blank",
            points,
            question,
            blanks: options.map((o) =>
              o.text.split(",").map((s) => s.trim()),
            ),
          },
        };
      }

      case "freeform": {
        if (options.length > 0) {
          errors.push(`Block ${blockNumber}: freeform does not take options`);
        }
        if (errors.length) return { errors };
        return { item: { type: "freeform", points, question } };
      }

      case "tf": {
        if (options.length !== 1) {
          errors.push(
            `Block ${blockNumber}: tf needs exactly one answer line (true or false)`,
          );
        } else if (options[0].marker !== "-") {
          errors.push(
            `Block ${blockNumber}: tf answer must use "-", not "*"`,
          );
        } else if (!/^(true|false)$/i.test(options[0].text)) {
          errors.push(
            `Block ${blockNumber}: tf answer must be "true" or "false"`,
          );
        }
        if (errors.length) return { errors };
        return {
          item: {
            type: "tf",
            points,
            question,
            answer: /^true$/i.test(options[0].text),
          },
        };
      }

      default:
        errors.push(`Block ${blockNumber}: unhandled type "${type}"`);
        return { errors };
    }
  }

  function preParse(text) {
    const blocks = splitBlocks(text);
    const items = [];
    const errors = [];

    blocks.forEach((raw, idx) => {
      const { item, errors: blockErrors } = parseBlock(raw, idx + 1);
      if (blockErrors && blockErrors.length) errors.push(...blockErrors);
      else if (item) items.push(item);
    });

    return { items: errors.length ? [] : items, errors };
  }

  // --- Field fillers ---

  function setValue(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.value = value;
    return !!el;
  }

  function clickToCheck(selector) {
    const el = document.querySelector(selector);
    if (!el) return false;
    if (!el.checked) el.click();
    return true;
  }

  function fillCommon(item) {
    let ok = true;
    ok = setValue("#question_description", item.question) && ok;
    ok = setValue("#question_points", String(item.points)) && ok;
    return ok;
  }

  function fillMultipleChoiceOne(item) {
    let ok = fillCommon(item);
    item.options.forEach((text, idx) => {
      ok = setValue(`#text_${idx + 1}`, text) && ok;
    });
    ok = clickToCheck(`#question_correct_${item.correctIndex}`) && ok;
    return ok;
  }

  function fillMultipleChoiceMany(item) {
    let ok = fillCommon(item);
    item.options.forEach((text, idx) => {
      ok = setValue(`#text_${idx + 1}`, text) && ok;
    });
    item.correctIndices.forEach((i) => {
      ok = clickToCheck(`#correct_${i}`) && ok;
    });
    return ok;
  }

  function fillBlank(item) {
    let ok = fillCommon(item);
    item.blanks.forEach((alts, idx) => {
      ok = setValue(`#blank_${idx + 1}`, alts.join(", ")) && ok;
    });
    return ok;
  }

  function fillFreeform(item) {
    return fillCommon(item);
  }

  function fillTrueFalse(item) {
    let ok = fillCommon(item);
    const selector = item.answer
      ? "#question_true_or_false_true"
      : "#question_true_or_false_false";
    ok = clickToCheck(selector) && ok;
    return ok;
  }

  const FILLERS = {
    mc: fillMultipleChoiceOne,
    many: fillMultipleChoiceMany,
    blank: fillBlank,
    freeform: fillFreeform,
    tf: fillTrueFalse,
  };

  // --- Submit buttons ---

  function findSubmitLink(which) {
    const links = document.querySelectorAll(
      'a[href^="javascript:submit_new_question"]',
    );
    for (const a of links) {
      if ((a.getAttribute("href") || "").includes(`"${which}"`)) return a;
    }
    return null;
  }

  function findTypeLink(targetNeoType) {
    const links = document.querySelectorAll('a[href*="new_question/"]');
    for (const a of links) {
      try {
        const url = new URL(a.getAttribute("href"), location.origin);
        if (url.searchParams.get("type") === targetNeoType) return a;
      } catch (e) {
        // ignore malformed hrefs
      }
    }
    return null;
  }

  // --- Queue state helpers ---

  function clearQueueState() {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(AUTO_KEY);
    sessionStorage.removeItem(TOTAL_KEY);
    sessionStorage.removeItem(PENDING_TYPE_KEY);
  }

  function haltBatch(message) {
    log(message, "error");
    updateStatus("Error — batch halted");
    sessionStorage.removeItem(AUTO_KEY);
    isRunning = false;
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
    updateStatus(
      `${done}/${total} — filling ${TYPE_LABELS[current.type] || current.type} question`,
    );
    updateProgress(done, total);

    const pageType = currentPageShortType();
    if (pageType !== current.type) {
      // Put the item back so nothing is lost, and stop.
      queue.unshift(current);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
      haltBatch(
        `Page is set up for "${pageType ? TYPE_LABELS[pageType] : "an unrecognized type"}" but the next question is "${TYPE_LABELS[current.type]}". Navigate to the right page and press Start again.`,
      );
      return;
    }

    const filler = FILLERS[current.type];
    let ok = false;
    try {
      ok = filler ? filler(current) : false;
    } catch (e) {
      log(`Error filling fields: ${e.message}`, "error");
      ok = false;
    }

    if (!ok) {
      queue.unshift(current);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
      haltBatch(
        `Could not fill one or more fields for a "${TYPE_LABELS[current.type]}" question — check the form still matches the expected layout.`,
      );
      return;
    }

    log(
      `Filled (${TYPE_LABELS[current.type]}): ${current.question.substring(0, 60)}...`,
      "success",
    );

    const next = queue[0];
    const isLast = queue.length === 0;

    if (isLast) {
      submitWith("commit_and_another_same", () => {
        updateStatus(`Done — ${total} questions submitted`);
        updateProgress(total, total);
        log(`Batch complete — ${total} questions`, "success");
        clearQueueState();
        clearLogs();
        isRunning = false;
      });
      return;
    }

    if (next.type === current.type) {
      submitWith("commit_and_another_same", () => {});
      return;
    }

    // Type switch needed: generic "add another" lands on the question-bank
    // page, where the "Add questions" modal must be watched for and the
    // matching type link clicked to reach the next new_question page.
    sessionStorage.setItem(PENDING_TYPE_KEY, TYPE_MAP[next.type]);
    log(
      `Next question is "${TYPE_LABELS[next.type]}" — switching question type...`,
      "info",
    );
    submitWith("commit_and_another", () => {});
  }

  function submitWith(which, onDone) {
    const link = findSubmitLink(which);
    if (!link) {
      haltBatch(`Submit button ("${which}") not found`);
      return;
    }
    setTimeout(() => {
      link.click();
      onDone();
    }, 500);
  }

  function watchForModalAndNavigate(targetNeoType) {
    // The "Add questions" modal can render a loading throbber before its
    // content (or reveal already-present-but-hidden markup via a class/
    // attribute toggle rather than inserting new nodes), so a MutationObserver
    // watching childList alone isn't fully reliable. Poll on an interval as
    // the primary mechanism and use the observer only to react sooner when
    // it does fire, with a generous overall timeout.
    let settled = false;

    function tryFind() {
      if (settled) return;
      const link = findTypeLink(targetNeoType);
      if (link) settle(link);
    }

    function settle(link) {
      if (settled) return;
      settled = true;
      observer.disconnect();
      clearInterval(poller);
      clearInterval(stillWaitingTimer);
      clearTimeout(timer);
      log(`Found type-selection link for ${targetNeoType} — navigating...`, "info");
      sessionStorage.removeItem(PENDING_TYPE_KEY);
      link.click();
    }

    const observer = new MutationObserver(tryFind);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    const poller = setInterval(tryFind, MODAL_POLL_INTERVAL_MS);

    const stillWaitingTimer = setInterval(() => {
      if (!settled) {
        log(`Still waiting for the "Add questions" modal (${targetNeoType})...`, "info");
      }
    }, MODAL_STILL_WAITING_LOG_MS);

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      observer.disconnect();
      clearInterval(poller);
      clearInterval(stillWaitingTimer);
      sessionStorage.removeItem(PENDING_TYPE_KEY);
      haltBatch(
        `Timed out waiting for the "Add questions" modal to switch to ${targetNeoType}.`,
      );
    }, MODAL_WAIT_TIMEOUT_MS);

    tryFind();
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

    if (!onNewQuestionPage()) {
      log("Start can only be used on an Add Question page", "warning");
      return;
    }

    const input = document.getElementById(`${PANEL_PREFIX}-input`);
    const raw = input ? input.value.trim() : "";

    let queue = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");

    if (queue.length === 0 && !raw) {
      log("No questions in queue and nothing pasted", "warning");
      return;
    }

    if (queue.length === 0 && raw) {
      const { items, errors } = preParse(raw);

      if (errors.length) {
        log(`Found ${errors.length} error(s) — fix the pasted text and try again:`, "error");
        errors.forEach((e) => log(`  ${e}`, "error"));
        updateStatus(`${errors.length} error(s) — nothing queued`);
        return;
      }

      if (items.length === 0) {
        log("No questions parsed from input", "warning");
        return;
      }

      const firstType = items[0].type;
      const pageType = currentPageShortType();
      if (pageType !== firstType) {
        log(
          `First question is "${TYPE_LABELS[firstType]}" but this page is set up for ${pageType ? `"${TYPE_LABELS[pageType]}"` : "an unrecognized type"}.`,
          "error",
        );
        log(
          `Navigate to the "Add ${TYPE_LABELS[firstType]}" question page, then press Start again.`,
          "error",
        );
        updateStatus("Error — wrong question type page");
        return;
      }

      queue = items;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
      sessionStorage.setItem(TOTAL_KEY, String(queue.length));
      log(`Parsed ${queue.length} question(s) from input`, "info");
      input.value = "";
    }

    isRunning = true;
    sessionStorage.setItem(AUTO_KEY, "1");
    updateStatus(`Starting — ${queue.length} question(s) in queue`);
    log(`Processing ${queue.length} question(s)`, "info");
    processNext();
  }

  function stop() {
    isRunning = false;
    clearQueueState();
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
    if (onNewQuestionPage()) {
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
        log(`Auto-resuming — ${queue.length} question(s) left`, "info");
        isRunning = true;
        setTimeout(processNext, 800);
      }
      return;
    }

    if (onQuestionBankPage()) {
      const pendingType = sessionStorage.getItem(PENDING_TYPE_KEY);
      if (!pendingType) return;

      createUI();
      updateStatus(`Switching question type (${pendingType})...`);
      log(
        `Waiting for the "Add questions" modal to switch to ${pendingType}`,
        "info",
      );
      watchForModalAndNavigate(pendingType);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
