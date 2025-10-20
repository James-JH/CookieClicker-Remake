import React from 'react';
import { motion } from 'framer-motion';

const MousePointer = ({ index, totalCursors, isClicking = false }) => {
  // Calculate position around the cookie in a circle
  const angle = (index / totalCursors) * 2 * Math.PI;
  const radius = 200; // Distance from center of cookie
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  // Add slight random offset for more natural positioning
  const randomOffset = (index * 17) % 20 - 10; // -10 to 10 pixel offset

  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{
        left: `calc(50% + ${x + randomOffset}px)`,
        top: `calc(50% + ${y + randomOffset}px)`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        rotate: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      {/* Mouse pointer */}
      <motion.div
        className="relative"
        animate={isClicking ? {
          scale: [1, 1.2, 1],
          y: [0, -5, 0]
        } : {}}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        {/* Custom cursor image */}
        <div className="relative">
          <img
            src="/img/cursor.png"
            alt="Mouse cursor"
            className="w-6 h-6 drop-shadow-lg"
            style={{
              imageRendering: 'crisp-edges'
            }}
          />
          
          {/* Click animation overlay */}
          {isClicking && (
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/img/cursor.png"
                alt="Mouse cursor click"
                className="w-6 h-6"
                style={{
                  imageRendering: 'crisp-edges'
                }}
              />
            </motion.div>
          )}
        </div>
        
        {/* Click trail */}
        {isClicking && (
          <>
            <motion.div
              className="absolute top-8 left-1/2 transform -translate-x-1/2 text-yellow-500 font-bold text-sm"
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -20, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              +1
            </motion.div>
            {/* Click particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                style={{
                  left: `${50 + (i - 1) * 20}%`,
                  top: '70%'
                }}
                initial={{ opacity: 1, scale: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: 1,
                  x: (i - 1) * 15,
                  y: -10
                }}
                transition={{ 
                  duration: 0.4,
                  delay: i * 0.1
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MousePointer;
