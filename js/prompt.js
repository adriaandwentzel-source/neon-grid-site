// Prompt Forge Game
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startPromptGame');
  const container = document.getElementById('prompt-container');
  const questionEl = document.getElementById('prompt-question');
  const optionsEl = document.getElementById('prompt-options');
  const scoreEl = document.getElementById('prompt-score');
  const indexEl = document.getElementById('prompt-index');
  const statusEl = document.getElementById('prompt-status');
  let currentQuestion = 0;
  let score = 0;
  // Questions: each question has a scenario, array of options, index of correct answer, and explanation
  const questions = [
    {
      scenario: 'You want to know what DNS does.',
      options: [
        'Tell me about networks.',
        'Explain what DNS is in simple terms and give a real-life example.',
        'Why is the internet so slow?'
      ],
      correct: 1,
      explanation: 'Specific prompts give context and desired output. Here, asking for a simple explanation and example helps AI answer correctly.'
    },
    {
      scenario: 'You need troubleshooting steps for Outlook asking for a password repeatedly.',
      options: [
        'Outlook broken, what do?',
        'Why does Outlook keep asking for a password and how do I fix it?',
        'My user is angry about email.'
      ],
      correct: 1,
      explanation: 'Explicitly stating the problem allows the AI to focus on that issue and offer actionable steps.'
    },
    {
      scenario: 'You are curious about how AI can help with cybersecurity.',
      options: [
        'Explain AI.',
        'How can AI assist in detecting phishing attempts in corporate emails?',
        'Tell me something interesting.'
      ],
      correct: 1,
      explanation: 'A focused prompt instructs the AI to discuss a specific use case, leading to a more useful and accurate response.'
    },
    {
      scenario: 'You want the AI to write a script to add users to Entra ID.',
      options: [
        'Write script.',
        'Please provide a PowerShell script that adds a new user to Microsoft Entra ID with given attributes and includes error checking.',
        'How do computers work?'
      ],
      correct: 1,
      explanation: 'Including specific requirements and context ensures the AI generates a useful script rather than guessing your intention.'
    },
    {
      scenario: 'You suspect the AI is hallucinating about a network command.',
      options: [
        'Trust the AI blindly.',
        'Ask the AI to cite its sources and explain the command, then verify with official documentation.',
        'Ignore the AI entirely.'
      ],
      correct: 1,
      explanation: 'AI can hallucinate. Always ask for sources, double-check with official docs and use critical thinking.'
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
    statusEl.textContent = 'Think carefully about which prompt will give the best result.';
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
    // Save high score
    const prevHigh = parseInt(localStorage.getItem('promptHighScore') || '0', 10);
    if (score > prevHigh) {
      localStorage.setItem('promptHighScore', score);
    }
    // Show modal overlay with results and learning summary
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.innerHTML = `<h3>Game Over</h3>
      <p>You answered ${score} out of ${questions.length} questions correctly.</p>
      <p>High Score: ${Math.max(score, prevHigh)}</p>
      <p>What you learned: clearer prompts produce better responses, and always verify AI output.</p>
      <button id="promptCloseBtn">Close</button>`;
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    document.getElementById('promptCloseBtn').addEventListener('click', () => {
      overlay.remove();
      // Reset state for next game
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