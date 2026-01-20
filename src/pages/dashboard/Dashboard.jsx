import { NavLink, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { decodeToken } from "../../utils/jwt";
import DashboardTopbar from "../../components/DashboardTopbar";

// User pages
import Overview from "./Overview";
import Trainings from "./Trainings";
import Services from "./Services";

// Admin pages
import AdminDashboard from "./admin/AdminDashboard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const decoded = decodeToken(token);
    if (!decoded) {
      localStorage.removeItem("token");
      return navigate("/login");
    }

    setUser({
      name: decoded.name || "User",
      role: decoded.role || "user",
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r px-6 py-8">
        <h2 className="text-xl font-bold mb-8">Softwraith</h2>

        <nav className="space-y-2 text-sm">
          <NavLink to="/dashboard" end className="sidebar-link">
            Overview
          </NavLink>

          <NavLink to="/dashboard/trainings" className="sidebar-link">
            My Trainings
          </NavLink>

          <NavLink to="/dashboard/services" className="sidebar-link">
            My Services
          </NavLink>

          {user.role === "admin" && (
            <NavLink to="/dashboard/admin" className="sidebar-link text-blue-600">
              Admin Panel
            </NavLink>
          )}
        </nav>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 p-8">
        <DashboardTopbar user={user} onLogout={handleLogout} />

        <Routes>
          <Route index element={<Overview />} />
          <Route path="trainings" element={<Trainings />} />
          <Route path="services" element={<Services />} />

          {user.role === "admin" && (
            <Route path="admin/*" element={<AdminDashboard />} />
          )}

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}
