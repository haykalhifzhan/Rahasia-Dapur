// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecipes } from "../services/recipeService";
import "../styles/global.css";

const API_BASE_URL = "http://localhost:5000";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL");

  const navigate = useNavigate();

  // Ambil semua resep saat halaman pertama kali dibuka
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await getRecipes();
        setRecipes(res.data || []);
      } catch (err) {
        console.error("Gagal ambil resep:", err);
      }
    };

    fetchRecipes();
  }, []);

  // Filter berdasarkan pencarian dan tingkat kesulitan
  const filteredRecipes = recipes.filter((recipe) => {
    const matchSearch =
      recipe.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchDifficulty =
      difficultyFilter === "ALL" ||
      recipe.difficulty === difficultyFilter;

    return matchSearch && matchDifficulty;
  });

  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="home-hero">
        <h1>
          👩‍🍳 Selamat Datang di{" "}
          <span className="highlight">Rahasia Dapur</span> 👨‍🍳
        </h1>
        <p>Belajar memasak dengan mudah, praktis, dan menyenangkan</p>

        <div className="home-search">
          <input
            type="text"
            placeholder="Cari resep, bahan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Difficulty Filter */}
        <div className="difficulty-filter">
          {["ALL", "MUDAH", "SEDANG", "SULIT"].map((level) => (
            <button
              key={level}
              className={`filter-btn ${
                difficultyFilter === level ? "active-filter" : ""
              }`}
              onClick={() => setDifficultyFilter(level)}
            >
              {level === "ALL" ? "Semua" : level}
            </button>
          ))}
        </div>
      </section>

      {/* Section Title */}
      <section className="home-section-title">
        <h2>Resep Pilihan Untuk Anda</h2>
        <p>Temukan inspirasi masakan terbaik hari ini</p>
      </section>

      {/* Recipe Grid */}
      <section className="home-grid">
        {filteredRecipes.length === 0 ? (
          <div className="empty-state">
            🔍 Tidak ada resep ditemukan.
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">

              {/* Image */}
              <div
                className="recipe-image"
                style={{
                  backgroundImage: `url('${API_BASE_URL}/images/${recipe.title
                    .toLowerCase()
                    .replace(/\s+/g, "_")}.png')`,
                }}
              />

              {/* Content */}
              <div className="recipe-content">
                <div className="recipe-header">
                  <h3>{recipe.title}</h3>
                  <span className="difficulty-badge">
                    {recipe.difficulty}
                  </span>
                </div>

                <p>{recipe.description}</p>

                <button
                  onClick={() => navigate(`/resep/${recipe._id}`)}
                  className="recipe-btn"
                >
                  Lihat Resep →
                </button>
              </div>

            </div>
          ))
        )}
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-container">

          <div className="footer-col">
            <h3>Rahasia Dapur</h3>
            <p>
              Platform belajar memasak yang profesional dan mudah digunakan.
            </p>
          </div>

          <div className="footer-col">
            <h3>Tentang</h3>
            <ul>
              <li>Tentang Kami</li>
              <li>Karir</li>
              <li>Blog</li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Bantuan</h3>
            <ul>
              <li>Pusat Bantuan</li>
              <li>Kebijakan Privasi</li>
              <li>Syarat & Ketentuan</li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Ikuti Kami</h3>
            <ul>
              <li>Instagram</li>
              <li>YouTube</li>
              <li>Facebook</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 Rahasia Dapur. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
