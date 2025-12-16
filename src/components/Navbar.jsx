import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar({ toggleTheme, theme }) {
  const linkClass =
    "relative text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition";

  const activeClass =
    "text-black dark:text-white after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600";

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Softwraith" className="h-8 w-auto" />
          <span className="font-semibold text-lg text-black dark:text-white">
            Softwraith
          </span>
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            About
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/training"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Training
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Contact
          </NavLink>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded text-xs text-black dark:text-white"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {/* Login */}
          <NavLink
            to="/login"
            className="ml-2 bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 rounded-full text-xs font-semibold"
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
