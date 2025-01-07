import { View, ViewProps } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

export function ThemedView({ style, ...props }: ViewProps) {
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <View 
      style={[
        { backgroundColor: themeColors.background },
        style
      ]} 
      {...props} 
    />
  );
}