const API_KEY = "4f599baa15d072c9de346b2816a131b8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

let shows = [],
    currentPage = 1,
    searchQuery = "",
    isLoading = false,
    blockedShowIdsSet = new Set([81329, 94722, 112470]);

async function fetchShows(page = 1) {
    try {
        isLoading = true;
        document.getElementById("loading-spinner").style.display = "block";

        const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        const data = await response.json();

        const availableShows = data.results.filter(show => !blockedShowIdsSet.has(show.id));
        displayShows(availableShows);

        isLoading = false;
        document.getElementById("loading-spinner").style.display = "none";
    } catch (e) {
        console.error("Error fetching shows:", e);
        isLoading = false;
    }
}

function displayShows(showsList) {
    const gallery = document.getElementById("gallery");

    if (currentPage === 1) gallery.innerHTML = "";

    showsList.forEach(show => {
        const column = document.createElement("div");
        column.className = "column";
        column.style.position = "relative"; // Ensures proper positioning for elements

        const spinner = document.createElement("div");
        spinner.className = "spinner";

        const image = document.createElement("img");
        image.className = "lazy-image";
        const posterPath = show.poster_path ? IMAGE_BASE_URL + show.poster_path : "https://i.postimg.cc/d3YGThwG/AD.png";
        image.setAttribute("data-src", posterPath);
        image.alt = show.name;

        image.addEventListener("load", () => {
            image.classList.add("loaded");
            spinner.style.display = "none";
        });

        image.addEventListener("error", () => {
            spinner.style.display = "none";
            console.error(`Failed to load image for show: ${show.name}`);
        });

        const link = document.createElement("a");
        link.href = `players.html?id=${show.id}`;
        link.target = "_self";
        link.appendChild(image);

        // Create the play icon
        const playIcon = document.createElement("i");
        playIcon.classList.add("fas", "fa-play-circle", "play-icon");

        // Create rating element in the top-left corner
        const rating = document.createElement("div");
        rating.className = "show-rating";
        rating.textContent = show.vote_average.toFixed(1);
        rating.style.backgroundColor = getRatingColor(show.vote_average);

        // Append elements to the column
        column.appendChild(spinner);
        column.appendChild(link);
        column.appendChild(playIcon);
        column.appendChild(rating); // Append rating here
        gallery.appendChild(column);
    });

    initializeLazyLoad();
}

// Function to determine rating color
function getRatingColor(rating) {
    if (rating >= 8) return "#2ecc71"; // Green (Great)
    if (rating >= 6) return "#f1c40f"; // Yellow (Good)
    if (rating >= 4) return "#e67e22"; // Orange (Average)
    return "#e74c3c"; // Red (Bad)
}

function initializeLazyLoad() {
    const lazyImages = document.querySelectorAll("img.lazy-image");
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.onload = () => lazyImage.classList.add("loaded");
                imageObserver.unobserve(lazyImage);
            }
        });
    });

    lazyImages.forEach(image => imageObserver.observe(image));
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
        currentPage++;
        fetchShows(currentPage);
    }
});

fetchShows();

function handleSearch() {
    const query = document.getElementById("search-bar").value.trim();
    searchQuery = query;
    currentPage = 1;
    shows = [];
    query ? searchShows(query) : fetchShows();
}

async function searchShows(query, page = 1) {
    try {
        isLoading = true;
        document.getElementById("loading-spinner").style.display = "block";

        const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`);
        const data = await response.json();

        const availableShows = data.results.filter(show => !blockedShowIdsSet.has(show.id));
        displayShows(availableShows);

        isLoading = false;
        document.getElementById("loading-spinner").style.display = "none";
    } catch (e) {
        console.error("Error searching shows:", e);
        isLoading = false;
    }
}

document.getElementById("search-bar").addEventListener("input", handleSearch);
