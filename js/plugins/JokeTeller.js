/*:
 * @plugindesc Tells a random joke from jokes.json and splits it cleanly into message chunks.
 */

var JokeTeller = JokeTeller || {};

JokeTeller.tellJoke = function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "data/jokes.json", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var jokes = JSON.parse(xhr.responseText).quotes;
      var randomIndex = Math.floor(Math.random() * jokes.length);
      var joke = jokes[randomIndex];

      var words = joke.split(' ');
      var lines = [];
      var currentLine = '';

      for (let i = 0; i < words.length; i++) {
        if ((currentLine + words[i]).length <= 20) {
          currentLine += words[i] + ' ';
        } else {
          lines.push(currentLine.trim());
          currentLine = words[i] + ' ';
        }
      }
      if (currentLine.trim() !== '') lines.push(currentLine.trim());

      let index = 0;
      let showNext = function() {
        if (index < lines.length) {
          $gameMessage.add(lines[index]);
          index++;
          const wait = setInterval(() => {
            if (!$gameMessage.isBusy()) {
              clearInterval(wait);
              showNext();
            }
          }, 100);
        }
      };
      showNext();
    }
  };
  xhr.send();
};
