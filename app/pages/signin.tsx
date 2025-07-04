import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import type { AppDispatch, RootState } from '../../store';
import { resetUser, signinUser } from '../../store/userSlice';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertShown, setAlertShown] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector((state: RootState) => state.user);

  const handleSignIn = () => {
    dispatch(resetUser());
    setAlertShown(false); // Reset alert state on new attempt
    dispatch(signinUser({ email, password }));
  };

  useEffect(() => {
    if (!alertShown) {
      if (userState.success && userState.isAuthenticated) {
        Alert.alert('Sign In', userState.message);
        setAlertShown(true);
        router.push('/(tabs)');
      } else if (userState.error) {
        Alert.alert('Sign In Error', userState.error);
        setAlertShown(true);
      } else if (!userState.loading && userState.message && !userState.success) {
        Alert.alert('Sign In Error', userState.message);
        setAlertShown(true);
      }
    }
  }, [
    userState.success,
    userState.error,
    userState.loading,
    userState.message,
    userState.isAuthenticated,
    alertShown,
    router,
  ]);

  // Reset alertShown if user changes input
  useEffect(() => {
    setAlertShown(false);
  }, [email, password]);

  return (
    <View style={tw`flex-1 justify-center p-6 bg-[#f6f3fa]`}>
      <Text style={tw`text-2xl font-bold text-[#6d5cae] mb-7 text-center`}>Sign In</Text>
      <TextInput
        placeholder="Email"
        style={tw`bg-white rounded p-3.5 mb-4 text-base border border-[#e0d7f3]`}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={tw`bg-white rounded p-3.5 mb-4 text-base border border-[#e0d7f3]`}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => router.push('/pages/signup')}>
        <Text style={tw`text-[#6d5cae] text-center mt-3 text-base`}>Create a New Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`bg-[#6d5cae] rounded p-3.5 items-center mt-2`} onPress={handleSignIn}>
        <Text style={tw`text-white font-bold text-base`}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
