// Virus Blaster Game
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startVirusGame');
    const gameContainer = document.getElementById('virus-game-container');
    const scoreDisplay = document.getElementById('virus-score');
    const timeDisplay = document.getElementById('virus-time');
    const bytezeroDisplay = document.getElementById('virus-bytezero');

    let score = 0;
    let timeLeft = 30;
    let spawnInterval;
    let timerInterval;
    let gameRunning = false;

    function spawnVirus() {
        // create virus element
        const virus = document.createElement('div');
        virus.classList.add('virus');
        // random position within container
        const containerRect = gameContainer.getBoundingClientRect();
        const size = 30 + Math.random() * 20; // size between 30-50px
        virus.style.width = `${size}px`;
        virus.style.height = `${size}px`;
        virus.style.position = 'absolute';
        // position relative to container
        virus.style.left = `${Math.random() * (containerRect.width - size)}px`;
        virus.style.top = `${Math.random() * (containerRect.height - size)}px`;
        virus.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        virus.style.borderRadius = '50%';
        virus.style.cursor = 'pointer';
        virus.title = 'Click to remove!';
        virus.addEventListener('click', () => {
            if (!gameRunning) return;
            score++;
            scoreDisplay.textContent = score;
            virus.remove();
        });
        gameContainer.appendChild(virus);
        // remove after 2 seconds if not clicked
        setTimeout(() => {
            if (virus.parentElement) virus.remove();
        }, 2000);
    }

    function startGame() {
        if (gameRunning) return;
        gameRunning = true;
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = score;
        timeDisplay.textContent = timeLeft;
        bytezeroDisplay.textContent = 'ByteZero: Malware ahead! Click them all!';
        // clear container
        gameContainer.innerHTML = '';
        // spawn viruses every 800ms
        spawnInterval = setInterval(spawnVirus, 800);
        // countdown timer
        timerInterval = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        gameRunning = false;
        // Save high score
        const prevHigh = parseInt(localStorage.getItem('virusHighScore') || '0', 10);
        if (score > prevHigh) {
            localStorage.setItem('virusHighScore', score);
        }
        // remove remaining viruses
        Array.from(document.querySelectorAll('.virus')).forEach(v => v.remove());
        // Show modal overlay with results and explanation
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        const content = document.createElement('div');
        content.className = 'modal-content';
        content.innerHTML = `<h3>Game Over</h3>
          <p>Your final score: ${score}</p>
          <p>High Score: ${Math.max(score, prevHigh)}</p>
          <p>What you learned: viruses and malware spread quickly — act fast to remove them. Stay alert and practise good security hygiene.</p>
          <button id="virusCloseBtn">Close</button>`;
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        document.getElementById('virusCloseBtn').addEventListener('click', () => {
            overlay.remove();
            bytezeroDisplay.textContent = 'ByteZero: Click Start to play again.';
            // Reset game state for next play
            score = 0;
            timeLeft = 30;
            scoreDisplay.textContent = score;
            timeDisplay.textContent = timeLeft;
        });
    }

    startBtn.addEventListener('click', startGame);
});