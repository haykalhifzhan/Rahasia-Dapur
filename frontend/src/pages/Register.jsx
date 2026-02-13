import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import "../styles/global.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle submit register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.error || "Gagal membuat akun."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      {/* Hero */}
      <div className="register-hero">
        <h1>Buat Akun & Mulai Belajar Memasak</h1>
        <p>Resep mudah, langkah jelas, siap langsung praktik</p>
      </div>

      {/* Card */}
      <div className="register-card">

        <div className="card-header">
          <h2>Daftar Akun</h2>
          <p>Mulai petualangan kulinermu sekarang.</p>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />

          {/* Password */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
            <button
              type="button"
              className="password-icon-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
            />
            <button
              type="button"
              className="password-icon-btn"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? "🙈" : "👁"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {loading ? "Memproses..." : "Buat Akun"}
          </button>

        </form>

        {/* Divider */}
        <div className="auth-divider">
          <div className="auth-divider-line"></div>
          <span className="auth-divider-text">ATAU</span>
          <div className="auth-divider-line"></div>
        </div>

        {/* Google Button (UI only) */}
        <button type="button" className="google-button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
            alt="Google"
          />
          Lanjutkan dengan Google
        </button>

        <p className="login-text">
          Sudah punya akun?{" "}
          <Link to="/login" className="login-link">
            Masuk
          </Link>
        </p>

      </div>

      <footer className="register-footer">
        © 2026 Rahasia Dapur. All rights reserved.
      </footer>

    </div>
  );
}
