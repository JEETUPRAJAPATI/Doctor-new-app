import React from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { lightTheme, darkTheme } from '@/constants/theme';

export default function PaymentScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { getTotalPrice, clearCart } = useCart();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;
  const [selectedMethod, setSelectedMethod] = React.useState('');

  const handlePayment = () => {
    if (!selectedMethod) {
      if (Platform.OS === 'web') {
        window.alert('Please select a payment method');
      } else {
        Alert.alert('Error', 'Please select a payment method');
      }
      return;
    }

    clearCart();
    router.replace('/order-confirmation');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Payment</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.section, { backgroundColor: themeColors.surface }]}>
          <ThemedText style={styles.sectionTitle}>Select Payment Method</ThemedText>
          
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              { backgroundColor: themeColors.background },
              selectedMethod === 'card' && { borderColor: themeColors.primary }
            ]}
            onPress={() => setSelectedMethod('card')}
          >
            <View style={styles.methodInfo}>
              <Ionicons name="card" size={24} color={themeColors.primary} />
              <ThemedText style={styles.methodName}>Credit/Debit Card</ThemedText>
            </View>
            {selectedMethod === 'card' && (
              <Ionicons name="checkmark-circle" size={24} color={themeColors.primary} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentMethod,
              { backgroundColor: themeColors.background },
              selectedMethod === 'cod' && { borderColor: themeColors.primary }
            ]}
            onPress={() => setSelectedMethod('cod')}
          >
            <View style={styles.methodInfo}>
              <Ionicons name="cash" size={24} color={themeColors.primary} />
              <ThemedText style={styles.methodName}>Cash on Delivery</ThemedText>
            </View>
            {selectedMethod === 'cod' && (
              <Ionicons name="checkmark-circle" size={24} color={themeColors.primary} />
            )}
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.surface }]}>
          <ThemedText style={styles.sectionTitle}>Amount to Pay</ThemedText>
          <ThemedText style={styles.amount}>₹{getTotalPrice()}</ThemedText>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: themeColors.surface }]}>
        <TouchableOpacity 
          style={[styles.payButton, { backgroundColor: themeColors.primary }]}
          onPress={handlePayment}
        >
          <ThemedText style={styles.payButtonText}>Pay ₹{getTotalPrice()}</ThemedText>
        </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodName: {
    fontSize: 16,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
  },
  payButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});