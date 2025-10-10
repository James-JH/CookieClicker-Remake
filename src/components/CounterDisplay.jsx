import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber } from '../utils/gameLogic';

const CounterDisplay = ({ cookies, cps, totalCookies }) => {
  const [displayCookies, setDisplayCookies] = useState(cookies);
  const [displayCps, setDisplayCps] = useState(cps);
  const [displayTotal, setDisplayTotal] = useState(totalCookies);

  useEffect(() => {
    const animateValue = (start, end, setter, duration = 300) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Use easeOut for smoother animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easedProgress;
        setter(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    // Faster animation for cookie clicks (300ms), slower for CPS/total (800ms)
    animateValue(displayCookies, cookies, setDisplayCookies, 300);
    animateValue(displayCps, cps, setDisplayCps, 800);
    animateValue(displayTotal, totalCookies, setDisplayTotal, 800);
  }, [cookies, cps, totalCookies]);

  return (
    <motion.div
      className="glass-panel p-6 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-4">
        {/* Main cookie counter */}
        <div className="text-4xl md:text-5xl font-bold text-amber-600">
          <motion.span
            key={`cookies-${Math.floor(cookies)}`}
            initial={{ scale: 1.05, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="inline-block"
          >
            {formatNumber(displayCookies)} cookies
          </motion.span>
        </div>

        {/* CPS display */}
        <div className="text-lg md:text-xl text-gray-600">
          <motion.span
            key={`cps-${Math.floor(cps * 10)}`}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-semibold">{formatNumber(displayCps)}</span> cookies per second
          </motion.span>
        </div>

        {/* Total cookies baked */}
        <div className="text-sm text-gray-500">
          <motion.span
            key={`total-${Math.floor(totalCookies)}`}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Total baked: <span className="font-medium">{formatNumber(displayTotal)}</span>
          </motion.span>
        </div>

        {/* Progress bar for visual appeal */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${Math.min((displayCookies / Math.max(totalCookies, 1)) * 100, 100)}%` 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Milestone indicators */}
        <AnimatePresence>
          {displayCookies >= 1000 && displayCookies < 1001 && (
            <motion.div
              className="text-yellow-600 font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              🎉 1K Cookies! 🎉
            </motion.div>
          )}
          {displayCookies >= 1000000 && displayCookies < 1000001 && (
            <motion.div
              className="text-yellow-600 font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              🎉 1M Cookies! 🎉
            </motion.div>
          )}
          {displayCookies >= 1000000000 && displayCookies < 1000000001 && (
            <motion.div
              className="text-yellow-600 font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              🎉 1B Cookies! 🎉
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CounterDisplay;
