const API_KEY = "4f599baa15d072c9de346b2816a131b8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

// Get movie ID from URL
function getMovieIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Fetch all movie data
async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos,keywords,similar,recommendations,images,reviews,release_dates`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

// Get YouTube trailer key
function getTrailerKey(videos) {
  if (!videos || !videos.results) return null;
  const trailer = videos.results.find(
    video => video.type === "Trailer" && video.site === "YouTube"
  );
  return trailer ? trailer.key : null;
}

// Get all videos (trailers, teasers, clips)
function getAllVideos(videos) {
  if (!videos || !videos.results) return [];
  return videos.results.filter(video => video.site === "YouTube");
}

// Get director and writers
function getCrewInfo(credits) {
  if (!credits || !credits.crew) return { director: "Unknown", writers: [] };

  const director = credits.crew.find(person => person.job === "Director");
  const writers = credits.crew.filter(person =>
    person.job === "Writer" || person.job === "Screenplay" || person.job === "Story"
  ).slice(0, 3);

  return {
    director: director ? director.name : "Unknown",
    writers: writers.map(w => w.name)
  };
}

// Get production companies
function getProductionCompanies(companies) {
  if (!companies || companies.length === 0) return "N/A";
  return companies.map(c => c.name).join(", ");
}

// Get cast list (top 15)
function getCastList(credits) {
  if (!credits || !credits.cast) return [];
  return credits.cast.slice(0, 15);
}

// Format runtime
function formatRuntime(minutes) {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

// Format date
function formatDate(dateString) {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format budget/revenue
function formatMoney(amount) {
  if (!amount || amount === 0) return "N/A";
  return "$" + amount.toLocaleString();
}

// Get certification (rating like PG-13, R, etc)
function getCertification(releaseDates) {
  if (!releaseDates || !releaseDates.results) return "Not Rated";

  const usRelease = releaseDates.results.find(r => r.iso_3166_1 === "US");
  if (usRelease && usRelease.release_dates && usRelease.release_dates.length > 0) {
    const cert = usRelease.release_dates.find(rd => rd.certification);
    return cert ? cert.certification : "Not Rated";
  }
  return "Not Rated";
}

// Get original language name
function getLanguageName(code) {
  const languages = {
    'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German',
    'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean', 'zh': 'Chinese',
    'hi': 'Hindi', 'pt': 'Portuguese', 'ru': 'Russian', 'ar': 'Arabic'
  };
  return languages[code] || code.toUpperCase();
}

// Toggle trailer visibility
function setupTrailerToggle() {
  const toggleBtn = document.getElementById('trailer-toggle-btn');
  const trailerContent = document.getElementById('trailer-content');

  toggleBtn.addEventListener('click', function() {
    if (trailerContent.style.display === 'none') {
      trailerContent.style.display = 'block';
      toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Trailer';
    } else {
      trailerContent.style.display = 'none';
      toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show Trailer';
    }
  });
}

// Populate cast section
function populateCast(cast) {
  const castContainer = document.getElementById('cast-list');
  castContainer.innerHTML = '';

  cast.forEach(actor => {
    const castCard = document.createElement('div');
    castCard.className = 'cast-card';

    const imgUrl = actor.profile_path
      ? IMAGE_BASE_URL + actor.profile_path
      : 'https://via.placeholder.com/150x225?text=No+Image';

    castCard.innerHTML = `
      <img src="${imgUrl}" alt="${actor.name}">
      <div class="cast-info">
        <strong>${actor.name}</strong>
        <span>${actor.character}</span>
      </div>
    `;

    castContainer.appendChild(castCard);
  });
}

// Populate similar movies
function populateSimilarMovies(similar) {
  const container = document.getElementById('similar-movies');
  container.innerHTML = '';

  if (!similar || !similar.results || similar.results.length === 0) {
    container.innerHTML = '<p>No similar movies found.</p>';
    return;
  }

  similar.results.slice(0, 6).forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';

    const imgUrl = movie.poster_path
      ? IMAGE_BASE_URL + movie.poster_path
      : 'https://via.placeholder.com/200x300?text=No+Poster';

    movieCard.innerHTML = `
      <a href="info.html?id=${movie.id}">
        <img src="${imgUrl}" alt="${movie.title}">
        <div class="movie-card-title">${movie.title}</div>
      </a>
    `;

    container.appendChild(movieCard);
  });
}

// Populate reviews with read more functionality
function populateReviews(reviews) {
  const container = document.getElementById('reviews-list');
  container.innerHTML = '';

  if (!reviews || !reviews.results || reviews.results.length === 0) {
    container.innerHTML = '<p>No reviews available yet.</p>';
    return;
  }

  reviews.results.slice(0, 5).forEach((review, index) => {
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';

    const reviewId = `review-${index}`;
    const isLong = review.content.length > 400;
    const shortContent = isLong ? review.content.substring(0, 400) + '...' : review.content;

    reviewCard.innerHTML = `
      <div class="review-header">
        <strong>${review.author}</strong>
        ${review.author_details.rating ? `<span class="review-rating"><i class="fas fa-star"></i> ${review.author_details.rating}/10</span>` : ''}
      </div>
      <div class="review-content">
        <p id="${reviewId}-short" class="review-text">${shortContent}</p>
        <p id="${reviewId}-full" class="review-text" style="display: none;">${review.content}</p>
        ${isLong ? `<button class="read-more-btn" onclick="toggleReview('${reviewId}')">Read More</button>` : ''}
      </div>
    `;

    container.appendChild(reviewCard);
  });
}

// Toggle review read more/less
function toggleReview(reviewId) {
  const shortText = document.getElementById(`${reviewId}-short`);
  const fullText = document.getElementById(`${reviewId}-full`);
  const button = event.target;

  if (fullText.style.display === 'none') {
    shortText.style.display = 'none';
    fullText.style.display = 'block';
    button.textContent = 'Read Less';
  } else {
    shortText.style.display = 'block';
    fullText.style.display = 'none';
    button.textContent = 'Read More';
  }
}

// Make toggleReview globally accessible
window.toggleReview = toggleReview;

// Populate all video extras
function populateVideos(videos) {
  const container = document.getElementById('videos-list');
  container.innerHTML = '';

  const allVideos = getAllVideos(videos);

  if (allVideos.length === 0) {
    document.getElementById('videos-section').style.display = 'none';
    return;
  }

  allVideos.slice(0, 6).forEach(video => {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';

    videoCard.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${video.key}" frameborder="0" allowfullscreen></iframe>
      <div class="video-title">${video.name} (${video.type})</div>
    `;

    container.appendChild(videoCard);
  });
}

// Populate keywords/tags
function populateKeywords(keywords) {
  const container = document.getElementById('keywords-list');
  container.innerHTML = '';

  if (!keywords || !keywords.keywords || keywords.keywords.length === 0) {
    document.getElementById('keywords-section').style.display = 'none';
    return;
  }

  keywords.keywords.slice(0, 15).forEach(keyword => {
    const tag = document.createElement('span');
    tag.className = 'keyword-tag';
    tag.textContent = keyword.name;
    container.appendChild(tag);
  });
}

// Populate movie data
function populateMovieData(movie) {
  // Update page title
  document.title = `${movie.title} (${new Date(movie.release_date).getFullYear()})`;

  // Set backdrop if available
  if (movie.backdrop_path) {
    document.body.style.backgroundImage = `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  }

  // Update poster
  document.getElementById('movie-poster').src = IMAGE_BASE_URL + movie.poster_path;
  document.getElementById('movie-poster').alt = movie.title;

  // Update title
  document.getElementById('movie-title').textContent =
    `${movie.title} (${new Date(movie.release_date).getFullYear()})`;

  // Update tagline
  if (movie.tagline) {
    document.getElementById('movie-tagline').textContent = `"${movie.tagline}"`;
    document.getElementById('movie-tagline').style.display = 'block';
  }

  // Update rating
  document.getElementById('movie-rating').textContent =
    movie.vote_average.toFixed(1) + "/10";
  document.getElementById('vote-count').textContent =
    `(${movie.vote_count.toLocaleString()} votes)`;

  // Update watch button
  document.getElementById('watch-link').href = `../player?id=${movie.id}`;

  // Update trailer
  const trailerKey = getTrailerKey(movie.videos);
  if (trailerKey) {
    document.getElementById('trailer-iframe').src =
      `https://www.youtube.com/embed/${trailerKey}`;
    setupTrailerToggle();
  } else {
    document.getElementById('trailer-section').style.display = 'none';
  }

  // Update overview
  document.getElementById('movie-overview').textContent =
    movie.overview || "No overview available.";

  // Get crew info
  const crewInfo = getCrewInfo(movie.credits);

  // Update movie details
  document.getElementById('movie-director').textContent = crewInfo.director;
  document.getElementById('movie-writers').textContent =
    crewInfo.writers.length > 0 ? crewInfo.writers.join(", ") : "N/A";
  document.getElementById('movie-release').textContent = formatDate(movie.release_date);
  document.getElementById('movie-runtime').textContent = formatRuntime(movie.runtime);
  document.getElementById('movie-genres').textContent =
    movie.genres ? movie.genres.map(g => g.name).join(", ") : "N/A";
  document.getElementById('movie-budget').textContent = formatMoney(movie.budget);
  document.getElementById('movie-revenue').textContent = formatMoney(movie.revenue);
  document.getElementById('movie-language').textContent = getLanguageName(movie.original_language);
  document.getElementById('movie-status').textContent = movie.status || "N/A";
  document.getElementById('movie-certification').textContent = getCertification(movie.release_dates);
  document.getElementById('movie-companies').textContent = getProductionCompanies(movie.production_companies);

  // Populate cast
  const cast = getCastList(movie.credits);
  populateCast(cast);

  // Populate similar movies
  populateSimilarMovies(movie.similar);

  // Populate reviews
  populateReviews(movie.reviews);

  // Populate videos
  populateVideos(movie.videos);

  // Populate keywords
  populateKeywords(movie.keywords);
}

// Initialize page
async function initializePage() {
  const movieId = getMovieIdFromURL();

  if (!movieId) {
    alert("No movie ID provided!");
    window.location.href = "movies.html";
    return;
  }

  const movie = await fetchMovieDetails(movieId);

  if (!movie) {
    alert("Failed to load movie details!");
    window.location.href = "movies.html";
    return;
  }

  populateMovieData(movie);
}

// Run when page loads
document.addEventListener("DOMContentLoaded", initializePage);
