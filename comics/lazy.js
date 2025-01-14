document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('img[data-src]');

    images.forEach(img => {
        const spinner = img.previousElementSibling;

        img.onload = () => {
            spinner.style.display = 'none';
            img.src = img.dataset.src;
        };

        img.onerror = () => {
            spinner.style.display = 'none';
        };

        spinner.style.display = 'block';
    });
});
