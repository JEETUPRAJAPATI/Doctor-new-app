import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
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
        
        <View style={styles.mainContent}>
          <SearchBar 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

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
        </View>
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
  categoriesContainer: {
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