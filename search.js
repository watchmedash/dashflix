const API_KEY = '4f599baa15d072c9de346b2816a131b8';
const searchInput = document.getElementById('search');
    const searchResultsDiv = document.getElementById('searchResults');
    const resultsList = searchResultsDiv.querySelector('ul');
    const searchForm = document.getElementById('searchForm');

    function performSearch() {
      const query = searchInput.value.trim();
      if(query.length < 3){
        resultsList.innerHTML = '';
        searchResultsDiv.style.display = 'none';
        return;
      }
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
          resultsList.innerHTML = '';
          // Filter out any result that is not a movie or tv show
          const filteredResults = data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');
          if (filteredResults.length > 0) {
            filteredResults.forEach(item => {
              const li = document.createElement('li');
              const posterUrl = item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : '';
              if (posterUrl) {
                const img = document.createElement('img');
                img.src = posterUrl;
                img.alt = item.title || item.name;
                li.appendChild(img);
              }
              const a = document.createElement('a');
              a.href = item.media_type === 'tv'
                ? `players.html?id=${item.id}`
                : `player.html?id=${item.id}`;
              a.textContent = item.title || item.name;
              li.appendChild(a);
              resultsList.appendChild(li);
            });
            searchResultsDiv.style.display = 'block';
          } else {
            resultsList.innerHTML = '<p>No results found</p>';
            searchResultsDiv.style.display = 'block';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          resultsList.innerHTML = '<p>Error fetching results</p>';
          searchResultsDiv.style.display = 'block';
        });
    }

    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      performSearch();
    });

    searchInput.addEventListener('input', function() {
      performSearch();
    });

    document.addEventListener('click', function(e) {
      if (!document.querySelector('.search-container').contains(e.target)) {
        searchResultsDiv.style.display = 'none';
      }
    });
