import { Stack } from "expo-router";

export default function RootLayout()
{
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="debug" options={{ title: "Debug" }} />

            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="map" />
            <Stack.Screen name="carwash-confirmation" />
            <Stack.Screen name="wash-confirmation" />
            <Stack.Screen name="now-washing" />
        </Stack>
    );
}
