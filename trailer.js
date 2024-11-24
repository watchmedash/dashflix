const apiKey = '4f599baa15d072c9de346b2816a131b8'; // Your TMDB API key
let allChannelData = [];
let currentBatch = 1;

// Function to load data from the TMDB API
async function loadChannelData() {
    try {
        await loadNextBatch();

        // Set up "Load More" button
        const loadMoreButton = document.querySelector("#load-more");
        if (loadMoreButton) {
            loadMoreButton.addEventListener("click", loadNextBatch);
        }

        // Set up search box
        const searchBox = document.querySelector("#search-box");
        const clearSearchButton = document.querySelector("#clear-search");

        if (searchBox) {
            searchBox.addEventListener("input", (event) => {
                filterChannels(event);
                // Show clear button if there is text
                clearSearchButton.style.display = event.target.value ? "inline-block" : "none";
            });
        }

        // Clear search button functionality
        clearSearchButton.addEventListener("click", () => {
            searchBox.value = "";  // Clear the input
            clearSearchButton.style.display = "none";  // Hide the clear button
            renderChannels(allChannelData);  // Show all channels again
            document.querySelector("#load-more").style.display = "block"; // Show "Load More" button
        });

    } catch (error) {
        console.error('Error loading channel data:', error);
    }
}

// Function to load the next batch of data
async function loadNextBatch() {
    const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentBatch}`;
    const tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${currentBatch}`;

    try {
        const [movieResponse, tvResponse] = await Promise.all([fetch(movieUrl), fetch(tvUrl)]);
        const [movieData, tvData] = await Promise.all([movieResponse.json(), tvResponse.json()]);

        const movieChannelData = await mapChannelData(movieData.results, "movie");
        const tvChannelData = await mapChannelData(tvData.results, "tv");

        allChannelData.push(...movieChannelData, ...tvChannelData);  // Combine movie and TV data
        renderChannels(allChannelData);  // Render all data

        currentBatch++;  // Increment batch
    } catch (error) {
        console.error('Error loading batch data:', error);
    }
}

async function mapChannelData(results, type) {
    return Promise.all(
        results
            .filter(item => item.poster_path) // Exclude items without posters
            .map(async (item) => {
                const trailerUrl = await getTrailerUrl(item.id, type);
                return {
                    title: type === "movie" ? item.title : item.name,
                    url: trailerUrl,
                    image: `https://image.tmdb.org/t/p/original${item.poster_path}`,
                    plot: item.overview,  // Overview/plot
                    releaseYear: type === "movie" ? item.release_date.split('-')[0] : item.first_air_date.split('-')[0],
                };
            })
    );
}


// Fetch the trailer URL for a specific movie or TV show
async function getTrailerUrl(id, type) {
    const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const trailer = data.results.find(video => video.type === 'Trailer');
        return trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';
    } catch (error) {
        console.error('Error fetching trailer URL:', error);
        return '';
    }
}

// Function to render channels on the page
function renderChannels(channelData) {
    const channelList = document.querySelector(".channel-list");
    channelList.innerHTML = "";  // Clear previous channels

    channelData.forEach((channel) => {
        const markup = `<li class="channel">
          <div class="handle">☰</div>
          <button class="play-channel" title="${channel.title}" data-url="${channel.url}">
            <div class="thumbnail-wrapper">
              <img class="channel-poster" src="${channel.image}" loading="lazy"> <!-- Lazy load attribute -->
              <div class="play-icon">▶</div> <!-- Play icon -->
            </div>
          </button>
          <div class="channel-info">
            <div class="channel-title" data-url="${channel.url}">${channel.title}</div>
            <div class="channel-plot">${channel.plot.substring(0, 100)}...</div> <!-- Snippet of the plot -->
            <div class="channel-release-year">${channel.releaseYear}</div>
          </div>
        </li>`;
        channelList.insertAdjacentHTML("beforeend", markup);
    });

    // Set up event listeners
    const channelPlays = document.querySelectorAll(".play-channel");
    const channelTitles = document.querySelectorAll(".channel-title");

    channelPlays.forEach((channelPlay) => {
        channelPlay.addEventListener("click", (e) => {
            e.stopPropagation();
            loadStream(channelPlay);
        });
    });

    channelTitles.forEach((channelTitle) => {
        channelTitle.addEventListener("click", () => {
            loadStream(channelTitle);
        });
    });

    // Load the first channel by default if it's the first batch
    if (channelPlays.length > 0 && currentBatch === 1) {
        loadStream(channelPlays[0]);
    }
}

// Function to load a stream into the player
function loadStream(channelPlay) {
    const url = channelPlay.dataset.url || channelPlay.getAttribute('data-url');
    const parent = channelPlay.closest("li");
    const title = parent.querySelector(".channel-title").textContent;
    const plot = parent.querySelector(".channel-plot").textContent;

    const video = document.querySelector("#player");
    const nowPlayingTitle = document.querySelector("#channel-playing");
    const moviePlot = document.querySelector("#movie-plot");

    video.src = url;  // Set iframe source to trailer link
    nowPlayingTitle.textContent = title;
    moviePlot.textContent = plot;  // Set the plot under the player

    video.scrollIntoView({ behavior: "smooth" });
}

// Function to filter channels during search
async function filterChannels(event) {
    const query = event.target.value;

    if (query.length < 3) {
        renderChannels(allChannelData);
        document.querySelector("#load-more").style.display = "block";
        return;
    }

    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    try {
        const [movieResponse, tvResponse] = await Promise.all([fetch(movieUrl), fetch(tvUrl)]);
        const [movieData, tvData] = await Promise.all([movieResponse.json(), tvResponse.json()]);

        const movieChannelData = await mapChannelData(movieData.results, "movie");
        const tvChannelData = await mapChannelData(tvData.results, "tv");

        const channelData = [...movieChannelData, ...tvChannelData];
        renderChannels(channelData);

        if (channelData.length > 0) {
            document.querySelector("#load-more").style.display = "none";
        } else {
            document.querySelector("#load-more").style.display = "block";
        }
    } catch (error) {
        console.error('Error searching for channels:', error);
    }
}

// Load channel data on page load
loadChannelData();
