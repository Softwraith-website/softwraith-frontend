import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({ setSidebarOpen, onLogout }) {
  const { user } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Helper to map paths to human-readable titles
  const getPageTitle = (pathname) => {
    if (pathname === "/admin") return "Dashboard Overview";
    if (pathname === "/admin/courses") return "Course Management";
    if (pathname === "/admin/courses/create") return "Create New Course";
    if (pathname.startsWith("/admin/courses/edit/")) return "Edit Course Details";
    if (pathname.includes("/lectures")) return "Curriculum & Lectures";
    if (pathname === "/admin/users") return "User Directory";
    if (pathname === "/admin/enrollments") return "Student Enrollments";
    if (pathname === "/admin/contacts") return "Inbound Contact Enquiries";
    if (pathname === "/admin/services") return "Client Service Requests";
    if (pathname === "/admin/payments") return "Transaction Logs & Revenue";
    return "Softwraith Admin";
  };

  const getPageSubtitle = (pathname) => {
    if (pathname === "/admin") return "A bird's eye view of LMS metrics and lead generation.";
    if (pathname === "/admin/courses") return "Catalog and publish your academic courses.";
    if (pathname === "/admin/courses/create") return "Add a new course curriculum with thumbnail and syllabus.";
    if (pathname.startsWith("/admin/courses/edit/")) return "Update syllabus, pricing, thumbnails, and metadata.";
    if (pathname.includes("/lectures")) return "Create, reorder, and update lectures and learning material.";
    if (pathname === "/admin/users") return "Manage role access, view student activity, and search users.";
    if (pathname === "/admin/enrollments") return "Track student progress percentages and enrollment status.";
    if (pathname === "/admin/contacts") return "Reply to website users and mark enquirers contacted.";
    if (pathname === "/admin/services") return "Review project and corporate training service orders.";
    if (pathname === "/admin/payments") return "Inspect credit cards, successful payments, and transaction history.";
    return "Softwraith Admin Panel";
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between shrink-0 relative z-30">
      {/* Page Title / Mobile Menu button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white md:hidden transition"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-base font-bold text-gray-900 leading-tight">
            {getPageTitle(location.pathname)}
          </h2>
          <p className="text-xs text-gray-400 font-medium">
            {getPageSubtitle(location.pathname)}
          </p>
        </div>
      </div>

      {/* Profile / Dropdown */}
      <div className="flex items-center gap-3 relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 hover:bg-gray-55 p-1 rounded-lg transition text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-sm shadow-slate-900/20">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-gray-900">{user?.name || "Admin User"}</p>
            <p className="text-[10px] text-gray-450 font-medium">{user?.email || "admin@softwraith.com"}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block shrink-0" />
        </button>

        {dropdownOpen && (
          <>
            {/* Click-away overlay */}
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => setDropdownOpen(false)}
            />
            {/* Dropdown panel */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50 text-sm">
              <div className="px-4 py-2 border-b border-gray-100 md:hidden">
                <p className="font-semibold text-gray-900 text-xs truncate">{user?.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
              </div>
              <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                System Role: {user?.role || "Admin"}
              </div>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  // Direct to dashboard or main portal settings
                  window.location.href = "/dashboard";
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-gray-700 transition"
              >
                <User className="w-4 h-4 text-gray-400" />
                Student Portal
              </button>
              <button
                disabled
                className="w-full text-left px-4 py-2 text-gray-400 flex items-center gap-2 cursor-not-allowed"
                title="Coming soon"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <div className="border-t border-gray-100 my-1.5" />
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onLogout();
                }}
                className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 transition"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
