import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Image } from "expo-image";
import { theme } from "@/constants/theme";

export default function RegisterScreen()
{
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const handleRegister = () => {
        if (password === "user" && confirmPassword === "user" && email == "user" && username == "user") {
            setError("")
            alert("Rekisteröinti onnistui!")
            router.replace("/login")
        } else {
            setError("Rekisteröinti epäonnistui. Tarkista tiedot ja yritä uudelleen.")
        }

    }
    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/logo.png')}
                style={styles.logo}
            />
            <View style={styles.formRegister}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Käyttäjänimi" 
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    />
                <TextInput 
                    style={styles.input}
                    placeholder="Sähköposti"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    />
                <TextInput 
                    style={styles.input}
                    placeholder="Salasana"
                    secureTextEntry={true} 
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    />
                <TextInput 
                    style={styles.input}
                    placeholder="Vahvista salasana"
                    secureTextEntry={true} 
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    autoCapitalize="none"
                    />
                <Pressable style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Rekisteröidy</Text>
                </Pressable>
                {error ? <Text style={styles.error}>{error}</Text> : null}
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
    formRegister: {
        marginTop: 12,
        gap: 12,
        marginBottom: 80,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 50,
        backgroundColor: "#ccca"
    },input: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize:16,
        backgroundColor: "#f7f7f7",
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