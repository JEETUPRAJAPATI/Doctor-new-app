import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: string, time: string) => void;
};

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

export function AppointmentBookingModal({ visible, onClose, onConfirm }: Props) {
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  });

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm(selectedDate, selectedTime);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: themeColors.surface }]}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Select Date & Time</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={themeColors.text} />
            </TouchableOpacity>
          </View>

          {/* Date Selection */}
          <ThemedText style={styles.sectionTitle}>Select Date</ThemedText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.datesContainer}
          >
            {dates.map((date) => (
              <TouchableOpacity
                key={date}
                style={[
                  styles.dateItem,
                  { backgroundColor: themeColors.background },
                  selectedDate === date && { backgroundColor: themeColors.primary }
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <ThemedText style={[
                  styles.dateText,
                  selectedDate === date && styles.selectedText
                ]}>
                  {date}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Time Selection */}
          <ThemedText style={styles.sectionTitle}>Select Time</ThemedText>
          <ScrollView style={styles.timeSlotsContainer}>
            <View style={styles.timeGrid}>
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeItem,
                    { backgroundColor: themeColors.background },
                    selectedTime === time && { backgroundColor: themeColors.primary }
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <ThemedText style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedText
                  ]}>
                    {time}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.confirmButton,
              { backgroundColor: themeColors.primary },
              (!selectedDate || !selectedTime) && styles.disabledButton
            ]}
            onPress={handleConfirm}
            disabled={!selectedDate || !selectedTime}
          >
            <ThemedText style={styles.confirmButtonText}>
              Confirm Appointment
            </ThemedText>
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
    justifyContent: 'flex-end',
  },
  modal: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  datesContainer: {
    marginBottom: 20,
  },
  dateItem: {
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
  },
  timeSlotsContainer: {
    maxHeight: 200,
    marginBottom: 20,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeItem: {
    padding: 12,
    borderRadius: 8,
    width: '31%',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  confirmButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
});