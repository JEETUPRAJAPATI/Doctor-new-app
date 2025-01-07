import { Text, TextProps } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

export function ThemedText({ style, ...props }: TextProps) {
  const { theme } = useTheme();
  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Text 
      style={[
        { color: themeColors.text },
        style
      ]} 
      {...props} 
    />
  );
}