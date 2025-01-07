import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, FlatList, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { doctors } from '@/data/medicalData';

export default function DoctorListScreen() {
  const { specialty } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;
  const [searchQuery, setSearchQuery] = useState('');

  // Filter doctors based on specialty and search query
  const filteredDoctors = doctors.filter(doctor => 
    doctor.specialty.toLowerCase() === specialty?.toString().toLowerCase() &&
    (searchQuery ? doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>{specialty} Doctors</ThemedText>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: themeColors.searchBar }]}>
        <Ionicons name="search-outline" size={20} color={themeColors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: themeColors.text }]}
          placeholder="Search doctors"
          placeholderTextColor={themeColors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {filteredDoctors.length > 0 ? (
        <FlatList
          data={filteredDoctors}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.doctorCard, { backgroundColor: themeColors.surface }]}
              onPress={() => router.push(`/doctor/profile/${item.id}`)}
            >
              <Image source={{ uri: item.image }} style={styles.doctorImage} />
              <View style={styles.doctorInfo}>
                <ThemedText style={styles.doctorName}>{item.name}</ThemedText>
                <ThemedText style={[styles.doctorSpecialty, { color: themeColors.textSecondary }]}>
                  {item.specialty}
                </ThemedText>
                <View style={styles.detailsRow}>
                  <View style={styles.detail}>
                    <Ionicons name="business" size={16} color={themeColors.textSecondary} />
                    <ThemedText style={[styles.detailText, { color: themeColors.textSecondary }]}>
                      {item.hospital}
                    </ThemedText>
                  </View>
                  <View style={styles.detail}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <ThemedText style={styles.rating}>{item.rating}</ThemedText>
                  </View>
                </View>
                <View style={styles.consultationFee}>
                  <ThemedText style={[styles.feeText, { color: themeColors.primary }]}>
                    ₹{item.consultationFee}
                  </ThemedText>
                  <ThemedText style={[styles.consultationText, { color: themeColors.textSecondary }]}>
                    Consultation Fee
                  </ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.doctorList}
        />
      ) : (
        <View style={styles.noResults}>
          <ThemedText style={styles.noResultsText}>No doctors found</ThemedText>
        </View>
      )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  doctorList: {
    padding: 16,
  },
  doctorCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    marginLeft: 4,
  },
  rating: {
    fontSize: 14,
    marginLeft: 4,
    color: '#FFD700',
  },
  consultationFee: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  consultationText: {
    fontSize: 14,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    opacity: 0.6,
  },
});