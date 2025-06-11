import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import type { AppDispatch, RootState } from '../../store';
import { resetSignup, signupUser } from '../../store/signupSlice';
import { formatTimeInput } from '../../utils/formatTimeInput';

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
  const dispatch = useDispatch<AppDispatch>();
  const signupState = useSelector((state: RootState) => state.signup);

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
    // Always close the picker after selection
    setShowTimePicker(false);
    if (selectedTime) {
      // Use setHours/setMinutes on a new Date to avoid seconds/milliseconds issues
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      handleChange('timeOfBirth', `${hours}:${minutes}`);
    }
  };

  const handleSignUp = async () => {
    dispatch(resetSignup());
    dispatch(signupUser(form));
  };

  React.useEffect(() => {
    if (signupState.success) {
      Alert.alert('Sign Up', signupState.message);
      // Optionally navigate to another screen
    } else if (signupState.error) {
      Alert.alert('Sign Up Error', signupState.error);
    }
  }, [signupState.success, signupState.error]);

  return (
    <ScrollView contentContainerStyle={tw`flex-grow justify-center p-6 bg-[#f6f3fa]`} keyboardShouldPersistTaps="handled">
      <Text style={tw`text-2xl font-bold text-[#6d5cae] mb-7 text-center`}>Sign Up</Text>
      <TextInput
        placeholder="Name"
        style={tw`bg-white rounded p-3.5 mb-4 text-base border border-[#e0d7f3]`}
        value={form.name}
        onChangeText={v => handleChange('name', v)}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Email"
        style={tw`bg-white rounded p-3.5 mb-4 text-base border border-[#e0d7f3]`}
        value={form.email}
        onChangeText={v => handleChange('email', v)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={tw`bg-white rounded p-3.5 mb-4 text-base border border-[#e0d7f3]`}
        value={form.password}
        onChangeText={v => handleChange('password', v)}
        secureTextEntry
      />
      {/* Modern Date Picker */}
      <TouchableOpacity
        style={tw`bg-white rounded p-3.5 mb-4 text-base border border-[#e0d7f3] justify-center`}
        onPress={() => setShowDatePicker(true)}
        activeOpacity={0.7}
      >
        <Text style={tw`${form.dateOfBirth ? 'text-[#333]' : 'text-[#bbb]'} text-base`}>
          {form.dateOfBirth ? form.dateOfBirth : 'Date of Birth'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={
            form.dateOfBirth && !isNaN(Date.parse(form.dateOfBirth))
              ? new Date(form.dateOfBirth)
              : new Date()
          }
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={handleDateChange}
          maximumDate={new Date()}
          // Add this line for Android to allow month/year change
          // For iOS, 'spinner' is fine, for Android use 'calendar' or 'default'
        />
      )}
      {/* Replace time picker with normal input */}
      <TextInput
        placeholder="Time of Birth (e.g. 12:45)"
        style={tw`bg-white rounded p-3.5 mb-4 text-base border border-[#e0d7f3]`}
        value={form.timeOfBirth}
        onChangeText={v => handleChange('timeOfBirth', formatTimeInput(v))}
        keyboardType="numbers-and-punctuation"
        autoCapitalize="none"
        maxLength={5}
      />
      <TextInput
        placeholder="City of Birth"
        style={tw`bg-white rounded p-3.5 mb-4 text-base border border-[#e0d7f3]`}
        value={form.city}
        onChangeText={v => handleChange('city', v)}
      />
      <TextInput
        placeholder="Country of Birth"
        style={tw`bg-white rounded p-3.5 mb-4 text-base border border-[#e0d7f3]`}
        value={form.country}
        onChangeText={v => handleChange('country', v)}
      />
      <TouchableOpacity style={tw`bg-[#6d5cae] rounded p-3.5 items-center mt-2`} onPress={handleSignUp}>
        <Text style={tw`text-white font-bold text-base`}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/pages/signin')}>
        <Text style={tw`text-[#6d5cae] mt-4 text-center`}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
