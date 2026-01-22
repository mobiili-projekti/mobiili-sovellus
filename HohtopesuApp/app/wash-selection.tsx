import { View, Text, Pressable, StyleSheet, Alert, ScrollView } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { WashProgram, washPrograms } from "../types/wash-programs";
import WashCard from "../components/wash-card";

export default function WashSelectionScreen(){

    const [selectedProgram, setSelectedProgram] = useState<WashProgram | null>(null);

    const handleStartWash = () => {
        if (selectedProgram) {
            router.push({
                pathname: '/now-washing',
                params: { 
                    programId: selectedProgram.id, 
                    programName: selectedProgram.name, 
                    durationSeconds: selectedProgram.durationSeconds
                }
            });
        } else {
            Alert.alert("Valitse pesuohjelma ensin.");
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Valitse Pesuohjelma</Text>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.listPrograms}>
                {washPrograms.map((program) => (
                    <WashCard
                        key={program.id}
                        program={program}
                        isSelected={selectedProgram?.id === program.id}
                        onSelect={setSelectedProgram}
                    />
                ))}
            </ScrollView>
            <Pressable style={styles.button} onPress={handleStartWash}>
                <Text style={styles.buttonText}>Aloita Pesu</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        gap: 12,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#2563eb",
        padding: 14,
        borderRadius: 8,
        marginTop: 12,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
    },
    error: {
        color: "red",
        textAlign: "center",
        fontSize: 14,
    },
    footer: {
        justifyContent: "center",
        paddingBottom: 24,
    },
    footerText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center"
    },
    scrollView: {
        flex: 1,
        paddingRight: 4,
    },
    listPrograms: {
        gap: 12,
        paddingBottom: 12,
        paddingRight: 8,
    }
})