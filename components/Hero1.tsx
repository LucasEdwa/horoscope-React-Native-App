import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 400,
    flex: 0.8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: 400,
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
titleBtn: {
    padding: 16,
    height: 60,
    width: 180,
    borderRadius: 30, // <-- half of height for pill
    opacity: 0.8,
    justifyContent: 'center',
    marginBottom: 20,
    alignItems: 'center',
    zIndex: 2,
    overflow: 'hidden',
},
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'semibold',
    color: '#FEA5A5',
  },
});

export function Hero1() {
  return (
    <ThemedView style={styles.container}>
    
      <Image
        source={require('@/assets/images/hero1.png')}
        style={styles.backgroundImage}
      />
      <Pressable style={styles.titleBtn}>
          <LinearGradient
        colors={['#766787', '#1D1921']}
        
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
        <ThemedText style={styles.title}>
          Explore here
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}