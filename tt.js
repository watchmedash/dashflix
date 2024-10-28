let titles = [];
let currentPage = 1;
const titlesPerPage = 20; // Number of titles to display per page

// Fetch titles from JSON file
fetch('titles.json')
    .then(response => response.json())
    .then(data => {
        titles = data; // Store titles in a global variable
        populateSortOptions(); // Populate sort options
        sortAndDisplayTitles("All", ""); // Display all titles initially
    })
    .catch(error => console.error('Error loading titles:', error));

// Function to populate sort options
function populateSortOptions() {
    const sortOptions = document.getElementById("sortOptions");
    sortOptions.innerHTML = '<option value="All">All</option>'; // Add 'All' option

    // Add letters A-Z
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(65 + i); // Generate A-Z
        const option = document.createElement("option");
        option.value = letter;
        option.textContent = letter;
        sortOptions.appendChild(option); // Append option to select
    }

    // Add numbers 1-9
    for (let i = 1; i <= 9; i++) {
        const option = document.createElement("option");
        option.value = i; // Add numbers 1-9
        option.textContent = i;
        sortOptions.appendChild(option); // Append option to select
    }
}

// Function to filter, sort, and display titles
function sortAndDisplayTitles(option, searchQuery) {
    let filteredTitles = [];

    if (searchQuery) {
        // Exact matches
        const exactMatches = titles.filter(title => title.title.toLowerCase() === searchQuery.toLowerCase());

        // Partial matches (that are not exact matches)
        const partialMatches = titles.filter(title =>
            title.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            title.title.toLowerCase() !== searchQuery.toLowerCase()
        );

        // Combine exact matches and partial matches
        filteredTitles = [...exactMatches, ...partialMatches];
    } else if (option === "All") {
        filteredTitles = [...titles]; // Copy the entire array if 'All' is selected
    } else {
        filteredTitles = titles.filter(title => title.title.startsWith(option)); // Filter based on selected option
    }

    // Sort only partial matches alphabetically
    const sortedTitles = filteredTitles.sort((a, b) => {
        if (a.title.toLowerCase() === searchQuery.toLowerCase()) return -1;
        if (b.title.toLowerCase() === searchQuery.toLowerCase()) return 1;
        return a.title.localeCompare(b.title);
    });

    // Display paginated titles
    displayTitles(sortedTitles);
}

// Function to display titles on the current page
function displayTitles(filteredTitles) {
    const titleList = document.getElementById("titleList");
    titleList.innerHTML = ""; // Clear previous titles

    const start = (currentPage - 1) * titlesPerPage;
    const end = start + titlesPerPage;
    const titlesToDisplay = filteredTitles.slice(start, end); // Slice for pagination

    titlesToDisplay.forEach(item => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = item.link;
        link.textContent = item.title;
        link.target = "_blank"; // Open link in new tab
        listItem.appendChild(link);
        titleList.appendChild(listItem);
    });

    // Update pagination info
    updatePagination(filteredTitles.length);
}

// Function to update pagination with a limited number of visible buttons
function updatePagination(totalTitles) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; // Clear previous pagination

    const totalPages = Math.ceil(totalTitles / titlesPerPage);
    const maxVisibleButtons = 5; // Limit number of buttons visible at a time

    // Create "Previous" button
    if (currentPage > 1) {
        const prevButton = document.createElement("button");
        prevButton.textContent = "Prev";
        prevButton.onclick = () => {
            currentPage--;
            sortAndDisplayTitles(document.getElementById("sortOptions").value, document.getElementById("searchInput").value);
        };
        pagination.appendChild(prevButton);
    }

    // Calculate range of visible page buttons
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // Adjust start and end pages if close to the beginning or end
    if (endPage - startPage < maxVisibleButtons - 1) {
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Create page number buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? "active" : "";
        pageButton.onclick = () => {
            currentPage = i;
            sortAndDisplayTitles(document.getElementById("sortOptions").value, document.getElementById("searchInput").value);
        };
        pagination.appendChild(pageButton);
    }

    // Create "Next" button
    if (currentPage < totalPages) {
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.onclick = () => {
            currentPage++;
            sortAndDisplayTitles(document.getElementById("sortOptions").value, document.getElementById("searchInput").value);
        };
        pagination.appendChild(nextButton);
    }
}

// Event listener for the dropdown selection
document.getElementById("sortOptions").addEventListener("change", (event) => {
    currentPage = 1; // Reset to the first page when changing sort
    sortAndDisplayTitles(event.target.value, document.getElementById("searchInput").value);
});

// Event listener for the search input
document.getElementById("searchInput").addEventListener("input", (event) => {
    currentPage = 1; // Reset to the first page when searching
    sortAndDisplayTitles(document.getElementById("sortOptions").value, event.target.value);
});
