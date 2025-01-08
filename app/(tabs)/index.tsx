import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { Header } from '@/components/home/Header';
import { SearchBar } from '@/components/home/SearchBar';
import { CategoryCard } from '@/components/home/CategoryCard';
import { OfferCard } from '@/components/home/OfferCard';
import { categories } from '@/data/categories';
import { offers } from '@/data/offers';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { getResponsiveSpacing, getResponsiveFontSize } from '@/utils/responsive';

const { width } = Dimensions.get('window');
const maxContentWidth = 1200;

// Medicine categories data
const medicineCategories = [
  {
    id: 1,
    name: 'Painkillers',
    icon: '💊',
    color: '#FF9999'
  },
  {
    id: 2,
    name: 'Vitamins',
    icon: '🍊',
    color: '#FFB366'
  },
  {
    id: 3,
    name: 'Antibiotics',
    icon: '🔬',
    color: '#99FF99'
  },
  {
    id: 4,
    name: 'First Aid',
    icon: '🩹',
    color: '#99CCFF'
  },
  {
    id: 5,
    name: 'Skincare',
    icon: '🧴',
    color: '#FF99CC'
  }
];

// Advertisement data
const advertisements = [
  {
    id: 1,
    title: 'Special Discount!',
    description: '20% off on all medicines',
    backgroundColor: '#FFE5E5',
    image: 'https://img.freepik.com/free-vector/pharmacy-medicine-concept_1284-3494.jpg'
  },
  {
    id: 2,
    title: 'Free Delivery',
    description: 'On orders above ₹500',
    backgroundColor: '#E5F2FF',
    image: 'https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg'
  }
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const handleCategoryPress = (categoryId: number) => {
    router.push({
      pathname: '/category/[id]',
      params: { id: categoryId }
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ThemedView style={styles.content}>
        <Header />
        
        <ScrollView style={styles.mainContent}>
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Medicine Categories ScrollView */}
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
          </ThemedView>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContainer}
          >
            {medicineCategories.map((category) => (
              <ThemedView 
                key={category.id}
                style={[styles.categoryItem, { backgroundColor: category.color }]}
              >
                <ThemedText style={styles.categoryIcon}>{category.icon}</ThemedText>
                <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
              </ThemedView>
            ))}
          </ScrollView>

          {/* Advertisements Section */}
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Special Offers</ThemedText>
          </ThemedView>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.adsScroll}
            contentContainerStyle={styles.adsContainer}
          >
            {advertisements.map((ad) => (
              <ThemedView 
                key={ad.id}
                style={[styles.adCard, { backgroundColor: ad.backgroundColor }]}
              >
                <ThemedText style={styles.adTitle}>{ad.title}</ThemedText>
                <ThemedText style={styles.adDescription}>{ad.description}</ThemedText>
              </ThemedView>
            ))}
          </ScrollView>

          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Shop by Category</ThemedText>
            <Link href="/categories" style={styles.viewAll}>View all</Link>
          </ThemedView>

          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category.id)}
              />
            ))}
          </View>

          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Offers</ThemedText>
            <Link href="/offers" style={styles.viewAll}>View all</Link>
          </ThemedView>

          <View style={styles.offersContainer}>
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onPress={() => {}}
              />
            ))}
          </View>
        </ScrollView>
      </ThemedView>
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
  },
  mainContent: {
    width: '100%',
    maxWidth: maxContentWidth,
    paddingHorizontal: getResponsiveSpacing(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getResponsiveSpacing(16),
  },
  sectionTitle: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: '600',
  },
  viewAll: {
    color: '#6366f1',
    fontSize: getResponsiveFontSize(14),
  },
  categoriesScroll: {
    marginBottom: getResponsiveSpacing(16),
  },
  categoriesContainer: {
    paddingHorizontal: getResponsiveSpacing(8),
  },
  categoryItem: {
    padding: getResponsiveSpacing(16),
    borderRadius: getResponsiveSpacing(12),
    marginRight: getResponsiveSpacing(12),
    alignItems: 'center',
    minWidth: 100,
  },
  categoryIcon: {
    fontSize: getResponsiveFontSize(24),
    marginBottom: getResponsiveSpacing(8),
  },
  categoryName: {
    fontSize: getResponsiveFontSize(14),
    fontWeight: '600',
    color: '#000000',
  },
  adsScroll: {
    marginBottom: getResponsiveSpacing(16),
  },
  adsContainer: {
    paddingHorizontal: getResponsiveSpacing(8),
  },
  adCard: {
    padding: getResponsiveSpacing(16),
    borderRadius: getResponsiveSpacing(12),
    marginRight: getResponsiveSpacing(12),
    width: width * 0.8,
    maxWidth: 300,
  },
  adTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    marginBottom: getResponsiveSpacing(8),
    color: '#000000',
  },
  adDescription: {
    fontSize: getResponsiveFontSize(14),
    color: '#666666',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: getResponsiveSpacing(16),
  },
  offersContainer: {
    width: '100%',
    flexDirection: width > 768 ? 'row' : 'column',
    gap: getResponsiveSpacing(16),
  },
});