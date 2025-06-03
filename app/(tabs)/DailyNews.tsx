import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

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
    <View style={styles.container}>
      <LinearGradient
        colors={['#766787', '#1D1921']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Text style={styles.header}>{"Lucas"} Daily Horoscope News</Text>
      <FlatList
        data={VIRGO_DAILY_NEWS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f3fa',
    paddingTop: 40,
    paddingHorizontal: 18,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 18,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#6d5cae',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6d5cae',
    marginBottom: 6,
  },
  content: {
    fontSize: 15,
    color: '#333',
  },
});
