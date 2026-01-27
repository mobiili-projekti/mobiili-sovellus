import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function statistics() {
  return (
    <View style={styles.container}>
    <ScrollView nestedScrollEnabled={true}>
      <View style={styles.barChart}>
        <Text style={styles.title}>Pesujen käyttö</Text>
        <ScrollView horizontal nestedScrollEnabled={true}>
          <BarChart
            data={[5, 12, 9, 7, 12, 9, 7, 12, 9, 7, 11, 15]}
            labels={["Testi1", "Testi2", "Testi3", "Testi4", "Testi5", "Testi6", "Testi7", "Testi8", "Testi9", "Testi10", "Testi11", "Testi12"]}
          />
        </ScrollView>
      </View>
      <View style={styles.pieChart}>
        <Text style={styles.title}>Käyttämäsi pesuohjelmat</Text>
        <PieChart
          data={[
            { value: 40, color: "#2563eb", label: "Testi1" },
            { value: 30, color: "#22c55e", label: "Testi2" },
            { value: 20, color: "#f59e0b", label: "Testi3" },
            { value: 10, color: "#ef4444", label: "Testi4" },
          ]}
        />
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    gap: 12,
  },
  barChart: {
    height: 300,
    borderRadius: 12,
    padding: 4,
    backgroundColor: "#111",
    marginBottom: 12,
  },
  pieChart: {
    height: 390,
    borderRadius: 12,
    padding: 4,
    backgroundColor: "#111",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    color: "#666",
    padding: 4,
  }
})