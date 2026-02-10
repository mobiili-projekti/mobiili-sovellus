import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router"
import { theme } from "@/constants/theme"
import * as Notifications from 'expo-notifications';

type nowWashingParams = {
    programId: string
    programName: string
    durationSeconds: string
}

function scheduleWashCompleteNotification() {
    Notifications.scheduleNotificationAsync({
        content: {
            title: "Pesu valmis",
            body: `Autopesusi on valmis! Aja ulos.`,
        },
        trigger: null,
    });
}

export default function NowWashingScreen()
{
    const { programName, durationSeconds } = useLocalSearchParams<nowWashingParams>()
    const initialSeconds = Number(durationSeconds)

    const [seconds, setSeconds] = useState<number>(initialSeconds)

    useEffect(() => {
        if(isNaN(initialSeconds)) {

            scheduleWashCompleteNotification()
            
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
    },[])

    const minuutit = Math.floor(seconds / 60)
    const sekunnit = seconds % 60

    const formattedTime = `${String(minuutit).padStart(2, "0")}min ${String(sekunnit).padStart(2, "0")}sec`

    return (
        <View style={styles.container}>
            {programName && (<Text style={styles.title}>{programName} käynnissä</Text>)}
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
        color: theme.colors.text,
    },
    timer: {
        fontSize: 48,
        fontWeight: "bold",
        color: theme.colors.text,
    },
})