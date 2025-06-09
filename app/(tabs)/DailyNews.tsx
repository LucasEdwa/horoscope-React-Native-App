import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import tw from 'twrnc';

const VIRGO_DAILY_NEWS = [
  {
    id: '1',
    title: 'Virgo: Embrace New Opportunities',
    content: 'Today is a great day for Virgos to step out of their comfort zone and try something new. Opportunities are on the horizon!',
  },
  {
    id: '2',
    title: 'Financial Insights for Virgo',
    content: 'Financial stability is within reach. Stay focused on your goals and avoid impulsive spending.',
  },
  {
    id: '3',
    title: 'Virgo Love Horoscope',
    content: 'Communication is key in your relationships today. Express your feelings openly for a harmonious day.',
  },
  {
    id: '4',
    title: 'Health Tip for Virgo',
    content: 'Take time to relax and recharge. A short walk or meditation can do wonders for your well-being.',
  },
  {
    id: '5',
    title: 'Career Moves for Virgo',
    content: 'Your attention to detail will be noticed at work. Don’t hesitate to share your ideas with colleagues.',
  },
];

export default function DailyNewsScreen() {
  return (
    <View style={tw`flex-1 bg-[#f6f3fa] pt-10 px-4`}>
      <LinearGradient
        colors={['#766787', '#1D1921']}
        style={{ ...tw`absolute inset-0` }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Text style={tw`text-2xl font-bold text-white mb-4 text-center`}>
        {"Lucas"} Daily Horoscope News
      </Text>
      <FlatList
        data={VIRGO_DAILY_NEWS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={tw`bg-white rounded-xl p-4 mb-4 shadow`}>
            <Text style={tw`text-lg font-semibold text-[#6d5cae] mb-1`}>
              {item.title}
            </Text>
            <Text style={tw`text-base text-[#333]`}>
              {item.content}
            </Text>
          </View>
        )}
        contentContainerStyle={tw`pb-6`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
