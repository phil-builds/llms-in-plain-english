/* ============================================================
   LLM Engineering Course — engine (vanilla JS, zero deps)
   COURSE data is provided by content-*.js files (window.COURSE)
   ============================================================ */
(function () {
  "use strict";

  // ---------- tiny SVG icon set (simple, consistent) ----------
  const I = {
    check: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    chev: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    home: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21V12h6v9"/></svg>',
    clock: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    book: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v15a1 1 0 0 0 1 1h14"/><path d="M8 4h11v13H8a2 2 0 0 0-2 2V6a2 2 0 0 1 2-2Z"/></svg>',
    brain: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 3a3 3 0 0 0-3 3 3 3 0 0 0-1.5 5.5A3 3 0 0 0 7 17a3 3 0 0 0 5 1 3 3 0 0 0 5-1 3 3 0 0 0 2-5.5A3 3 0 0 0 17.5 6a3 3 0 0 0-3-3 3 3 0 0 0-2.5 1.3A3 3 0 0 0 9.5 3Z"/><path d="M12 5.3v13"/></svg>',
    alert: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 16h.01"/></svg>',
    wrench: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L4 17l3 3 5.5-5.5a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.1-2.1z"/></svg>',
    quiz: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.2 9a2.8 2.8 0 0 1 5.4 1c0 1.8-2.6 2-2.6 3.5"/><path d="M12 17h.01"/></svg>',
    settings: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/></svg>',
    menu: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    arrowR: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrowL: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
    spark: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>',
    sprout: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c0-4 -0.2 -7 0 -10.5" stroke="var(--stem)" stroke-width="2"/><path d="M11.6 14.4c-2.2 .2 -4 -1 -4.7 -3.3 2.3 -.5 4.2 .6 4.8 2.9Z" fill="var(--leaf-green)" stroke="var(--leaf-green)" stroke-width="1.4"/><path d="M12.3 11.4c.5 -2.4 2.5 -3.9 4.9 -3.7 -.2 2.4 -2 4 -4.4 4.1Z" fill="var(--leaf-teal)" stroke="var(--leaf-teal)" stroke-width="1.4"/><path d="M12 3.2 12.7 5.3 14.8 6 12.7 6.7 12 8.8 11.3 6.7 9.2 6 11.3 5.3Z" fill="var(--spark-warm)" stroke="var(--spark-warm)" stroke-width="1.1"/></svg>',
    save: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>',
    list: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    heart: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5.5a4.5 4.5 0 0 0-7 .8 4.5 4.5 0 0 0-7-.8C3 7.5 3.5 10.5 7 13.5l5 4.5 5-4.5c3.5-3 4-6 2-8Z"/></svg>',
  };

  // ---------- storage ----------
  const NS = "llmcourse.v1.";
  const store = {
    get(k, d) { try { const v = localStorage.getItem(NS + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(NS + k, JSON.stringify(v)); } catch (e) {} },
  };

  // ---------- state ----------
  const COURSE = window.COURSE || [];
  const flat = []; // flattened topics for prev/next
  COURSE.forEach((sec, si) => sec.topics.forEach((t, ti) => {
    flat.push({ topic: t, sec, si, ti });
  }));
  const topicById = {};
  flat.forEach((f, idx) => { topicById[f.topic.id] = idx; });
  const TOTAL = flat.length;

  let completed = store.get("completed", {});
  let quizState = store.get("quiz", {});      // { topicId: { qIndex: chosenIndex } }
  let openSecs = store.get("openSecs", null);  // { sectionId: bool }
  let current = store.get("last", "__home__");

  const settings = Object.assign(
    { theme: "paper", size: "m", motion: "normal", focus: "off" },
    store.get("settings", {})
  );
  let previewTheme = settings.theme; // tracks committed theme so hover can revert

  // ---------- elements ----------
  const $ = (s, r) => (r || document).querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  const app = $("#app");
  const sidebar = $("#sidebar");
  const main = $("#main");
  const pillFill = $("#pillFill");
  const pillText = $("#pillText");

  // ---------- apply settings ----------
  function applySettings() {
    const root = document.documentElement;
    root.setAttribute("data-theme", settings.theme);
    root.setAttribute("data-size", settings.size);
    root.setAttribute("data-motion", settings.motion);
    app.setAttribute("data-focus", settings.focus);
    store.set("settings", settings);
  }

  // ---------- progress ----------
  function doneCount() { return flat.filter(f => completed[f.topic.id]).length; }
  function secDone(sec) { return sec.topics.filter(t => completed[t.id]).length; }
  function updateProgress() {
    const d = doneCount();
    const remainMins = flat
      .filter(f => !completed[f.topic.id])
      .reduce((s, f) => s + (f.topic.time || 0), 0);
    const remainHrs = (remainMins / 60).toFixed(1).replace(/\.0$/, '');
    pillFill.style.width = (TOTAL ? Math.round((d / TOTAL) * 100) : 0) + '%';
    pillText.innerHTML = '<b>' + d + '</b> / ' + TOTAL + '<span class="pill-time"> &middot; ~' + remainHrs + 'h left</span>';
  }

  // ---------- sidebar ----------
  function buildSidebar() {
    sidebar.innerHTML = "";
    const home = el("button", "toc-home", I.home + "<span>Home &amp; overview</span>");
    home.onclick = () => go("__home__");
    home.setAttribute("aria-current", current === "__home__");
    sidebar.appendChild(home);

    if (openSecs == null) {
      openSecs = {};
      COURSE.forEach(s => { openSecs[s.id] = true; });
    }

    COURSE.forEach((sec, si) => {
      const wrap = el("div", "toc-section");
      wrap.dataset.open = openSecs[sec.id] !== false;
      const sd = secDone(sec);
      const head = el("button", "toc-sec-head",
        '<span class="num">' + String(si + 1).padStart(2, "0") + '</span>' +
        '<span class="label">' + sec.title + '</span>' +
        '<span class="count' + (sd === sec.topics.length ? ' done' : '') + '">' + sd + '/' + sec.topics.length + '</span>' +
        '<span class="chev">' + I.chev + '</span>'
      );
      head.onclick = () => {
        const open = wrap.dataset.open === "true";
        wrap.dataset.open = !open;
        openSecs[sec.id] = !open;
        store.set("openSecs", openSecs);
      };
      wrap.appendChild(head);

      const topicsWrap = el("div", "toc-topics");
      const inner = el("div");
      sec.topics.forEach(t => {
        const b = el("button", "toc-topic",
          '<span class="dot">' + I.check + '</span><span class="ttl">' + t.title + '</span>');
        b.dataset.done = !!completed[t.id];
        b.dataset.topic = t.id;
        b.setAttribute("aria-current", current === t.id);
        b.onclick = () => go(t.id);
        inner.appendChild(b);
      });
      topicsWrap.appendChild(inner);
      wrap.appendChild(topicsWrap);
      sidebar.appendChild(wrap);
    });
  }

  function refreshSidebarStates() {
    sidebar.querySelectorAll(".toc-topic").forEach(b => {
      b.dataset.done = !!completed[b.dataset.topic];
      b.setAttribute("aria-current", current === b.dataset.topic);
    });
    sidebar.querySelectorAll(".toc-section").forEach((wrap, si) => {
      const sec = COURSE[si];
      const sd = secDone(sec);
      const c = wrap.querySelector(".count");
      c.textContent = sd + "/" + sec.topics.length;
      c.classList.toggle("done", sd === sec.topics.length);
    });
    const home = sidebar.querySelector(".toc-home");
    if (home) home.setAttribute("aria-current", current === "__home__");
  }

  // ---------- render topic ----------
  function renderTopic(id) {
    const idx = topicById[id];
    const f = flat[idx];
    const t = f.topic;
    const r = el("div", "reader fade-in");

    // meta
    const meta = el("div", "topic-meta");
    meta.innerHTML =
      '<span class="sec">' + f.sec.title + '</span>' +
      '<span class="sep">&bull;</span>' +
      '<span>Topic ' + (f.ti + 1) + ' of ' + f.sec.topics.length + '</span>' +
      '<span class="chip">' + I.clock + ' ~' + t.time + ' min read</span>';
    r.appendChild(meta);

    r.appendChild(el("h1", "topic-title", t.title));
    if (t.tagline) r.appendChild(el("p", "topic-tagline", t.tagline));

    // Lesson
    r.appendChild(block(I.book, "The lesson", '<div class="prose">' + t.lesson + "</div>"));

    // Analogy
    if (t.analogy) {
      r.appendChild(block(null, null,
        '<div class="analogy"><span class="lead">Everyday analogy</span>' + t.analogy + "</div>", true));
    }

    // Mental model
    r.appendChild(block(I.brain, "Mental model", '<div class="mental">' + t.mentalModel + "</div>"));

    // Mistakes
    const mlist = (t.mistakes || []).map(m =>
      '<div class="mistake"><span class="x">' + I.alert + '</span><span>' + m + "</span></div>").join("");
    r.appendChild(block(I.alert, "Common mistakes to avoid", '<div class="mistakes">' + mlist + "</div>"));

    // Project
    if (t.exercise) {
      const ex = t.exercise;
      const steps = (ex.steps || []).map(s => "<li>" + s + "</li>").join("");
      const html = '<div class="project">' +
        '<div class="p-head">' + I.wrench + 'Mini-project</div>' +
        '<div class="p-body">' +
        '<p class="p-goal"><b>Goal:</b> ' + ex.goal + "</p>" +
        (steps ? "<ol>" + steps + "</ol>" : "") +
        (ex.stretch ? '<div class="stretch"><b>Stretch:</b> ' + ex.stretch + "</div>" : "") +
        "</div></div>";
      r.appendChild(block(I.wrench, "Try it yourself", html));
    }

    // Quiz
    if (t.quiz && t.quiz.length) {
      r.appendChild(block(I.quiz, "Quick self-check", renderQuiz(t)));
    }

    // Footer
    r.appendChild(renderFooter(f));

    main.innerHTML = "";
    main.appendChild(r);
    main.scrollTop = 0;

    // wire quiz after in DOM
    wireQuiz(t, r);
  }

  function block(icon, label, innerHTML, bare) {
    const b = el("div", "block");
    if (!bare && label) {
      b.appendChild(el("div", "block-head",
        (icon ? '<span class="ico">' + icon + "</span>" : "") +
        "<h2>" + label + "</h2>"));
    }
    const body = el("div");
    body.innerHTML = innerHTML;
    b.appendChild(body);
    return b;
  }

  // ---------- quiz ----------
  function renderQuiz(t) {
    const saved = quizState[t.id] || {};
    return '<div class="quiz">' + t.quiz.map((q, qi) => {
      const opts = q.options.map((o, oi) =>
        '<button class="opt" data-q="' + qi + '" data-o="' + oi + '">' +
        '<span class="key">' + "ABCD".charAt(oi) + "</span><span>" + o + "</span></button>"
      ).join("");
      return '<div class="qcard" data-q="' + qi + '">' +
        '<p class="q"><span class="qn">Q' + (qi + 1) + '</span>' + q.q + "</p>" +
        '<div class="options">' + opts + "</div>" +
        '<div class="qfeedback"></div></div>';
    }).join("") + "</div>";
  }

  function wireQuiz(t, root) {
    const saved = quizState[t.id] || {};
    root.querySelectorAll(".qcard").forEach((card, qi) => {
      const q = t.quiz[qi];
      const opts = card.querySelectorAll(".opt");
      const fb = card.querySelector(".qfeedback");
      const reveal = (chosen) => {
        opts.forEach((opt, oi) => {
          opt.disabled = true;
          if (oi === q.answer) opt.dataset.state = "correct";
          else if (oi === chosen) opt.dataset.state = "chosen-wrong";
          else opt.dataset.state = "dim";
        });
        const right = chosen === q.answer;
        fb.className = "qfeedback show " + (right ? "ok" : "gentle");
        fb.innerHTML = '<span class="lead">' + (right ? "Yes — that's it. " : "Good try. ") + "</span>" + (q.why || "");
      };
      opts.forEach(opt => {
        opt.onclick = () => {
          const chosen = +opt.dataset.o;
          saved[qi] = chosen;
          quizState[t.id] = saved;
          store.set("quiz", quizState);
          reveal(chosen);
        };
      });
      if (saved[qi] != null) reveal(saved[qi]);
    });
  }

  // ---------- footer ----------
  function renderFooter(f) {
    const t = f.topic;
    const foot = el("div", "topic-footer");

    const row = el("div", "complete-row");
    const cbtn = el("button", "btn-complete");
    const setBtn = () => {
      const done = !!completed[t.id];
      cbtn.dataset.done = done;
      cbtn.innerHTML = I.check + (done ? "Completed" : "Mark as complete");
    };
    setBtn();
    cbtn.onclick = () => {
      completed[t.id] = !completed[t.id];
      store.set("completed", completed);
      setBtn();
      refreshSidebarStates();
      updateProgress();
      if (completed[t.id]) {
        const dot = cbtn.querySelector("svg");
        if (settings.motion !== "reduced") cbtn.classList.add("pop");
        setTimeout(() => cbtn.classList.remove("pop"), 360);
        const d = doneCount();
        toast(I.check, d === TOTAL ? "Course complete — every topic done!" : "Saved. " + d + " of " + TOTAL + " done.");
      }
    };
    row.appendChild(cbtn);
    row.appendChild(el("span", "complete-note", "Progress saves automatically on this device."));
    foot.appendChild(row);

    // prev / next
    const idx = topicById[t.id];
    const nav = el("div", "nav-row");
    if (idx > 0) {
      const p = flat[idx - 1].topic;
      const b = el("button", "nav-btn prev",
        I.arrowL + '<span><span class="nlabel">Previous</span><span class="ntitle">' + p.title + "</span></span>");
      b.onclick = () => go(p.id);
      nav.appendChild(b);
    } else {
      nav.appendChild(blankNav());
    }
    if (idx < TOTAL - 1) {
      const n = flat[idx + 1].topic;
      const b = el("button", "nav-btn next",
        '<span><span class="nlabel">Next</span><span class="ntitle">' + n.title + "</span></span>" + I.arrowR);
      b.onclick = () => go(n.id);
      nav.appendChild(b);
    } else {
      nav.appendChild(blankNav());
    }
    foot.appendChild(nav);
    return foot;
  }
  function blankNav() { const b = el("button", "nav-btn"); b.disabled = true; b.style.visibility = "hidden"; return b; }

  // ---------- theme discovery strip ----------
  function buildThemeStrip() {
    if (store.get("themeChosen")) return "";
    return '<div class="welcome-strip" role="region" aria-label="Choose your look">' +
      '<button class="strip-dismiss" aria-label="Dismiss theme picker">&times;</button>' +
      '<div class="strip-intro">' +
        '<div class="strip-icon" aria-hidden="true">' + I.settings + '</div>' +
        '<div class="strip-text">' +
          '<div class="strip-label">Make it yours</div>' +
          '<div class="strip-sub">Try a look before you start &mdash; change it any time via <span class="gear-ref">&#9881;</span> in the top corner.</div>' +
        '</div>' +
      '</div>' +
      '<div class="theme-tiles">' +
        '<button class="theme-tile" data-preview-theme="paper"><div class="theme-tile-preview"></div><span class="theme-tile-name">Paper</span></button>' +
        '<button class="theme-tile" data-preview-theme="sepia"><div class="theme-tile-preview"></div><span class="theme-tile-name">Sepia</span></button>' +
        '<button class="theme-tile" data-preview-theme="slate"><div class="theme-tile-preview"></div><span class="theme-tile-name">Dark</span></button>' +
        '<button class="theme-tile" data-preview-theme="vivid"><div class="theme-tile-preview"></div><span class="theme-tile-name">Vivid</span></button>' +
      '</div>' +
    '</div>';
  }

  function collapseStrip(strip) {
    strip.style.maxHeight = strip.offsetHeight + "px";
    strip.style.overflow = "hidden";
    requestAnimationFrame(function() {
      strip.style.transition = "max-height 0.28s var(--ease), opacity 0.22s var(--ease), margin-bottom 0.28s var(--ease)";
      strip.style.maxHeight = "0";
      strip.style.opacity = "0";
      strip.style.marginBottom = "0";
    });
    strip.addEventListener("transitionend", function() { strip.remove(); }, { once: true });
  }

  // ---------- home ----------
  function renderHome() {
    const d = doneCount();
    const r = el("div", "reader fade-in");
    const h = el("div", "home");

    // Find first incomplete topic — this is always the right next step
    const firstIncomplete = flat.find(f => !completed[f.topic.id]);
    const rt = firstIncomplete || flat[flat.length - 1]; // fall back to last topic if all done
    const allDone = !firstIncomplete && d === TOTAL;
    const resumeTarget = rt ? rt.topic.id : null;
    let resumeHTML = "";
    if (rt) {
      const rk = allDone ? "Course complete!" : (d === 0 ? "Start here" : "Next up");
      const btnLabel = allDone ? "Review" : (d === 0 ? "Begin" : "Continue");
      resumeHTML =
        '<div class="resume-card"><div class="grow">' +
        '<div class="rk">' + rk + '</div>' +
        '<div class="rt">' + rt.topic.title + '</div></div>' +
        '<button class="go" id="resumeBtn">' + btnLabel + I.arrowR + "</button></div>";
    }

    h.innerHTML =
      '<div class="hero-banner">' +
        '<img src="banner.png" alt="" class="hero-img" aria-hidden="true">' +
        '<div class="hero-text">' +
          '<span class="hero-eyebrow">Self-paced &middot; Plain English</span>' +
          '<h1>How LLMs Actually Work</h1>' +
        '</div>' +
      '</div>' +
      '<p class="sub">A calm, step-by-step course in plain English — built for how <b>your</b> brain works. ' +
      "Short topics, the same predictable shape every time, and progress that saves itself.</p>" +
      buildThemeStrip() +
      resumeHTML +
      '<div class="how">' +
      howCard(I.list, "Same shape every time", "Every topic: lesson, an everyday analogy, a mental model, mistakes to avoid, and a small project. No surprises.") +
      howCard(I.save, "It remembers for you", "Mark topics done as you go. Close the tab, come back days later — it opens right where you stopped.") +
      howCard(I.clock, "Bite-sized", "Each topic shows a reading time. Do one. Do five. Take a brain break anytime. Go at your pace.") +
      howCard(I.settings, "Make it comfortable", "Light, dark, sepia, or vivid. Bigger text. Reduce motion. Focus mode. Set it up how you like in Settings.") +
      "</div>" +
      '<div class="syllabus"><h2>' + TOTAL + " topics across " + COURSE.length + " parts</h2>" +
      COURSE.map((sec, si) => {
        const sd = secDone(sec);
        return '<div class="syl-item" data-first="' + sec.topics[0].id + '">' +
          '<div class="syl-num">' + String(si + 1).padStart(2, "0") + "</div>" +
          '<div class="syl-main"><div class="syl-title">' + sec.title + "</div>" +
          '<div class="syl-blurb">' + (sec.blurb || "") + "</div></div>" +
          '<div class="syl-prog' + (sd === sec.topics.length ? " done" : "") + '">' + sd + "/" + sec.topics.length + "</div></div>";
      }).join("") +
      "</div>";

    r.appendChild(h);
    main.innerHTML = "";
    main.appendChild(r);
    main.scrollTop = 0;

    const rb = $("#resumeBtn");
    if (rb) rb.onclick = () => go(resumeTarget);
    h.querySelectorAll(".syl-item").forEach(it => {
      it.onclick = () => go(it.dataset.first);
    });

    // Wire theme discovery strip (only present on first visit)
    const strip = h.querySelector(".welcome-strip");
    if (strip) {
      strip.querySelectorAll("[data-preview-theme]").forEach(function(tile) {
        tile.addEventListener("mouseenter", function() {
          settings.theme = tile.dataset.previewTheme;
          applySettings();
        });
        tile.addEventListener("mouseleave", function() {
          settings.theme = previewTheme;
          applySettings();
        });
        tile.addEventListener("click", function() {
          previewTheme = tile.dataset.previewTheme;
          settings.theme = previewTheme;
          applySettings();
          syncSettingsUI();
          store.set("themeChosen", true);
          collapseStrip(strip);
          toast(I.settings, "Theme saved. Change it any time via ⚙ in Settings.");
        });
      });
      const dismissBtn = strip.querySelector(".strip-dismiss");
      if (dismissBtn) {
        dismissBtn.onclick = function() {
          settings.theme = previewTheme;
          applySettings();
          store.set("themeChosen", true);
          collapseStrip(strip);
        };
      }
    }
  }
  function howCard(icon, title, body) {
    return '<div class="how-card"><div class="hc-ico">' + icon + "</div><h3>" + title + "</h3><p>" + body + "</p></div>";
  }

  // ---------- navigation ----------
  function go(id) {
    current = id;
    store.set("last", id);
    if (id !== "__home__") store.set("lastTopic", id);
    if (id === "__home__") renderHome();
    else renderTopic(id);
    refreshSidebarStates();
    // ensure section open + scroll into view in sidebar
    if (id !== "__home__") {
      const f = flat[topicById[id]];
      if (f && openSecs[f.sec.id] === false) {
        openSecs[f.sec.id] = true; store.set("openSecs", openSecs);
        const wrap = sidebar.querySelectorAll(".toc-section")[f.si];
        if (wrap) wrap.dataset.open = true;
      }
      const node = sidebar.querySelector('.toc-topic[data-topic="' + id + '"]');
      if (node) node.scrollIntoView ? node.scrollIntoView({ block: "nearest" }) : scrollSidebarTo(node);
    }
    // close mobile nav
    app.removeAttribute("data-nav");
  }
  function scrollSidebarTo(node) {
    const top = node.offsetTop - sidebar.clientHeight / 2;
    sidebar.scrollTo({ top: Math.max(0, top), behavior: settings.motion === "reduced" ? "auto" : "smooth" });
  }

  // ---------- toast ----------
  let toastTimer;
  function toast(icon, msg) {
    let t = $("#toast");
    if (!t) { t = el("div", "toast"); t.id = "toast"; document.body.appendChild(t); }
    t.innerHTML = icon + "<span>" + msg + "</span>";
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  // ---------- settings popover ----------
  function buildSettings() {
    const scrim = el("div", "scrim"); scrim.id = "scrim";
    const pop = el("div", "settings"); pop.id = "settings";
    pop.innerHTML =
      '<div class="set-group"><h3>Theme</h3><div class="seg" id="segTheme">' +
        seg("theme", "paper", "Paper") + seg("theme", "sepia", "Sepia") + seg("theme", "slate", "Dark") + seg("theme", "vivid", "Vivid") + "</div></div>" +
      '<div class="set-group"><h3>Text size</h3><div class="seg" id="segSize">' +
        seg("size", "s", "S") + seg("size", "m", "M") + seg("size", "l", "L") + seg("size", "xl", "XL") + "</div></div>" +
      '<div class="set-group"><h3>Comfort</h3>' +
        toggleRow("motion", "Reduce motion", "Calmer — turns off animations") +
        toggleRow("focus", "Focus mode", "Hide the sidebar while reading") +
        "</div>" +
      '<div class="set-group"><h3>Progress</h3>' +
        '<button class="set-reset" id="resetBtn">Reset all progress</button></div>';
    document.body.appendChild(scrim);
    document.body.appendChild(pop);

    scrim.onclick = closeSettings;

    pop.querySelectorAll("[data-set]").forEach(b => {
      b.onclick = () => {
        const key = b.dataset.set, val = b.dataset.val;
        settings[key] = val;
        applySettings();
        syncSettingsUI();
      };
    });
    pop.querySelectorAll("[data-toggle]").forEach(b => {
      b.onclick = () => {
        const key = b.dataset.toggle;
        if (key === "motion") settings.motion = settings.motion === "reduced" ? "normal" : "reduced";
        if (key === "focus") settings.focus = settings.focus === "on" ? "off" : "on";
        applySettings();
        syncSettingsUI();
      };
    });
    $("#resetBtn").onclick = () => {
      if (confirm("Reset all progress and quiz answers? This cannot be undone.")) {
        completed = {}; quizState = {};
        store.set("completed", completed); store.set("quiz", quizState);
        store.set("themeChosen", false);
        previewTheme = settings.theme;
        refreshSidebarStates(); updateProgress();
        if (current === "__home__") renderHome(); else renderTopic(current);
        toast(I.check, "Progress reset.");
        closeSettings();
      }
    };
    syncSettingsUI();
  }
  function seg(key, val, label) {
    return '<button data-set="' + key + '" data-val="' + val + '">' + label + "</button>";
  }
  function toggleRow(key, label, sub) {
    return '<div class="set-toggle"><span class="lbl">' + label + "<small>" + sub + "</small></span>" +
      '<button class="switch" data-toggle="' + key + '" aria-pressed="false"></button></div>';
  }
  function syncSettingsUI() {
    const pop = $("#settings");
    pop.querySelectorAll("[data-set]").forEach(b => {
      b.setAttribute("aria-pressed", settings[b.dataset.set] === b.dataset.val);
    });
    pop.querySelector('[data-toggle="motion"]').setAttribute("aria-pressed", settings.motion === "reduced");
    pop.querySelector('[data-toggle="focus"]').setAttribute("aria-pressed", settings.focus === "on");
  }
  function openSettings() { $("#scrim").classList.add("show"); $("#settings").classList.add("show"); }
  function closeSettings() { $("#scrim").classList.remove("show"); $("#settings").classList.remove("show"); }

  // ---------- topbar wiring ----------
  function wireTopbar() {
    $("#settingsBtn").innerHTML = I.settings;
    $("#menuBtn").innerHTML = I.menu;
    $("#settingsBtn").onclick = () => {
      const open = $("#settings").classList.contains("show");
      open ? closeSettings() : openSettings();
    };
    $("#menuBtn").onclick = () => {
      app.setAttribute("data-nav", app.getAttribute("data-nav") === "open" ? "closed" : "open");
    };
    $("#brandHome").onclick = () => go("__home__");
  }

  // ---------- keyboard ----------
  function wireKeys() {
    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (current === "__home__") return;
      const idx = topicById[current];
      if (e.key === "ArrowRight" && idx < TOTAL - 1) go(flat[idx + 1].topic.id);
      if (e.key === "ArrowLeft" && idx > 0) go(flat[idx - 1].topic.id);
      if (e.key === "Escape") closeSettings();
    });
  }

  // ---------- init ----------
  function init() {
    if (!TOTAL) { main.innerHTML = '<div class="reader"><p>No course content loaded.</p></div>'; return; }
    applySettings();
    buildSidebar();
    buildSettings();
    wireTopbar();
    wireKeys();
    updateProgress();
    if (current === "__home__" || topicById[current] == null) go("__home__");
    else go(current);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
