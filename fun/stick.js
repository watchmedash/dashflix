const chat = document.getElementById("chat");
const nextJokeButton = document.getElementById("next-joke");
const loading = document.getElementById("loading");

// Fetch jokes from JSON file
async function fetchJokes() {
  const response = await fetch("jokes.json");
  return response.json();
}

// Display random joke with 3 stages: question, response, punchline
async function displayRandomJoke() {
  // Show loading spinner
  loading.classList.remove("hidden");

  // Fetch jokes
  const jokes = await fetchJokes();
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  // Show the question (stage 1)
  chat.innerHTML = `<div class="message sender">${randomJoke.question}</div>`;

  // Simulate a brief pause before showing the response (stage 2)
  setTimeout(() => {
    const response = randomJoke.response; // Use the response from the JSON
    chat.innerHTML += `<div class="message receiver">${response}</div>`;
  }, 1000);  // Adjust the timing for the response

  // Show the punchline (stage 3) after the response
  setTimeout(() => {
    chat.innerHTML += `<div class="message sender">${randomJoke.answer}</div>`;

    // Hide the spinner after loading the joke
    loading.classList.add("hidden");
  }, 2000);  // Adjust the timing for the punchline
}

// Add event listener for next joke button
nextJokeButton.addEventListener("click", displayRandomJoke);

// Ensure no spinner on page load
document.addEventListener('DOMContentLoaded', () => {
  // Display a joke immediately after the page loads
  displayRandomJoke();

  // Hide the spinner on initial load
  loading.classList.add("hidden");
});
