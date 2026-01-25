import { WashProgram } from "../types/wash-programs";
import { formatTime } from "../utils/formatTime";
import { formatPrice } from "../utils/formatPrice";
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type WashCardProps = {
    program: WashProgram;
    isSelected: boolean;
    onSelect: (program: WashProgram) => void;
};

export default function WashCard({
    program,
    isSelected = false,
    onSelect,
}: WashCardProps) {
    return (
        <Pressable onPress={() => onSelect(program)} style={[styles.card, isSelected && styles.selectedCard]}>
            <Text style={styles.programName}>{program.name}</Text>
            <Text style={styles.programDetails}>Kesto: {formatTime(program.durationSeconds)} min</Text>
            <Text style={styles.programDetails}>Hinta: {formatPrice(program.priceCents)}</Text>
            <Text style={styles.programDetails}>{program.description}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 12,
    },
    selectedCard: {
        borderColor: "#2563eb",
        backgroundColor: "#e0e7ff",
    },
    programName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    programDetails: {
        fontSize: 14,
        color: "#555",
    }
});