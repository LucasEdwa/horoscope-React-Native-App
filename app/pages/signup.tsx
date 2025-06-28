import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import type { AppDispatch, RootState } from '../../store';
import { resetUser, signupUser } from '../../store/userSlice';
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

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector((state: RootState) => state.user);

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

  const handleSignUp = () => {
    dispatch(resetUser());
    dispatch(signupUser(form));
  };

  useEffect(() => {
    if (userState.success) {
      Alert.alert('Sign Up', userState.message);
      // Optionally navigate to signin screen
      router.push('/pages/signin');
    } else if (userState.error) {
      Alert.alert('Sign Up Error', userState.error);
    }
  }, [userState.success, userState.error, userState.message]);

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
        />
      )}
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
