document.addEventListener("DOMContentLoaded", () => {
  // Create noodle elements
  const noodleOverlay = document.createElement("div");
  noodleOverlay.innerHTML = `
    <div class="noodle-overlay active" id="noodleOverlay">
      <div class="noodle">
        <img src="https://i.postimg.cc/cCZSjMrN/Screenshot-2025-01-17-051945.png" alt="Landscape">
        <div class="content">
          <!--<h1>Visit our Website!</h1>-->
        <p>Visit our website at dashflix.top on your preferred device.</p>
          <button class="close-button" id="closeNoodle">Close</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(noodleOverlay);
  const closeNoodle = document.getElementById("closeNoodle");
  const overlay = document.getElementById("noodleOverlay");

  closeNoodle.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
});
