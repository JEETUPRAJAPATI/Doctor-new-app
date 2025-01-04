import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSequence,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { Image } from '@/components/ui/Image';

export default function Index() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.3);

  const navigateToLogin = () => {
    router.replace('/login');
  };

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 1000 }),
      withTiming(1, { duration: 1000 }),
      withTiming(0, { duration: 500 }, () => {
        runOnJS(navigateToLogin)();
      })
    );

    scale.value = withSequence(
      withTiming(1, { duration: 1000 }),
      withTiming(1, { duration: 1000 }),
      withTiming(0.3, { duration: 500 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <Image type="APP_ICON" style={styles.logo} />
        <Animated.Text style={[styles.title]}>DoctoPro</Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
});