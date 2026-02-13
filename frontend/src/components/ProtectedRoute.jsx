// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../services/authService";

export default function ProtectedRoute({ children }) {
  const user = getUser();
  const location = useLocation();

  // Jika belum login, arahkan ke halaman login
  if (!user) {
    // Simpan halaman tujuan agar bisa redirect setelah login
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, tampilkan halaman
  return children;
}
