import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌱 AgriPay</Text>
      <Text>Bienvenue sur AgriPay Mobile</Text>
      <Text>Services agricoles et transactions</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20
  }
});
