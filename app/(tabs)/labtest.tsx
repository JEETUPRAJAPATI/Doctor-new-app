import { View, Text, StyleSheet } from 'react-native';

export default function LabTestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lab Test Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});