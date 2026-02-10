import { View, Text, Pressable, StyleSheet, Alert, ScrollView } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { WashProgram, washPrograms } from "../types/wash-programs";
import WashCard from "../components/wash-card";
import { theme } from "@/constants/theme";
import LoadingCircle from "../components/loading-circle";

export default function WashSelectionScreen(){

    const [selectedProgram, setSelectedProgram] = useState<WashProgram | null>(null);
    const [loading, setLoading] = useState(false);

    const handleStartWash = () => {
        if (selectedProgram) {

            setLoading(true);

            router.replace({
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

    if (loading)
    {
        return <LoadingCircle />;
    }

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
        color: theme.colors.text,
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: theme.colors.headerBackground,
        padding: 14,
        borderRadius: 8,
        marginTop: 12,
    },
    buttonText: {
        color: theme.colors.headerText,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
    },
    error: {
        color: theme.colors.danger,
        textAlign: "center",
        fontSize: 14,
    },
    footer: {
        justifyContent: "center",
        paddingBottom: 24,
    },
    footerText: {
        fontSize: 14,
        color: theme.colors.text,
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