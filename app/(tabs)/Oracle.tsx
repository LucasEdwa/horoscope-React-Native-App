import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const QUESTION_LIMIT = 3;

export default function OracleScreen() {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const questionsLeft = QUESTION_LIMIT - history.length;

  const handleAsk = () => {
    if (question.trim() && questionsLeft > 0) {
      setHistory(prev => [...prev, question]);
      setQuestion('');
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
        <ScrollView style={tw`self-stretch max-h-[220px] mb-2 z-10`} contentContainerStyle={tw`pb-4`}>
          {history.map((q, idx) => (
            <View key={idx} style={tw`bg-white rounded-lg p-3 self-end max-w-[80%] shadow mb-2`}>
              <Text style={tw`text-[#333] text-base`}>{q}</Text>
            </View>
          ))}
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
            editable={questionsLeft > 0}
          />
          <TouchableOpacity
            style={tw`bg-[#6d5cae] rounded px-4 py-3 ${questionsLeft > 0 ? '' : 'opacity-50'}`}
            onPress={handleAsk}
            disabled={questionsLeft <= 0}
          >
            <Text style={tw`text-white font-bold text-base`}>Ask</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

