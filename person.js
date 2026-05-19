const params   = new URLSearchParams(location.search);
const personId = params.get("id");

if (!personId) location.replace("index.html");

async function load() {
  try {
    const [person, credits] = await Promise.all([
      cachedFetch(`${BASE}/person/${personId}?api_key=${API_KEY}&language=en-US`),
      cachedFetch(`${BASE}/person/${personId}/combined_credits?api_key=${API_KEY}&language=en-US`),
    ]);

    document.title = `${person.name} – Dashflix`;

    const header = document.getElementById("personHeader");
    const born   = person.birthday ? new Date(person.birthday).getFullYear() : null;
    const dead   = person.deathday ? new Date(person.deathday).getFullYear() : null;
    const years  = born ? (dead ? `${born}–${dead}` : `b. ${born}`) : "";

    header.innerHTML = person.profile_path
      ? `<img class="person-photo" src="https://image.tmdb.org/t/p/w185${person.profile_path}" alt="${person.name}" loading="lazy">`
      : `<div class="person-photo-ph"><i class="fas fa-user"></i></div>`;
    header.innerHTML += `
      <div class="person-meta">
        <div class="person-name">${person.name}</div>
        ${person.known_for_department ? `<div class="person-known">${person.known_for_department}${years ? " · " + years : ""}</div>` : ""}
        <div class="chips">
          ${person.place_of_birth ? `<span class="chip"><i class="fas fa-map-marker-alt"></i>${person.place_of_birth}</span>` : ""}
          ${person.popularity ? `<span class="chip"><i class="fas fa-fire"></i>${person.popularity.toFixed(0)}</span>` : ""}
        </div>
      </div>`;

    const bioEl     = document.getElementById("personBio");
    const bioToggle = document.getElementById("bioToggle");
    if (person.biography) {
      bioEl.textContent = person.biography;
      bioToggle.style.display = "block";
      const clamped = bioEl.scrollHeight > bioEl.clientHeight + 2;
      if (!clamped) bioToggle.style.display = "none";
    }

    const movies = (credits.cast || [])
      .filter(c => c.media_type === "movie" && !BLOCKED_MOVIES.has(c.id) && c.poster_path)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .reduce((acc, c) => { if (!acc.some(x => x.id === c.id)) acc.push(c); return acc; }, [])
      .slice(0, 24);

    const shows = (credits.cast || [])
      .filter(c => c.media_type === "tv" && !BLOCKED_SHOWS.has(c.id) && c.poster_path)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .reduce((acc, c) => { if (!acc.some(x => x.id === c.id)) acc.push(c); return acc; }, [])
      .slice(0, 24);

    const moviesGrid  = document.getElementById("moviesGrid");
    const showsGrid   = document.getElementById("showsGrid");
    const moviesHdr   = document.getElementById("moviesHeader");
    const showsHdr    = document.getElementById("showsHeader");

    if (movies.length) {
      moviesHdr.style.display = "";
      movies.forEach(m => moviesGrid.appendChild(buildCard({ ...m, type: "movie" })));
    }
    if (shows.length) {
      showsHdr.style.display = "";
      shows.forEach(s => showsGrid.appendChild(buildCard({ ...s, type: "tv", title: s.name })));
    }
  } catch (e) { console.error(e); }
}

function toggleBio() {
  const bio = document.getElementById("personBio");
  const btn = document.getElementById("bioToggle");
  const expanded = bio.classList.toggle("expanded");
  btn.textContent = expanded ? "Show less" : "Show more";
}

load();
