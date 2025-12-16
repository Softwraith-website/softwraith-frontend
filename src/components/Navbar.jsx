import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar({ toggleTheme, theme }) {
  const base =
    "text-sm font-medium transition relative";

  const normal =
    "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white";

  const active =
    "text-black dark:text-white after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600";

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Softwraith" className="h-8 w-auto" />
          <span className="font-semibold text-lg">Softwraith</span>
        </NavLink>

        {/* Links */}
        <div className="flex items-center gap-6">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/services", label: "Services" },
            { path: "/training", label: "Training" },
            { path: "/contact", label: "Contact" },
          ].map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${base} ${isActive ? active : normal}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 text-xs rounded border border-gray-300 dark:border-gray-700"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {/* CTA */}
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
