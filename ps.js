document.addEventListener("DOMContentLoaded", () => {
    const watchlistBtn = document.getElementById("watchlist-btn");

    if (!watchlistBtn) return; // Stop if button is missing

    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get("id");

    function getCurrentShowDetails() {
        return {
            id: showId,
            type: "tv", // Marking it as a TV show
            title: document.getElementById("tv-title-info").textContent,
            poster: document.getElementById("tv-poster").src,
            releaseYear: document.getElementById("release-year").textContent,
            rating: document.getElementById("rating").textContent,
        };
    }

    function updateButtonState() {
        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        if (watchlist.some(show => show.id === showId && show.type === "tv")) {
            watchlistBtn.textContent = "Remove from Watchlist";
            watchlistBtn.style.backgroundColor = "#ff4444"; // Red color for removal
        } else {
            watchlistBtn.textContent = "Add to Watchlist";
            watchlistBtn.style.backgroundColor = "#007BFF"; // Default blue
        }
    }

    function toggleWatchlist() {
        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        if (watchlist.some(show => show.id === showId && show.type === "tv")) {
            // Remove from watchlist
            watchlist = watchlist.filter(show => !(show.id === showId && show.type === "tv"));
        } else {
            // Add to watchlist
            watchlist.push(getCurrentShowDetails());
        }

        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        updateButtonState(); // Update button instantly
    }

    watchlistBtn.addEventListener("click", toggleWatchlist);

    // Update button on page load
    updateButtonState();
});
