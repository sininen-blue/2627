# NeoLMS Greasemonkey/Tampermonkey Script UI Guide

Consistent rules for building UI panels across NeoLMS userscripts.

---

## Panel Container

```html
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
```

- Fixed top-right corner
- `z-index: 99999` to stay above all modals
- Dark background, white text
- 8px border radius, 15px padding

---

## Color Palette

| Role       | Color     | Usage                          |
|------------|-----------|--------------------------------|
| Panel bg   | `#1a1a2e` | Panel container background     |
| Input/Log  | `#111`    | Textarea, log panel background |
| Border     | `#333`    | Input borders, progress track  |
| Text       | `#fff`    | Primary text                   |
| Muted      | `#aaa`    | Status line, log text          |
| Start/Cyan | `#00d2ff` | Start button, progress bar     |
| Stop/Red   | `#ff4757` | Stop button, errors            |
| Success    | `#2ed573` | Success log entries            |
| Warning    | `#ffa502` | Warning log entries            |
| Progress   | `#3a7bd5` | Progress bar gradient end      |

---

## Component Order (top to bottom)

1. **Title** — script name
2. **Status line** — current state / progress text
3. **Progress bar** — visual completion indicator
4. **Input area** — textarea, text fields, dropdowns (if needed)
5. **Buttons** — Start / Stop (and any action buttons)
6. **Log panel** — scrollable output

---

## Component Styles

### Title

```html
<div style="margin-bottom: 10px; font-weight: bold; font-size: 16px;">
    Script Title
</div>
```

### Collapsible Panel

All panels should be collapsible. The title bar includes a toggle button (`−` / `+`) on the right side. Everything below the title is wrapped in a `PREFIX-body` div.

**Title bar with toggle:**
```html
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
    <div style="font-weight: bold; font-size: 16px;">
        Script Title
    </div>
    <button id="PREFIX-collapse-btn" style="
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
    " title="Toggle panel">−</button>
</div>
```

**Body wrapper (everything below title):**
```html
<div id="PREFIX-body">
    <!-- status, inputs, buttons, log go here -->
</div>
```

**Toggle function:**
```javascript
const PANEL_PREFIX = "PREFIX";

function toggleCollapse() {
    const body = document.getElementById(`${PANEL_PREFIX}-body`);
    const btn = document.getElementById(`${PANEL_PREFIX}-collapse-btn`);
    if (!body || !btn) return;
    const collapsed = body.style.display === "none";
    body.style.display = collapsed ? "" : "none";
    btn.textContent = collapsed ? "\u2212" : "+";
    sessionStorage.setItem(`${PANEL_PREFIX}_collapsed`, collapsed ? "1" : "0");
}
```

**Restore state on init:**
```javascript
const collapsed = sessionStorage.getItem(`${PANEL_PREFIX}_collapsed`) === "1";
// Set body display and btn text accordingly in createUI
```

- Uses `sessionStorage` to remember collapse state during the session
- `−` (unicode `\u2212`) for expanded, `+` for collapsed
- When collapsed, only the title bar with toggle button is visible
- Title bar margin-bottom changes: `10px` when expanded, `0` when collapsed

### Dockable Panel

Panels can be docked to any corner of the screen. A 2x2 grid of corner buttons in the title bar controls positioning.

**Position CSS rules:**
| Position | CSS |
|----------|-----|
| `tr` (top-right, default) | `top: 10px; right: 10px;` |
| `tl` (top-left) | `top: 10px; left: 10px;` |
| `br` (bottom-right) | `bottom: 10px; right: 10px;` |
| `bl` (bottom-left) | `bottom: 10px; left: 10px;` |

**Dock buttons HTML (2x2 grid in title bar):**
```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-right: 4px;">
    <button class="PREFIX-dock-btn" data-pos="tl" style="
        width: 16px; height: 16px; background: none; border: 1px solid #555;
        border-radius: 2px; cursor: pointer; font-size: 8px; color: #aaa;
        display: flex; align-items: center; justify-content: center; padding: 0;
    " title="Dock top-left">◱</button>
    <button class="PREFIX-dock-btn" data-pos="tr" style="
        width: 16px; height: 16px; background: none; border: 1px solid #555;
        border-radius: 2px; cursor: pointer; font-size: 8px; color: #aaa;
        display: flex; align-items: center; justify-content: center; padding: 0;
    " title="Dock top-right">◲</button>
    <button class="PREFIX-dock-btn" data-pos="bl" style="
        width: 16px; height: 16px; background: none; border: 1px solid #555;
        border-radius: 2px; cursor: pointer; font-size: 8px; color: #aaa;
        display: flex; align-items: center; justify-content: center; padding: 0;
    " title="Dock bottom-left">◰</button>
    <button class="PREFIX-dock-btn" data-pos="br" style="
        width: 16px; height: 16px; background: none; border: 1px solid #555;
        border-radius: 2px; cursor: pointer; font-size: 8px; color: #aaa;
        display: flex; align-items: center; justify-content: center; padding: 0;
    " title="Dock bottom-right">◳</button>
</div>
```

**`setDockPosition()` function:**
```javascript
const DOCK_POSITIONS = {
    tr: "top: 10px; right: 10px;",
    tl: "top: 10px; left: 10px;",
    br: "bottom: 10px; right: 10px;",
    bl: "bottom: 10px; left: 10px;",
};

function setDockPosition(pos) {
    const panel = document.getElementById("PREFIX-panel");
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

    // Highlight active button
    document.querySelectorAll(".PREFIX-dock-btn").forEach((btn) => {
        btn.style.background = btn.dataset.pos === pos ? "#3a7bd5" : "none";
        btn.style.color = btn.dataset.pos === pos ? "#fff" : "#aaa";
    });

    localStorage.setItem("PREFIX_dock_position", pos);
}
```

**Restore on init:**
```javascript
const savedPos = localStorage.getItem("PREFIX_dock_position") || "tr";
// Apply DOCK_POSITIONS[savedPos] to panel inner div
// Highlight active dock button
```

- Uses `localStorage` to remember position across sessions
- Active button highlighted with `#3a7bd5` background
- Corner glyphs: `◱` `◲` `◰` `◳`

### Persist State

Save form state to `localStorage` so it persists between page loads (e.g., when switching students).

**What to save:** Form field values (names, max points, config). Do NOT save transient data (earned points, status messages).

**`saveState()` function:**
```javascript
function saveState() {
    const data = {
        rows: getRows().map((r) => ({ name: r.name, max: r.max })),
        multiplier: parseFloat(document.getElementById("PREFIX-multiplier")?.value) || 1,
    };
    localStorage.setItem("PREFIX_state", JSON.stringify(data));
}
```

**`loadState()` function:**
```javascript
function loadState() {
    try {
        const raw = localStorage.getItem("PREFIX_state");
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}
```

**When to save:** Call `saveState()` inside any function that modifies saved fields (e.g., `calculateTotal()`, which runs on every input change).

**When to load:** In `createUI()` after generating default rows — if `loadState()` returns data, restore field values and row count.

**When to clear:** In `handleClear()`, call `localStorage.removeItem("PREFIX_state")`.

- `localStorage` key: `PREFIX_state`
- Stores `{ rows: [{name, max}], multiplier: number }`
- Earned points are intentionally NOT saved — they reset per student

### Status Line

```html
<div id="STATUS_PREFIX-status" style="margin-bottom: 10px; color: #aaa;">
    Ready
</div>
```

- Use `#aaa` muted color
- Update via `updateStatus(message)`

### Progress Bar

```html
<div style="margin-bottom: 10px;">
    <div style="background: #333; border-radius: 4px; overflow: hidden;">
        <div id="STATUS_PREFIX-progress" style="
            background: linear-gradient(90deg, #00d2ff, #3a7bd5);
            height: 8px;
            width: 0%;
            transition: width 0.3s;
        "></div>
    </div>
</div>
```

- Track: `#333` background, 4px radius
- Fill: cyan-to-blue gradient, 8px height
- Animate width via `updateProgress(current, total)`

### Textarea

```html
<textarea id="PREFIX-input" style="
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
" placeholder="Input placeholder text"></textarea>
```

- Monospace 12px, dark background
- Resizable vertically
- Full width, 80px default height

### Text Input

```html
<input type="text" id="PREFIX-input" style="
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #333;
    border-radius: 4px;
    background: #111;
    color: #fff;
    font-family: monospace;
    font-size: 12px;
    box-sizing: border-box;
" placeholder="Input placeholder">
```

### Buttons

```html
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
```

- Flex row, 8px gap
- Start: cyan bg, black text
- Stop: red bg, white text
- All buttons: no border, 4px radius, bold, 8px/12px padding

### Log Panel

```html
<div id="PREFIX-log" style="
    margin-top: 10px;
    max-height: 150px;
    overflow-y: auto;
    font-size: 12px;
    color: #aaa;
    background: #111;
    padding: 8px;
    border-radius: 4px;
"></div>
```

- 150px max height, scrollable
- Monospace 12px, muted text
- Entries prefixed with timestamp `[HH:MM:SS]`

---

## Standard Helper Functions

Include these in every script:

```javascript
function log(message, type = "info") {
    const logEl = document.getElementById("PREFIX-log");
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
    const el = document.getElementById("PREFIX-status");
    if (el) el.textContent = message;
}

function updateProgress(current, total) {
    const el = document.getElementById("PREFIX-progress");
    if (el) el.style.width = `${(current / total) * 100}%`;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
```

Replace `PREFIX` with the script's short name (e.g. `enroll`, `export`, `bulk`).

---

## Modal Detection Pattern

NeoLMS loads modals dynamically. Use MutationObserver to detect when the target modal appears:

```javascript
function waitForModal() {
    const observer = new MutationObserver(() => {
        if (!document.getElementById("PREFIX-panel")) {
            const target = document.getElementById("TARGET_ELEMENT_ID");
            if (target) createUI();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    if (document.getElementById("TARGET_ELEMENT_ID")) createUI();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForModal);
} else {
    waitForModal();
}
```

- Replace `TARGET_ELEMENT_ID` with the element that signals the modal is open (e.g. `#Name` for people picker)
- `createUI()` must check `if (document.getElementById("PREFIX-panel")) return;` to prevent duplicates

---

## Script Boilerplate

```javascript
// ==UserScript==
// @name         NeoLMS [Action Name]
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  [Description]
// @match        https://urios.neolms.com/path/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const PANEL_PREFIX = "PREFIX";

    let currentIndex = 0;
    let isRunning = false;

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
        if (document.getElementById("PREFIX-panel")) return;

        const collapsed = sessionStorage.getItem(`${PANEL_PREFIX}_collapsed`) === "1";

        const panel = document.createElement("div");
        panel.id = "PREFIX-panel";
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
                max-height: 90vh;
                overflow-y: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${collapsed ? "0" : "10px"};">
                    <div style="font-weight: bold; font-size: 16px;">
                        Script Title
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
                    <div id="PREFIX-status" style="margin-bottom: 10px; color: #aaa;">
                        Ready
                    </div>
                    <!-- progress bar, inputs, buttons, log here -->
                </div>
            </div>
        `;
        document.body.appendChild(panel);

        document.getElementById(`${PANEL_PREFIX}-collapse-btn`).addEventListener("click", toggleCollapse);
        document.getElementById("btn-start").addEventListener("click", start);
        document.getElementById("btn-stop").addEventListener("click", stop);
    }

    // ... helpers, logic, waitForModal ...
})();
```

---

## Naming Conventions

| Element       | Pattern              | Example              |
|---------------|----------------------|----------------------|
| Panel div     | `PREFIX-panel`       | `enroll-panel`       |
| Body wrapper  | `PREFIX-body`        | `enroll-body`        |
| Collapse btn  | `PREFIX-collapse-btn`| `enroll-collapse-btn`|
| Dock btns     | `PREFIX-dock-btn`    | `enroll-dock-btn`    |
| Status div    | `PREFIX-status`      | `enroll-status`      |
| Progress      | `PREFIX-progress`    | `enroll-progress`    |
| Textarea      | `PREFIX-input`       | `enroll-input`       |
| Log panel     | `PREFIX-log`         | `enroll-log`         |
| Start btn     | `btn-start`          | `btn-start`          |
| Stop btn      | `btn-stop`           | `btn-stop`           |
| Action btn    | `btn-ACTION`         | `btn-export`         |

- `PREFIX` = short script name (`enroll`, `export`, `bulk`, `roster`, etc.)
- Buttons always `btn-` prefix
- IDs use kebab-case

---

## Rules Summary

1. Always use IIFE wrapper with `"use strict"`
2. Panel: fixed position, dark theme, z-index 99999
3. All panels must be collapsible (toggle button in title bar, body wrapper)
4. All panels must be dockable to any corner (4 dock buttons, localStorage)
5. Prefix all IDs with script name to avoid collisions
6. Include `log()`, `updateStatus()`, `updateProgress()`, `sleep()` helpers
7. Persist form state to localStorage (names/config only, not transient data)
8. Use MutationObserver to detect modal appearance
9. Check for duplicate panel before creating
10. Start/Stop buttons only — never auto-submit site forms
11. Log all actions with timestamps and color-coded types
