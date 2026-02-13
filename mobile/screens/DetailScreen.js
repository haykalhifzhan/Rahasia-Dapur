import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  StatusBar,
} from "react-native";
import API from "../services/api";

export default function DetailScreen({ route }) {
  const { id } = route.params;
  const [recipe, setRecipe] = useState(null);

  // Ambil detail resep berdasarkan id
  useEffect(() => {
    API.get(`/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!recipe) return null;

  const rating = recipe.rating || 4;
  const totalReviews = recipe.reviews || 100;

  // Render bintang rating
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return "★".repeat(fullStars) + "☆".repeat(emptyStars);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        stickyHeaderIndices={[0]}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.title}>{recipe.title}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.stars}>{renderStars()}</Text>
            <Text style={styles.ratingText}>
              {rating.toFixed(1)} / 5.0 ({totalReviews} ulasan)
            </Text>
          </View>

          <Image
            source={{
              uri: `http://192.168.1.41:5000/images/${recipe.title
                .toLowerCase()
                .replace(/\s+/g, "_")}.png`,
            }}
            style={styles.image}
          />

          <Text style={styles.description}>{recipe.description}</Text>

          <View style={styles.infoRow}>
            <Text>⏱ {recipe.time || "30 menit"}</Text>
            <Text>🍽 {recipe.serving || "2-3 porsi"}</Text>
          </View>

          {recipe.videoUrl && (
            <TouchableOpacity
              style={styles.videoButton}
              onPress={() => Linking.openURL(recipe.videoUrl)}
            >
              <Text style={styles.videoText}>
                ▶ Tonton Video Tutorial
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {/* Bahan */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>📋 Bahan-bahan</Text>

            {recipe.ingredients?.map((item, i) => (
              <Text key={i} style={styles.listItem}>
                • {item}
              </Text>
            ))}
          </View>

          {/* Cara Memasak */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>👩‍🍳 Cara Memasak</Text>

            {recipe.steps?.map((step, i) => (
              <Text key={i} style={styles.listItem}>
                {i + 1}. {step}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },

  scrollContainer: {
    paddingBottom: 40,
  },

  heroSection: {
    backgroundColor: "#F3F6FB",
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 25,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  stars: {
    color: "#F59E0B",
    fontSize: 16,
    marginRight: 8,
  },

  ratingText: {
    fontSize: 12,
    color: "#6B7280",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
  },

  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  videoButton: {
    backgroundColor: "#DC2626",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 30,
  },

  videoText: {
    color: "white",
    fontWeight: "600",
  },

  contentSection: {
    paddingHorizontal: 20,
  },

  sectionCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 18,
    marginBottom: 20,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  listItem: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },
});
