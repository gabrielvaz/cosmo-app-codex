import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// Increasing the size of the gradient container to allow movement
const GRADIENT_HEIGHT = height * 1.5;
const GRADIENT_WIDTH = width * 1.5;

export function AnimatedBackground({ children }: { children: React.ReactNode }) {
  // We will animate the position of the gradient to create a subtle moving effect
  const translateX = useSharedValue(-width * 0.25);
  const translateY = useSharedValue(-height * 0.25);

  useEffect(() => {
    // Start the floating animation
    translateX.value = withRepeat(
      withTiming(0, {
        duration: 8000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // Infinite repeat
      true // Reverse
    );

    translateY.value = withRepeat(
      withTiming(0, {
        duration: 11000, // Different duration for organic feel
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.gradientContainer, animatedStyle]}>
        <LinearGradient
          // Orange to Black gradient
          colors={['#FF8C00', '#000000', '#1a0d00']}
          locations={[0.1, 0.8, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden', // Ensure the moving gradient doesn't overflow
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: GRADIENT_WIDTH,
    height: GRADIENT_HEIGHT,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    zIndex: 1, // Ensure content is above the background
  },
});
