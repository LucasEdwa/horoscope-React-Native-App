import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import type { AppDispatch, RootState } from '../../store';
import { resetSignin } from '../../store/signinSlice';
import { fetchUser, resetUser } from '../../store/userSlice';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const signinState = useSelector((state: RootState) => state.signin);
  const userState = useSelector((state: RootState) => state.user);

  const loggedIn = !!signinState.email;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    if (loggedIn && signinState.email) {
      setRefreshing(true);
      dispatch(fetchUser(signinState.email)).finally(() => setRefreshing(false));
    }
  }, [loggedIn, signinState.email]);

  useEffect(() => {
    if (loggedIn && signinState.email) {
      dispatch(fetchUser(signinState.email));
    } else {
      dispatch(resetUser());
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
        <Text style={tw`text-3xl font-extrabold text-[#6d5cae] mb-2 text-center`}>Welcome!</Text>
        <Text style={tw`text-lg text-[#6d5cae] mb-4 text-center`}>Sign in to view your profile and horoscope chart.</Text>
        <TouchableOpacity
          style={tw`bg-[#6d5cae] rounded-lg p-3.5 items-center mt-2 w-full`}
          onPress={() => router.push('/pages/signin')}
        >
          <Text style={tw`text-white font-bold text-base`}>Go to Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`border-2 border-[#6d5cae] rounded-lg p-3.5 items-center mt-2 w-full`}
          onPress={() => router.push('/pages/signup')}
        >
          <Text style={tw`text-[#6d5cae] font-bold text-base`}>Go to Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (userState.loading) {
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

  if (userState.error) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-[#f6f3fa] px-4`}>
        <LinearGradient
          colors={['#766787', '#1D1921']}
          style={tw`absolute inset-0`}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <Text style={tw`text-5xl mb-2`}>😕</Text>
        <Text style={tw`text-xl font-bold text-[#6d5cae] mb-2 text-center`}>Oops! Something went wrong.</Text>
        <Text style={tw`text-base text-[#6d5cae] mb-4 text-center`}>{userState.error}</Text>
        <TouchableOpacity
          style={tw`bg-[#6d5cae] rounded-lg p-3.5 items-center mt-2 w-full`}
          onPress={() => dispatch(fetchUser(signinState.email!))}
        >
          <Text style={tw`text-white font-bold text-base`}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const user = userState.user;

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow items-center justify-start bg-[#f6f3fa] px-4 pb-8`}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#6d5cae']}
          tintColor="#6d5cae"
        />
      }
    >
      <LinearGradient
        colors={['#766787', '#1D1921']}
        style={tw`absolute inset-0`}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={tw`w-24 h-24 rounded-full bg-[#6d5cae] items-center justify-center mt-8 mb-4 shadow-lg`}>
        <Text style={tw`text-white text-4xl font-extrabold`}>
          {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || '👤'}
        </Text>
      </View>
      <Text style={tw`text-2xl text-left font-extrabold text-[#fff] mb-1`}>{user?.username || user?.email}</Text>
      <Text style={tw`text-base text-left text-[#fff] mb-1`}>{user?.email}</Text>
      <View style={tw`w-full text-left border-b border-[#fff3] my-4`} />
      <Text style={tw`text-base text-left text-[#fff] mb-1`}>Date of Birth: <Text style={tw`font-semibold`}>{user?.birthdate || '-'}</Text></Text>
      <Text style={tw`text-base text-left text-[#fff] mb-1`}>Time of Birth: <Text style={tw`font-semibold`}>{user?.birthtime || '-'}</Text></Text>
      <Text style={tw`text-base text-left text-[#fff] mb-1`}>City: <Text style={tw`font-semibold`}>{user?.birth_city || '-'}</Text></Text>
      <Text style={tw`text-base text-left text-[#fff] mb-1`}>Country: <Text style={tw`font-semibold`}>{user?.birth_country || '-'}</Text></Text>
      {user?.chartPoints && user.chartPoints.length > 0 && (
        <View style={tw`w-full mt-6`}>
          <Text style={tw`text-xl font-bold text-center text-[#fff] mb-2`}>Your Chart Points</Text>
          <View style={tw`rounded-lg bg-[#fff1] p-3`}>
            {/* Grid header */}
            <View style={tw`flex-row border-b border-[#fff3] pb-2 mb-2`}>
              <Text style={tw`flex-1 text-base text-[#fff] font-bold`}>Planet</Text>
              <Text style={tw`flex-1 text-base text-[#fff] font-bold`}>Sign</Text>
              <Text style={tw`flex-1 text-base text-[#fff] font-bold`}>House</Text>
            </View>
            {/* Grid rows */}
            {user.chartPoints.map((pt, idx) => (
              <View key={idx} style={tw`flex-row py-1 border-b border-[#fff1] last:border-b-0`}>
                <Text style={tw`flex-1 text-base text-[#fff]`}>
                  {pt.pointType.charAt(0).toUpperCase() + pt.pointType.slice(1)}
                </Text>
                <Text style={tw`flex-1 text-base text-[#fff]`}>
                  {pt.sign || '-'}
                </Text>
                <Text style={tw`flex-1 text-base text-[#fff]`}>
                  {pt.house || '-'}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
      <TouchableOpacity
        style={tw`bg-[#e74c3c] rounded-lg p-3.5 items-center mt-8 w-full mb-8 shadow`}
        onPress={() => {
          dispatch(resetUser());
          dispatch(resetSignin());
          router.push('/pages/signin');
        }}
      >
        <Text style={tw`text-white font-bold text-base`}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
