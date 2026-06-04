import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateExpertiseCost } from '../utils/expertiseUtils';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load game state from storage
  useEffect(() => {
    const loadGameState = async () => {
      try {
        const data = await AsyncStorage.getItem('gameState');
        if (data) {
          setGameState(JSON.parse(data));
        }
      } catch (e) {
        console.error('Error loading game state:', e);
      } finally {
        setLoading(false);
      }
    };
    loadGameState();
  }, []);

  // Save game state to storage
  const saveGameState = async (newState) => {
    try {
      await AsyncStorage.setItem('gameState', JSON.stringify(newState));
      setGameState(newState);
    } catch (e) {
      console.error('Error saving game state:', e);
    }
  };

  // Buy vehicle
  const buyVehicle = (vehicle) => {
    if (!gameState || gameState.balance < vehicle.buyPrice.avg) {
      return { success: false, message: 'Yetersiz bakiye!' };
    }

    const newState = { ...gameState };
    newState.balance -= vehicle.buyPrice.avg;
    newState.totalTransactions += 1;
    
    const newInventoryItem = {
      id: 'item_' + Date.now(),
      ...vehicle,
      boughtPrice: vehicle.buyPrice.avg,
      boughtDate: new Date().toISOString(),
      expertise: {
        done: false,
        cost: calculateExpertiseCost(gameState.level),
        result: null,
      },
    };

    newState.inventory.push(newInventoryItem);
    newState.statistics.totalBought += 1;
    
    // Check level up
    const levelUp = checkLevelUp(newState.totalTransactions);
    if (levelUp) {
      newState.level = levelUp.level;
      newState.levelTitle = levelUp.title;
    }

    saveGameState(newState);
    return { success: true, message: 'Araç satın alındı!' };
  };

  // Sell vehicle
  const sellVehicle = (inventoryId, sellPrice, bargainRate) => {
    if (!gameState) return { success: false, message: 'Hata!' };

    const newState = { ...gameState };
    const itemIndex = newState.inventory.findIndex((item) => item.id === inventoryId);
    
    if (itemIndex === -1) {
      return { success: false, message: 'Araç bulunamadı!' };
    }

    const item = newState.inventory[itemIndex];
    const bargainAmount = sellPrice * bargainRate;
    let totalCost = item.boughtPrice + bargainAmount;

    if (item.expertise.done) {
      totalCost += item.expertise.cost;
    }

    const profit = sellPrice - totalCost;

    newState.balance += sellPrice;
    newState.totalTransactions += 1;
    newState.statistics.totalSold += 1;

    if (profit > 0) {
      newState.totalProfit += profit;
    } else {
      newState.totalLoss += Math.abs(profit);
    }

    // Update best/worst sale
    if (!newState.statistics.bestSale || profit > newState.statistics.bestSale.profit) {
      newState.statistics.bestSale = { ...item, profit };
    }
    if (!newState.statistics.worstSale || profit < newState.statistics.worstSale.profit) {
      newState.statistics.worstSale = { ...item, profit };
    }

    newState.inventory.splice(itemIndex, 1);

    // Add to transaction history
    newState.transactionHistory.push({
      id: 'trans_' + Date.now(),
      type: 'sell',
      vehicle: item,
      sellPrice,
      bargainRate,
      profit,
      date: new Date().toISOString(),
    });

    // Check level up
    const levelUp = checkLevelUp(newState.totalTransactions);
    if (levelUp) {
      newState.level = levelUp.level;
      newState.levelTitle = levelUp.title;
    }

    saveGameState(newState);
    return { success: true, message: `Araç satıldı! Kâr: ${profit}₺`, profit };
  };

  // Do expertise
  const doExpertise = (inventoryId) => {
    if (!gameState) return { success: false, message: 'Hata!' };

    const newState = { ...gameState };
    const item = newState.inventory.find((inv) => inv.id === inventoryId);

    if (!item) {
      return { success: false, message: 'Araç bulunamadı!' };
    }

    const expertiseCost = calculateExpertiseCost(newState.level);
    if (newState.balance < expertiseCost) {
      return { success: false, message: 'Ekspertiz için yetersiz bakiye!' };
    }

    newState.balance -= expertiseCost;
    item.expertise.done = true;
    item.expertise.cost = expertiseCost;
    item.expertise.result = getRandomExpertiseResult();

    newState.expertise.completed += 1;

    saveGameState(newState);
    return { 
      success: true, 
      message: `Ekspertiz tamamlandı! Sonuç: ${item.expertise.result.status}`,
      result: item.expertise.result
    };
  };

  // Check level up
  const checkLevelUp = (transactions) => {
    const levels = [
      { transactions: 0, level: 1, title: 'Başlangıç Satıcısı' },
      { transactions: 11, level: 2, title: 'Deneyimli Satıcı' },
      { transactions: 51, level: 3, title: 'Usta Tüccar' },
      { transactions: 151, level: 4, title: 'Megastore Sahibi' },
    ];

    for (let i = levels.length - 1; i >= 0; i--) {
      if (transactions >= levels[i].transactions) {
        return levels[i];
      }
    }
    return null;
  };

  // Get random expertise result
  const getRandomExpertiseResult = () => {
    const results = [
      { status: 'Temiz', bargainAdjustment: 0.20, icon: '✅' },
      { status: 'Küçük Hasar', bargainAdjustment: 0.25, icon: '⚠️' },
      { status: 'Orta Hasar', bargainAdjustment: 0.30, icon: '⚠️⚠️' },
      { status: 'Ciddi Hasar', bargainAdjustment: 0.35, icon: '❌' },
    ];

    const weights = [0.40, 0.35, 0.20, 0.05];
    const random = Math.random();
    let accumulated = 0;

    for (let i = 0; i < weights.length; i++) {
      accumulated += weights[i];
      if (random <= accumulated) {
        return results[i];
      }
    }

    return results[0];
  };

  const value = {
    gameState,
    loading,
    buyVehicle,
    sellVehicle,
    doExpertise,
    saveGameState,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
