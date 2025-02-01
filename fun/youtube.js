let videosData = [];

document.addEventListener("DOMContentLoaded", function() {
    fetch("youtube.json")
        .then(response => response.json())
        .then(data => {
            videosData = data;
            loadVideos(videosData);
        })
        .catch(error => console.error("Error loading videos:", error));
});

function loadVideos(videos) {
    const videoGrid = document.getElementById("video-grid");
    videoGrid.innerHTML = "";

    if (videos.length === 0) {
        videoGrid.innerHTML = "<p class='no-results'>No videos found.</p>";
        return;
    }

    videos.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.className = "video-card";
        videoCard.onclick = () => openVideo(video.url);

        videoCard.innerHTML = `
            <img src="${video.thumbnail}" alt="Video Thumbnail">
            <h2>${video.title}</h2>
        `;

        videoGrid.appendChild(videoCard);
    });
}

function openVideo(url) {
    document.getElementById("video-frame").src = url;
    document.getElementById("video-modal").style.display = "flex";
}

function closeVideo() {
    document.getElementById("video-modal").style.display = "none";
    document.getElementById("video-frame").src = "";
}

function searchVideos() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filteredVideos = videosData.filter(video =>
        video.title.toLowerCase().includes(searchTerm)
    );
    loadVideos(filteredVideos);
}
