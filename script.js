name=script.js
// Game State
const gameState = {
    balance: 100,
    bet: 5,
    lastWin: 0,
    isSpinning: false,
    reels: ['💻', '🟢', '🌙']
};

const aiSymbols = ['💻', '🟢', '🌙', '🔥', '💎', '❓'];
let audioContext;

// Initialize audio
function initAudio() {
    if (!audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
    }
}

// Sound functions
function playTone(freq, dur, vol = 0.3) {
    initAudio();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + dur);
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + dur);
}

function playChord(freqs, dur, vol = 0.3) {
    initAudio();
    freqs.forEach(f => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = f;
        gain.gain.setValueAtTime(vol / freqs.length, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + dur);
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + dur);
    });
}

function playSequence(freqs, noteDur, totalDur) {
    initAudio();
    const spacing = totalDur / freqs.length;
    freqs.forEach((f, i) => {
        const start = audioContext.currentTime + (i * spacing);
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = f;
        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + noteDur);
        osc.start(start);
        osc.stop(start + noteDur);
    });
}

// Game functions
function getRandomSymbol() {
    return aiSymbols[Math.floor(Math.random() * aiSymbols.length)];
}

function updateDisplay() {
    const bal = document.getElementById('balance');
    const bet = document.getElementById('current-bet');
    const win = document.getElementById('last-win');
    if (bal) bal.innerText = gameState.balance;
    if (bet) bet.innerText = gameState.bet;
    if (win) win.innerText = gameState.lastWin;
}

function spinReels() {
    if (gameState.isSpinning) return;
    if (gameState.balance < gameState.bet) {
        alert('Out of balance! Press RESET GAME');
        return;
    }

    gameState.isSpinning = true;
    gameState.balance -= gameState.bet;
    gameState.lastWin = 0;
    
    const msg = document.getElementById('message');
    if (msg) msg.innerHTML = '';
    
    const btn = document.getElementById('spin-button');
    if (btn) btn.disabled = true;
    
    playTone(400, 0.1, 0.1);
    
    const reels = document.querySelectorAll('.reel');
    reels.forEach(r => r.classList.add('spinning'));

    setTimeout(() => {
        const finals = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
        reels.forEach((r, i) => {
            setTimeout(() => {
                gameState.reels[i] = finals[i];
                r.classList.remove('spinning');
                r.innerText = finals[i];
            }, i * 200);
        });

        setTimeout(() => {
            checkWin();
            gameState.isSpinning = false;
            if (btn) btn.disabled = gameState.balance < gameState.bet;
            updateDisplay();
        }, 600);
    }, 2000);
}

function checkWin() {
    const [r1, r2, r3] = gameState.reels;
    const msg = document.getElementById('message');
    
    if (!msg) return;
    
    if (r1 === r2 && r2 === r3) {
        gameState.lastWin = gameState.bet * 5;
        gameState.balance += gameState.lastWin;
        msg.innerHTML = '<div class="jackpot-message">🎉 JACKPOT! 🎉</div>';
        playSequence([523.25, 587.33, 659.25, 783.99, 523.25], 0.2, 0.6);
    } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        gameState.lastWin = gameState.bet * 2;
        gameState.balance += gameState.lastWin;
        msg.innerHTML = '<div class="win-message">💰 You Win! 💰</div>';
        playChord([261.63, 329.63, 392.00], 0.3, 0.5);
    } else {
        msg.innerHTML = '<div class="loss-message">❌ No Match - Try Again!</div>';
        playTone(80, 0.15, 0.3);
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
    
    document.querySelectorAll('.reel').forEach((r, i) => {
        r.classList.remove('spinning');
        r.innerText = gameState.reels[i];
    });
    
    const msg = document.getElementById('message');
    if (msg) msg.innerHTML = '';
    
    const btn = document.getElementById('spin-button');
    if (btn) btn.disabled = false;
    
    updateDisplay();
}

// Setup on load
function setupGame() {
    console.log('Setting up game...');
    updateDisplay();
    
    const spinBtn = document.getElementById('spin-button');
    const incBtn = document.getElementById('increase-bet');
    const decBtn = document.getElementById('decrease-bet');
    const resetBtn = document.getElementById('reset-button');
    
    // Use onclick instead of addEventListener
    if (spinBtn) {
        spinBtn.onclick = spinReels;
        console.log('✓ Spin button connected');
    }
    if (incBtn) {
        incBtn.onclick = increaseBet;
        console.log('✓ Increase bet button connected');
    }
    if (decBtn) {
        decBtn.onclick = decreaseBet;
        console.log('✓ Decrease bet button connected');
    }
    if (resetBtn) {
        resetBtn.onclick = resetGame;
        console.log('✓ Reset button connected');
    }
    
    // Keyboard support
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !gameState.isSpinning && gameState.balance >= gameState.bet) {
            e.preventDefault();
            spinReels();
        }
    });
    
    console.log('✓ Game setup complete!');
}

// Run immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGame);
} else {
    setupGame();
}
