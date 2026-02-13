import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import logo from "../assets/logo.png";

export default function HomeScreen({ navigation }) {
  const { logout } = useContext(AuthContext);

  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL");

  // Ambil semua resep saat pertama kali masuk halaman
  useEffect(() => {
    API.get("/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Filter berdasarkan pencarian dan tingkat kesulitan
  const filteredRecipes = recipes.filter((recipe) => {
    const matchSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchDifficulty =
      difficultyFilter === "ALL" ||
      recipe.difficulty === difficultyFilter;

    return matchSearch && matchDifficulty;
  });

  // Render card resep
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: `http://192.168.1.41:5000/images/${item.title
            .toLowerCase()
            .replace(/\s+/g, "_")}.png`,
        }}
        style={styles.image}
      />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.difficulty}</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Detail", { id: item._id })
          }
        >
          <Text style={styles.buttonText}>Lihat Resep →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.brand}>Rahasia Dapur</Text>
        </View>

        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            {/* Hero */}
            <View style={styles.heroSection}>
              <Text style={styles.welcomeSmall}>
                Selamat Datang di
              </Text>
              <Text style={styles.welcomeLarge}>
                Rahasia Dapur 👨‍🍳
              </Text>

              <Text style={styles.heroSubtitle}>
                Belajar memasak dengan mudah, praktis, dan menyenangkan
              </Text>
            </View>

            {/* Search */}
            <TextInput
              placeholder="Cari resep, bahan..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.search}
            />

            {/* Filter */}
            <View style={styles.filterContainer}>
              {["ALL", "MUDAH", "SEDANG", "SULIT"].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.filterBtn,
                    difficultyFilter === level && styles.activeFilter,
                  ]}
                  onPress={() => setDifficultyFilter(level)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      difficultyFilter === level &&
                        styles.activeFilterText,
                    ]}
                  >
                    {level === "ALL" ? "Semua" : level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Section Title */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Resep Pilihan Untuk Anda
              </Text>
              <Text style={styles.sectionSubtitle}>
                Temukan inspirasi masakan terbaik hari ini
              </Text>
            </View>
          </>
        }
        data={filteredRecipes}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },

  header: {
    height: 65,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 28,
    height: 28,
    marginRight: 8,
  },

  brand: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  logoutBtn: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },

  logoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },

  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },

  welcomeSmall: {
    fontSize: 16,
    color: "#6B7280",
  },

  welcomeLarge: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E3A8A",
    marginTop: 4,
  },

  heroSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 10,
  },

  search: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
    elevation: 2,
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    marginHorizontal: 5,
  },

  activeFilter: {
    backgroundColor: "#1E3A8A",
  },

  filterText: {
    fontSize: 13,
    color: "#374151",
  },

  activeFilterText: {
    color: "white",
  },

  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 25,
    overflow: "hidden",
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 200,
  },

  cardContent: {
    padding: 16,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  badge: {
    backgroundColor: "#F59E0B",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
  },

  description: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#1E3A8A",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
