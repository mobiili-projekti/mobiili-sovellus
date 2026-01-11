import { View, Text, Button, StyleSheet, Pressable } from "react-native"
import { router } from "expo-router"

export default function Debug() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debug</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/map")}
      >
        <Text style={styles.buttonText}>Map</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/modal")}
      >
        <Text style={styles.buttonText}>Modal</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/now-washing")}
      >
        <Text style={styles.buttonText}>Now-Washing</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/wash-confirmation")}
      >
        <Text style={styles.buttonText}>Wash-Confirmation</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/carwash-confirmation")}
      >
        <Text style={styles.buttonText}>Carwash-confirmation</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  }
})