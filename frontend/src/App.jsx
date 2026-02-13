// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DetailResep from "./pages/DetailResep";

export default function App() {
  return (
    <>
      {/* Navbar selalu tampil */}
      <Navbar />

      <main>
        <Routes>

          {/* Home - Public */}
          <Route path="/" element={<Home />} />

          {/* Detail Resep - Protected */}
          <Route
            path="/resep/:id"
            element={
              <ProtectedRoute>
                <DetailResep />
              </ProtectedRoute>
            }
          />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </main>
    </>
  );
}
