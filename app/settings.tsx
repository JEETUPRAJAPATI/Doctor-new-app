import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const settingsOptions = [
    {
      title: 'Account',
      icon: 'person-outline',
      route: '/profile'
    },
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      route: '/notifications'
    },
    {
      title: 'Privacy',
      icon: 'lock-closed-outline',
      route: '/privacy'
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      route: '/support'
    },
    {
      title: 'About',
      icon: 'information-circle-outline',
      route: '/about'
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Settings</ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <ThemeToggle />

        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionItem, { backgroundColor: themeColors.surface }]}
            onPress={() => router.push(option.route)}
          >
            <View style={styles.optionContent}>
              <Ionicons name={option.icon} size={24} color={themeColors.text} />
              <ThemedText style={styles.optionTitle}>{option.title}</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={24} color={themeColors.textSecondary} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: themeColors.error }]}
          onPress={() => router.replace('/login')}
        >
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
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
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});