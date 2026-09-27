
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const API_URL = "https://agripay-backend-45vo.onrender.com";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email.trim() || !password) {
      Alert.alert("AgriPay", "Entre ton email et ton mot de passe.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Connexion impossible",
          data.message || "Vérifie tes informations."
        );
        return;
      }

      Alert.alert(
        "Connexion réussie",
        `Bienvenue ${data.user?.name || "sur AgriPay"} !`
      );
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Impossible de contacter le serveur AgriPay."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.card}>
        <Text style={styles.logo}>🌱 AgriPay</Text>
        <Text style={styles.title}>Bienvenue</Text>
        <Text style={styles.subtitle}>
          Connecte-toi à ton compte AgriPay
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Adresse email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={login}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Se connecter</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footer}>
          Paiements et services agricoles
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f8ff",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1565c0",
    textAlign: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 28,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#1565c0",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    color: "#777777",
    marginTop: 24,
  },
});
