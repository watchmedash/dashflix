const MAIN = document.getElementById('main-content');
const SEARCH = document.getElementById('search');

const COLLECTIONS = [
  {
    key: 'req.json',
    title: "General",
    icon: '<i class="fas fa-film"></i>'
  },
  {
    key: 'music.json',
    title: "Music",
    icon: '<i class="fas fa-music"></i>'
  }
];

let VIDEO_DATA = [];
let CURRENT_INDEX = 0;

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#39;'
  })[m]);
}

function renderGrid(videos) {
  const html = `<div class="grid">` + videos.map((v, i) => `
      <div class="card" style="position:relative;">
        <iframe class="thumb" src="${v.url}?rel=0&controls=0&showinfo=0" frameborder="0" allowfullscreen loading="lazy"></iframe>
        <div class="thumb-cover" style="
          position:absolute;
          inset:0;
          z-index:2;
          background:transparent;
          cursor:pointer;
        " onclick="openVideo(${i}); event.stopPropagation();"></div>
        <div class="card-info">
          <div class="title">${escapeHtml(v.title)}</div>
          <div class="tags">${v.tags.map(t => `<i class="fa fa-hashtag"></i> ${escapeHtml(t)}`).join(' ')}</div>
        </div>
      </div>
  `).join('') + `</div>`;
  MAIN.innerHTML = html;
}

function goHome() {
  history.pushState({}, '', location.pathname);
  renderGrid(VIDEO_DATA);
  window.scrollTo(0,0);
}

function renderPlayer(idx) {
  const v = VIDEO_DATA[idx];
  const related = VIDEO_DATA
    .map((item, i) => ({ item, i }))
    .filter(ri => ri.i !== idx && ri.item.tags.some(tag => v.tags.includes(tag)))
    .slice(0, 6);

  MAIN.innerHTML = `
    <div class="player-layout">
      <div class="player-main">
      <button class="player-back-btn" onclick="goHome()">
<i class="fas fa-arrow-left"></i> Back
</button>
        <div class="player-box">
          <iframe width="100%" height="100%" src="${v.url}?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="player-title">${escapeHtml(v.title)}</div>
        <div class="player-tags">${v.tags.map(t => `<i class="fa fa-hashtag"></i> ${escapeHtml(t)}`).join(' ')}</div>
      </div>
      <aside class="related">
        <div class="related-title"><i class="fas fa-clone" style="color:var(--accent);"></i> Related videos</div>
        <div class="related-list">
          ${related.map(ri => `
            <div class="related-card" onclick="openVideo(${ri.i})">
              <iframe class="related-thumb" src="${ri.item.url}?rel=0&controls=0&showinfo=0" frameborder="0"></iframe>
              <div class="related-info">
                <div class="title">${escapeHtml(ri.item.title)}</div>
                <div class="tags">${ri.item.tags.map(t => `<i class="fa fa-hashtag"></i> ${escapeHtml(t)}`).join(' ')}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </aside>
    </div>
  `;
  window.scrollTo(0,0);
}

function searchVideos() {
  const q = SEARCH.value.trim().toLowerCase();
  const filtered = VIDEO_DATA.filter(
    v => v.title.toLowerCase().includes(q) ||
         v.tags.some(tag => tag.toLowerCase().includes(q))
  );
  renderGrid(filtered);
}
SEARCH.addEventListener('input', searchVideos);
document.getElementById('search-btn').addEventListener('click', searchVideos);

window.openVideo = function(idx) {
  history.pushState({vid: idx}, '', '#video=' + idx);
  renderPlayer(idx);
}
window.onpopstate = function() {
  if (location.hash.startsWith('#video=')) {
    const idx = parseInt(location.hash.slice(7), 10);
    if (!isNaN(idx) && idx < VIDEO_DATA.length) {
      renderPlayer(idx); return;
    }
  }
  renderGrid(VIDEO_DATA);
};

function setTheme(light) {
  document.body.className = light ? 'light' : '';
  localStorage.setItem('tt_theme', light ? 'light' : 'dark');
}
function toggleTheme() {
  setTheme(!document.body.classList.contains('light'));
  updateThemeBtn();
}
function updateThemeBtn() {
  const btn = document.getElementById('theme-toggle-btn');
  btn.innerHTML = document.body.classList.contains('light')
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
  btn.setAttribute('aria-label',
    document.body.classList.contains('light') ? "Switch to dark mode" : "Switch to light mode"
  );
}

function setCollection(idx) {
  document.activeElement && document.activeElement.blur();
  CURRENT_INDEX = idx;
  location.hash = '';
  loadJsonFile(COLLECTIONS[idx].key);
  updateSlider();
}
function updateSlider() {
  const slider = document.getElementById('slider-toggle');
  slider.innerHTML = COLLECTIONS.map((c, i) =>
    `<button class="slider-option${i==CURRENT_INDEX?' active':''}" onclick="setCollection(${i})" type="button" aria-pressed="${i==CURRENT_INDEX}">
      ${c.icon}
    </button>`
  ).join('');
}

window.setCollection = setCollection;

function createToTopBtn() {
  let btn = document.getElementById('to-top-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'to-top-btn';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.title = 'Go to top';
    btn.onclick = () => window.scrollTo({top:0,behavior:'smooth'});
    document.body.appendChild(btn);
  }
  function toggleBtn() {
    btn.style.display = window.scrollY > 160 ? 'flex' : 'none';
  }
  window.addEventListener('scroll', toggleBtn);
  toggleBtn();
}
createToTopBtn();

// --- LOAD JSON ---
function loadJsonFile(src) {
  fetch(src)
    .then(r => r.json())
    .then(list => {
      VIDEO_DATA = list;
      if (location.hash.startsWith('#video=')) {
        const idx = parseInt(location.hash.slice(7), 10);
        if (!isNaN(idx) && idx < VIDEO_DATA.length) {
          renderPlayer(idx); return;
        }
      }
      renderGrid(VIDEO_DATA);
      SEARCH.value = "";
    });
}

function injectHeaderControls() {
  const controls = document.querySelector('.header-controls');
  if (!document.getElementById('slider-toggle')) {
    const sliderWrap = document.createElement('div');
    sliderWrap.className = 'slider-toggle-container';
    sliderWrap.innerHTML = `<div class="slider-toggle" id="slider-toggle"></div>`;
    controls.appendChild(sliderWrap);
  }
  if (!document.getElementById('theme-toggle-btn')) {
    const tbtn = document.createElement('button');
    tbtn.className = 'theme-toggle';
    tbtn.id = 'theme-toggle-btn';
    tbtn.type = 'button';
    tbtn.onclick = toggleTheme;
    controls.appendChild(tbtn);
    updateThemeBtn();
  }
  updateSlider();
}

window.setCollection = setCollection;
window.toggleTheme = toggleTheme;

setTheme(localStorage.getItem('tt_theme') === 'light');

injectHeaderControls();
setTimeout(createToTopBtn, 100);
loadJsonFile(COLLECTIONS[CURRENT_INDEX].key);
