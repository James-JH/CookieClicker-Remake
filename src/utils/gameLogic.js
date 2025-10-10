// Game constants
export const BUILDINGS = [
  {
    id: 'cursor',
    name: 'Cursor',
    icon: '🖱️',
    baseCost: 15,
    baseCps: 0.1,
    description: 'Autoclicks once every 10 seconds.'
  },
  {
    id: 'grandma',
    name: 'Grandma',
    icon: '👵',
    baseCost: 100,
    baseCps: 1,
    description: 'A nice grandma to bake more cookies.'
  },
  {
    id: 'farm',
    name: 'Farm',
    icon: '🚜',
    baseCost: 1100,
    baseCps: 8,
    description: 'Grows cookie plants.'
  },
  {
    id: 'steroids',
    name: 'Steroids',
    icon: '💉',
    baseCost: 5000,
    baseCps: 20,
    description: 'Gives grandmas super strength!'
  },
  {
    id: 'factory',
    name: 'Factory',
    icon: '🏭',
    baseCost: 12000,
    baseCps: 47,
    description: 'Produces cookies by the dozen.'
  },
  {
    id: 'mine',
    name: 'Mine',
    icon: '⛏️',
    baseCost: 130000,
    baseCps: 260,
    description: 'Mines out cookie dough and chocolate chips.'
  },
  {
    id: 'shipment',
    name: 'Shipment',
    icon: '🚢',
    baseCost: 1400000,
    baseCps: 1400,
    description: 'Brings in fresh cookies from the cookie planet.'
  },
  {
    id: 'lab',
    name: 'Alchemy Lab',
    icon: '🧪',
    baseCost: 20000000,
    baseCps: 10000,
    description: 'Turns gold into cookies!'
  },
  {
    id: 'portal',
    name: 'Portal',
    icon: '🌀',
    baseCost: 330000000,
    baseCps: 65000,
    description: 'Opens a door to the Cookieverse.'
  }
];

export const UPGRADES = [
  {
    id: 'reinforced-index',
    name: 'Reinforced Index',
    icon: '👆',
    cost: 100,
    description: 'Your mouse pointer is twice as efficient.',
    effect: 'clickPower',
    value: 2,
    requirement: { type: 'cookies', amount: 100 }
  },
  {
    id: 'carpal-tunnel-prevention',
    name: 'Carpal Tunnel Prevention Cream',
    icon: '🧴',
    cost: 500,
    description: 'Your mouse pointer is twice as efficient.',
    effect: 'clickPower',
    value: 2,
    requirement: { type: 'cookies', amount: 500 }
  },
  {
    id: 'ambidextrous',
    name: 'Ambidextrous',
    icon: '🤲',
    cost: 10000,
    description: 'Your mouse pointer is twice as efficient.',
    effect: 'clickPower',
    value: 2,
    requirement: { type: 'cookies', amount: 10000 }
  },
  {
    id: 'thousand-fingers',
    name: 'Thousand fingers',
    icon: '👐',
    cost: 100000,
    description: 'Each non-cursor building produces 0.1 more cookies.',
    effect: 'buildingBonus',
    value: 0.1,
    requirement: { type: 'buildings', amount: 10 }
  },
  {
    id: 'million-fingers',
    name: 'Million fingers',
    icon: '👐',
    cost: 10000000,
    description: 'Each non-cursor building produces 0.5 more cookies.',
    effect: 'buildingBonus',
    value: 0.5,
    requirement: { type: 'buildings', amount: 25 }
  },
  {
    id: 'grandma-steroids',
    name: 'Grandma Steroids',
    icon: '👵💉',
    cost: 50000,
    description: 'Grandmas work 50% more efficiently when you have steroids.',
    effect: 'grandmaBonus',
    value: 0.5,
    requirement: { type: 'buildings', amount: 5, building: 'steroids' }
  },
  {
    id: 'advanced-steroids',
    name: 'Advanced Steroids',
    icon: '💉💪',
    cost: 500000,
    description: 'Steroids provide 2x more cookies per second.',
    effect: 'steroidBonus',
    value: 2,
    requirement: { type: 'buildings', amount: 10, building: 'steroids' }
  }
];

export const ACHIEVEMENTS = [
  {
    id: 'making-some-dough',
    name: 'Making some dough',
    description: 'Bake 1 cookie.',
    icon: '🍪',
    requirement: { type: 'cookies', amount: 1 }
  },
  {
    id: 'making-more-dough',
    name: 'Making more dough',
    description: 'Bake 1,000 cookies.',
    icon: '🍪',
    requirement: { type: 'cookies', amount: 1000 }
  },
  {
    id: 'making-lots-of-dough',
    name: 'Making lots of dough',
    description: 'Bake 1,000,000 cookies.',
    icon: '🍪',
    requirement: { type: 'cookies', amount: 1000000 }
  },
  {
    id: 'making-tons-of-dough',
    name: 'Making tons of dough',
    description: 'Bake 1,000,000,000 cookies.',
    icon: '🍪',
    requirement: { type: 'cookies', amount: 1000000000 }
  },
  {
    id: 'clicking-frenzy',
    name: 'Clicking frenzy',
    description: 'Click 1,000 times.',
    icon: '👆',
    requirement: { type: 'clicks', amount: 1000 }
  },
  {
    id: 'clicking-madness',
    name: 'Clicking madness',
    description: 'Click 10,000 times.',
    icon: '👆',
    requirement: { type: 'clicks', amount: 10000 }
  },
  {
    id: 'speed-baking',
    name: 'Speed baking',
    description: 'Bake 1,000,000 cookies in 25 minutes.',
    icon: '⚡',
    requirement: { type: 'speed', amount: 1000000, time: 25 }
  },
  {
    id: 'hardcore',
    name: 'Hardcore',
    description: 'Bake 1,000,000,000 cookies with no upgrades.',
    icon: '💪',
    requirement: { type: 'hardcore', amount: 1000000000 }
  }
];

// Game state management
export class GameState {
  constructor() {
    this.cookies = 0;
    this.totalCookies = 0;
    this.clicks = 0;
    this.buildings = {};
    this.upgrades = new Set();
    this.achievements = new Set();
    this.clickPower = 1;
    this.buildingBonus = 0;
    this.grandmaBonus = 0;
    this.steroidBonus = 1;
    this.startTime = Date.now();
    this.lastSave = Date.now();
    this.lastCursorClick = Date.now(); // Track cursor auto-clicks
    
    // Initialize buildings
    BUILDINGS.forEach(building => {
      this.buildings[building.id] = 0;
    });
  }

  // Calculate cookies per second
  getCps() {
    let cps = 0;
    BUILDINGS.forEach(building => {
      if (building.id !== 'cursor') { // Exclude cursor from CPS calculation
        const count = this.buildings[building.id] || 0;
        let buildingCps = count * building.baseCps * (1 + this.buildingBonus);
        
        // Apply grandma bonus if they have steroids
        if (building.id === 'grandma' && (this.buildings.steroids || 0) > 0) {
          buildingCps *= (1 + this.grandmaBonus);
        }
        
        // Apply steroid bonus
        if (building.id === 'steroids') {
          buildingCps *= this.steroidBonus;
        }
        
        cps += buildingCps;
      }
    });
    return cps;
  }

  // Calculate building cost
  getBuildingCost(buildingId) {
    const building = BUILDINGS.find(b => b.id === buildingId);
    const count = this.buildings[buildingId];
    return Math.floor(building.baseCost * Math.pow(1.15, count));
  }

  // Buy building
  buyBuilding(buildingId) {
    const cost = this.getBuildingCost(buildingId);
    if (this.cookies >= cost) {
      this.cookies -= cost;
      this.buildings[buildingId]++;
      return true;
    }
    return false;
  }

  // Buy upgrade
  buyUpgrade(upgradeId) {
    const upgrade = UPGRADES.find(u => u.id === upgradeId);
    if (!upgrade || this.upgrades.has(upgradeId) || this.cookies < upgrade.cost) {
      return false;
    }

    // Check requirements
    if (!this.checkUpgradeRequirement(upgrade)) {
      return false;
    }

    this.cookies -= upgrade.cost;
    this.upgrades.add(upgradeId);

    // Apply upgrade effect
    if (upgrade.effect === 'clickPower') {
      this.clickPower *= upgrade.value;
    } else if (upgrade.effect === 'buildingBonus') {
      this.buildingBonus += upgrade.value;
    } else if (upgrade.effect === 'grandmaBonus') {
      this.grandmaBonus += upgrade.value;
    } else if (upgrade.effect === 'steroidBonus') {
      this.steroidBonus *= upgrade.value;
    }

    return true;
  }

  // Check if upgrade requirement is met
  checkUpgradeRequirement(upgrade) {
    const req = upgrade.requirement;
    switch (req.type) {
      case 'cookies':
        return this.totalCookies >= req.amount;
      case 'buildings':
        if (req.building) {
          // Check specific building requirement
          return this.buildings[req.building] >= req.amount;
        }
        return Object.values(this.buildings).reduce((a, b) => a + b, 0) >= req.amount;
      case 'clicks':
        return this.clicks >= req.amount;
      case 'speed':
        const timeElapsed = (Date.now() - this.startTime) / 60000; // minutes
        return this.totalCookies >= req.amount && timeElapsed <= req.time;
      case 'hardcore':
        return this.totalCookies >= req.amount && this.upgrades.size === 0;
      default:
        return true;
    }
  }

  // Check for new achievements
  checkAchievements() {
    const newAchievements = [];
    ACHIEVEMENTS.forEach(achievement => {
      if (!this.achievements.has(achievement.id) && this.checkAchievementRequirement(achievement)) {
        this.achievements.add(achievement.id);
        newAchievements.push(achievement);
      }
    });
    return newAchievements;
  }

  // Check if achievement requirement is met
  checkAchievementRequirement(achievement) {
    const req = achievement.requirement;
    switch (req.type) {
      case 'cookies':
        return this.totalCookies >= req.amount;
      case 'clicks':
        return this.clicks >= req.amount;
      case 'speed':
        const timeElapsed = (Date.now() - this.startTime) / 60000; // minutes
        return this.totalCookies >= req.amount && timeElapsed <= req.time;
      case 'hardcore':
        return this.totalCookies >= req.amount && this.upgrades.size === 0;
      default:
        return true;
    }
  }

  // Click cookie
  clickCookie() {
    this.cookies += this.clickPower;
    this.totalCookies += this.clickPower;
    this.clicks++;
  }

  // Generate cookies from buildings
  generateCookies(deltaTime) {
    const currentTime = Date.now();
    
    // Handle cursor auto-clicks (every 3 seconds for testing)
    const cursorCount = this.buildings.cursor || 0;
    if (cursorCount > 0) {
      const timeSinceLastCursorClick = currentTime - this.lastCursorClick;
      const cursorInterval = 3000; // 3 seconds for testing
      
      if (timeSinceLastCursorClick >= cursorInterval) {
        // Auto-click for each cursor
        const autoClicks = Math.floor(timeSinceLastCursorClick / cursorInterval);
        const cookiesFromCursors = autoClicks * cursorCount * this.clickPower;
        
        this.cookies += cookiesFromCursors;
        this.totalCookies += cookiesFromCursors;
        this.clicks += autoClicks * cursorCount;
        
        this.lastCursorClick = currentTime;
        
        // Log for debugging
        console.log(`🖱️ Cursor auto-clicked! +${cookiesFromCursors} cookies (${cursorCount} cursors)`);
      }
    }
    
    // Handle CPS-based buildings (all except cursor)
    let cps = 0;
    BUILDINGS.forEach(building => {
      if (building.id !== 'cursor') { // Exclude cursor from CPS calculation
        const count = this.buildings[building.id] || 0;
        let buildingCps = count * building.baseCps * (1 + this.buildingBonus);
        
        // Apply grandma bonus if they have steroids
        if (building.id === 'grandma' && (this.buildings.steroids || 0) > 0) {
          buildingCps *= (1 + this.grandmaBonus);
        }
        
        // Apply steroid bonus
        if (building.id === 'steroids') {
          buildingCps *= this.steroidBonus;
        }
        
        cps += buildingCps;
      }
    });
    
    const cookiesGenerated = (cps * deltaTime) / 1000;
    
    // Safety check to prevent negative cookies
    if (cookiesGenerated > 0) {
      this.cookies += cookiesGenerated;
      this.totalCookies += cookiesGenerated;
    }
    
    // Ensure cookies never go negative
    if (this.cookies < 0) {
      this.cookies = 0;
    }
    if (this.totalCookies < 0) {
      this.totalCookies = 0;
    }
  }

  // Save game state
  save() {
    const saveData = {
      cookies: this.cookies,
      totalCookies: this.totalCookies,
      clicks: this.clicks,
      buildings: this.buildings,
      upgrades: Array.from(this.upgrades),
      achievements: Array.from(this.achievements),
      clickPower: this.clickPower,
      buildingBonus: this.buildingBonus,
      grandmaBonus: this.grandmaBonus,
      steroidBonus: this.steroidBonus,
      startTime: this.startTime,
      lastCursorClick: this.lastCursorClick,
      lastSave: Date.now()
    };
    localStorage.setItem('cookieClickerSave', JSON.stringify(saveData));
    this.lastSave = Date.now();
  }

  // Load game state
  load() {
    const saveData = localStorage.getItem('cookieClickerSave');
    if (saveData) {
      const data = JSON.parse(saveData);
      this.cookies = data.cookies || 0;
      this.totalCookies = data.totalCookies || 0;
      this.clicks = data.clicks || 0;
      this.buildings = data.buildings || {};
      this.upgrades = new Set(data.upgrades || []);
      this.achievements = new Set(data.achievements || []);
      this.clickPower = data.clickPower || 1;
      this.buildingBonus = data.buildingBonus || 0;
      this.grandmaBonus = data.grandmaBonus || 0;
      this.steroidBonus = data.steroidBonus || 1;
      this.startTime = data.startTime || Date.now();
      this.lastCursorClick = data.lastCursorClick || Date.now();
      this.lastSave = data.lastSave || Date.now();
      return true;
    }
    return false;
  }

  // Reset game
  reset() {
    this.cookies = 0;
    this.totalCookies = 0;
    this.clicks = 0;
    this.buildings = {};
    this.upgrades.clear();
    this.achievements.clear();
    this.clickPower = 1;
    this.buildingBonus = 0;
    this.grandmaBonus = 0;
    this.steroidBonus = 1;
    this.startTime = Date.now();
    this.lastCursorClick = Date.now();
    this.lastSave = Date.now();
    
    BUILDINGS.forEach(building => {
      this.buildings[building.id] = 0;
    });
    
    localStorage.removeItem('cookieClickerSave');
  }
}

// Utility functions
export const formatNumber = (num) => {
  if (num < 1000) return Math.floor(num).toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
  if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
  if (num < 1000000000000000) return (num / 1000000000000).toFixed(1) + 'T';
  return (num / 1000000000000000).toFixed(1) + 'Q';
};

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};
