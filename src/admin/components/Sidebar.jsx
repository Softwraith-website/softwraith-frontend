import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  Mail,
  Briefcase,
  CreditCard,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const links = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/courses", icon: BookOpen, label: "Courses" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/enrollments", icon: GraduationCap, label: "Enrollments" },
  { to: "/admin/contacts", icon: Mail, label: "Contacts" },
  { to: "/admin/services", icon: Briefcase, label: "Services" },
  { to: "/admin/payments", icon: CreditCard, label: "Payments" },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  isCollapsed,
  setIsCollapsed,
  onLogout,
}) {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar shell */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col
          transform md:transform-none transition-all duration-300 ease-in-out shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Brand Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between shrink-0 h-16">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shrink-0">
              SW
            </div>
            {!isCollapsed && (
              <div className="transition-opacity duration-200">
                <h1 className="text-sm font-bold text-white tracking-wide uppercase">Softwraith</h1>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wider">LMS ADMIN</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {/* Collapse button for desktop */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white hidden md:block"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded bg-slate-850 text-slate-400 hover:text-white md:hidden"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
          {links.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative
                 ${isActive
                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                   : "hover:bg-slate-800 hover:text-white text-slate-400"
                 }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="truncate">{label}</span>}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-950 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50 border border-slate-800">
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="px-3 py-4 border-t border-slate-800 shrink-0">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                       text-slate-400 hover:bg-rose-950/40 hover:text-rose-400 transition-colors w-full group relative"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="truncate">Logout</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-slate-950 text-rose-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-50 border border-slate-800">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
