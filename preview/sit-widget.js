/**
 * SIT Widget — site-wide floating Skin Consultant launcher + mini chat.
 *
 * Include on every page EXCEPT sit.html (which has the full inline experience):
 *   <script src="sit-knowledge.js"></script>
 *   <script src="sit-widget.js"></script>
 *
 * Self-contained: injects its own scoped CSS (.sitw-*) and DOM. Reuses SIT_KB for
 * the mini Q&A + safety logic, and deep-links into sit.html?sit=<mode> for the
 * full Quick Match / Full Consultation / Photo Analysis flows.
 */
(function () {
  "use strict";

  // Don't inject on the dedicated page — it already has the full launcher.
  if (window.SIT || /(^|\/)sit\.html(\?|#|$)/.test(location.pathname + location.search)) return;
  if (window.__SIT_WIDGET__) return;
  window.__SIT_WIDGET__ = true;

  var KB = window.SIT_KB || null;
  var SIT_URL = "sit.html";

  /* ---------------- styles ---------------- */
  var CSS = [
    ".sitw-fab{position:fixed;right:22px;bottom:22px;z-index:9998;display:inline-flex;align-items:center;gap:9px;",
    "padding:13px 18px;border:none;border-radius:999px;cursor:pointer;font-family:var(--font-sans,'DM Sans',sans-serif);",
    "font-size:14px;font-weight:600;letter-spacing:.01em;color:#fff;background:var(--c-forest,#142b1b);",
    "box-shadow:0 10px 30px -8px rgba(3,7,6,.45);transition:transform .4s cubic-bezier(0.16,1,0.3,1),box-shadow .4s cubic-bezier(0.16,1,0.3,1);}",
    ".sitw-fab:hover{transform:translateY(-2px);box-shadow:0 16px 38px -10px rgba(3,7,6,.55);}",
    ".sitw-fab:active{transform:translateY(0) scale(.985);}",
    ".sitw-fab__dot{width:8px;height:8px;border-radius:50%;background:var(--c-fresh,#add9a8);box-shadow:0 0 0 0 rgba(173,217,168,.7);animation:sitwPulse 2.4s infinite;}",
    "@keyframes sitwPulse{0%{box-shadow:0 0 0 0 rgba(173,217,168,.6);}70%{box-shadow:0 0 0 7px rgba(173,217,168,0);}100%{box-shadow:0 0 0 0 rgba(173,217,168,0);}}",
    ".sitw-fab svg{width:17px;height:17px;}",

    ".sitw-panel{position:fixed;right:22px;bottom:22px;z-index:9999;width:374px;max-width:calc(100vw - 32px);",
    "height:560px;max-height:calc(100vh - 44px);display:flex;flex-direction:column;overflow:hidden;",
    "background:var(--c-cream,#faf9f6);border:1px solid var(--c-grey,#dddcdc);border-radius:22px;",
    "box-shadow:0 28px 70px -18px rgba(3,7,6,.5);font-family:var(--font-sans,'DM Sans',sans-serif);",
    "opacity:0;transform:translateY(14px) scale(.98);pointer-events:none;transition:opacity .35s cubic-bezier(0.16,1,0.3,1),transform .35s cubic-bezier(0.16,1,0.3,1);}",
    ".sitw-panel.is-open{opacity:1;transform:none;pointer-events:auto;}",

    ".sitw-head{display:flex;align-items:center;gap:11px;padding:16px 16px 14px;background:var(--c-forest,#142b1b);color:#fff;}",
    ".sitw-head__b{display:flex;flex-direction:column;line-height:1.25;}",
    ".sitw-head__t{font-size:14.5px;font-weight:600;letter-spacing:.01em;}",
    ".sitw-head__s{font-size:11.5px;color:var(--c-mint,#cde8c9);opacity:.92;}",
    ".sitw-head__ic{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.1);}",
    ".sitw-head__ic svg{width:18px;height:18px;}",
    ".sitw-x{margin-left:auto;width:30px;height:30px;border:none;border-radius:50%;background:rgba(255,255,255,.1);color:#fff;cursor:pointer;display:grid;place-items:center;transition:background .25s;}",
    ".sitw-x:hover{background:rgba(255,255,255,.2);}",".sitw-x svg{width:15px;height:15px;}",

    ".sitw-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:11px;scrollbar-width:thin;}",
    ".sitw-msg{max-width:84%;padding:11px 13px;border-radius:15px;font-size:13.5px;line-height:1.5;}",
    ".sitw-msg--bot{align-self:flex-start;background:#fff;border:1px solid var(--c-grey,#dddcdc);color:var(--c-black,#030706);border-bottom-left-radius:5px;}",
    ".sitw-msg--user{align-self:flex-end;background:var(--c-green-rich,#2c4f31);color:#fff;border-bottom-right-radius:5px;}",
    ".sitw-chips{display:flex;flex-wrap:wrap;gap:7px;align-self:flex-start;max-width:100%;}",
    ".sitw-chip{padding:8px 13px;border:1px solid var(--c-sage,#819d7c);border-radius:999px;background:transparent;",
    "color:var(--c-green-nat,#49724a);font:inherit;font-size:12.5px;font-weight:500;cursor:pointer;transition:all .25s cubic-bezier(0.16,1,0.3,1);}",
    ".sitw-chip:hover{background:var(--c-mint,#cde8c9);border-color:var(--c-green-nat,#49724a);transform:translateY(-1px);}",
    ".sitw-chip--cta{background:var(--c-forest,#142b1b);border-color:var(--c-forest,#142b1b);color:#fff;}",
    ".sitw-chip--cta:hover{background:var(--c-green-rich,#2c4f31);border-color:var(--c-green-rich,#2c4f31);}",
    ".sitw-typing{align-self:flex-start;display:inline-flex;gap:4px;padding:12px 14px;background:#fff;border:1px solid var(--c-grey,#dddcdc);border-radius:15px;border-bottom-left-radius:5px;}",
    ".sitw-typing i{width:6px;height:6px;border-radius:50%;background:var(--c-sage,#819d7c);animation:sitwBlink 1.4s infinite both;}",
    ".sitw-typing i:nth-child(2){animation-delay:.2s;}",".sitw-typing i:nth-child(3){animation-delay:.4s;}",
    "@keyframes sitwBlink{0%,80%,100%{opacity:.25;}40%{opacity:1;}}",

    ".sitw-foot{border-top:1px solid var(--c-grey,#dddcdc);background:#fff;padding:10px 12px;}",
    ".sitw-bar{display:flex;align-items:center;gap:8px;}",
    ".sitw-in{flex:1;border:1px solid var(--c-grey,#dddcdc);border-radius:999px;padding:10px 14px;font:inherit;font-size:13px;color:var(--c-black,#030706);background:var(--c-cream,#faf9f6);outline:none;transition:border-color .25s;}",
    ".sitw-in:focus{border-color:var(--c-green-nat,#49724a);}",
    ".sitw-send{width:38px;height:38px;flex:none;border:none;border-radius:50%;background:var(--c-forest,#142b1b);color:#fff;cursor:pointer;display:grid;place-items:center;transition:background .25s,transform .2s;}",
    ".sitw-send:hover{background:var(--c-green-rich,#2c4f31);}",".sitw-send:active{transform:scale(.94);}",".sitw-send svg{width:16px;height:16px;}",
    ".sitw-disc{margin-top:7px;font-size:10px;line-height:1.4;color:var(--c-grey-green,#a4b09e);text-align:center;}",
    "@media (max-width:480px){.sitw-panel{right:8px;bottom:8px;height:calc(100vh - 80px);}.sitw-fab{right:14px;bottom:14px;}}"
  ].join("");

  /* ---------------- svg icons ---------------- */
  var IC = {
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="3.2"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    send:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>'
  };

  /* ---------------- helpers ---------------- */
  function h(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function track(ev, data) { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: ev }, data || {})); }
  function go(mode, concern) {
    var u = SIT_URL + "?sit=" + encodeURIComponent(mode);
    if (concern) u += "&concern=" + encodeURIComponent(concern);
    location.href = u;
  }

  /* ---------------- build DOM ---------------- */
  var style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);

  var fab = h(
    '<button class="sitw-fab" aria-label="Open Skin Consultant">' +
    '<span class="sitw-fab__dot"></span>' + IC.spark +
    '<span>Skin Consultant</span></button>'
  );

  var panel = h('<aside class="sitw-panel" role="dialog" aria-modal="false" aria-label="Skin Consultant"></aside>');
  panel.appendChild(h(
    '<div class="sitw-head">' +
    '<span class="sitw-head__ic">' + IC.spark + '</span>' +
    '<span class="sitw-head__b"><span class="sitw-head__t">Skin Consultant</span>' +
    '<span class="sitw-head__s">Skincare guidance &middot; not medical advice</span></span>' +
    '<button class="sitw-x" aria-label="Close">' + IC.close + '</button></div>'
  ));
  var body = h('<div class="sitw-body"></div>');
  panel.appendChild(body);
  panel.appendChild(h(
    '<div class="sitw-foot"><div class="sitw-bar">' +
    '<input class="sitw-in" type="text" placeholder="Ask about your skin…" aria-label="Ask a skincare question">' +
    '<button class="sitw-send" aria-label="Send">' + IC.send + '</button></div>' +
    '<p class="sitw-disc">General cosmetic guidance only. For painful, severe or persistent concerns, see a dermatologist.</p></div>'
  ));

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  var input = panel.querySelector(".sitw-in");
  var sendBtn = panel.querySelector(".sitw-send");
  var closeBtn = panel.querySelector(".sitw-x");

  /* ---------------- chat primitives ---------------- */
  function botSay(t) { var m = h('<div class="sitw-msg sitw-msg--bot">' + esc(t) + "</div>"); body.appendChild(m); scroll(); return m; }
  function userSay(t) { var m = h('<div class="sitw-msg sitw-msg--user">' + esc(t) + "</div>"); body.appendChild(m); scroll(); }
  function scroll() { body.scrollTop = body.scrollHeight; }
  function typing() { var t = h('<div class="sitw-typing"><i></i><i></i><i></i></div>'); body.appendChild(t); scroll(); return t; }

  function chips(list) {
    var w = h('<div class="sitw-chips"></div>');
    list.forEach(function (c) {
      var b = h('<button class="sitw-chip' + (c.cta ? " sitw-chip--cta" : "") + '">' + esc(c.label) + "</button>");
      b.addEventListener("click", c.onClick);
      w.appendChild(b);
    });
    body.appendChild(w); scroll();
  }

  function productChips(handles) {
    if (!KB) return;
    var list = (handles || []).map(function (hd) {
      var p = KB.products[hd];
      return p ? { label: p.name + " · " + p.price, onClick: function () { location.href = "product.html"; } } : null;
    }).filter(Boolean);
    if (list.length) chips(list);
  }

  function actionChips() {
    chips([
      { label: "Find my serum", cta: true, onClick: function () { track("sit_widget_action", { action: "quick" }); go("quick"); } },
      { label: "Full consultation", onClick: function () { track("sit_widget_action", { action: "full" }); go("full"); } },
      { label: "Photo analysis", onClick: function () { track("sit_widget_action", { action: "photo" }); go("photo"); } }
    ]);
  }

  function handoff(mode, label) {
    chips([{ label: label, cta: true, onClick: function () { go(mode); } }]);
  }

  /* ---------------- mini Q&A (mirrors sit.html engine) ---------------- */
  function search(q) {
    if (!KB || !KB.qa) return null;
    var words = q.split(/\W+/).filter(function (w) { return w.length > 3; });
    var best = null, score = 0;
    KB.qa.forEach(function (item) {
      var hay = (item.question + " " + (item.tags || []).join(" ") + " " + (item.category || "")).toLowerCase();
      var s = 0; words.forEach(function (w) { if (hay.indexOf(w) > -1) s++; });
      if (s > score) { score = s; best = item; }
    });
    return score >= 1 ? best : null;
  }

  function answer(text) {
    var q = text.toLowerCase();
    var cr = (KB && KB.chatResponses) || {};
    /* safety first */
    var danger = /pain|bleed|infect|swollen|swelling|burn|wound|spreading|rapidly|lesion|mole|cancer/;
    if (danger.test(q)) {
      botSay(cr.safety_flag || "Some of what you've described may need professional attention. Please consider seeing a dermatologist or GP.");
      track("sit_widget_safety_flag", {});
      return;
    }
    /* intent handoffs into the full experience */
    if (/find my serum|recommend|which serum|what should i use|my serum|best serum/.test(q)) {
      botSay("I can match you to a serum in about a minute with a few quick questions.");
      handoff("quick", "Start Quick Match"); return;
    }
    if (/build my routine|full routine|routine|morning|evening|am and pm/.test(q)) {
      botSay("A full consultation builds your complete AM and PM routine with a 4-week plan.");
      handoff("full", "Start Full Consultation"); return;
    }
    if (/upload|photo|picture|selfie/.test(q)) {
      botSay("You can upload a clear, well-lit photo and I'll review visible skin patterns — privately.");
      handoff("photo", "Upload a photo"); return;
    }
    /* Q&A retrieval */
    var best = search(q);
    if (best) {
      botSay(best.answer);
      if (best.products && best.products.length) productChips(best.products);
      return;
    }
    if (/sensitive|reactive|redness|calm/.test(q) && KB && KB.qa) {
      var qa = KB.qa.find(function (x) { return x.id === "qa_002"; });
      if (qa) { botSay(qa.answer); productChips(qa.products); return; }
    }
    botSay(cr.low_confidence || "I'm not fully sure on that one. A quick skin match is the most reliable way to get a tailored answer.");
    handoff("quick", "Start Quick Match");
  }

  function reply(text) {
    var t = typing();
    setTimeout(function () { t.remove(); answer(text); }, 620 + Math.random() * 380);
  }

  /* ---------------- send wiring ---------------- */
  function send() {
    var v = input.value.trim();
    if (!v) return;
    userSay(v); input.value = "";
    track("sit_widget_message", {});
    if (KB) { reply(v); }
    else { botSay("Let's open the Skin Consultant for a full answer."); handoff("quick", "Open Skin Consultant"); }
  }
  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });

  /* ---------------- open / close ---------------- */
  var greeted = false;
  function openPanel() {
    panel.classList.add("is-open");
    fab.style.display = "none";
    track("sit_widget_opened", {});
    if (!greeted) {
      greeted = true;
      var cr = (KB && KB.chatResponses) || {};
      botSay(cr.greeting || "Hi, I'm your Sebble Skin Consultant. Tell me your main skin goal, or pick an option below.");
      actionChips();
    }
    setTimeout(function () { input.focus(); }, 360);
  }
  function closePanel() {
    panel.classList.remove("is-open");
    fab.style.display = "";
  }
  fab.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel.classList.contains("is-open")) closePanel(); });

  /* expose a tiny API so page CTAs can trigger the widget or jump straight in */
  window.SITWidget = {
    open: openPanel,
    close: closePanel,
    launch: function (mode, concern) { go(mode || "quick", concern); }
  };
})();
