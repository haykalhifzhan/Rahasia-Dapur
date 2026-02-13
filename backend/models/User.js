const mongoose = require("mongoose");

// Schema untuk menyimpan data user
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, // otomatis menambahkan createdAt & updatedAt
  }
);

// Export model User
module.exports = mongoose.model("User", userSchema);
