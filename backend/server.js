require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const recipeRoutes = require("./routes/recipe.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect database
connectDB();

// Global middleware
app.use(cors());
app.use(express.json());

// Serve static images
app.use("/images", express.static(path.join(__dirname, "images")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: "Route tidak ditemukan." });
});

// Start server
app.listen(PORT, () => {
  console.log(`🟢 Backend berjalan di http://localhost:${PORT}`);
});
