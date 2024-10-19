let e = 1;
let t = [];
const n = "4f599baa15d072c9de346b2816a131b8";
const priorityIds = [1336941, 978796, 1306764]; // Most viewed IDs

async function l() {
  const l = `https://api.themoviedb.org/3/discover/movie?api_key=${n}&page=${e}`;
  try {
    const response = await fetch(l);
    const results = (await response.json()).results.map(e => ({
      title: e.title,
      url: `https://vidsrc.xyz/embed/movie/${e.id}`,
      image: `https://image.tmdb.org/t/p/original${e.poster_path}`,
      plot: e.overview,
      releaseYear: e.release_date.split("-")[0],
      id: e.id // Add the ID to the movie object
    }));

    // Push results to the main array, allowing duplicates
    t.push(...results);
    o(t); // Display the updated movie list
    e++;
  } catch (error) {
    console.error("Error loading batch data:", error);
  }
}

function o(t) {
  const n = document.querySelector(".channel-list");
  n.innerHTML = "";
  t.forEach(e => {
    const movieHTML = `<li class="channel">
      <div class="handle">☰</div>
      <button class="play-channel" title="${e.title}" data-url="${e.url}">
        <div class="thumbnail-wrapper">
          <img class="channel-poster" src="${e.image}" loading="lazy"> <!-- Lazy load attribute -->
          <div class="play-icon">▶</div> <!-- Play icon -->
        </div>
      </button>
      <div class="channel-info">
        <div class="channel-title" data-url="${e.url}">${e.title}</div>
        <div class="channel-plot">${e.plot.substring(0, 100)}...</div> <!-- Snippet of the plot -->
        <div class="channel-release-year">${e.releaseYear}</div>
      </div>
    </li>`;
    n.insertAdjacentHTML("beforeend", movieHTML);
  });

  const playButtons = document.querySelectorAll(".play-channel");
  const channelTitles = document.querySelectorAll(".channel-title");

  playButtons.forEach(e => {
    e.addEventListener("click", (t => {
      t.stopPropagation();
      a(e);
    }));
  });

  channelTitles.forEach(e => {
    e.addEventListener("click", () => {
      a(e);
    });
  });

  // Automatically play the first movie when loading the first page
  if (playButtons.length > 0 && e === 1) {
    a(playButtons[0]);
  }
}

function a(e) {
  const url = e.dataset.url || e.getAttribute("data-url");
  const n = e.closest("li");
  const title = n.querySelector(".channel-title").textContent;
  const plot = n.querySelector(".channel-plot").textContent;
  const player = document.querySelector("#player");
  const channelPlaying = document.querySelector("#channel-playing");
  const moviePlot = document.querySelector("#movie-plot");

  player.src = url;
  channelPlaying.textContent = title;
  moviePlot.textContent = plot;
  player.scrollIntoView({ behavior: "smooth" });
}

function addMostViewedListeners() {
  const mostViewedButtons = document.querySelectorAll(".most-viewed-list .play-channel");

  mostViewedButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      a(button); // Call the play function with the clicked button
    });
  });
}

// Fetch and display Most Viewed movies
async function fetchMostViewed() {
  const mostViewedSection = document.querySelector(".most-viewed-list");
  mostViewedSection.innerHTML = ""; // Clear existing content

  for (const id of priorityIds) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${n}`;
    try {
      const response = await fetch(url);
      const movie = await response.json();

      // Create the movie object
      const movieHTML = `<li class="channel">
        <div class="handle">☰</div>
        <button class="play-channel" title="${movie.title}" data-url="https://vidsrc.xyz/embed/movie/${movie.id}">
          <div class="thumbnail-wrapper">
            <img class="channel-poster" src="https://image.tmdb.org/t/p/original${movie.poster_path}" loading="lazy"> <!-- Lazy load attribute -->
            <div class="play-icon">▶</div> <!-- Play icon -->
          </div>
        </button>
        <div class="channel-info">
          <div class="channel-title" data-url="https://vidsrc.xyz/embed/movie/${movie.id}">${movie.title}</div>
          <div class="channel-plot">${movie.overview.substring(0, 100)}...</div> <!-- Snippet of the plot -->
          <div class="channel-release-year">${movie.release_date.split("-")[0]}</div>
        </div>
      </li>`;

      mostViewedSection.insertAdjacentHTML("beforeend", movieHTML);
    } catch (error) {
      console.error("Error fetching most viewed movie:", error);
    }
  }

  // Add event listeners to the buttons in the Most Viewed section
  addMostViewedListeners();
}

// Initialize movie loading and setup event listeners
(async function() {
  try {
    await l();
    await fetchMostViewed(); // Fetch Most Viewed movies

    const loadMoreButton = document.querySelector("#load-more");
    loadMoreButton && loadMoreButton.addEventListener("click", l);

    const searchBox = document.querySelector("#search-box");
    const clearSearchButton = document.querySelector("#clear-search");

    searchBox && searchBox.addEventListener("input", (e => {
      const query = e.target.value;
      if (query.length < 3) {
        o(t);
        document.querySelector("#load-more").style.display = "block";
        return;
      }

      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${n}&query=${encodeURIComponent(query)}`;
      fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
          const results = data.results.map(e => ({
            title: e.title,
            url: `https://vidsrc.xyz/embed/movie/${e.id}`,
            image: `https://image.tmdb.org/t/p/original${e.poster_path}`,
            plot: e.overview,
            releaseYear: e.release_date.split("-")[0],
            id: e.id // Add ID for duplicates checking
          }));

          o(results);
          document.querySelector("#load-more").style.display = results.length > 0 ? "none" : "block";
        })
        .catch(error => console.error("Error searching for movies:", error));

      clearSearchButton.style.display = query ? "inline-block" : "none";
    }));

    clearSearchButton.addEventListener("click", () => {
      searchBox.value = "";
      clearSearchButton.style.display = "none";
      o(t);
      document.querySelector("#load-more").style.display = "block";
    });
  } catch (error) {
    console.error("Error loading channel data:", error);
  }
})();
