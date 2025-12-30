import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <AnimatedBackground>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Animated.View 
            entering={FadeInDown.delay(300).springify()} 
            style={styles.headerContainer}
          >
            <Text style={styles.title}>Cosmo</Text>
            <Text style={styles.subtitle}>Conexão profunda para casais</Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(800).springify()}
            style={styles.bottomContainer}
          >
            <Link href="/(tabs)" asChild>
              <Pressable style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}>
                <Text style={styles.buttonText}>Começar</Text>
              </Pressable>
            </Link>
          </Animated.View>
        </View>
      </SafeAreaView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  headerContainer: {
    marginTop: '40%',
    alignItems: 'center',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    // Add font family if custom font available
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  bottomContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#FF8C00', // Matches the primary orange
    fontSize: 18,
    fontWeight: 'bold',
  },
});
