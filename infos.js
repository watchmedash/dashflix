const API_KEY = "4f599baa15d072c9de346b2816a131b8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

// Get show ID from URL
function getShowIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Fetch all show data
async function fetchShowDetails(showId) {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${showId}?api_key=${API_KEY}&append_to_response=aggregate_credits,videos,keywords,similar,recommendations,images,reviews,content_ratings`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching show details:", error);
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

// Get all videos
function getAllVideos(videos) {
  if (!videos || !videos.results) return [];
  return videos.results.filter(video => video.site === "YouTube");
}

// Get creators
function getCreators(creators) {
  if (!creators || creators.length === 0) return "Unknown";
  return creators.map(c => c.name).join(", ");
}

// Get networks
function getNetworks(networks) {
  if (!networks || networks.length === 0) return "N/A";
  return networks.map(n => n.name).join(", ");
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

// Get certification
function getCertification(contentRatings) {
  if (!contentRatings || !contentRatings.results) return "Not Rated";

  const usRating = contentRatings.results.find(r => r.iso_3166_1 === "US");
  return usRating ? usRating.rating : "Not Rated";
}

// Get language name
function getLanguageName(code) {
  const languages = {
    'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German',
    'it': 'Italian', 'ja': 'Japanese', 'ko': 'Korean', 'zh': 'Chinese',
    'hi': 'Hindi', 'pt': 'Portuguese', 'ru': 'Russian', 'ar': 'Arabic'
  };
  return languages[code] || code.toUpperCase();
}

// Setup trailer toggle
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

// Populate seasons
function populateSeasons(seasons) {
  const container = document.getElementById('seasons-list');
  container.innerHTML = '';

  if (!seasons || seasons.length === 0) {
    container.innerHTML = '<p>No seasons available.</p>';
    return;
  }

  seasons.forEach(season => {
    if (season.season_number === 0) return; // Skip specials

    const seasonCard = document.createElement('div');
    seasonCard.className = 'season-card';

    const imgUrl = season.poster_path
      ? IMAGE_BASE_URL + season.poster_path
      : 'https://via.placeholder.com/200x300?text=No+Poster';

    seasonCard.innerHTML = `
      <img src="${imgUrl}" alt="${season.name}">
      <div class="season-info">
        <strong>${season.name}</strong>
        <span>${season.episode_count} Episodes</span>
        <span>${season.air_date ? formatDate(season.air_date) : 'TBA'}</span>
      </div>
    `;

    container.appendChild(seasonCard);
  });
}

// Populate cast
function populateCast(cast) {
  const castContainer = document.getElementById('cast-list');
  castContainer.innerHTML = '';

  cast.forEach(actor => {
    const castCard = document.createElement('div');
    castCard.className = 'cast-card';

    const imgUrl = actor.profile_path
      ? IMAGE_BASE_URL + actor.profile_path
      : 'https://via.placeholder.com/150x225?text=No+Image';

    const character = actor.roles && actor.roles.length > 0
      ? actor.roles[0].character
      : actor.character || 'Unknown';

    castCard.innerHTML = `
      <img src="${imgUrl}" alt="${actor.name}">
      <div class="cast-info">
        <strong>${actor.name}</strong>
        <span>${character}</span>
      </div>
    `;

    castContainer.appendChild(castCard);
  });
}

// Populate similar shows
function populateSimilarShows(similar) {
  const container = document.getElementById('similar-shows');
  container.innerHTML = '';

  if (!similar || !similar.results || similar.results.length === 0) {
    container.innerHTML = '<p>No similar shows found.</p>';
    return;
  }

  similar.results.slice(0, 6).forEach(show => {
    const showCard = document.createElement('div');
    showCard.className = 'movie-card';

    const imgUrl = show.poster_path
      ? IMAGE_BASE_URL + show.poster_path
      : 'https://via.placeholder.com/200x300?text=No+Poster';

    showCard.innerHTML = `
      <a href="infos.html?id=${show.id}">
        <img src="${imgUrl}" alt="${show.name}">
        <div class="movie-card-title">${show.name}</div>
      </a>
    `;

    container.appendChild(showCard);
  });
}

// Populate reviews
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

// Toggle review
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

window.toggleReview = toggleReview;

// Populate videos
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

// Populate keywords
function populateKeywords(keywords) {
  const container = document.getElementById('keywords-list');
  container.innerHTML = '';

  if (!keywords || !keywords.results || keywords.results.length === 0) {
    document.getElementById('keywords-section').style.display = 'none';
    return;
  }

  keywords.results.slice(0, 15).forEach(keyword => {
    const tag = document.createElement('span');
    tag.className = 'keyword-tag';
    tag.textContent = keyword.name;
    container.appendChild(tag);
  });
}

// Populate show data
function populateShowData(show) {
  // Update page title
  document.title = `${show.name} (${new Date(show.first_air_date).getFullYear()})`;

  // Set backdrop
  if (show.backdrop_path) {
    document.body.style.backgroundImage = `url(${BACKDROP_BASE_URL}${show.backdrop_path})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  }

  // Update poster
  document.getElementById('show-poster').src = IMAGE_BASE_URL + show.poster_path;
  document.getElementById('show-poster').alt = show.name;

  // Update title
  document.getElementById('show-title').textContent =
    `${show.name} (${new Date(show.first_air_date).getFullYear()})`;

  // Update tagline
  if (show.tagline) {
    document.getElementById('show-tagline').textContent = `"${show.tagline}"`;
    document.getElementById('show-tagline').style.display = 'block';
  }

  // Update rating
  document.getElementById('show-rating').textContent =
    show.vote_average.toFixed(1) + "/10";
  document.getElementById('vote-count').textContent =
    `(${show.vote_count.toLocaleString()} votes)`;

  // Update watch button
  document.getElementById('watch-link').href = `players.html?id=${show.id}`;

  // Update trailer
  const trailerKey = getTrailerKey(show.videos);
  if (trailerKey) {
    document.getElementById('trailer-iframe').src =
      `https://www.youtube.com/embed/${trailerKey}`;
    setupTrailerToggle();
  } else {
    document.getElementById('trailer-section').style.display = 'none';
  }

  // Update overview
  document.getElementById('show-overview').textContent =
    show.overview || "No overview available.";

  // Update show details
  document.getElementById('show-creator').textContent = getCreators(show.created_by);
  document.getElementById('show-first-air').textContent = formatDate(show.first_air_date);
  document.getElementById('show-last-air').textContent = formatDate(show.last_air_date);
  document.getElementById('show-seasons').textContent = show.number_of_seasons || "N/A";
  document.getElementById('show-episodes').textContent = show.number_of_episodes || "N/A";
  document.getElementById('show-genres').textContent =
    show.genres ? show.genres.map(g => g.name).join(", ") : "N/A";
  document.getElementById('show-status').textContent = show.status || "N/A";
  document.getElementById('show-language').textContent = getLanguageName(show.original_language);
  document.getElementById('show-networks').textContent = getNetworks(show.networks);
  document.getElementById('show-certification').textContent = getCertification(show.content_ratings);
  document.getElementById('show-companies').textContent = getProductionCompanies(show.production_companies);

  // Populate sections
  populateSeasons(show.seasons);
  const cast = getCastList(show.aggregate_credits);
  populateCast(cast);
  populateSimilarShows(show.similar);
  populateReviews(show.reviews);
  populateVideos(show.videos);
  populateKeywords(show.keywords);
}

// Initialize page
async function initializePage() {
  const showId = getShowIdFromURL();

  if (!showId) {
    alert("No show ID provided!");
    window.location.href = "shows.html";
    return;
  }

  const show = await fetchShowDetails(showId);

  if (!show) {
    alert("Failed to load show details!");
    window.location.href = "shows.html";
    return;
  }

  populateShowData(show);
}

// Run when page loads
document.addEventListener("DOMContentLoaded", initializePage);
