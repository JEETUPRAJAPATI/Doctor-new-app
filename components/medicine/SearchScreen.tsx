import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

// Dummy medicine data
const medicines = [
  { id: 1, name: 'Paracetamol', price: '₹50', description: 'Pain reliever and fever reducer' },
  { id: 2, name: 'Aspirin', price: '₹45', description: 'Pain reliever' },
  { id: 3, name: 'Ibuprofen', price: '₹60', description: 'Anti-inflammatory' },
];

export function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim()) {
      const filtered = medicines.filter(medicine => 
        medicine.name.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.header, { backgroundColor: themeColors.surface }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <TextInput
          style={[styles.searchInput, { color: themeColors.text }]}
          placeholder="Find Medicines"
          placeholderTextColor={themeColors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus
        />
        <TouchableOpacity>
          <Ionicons name="search" size={24} color={themeColors.text} />
        </TouchableOpacity>
      </ThemedView>

      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.resultItem, { borderBottomColor: themeColors.border }]}>
              <ThemedView style={styles.medicineInfo}>
                <ThemedText style={styles.medicineName}>{item.name}</ThemedText>
                <ThemedText style={styles.medicineDescription}>{item.description}</ThemedText>
                <ThemedText style={styles.medicinePrice}>{item.price}</ThemedText>
              </ThemedView>
              <Ionicons name="chevron-forward" size={24} color={themeColors.textSecondary} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <ThemedView style={styles.emptyState}>
          <Image 
            source={{ uri: 'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg' }}
            style={styles.emptyStateImage}
          />
          <ThemedText style={styles.emptyStateText}>Search medicines</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
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
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '600',
  },
  medicineDescription: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.6,
  },
  medicinePrice: {
    fontSize: 14,
    marginTop: 4,
    color: '#6366f1',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 16,
    opacity: 0.6,
  },
});