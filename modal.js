let tmdbIDs = [
    385687,
    1330409
];
const baseURL = 'https://vidsrc.xyz/embed/movie/';

let currentIndex = 0;

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
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
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
