const BASE_URL = "libog.json"; // Update with actual URL
const IMAGE_BASE_URL = "https://videothumbs.me/"; // Base URL for images

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
      title: `Movie ${id}`, // Replace with real movie data if available
      poster_path: `${id}.jpg`, // Generate the image path dynamically
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

  moviesList.forEach(movie => {
    const item = document.createElement("div");
    item.className = "gallery-item";

    const image = document.createElement("img");
    image.className = "lazy-image";
    image.setAttribute("data-src", IMAGE_BASE_URL + movie.poster_path);
    image.alt = movie.title;

    image.addEventListener("load", () => {
      image.classList.add("loaded");
    });

    image.addEventListener("error", () => {
      console.error(`Failed to load image for movie: ${movie.title}`);
    });

    const link = document.createElement("a");
    link.href = `pliya.html?id=${movie.id}`;
    link.target = "_self";
    link.appendChild(image);

    item.appendChild(link);
    gallery.appendChild(item);
  });

  initializeLazyLoad();
}

function initializeLazyLoad() {
  const lazyImages = document.querySelectorAll("img.lazy-image");
  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.onload = () => lazyImage.classList.add("loaded");
        imageObserver.unobserve(lazyImage);
      }
    });
  });

  lazyImages.forEach(image => imageObserver.observe(image));
}

document.addEventListener("DOMContentLoaded", () => {
  fetchMovies(); // Load movies on page load
});
