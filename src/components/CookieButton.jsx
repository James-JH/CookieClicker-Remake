import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber } from '../utils/gameLogic';
import MousePointer from './MousePointer';

const CookieButton = ({ onClick, clickPower, disabled = false, cursorCount = 0 }) => {
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [pointerClicking, setPointerClicking] = useState(new Set());

  // Simulate mouse pointer clicks when cursors are owned
  useEffect(() => {
    if (cursorCount === 0) return;

    const interval = setInterval(() => {
      // Randomly select a pointer to click
      const randomPointer = Math.floor(Math.random() * cursorCount);
      setPointerClicking(prev => new Set([...prev, randomPointer]));
      
      // Remove clicking state after animation
      setTimeout(() => {
        setPointerClicking(prev => {
          const newSet = new Set(prev);
          newSet.delete(randomPointer);
          return newSet;
        });
      }, 300);
    }, 3000); // Every 3 seconds to match cursor auto-click timing

    return () => clearInterval(interval);
  }, [cursorCount]);

  const handleClick = (e) => {
    if (disabled) return;
    
    // Create floating text
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newText = {
      id: `${Date.now()}-${Math.random()}`,
      x,
      y,
      text: `+${formatNumber(clickPower)}`
    };
    
    setFloatingTexts(prev => [...prev, newText]);
    
    // Remove floating text after animation
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(text => text.id !== newText.id));
    }, 1000);
    
    // Call onClick immediately for instant feedback
    onClick();
  };


  return (
    <div className="relative flex items-center justify-center">
      {/* Mouse Pointers */}
      {cursorCount > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: cursorCount }, (_, index) => (
            <MousePointer
              key={index}
              index={index}
              totalCursors={cursorCount}
              isClicking={pointerClicking.has(index)}
            />
          ))}
        </div>
      )}

      {/* Floating text animations */}
      <AnimatePresence>
        {floatingTexts.map((text) => (
          <motion.div
            key={text.id}
            className="floating-text"
            style={{
              left: text.x,
              top: text.y,
            }}
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={{ opacity: 0, scale: 1.2, y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {text.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Cookie Button */}
      <motion.button
        className={`
          relative w-64 h-64 md:w-80 md:h-80 rounded-full
          bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500
          border-8 border-amber-600 shadow-2xl
          flex items-center justify-center
          transition-all duration-300
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
          ${isHovered ? 'cookie-glow' : ''}
        `}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.9 } : {}}
        animate={{
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* Cookie texture */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Chocolate chips */}
          <div className="absolute top-8 left-12 w-3 h-3 bg-amber-800 rounded-full"></div>
          <div className="absolute top-16 right-16 w-2 h-2 bg-amber-800 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-2.5 h-2.5 bg-amber-800 rounded-full"></div>
          <div className="absolute bottom-12 right-12 w-3 h-3 bg-amber-800 rounded-full"></div>
          <div className="absolute top-24 left-1/2 w-2 h-2 bg-amber-800 rounded-full"></div>
          <div className="absolute bottom-24 right-1/3 w-2.5 h-2.5 bg-amber-800 rounded-full"></div>
          <div className="absolute top-1/2 left-8 w-2 h-2 bg-amber-800 rounded-full"></div>
          <div className="absolute top-1/2 right-8 w-3 h-3 bg-amber-800 rounded-full"></div>
          
          {/* Cookie holes */}
          <div className="absolute top-12 left-1/3 w-1 h-1 bg-amber-600 rounded-full"></div>
          <div className="absolute bottom-16 right-1/4 w-1 h-1 bg-amber-600 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-amber-600 rounded-full"></div>
        </div>

        {/* Cookie emoji */}
        <motion.div
          className="text-8xl md:text-9xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🍪
        </motion.div>

        {/* Click effect overlay */}
        <motion.div
          className="absolute inset-0 rounded-full bg-yellow-300 opacity-0"
          animate={{
            opacity: [0, 0.4, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
        />
      </motion.button>

      {/* Click power indicator */}
      <motion.div
        className="absolute -bottom-8 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-sm font-semibold text-gray-700">
          +{formatNumber(clickPower)} per click
        </span>
      </motion.div>
    </div>
  );
};

export default CookieButton;
