import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png"; // make sure this file exists

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Handle scroll background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white border-b border-gray-200" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto h-18 md:h-20 px-6 flex items-center justify-between">

        
        {/* LOGO */}
        <Link
  to="/"
  className="flex items-center gap-3"
  onClick={() => setMobileOpen(false)}
>
  <img
    src={logo}
    alt="Softwraith logo"
    className="h-10 md:h-11 w-auto"
  />

          <span className="text-lg font-semibold text-gray-900">
            Softwraith
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {["services", "training", "about", "contact"].map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          ))}
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
          >
            Login
          </Link>

          <button
            onClick={() => navigate("/contact")}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Work with us
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-300 p-2 text-gray-700"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <span className="text-xl">&times;</span>
          ) : (
            <span className="text-xl">&#9776;</span>
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-6 space-y-5">
            {["services", "training", "about", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(`/${item}`)}
                className="block w-full text-left text-base font-medium text-gray-700 hover:text-gray-900"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}

            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button
                onClick={() => handleNavigate("/login")}
                className="block w-full text-left text-base font-medium text-gray-700 hover:text-gray-900"
              >
                Login
              </button>

              <button
                onClick={() => handleNavigate("/contact")}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
              >
                Work with us
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
