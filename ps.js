document.addEventListener("DOMContentLoaded", () => {
    const watchlistBtn = document.getElementById("watchlist-btn");

    if (!watchlistBtn) return;

    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get("id");

    function getCurrentShowDetails() {
        return {
            id: showId,
            type: "tv",
            title: document.getElementById("tv-title-info").textContent,
            poster: document.getElementById("tv-poster").src,
            releaseYear: document.getElementById("release-year").textContent,
            rating: document.getElementById("rating").textContent,
        };
    }

    function updateButtonState() {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (watchlist.some(show => show.id === showId && show.type === "tv")) {
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

        if (watchlist.some(show => show.id === showId && show.type === "tv")) {
            watchlist = watchlist.filter(show => !(show.id === showId && show.type === "tv"));
        } else {
            watchlist.push(getCurrentShowDetails());
        }

        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        updateButtonState();
    }

    watchlistBtn.addEventListener("click", toggleWatchlist);

    updateButtonState();
});
