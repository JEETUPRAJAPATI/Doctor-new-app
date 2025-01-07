import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image, View, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { medicines } from '@/data/medicines';

export default function MedicineDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  // Find medicine from all categories
  const medicine = Object.values(medicines)
    .flat()
    .find(m => m.id.toString() === id);

  if (!medicine) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
        <ThemedText>Medicine not found</ThemedText>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      image: medicine.image,
      packageQuantity: medicine.quantity
    });
    Alert.alert(
      'Added to Cart',
      'Medicine has been added to your cart',
      [
        {
          text: 'Continue Shopping',
          style: 'cancel',
        },
        {
          text: 'View Cart',
          onPress: () => router.push('/cart'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/cart')} style={styles.cartButton}>
          <Ionicons name="cart-outline" size={24} color={themeColors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Image source={{ uri: medicine.image }} style={styles.image} />
        
        <View style={styles.details}>
          <ThemedText style={styles.name}>{medicine.name}</ThemedText>
          <ThemedText style={styles.manufacturer}>{medicine.manufacturer}</ThemedText>
          <ThemedText style={styles.description}>{medicine.description}</ThemedText>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoLabel}>Quantity</ThemedText>
              <ThemedText style={styles.infoValue}>{medicine.quantity}</ThemedText>
            </View>
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoLabel}>Usage</ThemedText>
              <ThemedText style={styles.infoValue}>{medicine.usage}</ThemedText>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <ThemedText style={styles.price}>₹{medicine.price}</ThemedText>
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: themeColors.primary }]}
              onPress={handleAddToCart}
            >
              <ThemedText style={styles.addButtonText}>Add to Cart</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  cartButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  details: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  manufacturer: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});