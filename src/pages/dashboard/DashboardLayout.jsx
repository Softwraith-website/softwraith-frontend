import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { decodeToken } from "../../utils/jwt";
import DashboardTopbar from "../../components/DashboardTopbar";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const decoded = decodeToken(token);
    if (!decoded) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    setUser({
      name: decoded.name || "User",
      email: decoded.email || "",
      role: decoded.role || "user",
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <div className="p-10">Loading dashboard...</div>;

  return (
    <div className="min-h-screen flex bg-[#f9fafb]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8">
        <h2 className="text-xl font-semibold mb-8">Softwraith</h2>

        <nav className="space-y-2">
          <NavLink to="/dashboard" end className="block px-3 py-2 rounded hover:bg-gray-100">
            Overview
          </NavLink>

          <NavLink to="/dashboard/trainings" className="block px-3 py-2 rounded hover:bg-gray-100">
            My Trainings
          </NavLink>

          <NavLink to="/dashboard/services" className="block px-3 py-2 rounded hover:bg-gray-100">
            My Services
          </NavLink>

          {user.role === "admin" && (
            <NavLink
              to="/dashboard/admin"
              className="block px-3 py-2 rounded text-blue-600 hover:bg-blue-50"
            >
              Admin Panel
            </NavLink>
          )}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 px-10 py-8">
        <DashboardTopbar user={user} onLogout={handleLogout} />
        <Outlet />
      </main>
    </div>
  );
}
