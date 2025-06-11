import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Pressable } from "react-native";
import tw from 'twrnc';
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
export function OracleHero() {
    return (
        <ThemedView style={tw`w-full p-2 bg-[#766787] items-start`}>
            <ThemedView style={tw`w-full flex-row p-4 justify-between items-start gap-2 bg-[#766787] rounded-3xl`}>
                  <LinearGradient
                        colors={['#766787', '#1D1921']}
                        style={tw`absolute inset-0 rounded-3xl`}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />
                <Pressable style={tw`h-15 min-w-[180px] opacity-90 justify-center items-center z-10 overflow-hidden`}>
                  
                    <ThemedText style={tw`text-center text-base font-semibold text-[#FEA5A5]`}>
                        Make a quest to The Oracle
                    </ThemedText>
                    <ThemedText style={tw`text-center text-base font-semibold text-[#FEA5A5]`}>
                        and get your answer
                    </ThemedText>
                </Pressable>
                <Image
                    source={require('../assets/images/hero1.png')}
                    style={tw`w-20 h-20 rounded-full border-2 border-[#fff] shadow-lg shadow-black`}
                />
            </ThemedView>
        </ThemedView>
    );
}