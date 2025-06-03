import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, PanResponder, Pressable, StyleSheet, View } from 'react-native';

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
    <ThemedView style={styles.navbar}>
        <LinearGradient
                colors={['#766787', '#1D1921']}
                
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
      <Pressable onPress={() => setMenuOpen(true)} style={styles.burger}>
        <View style={styles.burgerLine} />
        <View style={styles.burgerLine} />
        <View style={styles.burgerLine} />
      </Pressable>
      <ThemedText style={styles.themedText} type="defaultSemiBold">
        My Navbar
      </ThemedText>
      <Modal
        visible={menuOpen}
        transparent
        animationType="none"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.sidebarOverlay} onPress={() => setMenuOpen(false)}>
          <Animated.View
            style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
            {...panResponder.panHandlers}
            onStartShouldSetResponder={() => true}
          >
           
            {NAV_ITEMS.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => {
                  setMenuOpen(false);
                  item.onPress();
                }}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.menuItem]}
              >
                <ThemedText style={styles.menuText} type="default">
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

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    gap: 16,
  },
  burger: {
    padding: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  burgerLine: {
    width: 24,
    height: 3,
    backgroundColor: '#333',
    marginVertical: 2,
    borderRadius: 2,
  },
  themedText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  sidebarOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    backgroundColor: 'linear-gradient(97.6486deg, rgb(118, 103, 135), rgb(29, 25, 33))', 
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 0 },
    justifyContent: 'flex-start',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  menuItem: {
    paddingVertical: 16,
  },
  menuText: {
    color: '#333',
    fontSize: 18,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 16,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#333',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
});