async function loadChannelData() {
  try {
    const files = ['movie1.json', 'movie2.json', 'movie3.json', 'movie4.json', 'movie5.json']; // List of JSON files
    const dataPromises = files.map(file => fetch(file).then(response => response.json()));
    const channelDataArrays = await Promise.all(dataPromises);  // Fetch and parse all files
    const channelData = channelDataArrays.flat();  // Flatten arrays into a single array
    renderChannels(channelData);  // Render the combined data
  } catch (error) {
    console.error('Error loading channel data:', error);
  }
}

// Function to render the channels on the page
function renderChannels(channelData) {
  const channelList = document.querySelector(".channel-list");
  channelList.innerHTML = "";  // Clear any existing content

  channelData.forEach((channel) => {
    const markup = `<li class="channel">
      <div class="handle">☰</div>
      <button class="play-channel" title="${channel.title}" data-url="${channel.url}">
        <img class="channel-poster" src="${channel.image}">
      </button>
      <div class="channel-info">
        <div class="channel-title" data-url="${channel.url}">${channel.title}</div> <!-- Add data-url to title -->
        <div class="channel-language">${channel.language}</div>
      </div>
    </li>`;
    channelList.insertAdjacentHTML("beforeend", markup);
  });

  // Set up the event listeners for each play button and title
  const channelPlays = document.querySelectorAll(".play-channel");
  const channelTitles = document.querySelectorAll(".channel-title");

  channelPlays.forEach((channelPlay) => {
    channelPlay.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent bubbling to title click
      loadStream(channelPlay); // Load the video when the button is clicked
    });
  });

  channelTitles.forEach((channelTitle) => {
    channelTitle.addEventListener("click", () => {
      loadStream(channelTitle); // Load the video when the title is clicked
    });
  });

  // Load the first channel by default
  if (channelPlays.length > 0) {
    loadStream(channelPlays[0]);
  }
}

// Function to load the stream into the video player
function loadStream(channelPlay) {
  const url = channelPlay.dataset.url || channelPlay.getAttribute('data-url'); // Get the URL
  const parent = channelPlay.closest("li"); // Get the closest parent <li> element
  const title = parent.querySelector(".channel-title").textContent; // Find the title

  const video = document.querySelector("#player");
  const nowPlayingTitle = document.querySelector("#channel-playing");

  video.src = url; // Set iframe source to embed link
  nowPlayingTitle.textContent = title; // Set the currently playing title

  // Scroll back to the player
  video.scrollIntoView({ behavior: "smooth" });
}

// Load the channel data when the page loads
loadChannelData();
