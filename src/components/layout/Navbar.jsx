import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, LogOut } from "lucide-react";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Softwraith" className="h-8" />
          <span className="text-lg font-semibold text-gray-900 tracking-tight">
    Softwraith
  </span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <NavLink to="/" className="hover:text-gray-900">Home</NavLink>
          <NavLink to="/services" className="hover:text-gray-900">Services</NavLink>
          <NavLink to="/about" className="hover:text-gray-900">About</NavLink>
          <NavLink to="/contact" className="hover:text-gray-900">Contact</NavLink>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {!user ? (
            <>
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
            </>
          ) : (
            <div className="relative group">

              {/* USER AVATAR */}
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-700" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-800">
                  {user.name}
                </span>
              </div>

              {/* DROPDOWN */}
              <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;
