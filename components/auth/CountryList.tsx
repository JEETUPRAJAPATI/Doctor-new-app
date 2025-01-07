import React, { useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Country } from '@/types/country';
import { CountryListItem } from './CountryListItem';

type CountryListProps = {
  visible: boolean;
  onClose: () => void;
  countries: Country[];
  onSelect: (country: Country) => void;
  loading?: boolean;
};

export function CountryList({ visible, onClose, countries, onSelect, loading }: CountryListProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCountries = useMemo(() => 
    countries.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery)
    ),
    [countries, searchQuery]
  );

  const handleSelect = (country: Country) => {
    onSelect(country);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Country</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search country name or dial code..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />

        {loading ? (
          <ActivityIndicator size="large" color="#6366f1" style={styles.loader} />
        ) : (
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <CountryListItem country={item} onSelect={handleSelect} />
            )}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#64748b',
  },
  searchInput: {
    margin: 20,
    padding: 15,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});