import React from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { getResponsiveValue, getResponsiveFontSize, getResponsiveSpacing } from '@/utils/responsive';

const { width } = Dimensions.get('window');
const maxContentWidth = 1200;
const isTablet = width >= 768;

export default function CartScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={themeColors.text} />
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>Cart</ThemedText>
          </View>
        </View>
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={64} color={themeColors.textSecondary} />
          <ThemedText style={styles.emptyText}>Your cart is empty</ThemedText>
          <TouchableOpacity 
            style={[styles.shopButton, { backgroundColor: themeColors.primary }]}
            onPress={() => router.push('/')}
          >
            <ThemedText style={styles.shopButtonText}>Start Shopping</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={themeColors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Cart</ThemedText>
        </View>
      </View>

      <View style={styles.mainContent}>
        <ScrollView style={styles.content}>
          <View style={styles.cartItemsContainer}>
            {items.map((item) => (
              <View 
                key={item.id} 
                style={[styles.cartItem, { backgroundColor: themeColors.surface }]}
              >
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                  <ThemedText style={styles.itemQuantity}>{item.packageQuantity}</ThemedText>
                  <ThemedText style={styles.itemPrice}>₹{item.price}</ThemedText>
                </View>
                <View style={styles.quantityControls}>
                  <TouchableOpacity 
                    style={[styles.quantityButton, { backgroundColor: themeColors.background }]}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <ThemedText style={styles.quantityButtonText}>-</ThemedText>
                  </TouchableOpacity>
                  <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
                  <TouchableOpacity 
                    style={[styles.quantityButton, { backgroundColor: themeColors.background }]}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <ThemedText style={styles.quantityButtonText}>+</ThemedText>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Ionicons name="trash-outline" size={24} color={themeColors.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: themeColors.surface }]}>
          <View style={styles.footerContent}>
            <View style={styles.totalContainer}>
              <ThemedText style={styles.totalLabel}>Total Amount</ThemedText>
              <ThemedText style={styles.totalPrice}>₹{getTotalPrice()}</ThemedText>
            </View>
            <TouchableOpacity 
              style={[styles.checkoutButton, { backgroundColor: themeColors.primary }]}
              onPress={handleCheckout}
            >
              <ThemedText style={styles.checkoutButtonText}>Proceed to Checkout</ThemedText>
            </TouchableOpacity>
          </View>
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
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: getResponsiveSpacing(16),
    maxWidth: maxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  backButton: {
    marginRight: getResponsiveSpacing(16),
  },
  headerTitle: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: maxContentWidth,
  },
  cartItemsContainer: {
    padding: getResponsiveSpacing(16),
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: getResponsiveSpacing(16),
    borderRadius: getResponsiveSpacing(12),
    marginBottom: getResponsiveSpacing(16),
  },
  itemImage: {
    width: getResponsiveValue(80, 100, 120),
    height: getResponsiveValue(80, 100, 120),
    borderRadius: getResponsiveSpacing(8),
  },
  itemInfo: {
    flex: 1,
    marginLeft: getResponsiveSpacing(16),
  },
  itemName: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: '600',
    marginBottom: getResponsiveSpacing(4),
  },
  itemQuantity: {
    fontSize: getResponsiveFontSize(14),
    marginBottom: getResponsiveSpacing(4),
  },
  itemPrice: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
    color: '#6366f1',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: getResponsiveSpacing(16),
  },
  quantityButton: {
    width: getResponsiveValue(30, 35, 40),
    height: getResponsiveValue(30, 35, 40),
    borderRadius: getResponsiveValue(15, 17.5, 20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: getResponsiveSpacing(12),
    fontSize: getResponsiveFontSize(16),
    fontWeight: '600',
  },
  removeButton: {
    padding: getResponsiveSpacing(8),
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getResponsiveSpacing(20),
  },
  emptyText: {
    fontSize: getResponsiveFontSize(18),
    marginTop: getResponsiveSpacing(16),
    marginBottom: getResponsiveSpacing(24),
  },
  shopButton: {
    paddingHorizontal: getResponsiveSpacing(32),
    paddingVertical: getResponsiveSpacing(16),
    borderRadius: getResponsiveSpacing(12),
  },
  shopButtonText: {
    color: 'white',
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    borderTopLeftRadius: getResponsiveSpacing(24),
    borderTopRightRadius: getResponsiveSpacing(24),
  },
  footerContent: {
    maxWidth: maxContentWidth,
    width: '100%',
    alignSelf: 'center',
    padding: getResponsiveSpacing(16),
    flexDirection: isTablet ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: isTablet ? 'center' : 'stretch',
    gap: getResponsiveSpacing(16),
  },
  totalContainer: {
    flexDirection: isTablet ? 'row' : 'column',
    alignItems: isTablet ? 'center' : 'flex-start',
    gap: getResponsiveSpacing(8),
  },
  totalLabel: {
    fontSize: getResponsiveFontSize(14),
  },
  totalPrice: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: 'bold',
    color: '#6366f1',
  },
  checkoutButton: {
    paddingHorizontal: getResponsiveSpacing(24),
    paddingVertical: getResponsiveSpacing(16),
    borderRadius: getResponsiveSpacing(12),
    alignItems: 'center',
    flex: isTablet ? 1 : undefined,
    maxWidth: isTablet ? 300 : undefined,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
  },
});