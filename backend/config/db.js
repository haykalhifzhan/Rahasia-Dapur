const mongoose = require("mongoose");

// Fungsi untuk menghubungkan aplikasi ke MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Terhubung ke MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1); // hentikan server jika gagal koneksi
  }
};

module.exports = connectDB;
