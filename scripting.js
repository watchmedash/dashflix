let e = 1; // Page number for loading more movies
let t = []; // Array to hold movie data
const n = "4f599baa15d072c9de346b2816a131b8"; // TMDB API key
let currentSource = "vidsrc"; // Default video source set to vidsrc
let currentMovieId = null; // Track currently playing movie ID

async function l() {
    const l = `https://api.themoviedb.org/3/discover/movie?api_key=${n}&page=${e}`;
    try {
        const response = await fetch(l);
        const results = (await response.json()).results.map(e => ({
            title: e.title,
            url: getVideoUrl(e.id), // Get the URL based on the current source
            image: `https://image.tmdb.org/t/p/original${e.poster_path}`,
            plot: e.overview,
            releaseYear: e.release_date.split("-")[0],
            id: e.id // Add the ID to the movie object
        }));

        // Push results to the main array, allowing duplicates
        t.push(...results);
        o(t); // Display the updated movie list
        e++;

        // Automatically play the first movie using the current source
        if (t.length > 0 && e === 1) {
            a(t[0]); // Play the first movie
        }
    } catch (error) {
        console.error("Error loading batch data:", error);
    }
}

function getVideoUrl(movieId) {
    switch (currentSource) {
        case "vidsrc":
            return `https://vidsrc.xyz/embed/movie/${movieId}`;
        case "2embed":
            return `https://embed.su/embed/movie/${movieId}`;
        case "icu2":
            return `https://vidbinge.dev/embed/movie/${movieId}`;
        case "icu3":
            return `https://vidsrc.vip/embed/movie/${movieId}`;
        case "icu":
            return `https://multiembed.mov/directstream.php?video_id=${movieId}&tmdb=1`;
        default: // Fallback to vidlink
            return `https://vidlink.pro/movie/${movieId}`;
    }
}

function o(t) {
    const n = document.querySelector(".channel-list");
    n.innerHTML = "";
    t.forEach(e => {
        const movieHTML = `<li class="channel">
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
        n.insertAdjacentHTML("beforeend", movieHTML);
    });

    addPlayButtonListeners(); // Add listeners to play buttons

    // Automatically play the first movie using the current source
    if (t.length > 0 && e === 1) {
        a(t[0]); // Play the first movie
    }
}

function a(movie) {
    const url = getVideoUrl(movie.id); // Get URL based on ID
    const player = document.querySelector("#player");
    const channelPlaying = document.querySelector("#channel-playing");
    const moviePlot = document.querySelector("#movie-plot");

    player.src = url; // Set the player URL
    channelPlaying.textContent = movie.title; // Update the title
    moviePlot.textContent = movie.plot; // Update the plot
    player.scrollIntoView({ behavior: "smooth" }); // Scroll to the player
    currentMovieId = movie.id; // Update current movie ID
}

function addPlayButtonListeners() {
    const playButtons = document.querySelectorAll(".play-channel");
    playButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            const movieId = button.getAttribute("data-id");
            const movie = t.find(m => m.id == movieId); // Find the movie object
            if (movie) {
                a(movie); // Play the selected movie
            }
        });
    });
}

// Initialize movie loading and setup event listeners
(async function() {
    try {
        await l(); // Load initial movies

        const loadMoreButton = document.querySelector("#load-more");
        loadMoreButton && loadMoreButton.addEventListener("click", l);

        const searchBox = document.querySelector("#search-box");
        const clearSearchButton = document.querySelector("#clear-search");

        // Event listener for video source selection
        document.getElementById("video-source").addEventListener("change", (event) => {
            currentSource = event.target.value; // Update current source

            // Update the player with the currently selected movie
            if (currentMovieId) {
                const movie = t.find(m => m.id == currentMovieId); // Find the currently playing movie
                if (movie) {
                    a(movie); // Update the player with the new source
                }
            }
        });

        // Search functionality
        searchBox && searchBox.addEventListener("input", (e) => {
            const query = e.target.value;
            if (query.length < 3) {
                o(t); // Show all movies
                document.querySelector("#load-more").style.display = "block";
                return;
            }

            const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${n}&query=${encodeURIComponent(query)}`;
            fetch(searchUrl)
                .then(response => response.json())
                .then(data => {
                    const results = data.results.map(e => ({
                        title: e.title,
                        url: getVideoUrl(e.id), // Get the URL based on the current source
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
        });

        clearSearchButton.addEventListener("click", () => {
            searchBox.value = "";
            clearSearchButton.style.display = "none";
            o(t); // Show all movies
            document.querySelector("#load-more").style.display = "block";
        });
    } catch (error) {
        console.error("Error loading channel data:", error);
    }
})();
