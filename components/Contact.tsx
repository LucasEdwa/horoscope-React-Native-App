import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export function Contact() {
    return (
        <>
            <ThemedView style={styles.screen}>
                <ThemedText style={styles.buttonText} type="defaultSemiBold">
                    Contact a Tarolog
                </ThemedText>
                <Pressable style={styles.button}>
                    <ThemedText style={styles.subText} type="default">
                        Click Now!
                    </ThemedText>
                </Pressable>
            </ThemedView>

        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        flex: 0.1,
        backgroundColor: '#766787',
        alignItems: 'flex-start',
        flexDirection: 'row',
        gap: 20,
        maxHeight: 50,
    },
    button: {

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        marginTop: 10,
        padding: 2,



    },
    buttonText: {
        fontSize: 25,
        color: '#FEA5A5',
        marginTop: 10,
        fontWeight: 'semibold',
        fontStyle: 'italic',

    },
    subText: {
        fontSize: 25,
        color: '#FEA5A5',
        fontWeight: 'bold',
    },
});