import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { getResponsiveSpacing, getResponsiveFontSize } from '@/utils/responsive';

const { width } = Dimensions.get('window');
const maxContentWidth = 1200;
const isTablet = width >= 768;

type Props = {
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
};

export function ResponsiveHeader({ title, showBack = true, rightElement }: Props) {
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
      <View style={styles.headerContent}>
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons 
              name="arrow-back" 
              size={isTablet ? 28 : 24} 
              color={themeColors.text} 
            />
          </TouchableOpacity>
        )}
        <ThemedText style={styles.headerTitle}>{title}</ThemedText>
        {rightElement && (
          <View style={styles.rightElement}>
            {rightElement}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    width: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: getResponsiveSpacing(16),
    maxWidth: maxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  backButton: {
    marginRight: getResponsiveSpacing(16),
    padding: getResponsiveSpacing(4),
  },
  headerTitle: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: 'bold',
    flex: 1,
  },
  rightElement: {
    marginLeft: getResponsiveSpacing(16),
  },
});