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
            watchlistBtn.textContent = "Remove from Watchlist";
            watchlistBtn.style.backgroundColor = "#ff4444";
        } else {
            watchlistBtn.textContent = "Add to Watchlist";
            watchlistBtn.style.backgroundColor = "#007BFF";
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
