import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Pressable } from 'react-native';
import tw from 'twrnc';

export function Contact() {
    return (
        <>
            <ThemedView style={tw`w-full flex-row items-start bg-[#766787]  gap-5 p-2`}>
                <ThemedText style={tw`text-2xl text-[#FEA5A5] items-center  font-semibold italic text-center`} type="defaultSemiBold">
                    Contact a Tarolog
                      <Pressable style={tw`items-center rounded-3xl text-center mt-3  hover:underline `}>
                    <ThemedText style={tw`text-lg text-[#FEA5A5] font-bold ml-3`} type="default">
                        Click Now!
                    </ThemedText>
                </Pressable>
                </ThemedText>
              
            </ThemedView>
        </>
    );
}