const API_KEY = '4f599baa15d072c9de346b2816a131b8';
const searchInput = document.getElementById('search');
    const searchResultsDiv = document.getElementById('searchResults');
    const resultsList = searchResultsDiv.querySelector('ul');
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      performSearch();
    });

    searchInput.addEventListener('input', function() {
      if (searchInput.value.trim().length < 3) {
        searchResultsDiv.style.display = 'none';
        resultsList.innerHTML = '';
        return;
      }
      performSearch();
    });

    function performSearch() {
      const query = searchInput.value.trim();
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
          resultsList.innerHTML = '';
          if (data.results && data.results.length > 0) {
            data.results.forEach(movie => {
              const li = document.createElement('li');
              const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '';
              if (posterUrl) {
                const img = document.createElement('img');
                img.src = posterUrl;
                img.alt = movie.title;
                li.appendChild(img);
              }
              const a = document.createElement('a');
              a.href = `player.html?id=${movie.id}`;
              a.textContent = movie.title;
              li.appendChild(a);
              resultsList.appendChild(li);
            });
            searchResultsDiv.style.display = 'block';
          } else {
            resultsList.innerHTML = '<p>No results found</p>';
            searchResultsDiv.style.display = 'block';
          }
        })
        .catch(error => console.error('Error:', error));
    }
