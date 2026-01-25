import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router"

const harjaPesuAika = 15 * 60

export default function NowWashingScreen()
{
    const [seconds, setSeconds] = useState<number>(harjaPesuAika)

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                if(prev <= 0) {
                    clearInterval(interval)
                    router.replace("/map-screen")
                    return 0
                } else {
                    return prev - 1
                }
            })
        }, 1000)
        return () => clearInterval(interval)
    },[])

    const minuutit = Math.floor(seconds / 60)
    const sekunnit = seconds % 60

    const formattedTime = `${String(minuutit).padStart(2, "0")}min ${String(sekunnit).padStart(2, "0")}sec`

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pesu Käynnissä</Text>
            <Text style={styles.timer}>{formattedTime}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "white"
    },
    timer: {
        fontSize: 48,
        fontWeight: "bold",
        color: "white"
    },
})