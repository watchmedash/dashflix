document.addEventListener("DOMContentLoaded", () => {
  // Check session storage to see if modal has already been shown
  if (!sessionStorage.getItem("noodleShown")) {
    // Create noodle elements (warning message instead of image)
    const noodleOverlay = document.createElement("div");
    noodleOverlay.innerHTML = `
      <div class="moodle-overlay active" id="noodleOverlay">
        <div class="moodle">
          <div class="content">
          <p><strong>DashFlix.com is not our website</strong>. Our official site is <strong>DashFlix.top</strong>. Be sure to bookmark the correct link!</p>
            <button class="close-button disabled-button" id="closeNoodle" disabled>Close (5)</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(noodleOverlay);

    const closeNoodle = document.getElementById("closeNoodle");
    const overlay = document.getElementById("noodleOverlay");

    // Start countdown for the button
    let countdown = 5; // 5 seconds
    const countdownInterval = setInterval(() => {
      countdown -= 1;
      closeNoodle.textContent = `Close (${countdown})`;
      if (countdown === 0) {
        clearInterval(countdownInterval);
        closeNoodle.textContent = "Close";
        closeNoodle.disabled = false; // Enable the button
        closeNoodle.classList.remove("disabled-button"); // Remove disabled styling
      }
    }, 1000);

    // Add click event listener for the close button
    closeNoodle.addEventListener("click", () => {
      overlay.classList.remove("active");
      // Save to session storage that modal has been shown
      sessionStorage.setItem("noodleShown", "true");
    });
  }
});
