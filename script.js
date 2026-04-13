// Game State Management
const gameState = {
    balance: 100,
    bet: 5,
    lastWin: 0,
    isSpinning: false,
    reels: ['💻', '🟢', '🌙'],
};

// AI Brand Symbols
const aiSymbols = ['💻', '🟢', '🌙', '🔥', '💎', '❓'];

// Audio Context
let audioContext;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Sound Effects
const sounds = {
    spin: () => playTone(400, 0.1, 0.1),
    win: () => playChord([261.63, 329.63, 392.00], 0.3, 0.5),
    jackpot: () => playSequence([523.25, 587.33, 659.25, 783.99, 523.25], 0.2, 0.6),
    loss: () => playTone(80, 0.15, 0.3),
};

function playTone(frequency, duration, volume = 0.3) {
    if (!audioContext) initAudioContext();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + duration);
}

function playChord(frequencies, duration, volume = 0.3) {
    if (!audioContext) initAudioContext();
    frequencies.forEach(freq => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(volume / frequencies.length, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + duration);
    });
}

function playSequence(frequencies, noteDuration, totalDuration) {
    if (!audioContext) initAudioContext();
    const noteSpacing = totalDuration / frequencies.length;
    frequencies.forEach((freq, index) => {
        const startTime = audioContext.currentTime + (index * noteSpacing);
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + noteDuration);
        osc.start(startTime);
        osc.stop(startTime + noteDuration);
    });
}

function getRandomSymbol() {
    return aiSymbols[Math.floor(Math.random() * aiSymbols.length)];
}

function updateDisplay() {
    document.getElementById('balance').textContent = gameState.balance;
    document.getElementById('current-bet').textContent = gameState.bet;
    document.getElementById('last-win').textContent = gameState.lastWin;
}

function spinReels() {
    if (gameState.isSpinning) return;
    if (gameState.balance < gameState.bet) {
        alert('Insufficient balance! Reset the game to play again.');
        return;
    }

    gameState.isSpinning = true;
    gameState.balance -= gameState.bet;
    gameState.lastWin = 0;
    document.getElementById('message').innerHTML = '';
    const spinButton = document.getElementById('spin-button');
    spinButton.disabled = true;
    sounds.spin();

    const spinDuration = 2000;
    const reelElements = document.querySelectorAll('.reel');
    reelElements.forEach(reel => reel.classList.add('spinning'));

    setTimeout(() => {
        const finalReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
        reelElements.forEach((reel, index) => {
            setTimeout(() => {
                gameState.reels[index] = finalReels[index];
                reel.classList.remove('spinning');
                reel.textContent = finalReels[index];
            }, index * 200);
        });

        setTimeout(() => {
            checkWin();
            gameState.isSpinning = false;
            spinButton.disabled = gameState.balance < gameState.bet;
            updateDisplay();
        }, 600);
    }, spinDuration);
}

function checkWin() {
    const [reel1, reel2, reel3] = gameState.reels;
    const messageEl = document.getElementById('message');
    
    if (reel1 === reel2 && reel2 === reel3) {
        gameState.lastWin = gameState.bet * 5;
        gameState.balance += gameState.lastWin;
        messageEl.innerHTML = '<div class="jackpot-message">🎉 JACKPOT! 🎉</div>';
        sounds.jackpot();
    } else if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
        gameState.lastWin = gameState.bet * 2;
        gameState.balance += gameState.lastWin;
        messageEl.innerHTML = '<div class="win-message">💰 You Win! 💰</div>';
        sounds.win();
    } else {
        messageEl.innerHTML = '<div class="loss-message">❌ No Match - Try Again!</div>';
        sounds.loss();
    }
}

function increaseBet() {
    if (gameState.balance >= gameState.bet + 5 && !gameState.isSpinning) {
        gameState.bet += 5;
        updateDisplay();
    }
}

function decreaseBet() {
    if (gameState.bet > 5 && !gameState.isSpinning) {
        gameState.bet -= 5;
        updateDisplay();
    }
}

function resetGame() {
    gameState.balance = 100;
    gameState.bet = 5;
    gameState.lastWin = 0;
    gameState.isSpinning = false;
    gameState.reels = ['💻', '🟢', '🌙'];
    document.querySelectorAll('.reel').forEach((reel, index) => {
        reel.classList.remove('spinning');
        reel.textContent = gameState.reels[index];
    });
    document.getElementById('message').innerHTML = '';
    document.getElementById('spin-button').disabled = false;
    updateDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    document.getElementById('spin-button').addEventListener('click', spinReels);
    document.getElementById('increase-bet').addEventListener('click', increaseBet);
    document.getElementById('decrease-bet').addEventListener('click', decreaseBet);
    document.getElementById('reset-button').addEventListener('click', resetGame);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !gameState.isSpinning && gameState.balance >= gameState.bet) {
            e.preventDefault();
            spinReels();
        }
    });
});
