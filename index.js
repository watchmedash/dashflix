// ── TRENDING STRIP ──
async function loadStrip(type, containerId) {
  const blocked = type === "movie" ? BLOCKED_MOVIES : BLOCKED_SHOWS;
  const ep = type === "movie" ? "movie/popular" : "tv/popular";
  try {
    const res  = await fetch(`${BASE}/${ep}?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    const list = (data.results || []).filter(x => !blocked.has(x.id)).slice(0, 10);
    const wrap = document.getElementById(containerId);
    list.forEach((item, i) => {
      const title = item.title || item.name;
      const url   = type === "movie" ? `player.html?id=${item.id}` : `players.html?id=${item.id}`;
      const card  = document.createElement("div");
      card.className = "t-card";
      if (item.poster_path) {
        const img = document.createElement("img");
        img.src = IMG + item.poster_path;
        img.alt = title; img.loading = "lazy";
        img.onerror = () => {
          const ph = document.createElement("div");
          ph.className = "t-ph"; ph.innerHTML = '<i class="fas fa-film"></i>';
          img.replaceWith(ph);
        };
        card.appendChild(img);
      } else {
        const ph = document.createElement("div");
        ph.className = "t-ph"; ph.innerHTML = '<i class="fas fa-film"></i>';
        card.appendChild(ph);
      }
      const num = document.createElement("div");
      num.className = "t-num"; num.textContent = i + 1;
      const lbl = document.createElement("div");
      lbl.className = "t-lbl"; lbl.textContent = title;
      card.appendChild(num); card.appendChild(lbl);
      card.addEventListener("click",       () => location.href = url);
      card.addEventListener("contextmenu", e  => showCtx(e, { ...item, type }));
      wrap.appendChild(card);
    });
  } catch (e) { console.error(e); }
}

// ── CONTINUE WATCHING ──
(function() {
  const items = RW.get();
  if (!items.length) return;
  const statsRow = document.querySelector(".stats-row");
  if (!statsRow) return;
  const sec = document.createElement("div");
  sec.innerHTML = `
    <div class="section-header" style="margin-top:4px;">
      <h2 class="section-title">Continue <span>Watching</span></h2>
    </div>
    <div class="t-strip" id="rwStrip"></div>`;
  statsRow.insertAdjacentElement("afterend", sec);
  const strip = document.getElementById("rwStrip");
  items.forEach(item => {
    const url  = item.type === "movie" ? `player.html?id=${item.id}` : `players.html?id=${item.id}`;
    const card = document.createElement("div");
    card.className = "t-card";
    if (item.poster_path) {
      const img = document.createElement("img");
      img.src = IMG + item.poster_path; img.alt = item.title; img.loading = "lazy";
      card.appendChild(img);
    } else {
      const ph = document.createElement("div");
      ph.className = "t-ph"; ph.innerHTML = '<i class="fas fa-film"></i>';
      card.appendChild(ph);
    }
    const lbl = document.createElement("div");
    lbl.className = "t-lbl"; lbl.textContent = item.title;
    card.appendChild(lbl);
    card.addEventListener("click", () => location.href = url);
    strip.appendChild(card);
  });
})();

loadStrip("movie", "tMovies");
loadStrip("tv",    "tShows");

// ── GLOBAL SEARCH ──
const gInput = document.getElementById("gSearch");
const gDrop  = document.getElementById("gDrop");
let   gTimer;

gInput.addEventListener("input", () => {
  clearTimeout(gTimer);
  const q = gInput.value.trim();
  if (!q) { gDrop.classList.remove("open"); return; }
  gTimer = setTimeout(() => doSearch(q), 380);
});
document.addEventListener("click", e => {
  if (!e.target.closest(".hero-search")) gDrop.classList.remove("open");
});

async function doSearch(q) {
  gDrop.innerHTML = `<div class="srp-empty"><i class="fas fa-circle-notch fa-spin"></i></div>`;
  gDrop.classList.add("open");
  try {
    const today = new Date().toISOString().slice(0, 10);
    const [mr, tr] = await Promise.all([
      fetch(`${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(q)}&page=1`).then(r => r.json()),
      fetch(`${BASE}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(q)}&page=1`).then(r => r.json()),
    ]);
    const movies = (mr.results || []).filter(x => !BLOCKED_MOVIES.has(x.id) && x.release_date && x.release_date <= today).slice(0, 5);
    const shows  = (tr.results || []).filter(x => !BLOCKED_SHOWS.has(x.id)).slice(0, 4);
    const all    = [...movies.map(x => ({ ...x, type: "movie" })), ...shows.map(x => ({ ...x, type: "tv" }))];
    if (!all.length) { gDrop.innerHTML = `<div class="srp-empty">No results found</div>`; return; }
    gDrop.innerHTML = "";
    all.forEach(item => {
      const title = item.title || item.name;
      const year  = (item.release_date || item.first_air_date || "").slice(0, 4);
      const url   = item.type === "movie" ? `player.html?id=${item.id}` : `players.html?id=${item.id}`;
      const row   = document.createElement("div");
      row.className = "srp-item";
      if (item.poster_path) {
        const img = document.createElement("img");
        img.className = "srp-thumb"; img.src = IMG + item.poster_path;
        img.alt = title; img.loading = "lazy";
        row.appendChild(img);
      } else {
        const ph = document.createElement("div");
        ph.className = "srp-thumb-ph"; ph.innerHTML = '<i class="fas fa-film"></i>';
        row.appendChild(ph);
      }
      const info = document.createElement("div"); info.className = "srp-info";
      info.innerHTML = `<h4>${title}</h4><span>${year}</span>`;
      const badge = document.createElement("span"); badge.className = "srp-badge";
      badge.textContent = item.type === "movie" ? "Movie" : "Show";
      row.appendChild(info); row.appendChild(badge);
      row.addEventListener("click", () => location.href = url);
      gDrop.appendChild(row);
    });
  } catch {
    gDrop.innerHTML = `<div class="srp-empty">Search failed. Try again.</div>`;
  }
}

// ── FAQ ──
const FAQS = [
  { q: "Is Dashflix completely free?",          a: "Yes — 100% free. No account, no credit card, no subscription. Just browse and watch." },
  { q: "Do I need to create an account?",       a: "No registration needed. Find something you like and start watching immediately." },
  { q: "What video quality is available?",      a: "Dashflix streams in HD where available, depending on the server and your internet speed." },
  { q: "Why is a movie not playing?",           a: "Try switching to a different server using the server buttons on the player page." },
  { q: "Can I save movies to watch later?",     a: "Yes — right-click any poster to add it to your Watchlist. It's saved locally in your browser." },
  { q: "How do I watch TV show episodes?",      a: "Click any TV show poster, then select the season and episode on the player page." },
  { q: "Why are some movies unavailable?",      a: "Content may be region-restricted or temporarily down. Try switching servers or check back later." },
  { q: "Does Dashflix work on mobile?",         a: "Absolutely. Dashflix is fully optimised for mobile browsers — no app needed." },
];
const fWrap = document.getElementById("faqWrap");
FAQS.forEach(f => {
  const item = document.createElement("div");
  item.className = "faq-item";
  item.innerHTML = `<button class="faq-q">${f.q}<i class="fas fa-chevron-down"></i></button>
    <div class="faq-body"><div class="faq-body-inner">${f.a}</div></div>`;
  item.querySelector(".faq-q").addEventListener("click", () => {
    const open = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(i => i.classList.remove("open"));
    if (!open) item.classList.add("open");
  });
  fWrap.appendChild(item);
});
