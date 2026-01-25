import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router"
import { Image } from "expo-image";

export default function LoginScreen()
{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = () => {
        if (username === "user" && password === "user") {
            setError("")
            router.replace("/map-screen")
        } else {
            setError("Virheellinen käyttäjätunnus tai salasana")
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
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize:16,
        backgroundColor: "#ccc"
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
})