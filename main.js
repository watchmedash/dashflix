const API_KEY = "4f599baa15d072c9de346b2816a131b8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

let movies = [];
let currentPage = 1;
let searchQuery = "";
let isLoading = false;

// List of movie IDs to block
const blockedMovieIds = [1163258, 179387]; // Replace with the TMDb IDs of the movies you want to block

// Fetch Popular Movies from TMDb
async function fetchMovies(page = 1) {
try {
    isLoading = true;
    document.getElementById("loading-spinner").style.display = "block";

    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();

    // Filter movies for only released ones and exclude blocked movies
    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const releasedMovies = data.results.filter(movie =>
        movie.release_date && movie.release_date <= today && !blockedMovieIds.includes(movie.id)
    );

    movies = [...movies, ...releasedMovies];
    displayMovies(releasedMovies);

    isLoading = false;
    document.getElementById("loading-spinner").style.display = "none";
} catch (error) {
    console.error("Error fetching movies:", error);
    isLoading = false;
}
}

// Search Movies in the entire TMDb database
async function searchMovies(query, page = 1) {
try {
    isLoading = true;
    document.getElementById("loading-spinner").style.display = "block";

    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`);
    const data = await response.json();

    // Filter movies for only released ones and exclude blocked movies
    const today = new Date().toISOString().split("T")[0];
    const releasedMovies = data.results.filter(movie =>
        movie.release_date && movie.release_date <= today && !blockedMovieIds.includes(movie.id)
    );

    displayMovies(releasedMovies);

    isLoading = false;
    document.getElementById("loading-spinner").style.display = "none";
} catch (error) {
    console.error("Error searching movies:", error);
    isLoading = false;
}
}

function displayMovies(moviesList) {
    const gallery = document.getElementById("gallery");

    // Clear the gallery if it's a new search
    if (currentPage === 1) {
        gallery.innerHTML = "";
    }

    moviesList.forEach(movie => {
        const column = document.createElement("div");
        column.className = "column";

        // Spinner element
        const spinner = document.createElement("div");
        spinner.className = "spinner";

        // Image element
        const image = document.createElement("img");
        image.className = "lazy-image";
        image.setAttribute("data-src", IMAGE_BASE_URL + movie.poster_path);
        image.alt = movie.title;

        // Lazy load: When the image is loaded
        image.addEventListener("load", () => {
            image.classList.add("loaded"); // Add opacity effect
            spinner.style.display = "none"; // Hide spinner when loaded
        });

        // Error handling: If the image fails to load
        image.addEventListener("error", () => {
            spinner.style.display = "none"; // Remove spinner
            console.error(`Failed to load image for movie: ${movie.title}`);
        });

        // Create anchor link for the image
        const link = document.createElement("a");
        link.href = `player.html?id=${movie.id}`; // Change 'movieId' to 'id'
        link.target = "_self"; // Open in the same tab
        link.appendChild(image); // Add image to the link

        // Append spinner and link to the column
        column.appendChild(spinner);
        column.appendChild(link);

        // Append the column to the gallery
        gallery.appendChild(column);
    });

    initializeLazyLoad();
}


// Lazy Load Initialization
function initializeLazyLoad() {
const lazyImages = document.querySelectorAll("img.lazy-image");
const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src; // Set the actual image source
            lazyImage.onload = () => {
                lazyImage.classList.add("loaded");
            };
            imageObserver.unobserve(lazyImage);
        }
    });
});

lazyImages.forEach(image => imageObserver.observe(image));
}

// Handle Search Function
function handleSearch() {
const query = document.getElementById("search-bar").value.trim();
searchQuery = query; // Save the search query
currentPage = 1; // Reset to page 1 for the search results
movies = []; // Reset the movie list to avoid duplicate results
if (query) {
    searchMovies(query); // Trigger search
} else {
    fetchMovies(); // Fetch popular movies if query is empty
}
}

// Infinite Scroll
window.addEventListener("scroll", () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
    currentPage++;

    if (searchQuery) {
        searchMovies(searchQuery, currentPage); // Continue fetching more search results
    } else {
        fetchMovies(currentPage); // Continue fetching more popular movies
    }
}
});

// Initial fetch
fetchMovies();

// Add event listener for search
document.getElementById("search-bar").addEventListener("input", handleSearch);
