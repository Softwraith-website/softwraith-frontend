import { useState } from "react";
import { NavLink, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DashboardTopbar from "../../components/DashboardTopbar";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/ui/Spinner";

// User pages
import Overview from "./Overview";
import Trainings from "./Trainings";
import Services from "./Services";
import CourseDetail from "./CourseDetail";
import Certificates from "./Certificates";
import PaymentHistory from "./PaymentHistory";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r px-6 py-8 flex flex-col
          transform md:transform-none transition-transform duration-250 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between mb-8 shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Softwraith</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-lg hover:bg-gray-100 md:hidden border"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <nav className="space-y-2 text-sm flex-1">
          <NavLink
            to="/dashboard"
            end
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            Overview
          </NavLink>

          <NavLink
            to="/dashboard/trainings"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            My Trainings
          </NavLink>

          <NavLink
            to="/dashboard/services"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            My Services
          </NavLink>

          <NavLink
            to="/dashboard/certificates"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            My Certificates
          </NavLink>

          <NavLink
            to="/dashboard/payments"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            Payments
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className="sidebar-link"
            onClick={() => setSidebarOpen(false)}
          >
            My Profile
          </NavLink>

          {user.role === "admin" && (
            <NavLink
              to="/admin"
              className="sidebar-link text-blue-600 font-semibold"
              onClick={() => setSidebarOpen(false)}
            >
              Admin Panel
            </NavLink>
          )}
        </nav>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 p-4 md:p-8 min-w-0">
        {/* Mobile Header Bar */}
        <div className="flex items-center gap-4 mb-6 md:hidden bg-white border border-gray-200 rounded-xl p-3 shadow-sm shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <span className="font-semibold text-gray-900 text-sm">Dashboard Menu</span>
        </div>

        <DashboardTopbar user={user} onLogout={handleLogout} />

        <Routes>
          <Route index element={<Overview />} />
          <Route path="trainings" element={<Trainings />} />
          <Route path="courses/:courseId" element={<CourseDetail />} />
          <Route path="services" element={<Services />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="payments" element={<PaymentHistory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<ProfileEdit />} />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}
