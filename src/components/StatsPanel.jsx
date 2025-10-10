import React from 'react';
import { motion } from 'framer-motion';
import { formatNumber, formatTime } from '../utils/gameLogic';

const StatsPanel = ({ gameState }) => {
  const playTime = (Date.now() - gameState.startTime) / 1000;
  const totalBuildings = Object.values(gameState.buildings).reduce((a, b) => a + b, 0);
  const cookiesPerClick = gameState.clickPower;
  const buildingBonus = gameState.buildingBonus * 100;

  const stats = [
    {
      label: 'Cookies Baked',
      value: formatNumber(gameState.totalCookies),
      icon: '🍪'
    },
    {
      label: 'Cookies Clicked',
      value: formatNumber(gameState.clicks * cookiesPerClick),
      icon: '👆'
    },
    {
      label: 'Hand-made Cookies',
      value: formatNumber(gameState.clicks),
      icon: '✋'
    },
    {
      label: 'Buildings Owned',
      value: totalBuildings.toString(),
      icon: '🏢'
    },
    {
      label: 'Upgrades Owned',
      value: gameState.upgrades.size.toString(),
      icon: '⬆️'
    },
    {
      label: 'Achievements',
      value: `${gameState.achievements.size}/8`,
      icon: '🏆'
    },
    {
      label: 'Play Time',
      value: formatTime(playTime),
      icon: '⏰'
    },
    {
      label: 'Cookies per Click',
      value: formatNumber(cookiesPerClick),
      icon: '💪'
    },
    {
      label: 'Building Bonus',
      value: `+${buildingBonus.toFixed(1)}%`,
      icon: '📈'
    }
  ];

  return (
    <motion.div
      className="glass-panel p-6 max-w-md mx-auto"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📊 Statistics
      </h2>
      
      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center justify-between p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{stat.icon}</span>
              <span className="text-gray-700 font-medium">{stat.label}</span>
            </div>
            <span className="text-lg font-bold text-gray-800">
              {stat.value}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Progress bars for achievements */}
      <div className="mt-6 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          Achievement Progress
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Cookies</span>
            <span className="text-gray-800 font-medium">
              {formatNumber(gameState.totalCookies)} / 1B
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.min((gameState.totalCookies / 1000000000) * 100, 100)}%` 
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Clicks</span>
            <span className="text-gray-800 font-medium">
              {formatNumber(gameState.clicks)} / 10K
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.min((gameState.clicks / 10000) * 100, 100)}%` 
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Buildings</span>
            <span className="text-gray-800 font-medium">
              {totalBuildings} / 50
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${Math.min((totalBuildings / 50) * 100, 100)}%` 
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Efficiency metrics */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          Efficiency Metrics
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Cookies per Second</span>
            <span className="font-semibold text-green-600">
              {formatNumber(gameState.getCps())}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Click Efficiency</span>
            <span className="font-semibold text-blue-600">
              {formatNumber(cookiesPerClick)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Building Efficiency</span>
            <span className="font-semibold text-purple-600">
              {formatNumber(gameState.getCps() / Math.max(totalBuildings, 1))}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsPanel;
