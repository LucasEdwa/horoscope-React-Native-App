import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={['#766787', '#1D1921']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {/* Questions left box */}
        <View style={styles.questionsLeftBox}>
          <Text style={styles.questionsLeftText}>{questionsLeft}</Text>
          <Text style={styles.questionsLeftLabel}>Questions Left</Text>
        </View>
        <Text style={styles.header}>Oracle</Text>
        <Text style={styles.description}>
          Ask your question to the Oracle below.
        </Text>
        <ScrollView style={styles.history} contentContainerStyle={{ paddingBottom: 16 }}>
          {history.map((q, idx) => (
            <View key={idx} style={styles.questionBubble}>
              <Text style={styles.questionText}>{q}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type your question..."
            placeholderTextColor="#bbb"
            value={question}
            onChangeText={setQuestion}
            onSubmitEditing={handleAsk}
            returnKeyType="send"
            editable={questionsLeft > 0}
          />
          <TouchableOpacity
            style={[styles.askButton, { opacity: questionsLeft > 0 ? 1 : 0.5 }]}
            onPress={handleAsk}
            disabled={questionsLeft <= 0}
          >
            <Text style={styles.askButtonText}>Ask</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f6f3fa',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  questionsLeftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 6,
    elevation: 1,
    shadowColor: '#6d5cae',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    minWidth: 120,
    justifyContent: 'flex-start',
  },
  questionsLeftText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  questionsLeftLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 1,
    textAlign: 'center',
    zIndex: 1,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    zIndex: 1,
  },
  history: {
    alignSelf: 'stretch',
    maxHeight: 280,
    marginBottom: 8,
    zIndex: 1,
  },
  questionBubble: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignSelf: 'flex-end',
    maxWidth: '80%',
    shadowColor: '#6d5cae',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  questionText: {
    color: '#333',
    fontSize: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    zIndex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0d7f3',
    marginRight: 8,
  },
  askButton: {
    backgroundColor: '#6d5cae',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  askButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

