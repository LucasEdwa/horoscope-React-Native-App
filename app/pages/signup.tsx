import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function SignUpScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    timeOfBirth: '',
    city: '',
    country: '',
  });
  const router = useRouter();

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSignUp = () => {
    // Fake sign up logic
    Alert.alert(
      'Sign Up',
      `Welcome, ${form.name}!\n\nDOB: ${form.dateOfBirth}\nTime: ${form.timeOfBirth}\nCity: ${form.city}\nCountry: ${form.country}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={form.name}
        onChangeText={v => handleChange('name', v)}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={form.email}
        onChangeText={v => handleChange('email', v)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={form.password}
        onChangeText={v => handleChange('password', v)}
        secureTextEntry
      />
      <TextInput
        placeholder="Date of Birth (YYYY-MM-DD)"
        style={styles.input}
        value={form.dateOfBirth}
        onChangeText={v => handleChange('dateOfBirth', v)}
      />
      <TextInput
        placeholder="Time of Birth (HH:MM, 24h)"
        style={styles.input}
        value={form.timeOfBirth}
        onChangeText={v => handleChange('timeOfBirth', v)}
      />
      <TextInput
        placeholder="City of Birth"
        style={styles.input}
        value={form.city}
        onChangeText={v => handleChange('city', v)}
      />
      <TextInput
        placeholder="Country of Birth"
        style={styles.input}
        value={form.country}
        onChangeText={v => handleChange('country', v)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/pages/signin')}>
        <Text style={styles.linkText}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f6f3fa',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6d5cae',
    marginBottom: 28,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0d7f3',
  },
  button: {
    backgroundColor: '#6d5cae',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#6d5cae',
    marginTop: 16,
    textAlign: 'center',
  },
});
