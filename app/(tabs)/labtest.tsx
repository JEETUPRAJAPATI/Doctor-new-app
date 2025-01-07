import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { BookingOptionsModal } from '@/components/ui/BookingOptionsModal';

const categories = [
  {
    id: 1,
    title: 'DIABETES',
    icon: '💉',
    color: '#4ade80',
  },
  {
    id: 2,
    title: 'CANCER',
    icon: '🎗️',
    color: '#60a5fa',
  },
  {
    id: 3,
    title: 'KIDNEY',
    icon: '🫘',
    color: '#f87171',
  },
  {
    id: 4,
    title: 'BLOOD',
    icon: '🩸',
    color: '#34d399',
  },
];

const labTests = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    description: 'Basic blood test panel',
    price: 599,
    duration: '24 hours',
    requirements: 'Fasting for 8 hours',
    image: 'https://img.freepik.com/free-vector/blood-test-concept-illustration_114360-3029.jpg',
  },
  {
    id: 2,
    name: 'Diabetes Test (HbA1c)',
    description: 'Blood sugar test',
    price: 799,
    duration: '12 hours',
    requirements: 'Fasting for 12 hours',
    image: 'https://img.freepik.com/free-vector/diabetes-test-concept-illustration_114360-3032.jpg',
  },
  {
    id: 3,
    name: 'Thyroid Profile',
    description: 'Thyroid function test',
    price: 899,
    duration: '24 hours',
    requirements: 'No special preparation',
    image: 'https://img.freepik.com/free-vector/thyroid-test-concept-illustration_114360-3033.jpg',
  },
];

export default function LabTestScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showBookingOptions, setShowBookingOptions] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const handleBookNow = (test: any) => {
    setSelectedTest(test);
    setShowBookingOptions(true);
  };

  const handleSelectBookingOption = (option: 'lab' | 'home') => {
    if (selectedTest) {
      addToCart({
        id: selectedTest.id,
        name: selectedTest.name,
        price: selectedTest.price,
        image: selectedTest.image,
        packageQuantity: selectedTest.duration,
        bookingType: option
      });
    }
    setShowBookingOptions(false);
    setSelectedTest(null);
  };

  const filteredTests = labTests.filter(test =>
    searchQuery ? test.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView>
        <ThemedView style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={24} color={themeColors.text} />
            <ThemedText style={styles.locationText}>Home</ThemedText>
          </View>
        </ThemedView>

        <ThemedText style={styles.greeting}>Hello, Test user.</ThemedText>
        <ThemedText style={styles.title}>Find Lab tests</ThemedText>

        <View style={[styles.searchContainer, { backgroundColor: themeColors.searchBar }]}>
          <Ionicons name="search-outline" size={20} color={themeColors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: themeColors.text }]}
            placeholder="Search Lab test"
            placeholderTextColor={themeColors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ThemedText style={styles.subtitle}>Health Checkups and Screenings For</ThemedText>

        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.categoryCard, { backgroundColor: item.color }]}
              onPress={() => setSelectedCategory(item.title)}
            >
              <ThemedText style={styles.categoryIcon}>{item.icon}</ThemedText>
              <ThemedText style={styles.categoryTitle}>{item.title}</ThemedText>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
        />

        {filteredTests.map((test) => (
          <View 
            key={test.id} 
            style={[styles.testCard, { backgroundColor: themeColors.surface }]}
          >
            <View style={styles.testInfo}>
              <ThemedText style={styles.testName}>{test.name}</ThemedText>
              <ThemedText style={[styles.testDescription, { color: themeColors.textSecondary }]}>
                {test.description}
              </ThemedText>
              <View style={styles.testDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={16} color={themeColors.textSecondary} />
                  <ThemedText style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {test.duration}
                  </ThemedText>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="information-circle-outline" size={16} color={themeColors.textSecondary} />
                  <ThemedText style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {test.requirements}
                  </ThemedText>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <ThemedText style={[styles.price, { color: themeColors.primary }]}>
                  ₹{test.price}
                </ThemedText>
                <TouchableOpacity 
                  style={[styles.addButton, { backgroundColor: themeColors.primary }]}
                  onPress={() => handleBookNow(test)}
                >
                  <ThemedText style={styles.addButtonText}>Book Now</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <BookingOptionsModal
        visible={showBookingOptions}
        onClose={() => setShowBookingOptions(false)}
        onSelectOption={handleSelectBookingOption}
        testName={selectedTest?.name || ''}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
  },
  greeting: {
    fontSize: 16,
    marginLeft: 16,
    opacity: 0.6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 20,
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  categoriesList: {
    paddingLeft: 16,
    marginBottom: 20,
  },
  categoryCard: {
    width: 120,
    height: 120,
    marginRight: 16,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },
  testCard: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  testInfo: {
    padding: 16,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  testDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  testDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});