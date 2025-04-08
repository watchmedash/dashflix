document.addEventListener("DOMContentLoaded", () => {
    const watchlistBtn = document.getElementById("watchlist-btn");

    if (!watchlistBtn) return;

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    function getMovieDetails() {
        return {
            id: movieId,
            type: "movie",
            title: document.getElementById("movie-title-info").textContent,
            poster: document.getElementById("movie-poster").src,
            releaseYear: document.getElementById("release-year").textContent,
            rating: document.getElementById("rating").textContent,
        };
    }

    function updateButton() {
        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        if (watchlist.some(item => item.id === movieId && item.type === "movie")) {
            watchlistBtn.innerHTML = '<i class="fas fa-trash"></i>';
            watchlistBtn.style.backgroundColor = "#ff4444";
            watchlistBtn.title = "Remove from Watchlist";
        } else {
            watchlistBtn.innerHTML = '<i class="fas fa-plus"></i>';
            watchlistBtn.style.backgroundColor = "#007BFF";
            watchlistBtn.title = "Add to Watchlist";
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
