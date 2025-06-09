import React from "react";
import { Image, Pressable } from "react-native";
import tw from 'twrnc';
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function OracleHero() {
    return (
        <ThemedView style={tw`w-full p-2 bg-[#766787] items-start`}>
            <ThemedView style={tw`w-full flex-row p-4 justify-between items-start gap-2 bg-[rgba(127,42,42,0.8)] rounded-3xl`}>
                <Pressable style={tw`h-15 min-w-[180px] opacity-90 justify-center items-center z-10 overflow-hidden`}>
                    <ThemedText style={tw`text-center text-base font-semibold text-[#766787]`}>
                        Make a quest to The Oracle 
                    </ThemedText>
                    <ThemedText style={tw`text-center text-base font-semibold text-[#766787]`}>
                        and get your answer
                    </ThemedText>
                </Pressable>
                <Image
                    source={require("@/assets/images/heroEducas-1.png")}
                    style={tw`w-25 h-25`}
                    resizeMode="cover"
                />
            </ThemedView>
        </ThemedView>
    );
}