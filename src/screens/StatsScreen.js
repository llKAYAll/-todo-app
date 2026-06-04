import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';

const StatsScreen = () => {
  const { gameState } = useGame();

  if (!gameState) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📊 İstatistikler</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Toplam İşlem</Text>
          <Text style={styles.statValue}>{gameState.totalTransactions}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Satın Alınan Araçlar</Text>
          <Text style={styles.statValue}>{gameState.statistics.totalBought}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Satılan Araçlar</Text>
          <Text style={styles.statValue}>{gameState.statistics.totalSold}</Text>
        </View>

        <View style={[styles.statCard, { borderLeftColor: COLORS.profit }]}>
          <Text style={styles.statLabel}>Net Kâr</Text>
          <Text style={[styles.statValue, { color: COLORS.profit }]}>
            +{gameState.totalProfit.toLocaleString()}₺
          </Text>
        </View>

        <View style={[styles.statCard, { borderLeftColor: COLORS.loss }]}>
          <Text style={styles.statLabel}>Net Zarar</Text>
          <Text style={[styles.statValue, { color: COLORS.loss }]}>
            -{gameState.totalLoss.toLocaleString()}₺
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  loadingText: {
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 50,
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
  statsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  statCard: {
    backgroundColor: COLORS.lightDark,
    borderRadius: 12,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.lightGray,
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: TYPOGRAPHY.xxl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.white,
  },
});

export default StatsScreen;
