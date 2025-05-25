const API_URL = "https://api.freestuffbot.xyz/v2"; // Ganti dengan URL kamu
const API_KEY = "fsb_YZm7dI_gKzpnb8Cm6NUx9N4"; // GANTI dengan API key kamu

async function checkFreeGames() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.warn("Tidak ada game gratis saat ini.");
      return;
    }

    const latestGame = data[0]; // Game pertama dari list

    chrome.storage.local.get("lastGameId", (result) => {
      if (result.lastGameId !== latestGame.id) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png", // fix path sesuai namamu
          title: "Game Gratis Baru!",
          message: latestGame.title,
          priority: 2
        });

        chrome.storage.local.set({ lastGameId: latestGame.id });
      }
    });
  } catch (e) {
    console.error("Gagal fetch data game:", e);
  }
}

// Cek tiap 30 menit
setInterval(checkFreeGames, 1000 * 60 * 30);

// Jalankan langsung saat start
checkFreeGames();
