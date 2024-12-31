document.addEventListener("DOMContentLoaded", () => {
  // Create noodle elements
  const noodleOverlay = document.createElement("div");
  noodleOverlay.innerHTML = `
    <div class="noodle-overlay active" id="noodleOverlay">
      <div class="noodle">
        <img src="https://i.postimg.cc/MGX9QPK1/update.webp" alt="Landscape">
        <div class="content">
          <h2>Breaking News!</h2>
          <p>Apparently, brains are for thinking. Who knew? Try it sometime!</p>
          <button class="close-button" id="closeNoodle">Close</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(noodleOverlay);

  // Get close button and overlay elements
  const closeNoodle = document.getElementById("closeNoodle");
  const overlay = document.getElementById("noodleOverlay");

  // Close the modal when the button is clicked
  closeNoodle.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
});
