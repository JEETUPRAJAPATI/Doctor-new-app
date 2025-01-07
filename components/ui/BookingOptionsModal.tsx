import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectOption: (option: 'lab' | 'home') => void;
  testName: string;
};

export function BookingOptionsModal({ visible, onClose, onSelectOption, testName }: Props) {
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: themeColors.surface }]}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Select Booking Option</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={themeColors.text} />
            </TouchableOpacity>
          </View>

          <ThemedText style={[styles.testName, { color: themeColors.textSecondary }]}>
            {testName}
          </ThemedText>

          <TouchableOpacity 
            style={[styles.option, { backgroundColor: themeColors.background }]}
            onPress={() => onSelectOption('lab')}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="business" size={24} color={themeColors.primary} />
            </View>
            <View style={styles.optionContent}>
              <ThemedText style={styles.optionTitle}>Visit Laboratory</ThemedText>
              <ThemedText style={[styles.optionDescription, { color: themeColors.textSecondary }]}>
                Visit our lab facility for the test
              </ThemedText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.option, { backgroundColor: themeColors.background }]}
            onPress={() => onSelectOption('home')}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="home" size={24} color={themeColors.primary} />
            </View>
            <View style={styles.optionContent}>
              <ThemedText style={styles.optionTitle}>Home Collection</ThemedText>
              <ThemedText style={[styles.optionDescription, { color: themeColors.textSecondary }]}>
                Our technician will collect sample at home
              </ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  testName: {
    fontSize: 16,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
  },
});