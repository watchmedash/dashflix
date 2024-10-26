let e = 1;
let t = [];
const n = "4f599baa15d072c9de346b2816a131b8";
let currentSource = "vidsrc";
let currentShowId = null;
let currentSeason = 1;
let currentEpisode = 1;
let totalSeasons = 0;
let episodeCount = 0;
let tmdbIds = [];
let loadedShows = [];
let loadedShowCount = 0;

async function loadTmdbIds() {
    const response = await fetch('tmdb_ids.json');
    const data = await response.json();
    tmdbIds = data.ids;
}

async function loadShows(ids) {
    const spinnet = document.getElementById("spinnet");
    spinnet.style.display = "block";
    for (let i = loadedShowCount; i < ids.length; i++) {
        const id = ids[i];
        const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${n}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const e = await response.json();
            if (e) {
                const show = {
                    title: e.name,
                    url: getVideoUrl(e.id, currentSeason, currentEpisode),
                    image: `https://image.tmdb.org/t/p/original${e.poster_path}`,
                    plot: e.overview,
                    releaseYear: e.first_air_date.split("-")[0],
                    id: e.id
                };
                t.push(show);
                loadedShows.push(show.title.toLowerCase());
            }
        } catch (error) {
            console.error(`Error loading show with ID ${id}:`, error.message);
        }
    }
    loadedShowCount = ids.length;
    displayShows(t);
    spinnet.style.display = "none";
}

async function searchTmdbShows(query) {
    const filteredShows = t.filter(show => show.title.toLowerCase().includes(query.toLowerCase()));
    displayShows(filteredShows);
}

function getVideoUrl(showId, season, episode) {
    return `https://vidsrc.xyz/embed/tv/${showId}/${season}/${episode}`;
}

async function fetchSeasonAndEpisodeCount(showId) {
    const url = `https://api.themoviedb.org/3/tv/${showId}?api_key=${n}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        totalSeasons = data.seasons.length;
        const seasonSelect = document.getElementById("season-select");
        seasonSelect.innerHTML = "";
        for (let i = 0; i < totalSeasons; i++) {
            const seasonNumber = data.seasons[i].season_number;
            const option = document.createElement("option");
            option.value = seasonNumber;
            option.textContent = `Season ${seasonNumber}`;
            seasonSelect.appendChild(option);
        }
        seasonSelect.disabled = false;
        seasonSelect.value = currentSeason;
        await fetchEpisodes(showId, currentSeason);
    } catch (error) {
        console.error("Error fetching season and episode count:", error);
    }
}

async function fetchEpisodes(showId, season) {
    const url = `https://api.themoviedb.org/3/tv/${showId}/season/${season}?api_key=${n}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        episodeCount = data.episodes.length;
        const episodeSelect = document.getElementById("episode-select");
        episodeSelect.innerHTML = "";
        const airedEpisodes = data.episodes.filter(episode => {
            const airDate = new Date(episode.air_date);
            return airDate <= new Date();
        });
        airedEpisodes.forEach(episode => {
            const episodeNumber = episode.episode_number;
            const option = document.createElement("option");
            option.value = episodeNumber;
            option.textContent = `Episode ${episodeNumber}`;
            episodeSelect.appendChild(option);
        });
        episodeSelect.disabled = airedEpisodes.length === 0;
        episodeSelect.value = airedEpisodes.length > 0 ? airedEpisodes[0].episode_number : "";
    } catch (error) {
        console.error("Error fetching episodes:", error);
    }
}

function displayShows(shows) {
    console.log(`Displaying ${shows.length} shows...`);
    const channelList = document.querySelector(".channel-list");
    channelList.innerHTML = "";
    shows.forEach(e => {
        const showHTML = `<li class="channel">
            <div class="handle">☰</div>
            <div class="play-channel" title="${e.title}" data-id="${e.id}">
                <div class="channel-title" data-id="${e.id}">${e.title}</div>
            </div>
        </li>`;
        channelList.insertAdjacentHTML("beforeend", showHTML);
    });
    addPlayButtonListeners();
}

function playShow(show) {
    const url = getVideoUrl(show.id, currentSeason, currentEpisode);
    const player = document.querySelector("#player");
    const channelPlaying = document.querySelector("#channel-playing");
    const showPlot = document.querySelector("#tv-show-plot");
    player.src = url;
    channelPlaying.textContent = show.title;
    showPlot.textContent = show.plot;
    player.scrollIntoView({ behavior: "smooth" });
    currentShowId = show.id;
}

function addPlayButtonListeners() {
    const playButtons = document.querySelectorAll(".play-channel");
    playButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            event.stopPropagation();
            const showId = button.getAttribute("data-id");
            const show = t.find(m => m.id == showId);
            if (show) {
                await fetchSeasonAndEpisodeCount(show.id);
                playShow(show);
            }
        });
    });
}

function sortShowsAlphabetically() {
    const sortedShows = [...t].sort((a, b) => a.title.localeCompare(b.title));
    displayShows(sortedShows);
}

function sortShowsByStartingLetter(letter) {
    if (letter) {
        const filteredShows = t.filter(show => show.title.toUpperCase().startsWith(letter));
        const sortedShows = filteredShows.sort((a, b) => a.title.localeCompare(b.title));
        displayShows(sortedShows);
    } else {
        displayShows(t);
    }
}

document.getElementById("season-select").addEventListener("change", async (event) => {
    currentSeason = event.target.value;
    await fetchEpisodes(currentShowId, currentSeason);
    const episodeSelect = document.getElementById("episode-select");
    if (episodeSelect.options.length > 0) {
        episodeSelect.value = episodeSelect.options[0].value;
        currentEpisode = episodeSelect.value;
        const show = t.find(m => m.id == currentShowId);
        if (show) {
            playShow(show);
        }
    }
});

document.getElementById("episode-select").addEventListener("change", (event) => {
    currentEpisode = event.target.value;
    if (currentShowId) {
        const show = t.find(m => m.id == currentShowId);
        if (show) {
            playShow(show);
        }
    }
});

const searchBox = document.querySelector("#search-box");
const clearSearchButton = document.querySelector("#clear-search");
const sortAlphabeticallyButton = document.querySelector("#sort-alphabetically");
const sortByLetterButton = document.querySelector("#sort-by-letter");

searchBox.addEventListener("input", async () => {
    const query = searchBox.value.toLowerCase();
    if (query.length >= 3) {
        await searchTmdbShows(query);
    } else {
        displayShows(t);
    }
    clearSearchButton.style.display = query ? "inline" : "none";
});

clearSearchButton.addEventListener("click", () => {
    searchBox.value = "";
    clearSearchButton.style.display = "none";
    displayShows(t);
});

sortAlphabeticallyButton.addEventListener("click", sortShowsAlphabetically);

sortByLetterButton.addEventListener("change", (event) => {
    const selectedLetter = event.target.value.toUpperCase();
    sortShowsByStartingLetter(selectedLetter);
});

(async function() {
    try {
        await loadTmdbIds();
        await loadShows(tmdbIds);
    } catch (error) {
        console.error("Error initializing show loader:", error);
    }
})();
