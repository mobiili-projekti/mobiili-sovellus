import { View, ActivityIndicator, StyleSheet } from "react-native";
import { theme } from "@/constants/theme";

type Props =
{
    size?: "small" | "large";
};

export default function LoadingCircle({ size = "large" }: Props)
{
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={theme.colors.headerBackground} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
