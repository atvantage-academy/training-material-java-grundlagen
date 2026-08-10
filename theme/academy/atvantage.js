/* =============================================================================
   ATVANTAGE Brand — interaktives Verhalten
   -----------------------------------------------------------------------------
   Kleines, abhängigkeitsfreies Skript für markenweite Interaktionen, die in
   JEDER Unterlage verfügbar sein sollen. Bewusst schlank gehalten; unterlagen-
   spezifische Logik gehört in das Skript der jeweiligen Unterlage.

   Aktuell enthalten:
     - Theme-Umschaltung  (Elemente mit [data-avd-academy-theme-toggle])
     - "Kopieren"-Buttons an Code-Blöcken (<pre>)
     - Mobiles Aufklappen der Header-Navigation ([data-avd-academy-nav-toggle])
     - "Markdown kopieren" auf Übungsseiten ([data-avd-academy-copy-md])

   Einbindung: <script src="<BASISPFAD>/atvantage.js" defer></script>
   ============================================================================= */
(function () {
  "use strict";

  /* --- Theme-Umschaltung -------------------------------------------------- */
  function initThemeToggle() {
    document.querySelectorAll("[data-avd-academy-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var root = document.documentElement;
        var next = root.getAttribute("data-avd-academy-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-avd-academy-theme", next);
        try { localStorage.setItem("avd-academy-theme", next); } catch (e) { /* egal */ }
      });
    });
    try {
      var saved = localStorage.getItem("avd-academy-theme");
      if (saved) document.documentElement.setAttribute("data-avd-academy-theme", saved);
    } catch (e) { /* egal */ }
  }

  /* --- Kopieren-Buttons an Code-Blöcken ----------------------------------- */
  function initCopyButtons() {
    document.querySelectorAll("pre > code").forEach(function (code) {
      var pre = code.parentElement;
      if (pre.querySelector(".avd-academy-copy")) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "avd-academy-btn avd-academy-btn--primary avd-academy-copy";
      btn.title = "Kopieren";
      btn.setAttribute("aria-label", "Kopieren");
      btn.style.position = "absolute";
      btn.style.top = "0.5rem";
      btn.style.right = "0.5rem";
      pre.style.position = "relative";
      btn.addEventListener("click", function () {
        navigator.clipboard.writeText(code.innerText).then(function () {
          btn.classList.add("is-copied");
          btn.title = "Kopiert!";
          setTimeout(function () {
            btn.classList.remove("is-copied");
            btn.title = "Kopieren";
          }, 1500);
        });
      });
      pre.appendChild(btn);
    });
  }

  /* --- Mobile Navigation --------------------------------------------------
     Der Burger klappt das per CSS (max-width) eingeklappte Nav auf/zu. Auf
     breiten Viewports ist der Burger ausgeblendet und das Nav ohnehin sichtbar;
     das Attribut [data-open] ist dort wirkungslos. */
  function closeAllNavs() {
    document.querySelectorAll("[data-avd-academy-nav-toggle]").forEach(function (btn) {
      var t = document.querySelector(btn.getAttribute("data-avd-academy-nav-toggle"));
      if (t) t.removeAttribute("data-open");
      btn.setAttribute("aria-expanded", "false");
    });
  }

  function initNavToggle() {
    var toggles = document.querySelectorAll("[data-avd-academy-nav-toggle]");
    if (!toggles.length) return;

    toggles.forEach(function (btn) {
      var target = document.querySelector(btn.getAttribute("data-avd-academy-nav-toggle"));
      if (!target) return;
      btn.setAttribute("aria-expanded", "false");
      if (target.id) btn.setAttribute("aria-controls", target.id);

      btn.addEventListener("click", function () {
        var open = target.toggleAttribute("data-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });

      /* Klick auf einen Link schließt das Menü (Zielseite wird geladen). */
      target.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeAllNavs();
      });
    });

    /* Escape schließt; Klick außerhalb des Headers schließt. */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllNavs();
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".avd-academy-header")) closeAllNavs();
    });
  }

  /* --- "Markdown kopieren" (Übungsseiten) ---------------------------------
     Kopiert den rohen Markdown-Inhalt aus dem versteckten <textarea>, auf das
     der Button per [data-avd-academy-copy-md="#id"] zeigt. */
  function initCopyMarkdown() {
    document.querySelectorAll("[data-avd-academy-copy-md]").forEach(function (btn) {
      var src = document.querySelector(btn.getAttribute("data-avd-academy-copy-md"));
      if (!src) return;
      btn.addEventListener("click", function () {
        var text = (src.value != null) ? src.value : src.textContent;
        navigator.clipboard.writeText(text).then(function () {
          var oldTitle = btn.title || btn.getAttribute("aria-label");
          btn.classList.add("is-copied");
          btn.title = "Kopiert!";
          setTimeout(function () {
            btn.classList.remove("is-copied");
            btn.title = oldTitle;
          }, 1500);
        });
      });
    });
  }

  /* --- Übung: Inhaltsverzeichnis automatisch aus Überschriften ------------- */
  function initGuideToc() {
    var toc = document.querySelector("[data-avd-academy-toc]");
    var main = document.querySelector(".avd-academy-guide-main, .avd-academy-doc-main");
    // Karte, die das Inhaltsverzeichnis trägt (Guide- oder Doc-Layout).
    var tocCard = toc && toc.closest(".avd-academy-guide-side, [data-avd-academy-toc-box]");

    if (toc && main) {
      // Nur Überschriften auf oberster Ebene (nicht in Karten/Zitaten verschachtelte).
      var heads = main.querySelectorAll(":scope > h2, :scope > h3");
      // Inhaltsverzeichnis erst ab mindestens ZWEI Überschriften anzeigen.
      if (heads.length >= 2) {
        heads.forEach(function (h) {
          if (!h.id) {
            h.id = (h.textContent || "").toLowerCase().trim()
              .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
          }
          var a = document.createElement("a");
          a.href = "#" + h.id;
          a.textContent = h.textContent;
          if (h.tagName === "H3") a.className = "avd-academy-toc--h3";
          toc.appendChild(a);
        });
        if (tocCard) tocCard.hidden = false;
        if ("IntersectionObserver" in window) {
          var links = toc.querySelectorAll("a");
          var byId = {};
          links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
          var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              var a = byId[en.target.id];
              if (a && en.isIntersecting) {
                links.forEach(function (x) { x.removeAttribute("aria-current"); });
                a.setAttribute("aria-current", "true");
              }
            });
          }, { rootMargin: "0px 0px -75% 0px" });
          heads.forEach(function (h) { obs.observe(h); });
        }
      } else if (tocCard) {
        tocCard.hidden = true;
      }
    }

    // Doc-Layout: rechte Sidebar nur zeigen, wenn sie sichtbaren Inhalt hat
    // (Inhaltsverzeichnis mit >= 2 Einträgen und/oder „Weiterführende
    // Informationen"). Sonst einspaltig.
    var docLayout = document.querySelector(".avd-academy-doc-layout");
    if (docLayout) {
      var sidebar = docLayout.querySelector(".avd-academy-doc-sidebar");
      if (sidebar) {
        if (sidebar.querySelector(":scope > :not([hidden])")) {
          docLayout.classList.add("avd-academy-doc-layout--with-sidebar");
        } else {
          sidebar.hidden = true;
        }
      }
    }
  }

  /* --- Fortschritt aus Task-Listen-Checkboxen -----------------------------
     Funktioniert im Guide- wie im Doc-Layout (Definition of Done bzw.
     Voraussetzungen). Läuft VOR der Doc-Sidebar-Sichtbarkeitsprüfung in
     initGuideToc(), damit die (per [hidden]) versteckte Fortschrittskarte dort
     korrekt als „leer" zählt. */
  function initGuideProgress() {
    var box = document.querySelector("[data-avd-academy-progress]");
    var main = document.querySelector(".avd-academy-guide-main, .avd-academy-doc-main");
    if (!box || !main) return;
    var checks = main.querySelectorAll('input[type="checkbox"]');
    if (!checks.length) { box.hidden = true; return; }
    box.hidden = false;
    var fill = box.querySelector(".avd-academy-progress__fill");
    var text = box.querySelector(".avd-academy-progress__text");
    function update() {
      var done = 0;
      checks.forEach(function (c) { if (c.checked) done++; });
      var pct = Math.round((done / checks.length) * 100);
      if (fill) fill.style.width = pct + "%";
      if (text) text.textContent = done + " / " + checks.length + " erledigt";
      // Vollständig erledigt → grüner Haken (Balken/Text bleiben sichtbar).
      box.classList.toggle("is-complete", done === checks.length);
    }
    checks.forEach(function (c) {
      c.disabled = false;
      c.addEventListener("change", update);
    });
    update();
  }

  /* --- Header-Untermenü (Dropdown / im Burger aufklappbar) ----------------- */
  function closeAllMenus(except) {
    document.querySelectorAll(".avd-academy-header__submenu[data-open]").forEach(function (s) {
      if (s === except) return;
      s.removeAttribute("data-open");
      var t = s.parentNode.querySelector(".avd-academy-header__grouptoggle");
      if (t) t.setAttribute("aria-expanded", "false");
    });
  }
  function initNavDropdown() {
    var groups = document.querySelectorAll("[data-avd-academy-menu]");
    if (!groups.length) return;
    groups.forEach(function (group) {
      var toggle = group.querySelector(".avd-academy-header__grouptoggle");
      var submenu = group.querySelector(".avd-academy-header__submenu");
      if (!toggle || !submenu) return;
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var open = submenu.hasAttribute("data-open");
        closeAllMenus(submenu);
        if (open) {
          submenu.removeAttribute("data-open");
          toggle.setAttribute("aria-expanded", "false");
        } else {
          submenu.setAttribute("data-open", "");
          toggle.setAttribute("aria-expanded", "true");
        }
      });
    });
    document.addEventListener("click", function (e) {
      document.querySelectorAll("[data-avd-academy-menu]").forEach(function (group) {
        if (!group.contains(e.target)) {
          var s = group.querySelector(".avd-academy-header__submenu[data-open]");
          if (s) closeAllMenus();
        }
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllMenus();
    });
  }

  function init() {
    initThemeToggle();
    initCopyButtons();
    initNavToggle();
    initNavDropdown();
    initCopyMarkdown();
    initGuideProgress();
    initGuideToc();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
