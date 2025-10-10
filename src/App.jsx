import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, BarChart3, ShoppingCart } from 'lucide-react';

// Components
import CookieButton from './components/CookieButton';
import CounterDisplay from './components/CounterDisplay';
import ShopPanel from './components/ShopPanel';
import StatsPanel from './components/StatsPanel';
import AchievementPopup from './components/AchievementPopup';
import SettingsModal from './components/SettingsModal';
import GoldenCookie from './components/GoldenCookie';

// Game Logic
import { GameState } from './utils/gameLogic';

function App() {
  const gameStateRef = useRef(null);
  const [updateCounter, setUpdateCounter] = useState(0);
  
  // Initialize game state
  useEffect(() => {
    if (!gameStateRef.current) {
      const state = new GameState();
      state.load();
      gameStateRef.current = state;
      
      // Create initial snapshot
      setGameStateSnapshot({
        cookies: state.cookies,
        cps: state.getCps(),
        totalCookies: state.totalCookies,
        clickPower: state.clickPower,
        buildings: { ...state.buildings },
        updateCounter: 1
      });
    }
  }, []);
  
  const [activePanel, setActivePanel] = useState('shop');
  const [achievements, setAchievements] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [goldenCookieActive, setGoldenCookieActive] = useState(false);
  const [gameStateSnapshot, setGameStateSnapshot] = useState(null);

  // Game loop
  useEffect(() => {
    if (!gameStateRef.current) return;
    
    let lastTime = Date.now();
    let lastUIUpdate = Date.now();
    
    const gameLoop = (currentTime) => {
      if (!gameStateRef.current) return;
      
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime; // Update lastTime immediately
      
      // Cap deltaTime to prevent huge jumps
      const cappedDeltaTime = Math.min(deltaTime, 1000); // Max 1 second
      
      // Generate cookies from buildings
      gameStateRef.current.generateCookies(cappedDeltaTime);
      
      // Check for new achievements
      const newAchievements = gameStateRef.current.checkAchievements();
      if (newAchievements.length > 0) {
        setAchievements(prev => [...prev, ...newAchievements]);
      }
      
      // Random golden cookie spawn
      if (!goldenCookieActive && Math.random() < 0.0001) {
        setGoldenCookieActive(true);
      }
      
      // Auto-save every 10 seconds
      if (currentTime - gameStateRef.current.lastSave > 10000) {
        gameStateRef.current.save();
      }
      
      // Update UI every 1000ms (1 second) to show live cookie generation
      if (currentTime - lastUIUpdate > 1000) {
        console.log(`🍪 Cookies: ${gameStateRef.current.cookies}, CPS: ${gameStateRef.current.getCps()}`);
        // Create a snapshot of the current game state for React to track
        setGameStateSnapshot({
          cookies: gameStateRef.current.cookies,
          cps: gameStateRef.current.getCps(),
          totalCookies: gameStateRef.current.totalCookies,
          clickPower: gameStateRef.current.clickPower,
          buildings: { ...gameStateRef.current.buildings },
          updateCounter: updateCounter + 1
        });
        lastUIUpdate = currentTime;
      }
      
      requestAnimationFrame(gameLoop);
    };

    const animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [goldenCookieActive]);

  // Save on window unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      gameStateRef.current.save();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleCookieClick = useCallback(() => {
    if (!gameStateRef.current) return;
    gameStateRef.current.clickCookie();
    // Update snapshot immediately
    setGameStateSnapshot({
      cookies: gameStateRef.current.cookies,
      cps: gameStateRef.current.getCps(),
      totalCookies: gameStateRef.current.totalCookies,
      clickPower: gameStateRef.current.clickPower,
      buildings: { ...gameStateRef.current.buildings },
      updateCounter: updateCounter + 1
    });
  }, [updateCounter]);

  const handleBuyBuilding = useCallback((buildingId) => {
    if (!gameStateRef.current) return;
    if (gameStateRef.current.buyBuilding(buildingId)) {
      // Update snapshot immediately
      setGameStateSnapshot({
        cookies: gameStateRef.current.cookies,
        cps: gameStateRef.current.getCps(),
        totalCookies: gameStateRef.current.totalCookies,
        clickPower: gameStateRef.current.clickPower,
        buildings: { ...gameStateRef.current.buildings },
        updateCounter: updateCounter + 1
      });
    }
  }, [updateCounter]);

  const handleBuyUpgrade = useCallback((upgradeId) => {
    if (!gameStateRef.current) return;
    if (gameStateRef.current.buyUpgrade(upgradeId)) {
      setUpdateCounter(prev => prev + 1);
    }
  }, []);

  const handleGoldenCookieCollect = useCallback(() => {
    if (!gameStateRef.current) return;
    const bonus = Math.floor(gameStateRef.current.cookies * 0.1 + gameStateRef.current.getCps() * 10);
    gameStateRef.current.cookies += bonus;
    gameStateRef.current.totalCookies += bonus;
    setUpdateCounter(prev => prev + 1);
    setGoldenCookieActive(false);
  }, []);

  const handleReset = useCallback(() => {
    if (!gameStateRef.current) return;
    gameStateRef.current.reset();
    setUpdateCounter(prev => prev + 1);
    setAchievements([]);
  }, []);

  // Emergency reset if cookies are negative
  const emergencyReset = useCallback(() => {
    if (!gameStateRef.current) return;
    const state = new GameState();
    state.load();
    gameStateRef.current = state;
    setUpdateCounter(prev => prev + 1);
    setAchievements([]);
  }, []);

  const handleCloseAchievement = useCallback((achievement) => {
    setAchievements(prev => prev.filter(a => a.id !== achievement.id));
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Don't render until game state is initialized
  if (!gameStateRef.current || !gameStateSnapshot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🍪</div>
          <div className="text-xl font-semibold text-gray-700">Loading Cookie Clicker...</div>
        </div>
      </div>
    );
  }

  // Safety check for corrupted game state
  if (gameStateSnapshot.cookies < 0 || gameStateSnapshot.totalCookies < 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-xl font-semibold text-gray-700 mb-4">Game State Corrupted</div>
          <div className="text-gray-600 mb-6">
            The game state has become corrupted (negative cookies detected). 
            This has been fixed in the code, but you'll need to reset your progress.
          </div>
          <button
            onClick={emergencyReset}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Reset Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'
    }`}>
      {/* Header */}
      <motion.header
        className="glass-panel p-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-amber-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            🍪 Cookie Clicker - Modern Edition
          </motion.h1>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActivePanel(activePanel === 'shop' ? 'stats' : 'shop')}
              className="button-secondary flex items-center space-x-2"
            >
              {activePanel === 'shop' ? <BarChart3 className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              <span>{activePanel === 'shop' ? 'Stats' : 'Shop'}</span>
            </button>
            
            <button
              onClick={() => setShowSettings(true)}
              className="button-secondary"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Counter */}
          <div className="lg:col-span-1">
            <CounterDisplay
              cookies={gameStateSnapshot.cookies}
              cps={gameStateSnapshot.cps}
              totalCookies={gameStateSnapshot.totalCookies}
            />
          </div>

          {/* Center Column - Cookie */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <CookieButton
              onClick={handleCookieClick}
              clickPower={gameStateSnapshot.clickPower}
            />
          </div>

          {/* Right Column - Shop/Stats */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {activePanel === 'shop' ? (
                <ShopPanel
                  key="shop"
                  gameState={gameStateRef.current}
                  onBuyBuilding={handleBuyBuilding}
                  onBuyUpgrade={handleBuyUpgrade}
                />
              ) : (
                <StatsPanel
                  key="stats"
                  gameState={gameStateRef.current}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Golden Cookie */}
      <GoldenCookie
        onCollect={handleGoldenCookieCollect}
        isActive={goldenCookieActive}
      />

      {/* Achievement Popups */}
      <AnimatePresence>
        {achievements.map((achievement) => (
          <AchievementPopup
            key={achievement.id}
            achievement={achievement}
            onClose={() => handleCloseAchievement(achievement)}
          />
        ))}
      </AnimatePresence>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onReset={handleReset}
        onToggleMute={toggleMute}
        onToggleTheme={toggleTheme}
        isMuted={isMuted}
        isDarkMode={isDarkMode}
      />

      {/* Background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
