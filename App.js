import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GameProvider } from './src/context/GameContext';
import { COLORS } from './src/styles/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import BuyScreen from './src/screens/BuyScreen';
import SellScreen from './src/screens/SellScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.dark,
          borderTopColor: COLORS.primary,
          borderTopWidth: 1,
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Inventory') {
            iconName = 'layers';
          } else if (route.name === 'Stats') {
            iconName = 'bar-chart';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Ana Sayfa' }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{ tabBarLabel: 'Envanter' }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{ tabBarLabel: 'İstatistikler' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Ayarlar' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const gameData = await AsyncStorage.getItem('gameState');
        if (!gameData) {
          const defaultState = {
            userId: 'user_' + Date.now(),
            balance: 150000,
            level: 1,
            levelTitle: 'Başlangıç Satıcısı',
            totalTransactions: 0,
            totalProfit: 0,
            totalLoss: 0,
            inventory: [],
            transactionHistory: [],
            expertise: {
              completed: 0,
              pending: 0,
              optional: true,
            },
            statistics: {
              totalBought: 0,
              totalSold: 0,
              averageProfit: 0,
              bestSale: null,
              worstSale: null,
            },
            createdAt: new Date().toISOString(),
          };
          await AsyncStorage.setItem('gameState', JSON.stringify(defaultState));
        }
      } catch (e) {
        console.error('Failed to restore state', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.dark }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={HomeTabs} />
          <Stack.Screen name="Buy" component={BuyScreen} />
          <Stack.Screen name="Sell" component={SellScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
