const grid     = document.getElementById("grid");
const loader   = document.getElementById("loader");
const empty    = document.getElementById("empty");
const sBar     = document.getElementById("sBar");
const fGenre   = document.getElementById("fGenre");
const fYear    = document.getElementById("fYear");
const fSort    = document.getElementById("fSort");
const sentinel = document.getElementById("sentinel");

const TODAY = new Date().toISOString().slice(0, 10);
let page = 1, busy = false, done = false, query = "";

async function initFilters() {
  try {
    const r = await fetch(`${BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const d = await r.json();
    (d.genres || []).forEach(g => {
      const o = document.createElement("option");
      o.value = g.id; o.textContent = g.name; fGenre.appendChild(o);
    });
  } catch {}
  const sp = new URLSearchParams(location.search);
  const _q = sp.get("q"), _g = sp.get("genre"), _s = sp.get("sort");
  if (_g) fGenre.value = _g;
  if (_s) fSort.value = _s;
  if (_q) { sBar.value = _q; query = _q; }
  fetchMovies(false);
}
initFilters();

function yearParams(v) {
  if (!v) return {};
  if (/^\d{4}$/.test(v)) return { "primary_release_year": v };
  if (v === "2010s") return { "primary_release_date.gte": "2010-01-01", "primary_release_date.lte": "2019-12-31" };
  if (v === "2000s") return { "primary_release_date.gte": "2000-01-01", "primary_release_date.lte": "2009-12-31" };
  if (v === "older") return { "primary_release_date.lte": "1999-12-31" };
  return {};
}

function updateMovieTitle() {
  const genreOpt = fGenre.options[fGenre.selectedIndex];
  const genre = fGenre.value && genreOpt ? genreOpt.textContent : "";
  if (query) document.title = `"${query}" Movies — Dashflix`;
  else if (genre) document.title = `Free ${genre} Movies Online | Dashflix`;
  else document.title = "Free Movies Online — Browse & Stream HD | Dashflix";
}

async function fetchMovies(append = false) {
  if (busy || done) return;
  updateMovieTitle();
  busy = true;
  loader.style.display = "flex";
  empty.style.display  = "none";
  if (!append) grid.innerHTML = "";

  try {
    let url;
    if (query) {
      url = `${BASE}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`;
    } else {
      const yp = yearParams(fYear.value);
      const p  = new URLSearchParams({
        api_key: API_KEY, language: "en-US", page,
        "release_date.lte": TODAY,
        sort_by: fSort.value,
        include_adult: "false",
        ...(fGenre.value ? { with_genres: fGenre.value } : {}),
        ...yp
      });
      url = `${BASE}/discover/movie?${p}`;
    }

    const res     = await fetch(url);
    const data    = await res.json();
    const results = (data.results || []).filter(m =>
      !BLOCKED_MOVIES.has(m.id) && m.release_date && m.release_date <= TODAY
    );

    if (!results.length && !append) {
      empty.style.display = "flex";
    } else {
      results.forEach(m => grid.appendChild(buildCard({ ...m, type: "movie" })));
    }
    if (!data.total_pages || page >= data.total_pages) done = true;
  } catch (e) { console.error(e); }

  loader.style.display = "none";
  busy = false;
}

const scrollObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !busy && !done) { page++; fetchMovies(true); }
}, { rootMargin: "300px" });
scrollObs.observe(sentinel);

function reset() { page = 1; done = false; query = sBar.value.trim(); fetchMovies(false); }

sBar.addEventListener("input",    () => { clearTimeout(sBar._t); sBar._t = setTimeout(reset, 380); });
fGenre.addEventListener("change", reset);
fYear.addEventListener("change",  reset);
fSort.addEventListener("change",  reset);

const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.classList.toggle("vis", window.scrollY > 400);
}, { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
