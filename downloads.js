let allItems = [];
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 50;

const jsonFiles = ['downloads.json', 'downloads1.json'];

Promise.all(jsonFiles.map(file => fetch(file).then(res => res.json())))
.then(results => {
  allItems = results.flat();
  renderItems(currentFilter);
})
.catch(error => {
  document.getElementById('downloadList').innerHTML = "<li>Error loading downloads.</li>";
  console.error('Failed to fetch downloads:', error);
});

function getFilteredItems(filterType) {
  let filtered = filterType === 'all' ? allItems : allItems.filter(item => item.type === filterType);
  const searchQuery = document.getElementById('searchBar')?.value.toLowerCase();
  if (searchQuery) {
    filtered = filtered.filter(item => item.name.toLowerCase().includes(searchQuery));
  }
  return filtered;
}

function renderItems(filterType) {
  currentFilter = filterType;
  const list = document.getElementById('downloadList');
  list.innerHTML = '';

  const filtered = getFilteredItems(filterType);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = filtered.slice(start, end);

  paginatedItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'download-item';
    li.innerHTML = `
      <a class="download-title" href="${item.url}" target="_blank" download>${item.name}</a>
      <a class="download-icon" href="${item.url}" target="_blank" download><i class="fas fa-download"></i></a>
    `;
    list.appendChild(li);
  });

  renderPagination(filtered.length);
}

function renderPagination(totalItems) {
const totalPages = Math.ceil(totalItems / itemsPerPage);
const pagination = document.getElementById('pagination');
pagination.innerHTML = '';

if (totalPages <= 1) return;

const createButton = (text, page, isActive = false, isDisabled = false) => {
  const btn = document.createElement('button');
  btn.textContent = text;
  if (isActive) btn.classList.add('active-page');
  if (isDisabled) {
    btn.disabled = true;
    btn.classList.add('disabled');
  } else {
    btn.onclick = () => {
      currentPage = page;
      renderItems(currentFilter);
    };
  }
  return btn;
};

pagination.appendChild(createButton('«', 1, false, currentPage === 1));
pagination.appendChild(createButton('‹', currentPage - 1, false, currentPage === 1));

const maxVisible = 3;
let start = Math.max(1, currentPage - 1);
let end = Math.min(totalPages, start + maxVisible - 1);

if (start > 1) {
  pagination.appendChild(createButton('1', 1));
  if (start > 2) {
    const dots = document.createElement('span');
    dots.textContent = '...';
    dots.classList.add('pagination-dots');
    pagination.appendChild(dots);
  }
}

for (let i = start; i <= end; i++) {
  pagination.appendChild(createButton(i, i, i === currentPage));
}

if (end < totalPages) {
  if (end < totalPages - 1) {
    const dots = document.createElement('span');
    dots.textContent = '...';
    dots.classList.add('pagination-dots');
    pagination.appendChild(dots);
  }
  pagination.appendChild(createButton(totalPages, totalPages));
}

pagination.appendChild(createButton('›', currentPage + 1, false, currentPage === totalPages));
pagination.appendChild(createButton('»', totalPages, false, currentPage === totalPages));
}

function filterItems(type) {
  currentPage = 1;
  renderItems(type);
  document.querySelectorAll('.filter button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.filter button[onclick*="${type}"]`).classList.add('active');
}

function searchItems() {
  currentPage = 1;
  renderItems(currentFilter);
}
