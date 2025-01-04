import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Category } from '@/types/medical';

type Props = {
  category: Category;
  onPress: () => void;
};

export function CategoryCard({ category, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: category.color }]}
      onPress={onPress}
    >
      <Image 
        source={{ uri: category.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{category.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  title: {
    padding: 8,
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
  },
});