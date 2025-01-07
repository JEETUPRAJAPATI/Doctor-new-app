import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

const savedAddresses = [
  {
    id: 1,
    type: 'Home',
    address: '123 Main Street, Apt 4B, New York, NY 10001'
  },
  {
    id: 2,
    type: 'Work',
    address: '456 Business Ave, Suite 200, New York, NY 10002'
  }
];

export default function AddressScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>My Address</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <ThemedText style={[styles.sectionTitle, { color: themeColors.textSecondary }]}>
          Saved Addresses
        </ThemedText>

        {savedAddresses.map((address) => (
          <TouchableOpacity 
            key={address.id} 
            style={[styles.addressCard, { backgroundColor: themeColors.surface }]}
          >
            <Ionicons name="home" size={24} color={themeColors.primary} style={styles.addressIcon} />
            <View style={styles.addressContent}>
              <ThemedText style={styles.addressType}>{address.type}</ThemedText>
              <ThemedText style={[styles.addressText, { color: themeColors.textSecondary }]}>
                {address.address}
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/new-address')}
        >
          <Ionicons name="add" size={24} color={themeColors.primary} />
          <ThemedText style={[styles.addButtonText, { color: themeColors.primary }]}>
            Add New Location
          </ThemedText>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  addressCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  addressIcon: {
    marginRight: 12,
  },
  addressContent: {
    flex: 1,
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    lineHeight: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
});