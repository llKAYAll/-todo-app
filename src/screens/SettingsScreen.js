import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGame } from '../context/GameContext';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';

const SettingsScreen = () => {
  const { gameState, saveGameState } = useGame();

  const resetGame = () => {
    Alert.alert(
      'Oyunu Sıfırla',
      'Tüm ilerlemeniz silinecek. Emin misiniz?',
      [
        { text: 'İptal', onPress: () => {} },
        {
          text: 'Sıfırla',
          onPress: async () => {
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
            await saveGameState(defaultState);
            Alert.alert('Başarılı', 'Oyun sıfırlandı!');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⚙️ Ayarlar</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Oyun Bilgileri</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Sürüm:</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Oyuncu ID:</Text>
            <Text style={styles.infoValue}>{gameState?.userId}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seçenekler</Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetButtonText}>🔄 Oyunu Sıfırla</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  header: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.xxl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.white,
  },
  content: {
    paddingHorizontal: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.white,
    marginBottom: SPACING.lg,
  },
  infoCard: {
    backgroundColor: COLORS.lightDark,
    borderRadius: 12,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.lightGray,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.md,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.primary,
  },
  resetButton: {
    backgroundColor: COLORS.danger,
    borderRadius: 12,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.white,
  },
});

export default SettingsScreen;
