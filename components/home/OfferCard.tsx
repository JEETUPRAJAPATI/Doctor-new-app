import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Offer } from '@/types/medical';

type Props = {
  offer: Offer;
  onPress: () => void;
};

export function OfferCard({ offer, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: offer.color }]}
      onPress={onPress}
    >
      <Image 
        source={{ uri: offer.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{offer.title}</Text>
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
    color: '#000',
    fontWeight: '600',
  },
});