import { View, Text, StyleSheet } from 'react-native';

export default function AmbulanceScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ambulance Screen</Text>
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