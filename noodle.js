document.addEventListener("DOMContentLoaded", () => {
  // noodle elements
  const noodleOverlay = document.createElement("div");
  noodleOverlay.innerHTML = `
    <div class="noodle-overlay active" id="noodleOverlay">
      <div class="noodle">
        <button class="klose-icon" id="closenoodle">&times;</button>
        <img src="https://i.postimg.cc/MGX9QPK1/update.webp" alt="Landscape">
        <div class="content">
        <h2>Breaking News!</h2>
<p>Apparently, brains are for thinking. Who knew? Try it sometime!</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(noodleOverlay);

  const closenoodle = document.getElementById("closenoodle");
  const overlay = document.getElementById("noodleOverlay");

  closenoodle.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
});
