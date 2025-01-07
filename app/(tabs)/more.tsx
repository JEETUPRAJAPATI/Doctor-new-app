import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView, Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

const menuItems = [
  { id: 1, title: 'Appointment', subtitle: 'Doctor Appointment', icon: 'calendar', route: '/appointment' },
  { id: 2, title: 'Lab Tests', subtitle: 'Test Booking', icon: 'flask', route: '/lab-tests' },
  { id: 3, title: 'My Orders', subtitle: 'Order Status', icon: 'bicycle', route: '/orders' },
  { id: 4, title: 'Pill Reminders', subtitle: 'Take Pill on time', icon: 'notifications', route: '/reminders' },
  { id: 5, title: 'My Address', subtitle: 'Save Address', icon: 'location', route: '/address' },
  { id: 6, title: 'Saved', subtitle: 'Meds & Doctors', icon: 'bookmark', route: '/saved' },
  { id: 7, title: 'Contact us', subtitle: 'Let us help you', icon: 'mail', route: '/contact' },
  { id: 8, title: 'Conditions', subtitle: 'Company Policies', icon: 'document-text', route: '/conditions' },
  { id: 9, title: 'FAQs', subtitle: 'Quick answers', icon: 'help-circle', route: '/faq' },
  { id: 10, title: 'Settings', subtitle: 'Change Settings', icon: 'settings', route: '/settings' },
  { id: 11, title: 'Logout', subtitle: 'See again', icon: 'log-out' },
  { id: 12, title: 'Delete Account', subtitle: 'Delete your info.', icon: 'trash' },
];

export default function MoreScreen() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  const handleMenuPress = (item: typeof menuItems[0]) => {
    if (item.title === 'Logout') {
      setShowLogoutModal(true);
    } else if (item.title === 'Delete Account') {
      setShowDeleteModal(true);
    } else if (item.route) {
      router.push(item.route);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    router.replace('/login');
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    Alert.alert('Success', 'Your account has been deleted successfully');
    router.replace('/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ThemedText style={styles.headerTitle}>Account</ThemedText>

      <ThemedView style={[styles.profileSection, { backgroundColor: themeColors.surface }]}>
        <Image
          source={{ uri: 'https://placehold.co/100x100/98FB98/000000.png?text=S' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <ThemedText style={styles.userName}>Test user</ThemedText>
          <ThemedText style={[styles.viewProfile, { color: themeColors.textSecondary }]}>
            View Profile
          </ThemedText>
        </View>
        <TouchableOpacity style={styles.buyButton}>
          <ThemedText style={styles.buyButtonText}>Buy This App</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ScrollView style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, { backgroundColor: themeColors.surface }]}
            onPress={() => handleMenuPress(item)}
          >
            <View style={styles.menuContent}>
              <ThemedText style={styles.menuTitle}>{item.title}</ThemedText>
              <ThemedText style={[styles.menuSubtitle, { color: themeColors.textSecondary }]}>
                {item.subtitle}
              </ThemedText>
            </View>
            <Ionicons name={item.icon} size={24} color={themeColors.textSecondary} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ConfirmationModal
        visible={showLogoutModal}
        title="LOGOUT"
        message="Are you sure you want to logout?"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />

      <ConfirmationModal
        visible={showDeleteModal}
        title="DELETE ACCOUNT"
        message="This will delete all your saved information and you'll have to register again in order to use the app. Are you sure you want to delete your account with us?"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewProfile: {
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  menuGrid: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuSubtitle: {
    fontSize: 14,
    marginTop: 4,
  }
});