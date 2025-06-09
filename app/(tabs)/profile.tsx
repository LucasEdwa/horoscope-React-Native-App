import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import type { AppDispatch, RootState } from '../../store';
import { resetSignin } from '../../store/signinSlice';
import { fetchZodiacChart, resetZodiacChart } from '../../store/zodiacChartSlice';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const signinState = useSelector((state: RootState) => state.signin);
  const zodiacChartState = useSelector((state: RootState) => state.zodiacChart);

  const loggedIn = !!signinState.email;

  useEffect(() => {
    if (loggedIn && signinState.email) {
      dispatch(fetchZodiacChart(signinState.email));
    } else {
      dispatch(resetZodiacChart());
    }
  }, [loggedIn, signinState.email]);

  if (!loggedIn) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-[#f6f3fa] px-4`}>
        <LinearGradient
          colors={['#766787', '#1D1921']}
          style={tw`absolute inset-0`}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <Text style={tw`text-xl font-bold text-[#6d5cae] mb-4 text-center`}>You are not logged in.</Text>
        <TouchableOpacity
          style={tw`bg-[#6d5cae] rounded-lg p-3.5 items-center mt-2 w-full`}
          onPress={() => router.push('/pages/signin')}
        >
          <Text style={tw`text-white font-bold text-base`}>Go to Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-[#6d5cae] rounded-lg p-3.5 items-center mt-2 w-full`}
          onPress={() => router.push('/pages/signup')}
        >
          <Text style={tw`text-white font-bold text-base`}>Go to Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (zodiacChartState.loading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-[#f6f3fa] px-4`}>
        <LinearGradient
          colors={['#766787', '#1D1921']}
          style={tw`absolute inset-0`}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <ActivityIndicator size="large" color="#6d5cae" />
        <Text style={tw`text-xl font-bold text-[#fff] mt-4`}>Loading your profile...</Text>
      </View>
    );
  }

  if (zodiacChartState.error) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-[#f6f3fa] px-4`}>
        <LinearGradient
          colors={['#766787', '#1D1921']}
          style={tw`absolute inset-0`}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <Text style={tw`text-xl font-bold text-[#6d5cae] mb-4 text-center`}>Error: {zodiacChartState.error}</Text>
        <TouchableOpacity
          style={tw`bg-[#6d5cae] rounded-lg p-3.5 items-center mt-2 w-full`}
          onPress={() => dispatch(fetchZodiacChart(signinState.email!))}
        >
          <Text style={tw`text-white font-bold text-base`}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const chart = zodiacChartState.chart;

  return (
    <ScrollView contentContainerStyle={tw`flex-grow items-center justify-center bg-[#f6f3fa] px-4 pb-8`}>
      <LinearGradient
        colors={['#766787', '#1D1921']}
        style={tw`absolute inset-0`}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={tw`w-24 h-24 rounded-full bg-[#6d5cae] items-center justify-center mt-8 mb-4`}>
        <Text style={tw`text-white text-4xl font-bold`}>
          {signinState.email?.charAt(0).toUpperCase() || '?'}
        </Text>
      </View>
      <Text style={tw`text-2xl font-bold text-[#fff] mb-2`}>{signinState.email}</Text>
      <Text style={tw`text-base text-[#fff] mb-1`}>Sun Sign: {chart?.sunSign || '-'}</Text>
      <Text style={tw`text-base text-[#fff] mb-1`}>Date of Birth: {chart?.dateOfBirth || '-'}</Text>
      <Text style={tw`text-base text-[#fff] mb-1`}>Time of Birth: {chart?.timeOfBirth || '-'}</Text>
      <Text style={tw`text-base text-[#fff] mb-1`}>City: {chart?.city || '-'}</Text>
      <Text style={tw`text-base text-[#fff] mb-1`}>Country: {chart?.country || '-'}</Text>
      <TouchableOpacity
        style={tw`bg-[#e74c3c] rounded-lg p-3.5 items-center mt-8 w-full mb-8`}
        onPress={() => {
          dispatch(resetZodiacChart());
          dispatch(resetSignin());
          router.push('/pages/signin');
        }}
      >
        <Text style={tw`text-white font-bold text-base`}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
