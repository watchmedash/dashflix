const galleryContainer = document.getElementById('gallery-container');
const movies = document.querySelectorAll('#gallery-container figure');

function refreshGallery() {
    movies.forEach(movie => {
        movie.style.display = 'block';
    }
}

refreshGallery();
