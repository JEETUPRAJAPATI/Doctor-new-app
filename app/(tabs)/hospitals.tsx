import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Image, View, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { getResponsiveValue, getResponsiveFontSize, getResponsiveSpacing } from '@/utils/responsive';

const { width } = Dimensions.get('window');
const maxContentWidth = 1200;
const isTablet = width >= 768;
const numColumns = isTablet ? 2 : 1;

// Hospital categories data
const hospitalCategories = [
  {
    id: 1,
    name: 'General',
    icon: '🏥',
    color: '#FF9999'
  },
  {
    id: 2,
    name: 'Specialized',
    icon: '⚕️',
    color: '#99FF99'
  },
  {
    id: 3,
    name: 'Pediatrics',
    icon: '👶',
    color: '#99CCFF'
  },
  {
    id: 4,
    name: 'Emergency',
    icon: '🚑',
    color: '#FFB366'
  },
  {
    id: 5,
    name: 'Mental Health',
    icon: '🧠',
    color: '#FF99CC'
  }
];

// Dummy hospital data by category
const hospitalData = {
  'General': [
    {
      id: 1,
      name: 'City General Hospital',
      description: 'Full-service medical facility with 24/7 care',
      rating: 4.5,
      distance: '2.5 km',
      image: 'https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8440.jpg',
      beds: 500,
      doctors: 150
    },
    {
      id: 2,
      name: 'Metro Medical Center',
      description: 'Modern healthcare facility with advanced technology',
      rating: 4.3,
      distance: '3.8 km',
      image: 'https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8440.jpg',
      beds: 300,
      doctors: 100
    }
  ],
  'Specialized': [
    {
      id: 3,
      name: 'Heart & Vascular Institute',
      description: 'Specialized cardiac care center',
      rating: 4.8,
      distance: '4.2 km',
      image: 'https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8440.jpg',
      beds: 200,
      doctors: 80
    }
  ],
  'Pediatrics': [
    {
      id: 4,
      name: 'Happy Kids Hospital',
      description: 'Specialized in child healthcare',
      rating: 4.7,
      distance: '3.0 km',
      image: 'https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8440.jpg',
      beds: 150,
      doctors: 60
    }
  ],
  'Emergency': [
    {
      id: 5,
      name: 'City Emergency Center',
      description: '24/7 emergency care available',
      rating: 4.6,
      distance: '1.5 km',
      image: 'https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8440.jpg',
      beds: 100,
      doctors: 40
    }
  ],
  'Mental Health': [
    {
      id: 6,
      name: 'Mind Wellness Center',
      description: 'Comprehensive mental health services',
      rating: 4.4,
      distance: '5.0 km',
      image: 'https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8440.jpg',
      beds: 120,
      doctors: 30
    }
  ]
};

export default function HospitalsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;
  const [selectedCategory, setSelectedCategory] = useState('General');

  const renderHospitalCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.hospitalCard, { backgroundColor: themeColors.surface }]}
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
        <ThemedText style={[styles.description, { color: themeColors.textSecondary }]}>
          {item.description}
        </ThemedText>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Ionicons name="people-outline" size={16} color={themeColors.textSecondary} />
            <ThemedText style={[styles.statText, { color: themeColors.textSecondary }]}>
              {item.doctors} Doctors
            </ThemedText>
          </View>
          <View style={styles.stat}>
            <Ionicons name="bed-outline" size={16} color={themeColors.textSecondary} />
            <ThemedText style={[styles.statText, { color: themeColors.textSecondary }]}>
              {item.beds} Beds
            </ThemedText>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color={themeColors.primary} />
          <ThemedText style={[styles.distance, { color: themeColors.primary }]}>
            {item.distance}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.mainContent}>
        {/* Categories ScrollView */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContainer}
        >
          {hospitalCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                { 
                  backgroundColor: selectedCategory === category.name ? category.color : themeColors.surface,
                  borderColor: category.color,
                  borderWidth: 1,
                }
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <ThemedText style={styles.categoryIcon}>{category.icon}</ThemedText>
              <ThemedText 
                style={[
                  styles.categoryName,
                  { color: selectedCategory === category.name ? '#000000' : themeColors.text }
                ]}
              >
                {category.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Hospitals List */}
        <FlatList
          data={hospitalData[selectedCategory]}
          renderItem={renderHospitalCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.hospitalsList}
          numColumns={numColumns}
          columnWrapperStyle={isTablet && styles.columnWrapper}
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
  categoriesScroll: {
    marginVertical: getResponsiveSpacing(16),
  },
  categoriesContainer: {
    paddingHorizontal: getResponsiveSpacing(16),
  },
  categoryItem: {
    padding: getResponsiveSpacing(12),
    borderRadius: getResponsiveSpacing(12),
    marginRight: getResponsiveSpacing(12),
    alignItems: 'center',
    minWidth: 100,
  },
  categoryIcon: {
    fontSize: getResponsiveFontSize(24),
    marginBottom: getResponsiveSpacing(4),
  },
  categoryName: {
    fontSize: getResponsiveFontSize(14),
    fontWeight: '600',
  },
  hospitalsList: {
    padding: getResponsiveSpacing(16),
    gap: getResponsiveSpacing(16),
  },
  columnWrapper: {
    gap: getResponsiveSpacing(16),
  },
  hospitalCard: {
    flex: 1,
    borderRadius: getResponsiveSpacing(12),
    overflow: 'hidden',
    marginBottom: getResponsiveSpacing(16),
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
    marginBottom: getResponsiveSpacing(8),
  },
  hospitalName: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: getResponsiveFontSize(14),
    fontWeight: 'bold',
    color: '#FFD700',
  },
  description: {
    fontSize: getResponsiveFontSize(14),
    marginBottom: getResponsiveSpacing(12),
  },
  statsContainer: {
    flexDirection: 'row',
    gap: getResponsiveSpacing(16),
    marginBottom: getResponsiveSpacing(12),
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: getResponsiveFontSize(14),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distance: {
    fontSize: getResponsiveFontSize(14),
    fontWeight: '600',
  },
});