document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loaning-screen');
    const progressBar = document.querySelector('.progress-bar .progress');
    const loadingImage = document.querySelector('#loaning-screen img');

    // Start progress bar animation
    progressBar.style.transition = 'width 1s linear'; // Ensure smooth animation
    progressBar.style.width = '100%'; // Fill the bar within 1 second

    // Ensure the loading screen disappears after exactly 1 second
    setTimeout(() => {
        loadingImage.style.animation = 'none'; // Stop pulsing animation
        loadingScreen.style.opacity = '0'; // Begin fade-out transition
        setTimeout(() => {
            loadingScreen.style.display = 'none'; // Fully hide after fade-out
        }, 1000); // Match fade-out duration
    }, 1000); // 1-second timer starts immediately
});
