document.getElementById('navSearchInput').addEventListener('input', async function () {
  const query = this.value.trim();
  const resultsBox = document.getElementById('navSearchResults');

  if (query.length === 0) {
    resultsBox.style.display = 'none';
    resultsBox.innerHTML = '<p>No results found</p>';
    return;
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=4f599baa15d072c9de346b2816a131b8&query=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.results.length === 0) {
      resultsBox.innerHTML = '<p>No results found</p>';
    } else {
      const results = data.results.slice(0, 5).map(item => {
        const title = item.title || item.name || 'Untitled';
        const id = item.id;
        const poster = item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : '';
        const type = item.media_type === 'tv' ? 'show' : 'movie';
        const link = type === 'movie' ? `player.html?id=${id}` : `players.html?id=${id}`;

        return `
          <li>
            ${poster ? `<img src="${poster}" alt="${title}" />` : ''}
            <a href="${link}">${title}</a>
          </li>`;
      }).join('');
      resultsBox.innerHTML = `<ul>${results}</ul>`;
    }

    resultsBox.style.display = 'block';
  } catch (error) {
    resultsBox.innerHTML = '<p>Error loading results</p>';
    resultsBox.style.display = 'block';
  }
});

document.getElementById('navSearchToggle').addEventListener('click', function (e) {
  e.preventDefault();

  const searchBox = document.getElementById('navSearchContainer');
  const overlay = document.getElementById('navSearchOverlay');
  const input = document.getElementById('navSearchInput');
  const resultsBox = document.getElementById('navSearchResults');

  if (searchBox.style.display === 'block') {
    searchBox.style.display = 'none';
    overlay.style.display = 'none';
    input.value = '';
    resultsBox.style.display = 'none';
  } else {
    searchBox.style.display = 'block';
    overlay.style.display = 'block';
    input.focus();
  }
});

// Close search if user clicks on the overlay
document.getElementById('navSearchOverlay').addEventListener('click', function () {
  document.getElementById('navSearchContainer').style.display = 'none';
  document.getElementById('navSearchOverlay').style.display = 'none';
  document.getElementById('navSearchInput').value = '';
  document.getElementById('navSearchResults').style.display = 'none';
});
