
window.onload = function() {
  // Function to set the referrer URL in the browser's history
  function setReferrerUrl() {
    var referrerUrl = document.referrer || 'home.html'; // Default to home.html if no referrer is available
    var destinationUrl = getDestinationUrl(); // Get the dynamically set destination URL
    // Check if the referrer is the dynamically set destination URL, if so, set it to 'home.html'
    if (referrerUrl.includes(destinationUrl)) {
      referrerUrl = 'home.html';
    }
    window.history.pushState(null, '', referrerUrl);
  }

  // Countdown timer function
  function countdown() {
    var seconds = 5; // Adjust the countdown duration here
    var countdownElement = document.getElementById('countdown');
    var linkElement = document.getElementById('link');

    var timer = setInterval(function () {
      countdownElement.textContent = 'Redirecting in ' + seconds + ' seconds...';
      seconds--;

      if (seconds === 1) {
        linkElement.style.display = 'block'; // Show the link after 10 seconds
      }

      if (seconds < 0) {
        clearInterval(timer);
        // Redirect to the dynamically set URL
        var destinationUrl = getDestinationUrl();
        window.location.href = destinationUrl;
      }
    }, 1000);
  }

  // Function to get the destination URL from query parameters
  function getDestinationUrl() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var destinationUrl = urlParams.get('url');

    // Default to a specific URL if the query parameter is not set
    if (!destinationUrl) {
      destinationUrl = 'home.html';
    }

    return destinationUrl;
  }

  // Start the countdown when the page loads
  countdown();

  // Get the query parameter from the URL
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var destinationUrl = urlParams.get('url');

  // If a valid destination URL is provided, update the redirection
  if (destinationUrl) {
    document.querySelector('meta[http-equiv="refresh"]').setAttribute('content', '15;url=' + destinationUrl);
  }

  // Select the <p> elements
  var messageElement = document.querySelector('#message');
  var linkElement = document.querySelector('#link');

  // Update the content if a valid destination URL is provided
  if (destinationUrl) {
    messageElement.textContent = 'Please wait while you are being redirected to the actual page.';
    linkElement.innerHTML = 'If you are not redirected, <a href="' + destinationUrl + '" style="color: white; font-family: \'Exo 2\', sans-serif;">go home</a>.';
  }
};
