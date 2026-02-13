import React, { useState, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import logo from "../assets/logo.png";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan password wajib diisi.");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      await login(res.data);
    } catch (err) {
      Alert.alert("Error", "Email atau password salah.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <View style={styles.brandContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.brandText}>Rahasia Dapur</Text>
        </View>

        <Text style={styles.heroTitle}>
          Masuk & Lanjutkan Belajar Memasak
        </Text>

        <Text style={styles.heroSubtitle}>
          Masuk untuk melanjutkan resep favoritmu
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Login Akun</Text>
          <Text style={styles.cardSubtitle}>
            Silakan masuk ke akunmu
          </Text>

          <TextInput
            placeholder="Email Address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

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

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Masuk</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <Text style={styles.bottomText}>
            Belum punya akun?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Register")}
            >
              Daftar
            </Text>
          </Text>
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
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
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
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
  },
  bottomText: {
    textAlign: "center",
    color: "#6B7280",
  },
  link: {
    color: "#1E3A8A",
    fontWeight: "600",
  },
});
