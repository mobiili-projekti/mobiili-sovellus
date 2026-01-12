import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

function DebugLink(props: { title: string; href: string })
{
    return (
        <Pressable onPress={() => router.push(props.href)}>
            <Text>{props.title}</Text>
        </Pressable>
    );
}

export default function DebugScreen()
{
    return (
        <View>
            <DebugLink title="Login" href="/login" />
            <DebugLink title="Register" href="/register" />
            <DebugLink title="Map" href="/map" />
            <DebugLink title="Carwash Confirmation" href="/carwash-confirmation" />
            <DebugLink title="Wash Confirmation" href="/wash-confirmation" />
            <DebugLink title="Now Washing" href="/now-washing" />
        </View>
    );
}
