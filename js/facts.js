// facts.js
// Defines a collection of facts for different categories and handles
// interaction on the facts page.

document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.getElementById('categorySelect');
  const newFactBtn = document.getElementById('newFactBtn');
  const factsContainer = document.getElementById('factsContainer');
  const factStatus = document.getElementById('factStatus');

  // Basic sample facts. You can expand these arrays with more content later.
  const facts = {
    itLearning: [
      {
        title: 'What is DNS?',
        body: 'DNS (Domain Name System) translates human‑readable domain names (like example.com) into IP addresses that computers use to identify each other on the network.',
        why: 'Without DNS, you would need to remember IP addresses instead of website names.',
        comment: 'Basically the internet’s contact list. Except when DNS breaks, everyone blames the Wi‑Fi.'
      },
      {
        title: 'What is DHCP?',
        body: 'DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and other network configuration details (subnet mask, gateway, DNS servers) to devices on a network.',
        why: 'DHCP saves you from manually configuring network settings on every device.',
        comment: 'DHCP hands out IP addresses so humans don’t have to type numbers all day like it’s 1998.'
      },
      {
        title: 'What is MFA?',
        body: 'Multi‑Factor Authentication (MFA) requires users to provide at least two types of verification (like a password plus a text message code) before gaining access.',
        why: 'MFA dramatically reduces the risk of unauthorized access if a password is compromised.',
        comment: 'Even if someone knows your password, MFA stops them dead in their tracks.'
      }
    ],
    itCrazy: [
      {
        title: 'Early Hard Drives vs Today',
        body: 'The first commercial hard drives in the 1950s were the size of a fridge and stored only a few megabytes. Today’s NVMe SSDs fit in your hand and store terabytes of data.',
        why: 'Technology scaling has made storage faster, smaller and cheaper over time.',
        comment: 'Imagine needing furniture‑sized machines to store less than what your phone wastes on memes.'
      },
      {
        title: 'The First Computer Bug',
        body: 'In 1947, engineers found an actual moth stuck in the Mark II computer at Harvard University. They removed the insect and taped it into the logbook, calling it the first “debugging” story.',
        why: 'It’s a funny piece of computing history that gave rise to the term “bug” in software.',
        comment: 'Real insects inside computers? Talk about literal debugging!'
      },
      {
        title: 'Dial‑Up to Fibre',
        body: 'Dial‑up internet maxed out around 56 kilobits per second and made screechy modem sounds. Modern fibre connections can deliver gigabit speeds, millions of times faster and completely silent.',
        why: 'Network speeds have exploded, enabling streaming, gaming and cloud computing.',
        comment: 'Let’s be honest: we kind of miss the modem handshake tones.'
      }
    ],
    aiLearning: [
      {
        title: 'What is a Prompt?',
        body: 'A prompt is the input you give to an AI model to generate a response. Clear prompts yield better answers because they provide context, tone and detail.',
        why: 'Good prompts help AI understand your intent and respond appropriately.',
        comment: 'Specific questions beat vague button‑smashing every time.'
      },
      {
        title: 'What is AI Hallucination?',
        body: 'AI hallucination occurs when a model generates plausible‑sounding but incorrect information because it lacks the knowledge or misinterprets the question.',
        why: 'Always verify AI responses, especially when they involve critical facts or decisions.',
        comment: 'I try to avoid hallucinations, but sometimes I still make things up… sorry.'
      },
      {
        title: 'What is Machine Learning?',
        body: 'Machine learning is a subset of AI where algorithms learn patterns from data and improve automatically without being explicitly programmed for every scenario.',
        why: 'Machine learning powers speech recognition, recommendation engines and more.',
        comment: 'It’s like teaching computers to find patterns without telling them where to look.'
      }
    ],
    aiCrazy: [
      {
        title: 'Deepfake Voice Scams',
        body: 'Criminals have used AI to clone voices and impersonate executives or family members. They call unsuspecting people and request money transfers, tricking them into thinking it’s a real person.',
        why: 'Highlights the need for verification when receiving unusual requests – do not trust voice alone.',
        comment: 'Rule one: if your “boss” suddenly asks for a secret money transfer by voice, verify before funding the villain arc.'
      },
      {
        title: 'AI versus Humans in Games',
        body: 'AI programs like AlphaGo and AlphaStar have beaten world champions in games such as Go and StarCraft II, demonstrating the power of machine learning.',
        why: 'AI can process massive possibilities quickly, finding strategies humans may not discover.',
        comment: 'Don’t worry, I’m still your friendly training partner, not your gaming enemy.'
      },
      {
        title: 'AI Generated Art',
        body: 'Modern generative models create realistic images, music and poetry. This has sparked discussions about creativity, copyright and the role of AI in art.',
        why: 'Understanding generative AI helps us navigate ethical and legal questions about ownership.',
        comment: 'Not all AI art is great – sometimes it still draws people with way too many fingers.'
      }
    ],
    cyberLearning: [
      {
        title: 'What is Phishing?',
        body: 'Phishing is a social engineering attack where attackers send fraudulent emails or messages to trick people into revealing sensitive information or clicking malicious links.',
        why: 'Phishing exploits human trust; learning to recognise it is key to staying secure.',
        comment: 'If it sounds urgent and asks for your password, pause and think before clicking.'
      },
      {
        title: 'What is Ransomware?',
        body: 'Ransomware is malware that encrypts your files and demands payment for the decryption key. It can spread via email attachments, downloads and remote desktop vulnerabilities.',
        why: 'Backups and security updates are crucial defences against ransomware attacks.',
        comment: 'Paying hackers is like funding more hackers. Backup and be ready instead.'
      },
      {
        title: 'What is Least Privilege?',
        body: 'The principle of least privilege means giving users only the permissions they need to perform their tasks, reducing the impact of compromised accounts.',
        why: 'Restricting access lowers the risk of data breaches and accidental damage.',
        comment: 'Because leaving admin rights everywhere is basically inviting chaos.'
      }
    ],
    cyberIncidents: [
      {
        title: 'Stuxnet',
        body: 'Stuxnet was a sophisticated worm discovered in 2010 that targeted industrial control systems, causing physical damage to Iranian nuclear centrifuges.',
        why: 'It proved that malware can jump from computers to real‑world infrastructure.',
        comment: 'Not your typical “click here to win a voucher” malware – this was cyber warfare with a clipboard.'
      },
      {
        title: 'WannaCry',
        body: 'WannaCry was a ransomware attack in 2017 that infected hundreds of thousands of computers worldwide, exploiting a vulnerability in Windows systems.',
        why: 'Highlighted the importance of timely security patches and backups.',
        comment: 'It turned many computers into ransom notes – update your systems, please.'
      },
      {
        title: 'NotPetya',
        body: 'NotPetya was a destructive cyberattack in 2017 disguised as ransomware but designed to destroy data. It started in Ukraine and spread globally, impacting major companies.',
        why: 'Demonstrated how supply‑chain attacks can cause widespread disruption.',
        comment: 'Unlike ransomware, paying didn’t help – it just wiped out data regardless.'
      }
    ]
  };

  function getRandomFact(category) {
    const list = facts[category];
    return list[Math.floor(Math.random() * list.length)];
  }

  function showFact() {
    const category = categorySelect.value;
    const fact = getRandomFact(category);

    factsContainer.innerHTML = '';
    const factDiv = document.createElement('div');
    factDiv.className = 'fact';
    factDiv.innerHTML = `<h4>${fact.title}</h4><p>${fact.body}</p><p><strong>Why it matters:</strong> ${fact.why}</p>`;
    factsContainer.appendChild(factDiv);

    // Update ByteZero’s comment
    factStatus.textContent = fact.comment;
  }

  // Event listeners
  if (newFactBtn) {
    newFactBtn.addEventListener('click', showFact);
  }

  // Expose facts and getRandomFact globally for Daily Byte feature
  window.allFacts = facts;
  window.getRandomFactFromAll = function() {
    // Flatten all categories into one array
    const categories = Object.keys(facts);
    const flat = [];
    categories.forEach(cat => {
      flat.push(...facts[cat]);
    });
    return flat[Math.floor(Math.random() * flat.length)];
  };
});