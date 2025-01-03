import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

type GoogleButtonProps = {
  onPress: () => void;
};

export function GoogleButton({ onPress }: GoogleButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
        style={styles.icon}
      />
      <Text style={styles.text}>Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 15,
    gap: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    color: '#0f172a',
  },
});