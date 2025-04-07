let postsData = [];
let filteredPosts = [];
const postsPerPage = 12;
let currentPage = 1;
let allTags = [];

function displayPosts() {
  const postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = '';

  localStorage.setItem('currentPage', currentPage);

  if (filteredPosts.length === 0) {
    postsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  currentPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    postElement.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="post-content">
        <h2><a href="${post.link}">${post.title}</a></h2>
        <p>${post.snippet}</p>
      </div>
    `;

    postsContainer.appendChild(postElement);
  });

  // Lazyload handling
  const lazyImages = document.querySelectorAll('img.lazyload');
  lazyImages.forEach(img => {
    img.addEventListener('load', () => {
      img.previousElementSibling.style.display = 'none';
    });

    img.src = img.getAttribute('data-src');
    img.removeAttribute('data-src');
  });

  createPagination();
}

function createPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  if (filteredPosts.length === 0) {
    return;
  }

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const visibleButtons = 3;

  if (currentPage > 1) {
    const firstButton = document.createElement('button');
    firstButton.textContent = '<<';
    firstButton.classList.add('pagination-btn');
    firstButton.addEventListener('click', () => {
      currentPage = 1;
      displayPosts();
      createPagination();
    });
    pagination.appendChild(firstButton);

    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.classList.add('pagination-btn');
    prevButton.addEventListener('click', () => {
      currentPage -= 1;
      displayPosts();
      createPagination();
    });
    pagination.appendChild(prevButton);
  }

  let startPage = Math.max(1, currentPage - Math.floor(visibleButtons / 2));
  let endPage = Math.min(totalPages, startPage + visibleButtons - 1);
  if (endPage - startPage < visibleButtons - 1) {
    startPage = Math.max(1, endPage - visibleButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.classList.add('pagination-btn');
    if (i === currentPage) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      currentPage = i;
      displayPosts();
      createPagination();
    });
    pagination.appendChild(button);
  }

  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.classList.add('pagination-btn');
    nextButton.addEventListener('click', () => {
      currentPage += 1;
      displayPosts();
      createPagination();
    });
    pagination.appendChild(nextButton);

    const lastButton = document.createElement('button');
    lastButton.textContent = '>>';
    lastButton.classList.add('pagination-btn');
    lastButton.addEventListener('click', () => {
      currentPage = totalPages;
      displayPosts();
      createPagination();
    });
    pagination.appendChild(lastButton);
  }
}

function searchPosts(searchTerm) {
  const term = searchTerm.trim().toLowerCase();
  if (!term) {
    filteredPosts = postsData;
  } else {
    filteredPosts = postsData.filter(post =>
      post.title && post.title.toLowerCase().includes(term)
    );
  }

  currentPage = 1;
  displayPosts();
  createPagination();
}

function filterByTag(tag) {
  filteredPosts = postsData.filter(post => post.tag === tag);
  currentPage = 1;
  displayPosts();
  createPagination();
}

function showAllPosts() {
  filteredPosts = postsData;
  currentPage = 1;
  displayPosts();
  createPagination();
}

function createTagFilter() {
  const tagContainer = document.getElementById('tag-filter');
  tagContainer.innerHTML = '';

  const showAllOption = document.createElement('option');
  showAllOption.value = 'all';
  showAllOption.textContent = 'Show All';
  tagContainer.appendChild(showAllOption);

  allTags.forEach(tag => {
    const tagOption = document.createElement('option');
    tagOption.value = tag;
    tagOption.textContent = tag;
    tagContainer.appendChild(tagOption);
  });

  tagContainer.addEventListener('change', (e) => {
    const selectedTag = e.target.value;
    if (selectedTag === 'all') {
      showAllPosts();
    } else {
      filterByTag(selectedTag);
    }
  });
}

fetch('blog.json')
  .then(response => response.json())
  .then(data => {
    postsData = data;
    filteredPosts = postsData;

    const savedPage = localStorage.getItem('currentPage');
    currentPage = savedPage ? parseInt(savedPage, 10) : 1;

    allTags = [...new Set(postsData.map(post => post.tag))];

    createTagFilter();
    displayPosts();
    createPagination();
  })
  .catch(error => {
    console.error('Error loading pages.json:', error);
  });

document.getElementById('search-input').addEventListener('input', (e) => {
  searchPosts(e.target.value);
});
