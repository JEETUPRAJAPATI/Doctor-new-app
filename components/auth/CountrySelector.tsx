import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type CountrySelectorProps = {
  selectedCountry: string;
  onPress: () => void;
};

export function CountrySelector({ selectedCountry, onPress }: CountrySelectorProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{selectedCountry}</Text>
      <Text style={styles.icon}>▼</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#0f172a',
  },
  icon: {
    fontSize: 12,
    color: '#64748b',
  },
});