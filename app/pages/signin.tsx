import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import type { AppDispatch, RootState } from '../../store';
import { resetSignin, signinUser } from '../../store/signinSlice';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const signinState = useSelector((state: RootState) => state.signin);

  const handleSignIn = () => {
    dispatch(resetSignin());
    dispatch(signinUser({ email, password }));
  };

  React.useEffect(() => {
    if (signinState.success) {
      Alert.alert('Sign In', signinState.message);
      router.push('/(tabs)');
    } else if (signinState.error) {
      Alert.alert('Sign In Error', signinState.error);
    }
  }, [signinState.success, signinState.error]);

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
