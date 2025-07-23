const fallbackQuotes = [
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "Why don't scientists trust atoms? Because they make up everything!",
    "I haven't slept for ten days, because that would be too long.",
    "I'm on a seafood diet. I see food and I eat it."
  ];

  let quotes = [];

  async function loadQuotes() {
    try {
      const response = await fetch('quotes.json');
      if (response.ok) {
        const data = await response.json();
        quotes = data.quotes || fallbackQuotes;
      } else {
        quotes = fallbackQuotes;
      }
    } catch {
      quotes = fallbackQuotes;
    }

    getNewQuote();
    setInterval(getNewQuote, 15000);
  }

  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  function getNewQuote() {
    const quoteElement = document.getElementById('quoteText');
    const quoteBox = document.querySelector('.quotes-box');

    quoteBox.classList.add('loading');
    quoteElement.style.opacity = '0';
    quoteElement.style.transform = 'translateY(10px)';

    setTimeout(() => {
      quoteElement.textContent = getRandomQuote();
      quoteElement.style.opacity = '1';
      quoteElement.style.transform = 'translateY(0)';
      quoteBox.classList.remove('loading');
    }, 200);
  }

  document.addEventListener('DOMContentLoaded', loadQuotes);
