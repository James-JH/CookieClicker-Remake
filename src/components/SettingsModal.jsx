import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Volume2, VolumeX, RotateCcw, Sun, Moon } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, onReset, onToggleMute, onToggleTheme, isMuted, isDarkMode }) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    if (showResetConfirm) {
      onReset();
      setShowResetConfirm(false);
      onClose();
    } else {
      setShowResetConfirm(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-panel p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <Settings className="w-6 h-6" />
                <span>Settings</span>
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Audio Settings */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Audio</h3>
                <button
                  onClick={onToggleMute}
                  className="w-full flex items-center justify-between p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-gray-600" />
                    )}
                    <span className="text-gray-700 font-medium">
                      {isMuted ? 'Unmute Sounds' : 'Mute Sounds'}
                    </span>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                    isMuted ? 'bg-gray-300' : 'bg-green-400'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                      isMuted ? 'translate-x-1' : 'translate-x-7'
                    }`} />
                  </div>
                </button>
              </div>

              {/* Theme Settings */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Appearance</h3>
                <button
                  onClick={onToggleTheme}
                  className="w-full flex items-center justify-between p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-3">
                    {isDarkMode ? (
                      <Moon className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Sun className="w-5 h-5 text-gray-600" />
                    )}
                    <span className="text-gray-700 font-medium">
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                    isDarkMode ? 'bg-blue-400' : 'bg-gray-300'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                      isDarkMode ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </div>
                </button>
              </div>

              {/* Game Settings */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Game</h3>
                
                {/* Reset Game */}
                <div className="space-y-2">
                  <button
                    onClick={handleReset}
                    className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors duration-300 ${
                      showResetConfirm 
                        ? 'bg-red-100/50 border-2 border-red-300 hover:bg-red-200/50' 
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <RotateCcw className="w-5 h-5 text-gray-600" />
                      <span className={`font-medium ${
                        showResetConfirm ? 'text-red-700' : 'text-gray-700'
                      }`}>
                        {showResetConfirm ? 'Confirm Reset' : 'Reset Game'}
                      </span>
                    </div>
                  </button>
                  
                  {showResetConfirm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <p className="text-sm text-red-700">
                        ⚠️ This will permanently delete all your progress. This action cannot be undone.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Game Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">About</h3>
                <div className="p-4 bg-white/20 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Cookie Clicker - Modern Edition</strong>
                  </p>
                  <p className="text-xs text-gray-500">
                    Built with React, Tailwind CSS, and Framer Motion
                  </p>
                  <p className="text-xs text-gray-500">
                    Version 1.0.0
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="button-primary"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
