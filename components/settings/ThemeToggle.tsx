import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemedText } from '../ui/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from '@/constants/theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: themeColors.surface }]}
      onPress={toggleTheme}
    >
      <View style={styles.content}>
        <Ionicons 
          name={theme === 'light' ? 'sunny' : 'moon'} 
          size={24} 
          color={themeColors.text} 
        />
        <ThemedText style={styles.text}>
          {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
        </ThemedText>
      </View>
      <View style={[styles.toggle, theme === 'dark' && styles.toggleActive]}>
        <View style={[styles.toggleCircle, theme === 'dark' && styles.toggleCircleActive]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  toggle: {
    width: 50,
    height: 30,
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#6366f1',
  },
  toggleCircle: {
    width: 26,
    height: 26,
    backgroundColor: 'white',
    borderRadius: 13,
    transform: [{ translateX: 0 }],
  },
  toggleCircleActive: {
    transform: [{ translateX: 20 }],
  },
});