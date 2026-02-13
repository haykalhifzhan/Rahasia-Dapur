const mongoose = require("mongoose");

// Schema untuk menyimpan data resep
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    videoUrl: {
      type: String,
      default: "",
      trim: true,
    },

    time: {
      type: String,
      default: "30 menit",
    },

    serving: {
      type: String,
      default: "2-3 porsi",
    },

    rating: {
      type: Number,
      default: 4,
      min: 0,
      max: 5,
    },

    reviews: {
      type: Number,
      default: 100,
    },

    ingredients: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    steps: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    difficulty: {
      type: String,
      enum: ["MUDAH", "SEDANG", "SULIT"],
      default: "MUDAH",
    },
  },
  {
    timestamps: true, // otomatis menambahkan createdAt & updatedAt
  }
);

// Export model Recipe
module.exports = mongoose.model("Recipe", recipeSchema);
