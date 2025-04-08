const container = document.getElementById('trending-container');
const tmdbApiKey = '4f599baa15d072c9de346b2816a131b8';
const trendingWrapper = document.querySelector('.trending-wrapper');

fetch('trending.json')
  .then(res => res.json())
  .then(async (trending) => {
    const items = await Promise.all(trending.map(async (item, index) => {
      const type = item.type === 'movie' ? 'movie' : 'tv';
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${item.id}?api_key=${tmdbApiKey}`);
      const data = await res.json();
      return {
        id: item.id,
        type: item.type,
        poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        title: item.type === 'movie' ? data.title : data.name,
        rank: index + 1
      };
    }));

    items.forEach(item => {
      const link = item.type === 'movie' ? `player.html?id=${item.id}` : `players.html?id=${item.id}`;
      const card = document.createElement('a');
      card.href = link;
      card.className = 'trending-card';
      card.innerHTML = `
        <span class="rank-badge">${item.rank}</span>
        <img src="${item.poster}" alt="${item.title}" loading="lazy">
        <span class="media-type">${item.type === 'movie' ? 'Movie' : 'TV Show'}</span>
      `;
      container.appendChild(card);
    });
  });

document.querySelector('.scroll-btn.left').addEventListener('click', () => {
  container.scrollBy({ left: -400, behavior: 'smooth' });
});

document.querySelector('.scroll-btn.right').addEventListener('click', () => {
  container.scrollBy({ left: 400, behavior: 'smooth' });
});
