import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

const appointments = [
  {
    id: 270,
    doctor: 'Dr. Anglina Taylor',
    speciality: 'Addiction Psychiatrist, Adolescent medicine specialist, Allergist...',
    date: '27th Dec | 10:15',
    image: 'https://placehold.co/60x60/FFB6C1/000000.png?text=AT'
  },
  {
    id: 269,
    doctor: 'Dr. Anglina Taylor',
    speciality: 'Addiction Psychiatrist, Adolescent medicine specialist, Allergist...',
    date: '26th Dec | 10:45',
    image: 'https://placehold.co/60x60/FFB6C1/000000.png?text=AT'
  }
];

export default function AppointmentScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;
  const [activeTab, setActiveTab] = React.useState('App');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>My Appointments</ThemedText>
      </View>

      <View style={[styles.tabs, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'App' && { borderBottomColor: themeColors.primary }]}
          onPress={() => setActiveTab('App')}
        >
          <ThemedText style={[
            styles.tabText, 
            activeTab === 'App' && { color: themeColors.primary }
          ]}>App</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Hospital' && { borderBottomColor: themeColors.primary }]}
          onPress={() => setActiveTab('Hospital')}
        >
          <ThemedText style={[
            styles.tabText, 
            activeTab === 'Hospital' && { color: themeColors.primary }
          ]}>Hospital</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <ThemedText style={styles.sectionTitle}>Past</ThemedText>

        {appointments.map((appointment) => (
          <View 
            key={appointment.id} 
            style={[styles.appointmentCard, { borderBottomColor: themeColors.border }]}
          >
            <Image source={{ uri: appointment.image }} style={styles.doctorImage} />
            <View style={styles.appointmentInfo}>
              <View style={styles.appointmentHeader}>
                <ThemedText style={styles.doctorName}>{appointment.doctor}</ThemedText>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-vertical" size={20} color={themeColors.textSecondary} />
                </TouchableOpacity>
              </View>
              <ThemedText style={[styles.speciality, { color: themeColors.textSecondary }]}>
                {appointment.speciality}
              </ThemedText>
              <ThemedText style={[styles.appointmentId, { color: themeColors.textSecondary }]}>
                #{appointment.id} {appointment.date}
              </ThemedText>
            </View>
          </View>
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
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    padding: 16,
    opacity: 0.6,
  },
  appointmentCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  speciality: {
    fontSize: 14,
    marginTop: 4,
  },
  appointmentId: {
    fontSize: 14,
    marginTop: 2,
  },
});