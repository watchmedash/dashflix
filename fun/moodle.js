let jokes = [];
let currentIndex = 0;

async function fetchJokes() {
    try {
        const response = await fetch("moodle.json");
        jokes = await response.json();
        showRandomJoke();
    } catch (error) {
        console.error("Error loading jokes:", error);
        document.getElementById("joke-container").innerText = "Failed to load jokes.";
    }
}

function renderJoke(index) {
    const jokeContainer = document.getElementById("joke-container");
    const joke = jokes[index].joke;

    // Check if the joke has a question mark to split, otherwise treat it as a single statement
    const [setup, punchline] = joke.includes("?") ? joke.split("? ") : [joke, ""];

    // If there's a punchline, display it in a spoiler, otherwise just the setup
    const formattedJoke = punchline
        ? `${setup}? <span class="spoiler" onclick="revealSpoiler(this)">${punchline}</span>`
        : setup;

    jokeContainer.innerHTML = formattedJoke;

    // Update button states
    document.getElementById("prev").disabled = index === 0;
    document.getElementById("next").disabled = index === jokes.length - 1;
}

function revealSpoiler(spoilerElement) {
    spoilerElement.classList.add("revealed");
}

function showRandomJoke() {
    currentIndex = Math.floor(Math.random() * jokes.length);
    renderJoke(currentIndex);
}

document.getElementById("prev").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex -= 1;
        renderJoke(currentIndex);
    }
});

document.getElementById("next").addEventListener("click", () => {
    if (currentIndex < jokes.length - 1) {
        currentIndex += 1;
        renderJoke(currentIndex);
    }
});

// Load jokes on page load
fetchJokes();
