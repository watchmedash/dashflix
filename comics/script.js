document.addEventListener('DOMContentLoaded', () => {
  const itemList = [
    "The Perks of Working in the Black Magic Industry",
    "The Lord of Coins",
    "The Grand Mudang Saga",
    "Kengan Omega",
    "Maybe Meant to Be",
    "Haite Kudasai Takamine San",
    "Undead Unluck",
    "The Hero Returns",
    "Return of the Iron-Blooded Hound",
    "The Dark Magician Transmigrates After 66666 Years",
    "Second Life Ranker",
    "Auto Hunting With My Clones",
    "Solo Leveling",
    "Tentacle Hole",
    "Level 1 Player",
    "Return of the Legendary Spear Knight",
    "Barbarian Quest",
    "Worlds Strongest Troll",
    "The Return of the Disaster-Class Hero",
    "The Undefeatable Swordsman",
    "Regressor Instruction Manual",
    "Killer Peter",
    "Creature Girls - A Hands-On Field Journal in Another World",
    "Yuusha ni Zenbu Ubawareta Ore wa Yuusha",
    "Himekishi ga Classmate",
    "Erotic x Anabolic",
    "Solo Leveling Ragnarok",
    "Return to Player",
    "Destiny Lovers",
    "The Advanced Player of the Tutorial Tower",
    "Reformation of the Deadbeat Noble",
    "Dandadan",
    "Murim Login",
    "The God of High School",
    "Chained Soldier",
    "Rankers Return",
    "Yowa Yowa Sensei",
    "Boruto Two Blue Vortex",
    "Easy Survival in Another World",
    "The Player That Cant Level Up",
    "The Worn and Torn Newbie",
    "Murim RPG Simulation",
    "Volcanic Age",
    "To Not Die",
    "Forest Syrup",
    "Lookism",
    "Jujutsu Kaisen",
    "Tougen Anki",
    "Class 1-9",
    "Chronicles of Heavenly Demon",
    "Wind Breaker",
    "Peerless Dad",
    "Omniscient Reader",
    "Leveling With the Gods",
    "Mercenary Enrollment",
    "Return of the Blossoming Blade",
    "Im the Max-Level Newbie",
    "Pick Me Up Infinite Gacha",
    "Dungeon Reset",
    "The Tutorial Is Too Hard",
    "The Greatest Estate Developer",
    "Nano Machine",
    "The World After the Fall",
    "Survival Story of a Sword King in a Fantasy World",
    "QUESTISM",
    "The Max Level Hero Has Returned",
    "Return of the Broken Constellation",
    "The Legend of the Northern Blade",
    "TSUYOSHI",
    "Ingoshima",
    "Tower of God",
    "Kagurabachi",
    "Sakamoto Days",
    "Kill Blue",
    "Justice League vs Godzilla vs Kong",
    "Superboy The Man of Tomorrow",
    "Blue Lock",
    "Overgeared",
    "Eleceed",
    "Manager Kim",
    "Monster-8",
    "Boundless Ascension",
    "SSS-Class Suicide Hunter",
    "The Breaker 3 – Eternal Force",
    "Surviving the Game as a Barbarian",
    "The Beginning After the End",
    "Doom Breaker",
    "Leviathan",
    "Bastard",
    "Shotgun Boy",
    "Sweet Home",
    "The Boxer",
    "Her Summon",
    "The Horizon",
    "The Villainess Turns the Hourglass",
    "Child of the Sheath",
    "Who Made Me A Princess",
    "Mercenary Enrollment",
    "Trash of the Counts Family"
  ];

  function performSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchTerm = searchInput.value.toLowerCase().trim();

    searchResults.innerHTML = "";

    if (searchTerm === "") {

      searchResults.style.display = "none";
      return;
    }

    const filteredItems = itemList.filter((item) =>
      item.toLowerCase().includes(searchTerm)
    );

    if (filteredItems.length === 0) {
      searchResults.innerHTML = "<p>No results found.</p>";
    } else {
      displayItemList(filteredItems, searchResults);
    }

    searchResults.style.display = "block";
  }

  function displayItemList(items, container) {
    const ul = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = item;

      link.href = `../comics/chapters/${encodeURIComponent(item)}/reader.html`;
      li.appendChild(link);
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", performSearch);

  const form = document.querySelector('.search-container form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  const searchResults = document.getElementById("searchResults");
  searchResults.style.display = "none";
});
