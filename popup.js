const API_URL = "https://api.freestuffbot.xyz/v2";
const API_KEY = "fsb_YZm7dI_gKzpnb8Cm6NUx9N4";

async function loadGames() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const games = await res.json();
    const list = document.getElementById("game-list");
    list.innerHTML = "";

    games.forEach(game => {
      const item = document.createElement("li");
      item.textContent = game.title;
      list.appendChild(item);
    });
  } catch (e) {
    console.error("Gagal load game:", e);
  }
}

loadGames();
