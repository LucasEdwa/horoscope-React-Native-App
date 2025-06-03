import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function OracleScreen() {
    return (
        <View style={styles.container}>
        <LinearGradient
            colors={['#766787', '#1D1921']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        />
        <Text style={styles.header}>Oracle</Text>
        <Text style={styles.description}>
            This is the Oracle screen where you can ask questions and get answers.
        </Text>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f3fa',
    },
    header: {   
    fontSize: 24,
        fontWeight: 'bold',
        color: '#6d5cae',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

