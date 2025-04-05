document.addEventListener("DOMContentLoaded", () => {
    // Get movie ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id'); // e.g., 1195430

    // TMDB API setup
    const apiKey = '4f599baa15d072c9de346b2816a131b8'; // Replace with your actual TMDB API key
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`;

    // Function to fetch and display related movies
    const fetchRelatedMovies = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const movies = data.results;

            // Get the container where movies will be displayed
            const moviesList = document.getElementById('related-movies-list');

            // Clear any previous content
            moviesList.innerHTML = '';

            // Calculate number of movies to show based on screen size
            const movieLimit = window.innerWidth <= 768 ? 3 : 5;

            // Loop through the related movies and create movie cards
            movies.slice(0, movieLimit).forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.onclick = () => {
                    // Change the URL to reflect the selected movie's ID
                    window.location.href = `player.html?id=${movie.id}`;
                };

                const movieImage = movie.poster_path ?
                    `https://image.tmdb.org/t/p/w200${movie.poster_path}` :
                    'https://via.placeholder.com/200x300?text=No+Image';

                movieCard.innerHTML = `
                    <img src="${movieImage}" alt="${movie.title}">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                `;
                moviesList.appendChild(movieCard);
            });
        } catch (error) {
            console.error("Error fetching related movies:", error);
        }
    };

    // Fetch related movies when the page loads
    fetchRelatedMovies();
});
