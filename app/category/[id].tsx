import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Image, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { categories } from '@/data/categories';
import { medicines } from '@/data/medicines';

export default function CategoryDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const category = categories.find(c => c.id.toString() === id);
  const categoryMedicines = category ? medicines[category.title] : [];

  const handleAddToCart = (medicine: any) => {
    addToCart({
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      image: medicine.image,
      packageQuantity: medicine.quantity
    });
  };

  if (!category) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={themeColors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Category Not Found</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

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
        <View style={styles.medicineDetails}>
          <ThemedText style={[styles.medicineQuantity, { color: themeColors.textSecondary }]}>
            {item.quantity}
          </ThemedText>
          <ThemedText style={styles.medicinePrice}>₹{item.price}</ThemedText>
        </View>
        <View style={styles.stockContainer}>
          <View style={[
            styles.stockIndicator, 
            { backgroundColor: item.inStock ? themeColors.success : themeColors.error }
          ]}>
            <ThemedText style={styles.stockText}>
              {item.inStock ? 'In Stock' : 'Out of Stock'}
            </ThemedText>
          </View>
          {item.inStock && (
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: themeColors.primary }]}
              onPress={() => handleAddToCart(item)}
            >
              <ThemedText style={styles.addButtonText}>Add</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>{category.title}</ThemedText>
      </View>

      <FlatList
        data={categoryMedicines}
        renderItem={renderMedicineItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  medicineCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  medicineImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  medicineDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  medicineDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  medicineQuantity: {
    fontSize: 14,
  },
  medicinePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  stockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});