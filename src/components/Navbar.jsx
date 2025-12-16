import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar({ toggleTheme, theme }) {
  const base =
    "relative text-sm font-medium transition-colors duration-200";

  const inactive =
    "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white";

  const active =
    "text-black dark:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-black dark:after:bg-white after:rounded-full";

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Softwraith Logo" className="h-8 w-auto" />
          <span className="font-semibold tracking-tight text-lg text-black dark:text-white">
            Softwraith
          </span>
        </NavLink>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Training", path: "/training" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-xs px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {/* Login CTA */}
          <NavLink
            to="/login"
            className="px-5 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:opacity-90 transition"
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
