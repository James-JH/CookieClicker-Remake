# 🍪 Cookie Clicker - Modern Edition

A beautiful, modern implementation of the classic Cookie Clicker game built with React, Tailwind CSS, and Framer Motion.

![Cookie Clicker](https://img.shields.io/badge/React-19.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.24-pink)

## ✨ Features

### 🎮 Core Gameplay
- **Clickable Cookie**: Large, animated cookie with satisfying click effects
- **Cookie Counter**: Real-time animated counter with smooth number transitions
- **Buildings System**: 8 different buildings (Cursor, Grandma, Farm, Factory, Mine, Shipment, Lab, Portal)
- **Upgrades**: Power-ups that enhance clicking power and building efficiency
- **Passive Generation**: Buildings automatically generate cookies per second

### 🏆 Progression System
- **Achievements**: 8 different achievements with popup notifications
- **Statistics Panel**: Comprehensive stats tracking (cookies baked, clicks, play time, etc.)
- **Progress Bars**: Visual progress indicators for major milestones
- **Golden Cookies**: Random bonus cookies that appear occasionally

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful translucent panels with backdrop blur
- **Smooth Animations**: Framer Motion powered animations throughout
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes
- **Particle Effects**: Subtle background animations and click effects

### 💾 Data Persistence
- **Auto-save**: Automatically saves progress every 10 seconds
- **Local Storage**: Progress persists between browser sessions
- **Reset Function**: Option to start fresh with confirmation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CookieClicker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── CookieButton.jsx          # Main clickable cookie with animations
│   ├── CounterDisplay.jsx        # Cookie counter with smooth animations
│   ├── ShopPanel.jsx             # Buildings and upgrades shop
│   ├── StatsPanel.jsx            # Game statistics and progress
│   ├── AchievementPopup.jsx      # Achievement notification popup
│   ├── SettingsModal.jsx          # Settings and game options
│   └── GoldenCookie.jsx           # Random golden cookie events
├── utils/
│   └── gameLogic.js              # Core game mechanics and state management
├── App.jsx                        # Main application component
├── main.jsx                       # Application entry point
└── index.css                     # Global styles and Tailwind imports
```

## 🎯 Game Mechanics

### Buildings
Each building has:
- **Base Cost**: Initial purchase price
- **Base CPS**: Cookies per second generated
- **Scaling**: Cost increases by 15% with each purchase
- **Efficiency**: Upgrades can boost building output

### Upgrades
- **Click Power**: Multiplies cookies gained per click
- **Building Bonus**: Increases all building output
- **Requirements**: Some upgrades require certain milestones

### Achievements
Unlock achievements by reaching various milestones:
- Cookie milestones (1K, 1M, 1B cookies)
- Click milestones (1K, 10K clicks)
- Speed challenges
- Special conditions

## 🛠️ Technologies Used

- **React 19.2.0**: Modern React with hooks
- **Tailwind CSS 4.1.14**: Utility-first CSS framework
- **Framer Motion 12.23.24**: Animation library
- **Vite**: Fast build tool and dev server
- **Lucide React**: Beautiful icon library

## 🎨 Design Philosophy

This implementation focuses on:
- **Smooth Performance**: 60fps animations and responsive interactions
- **Modern Aesthetics**: Clean, glassmorphism-inspired design
- **Accessibility**: Keyboard navigation and screen reader support
- **Mobile-First**: Responsive design that works on all devices
- **User Experience**: Intuitive controls and satisfying feedback

## 🔧 Customization

### Adding New Buildings
Edit `src/utils/gameLogic.js` and add to the `BUILDINGS` array:

```javascript
{
  id: 'new-building',
  name: 'New Building',
  icon: '🏗️',
  baseCost: 1000000,
  baseCps: 1000,
  description: 'A new building that does amazing things!'
}
```

### Adding New Upgrades
Add to the `UPGRADES` array in the same file:

```javascript
{
  id: 'new-upgrade',
  name: 'New Upgrade',
  icon: '⚡',
  cost: 5000000,
  description: 'Doubles your clicking power!',
  effect: 'clickPower',
  value: 2,
  requirement: { type: 'cookies', amount: 1000000 }
}
```

### Styling
The app uses Tailwind CSS with custom animations defined in `src/index.css`. You can:
- Modify the color scheme in `tailwind.config.js`
- Add new animations in the CSS file
- Customize the glassmorphism effects

## 📱 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Inspired by the original Cookie Clicker by Orteil
- Built with modern web technologies
- Designed for optimal user experience
- Cursor image assets referenced from the original game (used here as a small homage)

---

**Enjoy clicking cookies! 🍪✨**
