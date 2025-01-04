import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Header } from '@/components/home/Header';
import { SearchBar } from '@/components/home/SearchBar';
import { CategoryCard } from '@/components/home/CategoryCard';
import { OfferCard } from '@/components/home/OfferCard';
import { categories } from '@/data/categories';
import { offers } from '@/data/offers';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />

        <Text style={styles.greeting}>Hello, Test user.</Text>
        <Text style={styles.title}>Find your medicines</Text>

        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <Link href="/categories" style={styles.viewAll}>View all</Link>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={() => {}}
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Offers</Text>
          <Link href="/offers" style={styles.viewAll}>View all</Link>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offersContainer}>
          {offers.map(offer => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onPress={() => {}}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  greeting: {
    color: '#666',
    fontSize: 16,
    marginLeft: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  viewAll: {
    color: '#6366f1',
    fontSize: 14,
  },
  categoriesContainer: {
    paddingLeft: 16,
  },
  offersContainer: {
    paddingLeft: 16,
    paddingBottom: 16,
  },
});