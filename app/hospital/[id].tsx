import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { AppointmentBookingModal } from '@/components/ui/AppointmentBookingModal';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { hospitals } from '@/data/hospitals';

export default function HospitalDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;
  const [showBooking, setShowBooking] = useState(false);

  const hospital = hospitals.find(h => h.id.toString() === id);

  if (!hospital) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
        <ThemedText>Hospital not found</ThemedText>
      </SafeAreaView>
    );
  }

  const handleBookAppointment = () => {
    setShowBooking(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Hospital Details</ThemedText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: hospital.image }} style={styles.hospitalImage} />
        
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <ThemedText style={styles.hospitalName}>{hospital.name}</ThemedText>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <ThemedText style={styles.rating}>{hospital.rating}</ThemedText>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location" size={20} color={themeColors.primary} />
            <ThemedText style={[styles.infoText, { color: themeColors.textSecondary }]}>
              {hospital.location} ({hospital.distance})
            </ThemedText>
          </View>

          <View style={[styles.statsContainer, { backgroundColor: themeColors.surface }]}>
            <View style={styles.statItem}>
              <Ionicons name="people" size={24} color={themeColors.primary} />
              <ThemedText style={styles.statValue}>{hospital.doctors}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Doctors
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="bed" size={24} color={themeColors.primary} />
              <ThemedText style={styles.statValue}>{hospital.beds}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Beds
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time" size={24} color={themeColors.primary} />
              <ThemedText style={styles.statValue}>{hospital.openHours}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Open
              </ThemedText>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.bookButton, { backgroundColor: themeColors.primary }]}
            onPress={handleBookAppointment}
          >
            <ThemedText style={styles.bookButtonText}>Book Appointment</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AppointmentBookingModal
        visible={showBooking}
        onClose={() => setShowBooking(false)}
        onConfirm={(date, time) => {
          Alert.alert(
            'Appointment Confirmed',
            `Your appointment has been scheduled for ${date} at ${time}`,
            [
              {
                text: 'OK',
                onPress: () => {
                  setShowBooking(false);
                  router.push('/appointment');
                }
              }
            ]
          );
        }}
      />
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
  hospitalImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hospitalName: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  bookButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});