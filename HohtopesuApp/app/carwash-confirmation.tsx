import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CarwashConfirmationScreen()
{
    const { title, address } = useLocalSearchParams();

    return (
        <View>
            <Text>{title}</Text>
            <Text>{address}</Text>
        </View>
    );
}
