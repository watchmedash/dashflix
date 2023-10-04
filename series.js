const videoContainers = document.querySelectorAll('.video-container');
const episodeTabs = document.querySelectorAll('.episode-tab');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

let currentVideoIndex = 0;

// Function to show/hide videos based on index
function showVideo(index) {
    videoContainers.forEach((container, i) => {
        if (i === index) {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    });
}

// Load initial video
showVideo(currentVideoIndex);

// Event listeners for episode tabs
episodeTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        currentVideoIndex = index;
        showVideo(currentVideoIndex);
    });
});
