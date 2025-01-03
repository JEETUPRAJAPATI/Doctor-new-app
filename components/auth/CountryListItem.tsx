import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { Country } from '@/types/country';

type CountryListItemProps = {
  country: Country;
  onSelect: (country: Country) => void;
};

export function CountryListItem({ country, onSelect }: CountryListItemProps) {
  return (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => onSelect(country)}
    >
      <Image 
        source={{ uri: country.flag }} 
        style={styles.flag}
        resizeMode="contain"
      />
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{country.name}</Text>
        <Text style={styles.dialCode}>{country.dialCode}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 15,
    borderRadius: 2,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    color: '#0f172a',
  },
  dialCode: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
});