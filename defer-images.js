function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function loadImages() {
    const imagesToLoad = document.querySelectorAll('.defer-image');

    imagesToLoad.forEach((image) => {
        if (isInViewport(image)) {
            const imgUrl = image.getAttribute('data-src');
            if (imgUrl) {
                const img = new Image();
                img.src = imgUrl;
                img.onload = () => {
                    image.setAttribute('src', imgUrl);
                    image.classList.remove('defer-image');
                };
            }
        }
    });
}

window.addEventListener('scroll', loadImages);
window.addEventListener('resize', loadImages);

loadImages();
