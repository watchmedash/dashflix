const snowContainer = document.createElement('div');
snowContainer.className = 'snow-container';
document.body.appendChild(snowContainer);

// Function to create snowflakes
function createSnowflakes(num) {
  for (let i = 0; i < num; i++) {
    setTimeout(() => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';

      // Randomize size and horizontal start position
      const size = Math.random() * 3 + 2 + 'px'; // Snowflake size between 2px and 5px
      const startX = Math.random() * 100 + 'vw'; // Random horizontal position

      snowflake.style.left = startX; // Set the snowflake initial horizontal position
      snowflake.style.width = size; // Set the snowflake width
      snowflake.style.height = size; // Set the snowflake height

      // Reduce fall speed (increase duration)
      const duration = Math.random() * 7 + 7 + 's'; // Random fall speed between 5s and 10s
      snowflake.style.animationDuration = duration; // Set fall duration

      // Adjust animation duration for horizontal wind effect
      snowflake.style.animationTimingFunction = `linear`; // Continuous wind effect

      // Append snowflake to the container
      snowContainer.appendChild(snowflake);

      // Remove the snowflake after it falls
      snowflake.addEventListener('animationend', () => {
        snowflake.remove();
      });
    }, i * 400); // Staggered start (300ms delay per snowflake)
  }
}

// Wait for the page to load before creating snowflakes
window.addEventListener('load', () => {
  createSnowflakes(22); // Create 30 snowflakes
});
