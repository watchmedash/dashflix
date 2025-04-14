document.addEventListener("DOMContentLoaded", async () => {
    const playBtn = document.getElementById("play-trailer-btn");
    const modal = document.getElementById("trailer-modal");
    const iframe = document.getElementById("trailer-video");
    const closeBtn = document.getElementById("close-trailer");

    const params = new URLSearchParams(window.location.search);
    const showId = params.get("id");

    let trailerKey = null;

    // Fetch TV show trailer
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${showId}/videos?api_key=4f599baa15d072c9de346b2816a131b8`);
        const data = await response.json();
        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) {
            trailerKey = trailer.key;
            playBtn.style.display = "inline-block";
        } else {
            playBtn.style.display = "none";
        }
    } catch (error) {
        console.error("Failed to load trailer:", error);
        playBtn.style.display = "none";
    }

    playBtn.addEventListener("click", () => {
        if (trailerKey) {
            iframe.src = `https://www.youtube.com/embed/${trailerKey}?autoplay=1`;
            modal.style.display = "flex";
        }
    });

    closeBtn.addEventListener("click", () => {
        iframe.src = "";
        modal.style.display = "none";
    });

    // Optional: Close modal on click outside
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            iframe.src = "";
            modal.style.display = "none";
        }
    });
});
