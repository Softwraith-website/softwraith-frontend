import { Link, NavLink, useNavigate } from "react-router-dom";
import { User, LogOut, Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Training", path: "/training" },
  { name: "Courses", path: "/courses" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimeout = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Softwraith" className="h-12 w-auto" />
          <span className="text-lg font-semibold text-gray-900 tracking-tight">
            Softwraith
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              className={({ isActive }) => {
                const showUnderline =
                  hovered === item.name || (!hovered && isActive);
                return `
                  relative text-gray-700 transition-colors duration-150
                  hover:text-gray-900
                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-full after:bg-blue-600
                  after:origin-left after:transition-transform after:duration-80
                  ${showUnderline ? "after:scale-x-100" : "after:scale-x-0"}
                `;
              }}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="hidden md:flex items-center gap-4">
              <NavLink
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
              >
                Get started
              </NavLink>
            </div>
          ) : (
            <div
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative hidden md:block"
            >
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen}
                className="flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-700" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-800">
                  {user.name}
                </span>
              </button>
              <div
                role="menu"
                aria-label="User menu"
                className={`absolute right-0 mt-3 w-40 bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200 ${
                  isDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                <button
                  role="menuitem"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate(user.role === "admin" ? "/admin" : "/dashboard");
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-55 rounded-t-lg transition-colors"
                >
                  Dashboard
                </button>
                <button
                  role="menuitem"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-55 flex items-center gap-2 rounded-b-lg transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-fadeIn">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="pt-3 mt-3 border-t border-gray-100 space-y-1">
              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Get started
                  </NavLink>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate(user.role === "admin" ? "/admin" : "/dashboard");
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
