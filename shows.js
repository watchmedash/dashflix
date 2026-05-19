const grid     = document.getElementById("grid");
const loader   = document.getElementById("loader");
const empty    = document.getElementById("empty");
const sBar     = document.getElementById("sBar");
const fGenre   = document.getElementById("fGenre");
const fYear    = document.getElementById("fYear");
const fSort    = document.getElementById("fSort");
const sentinel = document.getElementById("sentinel");

let page = 1, busy = false, done = false, query = "";

async function initFilters() {
  try {
    const d = await cachedFetch(`${BASE}/genre/tv/list?api_key=${API_KEY}&language=en-US`);
    (d.genres || []).forEach(g => {
      const o = document.createElement("option");
      o.value = g.id; o.textContent = g.name; fGenre.appendChild(o);
    });
  } catch {}
  const sp = new URLSearchParams(location.search);
  const _q = sp.get("q"), _g = sp.get("genre"), _y = sp.get("year"), _s = sp.get("sort");
  if (_g) fGenre.value = _g;
  if (_y) fYear.value = _y;
  if (_s) fSort.value = _s;
  if (_q) { sBar.value = _q; query = _q; }
  fetchShows(false);
}
initFilters();

function yearParams(v) {
  if (!v) return {};
  if (/^\d{4}$/.test(v)) return { "first_air_date_year": v };
  if (v === "2010s") return { "first_air_date.gte": "2010-01-01", "first_air_date.lte": "2019-12-31" };
  if (v === "2000s") return { "first_air_date.gte": "2000-01-01", "first_air_date.lte": "2009-12-31" };
  if (v === "older") return { "first_air_date.lte": "1999-12-31" };
  return {};
}

function updateShowTitle() {
  const genreOpt = fGenre.options[fGenre.selectedIndex];
  const genre = fGenre.value && genreOpt ? genreOpt.textContent : "";
  if (query) document.title = `"${query}" Shows — Dashflix`;
  else if (genre) document.title = `Free ${genre} Shows Online | Dashflix`;
  else document.title = "Free TV Shows Online — Browse & Stream HD | Dashflix";
}

async function fetchShows(append = false) {
  if (busy || done) return;
  updateShowTitle();
  busy = true;
  loader.style.display = "flex";
  empty.style.display  = "none";
  if (!append) {
    grid.innerHTML = "";
    for (let i = 0; i < 20; i++) grid.appendChild(buildSkeleton());
  }

  try {
    let url;
    if (query) {
      url = `${BASE}/search/tv?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`;
    } else {
      const yp = yearParams(fYear.value);
      const p  = new URLSearchParams({
        api_key: API_KEY, language: "en-US", page,
        sort_by: fSort.value,
        ...(fGenre.value ? { with_genres: fGenre.value } : {}),
        ...yp
      });
      url = `${BASE}/discover/tv?${p}`;
    }

    const res     = await fetch(url);
    const data    = await res.json();
    const results = (data.results || []).filter(s => !BLOCKED_SHOWS.has(s.id));

    if (!append) grid.innerHTML = "";
    if (!results.length && !append) {
      empty.style.display = "flex";
    } else {
      results.forEach(s => grid.appendChild(buildCard({ ...s, type: "tv" })));
      if (!append) {
        const saved = +sessionStorage.getItem("scroll:" + location.pathname);
        if (saved) { sessionStorage.removeItem("scroll:" + location.pathname); requestAnimationFrame(() => window.scrollTo(0, saved)); }
      }
    }
    if (!data.total_pages || page >= data.total_pages) done = true;
  } catch (e) { console.error(e); }

  loader.style.display = "none";
  busy = false;
}

const scrollObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !busy && !done) { page++; fetchShows(true); }
}, { rootMargin: "300px" });
scrollObs.observe(sentinel);

function reset() {
  page = 1; done = false; query = sBar.value.trim();
  const sp = new URLSearchParams();
  if (query) sp.set("q", query);
  if (fGenre.value) sp.set("genre", fGenre.value);
  if (fYear.value) sp.set("year", fYear.value);
  if (fSort.value !== "popularity.desc") sp.set("sort", fSort.value);
  history.replaceState(null, "", sp.toString() ? "?" + sp : location.pathname);
  fetchShows(false);
}

sBar.addEventListener("input",    () => { clearTimeout(sBar._t); sBar._t = setTimeout(reset, 380); });
fGenre.addEventListener("change", reset);
fYear.addEventListener("change",  reset);
fSort.addEventListener("change",  reset);

const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.classList.toggle("vis", window.scrollY > 400);
}, { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
