import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Carousel from 'react-native-snap-carousel';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 48; // Full width minus padding

const ads = [
  {
    id: 1,
    title: 'Special Discount',
    subtitle: 'Get 20% off on all medicines',
    image: 'https://img.freepik.com/free-vector/pharmacy-medicine-concept_1284-3494.jpg',
    backgroundColor: '#FF6B6B',
    validUntil: '31st Jan 2024'
  },
  {
    id: 2,
    title: 'Free Delivery',
    subtitle: 'On orders above ₹500',
    image: 'https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg',
    backgroundColor: '#4ECDC4',
    validUntil: 'Limited time offer'
  },
  {
    id: 3,
    title: 'Health Package',
    subtitle: 'Complete health checkup at ₹999',
    image: 'https://img.freepik.com/free-vector/medical-healthcare-protection-illustration_23-2148533115.jpg',
    backgroundColor: '#45B7D1',
    validUntil: 'Book now'
  }
];

export function AdSection() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.adCard, { backgroundColor: item.backgroundColor }]}
      onPress={() => {/* Handle ad click */}}
    >
      <View style={styles.adContent}>
        <View style={styles.textContent}>
          <ThemedText style={styles.title}>{item.title}</ThemedText>
          <ThemedText style={styles.subtitle}>{item.subtitle}</ThemedText>
          <ThemedText style={styles.validUntil}>{item.validUntil}</ThemedText>
        </View>
        <Image 
          source={{ uri: item.image }} 
          style={styles.adImage}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={ads}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={ITEM_WIDTH}
        activeSlideAlignment="center"
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={0.7}
        autoplay
        autoplayInterval={3000}
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  adCard: {
    height: 160,
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
  },
  adContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 8,
  },
  validUntil: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  adImage: {
    width: 120,
    height: 120,
  },
});