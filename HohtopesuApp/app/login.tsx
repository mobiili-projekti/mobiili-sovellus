import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router"
import { Image } from "expo-image";
import { theme } from "@/constants/theme";

const API_URL = process.env.EXPO_PUBLIC_API_URL

export default function LoginScreen()
{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Täytä kaikki kentät")
            return
        } 

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: username,
                    password: password,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Kirjautuminen epäonnistui")
            }
            const data = await response.json()
            // Tallenna token ja käyttäjätiedot tarvittaessa
            router.replace("/map-screen")
        }
        catch (error: any) {
            setError(error.message || "Kirjautuminen epäonnistui")
        }
    }

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/logo.png')}
                style={styles.logo}
            />
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Sähköposti"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Salasana"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
                {error !== "" && <Text style={styles.error}>{error}</Text>}
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Kirjaudu</Text>
                </Pressable>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Etkö ole vielä jäsen?</Text>
                <Pressable style={styles.button} onPress={() => router.push("/register")}>
                    <Text style={styles.buttonText}>Rekisteröidy</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 24,
        gap: 12,
    },
    logo: {
        width: "100%",
        aspectRatio: 1.5,
        alignSelf: "center",
        marginBottom: 20,
        marginTop: 10,
    },
    form : {
        marginTop: 10,
        gap: 12,
        marginBottom: 45,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize:16,
        backgroundColor: "#f7f7f7"
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
})