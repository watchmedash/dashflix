const API_KEY = "4f599baa15d072c9de346b2816a131b8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

let shows = [];
let currentPage = 1;
let searchQuery = "";
let isLoading = false;



const blockedShowIds = [81329, 94722, 112470, 231344, 256121, 257064, 4682, 248890, 18770, 249010, 237243, 261033, 237019, 243084, 237478, 252373,72879, 274260, 274136, 242722, 91759, 256429, 255150, 206559, 45789, 235484, 234811, 235493, 262364, 212907, 239526, 262831, 242101, 240440, 242931, 242099, 243117, 58141, 239389, 2912, 247885, 154828, 59941, 2051, 95897, 261791, 236994, 12409, 231962, 136166, 2224, 210078, 156899, 13945, 234226, 36361, 270792, 13008, 257048, 38715, 71645, 61818, 113779, 273911, 46392, 258857, 108466, 911, 253767, 274816, 273825, 119316, 34860, 13805, 19530, 94855, 74342, 22980, 274444, 16656, 2527, 203599, 1900, 6809, 217772, 194916, 65282, 2261, 32209, 14424, 23915, 155256, 14750, 228091, 72974, 35442, 244984, 195648, 64356, 74561, 275464, 40879, 59804, 65733, 199332, 41406,
8590,
18495,
119353,
881,
987,
1054,
154770,
96386,
79481,
124003,
2661,
14981,
80318,
104716,
67667,
96804,
50524,
46195,
33238,
76806,
113329];

// Fetch Popular TV Shows from TMDb
async function fetchShows(page = 1) {
    try {
        isLoading = true;
        document.getElementById("loading-spinner").style.display = "block";

        const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        const data = await response.json();

        // Filter shows for only released ones and exclude blocked shows
        const today = new Date().toISOString().split("T")[0]; // Get today's date
        const releasedShows = data.results.filter(show =>
            show.first_air_date && show.first_air_date <= today && !blockedShowIds.includes(show.id)
        );

        shows = [...shows, ...releasedShows];
        displayShows(releasedShows);

        isLoading = false;
        document.getElementById("loading-spinner").style.display = "none";
    } catch (error) {
        console.error("Error fetching shows:", error);
        isLoading = false;
    }
}

// Search TV Shows in the entire TMDb database
async function searchShows(query, page = 1) {
    try {
        isLoading = true;
        document.getElementById("loading-spinner").style.display = "block";

        const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`);
        const data = await response.json();

        // Filter shows for only released ones and exclude blocked shows
        const today = new Date().toISOString().split("T")[0];
        const releasedShows = data.results.filter(show =>
            show.first_air_date && show.first_air_date <= today && !blockedShowIds.includes(show.id)
        );

        displayShows(releasedShows);

        isLoading = false;
        document.getElementById("loading-spinner").style.display = "none";
    } catch (error) {
        console.error("Error searching shows:", error);
        isLoading = false;
    }
}

// Display TV Shows in the gallery
function displayShows(showsList) {
    const gallery = document.getElementById("gallery");

    // Clear the gallery if it's a new search
    if (currentPage === 1) {
        gallery.innerHTML = "";
    }

    showsList.forEach(show => {
        const column = document.createElement("div");
        column.className = "column";

        // Spinner element
        const spinner = document.createElement("div");
        spinner.className = "spinner";

        // Image element
        const image = document.createElement("img");
        image.className = "lazy-image";
        image.setAttribute("data-src", IMAGE_BASE_URL + show.poster_path);
        image.alt = show.name;

        // Lazy load: When the image is loaded
        image.addEventListener("load", () => {
            image.classList.add("loaded"); // Add opacity effect
            spinner.style.display = "none"; // Hide spinner when loaded
        });

        // Error handling: If the image fails to load
        image.addEventListener("error", () => {
            spinner.style.display = "none"; // Remove spinner
            console.error(`Failed to load image for show: ${show.name}`);
        });

        // Create anchor link for the image
        const link = document.createElement("a");
        link.href = `players.html?id=${show.id}`; // Change 'showId' to 'id'
        link.target = "_self"; // Open in the same tab
        link.appendChild(image); // Add image to the link

        // Append spinner and link to the column
        column.appendChild(spinner);
        column.appendChild(link);

        // Append the column to the gallery
        gallery.appendChild(column);
    });

    initializeLazyLoad();
}

// Lazy Load Initialization
function initializeLazyLoad() {
    const lazyImages = document.querySelectorAll("img.lazy-image");
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src; // Set the actual image source
                lazyImage.onload = () => {
                    lazyImage.classList.add("loaded");
                };
                imageObserver.unobserve(lazyImage);
            }
        });
    });

    lazyImages.forEach(image => imageObserver.observe(image));
}

// Handle Search Function
function handleSearch() {
    const query = document.getElementById("search-bar").value.trim();
    searchQuery = query; // Save the search query
    currentPage = 1; // Reset to page 1 for the search results
    shows = []; // Reset the show list to avoid duplicate results
    if (query) {
        searchShows(query); // Trigger search
    } else {
        fetchShows(); // Fetch popular shows if query is empty
    }
}

// Infinite Scroll
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
        currentPage++;

        if (searchQuery) {
            searchShows(searchQuery, currentPage); // Continue fetching more search results
        } else {
            fetchShows(currentPage); // Continue fetching more popular shows
        }
    }
});

// Initial fetch
fetchShows();

// Add event listener for search
document.getElementById("search-bar").addEventListener("input", handleSearch);
