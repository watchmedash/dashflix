document.addEventListener('DOMContentLoaded', () => {
  let movieData = []; // Initialize an empty array to hold all movie data

  // Function to load a single movie part JSON file
  function loadMoviePart(partUrl) {
    return fetch(partUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => json.movies)
      .catch((error) => {
        console.error(`Error loading ${partUrl}:`, error);
        return []; // Return an empty array if there's an error
      });
  }

  // Function to load all movie parts and merge the data
  function loadAllMovieData() {
    const movieParts = ['movies1.json', 'movies2.json', 'movies3.json', 'movies4.json', 'movies5.json']; // Add more parts if needed

    // Use Promise.all to load all parts asynchronously
    Promise.all(movieParts.map(loadMoviePart))
      .then((allParts) => {
        // Merge all parts into movieData array
        movieData = allParts.flat();

        // Debugging: Log the merged movie data
        console.log("All Movie Data Loaded:", movieData);

        // Perform initial search (if needed)
        performSearch(movieData);
      })
      .catch((error) => {
        console.error('Error loading movie data:', error);
      });
  }

  // Function to perform movie search
  function performSearch(movieData) {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchTerm = searchInput.value.toLowerCase();
    searchResults.innerHTML = "";

    if (searchTerm.trim() === "") {
      searchResults.style.display = "none";
    } else {
      const filteredMovies = movieData.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm)
      );
      if (filteredMovies.length === 0) {
        searchResults.innerHTML = "<p>No results found.</p>";
      } else {
        displayItemList(filteredMovies, searchResults);
      }
      searchResults.style.display = "block";
    }
  }

  // Function to display filtered movie data with tooltips
  function displayItemList(items, container) {
    const ul = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      const trimmedTitle = item.title.trim(); // Trim leading and trailing whitespaces
      link.textContent = trimmedTitle;
      // Use the trimmed title to construct the image URL and link
      link.href = `https://emirati.top/movies/${encodeURIComponent(trimmedTitle)}.html`;

      li.dataset.tooltip = item.image; // Use the image property for the tooltip
      li.appendChild(link);
      ul.appendChild(li);
    });
    container.appendChild(ul);
    addTooltipListeners(); // Add tooltip listeners after updating the list
  }

  // Function to add tooltip listeners
  function addTooltipListeners() {
    const listItems = document.querySelectorAll("li[data-tooltip]");
    listItems.forEach((li) => {
      const link = li.querySelector("a");
      const tooltipUrl = li.dataset.tooltip;
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = "Loading...";
      li.addEventListener("mouseenter", () => {
        tooltip.textContent = "Loading...";
        tooltip.style.display = "block";
        const tooltipImage = document.createElement("img");
        tooltipImage.src = tooltipUrl;
        tooltipImage.onload = () => {
          tooltip.textContent = "";
          tooltip.appendChild(tooltipImage);

          // Set the maximum width and height of the image here
          tooltipImage.style.maxWidth = "20%";
          tooltipImage.style.maxHeight = "20%";
        };
      });
      li.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });
      li.appendChild(tooltip);
    });
  }

  // Load all movie data when the page loads
  loadAllMovieData();

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => performSearch(movieData));
  const searchResults = document.getElementById("searchResults");
  searchResults.style.display = "none";
});
