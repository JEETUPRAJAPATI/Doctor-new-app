import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { categories } from '@/data/medicalData';

const subCategories = [
  'First Aid',
  'Baby Care',
  'Womens Care',
  'Health Care',
];

export default function CategoryDetailsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const handleSubcategoryPress = (subcategory: string) => {
    router.push(`/subcategory/${subcategory}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Shop by Category</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.categoryCard}
              onPress={() => router.push(`/category/${category.id}`)}
            >
              <Image
                source={{ uri: category.image }}
                style={[styles.categoryImage, { backgroundColor: category.color }]}
              />
              <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
              <ThemedText 
                style={[styles.categoryDescription, { color: themeColors.textSecondary }]}
                numberOfLines={2}
              >
                {category.description}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.subCategoriesList}>
          {subCategories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.subCategoryItem, { backgroundColor: themeColors.surface }]}
              onPress={() => handleSubcategoryPress(category)}
            >
              <ThemedText style={styles.subCategoryText}>{category}</ThemedText>
              <Ionicons name="chevron-forward" size={24} color={themeColors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  categoryCard: {
    width: '47%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  subCategoriesList: {
    padding: 16,
  },
  subCategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  subCategoryText: {
    fontSize: 16,
  },
});