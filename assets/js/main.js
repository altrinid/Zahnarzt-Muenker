(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");
  var header = document.getElementById("header");
  var callbar = document.getElementById("callbar");
  var hero = document.querySelector(".hero");

  /* ---------- Header + mobile call bar on scroll ---------- */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle("is-scrolled", y > 8);
    if (callbar && hero) callbar.classList.toggle("is-visible", y > hero.offsetHeight * 0.6);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    if (open) root.style.setProperty("--nav-top", header.getBoundingClientRect().bottom + "px");
    root.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  }
  toggle.addEventListener("click", function () { setMenu(!root.classList.contains("menu-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 1100) setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Active nav link ---------- */
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { navIo.observe(s); });
  }

  /* ---------- Opening status (Europe/Vienna) ---------- */
  // minutes since midnight; 0 = Sonntag
  var HOURS = { 1: [660, 1140], 2: [600, 1080], 3: [600, 1080], 4: [510, 840] };
  var DAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

  function viennaNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Vienna", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
      }).formatToParts(new Date());
      var p = {};
      parts.forEach(function (x) { p[x.type] = x.value; });
      var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
      return { day: day, min: parseInt(p.hour, 10) * 60 + parseInt(p.minute, 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }
  function fmt(m) {
    var h = Math.floor(m / 60), mm = m % 60;
    return (h < 10 ? "0" : "") + h + ":" + (mm < 10 ? "0" : "") + mm;
  }
  function updateStatus() {
    var now = viennaNow();
    var today = HOURS[now.day];
    var open = !!today && now.min >= today[0] && now.min < today[1];
    var html;
    if (open) {
      html = "<strong>Jetzt geöffnet</strong> · bis " + fmt(today[1]) + " Uhr";
    } else if (today && now.min < today[0]) {
      html = "<strong>Derzeit geschlossen</strong> · öffnet heute um " + fmt(today[0]) + " Uhr";
    } else {
      for (var i = 1; i <= 7; i++) {
        var d = (now.day + i) % 7;
        if (HOURS[d]) {
          html = "<strong>Derzeit geschlossen</strong> · öffnet " + (i === 1 ? "morgen" : DAYS[d]) + " um " + fmt(HOURS[d][0]) + " Uhr";
          break;
        }
      }
    }
    document.querySelectorAll("[data-status]").forEach(function (el) {
      el.classList.toggle("is-open", open);
      el.querySelector("[data-status-text]").innerHTML = html;
    });
    document.querySelectorAll(".hours tr[data-day]").forEach(function (tr) {
      var days = tr.getAttribute("data-day").split(",").map(Number);
      tr.classList.toggle("is-today", days.indexOf(now.day) !== -1 && !!HOURS[now.day]);
    });
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var items = Array.prototype.slice.call(document.querySelectorAll("#gallery .g"));
  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector("[data-lb-cap]");
  var lbCount = lb.querySelector("[data-lb-count]");
  var current = 0, lastFocus = null;

  function show(i) {
    current = (i + items.length) % items.length;
    var it = items[current];
    var img = it.querySelector("img");
    lbImg.src = it.getAttribute("data-full");
    lbImg.alt = img.alt;
    lbCap.textContent = (it.querySelector(".cap") || {}).textContent || "";
    lbCount.textContent = (current + 1) + " / " + items.length;
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    requestAnimationFrame(function () { lb.classList.add("is-open"); });
    root.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }
  function closeLb() {
    lb.classList.remove("is-open");
    root.style.overflow = "";
    setTimeout(function () { lb.hidden = true; }, 300);
    if (lastFocus) lastFocus.focus();
  }
  items.forEach(function (it, i) {
    it.setAttribute("aria-label", "Bild vergrößern: " + it.querySelector("img").alt);
    it.addEventListener("click", function () { openLb(i); });
  });
  lb.querySelector(".lb-close").addEventListener("click", closeLb);
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lightbox__stage")) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "Tab") {
      var f = lb.querySelectorAll("button");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    tx = null;
  });

  /* ---------- Map (click to load, no data transfer before consent) ---------- */
  var mapBtn = document.getElementById("map-load");
  if (mapBtn) {
    mapBtn.addEventListener("click", function () {
      var map = document.getElementById("map");
      var f = document.createElement("iframe");
      f.title = "Karte: Dresdner Straße 48, 1200 Wien";
      f.loading = "lazy";
      f.src = "https://www.openstreetmap.org/export/embed.html?bbox=16.3726%2C48.2345%2C16.3846%2C48.2405&layer=mapnik&marker=48.23748%2C16.37861";
      map.innerHTML = "";
      map.appendChild(f);
    });
  }

  /* ---------- Year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
