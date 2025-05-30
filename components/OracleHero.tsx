import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";


export function OracleHero() {
    return (
        <ThemedView style={styles.container}>
            <View style={styles.backgroundImage}>
                <Image
                source={require("@/assets/images/heroEducas-1.png")}
                style={styles.backgroundImage}
            />
            <Pressable style={styles.titleBtn}>
                <ThemedText style={styles.title} type="defaultSemiBold">
                    Oracle Cards
                </ThemedText>
            </Pressable>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        maxHeight: 400,
        flex: 0.8,
        justifyContent: "flex-end",
        alignItems: "center",
    },

    backgroundImage: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        top: 0,
        left: 0,
    },
    titleBtn: {
        padding: 16,
        height: 60,
        width: 180,
        borderRadius: 30, // <-- half of height for pill
        opacity: 0.8,
        justifyContent: "center",
        marginBottom: 20,
        alignItems: "center",
        zIndex: 2,
        overflow: "hidden",
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "semibold",
        color: "#FEA5A5",
    },

});