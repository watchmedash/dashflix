document.addEventListener("DOMContentLoaded", () => {
    // Get TV show ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tvShowId = urlParams.get('id'); // e.g., 1195430

    // TMDB API setup for TV shows
    const apiKey = '4f599baa15d072c9de346b2816a131b8'; // Replace with your actual TMDB API key
    const apiUrl = `https://api.themoviedb.org/3/tv/${tvShowId}/recommendations?api_key=${apiKey}&language=en-US&page=1`;

    // Function to fetch and display related TV shows
    const fetchRelatedTVShows = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const tvShows = data.results;

            // Get the container where TV shows will be displayed
            const tvShowsList = document.getElementById('related-tv-shows-list');

            // Clear any previous content
            tvShowsList.innerHTML = '';

            // Calculate number of TV shows to show based on screen size
            const tvShowLimit = window.innerWidth <= 768 ? 3 : 4;

            // Loop through the related TV shows and create TV show cards
            tvShows.slice(0, tvShowLimit).forEach(tvShow => {
                const tvShowCard = document.createElement('div');
                tvShowCard.classList.add('tv-show-card');
                tvShowCard.onclick = () => {
                    // Change the URL to reflect the selected TV show's ID
                    window.location.href = `players.html?id=${tvShow.id}`;
                };

                const tvShowImage = tvShow.poster_path ?
                    `https://image.tmdb.org/t/p/w200${tvShow.poster_path}` :
                    'https://via.placeholder.com/200x300?text=No+Image';

                tvShowCard.innerHTML = `
                    <img src="${tvShowImage}" alt="${tvShow.name}">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                `;
                tvShowsList.appendChild(tvShowCard);
            });
        } catch (error) {
            console.error("Error fetching related TV shows:", error);
        }
    };

    // Fetch related TV shows when the page loads
    fetchRelatedTVShows();
});
