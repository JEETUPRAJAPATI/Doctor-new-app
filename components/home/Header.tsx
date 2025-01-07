import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { getResponsiveFontSize, getResponsiveSpacing } from '@/utils/responsive';

const { width } = Dimensions.get('window');

export function Header() {
  const router = useRouter();
  const { theme } = useTheme();
  const { getItemCount } = useCart();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const handleAddressPress = () => {
    router.push('/address');
  };

  const handleCartPress = () => {
    router.push('/cart');
  };

  const itemCount = getItemCount();
  const iconSize = width > 768 ? 28 : 24;

  return (
    <View style={[styles.header, { backgroundColor: themeColors.background }]}>
      <TouchableOpacity 
        style={styles.locationContainer}
        onPress={handleAddressPress}
      >
        <Ionicons name="location-outline" size={iconSize} color={themeColors.text} />
        <ThemedText style={styles.locationText}>Home</ThemedText>
        <Ionicons name="chevron-down" size={iconSize - 4} color={themeColors.text} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.cartContainer}
        onPress={handleCartPress}
      >
        <Ionicons name="cart-outline" size={iconSize} color={themeColors.text} />
        {itemCount > 0 && (
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>{itemCount}</ThemedText>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: getResponsiveSpacing(16),
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: getResponsiveSpacing(8),
    marginRight: getResponsiveSpacing(4),
    fontSize: getResponsiveFontSize(16),
  },
  cartContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -getResponsiveSpacing(6),
    top: -getResponsiveSpacing(6),
    backgroundColor: '#ef4444',
    borderRadius: getResponsiveSpacing(10),
    minWidth: getResponsiveSpacing(20),
    height: getResponsiveSpacing(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getResponsiveSpacing(4),
  },
  badgeText: {
    fontSize: getResponsiveFontSize(12),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});