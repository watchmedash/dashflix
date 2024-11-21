const showIds = [124364, 194764, 94605, 113962, 100757, 125988, 273081, 154084, 138501, 153312, 227496, 211684, 79744, 4057, 136315, 77169];
let allChannelData = [];
let currentShowId = null;
let currentSeason = 1;
let currentEpisode = 1;
const apiKey = '4f599baa15d072c9de346b2816a131b8';

const blockedShowIds = [81329, 94722, 112470, 231344, 256121, 257064, 4682, 248890, 18770, 249010, 237243, 261033, 237019, 243084, 237478, 252373,72879, 274260, 274136, 242722, 91759, 256429, 255150, 206559, 45789, 235484, 234811, 235493, 262364, 212907, 239526, 262831, 242101, 240440, 242931, 242099, 243117, 58141, 239389, 2912, 247885, 154828, 59941, 2051, 95897, 261791, 236994, 12409, 231962, 136166, 2224, 210078, 156899, 13945, 234226];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function loadChannelData() {
  try {
    await loadShowsByIds();
    shuffleArray(allChannelData);
    renderChannels(allChannelData);

    if (allChannelData.length > 0) {
      const firstShow = allChannelData[0];
      loadSeasonsAndEpisodes(firstShow.tmdb_id);
    }

    const loadMoreButton = document.querySelector("#load-more");
    if (loadMoreButton) {
      loadMoreButton.style.display = "none";
    }

    const searchBox = document.querySelector("#search-box");
    const clearSearchButton = document.querySelector("#clear-search");

    if (searchBox) {
      searchBox.addEventListener("input", (event) => {
        if (event.target.value.length > 0) {
          searchDatabase(event.target.value);
          clearSearchButton.style.display = "inline-block";
        } else {
          clearSearchButton.style.display = "none";
          renderChannels(allChannelData);
        }
      });
    }

    if (clearSearchButton) {
      clearSearchButton.addEventListener("click", () => {
        document.querySelector("#search-box").value = "";
        clearSearchButton.style.display = "none";
        renderChannels(allChannelData);
      });
    }

  } catch (error) {
    console.error('Error loading channel data:', error);
    alert('Unable to load data. Please try again later.');
  }
}

async function loadShowsByIds() {
  for (const showId of showIds) {
    const url = `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const channelData = {
        title: data.name,
        tmdb_id: data.id,
        image: `https://image.tmdb.org/t/p/original${data.poster_path}`,
        plot: data.overview,
        firstAirYear: data.first_air_date ? data.first_air_date.split('-')[0] : '',
      };

      if (!blockedShowIds.includes(channelData.tmdb_id)) {
        allChannelData.push(channelData);
      }

    } catch (error) {
      console.error(`Error loading data for show ID ${showId}:`, error);
    }
  }
}

function renderChannels(channelData) {
  const channelList = document.querySelector(".channel-list");
  channelList.innerHTML = "";

  channelData.forEach((channel) => {
    const markup = `
      <li class="channel">
      <div class="play-channel" data-id="${channel.tmdb_id}">
        <div class="thumbnail-wrapper">
          <img class="channel-poster" src="${channel.image}" loading="lazy">
          <div class="play-icon">▶</div>
        </div>
      </div>
      </li>
    `;
    channelList.insertAdjacentHTML("beforeend", markup);
  });

  const channelPlays = document.querySelectorAll(".play-channel");

  channelPlays.forEach((channelPlay) => {
    channelPlay.addEventListener("click", (e) => {
      e.stopPropagation();
      loadSeasonsAndEpisodes(channelPlay.dataset.id);
    });
  });
}

async function searchDatabase(query) {
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const searchResults = data.results.map(show => ({
      title: show.name,
      tmdb_id: show.id,
      image: `https://image.tmdb.org/t/p/original${show.poster_path}`,
      plot: show.overview,
      firstAirYear: show.first_air_date ? show.first_air_date.split('-')[0] : '',
    }));

    renderChannels(searchResults);
  } catch (error) {
    console.error('Error searching TMDB:', error);
  }
}

async function loadSeasonsAndEpisodes(showId) {
  currentShowId = showId;

  const url = `https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const seasons = data.seasons.filter(season => season.air_date);
    displaySeasons(seasons);
  } catch (error) {
    console.error('Error loading seasons:', error);
  }
}

function displaySeasons(seasons) {
  const seasonSelect = document.querySelector("#season-select");
  seasonSelect.innerHTML = "";

  seasons.forEach((season, index) => {
    const option = document.createElement("option");
    option.value = season.season_number;
    option.textContent = `Season ${index + 1}`;
    seasonSelect.appendChild(option);
  });

  seasonSelect.addEventListener("change", () => {
    currentSeason = seasonSelect.value;
    loadEpisodes(currentShowId, currentSeason);
  });

  currentSeason = seasons[0].season_number;
  loadEpisodes(currentShowId, currentSeason);
}

async function loadEpisodes(showId, seasonNumber) {
  const url = `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const episodes = data.episodes.filter(episode => new Date(episode.air_date) <= new Date());
    displayEpisodes(episodes);
  } catch (error) {
    console.error('Error loading episodes:', error);
  }
}

function displayEpisodes(episodes) {
  const episodeSelect = document.querySelector("#episode-select");
  episodeSelect.innerHTML = "";

  episodes.forEach(episode => {
    const option = document.createElement("option");
    option.value = episode.episode_number;
    option.textContent = `Episode ${episode.episode_number}: ${episode.name}`;
    episodeSelect.appendChild(option);
  });

  episodeSelect.addEventListener("change", () => {
    currentEpisode = episodeSelect.value;
    loadStream(currentShowId, currentSeason, currentEpisode);
  });

  currentEpisode = episodes[0].episode_number;
  loadStream(currentShowId, currentSeason, currentEpisode);
}

function loadStream(showId, season, episode) {
  const url = `https://vidsrc.xyz/embed/tv?tmdb=${showId}&season=${season}&episode=${episode}`;

  const video = document.querySelector("#player");
  video.src = url;

  video.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", loadChannelData);
