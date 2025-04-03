document.addEventListener("DOMContentLoaded", () => {
    const watchlistContainer = document.getElementById("watchlist");

    function loadWatchlist() {
        watchlistContainer.innerHTML = "";

        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        if (watchlist.length === 0) {
            watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
            return;
        }

        watchlist.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("watchlist-item");

            div.innerHTML = `
                <img src="${item.poster}" alt="${item.title}" class="watchlist-poster" data-id="${item.id}" data-type="${item.type}">
                <div class="info">
                    <h3>${item.title} (${item.releaseYear})</h3>
                    <p>Rating: ${item.rating}</p>
                </div>
                <button class="remove-btn" data-id="${item.id}" data-type="${item.type}">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            watchlistContainer.appendChild(div);
        });
    }

    watchlistContainer.addEventListener("click", (e) => {
        const target = e.target;

        // Handle poster click
        if (target.classList.contains("watchlist-poster")) {
            const id = target.dataset.id;
            const type = target.dataset.type;

            console.log("Clicked on:", { id, type }); // 🐛 Debugging output

            if (type === "movie") {
                window.location.href = `player.html?id=${id}`;
            } else if (type === "tv") {
                window.location.href = `players.html?id=${id}`;
            } else {
                console.error("Unknown type:", type);
            }
        }
    });


        // Handle remove button click
        if (target.closest(".remove-btn")) {
            const btn = target.closest(".remove-btn");
            const id = btn.dataset.id;
            const type = btn.dataset.type;
            removeFromWatchlist(id, type);
        }
    });

    function removeFromWatchlist(id, type) {
        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        watchlist = watchlist.filter(item => !(item.id === id && item.type === type));
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        loadWatchlist();
    }

    loadWatchlist();
});
