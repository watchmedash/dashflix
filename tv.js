let e = 1; // Page number for loading more shows
let t = []; // Array to hold TV show data
const n = "4f599baa15d072c9de346b2816a131b8"; // TMDB API key
let currentSource = "vidsrc"; // Default video source set to vidsrc
let currentShowId = null; // Track currently playing TV show ID
let currentSeason = 1; // Track currently selected season
let currentEpisode = 1; // Track currently selected episode
let totalSeasons = 0; // Total seasons for the current show
let episodeCount = 0;

// Array to hold TMDB IDs
let tmdbIds = [];

// Variable to store loaded shows and their titles for search
let loadedShows = []; // This will help in managing the search results

let loadedShowCount = 0; // Track the number of currently loaded shows
const SHOWS_PER_LOAD = 32; // Number of shows to load each time

async function loadTmdbIds() {
    const response = await fetch('tmdb_ids.json');
    const data = await response.json();
    tmdbIds = data.ids; // Assign the TMDB IDs from JSON file
}

async function loadShows() {
    const showsToLoad = Math.min(SHOWS_PER_LOAD, tmdbIds.length - loadedShowCount);
    console.log(`Loading ${showsToLoad} shows...`);
    if (showsToLoad <= 0) return; // No more shows to load

    for (let i = loadedShowCount; i < loadedShowCount + showsToLoad; i++) {
        const id = tmdbIds[i];
        const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${n}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
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
                t.push(show); // Add the show to the array
                loadedShows.push(show.title.toLowerCase()); // Store titles for search
                console.log(`Loaded show: ${show.title}`); // Log loaded show
            }
        } catch (error) {
            console.error(`Error loading show with ID ${id}:`, error.message);
        }
    }

    loadedShowCount += showsToLoad; // Update the count of loaded shows
    displayShows(t.slice(loadedShowCount - showsToLoad, loadedShowCount)); // Display newly loaded shows
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
        seasonSelect.innerHTML = ""; // Clear existing options
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
        episodeSelect.innerHTML = ""; // Clear existing options

        // Filter episodes to show only those that have aired
        const airedEpisodes = data.episodes.filter(episode => {
            const airDate = new Date(episode.air_date);
            return airDate <= new Date(); // Only include episodes that have aired
        });

        // Populate the dropdown with aired episodes
        airedEpisodes.forEach(episode => {
            const episodeNumber = episode.episode_number;
            const option = document.createElement("option");
            option.value = episodeNumber;
            option.textContent = `Episode ${episodeNumber}`;
            episodeSelect.appendChild(option);
        });

        episodeSelect.disabled = airedEpisodes.length === 0; // Disable if no aired episodes
        episodeSelect.value = airedEpisodes.length > 0 ? airedEpisodes[0].episode_number : ""; // Set to first aired episode if available
    } catch (error) {
        console.error("Error fetching episodes:", error);
    }
}

function displayShows(shows) {
    console.log(`Displaying ${shows.length} shows...`); // Add this line
    const channelList = document.querySelector(".channel-list");
    if (loadedShowCount === 0) {
        channelList.innerHTML = ""; // Clear existing shows on initial load
    }

    shows.forEach(e => {
        const showHTML = `<li class="channel">
            <div class="handle">☰</div>
            <button class="play-channel" title="${e.title}" data-id="${e.id}">
                <div class="thumbnail-wrapper">
                    <img class="channel-poster" src="${e.image}" loading="lazy">
                    <div class="play-icon">▶</div>
                </div>
            </button>
            <div class="channel-info">
                <div class="channel-title" data-id="${e.id}">${e.title}</div>
                <div class="channel-plot">${e.plot.substring(0, 100)}...</div>
                <div class="channel-release-year">${e.releaseYear}</div>
            </div>
        </li>`;
        channelList.insertAdjacentHTML("beforeend", showHTML); // Append new shows
    });

    addPlayButtonListeners(); // Add listeners to play buttons
}

function playShow(show) {
    const url = getVideoUrl(show.id, currentSeason, currentEpisode);
    const player = document.querySelector("#player");
    const channelPlaying = document.querySelector("#channel-playing");
    const showPlot = document.querySelector("#tv-show-plot");

    player.src = url; // Set the player URL
    channelPlaying.textContent = show.title; // Update the title
    showPlot.textContent = show.plot; // Update the plot
    player.scrollIntoView({ behavior: "smooth" });
    currentShowId = show.id;

    fetchSeasonAndEpisodeCount(show.id); // Fetch season and episode count for the selected show
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

// Event listener for season selection
document.getElementById("season-select").addEventListener("change", async (event) => {
    currentSeason = event.target.value;
    await fetchEpisodes(currentShowId, currentSeason);
});

// Event listener for episode selection
document.getElementById("episode-select").addEventListener("change", (event) => {
    currentEpisode = event.target.value;
    if (currentShowId) {
        const show = t.find(m => m.id == currentShowId);
        if (show) {
            playShow(show);
        }
    }
});

// Initialize show loading and setup event listeners
(async function() {
    try {
        await loadTmdbIds(); // Load TMDB IDs from JSON file
        await loadShows(); // Load initial shows

        const loadMoreButton = document.querySelector("#load-more");
        loadMoreButton && loadMoreButton.addEventListener("click", async (event) => {
            event.preventDefault(); // Prevent default behavior
            await loadShows(); // Load more shows on button click
        });

        const searchBox = document.querySelector("#search-box");
        const clearSearchButton = document.querySelector("#clear-search");

        // Event listener for video source selection
        document.getElementById("video-source").addEventListener("change", (event) => {
            currentSource = event.target.value; // Update current video source
        });

        // Search functionality
        searchBox.addEventListener("input", () => {
            const query = searchBox.value.trim();
            clearSearchButton.style.display = query ? "block" : "none"; // Show clear button if there is input
            const filteredShows = t.filter(show => show.title.toLowerCase().includes(query.toLowerCase())); // Search through loaded shows
            displayShows(filteredShows); // Update display with filtered shows
        });

        // Clear search functionality
        clearSearchButton && clearSearchButton.addEventListener("click", () => {
            searchBox.value = ""; // Clear the input field
            clearSearchButton.style.display = "none"; // Hide clear button
            displayShows(t); // Show all shows
        });
    } catch (error) {
        console.error("Error initializing application:", error);
    }
})();
