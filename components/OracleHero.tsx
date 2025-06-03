import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function OracleHero() {
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.holder}>
                <Pressable style={styles.titleBtn}>
                    <ThemedText style={styles.title} type="defaultSemiBold">
                        Make a quest to The Oracle 
                    </ThemedText>
                    <ThemedText style={styles.title} type="defaultSemiBold">
                        and get your answer
                    </ThemedText>
                </Pressable>
                <Image
                    source={require("@/assets/images/heroEducas-1.png")}
                    style={styles.backgroundImage}
                />
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        backgroundColor: "#766787",
        alignItems: "flex-start", // aligns holder to the start
    },
    holder: {
        width: "100%",
        flexDirection: "row",
                padding: 16,

        justifyContent: "space-between", // space between the two elements
        alignItems: "flex-start", // align items to the top of the holder
        gap: 10, // space between the image and the button
                backgroundColor: "rgba(127, 42, 42, 0.8)",
        borderRadius: 30,

    },
    backgroundImage: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        
    },
    titleBtn: {
        height: 60,
        minWidth: 180,
        opacity: 0.9,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        overflow: "hidden",
    },
    title: {
        textAlign: "center",
        fontSize: 17,
        fontWeight: "600",
        color: "#766787",
    },
});