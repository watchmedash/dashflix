const channelList = document.querySelector(".channel-list");
const video = document.querySelector("#player");
const nowPlayingTitle = document.querySelector("#channel-playing");
let channelsData = [];

function renderChannels(channels) {
  channelList.innerHTML = "";
  channels.forEach((channel) => {
    const markup = `
      <li class="channel">
        <div class="handle">☰</div>
        <button class="play-channel" title="${channel.title}" data-m3u8="${channel.url}">
          <img class="channel-poster" src="${channel.image}">
        </button>
        <div class="channel-info">
          <a href="#" class="channel-title" data-url="${channel.url}">${channel.title}</a>
          <div class="channel-language">${channel.language}</div>
        </div>
      </li>`;
    channelList.insertAdjacentHTML("beforeend", markup);
  });
  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll(".play-channel").forEach((channelPlay) => {
    channelPlay.addEventListener("click", () => loadStream(channelPlay));
  });
  document.querySelectorAll(".channel-title").forEach((channelTitle) => {
    channelTitle.addEventListener("click", (e) => {
      e.preventDefault();
      const channelPlay = channelTitle.closest(".channel").querySelector(".play-channel");
      loadStream(channelPlay);
    });
  });
}

function loadStream(channelPlay) {
  document.querySelectorAll(".channel").forEach((channel) => {
    channel.dataset.playing = "false";
  });
  const url = channelPlay.dataset.m3u8 || channelPlay.querySelector(".channel-title").dataset.url;
  const parent = channelPlay.closest("li");
  const title = parent.querySelector(".channel-title").textContent;
  parent.dataset.playing = "true";
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play();
      nowPlayingTitle.textContent = title;
      video.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

fetch("channels.json")
  .then((response) => response.json())
  .then((data) => {
    channelsData = data;
    renderChannels(channelsData);
  })
  .catch((error) => console.error("Error loading channels:", error));

const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredChannels = channelsData.filter((channel) => {
    return channel.title.toLowerCase().includes(searchTerm) || channel.language.toLowerCase().includes(searchTerm);
  });
  renderChannels(filteredChannels);
});
