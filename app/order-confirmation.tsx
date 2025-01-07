import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

export default function OrderConfirmationScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  // Generate random order ID
  const orderId = Math.random().toString(36).substring(7).toUpperCase();
  
  // Calculate estimated delivery date (3 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={80} color={themeColors.success} />
        
        <ThemedText style={styles.title}>Order Confirmed!</ThemedText>
        
        <ThemedText style={styles.orderId}>Order ID: #{orderId}</ThemedText>
        
        <ThemedText style={styles.message}>
          Thank you for your order. We'll send you a notification when your order is ready.
        </ThemedText>
        
        <ThemedText style={styles.delivery}>
          Estimated Delivery: {formattedDate}
        </ThemedText>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: themeColors.primary }]}
          onPress={() => router.replace('/(tabs)')}
        >
          <ThemedText style={styles.buttonText}>Continue Shopping</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  orderId: {
    fontSize: 18,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
  delivery: {
    fontSize: 16,
    marginBottom: 40,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});