const API_KEY = "4f599baa15d072c9de346b2816a131b8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

async function fetchMovieDetails(id) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    displayMovieDetails(data);
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

async function fetchMovieCredits(id) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    displayMovieCredits(data);
  } catch (error) {
    console.error("Error fetching movie credits:", error);
  }
}

function displayMovieDetails(movie) {
  document.getElementById("movie-title-info").textContent = movie.title;
  document.getElementById("movie-poster").src = IMAGE_BASE_URL + movie.poster_path;
  document.getElementById("movie-overview").textContent = movie.overview;
  document.getElementById("release-year").textContent = movie.release_date.split("-")[0];
  document.getElementById("rating").textContent = movie.vote_average;

  const genres = movie.genres.map(g => g.name).join(", ");
  document.getElementById("genres").textContent = genres;

  const servers = [
    `https://vidsrc.me/embed/movie/${movie.id}`,
    `https://embed.su/embed/movie/${movie.id}`,
    `https://moviesapi.to/movie/${movie.id}`,
    `https://vidsrc.vip/embed/movie/${movie.id}`,
    `https://multiembed.mov/directstream.php?video_id=${movie.id}&tmdb=1`,
    `https://vidlink.pro/movie/${movie.id}`
  ];

  const sourceSelector = document.getElementById("video-source");
  sourceSelector.innerHTML = "";

  servers.forEach((url, index) => {
    const option = document.createElement("option");
    option.value = url;
    option.textContent = `Server ${index + 1}`;
    sourceSelector.appendChild(option);
  });

  if (servers.length > 0) {
    document.getElementById("video-player").src = servers[0];
  }

  fetchMovieCredits(movie.id);

  const fullUrl = `https://dashflix.top/player.html?id=${movie.id}`;
  const imageUrl = IMAGE_BASE_URL + movie.poster_path;

  const metaTags = [
    { property: "og:image", content: imageUrl },
    { property: "og:image:alt", content: movie.title + " Poster" },
    { property: "og:url", content: fullUrl },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: movie.title + " Poster" },
    { property: "og:title", content: `${movie.title} - Watch Now on Dashflix` },
    { name: "twitter:title", content: `${movie.title} - Watch Now on Dashflix` },
    { property: "og:description", content: movie.overview },
    { name: "twitter:description", content: movie.overview }
  ];

  metaTags.forEach(tag => {
    const meta = document.createElement("meta");
    if (tag.property) meta.setAttribute("property", tag.property);
    if (tag.name) meta.setAttribute("name", tag.name);
    meta.setAttribute("content", tag.content);
    document.head.appendChild(meta);
  });

  // Canonical link
  const canonical = document.createElement("link");
  canonical.setAttribute("rel", "canonical");
  canonical.setAttribute("href", fullUrl);
  document.head.appendChild(canonical);

  // Page Title
  document.title = `${movie.title} - Watch Now on Dashflix`;
}

function displayMovieCredits(credits) {
  const director = credits.crew.find(member => member.job === "Director");
  document.getElementById("director").textContent = director ? director.name : "Unknown";
}

function changeSource() {
  const player = document.getElementById("video-player");
  const sourceSelector = document.getElementById("video-source");
  player.src = sourceSelector.value;
}

function goBack() {
  window.location.href = "movies.html";
}

if (movieId) {
  fetchMovieDetails(movieId);
}
