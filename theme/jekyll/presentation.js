/* =============================================================================
   Layout „presentation“ – Verhalten (ATVANTAGE Academy)
   -----------------------------------------------------------------------------
   Macht aus dem gerenderten Markdown einer Seite mit `layout: presentation` ein
   Foliendeck. Abhängigkeitsfrei, kein Build, kein CDN.

   1) AUFTEILEN: Der Inhalt von [data-avd-academy-deck] wird an jedem <h2> in
      Folien zerlegt. Alles vor dem ersten <h2> wird zur Titelfolie; fehlt dort
      eine Überschrift, wird der Präsentationstitel eingesetzt.
   2) BLÄTTERN: Alle Folien liegen nebeneinander auf einer Schiene, die um
      n × 100 % verschoben wird – die alte Folie wandert nach links aus dem Bild.
   3) BEDIENEN: ← → (auch Leertaste, Bild ↑/↓, Pos1/Ende), Schaltflächen,
      Wischgesten; F schaltet Vollbild. Die Folie steht im Hash (#/3).

   Ohne dieses Skript bleibt die Seite ein normales, scrollbares Dokument – die
   CSS-Regeln für die Bühne hängen an `data-ready`, das erst hier gesetzt wird.
   ============================================================================= */
(function () {
  "use strict";

  var root = document.querySelector("[data-avd-academy-present]");
  var deck = document.querySelector("[data-avd-academy-deck]");
  if (!root || !deck) return;

  /* --- 1) Folien aus dem Markdown bauen ------------------------------------ */
  var track = document.createElement("div");
  track.className = "avd-academy-deck__track";

  var inner = null; // Inhaltsspalte der aktuell befüllten Folie

  function addSlide(modifier) {
    var section = document.createElement("section");
    section.className = "avd-academy-slide" + (modifier ? " " + modifier : "");
    var box = document.createElement("div");
    box.className = "avd-academy-slide__inner";
    section.appendChild(box);
    track.appendChild(section);
    inner = box;
    return section;
  }

  var nodes = Array.prototype.slice.call(deck.childNodes);
  nodes.forEach(function (node) {
    // Reine Zeilenumbrüche zwischen den Blöcken und Kommentare tragen nichts bei –
    // sie dürfen vor allem nicht versehentlich eine Titelfolie auslösen.
    if (node.nodeType === 3 && !node.textContent.trim()) return;
    if (node.nodeType === 8) return;

    if (node.nodeType === 1 && node.tagName === "H2") {
      addSlide();
    } else if (!inner) {
      addSlide("avd-academy-slide--title");
    }
    inner.appendChild(node);
  });

  // Beginnt der Inhalt direkt mit einem h2, fehlt die Titelfolie – dann wird sie
  // aus dem Präsentationstitel erzeugt und vorangestellt.
  var title = root.getAttribute("data-avd-academy-present-title");
  var firstSlide = track.firstElementChild;
  if (firstSlide && !firstSlide.classList.contains("avd-academy-slide--title") && title) {
    var lead = addSlide("avd-academy-slide--title");
    var h1 = document.createElement("h1");
    h1.textContent = title;
    lead.querySelector(".avd-academy-slide__inner").appendChild(h1);
    track.insertBefore(lead, track.firstElementChild);
  }
  // Titelfolie ohne eigene Überschrift (z. B. nur ein Untertitel): Titel ergänzen.
  firstSlide = track.firstElementChild;
  if (firstSlide && firstSlide.classList.contains("avd-academy-slide--title") && title) {
    var box = firstSlide.querySelector(".avd-academy-slide__inner");
    if (!box.querySelector("h1")) {
      var heading = document.createElement("h1");
      heading.textContent = title;
      box.insertBefore(heading, box.firstChild);
    }
  }

  deck.textContent = "";
  deck.appendChild(track);
  deck.setAttribute("data-ready", "");
  root.setAttribute("data-ready", "");

  var slides = Array.prototype.slice.call(track.children);
  if (!slides.length) return;

  /* --- 2) Zustand + Anzeige ------------------------------------------------- */
  var counter = document.querySelector("[data-avd-academy-present-counter]");
  var progress = document.querySelector("[data-avd-academy-present-progress]");
  var controls = document.querySelector("[data-avd-academy-present-controls]");
  var prevBtn = document.querySelector("[data-avd-academy-present-prev]");
  var nextBtn = document.querySelector("[data-avd-academy-present-next]");
  var index = 0;

  if (controls && slides.length > 1) controls.removeAttribute("hidden");

  function render() {
    track.style.transform = "translateX(-" + index * 100 + "%)";
    slides.forEach(function (s, i) {
      if (i === index) s.removeAttribute("aria-hidden");
      else s.setAttribute("aria-hidden", "true");
    });
    if (counter) counter.textContent = index + 1 + " / " + slides.length;
    if (progress) progress.style.width = ((index + 1) / slides.length) * 100 + "%";
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === slides.length - 1;
    if (slides[index].classList.contains("avd-academy-slide--title")) {
      root.setAttribute("data-at-title", "");
    } else {
      root.removeAttribute("data-at-title");
    }
    var hash = "#/" + (index + 1);
    if (location.hash !== hash) history.replaceState(null, "", hash);
  }

  function go(to) {
    var next = Math.max(0, Math.min(slides.length - 1, to));
    if (next === index) return;
    index = next;
    slides[index].scrollTop = 0;
    render();
  }

  function fromHash() {
    var m = /^#\/(\d+)$/.exec(location.hash || "");
    if (!m) return;
    var n = parseInt(m[1], 10) - 1;
    if (!isNaN(n)) index = Math.max(0, Math.min(slides.length - 1, n));
  }

  fromHash();
  render();
  window.addEventListener("hashchange", function () {
    var before = index;
    fromHash();
    if (before !== index) render();
  });

  /* --- 3) Bedienung --------------------------------------------------------- */
  if (prevBtn) prevBtn.addEventListener("click", function () { go(index - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { go(index + 1); });

  var printBtn = document.querySelector("[data-avd-academy-present-print]");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  var fullBtn = document.querySelector("[data-avd-academy-present-full]");
  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
  }
  if (fullBtn) fullBtn.addEventListener("click", toggleFullscreen);

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;

    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
      case " ":
        go(index + 1); e.preventDefault(); break;
      case "ArrowLeft":
      case "PageUp":
        go(index - 1); e.preventDefault(); break;
      case "Home":
        go(0); e.preventDefault(); break;
      case "End":
        go(slides.length - 1); e.preventDefault(); break;
      case "f":
      case "F":
        toggleFullscreen(); e.preventDefault(); break;
      default:
        break;
    }
  });

  // Wischen (Trackpad/Magic Mouse): Zwei-Finger-Geste nach links = nächste Folie,
  // nach rechts = zurück. Der Browser meldet sie als `wheel` mit waagerechtem
  // deltaX (nach links wischen ⇒ deltaX positiv, wie „weiter rechts schauen“).
  //
  // Drei Dinge sind dabei zu regeln:
  //   1. GESTE STATT EREIGNIS – ein Wisch erzeugt Dutzende wheel-Events samt
  //      Nachlauf (Momentum). Deshalb wird deltaX aufsummiert, EINMAL geblättert
  //      und danach gesperrt, bis 220 ms lang nichts mehr kommt.
  //   2. SENKRECHTES SCROLLEN nicht kapern – überwiegt deltaY, gehört die Geste
  //      der langen Folie. Ebenso Pinch-Zoom (ctrlKey).
  //   3. WAAGERECHT SCROLLBARE INHALTE haben Vorrang: Wer in einem breiten
  //      Codeblock oder einer breiten Tabelle wischt, will dort scrollen – erst
  //      am Anschlag blättert die Folie weiter.
  // preventDefault() ist nötig, damit die Geste nicht zusätzlich die
  // Verlaufsnavigation des Browsers („zurück“) auslöst.
  var wheelSum = 0, wheelLocked = false, wheelTimer = null;

  function wheelIdle() {
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function () { wheelLocked = false; wheelSum = 0; }, 220);
  }

  function scrollsHorizontally(node, delta) {
    while (node && node !== deck) {
      if (node.scrollWidth - node.clientWidth > 1) {
        var max = node.scrollWidth - node.clientWidth;
        if ((delta > 0 && node.scrollLeft < max - 1) || (delta < 0 && node.scrollLeft > 1)) return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  deck.addEventListener("wheel", function (e) {
    if (e.ctrlKey) return;                                   // Pinch-Zoom
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;    // senkrecht → Folie scrollen
    var dx = e.deltaX;
    if (e.deltaMode === 1) dx *= 16;                         // Zeilen
    else if (e.deltaMode === 2) dx *= deck.clientWidth;      // Seiten
    if (scrollsHorizontally(e.target, dx)) return;

    e.preventDefault();
    if (wheelLocked) { wheelIdle(); return; }
    wheelSum += dx;
    if (Math.abs(wheelSum) >= 60) {
      go(wheelSum > 0 ? index + 1 : index - 1);
      wheelLocked = true;
      wheelSum = 0;
    }
    wheelIdle();
  }, { passive: false });

  // Wischen (Touch): waagerechte Geste ab 60 px blättert; senkrechtes Scrollen
  // innerhalb einer langen Folie bleibt unberührt.
  var startX = 0, startY = 0, tracking = false;
  deck.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) { tracking = false; return; }
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    tracking = true;
  }, { passive: true });
  deck.addEventListener("touchend", function (e) {
    if (!tracking) return;
    tracking = false;
    var touch = e.changedTouches[0];
    var dx = touch.clientX - startX;
    var dy = touch.clientY - startY;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? index + 1 : index - 1);
  }, { passive: true });
})();
