let currentBatch = 1;
const batchSize = 20;  // Adjust as needed
let allChannelData = [];  // Store all loaded channels
let currentMovieId = null;  // Store the currently playing movie's ID
const apiKey = '4f599baa15d072c9de346b2816a131b8';  // Add your TMDB API key

// Blocked movie IDs
const blockedMovieIds = [1163258, 179387];

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
    if (clearSearchButton) {
      clearSearchButton.addEventListener("click", () => {
        searchBox.value = "";  // Clear the input
        clearSearchButton.style.display = "none";  // Hide the clear button
        renderChannels(allChannelData);  // Show all channels again
        document.querySelector("#load-more").style.display = "block"; // Show "Load More" button
      });
    }

    // Set up video source selector
    const videoSourceSelect = document.querySelector("#video-source");
    if (videoSourceSelect) {
      videoSourceSelect.addEventListener("change", () => {
        if (currentMovieId) {
          loadStreamByMovieId(currentMovieId);  // Reload the current movie with the new source
        }
      });
    }

  } catch (error) {
    console.error('Error loading channel data:', error);
    alert('Unable to load data. Please try again later.');
  }
}

// Load the next batch of movies from TMDB API
async function loadNextBatch() {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentBatch}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const channelData = data.results.map(movie => ({
      title: movie.title,
      url: `https://vidsrc.xyz/embed/movie/${movie.id}`,  // Replace with your embed URL
      image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      plot: movie.overview,  // Movie plot
      releaseYear: movie.release_date.split('-')[0],  // Extract release year
    }));

    allChannelData.push(...channelData);  // Add to the master list
    renderChannels(allChannelData);  // Render the combined data

    currentBatch++;
  } catch (error) {
    console.error('Error loading batch data:', error);
    alert('Unable to load more data. Please try again later.');
  }
}

// Function to get the video URL based on the selected video source
function getVideoUrl(movieId) {
  const videoSource = document.querySelector("#video-source").value;
  switch (videoSource) {
    case "vidsrc":
      return `https://vidsrc.xyz/embed/movie/${movieId}`;
    case "vidlink":
      return `https://vidlink.pro/movie/${movieId}`;
    case "2embed":
      return `https://embed.su/embed/movie/${movieId}`;
    case "icu":
      return `https://multiembed.mov/directstream.php?video_id=${movieId}&tmdb=1`;
    case "icu2":
      return `https://vidbinge.dev/embed/movie/${movieId}`;
    case "icu3":
      return `https://vidsrc.vip/embed/movie/${movieId}`;
    default:
      return `https://vidsrc.xyz/embed/movie/${movieId}`;  // Fallback to vidsrc
  }
}

// Function to render the channels
function renderChannels(channelData) {
  const channelList = document.querySelector(".channel-list");
  channelList.innerHTML = "";  // Clear previous channels

  channelData.forEach((channel) => {
    // Check if the movie ID is in the blocked list
    if (blockedMovieIds.includes(channel.url.split('/').pop())) {
      return;  // Skip rendering this movie
    }

    const markup = `
      <li class="channel">
        <div class="handle">☰</div>
        <div class="play-channel" title="${channel.title}" data-url="${channel.url}">
  <div class="thumbnail-wrapper">
    <img class="channel-poster" src="${channel.image}" loading="lazy">
    <div class="play-icon">▶</div>
  </div>
</div>
        <div class="channel-info">
          <div class="channel-title" data-url="${channel.url}">${channel.title}</div>
          <div class="channel-plot">${channel.plot.substring(0, 100)}...</div> <!-- Snippet of the plot -->
          <div class="channel-release-year">${channel.releaseYear}</div>
        </div>
      </li>
    `;
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

// Function to load the stream into the player
function loadStream(channelPlay) {
  currentMovieId = channelPlay.dataset.url.split("/").pop();  // Store the movie ID
  const url = getVideoUrl(currentMovieId);  // Get the video URL based on selected source

  const parent = channelPlay.closest("li");
  const title = parent.querySelector(".channel-title").textContent;
  const plot = parent.querySelector(".channel-plot").textContent; // Get the plot from the channel info

  const video = document.querySelector("#player");
  const nowPlayingTitle = document.querySelector("#channel-playing");
  const moviePlot = document.querySelector("#movie-plot"); // Element to display the plot

  video.src = url;  // Set iframe source to embed link
  nowPlayingTitle.textContent = title;
  moviePlot.textContent = plot; // Set the plot under the player

  video.scrollIntoView({ behavior: "smooth" });
}

// Function to load stream by movie ID (for changing the video source)
function loadStreamByMovieId(movieId) {
  const url = getVideoUrl(movieId);  // Get the video URL based on selected source

  const video = document.querySelector("#player");
  video.src = url;  // Set iframe source to embed link

  video.scrollIntoView({ behavior: "smooth" });
}

// Function to filter and display channels based on search query
async function filterChannels(event) {
  const query = event.target.value;

  if (query.length < 3) {
    // If the query is less than 3 characters, reset to original data
    renderChannels(allChannelData);  // Reset to original data
    document.querySelector("#load-more").style.display = "block"; // Show "Load More" button
    return;
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const filteredResults = data.results
      .filter(movie => !blockedMovieIds.includes(movie.id)) // Filter out blocked movie IDs
      .map(movie => ({
        title: movie.title,
        url: `https://vidsrc.xyz/embed/movie/${movie.id}`,  // Replace with your embed URL
        image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        plot: movie.overview,  // Movie plot
        releaseYear: movie.release_date.split('-')[0],  // Extract release year
      }));

    renderChannels(filteredResults);  // Render the filtered results

    // Show or hide "Load More" button based on results
    document.querySelector("#load-more").style.display = filteredResults.length > 0 ? "none" : "block";
  } catch (error) {
    console.error('Error searching for channels:', error);
    alert('Unable to search for channels. Please try again later.');
  }
}


// Load the channel data when the page loads
loadChannelData();
