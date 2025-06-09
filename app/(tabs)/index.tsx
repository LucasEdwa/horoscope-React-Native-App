import { Contact } from '@/components/Contact';
import { Hero1 } from '@/components/Hero1';
import { Navbar } from '@/components/Navbar';
import { OracleHero } from '@/components/OracleHero';
import { ThemedView } from '@/components/ThemedView';
import { Platform, ScrollView } from 'react-native';
import tw from 'twrnc';

export default function HomeScreen() {
  return (
    <ThemedView style={tw`flex-1 ${Platform.OS === 'android' ? 'pt-6' : ''} m-0`}>
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        <Navbar />
        <Hero1 />
        <Contact />
        <OracleHero />
      </ScrollView>
    </ThemedView>
  );
}