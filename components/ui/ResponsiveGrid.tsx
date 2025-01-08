import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { getResponsiveSpacing } from '@/utils/responsive';

const { width } = Dimensions.get('window');

type Props = {
  children: React.ReactNode;
  columns?: number;
  spacing?: number;
};

export function ResponsiveGrid({ children, columns = 2, spacing = 16 }: Props) {
  const getColumnCount = () => {
    if (width >= 1024) return columns;
    if (width >= 768) return Math.min(columns, 3);
    if (width >= 375) return Math.min(columns, 2);
    return 1;
  };

  const responsiveSpacing = getResponsiveSpacing(spacing);
  const columnCount = getColumnCount();

  return (
    <View style={[
      styles.grid,
      {
        gap: responsiveSpacing,
        marginHorizontal: -responsiveSpacing / 2,
      }
    ]}>
      {React.Children.map(children, (child) => (
        <View style={[
          styles.gridItem,
          {
            width: `${100 / columnCount}%`,
            paddingHorizontal: responsiveSpacing / 2,
          }
        ]}>
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    marginBottom: getResponsiveSpacing(16),
  },
});