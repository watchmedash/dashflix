const baseURL = 'https://filemoon.sx/e/'; // Base URL
let tmdbIDs = [];
let currentIndex = 0;

// Shuffle function to randomize the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Function to load TMDB IDs from JSON file
function loadTMDBIDs() {
    fetch('libog.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            tmdbIDs = data.tmdbIDs; // Load TMDB IDs
            shuffleArray(tmdbIDs); // Shuffle the IDs after loading
            showLink(currentIndex); // Show the first link after loading
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function showLink(index) {
    const iframe = document.getElementById('modalIframe');
    const modal = document.getElementById('myModal');
    const spinner = document.getElementById('spinner');
    iframe.src = baseURL + tmdbIDs[index]; // Construct URL with TMDB ID
    modal.style.display = 'flex';
    spinner.style.display = 'block';
    iframe.onload = () => {
        spinner.style.display = 'none';
    };
}

function navigate(direction) {
    currentIndex = (currentIndex + direction + tmdbIDs.length) % tmdbIDs.length;
    showLink(currentIndex);
}

function goToSite() {
    const iframe = document.getElementById('modalIframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    }
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
    document.getElementById('modalIframe').src = '';
    document.getElementById('fallback').style.display = 'flex';
}

function reopenModal() {
    showLink(currentIndex);
}

// Load TMDB IDs when the page loads
window.onload = loadTMDBIDs;
