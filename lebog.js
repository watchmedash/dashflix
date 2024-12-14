const BASE_URL = "libog.json"; // Update with actual URL
let movies = [];
let isLoading = false;

async function fetchMovies() {
  try {
    isLoading = true;
    document.getElementById("loading-spinner").style.display = "block";

    const response = await fetch(BASE_URL);
    const data = await response.json();

    // Generate movie data based on TMDB IDs
    movies = data.tmdbIDs.map(id => ({
      id,
      title: `Movie ${id}` // Use movie ID as title
    }));

    displayMovies(movies);

    isLoading = false;
    document.getElementById("loading-spinner").style.display = "none";
  } catch (error) {
    console.error("Error fetching movies:", error);
    isLoading = false;
  }
}

function displayMovies(moviesList) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = ""; // Clear previous content

  if (moviesList.length === 0) {
    gallery.innerHTML = "<p>No movies found.</p>";
    return;
  }

  // Create tab items for movies
  moviesList.forEach(movie => {
    const tabItem = document.createElement("div");
    tabItem.className = "tab-item";

    const link = document.createElement("a");
    link.href = `pliya.html?id=${movie.id}`;
    link.target = "_self";
    link.innerHTML = `<i class="fas fa-play"></i> ${movie.id}`; // Add play icon

    tabItem.appendChild(link);
    gallery.appendChild(tabItem);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  fetchMovies(); // Load movies on page load
});
