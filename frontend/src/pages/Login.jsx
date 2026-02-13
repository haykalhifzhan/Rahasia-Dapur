import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/global.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const res = await login(email, password);

      // Simpan user ke localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Email atau password salah."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      {/* Hero */}
      <div className="register-hero">
        <h1>Masuk & Lanjutkan Belajar Memasak</h1>
        <p>Masuk untuk melanjutkan resep favoritmu</p>
      </div>

      {/* Card */}
      <div className="register-card">

        <div className="card-header">
          <h2>Login Akun</h2>
          <p>Silakan masuk ke akunmu</p>
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

          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>

        </form>

        <p className="login-text">
          Belum punya akun?{" "}
          <Link to="/register" className="login-link">
            Daftar
          </Link>
        </p>

      </div>

      <footer className="register-footer">
        © 2026 Rahasia Dapur. All rights reserved.
      </footer>

    </div>
  );
}
