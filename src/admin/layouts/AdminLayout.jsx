import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Persist sidebar collapse state across reloads
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("admin_sidebar_collapsed");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("admin_sidebar_collapsed", isCollapsed);
  }, [isCollapsed]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 relative overflow-hidden font-sans antialiased text-gray-800">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        onLogout={handleLogout}
      />

      {/* Main workspace */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar navigation */}
        <Topbar
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />

        {/* Dynamic page contents */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
