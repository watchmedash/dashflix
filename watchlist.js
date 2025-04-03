document.addEventListener("DOMContentLoaded", () => {
    const watchlistContainer = document.getElementById("watchlist");

    function loadWatchlist() {
        watchlistContainer.innerHTML = "";

        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        if (watchlist.length === 0) {
            watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
            return;
        }

        watchlist.forEach(movie => {
            const page = movie.type === "tv" ? "players.html" : "player.html"; // Choose the correct page

            const div = document.createElement("div");
            div.classList.add("watchlist-item");

            div.innerHTML = `
                <a href="${page}?id=${movie.id}">
                    <img src="${movie.poster}" alt="${movie.title}" class="clickable-poster">
                </a>
                <div class="info">
                    <h3><a href="${page}?id=${movie.id}" class="clickable-title">${movie.title} (${movie.releaseYear})</a></h3>
                    <p>Rating: ${movie.rating}</p>
                </div>
                <button class="remove-btn" data-id="${movie.id}" data-type="${movie.type}">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            watchlistContainer.appendChild(div);
        });
    }

    // Event delegation for remove button
    watchlistContainer.addEventListener("click", (e) => {
        const target = e.target.closest(".remove-btn"); // Find the closest remove button

        if (target) {
            const id = target.dataset.id;
            const type = target.dataset.type;

            console.log(`Removing: ID=${id}, Type=${type}`); // Debugging

            removeFromWatchlist(id, type);
        }
    });

    function removeFromWatchlist(id, type) {
        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        watchlist = watchlist.filter(item => !(item.id === id && item.type === type));
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        loadWatchlist(); // Reload watchlist after removal
    }

    loadWatchlist();
});
