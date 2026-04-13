# 🤖 AI Models Slot Machine

A fully functioning casino slot machine built as a proof of concept, featuring various AI brands (Copilot, ChatGPT, Claude, Mistral, Gemini, and Perplexity) as the symbols on the reels.

## 🎮 Features

- **Three-Reel Slot Machine**: Classic 3-reel design with 6 AI brand symbols
- **Smooth Animations**: Realistic reel spinning with easing effects
- **Sound Effects**: Dynamic audio feedback for spins, wins, and jackpots using Web Audio API
- **Great Design**: Golden casino aesthetic with gradient backgrounds and shadow effects
- **Responsive UI**: Works on desktop and mobile devices
- **Game Mechanics**:
  - Three matching symbols = 5x bet (JACKPOT!)
  - Two matching symbols = 2x bet (WIN!)
  - No match = Better luck next time
- **Adjustable Betting**: Increase or decrease your bet amount
- **Balance Management**: Track your current balance and winnings
- **Reset Function**: Start fresh with a new 1000 credit balance

## 🚀 How to Play

1. Open `index.html` in your web browser
2. Adjust your bet using the +/- buttons (5-credit increments)
3. Click the **SPIN** button to start spinning
4. Wait for the reels to stop
5. Check if you have a winning combination!
6. Use the **RESET** button to start over with 1000 credits

## 💰 Paytable

| Combination | Payout |
|-------------|--------|
| Three in a row (Jackpot) | 5x your bet |
| Two in a row (Win) | 2x your bet |
| No match | 0 |

## 🎨 Design Highlights

- **Casino-style Golden Machine**: Authentic slot machine appearance
- **Glowing Display**: Retro LED-style balance display
- **Payline Indicator**: Clear visual indicator of the winning line
- **Button Feedback**: Smooth hover and active states
- **Animations**: 
  - Bouncing header
  - Reel spinning effect
  - Message animations (wiggle for win, jackpot spin)
  - Pulsing payline

## 🔊 Sound Effects

The game features synthesized sound effects using the Web Audio API:
- **Spin Sound**: Simple tone when reels start spinning
- **Win Sound**: Ascending three-note chord (C-E-G)
- **Jackpot Sound**: Epic five-note sequence for big wins
- **Loss Sound**: Low-frequency tone for non-winning spins

## 🛠️ Technical Stack

- **HTML5**: Semantic markup and game structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript**: Game logic, animations, and Web Audio API integration

## 📝 File Structure

```
.
├── index.html      # Main game interface
├── styles.css      # Game styling and animations
├── script.js       # Game mechanics and logic
└── README.md       # This file
```

## ⚖️ Legal Notice

This is a **proof of concept** project demonstrating slot machine generation with AI models. The AI brand names and logos used here are for educational and demonstration purposes only. This project has **not** been checked for trademark or intellectual property rights. For commercial use, please obtain proper licenses from the respective AI companies.

## 🎓 Learning Resources

This project demonstrates:
- Game loop implementation
- State management in JavaScript
- CSS animations and transitions
- Web Audio API for sound synthesis
- Responsive web design

## 🎯 Future Enhancements

- Add actual logo graphics instead of text symbols
- Implement progressive jackpot
- Add multiple paylines
- Create difficulty levels
- Add leaderboard functionality
- Implement betting limits

## 📄 License

This is a proof of concept project. Use for educational purposes.

Enjoy your AI slot machine experience! 🎰