import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Dimensions } from 'react-native';
import { Category } from '@/types/medical';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { getResponsiveValue, getResponsiveFontSize, getResponsiveSpacing } from '@/utils/responsive';

const { width } = Dimensions.get('window');
const numColumns = width > 768 ? 4 : width > 375 ? 3 : 2;
const cardWidth = (width - getResponsiveSpacing(32) - (getResponsiveSpacing(16) * (numColumns - 1))) / numColumns;

type Props = {
  category: Category;
  onPress: () => void;
};

export function CategoryCard({ category, onPress }: Props) {
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <TouchableOpacity
      style={[styles.card, { 
        backgroundColor: themeColors.surface,
        width: cardWidth,
      }]}
      onPress={onPress}
    >
      <View style={[styles.imageContainer, { backgroundColor: category.color }]}>
        <Image 
          source={{ uri: category.image }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <ThemedText style={styles.title}>{category.title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: getResponsiveSpacing(12),
    overflow: 'hidden',
    marginBottom: getResponsiveSpacing(16),
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: getResponsiveSpacing(12),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    padding: getResponsiveSpacing(8),
    fontWeight: '600',
    fontSize: getResponsiveFontSize(14),
    textAlign: 'center',
  },
});