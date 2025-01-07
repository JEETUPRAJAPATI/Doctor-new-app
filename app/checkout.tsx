import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { lightTheme, darkTheme } from '@/constants/theme';

export default function CheckoutScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { items, getTotalPrice } = useCart();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handlePayment = () => {
    if (!selectedAddress) {
      if (Platform.OS === 'web') {
        window.alert('Please select a delivery address');
      } else {
        Alert.alert('Error', 'Please select a delivery address');
      }
      return;
    }
    router.push('/payment');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Checkout</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.section, { backgroundColor: themeColors.surface }]}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Delivery Address</ThemedText>
            <TouchableOpacity onPress={() => router.push('/new-address')}>
              <ThemedText style={[styles.addButton, { color: themeColors.primary }]}>
                Add New
              </ThemedText>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[styles.addressCard, { backgroundColor: themeColors.background }]}
            onPress={() => setSelectedAddress('home')}
          >
            <View style={styles.addressHeader}>
              <ThemedText style={styles.addressType}>Home</ThemedText>
              {selectedAddress === 'home' && (
                <Ionicons name="checkmark-circle" size={24} color={themeColors.primary} />
              )}
            </View>
            <ThemedText style={[styles.addressText, { color: themeColors.textSecondary }]}>
              123 Main Street, Apt 4B{'\n'}
              New York, NY 10001
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.surface }]}>
          <ThemedText style={styles.sectionTitle}>Order Summary</ThemedText>
          {items.map(item => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                <ThemedText style={[styles.itemQuantity, { color: themeColors.textSecondary }]}>
                  Qty: {item.quantity}
                </ThemedText>
              </View>
              <ThemedText style={styles.itemPrice}>₹{item.price * item.quantity}</ThemedText>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.surface }]}>
          <ThemedText style={styles.sectionTitle}>Price Details</ThemedText>
          <View style={styles.priceRow}>
            <ThemedText>Items Total</ThemedText>
            <ThemedText>₹{getTotalPrice()}</ThemedText>
          </View>
          <View style={styles.priceRow}>
            <ThemedText>Delivery Charges</ThemedText>
            <ThemedText style={{ color: themeColors.success }}>FREE</ThemedText>
          </View>
          <View style={[styles.totalRow, { borderTopColor: themeColors.border }]}>
            <ThemedText style={styles.totalText}>Total Amount</ThemedText>
            <ThemedText style={styles.totalAmount}>₹{getTotalPrice()}</ThemedText>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: themeColors.surface }]}>
        <View style={styles.footerContent}>
          <View>
            <ThemedText style={[styles.totalLabel, { color: themeColors.textSecondary }]}>
              Total Amount
            </ThemedText>
            <ThemedText style={styles.footerTotal}>₹{getTotalPrice()}</ThemedText>
          </View>
          <TouchableOpacity 
            style={[styles.paymentButton, { backgroundColor: themeColors.primary }]}
            onPress={handlePayment}
          >
            <ThemedText style={styles.paymentButtonText}>Proceed to Payment</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    fontSize: 16,
  },
  addressCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 14,
    lineHeight: 20,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  footerTotal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});