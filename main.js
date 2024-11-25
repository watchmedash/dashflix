const API_KEY = "4f599baa15d072c9de346b2816a131b8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

let movies = [];
let currentPage = 1;
let searchQuery = "";
let isLoading = false;
const blockedMovieIds = [1163258, 179387];

async function fetchMovies(page = 1, append = false) {
  try {
    isLoading = true;
    document.getElementById("loading-spinner").style.display = "block";

    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    const data = await response.json();
    const today = new Date().toISOString().split("T")[0];
    const releasedMovies = data.results.filter(
      movie => movie.release_date && movie.release_date <= today && !blockedMovieIds.includes(movie.id)
    );

    movies = append ? [...movies, ...releasedMovies] : [...releasedMovies];

    if (append) {
      displayMovies(releasedMovies, true);
    } else {
      applyFilters();
    }

    isLoading = false;
    document.getElementById("loading-spinner").style.display = "none";
  } catch (error) {
    console.error("Error fetching movies:", error);
    isLoading = false;
  }
}

async function searchMovies(query, page = 1) {
  try {
    isLoading = true;
    document.getElementById("loading-spinner").style.display = "block";

    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`);
    const data = await response.json();
    const today = new Date().toISOString().split("T")[0];
    const releasedMovies = data.results.filter(
      movie => movie.release_date && movie.release_date <= today && !blockedMovieIds.includes(movie.id)
    );

    movies = page > 1 ? [...movies, ...releasedMovies] : [...releasedMovies];
    displayMovies(releasedMovies, page > 1);

    isLoading = false;
    document.getElementById("loading-spinner").style.display = "none";
  } catch (error) {
    console.error("Error searching movies:", error);
    isLoading = false;
  }
}

function displayMovies(moviesList, append = false) {
  const gallery = document.getElementById("gallery");

  if (!append) {
    gallery.innerHTML = "";
  }

  if (moviesList.length === 0 && !append) {
    gallery.innerHTML = "<p>No movies found.</p>";
    return;
  }

  moviesList.forEach(movie => {
    const column = document.createElement("div");
    column.className = "column";

    const spinner = document.createElement("div");
    spinner.className = "spinner";

    const image = document.createElement("img");
    image.className = "lazy-image";
    image.setAttribute("data-src", IMAGE_BASE_URL + movie.poster_path);
    image.alt = movie.title;

    image.addEventListener("load", () => {
      image.classList.add("loaded");
      spinner.style.display = "none";
    });

    image.addEventListener("error", () => {
      spinner.style.display = "none";
      console.error(`Failed to load image for movie: ${movie.title}`);
    });

    const link = document.createElement("a");
    link.href = `player.html?id=${movie.id}`;
    link.target = "_self";
    link.appendChild(image);

    column.appendChild(spinner);
    column.appendChild(link);
    gallery.appendChild(column);
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

function handleSearch() {
  const query = document.getElementById("search-bar").value.trim();
  searchQuery = query;
  currentPage = 1;
  movies = [];
  if (query) searchMovies(query);
  else fetchMovies();
}

async function populateGenreDropdown() {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    const genreDropdown = document.getElementById("genre-dropdown");

    data.genres.forEach(genre => {
      if (genre.name !== "Documentary" && genre.name !== "Western") {
        const option = document.createElement("option");
        option.value = genre.id;
        option.textContent = genre.name;
        genreDropdown.appendChild(option);
      }
    });
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
}

function applyFilters() {
  const genreId = document.getElementById("genre-dropdown").value;

  let filteredMovies = movies.slice();

  if (genreId) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.genre_ids && movie.genre_ids.includes(parseInt(genreId))
    );
  }

  displayMovies(filteredMovies);
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
    currentPage++;
    if (searchQuery) {
      searchMovies(searchQuery, currentPage);
    } else {
      fetchMovies(currentPage, true);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  populateGenreDropdown();
  fetchMovies();
});

document.getElementById("search-bar").addEventListener("input", handleSearch);
document.getElementById("genre-dropdown").addEventListener("change", applyFilters);
