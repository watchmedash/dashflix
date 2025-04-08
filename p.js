document.addEventListener("DOMContentLoaded", () => {
    const watchlistBtn = document.getElementById("watchlist-btn");

    if (!watchlistBtn) return;

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    function getMovieDetails() {
        return {
            id: movieId,
            type: "movie", // To differentiate between movies and shows
            title: document.getElementById("movie-title-info").textContent,
            poster: document.getElementById("movie-poster").src,
            releaseYear: document.getElementById("release-year").textContent,
            rating: document.getElementById("rating").textContent,
        };
    }

    function updateButton() {
        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        if (watchlist.some(item => item.id === movieId && item.type === "movie")) {
            // Remove from Watchlist
            watchlistBtn.innerHTML = '<i class="fas fa-trash"></i>'; // Only trash icon for removal
            watchlistBtn.style.backgroundColor = "#ff4444"; // Red color for removal
            watchlistBtn.title = "Remove from Watchlist"; // Tooltip text for removal
        } else {
            // Add to Watchlist
            watchlistBtn.innerHTML = '<i class="fas fa-plus"></i>'; // Only plus icon for adding
            watchlistBtn.style.backgroundColor = "#007BFF"; // Default blue for adding
            watchlistBtn.title = "Add to Watchlist"; // Tooltip text for adding
        }
    }


    function toggleWatchlist() {
        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        if (watchlist.some(item => item.id === movieId && item.type === "movie")) {
            watchlist = watchlist.filter(item => !(item.id === movieId && item.type === "movie"));
        } else {
            watchlist.push(getMovieDetails());
        }

        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        updateButton();
    }

    watchlistBtn.addEventListener("click", toggleWatchlist);
    updateButton();
});
