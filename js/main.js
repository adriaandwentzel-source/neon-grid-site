// main.js
// Provides general functionality for the NeonGrid portal, such as updating
// ByteZero's status panel with fun messages and hints. It also defines a
// simple daily fact feature for the landing page.

document.addEventListener('DOMContentLoaded', () => {
  const statusPanel = document.getElementById('statusPanel');
  const statusMessage = document.getElementById('statusMessage');
  const statusHint = document.getElementById('statusHint');

  if (statusPanel) {
    // Array of fun status messages to show on the homepage.
    const statuses = [
      { message: 'BYTEZERO ONLINE…', hint: 'Preparing your next mission.' },
      { message: 'Sarcasm Level: 72%', hint: 'I promise to be nice… mostly.' },
      { message: 'Packet Patience: Low', hint: 'Avoid unnecessary Wi‑Fi abuse.' },
      { message: 'Firewall Mood: Suspicious', hint: 'I block first, ask later.' },
      { message: 'Coffee Module: Missing', hint: 'Prepare for unexpected behaviour.' },
      { message: 'Printer Trust Level: 0%', hint: 'They have minds of their own.' }
    ];

    function updateStatus() {
      const random = statuses[Math.floor(Math.random() * statuses.length)];
      statusMessage.textContent = random.message;
      statusHint.textContent = random.hint;
    }

    updateStatus();
    // Update the status every 30 seconds to keep things fresh.
    setInterval(updateStatus, 30000);
  }

  // Daily Byte feature: display a random fact each time the home page loads
  const dailyByteContainer = document.getElementById('dailyByte');
  const dailyByteText = document.getElementById('dailyByteText');
  if (dailyByteContainer && dailyByteText && typeof window.getRandomFactFromAll === 'function') {
    const fact = window.getRandomFactFromAll();
    dailyByteText.innerHTML = `<strong>${fact.title}:</strong> ${fact.body}`;
    dailyByteContainer.style.display = 'block';
  }
});