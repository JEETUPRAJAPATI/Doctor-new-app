import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

const labTests = [
  {
    id: 1,
    lab: 'Max Lab',
    tests: '1 Tests',
    date: '27th Dec | 10:15',
    price: 'PKR9.0',
    image: 'https://placehold.co/60x60/87CEEB/000000.png?text=ML'
  },
  {
    id: 2,
    lab: 'Max Lab',
    tests: '2 Tests',
    date: '26th Dec | 10:45',
    price: 'PKR13.0',
    image: 'https://placehold.co/60x60/87CEEB/000000.png?text=ML'
  }
];

export default function LabTestsScreen() {
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
        <ThemedText style={styles.headerTitle}>My Lab Tests</ThemedText>
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

        {labTests.map((test) => (
          <View 
            key={test.id} 
            style={[styles.testCard, { borderBottomColor: themeColors.border }]}
          >
            <Image source={{ uri: test.image }} style={styles.labImage} />
            <View style={styles.testInfo}>
              <ThemedText style={styles.labName}>{test.lab}</ThemedText>
              <ThemedText style={[styles.testCount, { color: themeColors.textSecondary }]}>
                {test.tests}
              </ThemedText>
              <ThemedText style={[styles.testDate, { color: themeColors.textSecondary }]}>
                {test.date}
              </ThemedText>
            </View>
            <ThemedText style={[styles.testPrice, { color: themeColors.primary }]}>
              {test.price}
            </ThemedText>
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
  testCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  labImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  testInfo: {
    flex: 1,
  },
  labName: {
    fontSize: 16,
    fontWeight: '600',
  },
  testCount: {
    fontSize: 14,
    marginTop: 4,
  },
  testDate: {
    fontSize: 14,
    marginTop: 2,
  },
  testPrice: {
    fontSize: 14,
  },
});