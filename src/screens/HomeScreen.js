import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useGame } from '../context/GameContext';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';

const HomeScreen = ({ navigation }) => {
  const { gameState, loading } = useGame();

  if (loading || !gameState) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>👑 Galeri KRALI</Text>
        <Text style={styles.subtitle}>Araç Alım-Satım Oyunu</Text>
      </View>

      {/* Player Info */}
      <View style={styles.playerInfo}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelNumber}>{gameState.level}</Text>
        </View>
        <View style={styles.playerDetails}>
          <Text style={styles.playerTitle}>{gameState.levelTitle}</Text>
          <Text style={styles.transactions}>İşlem: {gameState.totalTransactions}</Text>
        </View>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Mevcut Bakiye</Text>
        <Text style={styles.balanceAmount}>{gameState.balance.toLocaleString()}₺</Text>
      </View>

      {/* Statistics */}
      <View style={styles.statsGrid}>
        <View style={[styles.statBox, { borderLeftColor: COLORS.profit }]}>
          <Text style={styles.statLabel}>Toplam Kâr</Text>
          <Text style={[styles.statValue, { color: COLORS.profit }]}>
            +{gameState.totalProfit.toLocaleString()}₺
          </Text>
        </View>
        <View style={[styles.statBox, { borderLeftColor: COLORS.loss }]}>
          <Text style={styles.statLabel}>Toplam Zarar</Text>
          <Text style={[styles.statValue, { color: COLORS.loss }]}>
            -{gameState.totalLoss.toLocaleString()}₺
          </Text>
        </View>
      </View>

      {/* Inventory Info */}
      <View style={styles.inventoryInfo}>
        <Text style={styles.inventoryTitle}>Envanter</Text>
        <Text style={styles.inventoryCount}>
          {gameState.inventory.length} araç
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Buy')}
        >
          <Text style={styles.actionButtonText}>🛒 Araç Satın Al</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: COLORS.success }]}
          onPress={() => navigation.navigate('Sell')}
        >
          <Text style={styles.actionButtonText}>💰 Araç Sat</Text>
        </TouchableOpacity>
      </View>

      {/* Tips */}
      <View style={styles.tipsBox}>
        <Text style={styles.tipsTitle}>💡 İpuçları</Text>
        <Text style={styles.tipsText}>
          • Düşük motorlarla başlayarak deneyim kazanın{"\n"}
          • Ekspertiz istişe bağlıdır, kârlılığı hesaplayın{"\n"}
          • 10 işlem sonra yeni araçlar açılacak
        </Text>
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
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.lg,
    color: COLORS.lightGray,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  levelBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  levelNumber: {
    fontSize: TYPOGRAPHY.xxxl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.white,
  },
  playerDetails: {
    flex: 1,
  },
  playerTitle: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  transactions: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.lightGray,
  },
  balanceCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.lightDark,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  balanceLabel: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.lightGray,
    marginBottom: SPACING.sm,
  },
  balanceAmount: {
    fontSize: TYPOGRAPHY.xxxl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    gap: SPACING.lg,
  },
  statBox: {
    flex: 1,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.lightDark,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.lightGray,
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: TYPOGRAPHY.xl,
    fontWeight: TYPOGRAPHY.bold,
  },
  inventoryInfo: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.lightDark,
    borderRadius: 12,
  },
  inventoryTitle: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.lightGray,
    marginBottom: SPACING.sm,
  },
  inventoryCount: {
    fontSize: TYPOGRAPHY.xxl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.info,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    gap: SPACING.lg,
  },
  actionButton: {
    flex: 1,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.white,
  },
  tipsBox: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xxxl,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.lightDark,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  tipsTitle: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.warning,
    marginBottom: SPACING.md,
  },
  tipsText: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.lightGray,
    lineHeight: 20,
  },
});

export default HomeScreen;
