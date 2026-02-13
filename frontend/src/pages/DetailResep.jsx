// src/pages/DetailResep.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById, getRecipes } from "../services/recipeService";
import "../styles/global.css";

const API_BASE_URL = "http://localhost:5000";

export default function DetailResep() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil detail resep & resep terkait
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getRecipeById(id);
        setRecipe(res.data);

        const all = await getRecipes();
        const filtered = (all.data || [])
          .filter((r) => r._id !== id)
          .slice(0, 3);

        setRelatedRecipes(filtered);
      } catch (err) {
        console.error("Error:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-text">Memuat resep...</div>
      </div>
    );
  }

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
    <div className="detail-container">

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Kembali
      </button>

      <h1 className="detail-title">{recipe.title}</h1>

      <div className="detail-rating">
        <span className="stars">{renderStars()}</span>
        <span className="rating-text">
          {rating.toFixed(1)} / 5.0 ({totalReviews} ulasan)
        </span>
      </div>

      <div className="detail-image-wrapper">
        <img
          src={`${API_BASE_URL}/images/${recipe.title
            .toLowerCase()
            .replace(/\s+/g, "_")}.png`}
          alt={recipe.title}
        />
      </div>

      <p className="detail-description">{recipe.description}</p>

      <div className="detail-info">
        <span>⏱ {recipe.time || "30 menit"}</span>
        <span>🍽 {recipe.serving || "2-3 porsi"}</span>
      </div>

      {/* Video Button */}
      {recipe.videoUrl && (
        <div className="detail-video-btn">
          <a
            href={recipe.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="video-button"
          >
            ▶ Tonton Video Tutorial
          </a>
        </div>
      )}

      {/* Bahan & Cara */}
      <div className="detail-grid">

        <div className="detail-card">
          <h2>📋 Bahan-bahan</h2>
          <ul>
            {recipe.ingredients?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="detail-card">
          <h2>👩‍🍳 Cara Memasak</h2>
          <ol>
            {recipe.steps?.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

      </div>

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <div className="related-section">
          <h2>Resep Terkait</h2>

          <div className="related-grid">
            {relatedRecipes.map((item) => (
              <div
                key={item._id}
                className="related-card"
                onClick={() => navigate(`/resep/${item._id}`)}
              >
                <div
                  className="related-image"
                  style={{
                    backgroundImage: `url('${API_BASE_URL}/images/${item.title
                      .toLowerCase()
                      .replace(/\s+/g, "_")}.png')`,
                  }}
                />
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="detail-footer">
        © 2026 Rahasia Dapur. All rights reserved.
      </div>

    </div>
  );
}
