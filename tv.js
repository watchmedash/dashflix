let e = 1; // Page number for loading more shows from TMDB
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

async function loadTmdbIds() {
    const response = await fetch('tmdb_ids.json');
    const data = await response.json();
    tmdbIds = data.ids; // Assign the TMDB IDs from JSON file
}

async function loadShows(ids) {
    const spinnet = document.getElementById("spinnet");
    spinnet.style.display = "block"; // Show the spinner

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

    loadedShowCount = ids.length; // Update the count to total shows loaded
    displayShows(t); // Display all loaded shows
    spinnet.style.display = "none"; // Hide the spinner after shows are loaded
}

async function searchTmdbShows(query) {
    const filteredShows = t.filter(show => show.title.toLowerCase().includes(query.toLowerCase()));
    displayShows(filteredShows); // Display the filtered shows
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

        const airedEpisodes = data.episodes.filter(episode => {
            const airDate = new Date(episode.air_date);
            return airDate <= new Date(); // Only include episodes that have aired
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
    channelList.innerHTML = ""; // Clear previous shows

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
    const url = getVideoUrl(show.id, currentSeason, currentEpisode); // Use currentSeason and currentEpisode
    const player = document.querySelector("#player");
    const channelPlaying = document.querySelector("#channel-playing");
    const showPlot = document.querySelector("#tv-show-plot");

    player.src = url; // Set the player source to the new URL
    channelPlaying.textContent = show.title; // Display the show title
    showPlot.textContent = show.plot; // Display the show plot
    player.scrollIntoView({ behavior: "smooth" }); // Scroll to player
    currentShowId = show.id; // Update current show ID
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

// Function to sort shows alphabetically
function sortShowsAlphabetically() {
    const sortedShows = [...t].sort((a, b) => a.title.localeCompare(b.title));
    displayShows(sortedShows);
}

// Function to sort shows by starting letter
function sortShowsByStartingLetter(letter) {
    const filteredShows = t.filter(show => show.title.startsWith(letter));
    displayShows(filteredShows);
}

// Event listener for season selection
document.getElementById("season-select").addEventListener("change", async (event) => {
    currentSeason = event.target.value;
    await fetchEpisodes(currentShowId, currentSeason); // Fetch episodes for the newly selected season

    // Automatically play the first episode of the new season (optional)
    const episodeSelect = document.getElementById("episode-select");
    if (episodeSelect.options.length > 0) {
        episodeSelect.value = episodeSelect.options[0].value; // Set to the first episode
        currentEpisode = episodeSelect.value; // Update the currentEpisode
        const show = t.find(m => m.id == currentShowId);
        if (show) {
            playShow(show); // Play the show with the updated season and episode
        }
    }
});

// Event listener for episode selection
document.getElementById("episode-select").addEventListener("change", (event) => {
    currentEpisode = event.target.value; // Update the currentEpisode
    if (currentShowId) {
        const show = t.find(m => m.id == currentShowId);
        if (show) {
            playShow(show); // Play the show with the updated currentSeason and currentEpisode
        }
    }
});

// Event listener for search input
const searchBox = document.querySelector("#search-box");
const clearSearchButton = document.querySelector("#clear-search");
const sortAlphabeticallyButton = document.querySelector("#sort-alphabetically");
const sortByLetterButton = document.querySelector("#sort-by-letter");

searchBox.addEventListener("input", async () => {
    const query = searchBox.value.toLowerCase();
    if (query.length >= 3) {
        await searchTmdbShows(query); // Fetch shows matching the query
    } else {
        displayShows(t); // Show all shows again if the query is too short
    }
    clearSearchButton.style.display = query ? "inline" : "none";
});

clearSearchButton.addEventListener("click", () => {
    searchBox.value = "";
    clearSearchButton.style.display = "none";
    displayShows(t);
});

// Sort shows when the button is clicked
sortAlphabeticallyButton.addEventListener("click", sortShowsAlphabetically);

// Sort shows by letter (you can change this to handle user input)
sortByLetterButton.addEventListener("change", (event) => {
    const selectedLetter = event.target.value.toUpperCase();
    sortShowsByStartingLetter(selectedLetter);
});

// Initialize show loading and setup event listeners
(async function() {
    try {
        await loadTmdbIds();
        await loadShows(tmdbIds); // Load all shows without limits
    } catch (error) {
        console.error("Error initializing show loader:", error);
    }
})();
