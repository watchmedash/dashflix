const API_KEY = "4f599baa15d072c9de346b2816a131b8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const urlParams = new URLSearchParams(window.location.search);
const tvShowId = urlParams.get("id");

async function fetchTvShowDetails() {
    try {
        const response = await fetch(`${BASE_URL}/tv/${tvShowId}?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();

        // Populate the page and meta tags after data is fetched
        displayTvShowDetails(data);
        populateSeasonDropdown(data.seasons);
    } catch (error) {
        console.error("Error fetching TV show details:", error);
    }
}

function displayTvShowDetails(tvShow) {
    document.getElementById("tv-title-info").textContent = tvShow.name;
    document.getElementById("tv-poster").src = IMAGE_BASE_URL + tvShow.poster_path;
    document.getElementById("tv-overview").textContent = tvShow.overview;
    document.getElementById("release-year").textContent = tvShow.first_air_date.split("-")[0];
    document.getElementById("rating").textContent = tvShow.vote_average;
    document.getElementById("genres").textContent = tvShow.genres.map(genre => genre.name).join(", ");
    document.getElementById("creator").textContent = tvShow.created_by.map(creator => creator.name).join(", ");

    // Full URL and image URL for meta tags
    const fullUrl = `https://dashflix.top/players.html?id=${tvShow.id}`;
    const imageUrl = IMAGE_BASE_URL + tvShow.poster_path;

    // Meta Tags for Social Sharing - Add them to the <head> after data is fetched
    const metaTags = [
        { property: "og:image", content: imageUrl },
        { property: "og:image:alt", content: `${tvShow.name} Poster` },
        { property: "og:url", content: fullUrl },
        { name: "twitter:image", content: imageUrl },
        { name: "twitter:image:alt", content: `${tvShow.name} Poster` },
        { property: "og:title", content: `${tvShow.name} - Watch Now on Dashflix` },
        { name: "twitter:title", content: `${tvShow.name} - Watch Now on Dashflix` },
        { property: "og:description", content: tvShow.overview },
        { name: "twitter:description", content: tvShow.overview }
    ];

    metaTags.forEach(tag => {
        const meta = document.createElement("meta");
        if (tag.property) meta.setAttribute("property", tag.property);
        if (tag.name) meta.setAttribute("name", tag.name);
        meta.setAttribute("content", tag.content);
        document.head.appendChild(meta);
    });

    // Canonical link
    const canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", fullUrl);
    document.head.appendChild(canonical);

    // Page Title
    document.title = `${tvShow.name} - Watch Now on Dashflix`;
}

function populateSeasonDropdown(seasons) {
    const seasonDropdown = document.getElementById("season-dropdown");
    const firstSeasonWithAirDate = seasons.find(season => season.air_date);

    seasons.filter(season => season.air_date).forEach(season => {
        const option = document.createElement("option");
        option.value = season.season_number;
        option.textContent = `Season ${season.season_number}`;
        seasonDropdown.appendChild(option);
    });

    if (firstSeasonWithAirDate) {
        seasonDropdown.value = firstSeasonWithAirDate.season_number;
        fetchEpisodes();
    }
}

async function fetchEpisodes() {
    const selectedSeason = document.getElementById("season-dropdown").value;

    if (selectedSeason) {
        const response = await fetch(`${BASE_URL}/tv/${tvShowId}/season/${selectedSeason}?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();

        populateEpisodeDropdown(data.episodes);
    }
}

function populateEpisodeDropdown(episodes) {
    const episodeDropdown = document.getElementById("episode-dropdown");
    episodeDropdown.style.display = "block";
    episodeDropdown.innerHTML = '<option value="">Select Episode</option>';

    const firstEpisodeWithAirDate = episodes.find(episode => episode.air_date);

    episodes.filter(episode => episode.air_date).forEach(episode => {
        const option = document.createElement("option");
        option.value = episode.episode_number;
        option.textContent = `Episode ${episode.episode_number}: ${episode.name}`;
        episodeDropdown.appendChild(option);
    });

    if (firstEpisodeWithAirDate) {
        episodeDropdown.value = firstEpisodeWithAirDate.episode_number;
        changeEpisode();
    }
}

let currentServerIndex = 0;

function changeEpisode() {
    const selectedSeason = document.getElementById("season-dropdown").value;
    const selectedEpisode = document.getElementById("episode-dropdown").value;

    if (selectedSeason && selectedEpisode) {
        updateVideoSources(selectedSeason, selectedEpisode);
        updateVideoPlayer();
    }
}

function changeServer() {
    const videoSourceSelect = document.getElementById("video-source");
    currentServerIndex = videoSourceSelect.selectedIndex;
    document.getElementById("video-player").src = videoSourceSelect.value;
}

function updateVideoSources(season, episode) {
    const videoSources = [
        `https://vidsrc.xyz/embed/tv?tmdb=${tvShowId}&season=${season}&episode=${episode}`,
        `https://embed.su/embed/tv/${tvShowId}/${season}/${episode}`,
        `https://moviesapi.to/tv/${tvShowId}-${season}-${episode}`,
        `https://vidsrc.vip/embed/tv/${tvShowId}/${season}/${episode}`,
        `https://multiembed.mov/directstream.php?video_id=${tvShowId}&tmdb=1&s=${season}&e=${episode}`,
        `https://vidlink.pro/tv/${tvShowId}/${season}/${episode}`
    ];

    const videoSourceSelect = document.getElementById("video-source");
    const previousServer = videoSourceSelect.value;

    videoSourceSelect.innerHTML = "";
    videoSources.forEach((url, index) => {
        const option = document.createElement("option");
        option.value = url;
        option.textContent = `Server ${index + 1}`;
        videoSourceSelect.appendChild(option);
    });

    const selectedOptionIndex = videoSources.indexOf(previousServer);
    if (selectedOptionIndex !== -1) {
        videoSourceSelect.selectedIndex = selectedOptionIndex;
    } else {
        videoSourceSelect.selectedIndex = currentServerIndex;
    }
}

function updateVideoPlayer() {
    const videoSourceSelect = document.getElementById("video-source");
    document.getElementById("video-player").src = videoSourceSelect.value;
}

function goBack() {
    window.location.href = "shows.html";
}

fetchTvShowDetails();
