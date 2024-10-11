document.addEventListener('DOMContentLoaded', function () {
const apiKey = '4f599baa15d072c9de346b2816a131b8'; // Replace with your TMDb API key
const baseApiUrl = 'https://api.themoviedb.org/3';
const galleryFigures = document.querySelectorAll('.gallery figure');
const customTooltip = document.getElementById('customTooltip');
galleryFigures.forEach(figure => {
figure.addEventListener('mouseover', function () {
const movieTitle = figure.querySelector('figcaption').innerText;
showMovieDetails(movieTitle, figure);
});
figure.addEventListener('mouseout', function () {
hideMovieDetails();
});
});
function showMovieDetails(movieTitle, figure) {
function getMovieDetails(movieTitle) {
const endpoint = '/search/movie';
const params = { api_key: apiKey, query: movieTitle };
fetch(baseApiUrl + endpoint + '?' + new URLSearchParams(params))
.then(response => response.json())
.then(data => {
console.log('API Response:', data);
const movieDetails = data.results[0];
if (movieDetails) {
document.getElementById('movieTitle').innerText = movieDetails.title;
document.getElementById('movieOverview').innerText = limitTextToOneParagraph(movieDetails.overview);
document.getElementById('movieReleaseDate').innerText = `Release Date: ${movieDetails.release_date}`;
} else {
console.error('No movie details found for:', movieTitle);
}
customTooltip.style.top = `${figure.offsetTop - customTooltip.offsetHeight}px`;
customTooltip.style.left = `${figure.offsetLeft + figure.offsetWidth / 2 - customTooltip.offsetWidth / 2}px`;
customTooltip.style.display = 'block';
})
.catch(error => console.error('Error fetching movie details:', error));
}
getMovieDetails(movieTitle);
}
function hideMovieDetails() {
customTooltip.style.display = 'none';
}

function limitTextToOneParagraph(text) {
const maxChars = 100;
return text.length > maxChars ? text.slice(0, maxChars) + '...' : text;
}
});
