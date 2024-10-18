const apiKey = '4f599baa15d072c9de346b2816a131b8';  // Your TMDB API key
let allChannelData = [];  // Store all loaded channels
let currentBatch = 1;  // Initialize currentBatch

// Function to load data from the TMDB API
async function loadChannelData() {
    try {
        await loadNextBatch();  // Load the first batch when the page loads

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

// Load the next batch of movies from TMDB API
async function loadNextBatch() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentBatch}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const channelData = await Promise.all(data.results.map(async (movie) => {
            const trailerUrl = await getTrailerUrl(movie.id);
            return {
                title: movie.title,
                url: trailerUrl,
                image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                plot: movie.overview,  // Movie plot
                releaseYear: movie.release_date.split('-')[0],  // Extract release year
            };
        }));

        allChannelData.push(...channelData);  // Add to the master list
        renderChannels(allChannelData);  // Render the combined data

        currentBatch++; // Increment batch after loading
    } catch (error) {
        console.error('Error loading batch data:', error);
    }
}

// Fetch the trailer URL for a specific movie
async function getTrailerUrl(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
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

// Load the stream into the player
function loadStream(channelPlay) {
    const url = channelPlay.dataset.url || channelPlay.getAttribute('data-url');
    const parent = channelPlay.closest("li");
    const title = parent.querySelector(".channel-title").textContent;
    const plot = parent.querySelector(".channel-plot").textContent; // Get the plot from the channel info

    const video = document.querySelector("#player");
    const nowPlayingTitle = document.querySelector("#channel-playing");
    const moviePlot = document.querySelector("#movie-plot"); // Element to display the plot

    video.src = url;  // Set iframe source to trailer link
    nowPlayingTitle.textContent = title;
    moviePlot.textContent = plot; // Set the plot under the player

    video.scrollIntoView({ behavior: "smooth" });
}

// Search function to filter channels
async function filterChannels(event) {
    const query = event.target.value;

    if (query.length < 3) {
        // If the query is less than 3 characters, do not search
        renderChannels(allChannelData);  // Reset to original data
        document.querySelector("#load-more").style.display = "block"; // Show "Load More" button
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const channelData = await Promise.all(data.results.map(async (movie) => {
            const trailerUrl = await getTrailerUrl(movie.id);
            return {
                title: movie.title,
                url: trailerUrl,
                image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                plot: movie.overview,  // Movie plot
                releaseYear: movie.release_date.split('-')[0],  // Extract release year
            };
        }));

        renderChannels(channelData);  // Render the filtered results

        // Hide "Load More" button if there are results
        if (channelData.length > 0) {
            document.querySelector("#load-more").style.display = "none";
        } else {
            document.querySelector("#load-more").style.display = "block"; // Show if no results
        }
    } catch (error) {
        console.error('Error searching for channels:', error);
    }
}

// Load the channel data when the page loads
loadChannelData();
