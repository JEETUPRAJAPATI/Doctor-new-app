import React from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { doctors } from '@/data/medicalData';

export default function DoctorProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const doctor = doctors.find(d => d.id.toString() === id);

  if (!doctor) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
        <ThemedText style={styles.errorText}>Doctor not found</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Doctor Profile</ThemedText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.profileSection, { backgroundColor: themeColors.surface }]}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
          <View style={styles.profileInfo}>
            <ThemedText style={styles.doctorName}>{doctor.name}</ThemedText>
            <ThemedText style={[styles.specialty, { color: themeColors.primary }]}>
              {doctor.specialty}
            </ThemedText>
            <ThemedText style={[styles.hospital, { color: themeColors.textSecondary }]}>
              {doctor.hospital}
            </ThemedText>
          </View>

          <View style={styles.statsContainer}>
            <View style={[styles.statItem, { backgroundColor: themeColors.background }]}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <ThemedText style={styles.statValue}>{doctor.rating}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Rating
              </ThemedText>
            </View>
            <View style={[styles.statItem, { backgroundColor: themeColors.background }]}>
              <Ionicons name="time" size={20} color={themeColors.primary} />
              <ThemedText style={styles.statValue}>{doctor.experience}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Experience
              </ThemedText>
            </View>
            <View style={[styles.statItem, { backgroundColor: themeColors.background }]}>
              <Ionicons name="cash" size={20} color={themeColors.success} />
              <ThemedText style={styles.statValue}>₹{doctor.consultationFee}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Fee
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.callOptions}>
          <TouchableOpacity 
            style={[styles.callButton, { backgroundColor: themeColors.success }]}
            activeOpacity={0.8}
          >
            <Ionicons name="videocam" size={24} color="white" />
            <ThemedText style={styles.buttonText}>Video Call</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.callButton, { backgroundColor: themeColors.primary }]}
            activeOpacity={0.8}
          >
            <Ionicons name="call" size={24} color="white" />
            <ThemedText style={styles.buttonText}>Audio Call</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.surface }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={24} color={themeColors.primary} />
            <ThemedText style={styles.sectionTitle}>About</ThemedText>
          </View>
          <ThemedText style={[styles.sectionContent, { color: themeColors.textSecondary }]}>
            {doctor.about}
          </ThemedText>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.surface }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="school" size={24} color={themeColors.primary} />
            <ThemedText style={styles.sectionTitle}>Education</ThemedText>
          </View>
          <ThemedText style={[styles.sectionContent, { color: themeColors.textSecondary }]}>
            {doctor.education}
          </ThemedText>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.surface }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="language" size={24} color={themeColors.primary} />
            <ThemedText style={styles.sectionTitle}>Languages</ThemedText>
          </View>
          <View style={styles.languageContainer}>
            {doctor.languages.map((language, index) => (
              <View 
                key={index} 
                style={[styles.languageTag, { backgroundColor: themeColors.background }]}
              >
                <ThemedText>{language}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.surface }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star" size={24} color={themeColors.primary} />
            <ThemedText style={styles.sectionTitle}>Reviews</ThemedText>
          </View>
          {doctor.reviews.map(review => (
            <View 
              key={review.id} 
              style={[styles.reviewCard, { backgroundColor: themeColors.background }]}
            >
              <View style={styles.reviewHeader}>
                <ThemedText style={styles.reviewUser}>{review.user}</ThemedText>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <ThemedText style={styles.rating}>{review.rating}</ThemedText>
                </View>
              </View>
              <ThemedText style={[styles.reviewComment, { color: themeColors.textSecondary }]}>
                {review.comment}
              </ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
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
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  profileSection: {
    padding: 20,
    marginBottom: 16,
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  profileInfo: {
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  specialty: {
    fontSize: 18,
    marginBottom: 4,
  },
  hospital: {
    fontSize: 16,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    minWidth: 100,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  callOptions: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  reviewCard: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewUser: {
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
  },
});