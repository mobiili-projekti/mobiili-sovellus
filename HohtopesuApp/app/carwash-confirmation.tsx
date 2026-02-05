import { View, Text, StyleSheet, Image, Pressable, Dimensions } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function CarwashConfirmationScreen()
{
    const { title, address } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.address}>{address}, {title}</Text>

            <Image
                source={{
                    uri: "https://www.sonnyscws.com/wp-content/uploads/2019/07/image057.jpg"
                }}
                style={styles.image}
                resizeMode="cover"
            />

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.description}>
                Enimmäismitat: leveys 2.50m, korkeus 2.10m, pituus 6.00m. Painorajoitus 3000kg.
                Päivystys 24h 040-1234 56 78.
            </Text>

            <Pressable
                style={styles.button}
                onPress={() => router.push("/wash-selection")}
            >
                <Text style={styles.buttonText}>Valitse</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        padding: 20
    },
    address:
    {
        fontSize: 14,
        color: "#555",
        marginBottom: 8
    },
    image:
    {
        width: "100%",
        height: Dimensions.get("window").height * 0.25,
        borderRadius: 12,
        marginBottom: 16
    },
    title:
    {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8
    },
    description:
    {
        fontSize: 14,
        color: "#666",
        marginBottom: 24
    },
    button:
    {
        marginTop: "auto",
        marginBottom: 45,
        backgroundColor: "#2563eb",
        padding: 16,
        borderRadius: 8
    },
    buttonText:
    {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600"
    }
});
