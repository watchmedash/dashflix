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

    const [setup, punchline] = joke.includes("?") ? joke.split("? ") : [joke, ""];

    const formattedJoke = punchline
        ? `${setup}? <span class="spoiler" onclick="revealSpoiler(this)">${punchline}</span>`
        : setup;

    jokeContainer.innerHTML = formattedJoke;
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
    } else {
        currentIndex = jokes.length - 1;
    }
    renderJoke(currentIndex);
});

document.getElementById("next").addEventListener("click", () => {
    if (currentIndex < jokes.length - 1) {
        currentIndex += 1;
    } else {
        currentIndex = 0;
    }
    renderJoke(currentIndex);
});

fetchJokes();
