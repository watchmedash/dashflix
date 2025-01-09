fetch('moodle.json')
  .then(response => response.json())
  .then(data => {
    const randomJoke = data[Math.floor(Math.random() * data.length)].joke;

    const moodleOverlay = document.createElement("div");
    moodleOverlay.innerHTML = `
      <div class="moodle-overlay active" id="moodleOverlay">
        <div class="moodle">
          <img src="https://i.postimg.cc/FRX482pk/dad.png" alt="Landscape">
          <div class="content">
            <p>${randomJoke}</p>
            <button class="close-button" id="closeMoodle">Close</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(moodleOverlay);

    const closeMoodle = document.getElementById("closeMoodle");
    const overlay = document.getElementById("moodleOverlay");

    closeMoodle.addEventListener("click", () => {
      overlay.classList.remove("active");
    });
  })
  .catch(error => console.error('Error loading moodle.json:', error));
