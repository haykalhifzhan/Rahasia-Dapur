import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import API from "../services/api";
import logo from "../assets/logo.png";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle register user
  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Semua field wajib diisi.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Password tidak cocok.");
      return;
    }

    try {
      await API.post("/auth/register", {
        email,
        password,
      });

      Alert.alert("Sukses", "Akun berhasil dibuat!");
      navigation.navigate("Login");
    } catch (err) {
      Alert.alert("Error", "Gagal membuat akun.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        {/* Branding */}
        <View style={styles.brandContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.brandText}>Rahasia Dapur</Text>
        </View>

        <Text style={styles.heroTitle}>
          Buat Akun & Mulai Belajar Memasak
        </Text>

        <Text style={styles.heroSubtitle}>
          Resep mudah, langkah jelas, siap langsung praktik
        </Text>

        {/* Card Register */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daftar Akun</Text>
          <Text style={styles.cardSubtitle}>
            Mulai petualangan kulinermu sekarang.
          </Text>

          <TextInput
            placeholder="Email Address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          {/* Password */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eye}>
                {showPassword ? "🙈" : "👁"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Konfirmasi Password"
              secureTextEntry={!showConfirmPassword}
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              <Text style={styles.eye}>
                {showConfirmPassword ? "🙈" : "👁"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Buat Akun</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  brandText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
  },
  eye: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#1E3A8A",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
