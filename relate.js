// Modified redirectTo function to open "redirect.html" directly
function redirectTo(destinationUrl) {
    // Construct the absolute path to "redirect.html"
    var redirectUrl = window.location.origin + '/redirect.html?url=' + encodeURIComponent(destinationUrl);

    // Open "redirect.html" in a new window or tab
    window.open(redirectUrl, '_self');
}

// Function to load and display related movies
function loadRelatedMovies() {
  // Get a reference to the related movies gallery container on the current page
  const relatedMoviesGallery = document.querySelector('.related-movies-gallery');

  // If the container exists on the current page
  if (relatedMoviesGallery) {
    // Fetch the content of home.html (adjust the URL as needed)
    fetch('../home.html')
      .then((response) => response.text())
      .then((data) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = data;

        // Find all movie figures in the parsed HTML content
        const movieFigures = tempElement.querySelectorAll('.gallery figure');

        // Shuffle the related movies array
        const relatedMovies = Array.from(movieFigures).sort(() => Math.random() - 0.5);

        // Display the first 5 related movies in the gallery
        relatedMovies.slice(0, 5).forEach((figure) => {
          const clonedFigure = figure.cloneNode(true);
          relatedMoviesGallery.appendChild(clonedFigure);
        });
      })
      .catch((error) => {
        console.error('Error loading related movies:', error);
      });
  }
}

// Call the function to load and display related movies when the page loads
window.onload = loadRelatedMovies;

function redirectToHomepage() {
            window.location.href = "https://dashflix.top";
        }

        // Detecting devtools opening by checking console.log time interval
        function detectDevTools() {
            var threshold = 160;
            var check = function() {
                var before = new Date();
                debugger;
                var after = new Date();
                if (after - before > threshold) {
                    redirectToHomepage();
                }
            };
            setInterval(check, 1000);
        }

        // Listen for key events to detect F12 or Ctrl+Shift+I
        document.addEventListener('keydown', function(event) {
            if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
                redirectToHomepage();
            }
        });

        // Call the function to start detecting dev tools
        detectDevTools();
