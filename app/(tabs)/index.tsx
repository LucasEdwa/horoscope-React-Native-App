import { Contact } from '@/components/Contact';
import { Hero1 } from '@/components/Hero1';
import { Navbar } from '@/components/Navbar';
import { OracleHero } from '@/components/OracleHero';
import { ThemedView } from '@/components/ThemedView';
import { Platform, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Navbar />
       <Hero1 />
      <Contact />
      <OracleHero />
  
      </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 24 : 0, // Adjust for Android status bar
    margin: 0,
  },
  backgroundImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,      
    zIndex: -1, // Ensure the image is behind other content
  },
  title: {
    marginTop: 320, // Adjust based on the parallax height
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Or use your theme/colors
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: semi-transparent background for readability
    borderRadius: 8, // Optional: rounded corners
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },        
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
    // Optional: Add more styles as needed
  },      
  // Add more styles as needed
});
// This file is the main entry point for the Home screen of your app.