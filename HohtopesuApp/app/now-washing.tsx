import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router"
import { theme } from "@/constants/theme"

type nowWashingParams = {
    programId: string
    programName: string
    durationSeconds: string
}

export default function NowWashingScreen()
{
    const { programName, durationSeconds } = useLocalSearchParams<nowWashingParams>()
    const initialSeconds = Number(durationSeconds)

    const [seconds, setSeconds] = useState<number>(initialSeconds)

    const handleStopPress = () => {
        Alert.alert(
            "Lopeta pesu?",
            "Haluatko varmasti keskeyttää pesun?",
            [
                {
                    text: "Peruuta",
                    style: "cancel"
                },
                {
                    text: "Lopeta",
                    style: "destructive",
                    onPress: () => {
                        setSeconds(0)
                        router.replace("/map-screen")
                    }
                }
            ]
        )
    }

    /*
    useEffect(() => {
        if(isNaN(initialSeconds)) {
            router.replace("/map-screen")
            return
        }

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
    },[]) */

    useEffect(() => {
        if(isNaN(initialSeconds)) {
            router.replace("/map-screen")
            return
        }

        const endTime = Date.now() + initialSeconds * 1000

        const interval = setInterval(() => {
            const remaining = Math.max(
                0,
                Math.floor((endTime - Date.now()) / 1000)
            )

            setSeconds(remaining)

            if (remaining <= 0) {
                clearInterval(interval)
                router.replace("/map-screen")
            }
        }, 1000)

        return () => clearInterval(interval)
    },[])

    const minuutit = Math.floor(seconds / 60)
    const sekunnit = seconds % 60

    const formattedTime = `${String(minuutit).padStart(2, "0")}min ${String(sekunnit).padStart(2, "0")}sec`

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {programName && (<Text style={styles.title}>{programName} käynnissä</Text>)}
                <Text style={styles.timer}>{formattedTime}</Text>
            </View>

            <Pressable
                style={styles.stopButton}
                onPress={() => handleStopPress()}
            >
                <Text style={styles.stopText}>STOP</Text>
            </Pressable>
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
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: theme.colors.text,
    },
    timer: {
        fontSize: 48,
        fontWeight: "bold",
        color: theme.colors.text,
    },
    stopButton: {
        marginBottom: 20,
        backgroundColor: "#e53935",
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 12,
    },
    stopText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    }
})