import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

const faqs = [
  {
    id: 1,
    question: 'How to Login to App?',
    answer: 'You can login using your phone number or Google account.'
  },
  {
    id: 2,
    question: 'How to book an Appointment?',
    answer: 'Go to the Doctors tab, select a doctor, and choose an available time slot.'
  },
  {
    id: 3,
    question: 'How to cancel an Appointment?',
    answer: 'Go to My Appointments section and select the appointment you want to cancel.'
  }
];

export default function FAQScreen() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>FAQs</ThemedText>
      </View>

      <ScrollView>
        {faqs.map((faq) => (
          <TouchableOpacity
            key={faq.id}
            style={[styles.faqItem, { borderBottomColor: themeColors.border }]}
            onPress={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
          >
            <ThemedText style={styles.question}>{faq.question}</ThemedText>
            {expandedId === faq.id && (
              <ThemedText style={[styles.answer, { color: themeColors.textSecondary }]}>
                {faq.answer}
              </ThemedText>
            )}
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
  faqItem: {
    borderBottomWidth: 1,
    padding: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
  },
  answer: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
});