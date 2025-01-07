import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

const orders = [
  {
    id: 48,
    seller: 'Test Seller',
    date: '7th Jan 2025',
    product: 'Allergy Relief Test',
    price: 'PKR58.44',
    status: 'NEW',
    image: 'https://placehold.co/40x40'
  },
  {
    id: 47,
    seller: 'Test Seller',
    date: '19th Dec 2024',
    product: 'Allergy Relief Test',
    price: 'PKR58.44',
    status: 'NEW',
    image: 'https://placehold.co/40x40'
  }
];

export default function OrdersScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>My Orders</ThemedText>
      </View>

      <ScrollView>
        <ThemedText style={styles.sectionTitle}>In Process</ThemedText>

        {orders.map((order) => (
          <View 
            key={order.id} 
            style={[styles.orderCard, { borderBottomColor: themeColors.border }]}
          >
            <View style={styles.orderHeader}>
              <View style={styles.sellerInfo}>
                <Image source={{ uri: order.image }} style={styles.sellerImage} />
                <View>
                  <ThemedText style={styles.sellerName}>{order.seller}</ThemedText>
                  <ThemedText style={[styles.orderDate, { color: themeColors.textSecondary }]}>
                    {order.date}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[
                styles.orderStatus,
                { color: order.status === 'ACCEPTED' ? themeColors.primary : themeColors.text }
              ]}>
                {order.status}
              </ThemedText>
            </View>
            <ThemedText style={styles.productName}>{order.product}</ThemedText>
            <ThemedText style={[styles.orderInfo, { color: themeColors.textSecondary }]}>
              Order ID{order.id} | {order.price}
            </ThemedText>
          </View>
        ))}
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
  sectionTitle: {
    fontSize: 16,
    padding: 16,
    opacity: 0.6,
  },
  orderCard: {
    padding: 16,
    borderBottomWidth: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  orderDate: {
    fontSize: 14,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  productName: {
    fontSize: 16,
    marginBottom: 4,
  },
  orderInfo: {
    fontSize: 14,
  },
});