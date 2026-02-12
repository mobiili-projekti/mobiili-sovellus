import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { theme } from "@/constants/theme"

export default function statistics() {
  return (
    <View style={styles.container}>
    <ScrollView nestedScrollEnabled={true}>
      <View style={styles.barChart}>
        <Text style={styles.title}>Pesujesi määrä</Text>
        <ScrollView horizontal nestedScrollEnabled={true}>
          <BarChart
            data={[5, 12, 9, 7, 12, 9, 7, 12, 9, 7, 11, 15]}
            labels={["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"]}
          />
        </ScrollView>
      </View>
      <View style={styles.pieChart}>
        <Text style={styles.title}>Käyttämäsi pesuohjelmat</Text>
        <PieChart
          data={[
            { value: 40, color: "#2563eb", label: "Harjapesu" },
            { value: 50, color: "#22c55e", label: "Harjaton pesu" },
            { value: 20, color: "#f59e0b", label: "Vahapesu" },
            { value: 10, color: "#ef4444", label: "Luksuspesu" },
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
    backgroundColor: "#ebebeb",
    marginBottom: 12,
  },
  pieChart: {
    height: 390,
    borderRadius: 12,
    padding: 4,
    backgroundColor: "#ebebeb",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    color: theme.colors.text,
    padding: 4,
  }
})