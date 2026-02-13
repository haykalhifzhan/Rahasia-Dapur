import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isHome = location.pathname === "/";
  const isRegister = location.pathname === "/register";
  const isLogin = location.pathname === "/login";

  // Handle logout user
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // SPA navigation tanpa reload
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <img
            src="http://localhost:5000/images/logo.png"
            alt="Rahasia Dapur"
            className="navbar-logo"
          />
          <span className="navbar-title">Rahasia Dapur</span>
        </Link>

        <div className="navbar-actions">

          {/* Jika sudah login */}
          {user && (
            <button
              onClick={handleLogout}
              className="nav-btn nav-btn-danger"
            >
              Logout
            </button>
          )}

          {/* Jika belum login dan di halaman Home */}
          {!user && isHome && (
            <>
              <Link to="/login" className="nav-btn nav-btn-outline">
                Login
              </Link>
              <Link to="/register" className="nav-btn nav-btn-primary">
                Register
              </Link>
            </>
          )}

          {/* Jika belum login dan di halaman Register */}
          {!user && isRegister && (
            <Link to="/login" className="nav-btn nav-btn-primary">
              Login
            </Link>
          )}

          {/* Jika belum login dan di halaman Login */}
          {!user && isLogin && (
            <Link to="/register" className="nav-btn nav-btn-primary">
              Register
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}
