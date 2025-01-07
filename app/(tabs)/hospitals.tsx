import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Image, TextInput, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Carousel from 'react-native-snap-carousel';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { hospitals, categories } from '@/data/hospitals';
import { getResponsiveValue, getResponsiveFontSize, getResponsiveSpacing } from '@/utils/responsive';

const { width } = Dimensions.get('window');
const maxContentWidth = 1200;
const isTablet = width >= 768;
const numColumns = isTablet ? 2 : 1;

export default function HospitalsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const filteredHospitals = hospitals.filter(hospital =>
    (selectedCategory ? hospital.type === selectedCategory : true) &&
    (searchQuery ? 
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.type.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    )
  );

  const renderCategoryCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, { backgroundColor: item.color }]}
      onPress={() => setSelectedCategory(selectedCategory === item.title ? '' : item.title)}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <ThemedText style={styles.categoryTitle}>{item.title}</ThemedText>
    </TouchableOpacity>
  );

  const renderHospitalCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.hospitalCard, { backgroundColor: item.color }]}
      onPress={() => router.push(`/hospital/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.hospitalImage} />
      <View style={styles.hospitalInfo}>
        <View style={styles.nameContainer}>
          <ThemedText style={styles.hospitalName}>{item.name}</ThemedText>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <ThemedText style={styles.rating}>{item.rating}</ThemedText>
          </View>
        </View>
        <ThemedText style={styles.hospitalType}>{item.type}</ThemedText>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="white" />
          <ThemedText style={styles.location}>
            {item.location} ({item.distance})
          </ThemedText>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Ionicons name="people-outline" size={16} color="white" />
            <ThemedText style={styles.statText}>{item.doctors} Doctors</ThemedText>
          </View>
          <View style={styles.stat}>
            <Ionicons name="bed-outline" size={16} color="white" />
            <ThemedText style={styles.statText}>{item.beds} Beds</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Find Hospitals</ThemedText>
        </View>

        <View style={[styles.searchContainer, { backgroundColor: themeColors.searchBar }]}>
          <Ionicons name="search-outline" size={20} color={themeColors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: themeColors.text }]}
            placeholder="Search hospitals by name or type"
            placeholderTextColor={themeColors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.categoriesContainer}>
          <Carousel
            data={categories}
            renderItem={renderCategoryCard}
            sliderWidth={width}
            itemWidth={width * 0.8}
            activeSlideAlignment="start"
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            containerCustomStyle={styles.carousel}
          />
        </View>

        <FlatList
          data={filteredHospitals}
          renderItem={renderHospitalCard}
          keyExtractor={item => item.id.toString()}
          numColumns={numColumns}
          columnWrapperStyle={isTablet && styles.columnWrapper}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    maxWidth: maxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    padding: getResponsiveSpacing(16),
  },
  title: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: getResponsiveSpacing(16),
    padding: getResponsiveSpacing(12),
    borderRadius: getResponsiveSpacing(8),
  },
  searchInput: {
    flex: 1,
    marginLeft: getResponsiveSpacing(8),
    fontSize: getResponsiveFontSize(16),
  },
  categoriesContainer: {
    marginBottom: getResponsiveSpacing(16),
  },
  carousel: {
    paddingLeft: getResponsiveSpacing(16),
  },
  categoryCard: {
    width: '100%',
    height: getResponsiveValue(160, 180, 200),
    borderRadius: getResponsiveSpacing(12),
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  categoryTitle: {
    color: 'white',
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
    padding: getResponsiveSpacing(12),
  },
  list: {
    padding: getResponsiveSpacing(16),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: getResponsiveSpacing(16),
  },
  hospitalCard: {
    flex: 1,
    borderRadius: getResponsiveSpacing(12),
    marginBottom: getResponsiveSpacing(16),
    overflow: 'hidden',
  },
  hospitalImage: {
    width: '100%',
    height: getResponsiveValue(150, 180, 200),
    resizeMode: 'cover',
  },
  hospitalInfo: {
    padding: getResponsiveSpacing(16),
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getResponsiveSpacing(4),
  },
  hospitalName: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: getResponsiveSpacing(4),
    fontWeight: 'bold',
    color: 'white',
  },
  hospitalType: {
    fontSize: getResponsiveFontSize(14),
    marginBottom: getResponsiveSpacing(8),
    color: 'white',
    opacity: 0.9,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResponsiveSpacing(8),
  },
  location: {
    marginLeft: getResponsiveSpacing(4),
    fontSize: getResponsiveFontSize(14),
    color: 'white',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: getResponsiveSpacing(16),
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: getResponsiveSpacing(4),
    fontSize: getResponsiveFontSize(14),
    color: 'white',
    opacity: 0.9,
  },
});