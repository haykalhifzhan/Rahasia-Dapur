// routes/auth.routes.js
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi dasar
    if (!email || !password || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Email & password (min 6 karakter) wajib." });
    }

    // Cek email sudah ada
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email sudah terdaftar." });
    }

    // Hash password sebelum simpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Simpan user
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registrasi berhasil!",
      userId: newUser._id,
      email: newUser.email,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Server error." });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email & password wajib." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Email/password salah." });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Email/password salah." });
    }

    res.json({
      userId: user._id,
      email: user.email,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
