import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

const specialties = [
  {
    id: 1,
    title: 'General',
    icon: '👨‍⚕️',
    color: '#4ade80',
    count: '120+ Doctors'
  },
  {
    id: 2,
    title: 'Dentist',
    icon: '🦷',
    color: '#60a5fa',
    count: '85+ Doctors'
  },
  {
    id: 3,
    title: 'Pediatric',
    icon: '👶',
    color: '#f87171',
    count: '65+ Doctors'
  },
  {
    id: 4,
    title: 'Cardiology',
    icon: '❤️',
    color: '#34d399',
    count: '45+ Doctors'
  }
];

const doctorSpecialities = [
  'Addiction Psychiatrist',
  'Adolescent medicine specialist',
  'Allergist (immunologist)',
  'Anesthesiologist',
  'Cardiac surgeon',
  'Cardiologist',
  'Dermatologist',
];

export default function DoctorsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const handleSpecialtyPress = (specialty: string) => {
    router.push(`/doctor/${specialty}`);
  };

  const renderSpecialtyCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.specialtyCard, { backgroundColor: item.color }]}
      onPress={() => handleSpecialtyPress(item.title)}
    >
      <ThemedText style={styles.specialtyIcon}>{item.icon}</ThemedText>
      <ThemedText style={styles.specialtyTitle}>{item.title}</ThemedText>
      <ThemedText style={styles.specialtyCount}>{item.count}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView>
        <ThemedView style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={24} color={themeColors.text} />
            <ThemedText style={styles.locationText}>Home</ThemedText>
          </View>
        </ThemedView>

        <ThemedText style={styles.greeting}>Hello, Test user.</ThemedText>
        <ThemedText style={styles.title}>Find Doctors</ThemedText>

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

        <ThemedView style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Popular Specialties</ThemedText>
        </ThemedView>

        <FlatList
          horizontal
          data={specialties}
          renderItem={renderSpecialtyCard}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.specialtiesList}
        />

        <ThemedView style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>All Specialties</ThemedText>
        </ThemedView>

        {doctorSpecialities.map((specialty, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.specialtyListItem, { borderBottomColor: themeColors.border }]}
            onPress={() => handleSpecialtyPress(specialty)}
          >
            <ThemedText style={styles.specialtyListText}>{specialty}</ThemedText>
            <Ionicons name="chevron-forward" size={24} color={themeColors.textSecondary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
  },
  greeting: {
    fontSize: 16,
    marginLeft: 16,
    opacity: 0.6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 8,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  specialtiesList: {
    paddingLeft: 16,
  },
  specialtyCard: {
    width: 140,
    height: 160,
    marginRight: 16,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialtyIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  specialtyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  specialtyCount: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  specialtyListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  specialtyListText: {
    fontSize: 16,
  },
});