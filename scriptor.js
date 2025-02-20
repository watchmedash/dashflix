const API_KEY = "4f599baa15d072c9de346b2816a131b8";
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;

async function fetchMovies(query = "") {
    const url = query
      ? `${SEARCH_URL}${query}`
      : `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function displayMovies(movies) {
let swiperWrapper = document.querySelector(".swiper-wrapper");
swiperWrapper.innerHTML = "";
movies.forEach((movie) => {
    // Use a placeholder image if poster_path is null or undefined
    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://placehold.co/500x750?text=DASHFLIX';

    let movieSlide = document.createElement("div");
    movieSlide.classList.add("swiper-slide");
    movieSlide.innerHTML = `
        <img src="${poster}" alt="${movie.title}" />
        <button class="watch-btn" data-id="${movie.id}" data-overview="${movie.overview}">Watch Now</button>
    `;
    swiperWrapper.appendChild(movieSlide);
});
new Swiper(".swiper", {
    effect: "cards",
    grabCursor: true,
    loop: true,
    mousewheel: { invert: false }
});
setupWatchButtons();
}


function setupWatchButtons() {
    document.querySelectorAll(".watch-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
            const movieId = event.target.dataset.id;
            const movieOverview = event.target.dataset.overview;
            shownodal(movieId, movieOverview);
        });
    });
}

document.querySelector("#search-box").addEventListener("input", (event) => {
    fetchMovies(event.target.value);
});

function shownodal(movieId, movieOverview) {
    // Set the movie overview in the nodal
    document.querySelector("#nodal-description").textContent = movieOverview;

    // Define an array of video source URLs based on movieId
    const sources = [
        `https://vidsrc.me/embed/movie/${movieId}`,
        `https://embed.su/embed/movie/${movieId}`,
        `https://vidbinge.dev/embed/movie/${movieId}`,
        `https://vidsrc.vip/embed/movie/${movieId}`,
        `https://multiembed.mov/directstream.php?video_id=${movieId}&tmdb=1`,
        `https://vidlink.pro/movie/${movieId}`
    ];

    // Populate the source selector with options for each video source
    const sourceSelector = document.querySelector("#source-selector");
    sourceSelector.innerHTML = "";
    sources.forEach((src, index) => {
        let option = document.createElement("option");
        option.value = src;
        option.textContent = `Source ${index + 1}`;
        sourceSelector.appendChild(option);
    });

    // Set the movie player to load the first source by default
    document.querySelector("#movie-player").src = sources[0];

    // Update the movie player when the source selection changes
    sourceSelector.addEventListener("change", () => {
        document.querySelector("#movie-player").src = sourceSelector.value;
    });

    // Display the nodal
    document.querySelector("#movie-nodal").style.display = "block";
}

document.querySelector("#close-nodal").addEventListener("click", () => {
    document.querySelector("#movie-nodal").style.display = "none";
    // Clear the player src so it stops the video when closing the nodal
    document.querySelector("#movie-player").src = "";
});

fetchMovies();
