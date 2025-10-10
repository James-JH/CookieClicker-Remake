import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUILDINGS, UPGRADES, formatNumber } from '../utils/gameLogic';

const ShopPanel = ({ gameState, onBuyBuilding, onBuyUpgrade }) => {
  const [activeTab, setActiveTab] = useState('buildings');

  const canAffordBuilding = (buildingId) => {
    return gameState.cookies >= gameState.getBuildingCost(buildingId);
  };

  const canAffordUpgrade = (upgrade) => {
    return gameState.cookies >= upgrade.cost && 
           !gameState.upgrades.has(upgrade.id) &&
           gameState.checkUpgradeRequirement(upgrade);
  };

  const getBuildingCps = (building) => {
    const count = gameState.buildings[building.id];
    return count * building.baseCps * (1 + gameState.buildingBonus);
  };

  return (
    <motion.div
      className="glass-panel p-6 max-w-md mx-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Tab Navigation */}
      <div className="flex mb-6 bg-white/20 rounded-lg p-1">
        <button
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
            activeTab === 'buildings'
              ? 'bg-white/40 text-gray-800 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('buildings')}
        >
          Buildings
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
            activeTab === 'upgrades'
              ? 'bg-white/40 text-gray-800 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('upgrades')}
        >
          Upgrades
        </button>
      </div>

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'buildings' && (
            <motion.div
              key="buildings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {BUILDINGS.map((building, index) => {
                const count = gameState.buildings[building.id];
                const cost = gameState.getBuildingCost(building.id);
                const canAfford = canAffordBuilding(building.id);
                const cps = getBuildingCps(building);

                return (
                  <motion.div
                    key={building.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`
                      p-4 rounded-xl border-2 transition-all duration-300
                      ${canAfford 
                        ? 'bg-white/30 border-white/40 hover:bg-white/40 hover:border-white/60 cursor-pointer' 
                        : 'bg-white/10 border-white/20 opacity-60 cursor-not-allowed'
                      }
                    `}
                    onClick={() => canAfford && onBuyBuilding(building.id)}
                    whileHover={canAfford ? { scale: 1.02 } : {}}
                    whileTap={canAfford ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{building.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">{building.name}</h3>
                          <p className="text-sm text-gray-600">{building.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">
                          {formatNumber(cost)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {count} owned
                        </div>
                        {cps > 0 && (
                          <div className="text-xs text-green-600">
                            +{formatNumber(cps)}/s
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'upgrades' && (
            <motion.div
              key="upgrades"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {UPGRADES.map((upgrade, index) => {
                const canAfford = canAffordUpgrade(upgrade);
                const owned = gameState.upgrades.has(upgrade.id);

                return (
                  <motion.div
                    key={upgrade.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`
                      p-4 rounded-xl border-2 transition-all duration-300
                      ${owned
                        ? 'bg-green-100/50 border-green-300 opacity-75'
                        : canAfford 
                          ? 'bg-white/30 border-white/40 hover:bg-white/40 hover:border-white/60 cursor-pointer' 
                          : 'bg-white/10 border-white/20 opacity-60 cursor-not-allowed'
                      }
                    `}
                    onClick={() => canAfford && !owned && onBuyUpgrade(upgrade.id)}
                    whileHover={canAfford && !owned ? { scale: 1.02 } : {}}
                    whileTap={canAfford && !owned ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{upgrade.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">{upgrade.name}</h3>
                          <p className="text-sm text-gray-600">{upgrade.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">
                          {formatNumber(upgrade.cost)}
                        </div>
                        {owned && (
                          <div className="text-xs text-green-600 font-semibold">
                            OWNED
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer with total CPS */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="text-center">
          <div className="text-sm text-gray-600">Total Production</div>
          <div className="text-xl font-bold text-green-600">
            {formatNumber(gameState.getCps())} cookies/sec
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopPanel;
