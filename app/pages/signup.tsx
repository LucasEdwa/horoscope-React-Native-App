import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const router = useRouter();

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const iso = selectedDate.toISOString().split('T')[0];
      handleChange('dateOfBirth', iso);
    }
  };

  const handleTimeChange = (_: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const time = selectedTime.toTimeString().slice(0, 5);
      handleChange('timeOfBirth', time);
    }
  };

  const handleSignUp = () => {
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
      {/* Modern Date Picker */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
        activeOpacity={0.7}
      >
        <Text style={{ color: form.dateOfBirth ? '#333' : '#bbb', fontSize: 16 }}>
          {form.dateOfBirth ? form.dateOfBirth : 'Date of Birth'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={form.dateOfBirth ? new Date(form.dateOfBirth) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
      {/* Modern Time Picker */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTimePicker(true)}
        activeOpacity={0.7}
      >
        <Text style={{ color: form.timeOfBirth ? '#333' : '#bbb', fontSize: 16 }}>
          {form.timeOfBirth ? form.timeOfBirth : 'Time of Birth'}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={
            form.timeOfBirth
              ? new Date(`1970-01-01T${form.timeOfBirth}:00`)
              : new Date()
          }
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
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
    justifyContent: 'center',
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
