import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar({ toggleTheme, theme }) {
  const [open, setOpen] = useState(false);

  const baseLink =
    "relative text-sm font-medium transition-colors";

  const inactive =
    "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white";

  const active =
    "text-black dark:text-white after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600";

  const linkClass = ({ isActive }) =>
    `${baseLink} ${isActive ? active : inactive}`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Softwraith" className="h-8 w-auto" />
          <span className="text-lg font-semibold text-black dark:text-white">
            Softwraith
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/services" className={linkClass}>Services</NavLink>
          <NavLink to="/training" className={linkClass}>Training</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="border border-gray-300 dark:border-gray-700 px-3 py-1 rounded text-xs"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {/* Login */}
          <NavLink
            to="/login"
            className="bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 rounded-full text-xs font-semibold"
          >
            Login
          </NavLink>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-black dark:text-white"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-6 py-4 space-y-4">
          <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>Home</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className={linkClass}>About</NavLink>
          <NavLink to="/services" onClick={() => setOpen(false)} className={linkClass}>Services</NavLink>
          <NavLink to="/training" onClick={() => setOpen(false)} className={linkClass}>Training</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)} className={linkClass}>Contact</NavLink>
        </div>
      )}
    </nav>
  );
}
