import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Pressable } from 'react-native';
import tw from 'twrnc';

export function Hero1() {
  return (
    <ThemedView style={tw`w-full max-h-[400px] flex-0.8 justify-end items-center`}>
      <Image
        source={require('@/assets/images/hero1.png')}
        style={tw`w-full h-[400px] absolute top-0 left-0`}
        resizeMode="stretch"
      />
      <Pressable style={tw`p-4 h-15 w-45 rounded-full opacity-80 justify-center mb-5 items-center z-10 overflow-hidden`}>
        <LinearGradient
          colors={['#766787', '#1D1921']}
          style={tw`absolute inset-0 z-0`}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <ThemedText style={tw`text-center text-lg font-semibold text-[#FEA5A5] z-10`}>
          Explore here
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}