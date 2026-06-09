// game.js
// Implements the ByteDash: Packet Run mini‑game. Players control a packet
// navigating through obstacles. Use the arrow keys to move up and down.

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const startBtn = document.getElementById('startGameBtn');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const livesDisplay = document.getElementById('livesDisplay');
  const gameStatus = document.getElementById('gameStatus');

  let animationId;
  let obstacles = [];
  let score = 0;
  let lives = 3;
  let gameRunning = false;

  // Packet/player properties
  const player = {
    x: 50,
    y: canvas ? canvas.height / 2 - 15 : 0,
    width: 30,
    height: 30,
    speed: 4
  };

  // Reset game state
  function resetGame() {
    obstacles = [];
    score = 0;
    lives = 3;
    gameRunning = false;
    player.y = canvas.height / 2 - player.height / 2;
    updateScore();
    updateLives();
    gameStatus.textContent = 'Click the Start button to begin your packet run.';
  }

  function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
  }

  function updateLives() {
    livesDisplay.textContent = `Lives: ${lives}`;
  }

  // Create a new obstacle
  function createObstacle() {
    const height = 40 + Math.random() * 60; // random height between 40 and 100
    const y = Math.random() * (canvas.height - height);
    const width = 20;
    const speed = 3 + Math.random() * 2; // random speed between 3 and 5
    obstacles.push({ x: canvas.width, y, width, height, speed });
  }

  // Draw the player and obstacles
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw player (packet) as a neon square
    ctx.fillStyle = '#51d1f6';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw obstacles
    ctx.fillStyle = '#ff6b6b';
    obstacles.forEach(obstacle => {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
  }

  // Update positions and check collisions
  function update() {
    // Create obstacles at random intervals
    if (Math.random() < 0.02) {
      createObstacle();
    }
    // Move obstacles
    obstacles.forEach(obstacle => {
      obstacle.x -= obstacle.speed;
    });
    // Remove off‑screen obstacles and update score
    obstacles = obstacles.filter(obstacle => {
      if (obstacle.x + obstacle.width < 0) {
        score += 10;
        updateScore();
        return false;
      }
      return true;
    });
    // Check collisions
    obstacles.forEach(obstacle => {
      if (player.x < obstacle.x + obstacle.width &&
          player.x + player.width > obstacle.x &&
          player.y < obstacle.y + obstacle.height &&
          player.y + player.height > obstacle.y) {
        // Collision detected
        lives--;
        updateLives();
        obstacles = obstacles.filter(o => o !== obstacle);
        if (lives <= 0) {
          endGame();
        }
      }
    });
  }

  // Game loop
  function gameLoop() {
    draw();
    update();
    if (gameRunning) {
      animationId = requestAnimationFrame(gameLoop);
    }
  }

  // Start the game
  function startGame() {
    if (!ctx) return;
    resetGame();
    gameRunning = true;
    gameStatus.textContent = 'Avoid obstacles and deliver your packet!';
    gameLoop();
  }

  // End the game
  function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    // Save high score
    const prevHigh = parseInt(localStorage.getItem('byteDashHighScore') || '0', 10);
    if (score > prevHigh) {
      localStorage.setItem('byteDashHighScore', score);
    }
    // Create modal overlay with results and learning summary
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.innerHTML = `<h3>Mission Complete</h3>
      <p>Your final score: ${score}</p>
      <p>High Score: ${Math.max(score, prevHigh)}</p>
      <p>What you learned: Data travels in small packets through switches, routers and firewalls. Avoid congestion and keep an eye on your route. Each obstacle you dodged represents a potential bottleneck or misconfiguration in a real network.</p>
      <button id="byteDashClose">Close</button>`;
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    document.getElementById('byteDashClose').addEventListener('click', () => {
      overlay.remove();
      resetGame();
    });
  }

  // Handle keyboard controls
  function handleKeyDown(e) {
    if (!gameRunning) return;
    if (e.key === 'ArrowUp') {
      player.y -= player.speed * 5;
      if (player.y < 0) player.y = 0;
    } else if (e.key === 'ArrowDown') {
      player.y += player.speed * 5;
      if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
    }
  }

  // Attach event listeners
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startGame();
    });
  }
  window.addEventListener('keydown', handleKeyDown);
});