import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import type { RootState } from '../../store';
import { askOracle } from '../utils/oracleApi';

const QUESTION_LIMIT = 3;

export default function OracleScreen() {
  // Get user email from Redux if available
  const userEmail = useSelector((state: RootState) => state.user?.email);
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const questionsLeft = QUESTION_LIMIT - history.length;

  const handleAsk = async () => {
    if (question.trim() && questionsLeft > 0 && userEmail) {
      setLoading(true);
      try {
        const answer = await askOracle(userEmail, question.trim());
        setHistory(prev => [...prev, { q: question.trim(), a: answer }]);
      } catch {
        setHistory(prev => [...prev, { q: question.trim(), a: 'Sorry, the Oracle could not answer right now.' }]);
      }
      setQuestion('');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={tw`flex-1 justify-around items-center bg-[#f6f3fa] px-4 pb-6`}>
        <LinearGradient
          colors={['#766787', '#1D1921']}
          style={tw`absolute inset-0`}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {/* Questions left box */}
        <View style={tw`flex-row items-center self-center rounded-xl px-4 py-1 min-w-[120px] justify-start bg-[#6d5cae]/10`}>
          <Text style={tw`text-xl font-bold text-white mr-2`}>{questionsLeft}</Text>
          <Text style={tw`text-base font-semibold text-white`}>Questions Left</Text>
        </View>
        <Text style={tw`text-2xl font-bold text-white mb-1 text-center z-10`}>Oracle</Text>
        <Text style={tw`text-base text-white text-center z-10`}>Ask your question to the Oracle below.</Text>
        <ScrollView style={tw`self-stretch max-h-[220px] mb-2 z-10 `} contentContainerStyle={tw`pb-4`}>
          {history.map((item, idx) => (
            <View key={idx} style={tw`mb-2`}>
              <View style={tw`bg-white rounded-lg p-3 self-end w-[100%] shadow`}>
                <Text style={tw`text-[#333] text-base`}>{item.q}</Text>
              </View>
              <View style={tw`bg-[#6d5cae] rounded-xl p-3 self-start w-[100%]  mt-1 shadow`}>
                <Image
                  source={require('../../assets/images/oracle 1-2.png')}
                  style={tw`w-18 h-18 mb-2 self-center`}
                  resizeMode="contain"
                />
                {/* Example: Show an image above the answer */}
                <Text style={tw`text-white text-base`}>
                  {item.a}
                </Text>
              </View>
            </View>
          ))}
          {loading && (
            <View style={tw`flex-row items-center justify-center mt-2`}>
              <ActivityIndicator size="small" color="#6d5cae" />
              <Text style={tw`ml-2 text-[#6d5cae] text-base`}>The Oracle is thinking...</Text>
            </View>
          )}
        </ScrollView>
        <View style={tw`flex-row items-center self-stretch z-10`}>
          <TextInput
            style={tw`flex-1 bg-white rounded px-3 py-2 text-base border border-[#e0d7f3] mr-2`}
            placeholder="Type your question..."
            placeholderTextColor="#bbb"
            value={question}
            onChangeText={setQuestion}
            onSubmitEditing={handleAsk}
            returnKeyType="send"
            editable={questionsLeft > 0 && !loading}
          />
          <TouchableOpacity
            style={tw`bg-[#6d5cae] rounded px-4 py-3 ${questionsLeft > 0 && !loading ? '' : 'opacity-50'}`}
            onPress={handleAsk}
            disabled={questionsLeft <= 0 || loading}
          >
            <Text style={tw`text-white font-bold text-base`}>Ask</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

