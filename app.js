// ── THEME ──
const THEMES = [
  { name: "light",      icon: "fa-sun",          label: "Light"     },
  { name: "dark",       icon: "fa-moon",         label: "Dark"      },
  { name: "matrix",     icon: "fa-terminal",     label: "Matrix"    },
  { name: "neon",       icon: "fa-bolt",         label: "Neon"      },
  { name: "futuristic", icon: "fa-rocket",       label: "Cyber"     },
  { name: "sunset",     icon: "fa-fire",         label: "Sunset"    },
  { name: "ocean",      icon: "fa-water",        label: "Ocean"     },
  { name: "gold",       icon: "fa-crown",        label: "Gold"      },
  { name: "cyberpunk",  icon: "fa-microchip",    label: "Cyberpunk" },
  { name: "synthwave",  icon: "fa-music",        label: "Synthwave" },
  { name: "vhs",        icon: "fa-video",        label: "VHS"       },
  { name: "blood",      icon: "fa-skull",        label: "Blood"     },
  { name: "rose",       icon: "fa-heart",        label: "Rose"      },
  { name: "mint",       icon: "fa-leaf",         label: "Mint"      },
  { name: "vaporwave",  icon: "fa-star",         label: "Vapor"     },
  { name: "forest",     icon: "fa-tree",         label: "Forest"    },
  { name: "terminal",   icon: "fa-greater-than", label: "Terminal"  },
  { name: "midnight",   icon: "fa-moon",         label: "Midnight"  },
];
(function() {
  const saved = localStorage.getItem("df_theme") || "light";
  if (saved !== "dark") document.documentElement.setAttribute("data-theme", saved);
})();
function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  const idx = THEMES.findIndex(t => t.name === cur);
  const next = THEMES[(idx + 1) % THEMES.length];
  if (next.name === "dark") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", next.name);
  }
  localStorage.setItem("df_theme", next.name);
  _syncThemeIcons();
}
function _syncThemeIcons() {
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  const idx = THEMES.findIndex(x => x.name === cur);
  const next = THEMES[(idx + 1) % THEMES.length];
  document.querySelectorAll(".theme-icon").forEach(el => {
    el.className = `fas ${next.icon} theme-icon`;
  });
  document.querySelectorAll(".theme-label").forEach(el => {
    el.textContent = next.label;
  });
}
document.addEventListener("DOMContentLoaded", _syncThemeIcons);

// ── CONFIG ──
const API_KEY = "4f599baa15d072c9de346b2816a131b8";
const BASE    = "https://api.themoviedb.org/3";
const IMG     = "https://image.tmdb.org/t/p/w500";
const IMG_SM  = "https://image.tmdb.org/t/p/w185";
const BLOCKED_MOVIES = new Set([1163258, 969492, 634649, 957452, 299534]);
const BLOCKED_SHOWS  = new Set([81329, 94722, 112470, 259288]);

// ── CACHED FETCH (localStorage, 12h TTL) ──
function cachedFetch(url, ttl = 43200000) {
  const k = "cf:" + url;
  try {
    const raw = localStorage.getItem(k);
    if (raw) {
      const { data, exp } = JSON.parse(raw);
      if (Date.now() < exp) return Promise.resolve(data);
      localStorage.removeItem(k);
    }
  } catch {}
  return fetch(url).then(r => r.json()).then(data => {
    try { localStorage.setItem(k, JSON.stringify({ data, exp: Date.now() + ttl })); } catch {}
    return data;
  });
}

// ── SERVICE WORKER ──
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

// ── RECENTLY WATCHED ──
const RW = {
  KEY: "df_rw", MAX: 10,
  get() { try { return JSON.parse(localStorage.getItem(this.KEY) || "[]"); } catch { return []; } },
  add(item) {
    const entry = {
      id: item.id, type: item.type,
      title: item.title || item.name || "Unknown",
      poster_path: item.poster_path || null,
      vote_average: item.vote_average || 0
    };
    let l = this.get().filter(i => !(i.id === entry.id && i.type === entry.type));
    l.unshift(entry);
    if (l.length > this.MAX) l.length = this.MAX;
    localStorage.setItem(this.KEY, JSON.stringify(l));
  }
};

// ── WATCHLIST ──
const WL = {
  get()          { try { return JSON.parse(localStorage.getItem("df_wl") || "[]"); } catch { return []; } },
  save(l)        { localStorage.setItem("df_wl", JSON.stringify(l)); },
  has(id, type)  { return !!this.get().find(i => i.id === id && i.type === type); },
  add(item) {
    const l = this.get();
    if (!this.has(item.id, item.type)) { l.unshift(item); this.save(l); }
    showToast('<i class="fas fa-bookmark"></i> Added to Watchlist');
  },
  remove(id, type) {
    this.save(this.get().filter(i => !(i.id === id && i.type === type)));
    showToast('<i class="fas fa-trash-alt"></i> Removed from Watchlist');
  }
};

// ── TOAST ──
function showToast(html) {
  let t = document.getElementById("_toast");
  if (!t) {
    t = Object.assign(document.createElement("div"), { id: "_toast", className: "toast" });
    document.body.appendChild(t);
  }
  t.innerHTML = html; t.classList.add("show");
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove("show"), 2200);
}

// ── CONTEXT MENU ──
let _ctx = null;
function closeCtx() { if (_ctx) { _ctx.remove(); _ctx = null; } }

function showCtx(e, item) {
  e.preventDefault(); e.stopPropagation(); closeCtx();
  const inWL = WL.has(item.id, item.type);
  const menu = document.createElement("div");
  menu.className = "ctx-menu";
  menu.innerHTML = `
    <button data-a="play"><i class="fas fa-play"></i> Watch Now</button>
    <div class="ctx-div"></div>
    <button data-a="wl" class="${inWL ? "danger" : ""}">
      <i class="fas fa-${inWL ? "trash-alt" : "bookmark"}"></i>
      ${inWL ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>`;
  document.body.appendChild(menu);
  _ctx = menu;
  let x = e.clientX, y = e.clientY;
  const r = menu.getBoundingClientRect();
  if (x + r.width  > window.innerWidth)  x = window.innerWidth  - r.width  - 8;
  if (y + r.height > window.innerHeight) y = window.innerHeight - r.height - 8;
  menu.style.cssText += `left:${x}px;top:${y}px;`;
  menu.addEventListener("click", ev => {
    const btn = ev.target.closest("[data-a]");
    if (!btn) return;
    if (btn.dataset.a === "play") {
      window.location.href = item.type === "movie"
        ? `player.html?id=${item.id}` : `players.html?id=${item.id}`;
    } else {
      WL.has(item.id, item.type) ? WL.remove(item.id, item.type) : WL.add(item);
      closeCtx();
      if (typeof renderWatchlist === "function") renderWatchlist();
    }
    closeCtx();
  });
  setTimeout(() => document.addEventListener("click", closeCtx, { once: true }), 0);
}

// ── RATING CLASS ──
function rClass(r) {
  if (r >= 8) return "r-good"; if (r >= 6) return "r-mid";
  if (r >= 4) return "r-low";  return "r-bad";
}

// ── LAZY IMAGE OBSERVER ──
const imgObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const wrap = entry.target;
    const src  = wrap.dataset.src;
    if (!src) { wrap.classList.add("loaded"); return; }
    const img = wrap.querySelector(".card-poster");
    if (!img) return;
    img.src = src;
    img.onload  = () => { img.classList.add("vis"); wrap.classList.add("loaded"); };
    img.onerror = () => {
      img.remove();
      const ph = document.createElement("div");
      ph.className = "card-placeholder";
      ph.innerHTML = `<i class="fas fa-film"></i>`;
      wrap.appendChild(ph);
      wrap.classList.add("loaded");
    };
    imgObs.unobserve(wrap);
  });
}, { rootMargin: "200px" });

// ── SKELETON CARD ──
function buildSkeleton() {
  const card = document.createElement("div");
  card.className = "card";
  const wrap = document.createElement("div");
  wrap.className = "card-poster-wrap";
  card.appendChild(wrap);
  const info = document.createElement("div");
  info.className = "card-info";
  info.innerHTML = '<div class="skel-line wide"></div><div class="skel-line narrow"></div>';
  card.appendChild(info);
  return card;
}

// ── BUILD CARD ──
function buildCard(item) {
  const isMovie = item.type === "movie";
  const title   = item.title || item.name || "Unknown";
  const year    = (item.release_date || item.first_air_date || "").slice(0, 4);
  const rating  = (item.vote_average || 0).toFixed(1);
  const url     = isMovie ? `player.html?id=${item.id}` : `players.html?id=${item.id}`;

  const card = document.createElement("div");
  card.className = "card";

  const wrap = document.createElement("div");
  wrap.className = "card-poster-wrap";
  if (item.poster_path) {
    wrap.dataset.src = IMG_SM + item.poster_path;
    const img = document.createElement("img");
    img.className = "card-poster"; img.alt = title;
    wrap.appendChild(img);
    imgObs.observe(wrap);
  } else {
    wrap.classList.add("loaded");
    const ph = document.createElement("div");
    ph.className = "card-placeholder";
    ph.innerHTML = `<i class="fas fa-film"></i>`;
    wrap.appendChild(ph);
  }

  const ov = document.createElement("div");
  ov.className = "card-overlay";
  ov.innerHTML = `<i class="fas fa-play-circle"></i>`;
  wrap.appendChild(ov);

  const wlBtn = document.createElement("button");
  wlBtn.className = `card-wl-btn${WL.has(item.id, item.type) ? " active" : ""}`;
  wlBtn.title = "Add to Watchlist";
  wlBtn.innerHTML = `<i class="fas fa-bookmark"></i>`;
  wlBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (WL.has(item.id, item.type)) {
      WL.remove(item.id, item.type);
      wlBtn.classList.remove("active");
    } else {
      WL.add({ ...item });
      wlBtn.classList.add("active");
    }
    if (typeof renderWatchlist === "function") renderWatchlist();
  });
  wrap.appendChild(wlBtn);

  const info = document.createElement("div");
  info.className = "card-info";
  info.innerHTML = `
    <div class="card-title" title="${title}">${title}</div>
    <div class="card-meta">
      <span class="card-year">${year}</span>
      <span class="r-badge ${rClass(item.vote_average)}">
        <i class="fas fa-star"></i>${rating}
      </span>
    </div>`;

  card.appendChild(wrap);
  card.appendChild(info);
  card.addEventListener("click", () => {
    try { sessionStorage.setItem("scroll:" + location.pathname, window.scrollY); } catch {}
    location.href = url;
  });
  card.addEventListener("contextmenu", e => showCtx(e, { ...item }));
  card.addEventListener("pointerenter", () => {
    const href = isMovie ? "player.html" : "players.html";
    if (!document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
      const l = document.createElement("link"); l.rel = "prefetch"; l.href = href;
      document.head.appendChild(l);
    }
  }, { once: true });
  return card;
}

// ── ACTIVE NAV ──
document.addEventListener("DOMContentLoaded", () => {
  const p = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-item[href], .sidebar-item[href]").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === p);
  });
});
