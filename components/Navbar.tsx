import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, PanResponder, Pressable, View } from 'react-native';
import tw from 'twrnc';

const NAV_ITEMS = [
  { label: 'Daily news', onPress: () => {} },
  { label: 'Settings', onPress: () => console.log('Settings pressed') },
  { label: 'Profile', onPress: () => console.log('Profile pressed') },
];

const SIDEBAR_WIDTH = 220;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  // PanResponder for dragging sidebar
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal drags when menu is open and dragging left
        return menuOpen && gestureState.dx < -10;
      },
      onPanResponderMove: (_, gestureState) => {
        // Move sidebar with finger, but not past closed position
        if (gestureState.dx < 0) {
          slideAnim.setValue(Math.max(gestureState.dx, -SIDEBAR_WIDTH));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // If dragged more than half way, close; else snap open
        if (gestureState.dx < -SIDEBAR_WIDTH / 2) {
          setMenuOpen(false);
        } else {
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (menuOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SIDEBAR_WIDTH,
        duration: 250,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  }, [menuOpen, slideAnim]);

  return (
    <ThemedView style={tw`flex-row items-center h-14 p-2.5 bg-white justify-between gap-4`}>
      <LinearGradient
        colors={['#766787', '#1D1921']}
        style={tw`absolute inset-0 z-0`}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Pressable onPress={() => setMenuOpen(true)} style={tw`p-2.5 justify-center items-center`}>
        <View style={tw`w-6 h-0.75 bg-[#333] my-0.5 rounded`} />
        <View style={tw`w-6 h-0.75 bg-[#333] my-0.5 rounded`} />
        <View style={tw`w-6 h-0.75 bg-[#333] my-0.5 rounded`} />
      </Pressable>
      <ThemedText style={tw`text-[#333] text-base font-semibold ml-2`} type="defaultSemiBold">
        My Navbar
      </ThemedText>
      <Modal
        visible={menuOpen}
        transparent
        animationType="none"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={tw`flex-1 flex-row bg-[rgba(0,0,0,0.2)]`} onPress={() => setMenuOpen(false)}>
          <Animated.View
            style={[
              tw`h-full absolute left-0 top-0 bg-white pt-8 px-5 rounded-tr-xl rounded-br-xl shadow`,
              { width: SIDEBAR_WIDTH, transform: [{ translateX: slideAnim }] }
            ]}
            {...panResponder.panHandlers}
            onStartShouldSetResponder={() => true}
          >
            <LinearGradient
              colors={['#766787', '#1D1921']}
              style={tw`absolute inset-0 z-0 rounded-tr-xl rounded-br-xl`}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            {NAV_ITEMS.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => {
                  setMenuOpen(false);
                  item.onPress();
                }}
                style={({ pressed }) => [
                  tw`py-4`,
                  { opacity: pressed ? 0.5 : 1 }
                ]}
              >
                <ThemedText style={tw`text-[#333] text-lg`} type="default">
                  {item.label}
                </ThemedText>
              </Pressable>
            ))}
          </Animated.View>
        </Pressable>
      </Modal>
    </ThemedView>
  );
}