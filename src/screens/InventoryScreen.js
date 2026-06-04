import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useGame } from '../context/GameContext';
import { COLORS } from '../styles/colors';
import { SPACING } from '../styles/spacing';
import { TYPOGRAPHY } from '../styles/typography';

const InventoryScreen = ({ navigation }) => {
  const { gameState } = useGame();

  if (!gameState) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  const renderInventoryItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemModel}>{item.brand} {item.model}</Text>
        <Text style={styles.itemCc}>{item.cc} cc</Text>
      </View>

      <View style={styles.itemDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Satın Alış:</Text>
          <Text style={styles.detailValue}>{item.boughtPrice.toLocaleString()}₺</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ekspertiz:</Text>
          <Text style={[styles.detailValue, { color: item.expertise.done ? COLORS.success : COLORS.warning }]}>
            {item.expertise.done ? '✅ Yapıldı' : '❌ Yapılmadı'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.sellButton}
        onPress={() => navigation.navigate('Sell', { inventoryId: item.id })}
      >
        <Text style={styles.sellButtonText}>💰 Sat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Envanter</Text>
        <Text style={styles.headerSubtitle}>{gameState.inventory.length} araç</Text>
      </View>

      {gameState.inventory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>📦 Envanteriniz boş</Text>
          <Text style={styles.emptySubtext}>Araç satın almaya başlayın</Text>
        </View>
      ) : (
        <FlatList
          data={gameState.inventory}
          renderItem={renderInventoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      )}
    </View>
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
  headerTitle: {
    fontSize: TYPOGRAPHY.xxl,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.lightGray,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  itemCard: {
    backgroundColor: COLORS.lightDark,
    borderRadius: 12,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  itemModel: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.white,
  },
  itemCc: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.semibold,
  },
  itemDetails: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  detailLabel: {
    fontSize: TYPOGRAPHY.sm,
    color: COLORS.lightGray,
  },
  detailValue: {
    fontSize: TYPOGRAPHY.md,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.white,
  },
  sellButton: {
    backgroundColor: COLORS.success,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  sellButtonText: {
    fontSize: TYPOGRAPHY.lg,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.xl,
    color: COLORS.lightGray,
    marginBottom: SPACING.md,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.gray,
  },
});

export default InventoryScreen;
