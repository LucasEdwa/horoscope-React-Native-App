import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock user data with chart info
const mockUser = {
  name: 'Virgo User',
  email: 'virgo@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  horoscope: 'Virgo',
  dateOfBirth: '1992-09-10',
  timeOfBirth: '14:35',
  city: 'São Paulo',
  country: 'Brazil',
  chart: [
    { planet: 'Sun', sign: 'Virgo', house: 10 },
    { planet: 'Moon', sign: 'Pisces', house: 4 },
    { planet: 'Mercury', sign: 'Libra', house: 11 },
    { planet: 'Venus', sign: 'Leo', house: 9 },
    { planet: 'Mars', sign: 'Gemini', house: 7 },
    { planet: 'Jupiter', sign: 'Virgo', house: 10 },
    { planet: 'Saturn', sign: 'Aquarius', house: 3 },
    { planet: 'Uranus', sign: 'Capricorn', house: 2 },
    { planet: 'Neptune', sign: 'Capricorn', house: 2 },
    { planet: 'Pluto', sign: 'Scorpio', house: 12 },
  ],
};

export default function ProfileScreen() {
  const [loggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        {/* Add LinearGradient background */}
        <LinearGradient
          colors={['#766787', '#1D1921']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <Text style={styles.header}>You are not logged in.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/pages/signin')}
        >
          <Text style={styles.buttonText}>Go to Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/pages/signup')}
        >
          <Text style={styles.buttonText}>Go to Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Add LinearGradient background */}
      <LinearGradient
        colors={['#766787', '#1D1921']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{mockUser.name}</Text>
      <Text style={styles.info}>Email: {mockUser.email}</Text>
      <Text style={styles.info}>Horoscope: {mockUser.horoscope}</Text>
      <Text style={styles.info}>Date of Birth: {mockUser.dateOfBirth}</Text>
      <Text style={styles.info}>Time of Birth: {mockUser.timeOfBirth}</Text>
      <Text style={styles.info}>City: {mockUser.city}</Text>
      <Text style={styles.info}>Country: {mockUser.country}</Text>
      <Text style={styles.chartHeader}>Birth Chart</Text>
      <View style={styles.chartContainer}>
        {mockUser.chart.map((item, idx) => (
          <View key={idx} style={styles.chartRow}>
            <Text style={styles.planet}>{item.planet}</Text>
            <Text style={styles.sign}>{item.sign}</Text>
            <Text style={styles.house}>House {item.house}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setLoggedIn(false)}
      >
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f3fa',
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f3fa',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6d5cae',
    marginBottom: 18,
    textAlign: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 18,
    marginTop: 32,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6d5cae',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#6d5cae',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6d5cae',
    marginTop: 18,
    marginBottom: 8,
  },
  chartContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
    marginBottom: 16,
    shadowColor: '#6d5cae',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  planet: {
    fontWeight: 'bold',
    color: '#6d5cae',
    width: 80,
  },
  sign: {
    color: '#333',
    width: 80,
  },
  house: {
    color: '#888',
    width: 80,
    textAlign: 'right',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
    marginBottom: 32,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
