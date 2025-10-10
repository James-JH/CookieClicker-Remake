import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GoldenCookie = ({ onCollect, isActive }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Random position on screen
      const x = Math.random() * (window.innerWidth - 100);
      const y = Math.random() * (window.innerHeight - 100);
      setPosition({ x, y });
      setIsVisible(true);

      // Auto-hide after 13 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 13000);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const handleClick = () => {
    setIsVisible(false);
    onCollect();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.button
        className="fixed z-40 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 border-4 border-yellow-600 shadow-2xl cursor-pointer"
        style={{
          left: position.x,
          top: position.y,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          rotate: [0, 5, -5, 0],
        }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          scale: { duration: 0.3, ease: "easeOut" },
          rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
      >
        {/* Golden cookie texture */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Sparkles */}
          <div className="absolute top-2 left-3 w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
          <div className="absolute top-4 right-3 w-1 h-1 bg-yellow-200 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-3 left-4 w-1 h-1 bg-yellow-200 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-yellow-200 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Cookie emoji */}
          <div className="absolute inset-0 flex items-center justify-center text-3xl">
            🍪
          </div>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-yellow-300 opacity-0"
          animate={{
            opacity: [0, 0.3, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              style={{
                left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 30}%`,
                top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 30}%`,
              }}
              animate={{
                y: [0, -20],
                opacity: [1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          ))}
        </div>
      </motion.button>
    </AnimatePresence>
  );
};

export default GoldenCookie;
