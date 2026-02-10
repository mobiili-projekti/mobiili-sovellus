import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Image } from "expo-image";
import { theme } from "@/constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const API_URL = process.env.EXPO_PUBLIC_API_URL

type RegisterResponse = {
    id: string
    email: string
}

export default function RegisterScreen()
{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleRegister = async () => {
        if (loading) return

        setError("")
        setLoading(true)

        if (!password && !confirmPassword && !email && !firstName && !lastName) {
            setError("Rekisteröinti epäonnistui. Tarkista tiedot ja yritä uudelleen")
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            setError("Salasanat eivät täsmää")
            setLoading(false)
            return
        }

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    password: password,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Rekisteröinti epäonnistui")
            }

            const data: RegisterResponse = await response.json()
            console.log("Response data: ", data)

            Alert.alert(
                "Rekisteröinti onnistui",
                "",
                [{ text: "OK", onPress: () => router.replace("/login") }],
                { cancelable: false }
            )

        } catch (err: any) {
            setError(err.message ?? "Tapahtui virhe rekisteröinnissä")
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
            extraScrollHeight={30}
            keyboardOpeningTime={0}
        >
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                />
                <View style={styles.formRegister}>
                    <TextInput
                        style={styles.input}
                        placeholder="Etunimi"
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Sukunimi"
                        value={lastName}
                        onChangeText={setLastName}
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
                    <Pressable
                        style={[styles.button, loading && { opacity: 0.6 }]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>Rekisteröidy</Text>
                    </Pressable>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "flex-start",
        padding: 24,
    },
    container: {
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