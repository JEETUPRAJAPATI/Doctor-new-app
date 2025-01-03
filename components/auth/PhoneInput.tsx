import { View, Text, TextInput, StyleSheet } from 'react-native';

type PhoneInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  countryCode?: string;
};

export function PhoneInput({ value, onChangeText, countryCode = '+91' }: PhoneInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.countryCode}>{countryCode}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={value}
        onChangeText={onChangeText}
        maxLength={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 16,
    color: '#0f172a',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
  },
});