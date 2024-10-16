const channelData = [
  {
    title: "The Wild Robot",
    url: "https://vidsrc.me/embed/movie/tt29623480",
    image: "https://image.tmdb.org/t/p/original/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg",
    language: "HD"
  },
  {
    title: "Alien Romulus",
    url: "https://vidsrc.me/embed/movie/tt18412256",
    image: "https://image.tmdb.org/t/p/original/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    language: "HD"
  },
  // Add more channels here if needed
];

const channelList = document.querySelector(".channel-list");
channelData.forEach((channel) => {
  const markup = `<li class="channel">
      <div class="handle">☰</div>
      <button class="play-channel" title="${channel.title}" data-url="${channel.url}">
        <img class="channel-poster" src="${channel.image}">
      </button>
      <div class="channel-info">
        <div class="channel-title">${channel.title}</div>
        <div class="channel-language">${channel.language}</div>
       </div>
    </li>`;
  channelList.insertAdjacentHTML("beforeend", markup);
});

const video = document.querySelector("#player");
const channelPlays = document.querySelectorAll(".play-channel");
const nowPlayingTitle = document.querySelector("#channel-playing");

function loadStream(channelPlay) {
  const url = channelPlay.dataset.url; // Get the URL from the button's data attribute
  const parent = channelPlay.closest("li"); // Get the closest parent <li> element
  const title = parent.querySelector(".channel-title").textContent; // Now correctly find the title

  video.src = url; // Set iframe source to embed link
  nowPlayingTitle.textContent = title; // Set the currently playing title
}

channelPlays.forEach((channelPlay) => {
  channelPlay.addEventListener("click", (e) => {
    loadStream(channelPlay); // Load the video when the button is clicked
  });
});

// Load the first channel by default
loadStream(channelPlays[0]);
