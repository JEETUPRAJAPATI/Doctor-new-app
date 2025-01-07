import React from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { medicines } from '@/data/medicines';

type Props = {
  subcategory: string;
};

export function SubcategoryMedicines({ subcategory }: Props) {
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;
  const subcategoryMedicines = medicines[subcategory] || [];

  const renderMedicineItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.medicineCard, { backgroundColor: themeColors.surface }]}
      onPress={() => {/* Handle medicine selection */}}
    >
      <Image source={{ uri: item.image }} style={styles.medicineImage} />
      <View style={styles.medicineInfo}>
        <ThemedText style={styles.medicineName}>{item.name}</ThemedText>
        <ThemedText style={[styles.medicineDescription, { color: themeColors.textSecondary }]}>
          {item.description}
        </ThemedText>
        <View style={styles.priceRow}>
          <ThemedText style={styles.medicinePrice}>₹{item.price}</ThemedText>
          <View style={[
            styles.stockIndicator, 
            { backgroundColor: item.inStock ? themeColors.success : themeColors.error }
          ]}>
            <ThemedText style={styles.stockText}>
              {item.inStock ? 'In Stock' : 'Out of Stock'}
            </ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={subcategoryMedicines}
        renderItem={renderMedicineItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  medicineCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  medicineImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  medicineInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  medicineDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicinePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  stockIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockText: {
    fontSize: 12,
    color: 'white',
  },
});