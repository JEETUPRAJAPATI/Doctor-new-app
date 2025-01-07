import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { Offer } from '@/types/medical';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

type Props = {
  offer: Offer;
  onPress: () => void;
};

export function OfferCard({ offer, onPress }: Props) {
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: themeColors.surface }]}
      onPress={onPress}
    >
      <Image 
        source={{ uri: offer.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <ThemedText style={styles.title}>{offer.title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 150,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
  },
  title: {
    padding: 8,
    fontWeight: '600',
  },
});