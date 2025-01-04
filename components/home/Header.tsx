import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={24} color="white" />
        <Text style={styles.locationText}>Home</Text>
      </View>
      <View style={styles.cartContainer}>
        <Ionicons name="cart-outline" size={24} color="white" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>0</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
  cartContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});