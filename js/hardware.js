// Hardware Time Warp Game
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startHardwareGame');
  const container = document.getElementById('hardware-container');
  const questionEl = document.getElementById('hardware-question');
  const optionsEl = document.getElementById('hardware-options');
  const scoreEl = document.getElementById('hardware-score');
  const indexEl = document.getElementById('hardware-index');
  const statusEl = document.getElementById('hardware-status');
  let currentQuestion = 0;
  let score = 0;
  const questions = [
    {
      scenario: 'Which storage medium has the larger capacity?',
      options: ['3.5" floppy disk', 'USB flash drive'],
      correct: 1,
      explanation: 'Modern USB drives can hold gigabytes or terabytes, while floppies max out at 1.44 MB.'
    },
    {
      scenario: 'Which internet connection is faster?',
      options: ['Dial‑up modem', 'Fiber optic broadband'],
      correct: 1,
      explanation: 'Fiber internet offers gigabit speeds, whereas dial‑up is limited to tens of kilobits per second.'
    },
    {
      scenario: 'Which uses solid‑state storage?',
      options: ['Hard Disk Drive (HDD)', 'NVMe SSD'],
      correct: 1,
      explanation: 'NVMe SSDs use NAND flash memory with no moving parts, providing higher speeds than spinning disks.'
    },
    {
      scenario: 'Which device is older?',
      options: ['Punch card', 'Smartphone'],
      correct: 0,
      explanation: 'Punch cards were used in mid‑20th century computing; smartphones are from the 21st century.'
    },
    {
      scenario: 'Which monitor technology is more modern?',
      options: ['CRT', 'LED'],
      correct: 1,
      explanation: 'LED backlit LCD screens are slimmer, use less power and provide better picture than bulky CRTs.'
    }
  ];
  function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = `${currentQuestion + 1}. ${q.scenario}`;
    optionsEl.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.className = 'button';
      btn.style.display = 'block';
      btn.style.margin = '10px auto';
      btn.addEventListener('click', () => handleAnswer(idx));
      optionsEl.appendChild(btn);
    });
    scoreEl.textContent = `Score: ${score}`;
    indexEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    statusEl.textContent = 'Pick the newer, faster or more modern option.';
  }
  function handleAnswer(index) {
    const q = questions[currentQuestion];
    if (index === q.correct) {
      score++;
      statusEl.textContent = 'Correct! ' + q.explanation;
    } else {
      statusEl.textContent = 'Incorrect. ' + q.explanation;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      setTimeout(loadQuestion, 1000);
    } else {
      endGame();
    }
  }
  function endGame() {
    const prevHigh = parseInt(localStorage.getItem('hardwareHighScore') || '0', 10);
    if (score > prevHigh) {
      localStorage.setItem('hardwareHighScore', score);
    }
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.innerHTML = `<h3>Game Over</h3>
      <p>You answered ${score} out of ${questions.length} questions correctly.</p>
      <p>High Score: ${Math.max(score, prevHigh)}</p>
      <p>What you learned: technology has evolved dramatically – from punch cards to NVMe, from dial‑up to fiber.</p>
      <button id="hardwareCloseBtn">Close</button>`;
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    document.getElementById('hardwareCloseBtn').addEventListener('click', () => {
      overlay.remove();
      currentQuestion = 0;
      score = 0;
      container.style.display = 'none';
      statusEl.textContent = 'Game ended. Click Start to play again.';
    });
  }
  startBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    container.style.display = 'block';
    loadQuestion();
  });
});