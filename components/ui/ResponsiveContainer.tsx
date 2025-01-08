import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { getResponsiveSpacing } from '@/utils/responsive';

const { width } = Dimensions.get('window');
const maxContentWidth = 1200;

type Props = {
  children: React.ReactNode;
  style?: any;
};

export function ResponsiveContainer({ children, style }: Props) {
  return (
    <View style={[styles.container]}>
      <View style={[styles.content, style]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: maxContentWidth,
    padding: getResponsiveSpacing(16),
  },
});