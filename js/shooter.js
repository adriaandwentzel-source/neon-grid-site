// Shooter Game: defend the network by shooting descending viruses
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startShooterGame');
  const container = document.getElementById('shooter-container');
  const scoreDisplay = document.getElementById('shooter-score');
  const livesDisplay = document.getElementById('shooter-lives');
  let player;
  let bullets = [];
  let enemies = [];
  let score = 0;
  let lives = 3;
  let gameInterval;
  let enemySpawnInterval;
  let gameRunning = false;

  function createPlayer() {
    player = document.createElement('div');
    player.className = 'shooter-player';
    container.appendChild(player);
  }

  function spawnEnemy() {
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.left = `${Math.random() * (container.clientWidth - 30)}px`;
    enemy.style.top = '0px';
    container.appendChild(enemy);
    enemies.push(enemy);
  }

  function shootBullet() {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    const playerRect = player.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    bullet.style.left = `${player.offsetLeft + player.offsetWidth / 2 - 2.5}px`;
    bullet.style.top = `${player.offsetTop - 10}px`;
    container.appendChild(bullet);
    bullets.push(bullet);
  }

  function movePlayer(dir) {
    const step = 10;
    const pos = player.offsetLeft;
    if (dir === 'left' && pos > 0) {
      player.style.left = `${pos - step}px`;
    } else if (dir === 'right' && pos < container.clientWidth - player.offsetWidth) {
      player.style.left = `${pos + step}px`;
    }
  }

  function updateGame() {
    // Move bullets
    bullets.forEach((bullet, i) => {
      bullet.style.top = `${bullet.offsetTop - 8}px`;
      if (bullet.offsetTop < 0) {
        container.removeChild(bullet);
        bullets.splice(i, 1);
      }
    });
    // Move enemies
    enemies.forEach((enemy, i) => {
      enemy.style.top = `${enemy.offsetTop + 3}px`;
      // Check collision with player
      if (enemy.offsetTop + enemy.offsetHeight >= player.offsetTop &&
          enemy.offsetLeft < player.offsetLeft + player.offsetWidth &&
          enemy.offsetLeft + enemy.offsetWidth > player.offsetLeft) {
        // hit player
        container.removeChild(enemy);
        enemies.splice(i, 1);
        lives--;
        updateDisplays();
        if (lives <= 0) {
          endGame();
        }
      }
      // If enemy falls beyond bottom
      else if (enemy.offsetTop > container.clientHeight) {
        container.removeChild(enemy);
        enemies.splice(i, 1);
      }
    });
    // Check bullet collision with enemies
    bullets.forEach((bullet, bi) => {
      enemies.forEach((enemy, ei) => {
        if (bullet.offsetTop <= enemy.offsetTop + enemy.offsetHeight &&
            bullet.offsetTop + bullet.offsetHeight >= enemy.offsetTop &&
            bullet.offsetLeft < enemy.offsetLeft + enemy.offsetWidth &&
            bullet.offsetLeft + bullet.offsetWidth > enemy.offsetLeft) {
          // collision
          container.removeChild(bullet);
          container.removeChild(enemy);
          bullets.splice(bi, 1);
          enemies.splice(ei, 1);
          score++;
          updateDisplays();
        }
      });
    });
  }

  function updateDisplays() {
    scoreDisplay.textContent = `Score: ${score}`;
    livesDisplay.textContent = `Lives: ${lives}`;
  }

  function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    // Reset state
    container.innerHTML = '';
    bullets = [];
    enemies = [];
    score = 0;
    lives = 3;
    updateDisplays();
    createPlayer();
    // Add keyboard controls
    document.addEventListener('keydown', handleKeyDown);
    // Spawn enemies every second
    enemySpawnInterval = setInterval(spawnEnemy, 1000);
    // Main game loop
    gameInterval = setInterval(updateGame, 30);
  }

  function endGame() {
    clearInterval(gameInterval);
    clearInterval(enemySpawnInterval);
    document.removeEventListener('keydown', handleKeyDown);
    gameRunning = false;
    // Save high score
    const prevHigh = parseInt(localStorage.getItem('shooterHighScore') || '0', 10);
    if (score > prevHigh) {
      localStorage.setItem('shooterHighScore', score);
    }
    // Show modal overlay with results and explanation
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.innerHTML = `<h3>Game Over</h3>
      <p>Your final score: ${score}</p>
      <p>High Score: ${Math.max(score, prevHigh)}</p>
      <p>What you learned: protecting systems requires quick reaction and resource management. Always watch for threats coming from different directions.</p>
      <button id="shooterCloseBtn">Close</button>`;
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    document.getElementById('shooterCloseBtn').addEventListener('click', () => {
      overlay.remove();
      // Reset container
      container.innerHTML = '';
    });
  }

  function handleKeyDown(e) {
    if (!gameRunning) return;
    if (e.code === 'ArrowLeft') {
      movePlayer('left');
    } else if (e.code === 'ArrowRight') {
      movePlayer('right');
    } else if (e.code === 'Space') {
      shootBullet();
    }
  }

  startBtn.addEventListener('click', startGame);
});