import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import authIllustration from "../assets/auth-login.svg";
import logo from "../assets/logo.png";
import { GoogleLogin } from "@react-oauth/google";
import AuthSuccess from "../components/ui/AuthSuccess";

const floatAnimation = {
  animate: { y: [0, -10, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    // existing email/password backend logic
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: credentialResponse.credential,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Google login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess(true);

      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">

      {/* LEFT — FORM */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center px-6"
      >
        <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 p-8 shadow-sm">

          {/* LOGO */}
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Softwraith" className="h-8" />
          </div>

          {/* PROFILE ICON */}
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-700" />
            </div>
          </div>

          {success ? (
            <AuthSuccess message="Login successful" />
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-center mb-2">
                Welcome back
              </h1>
              <p className="text-gray-600 text-center mb-6">
                Login to continue to Softwraith
              </p>

              {error && (
                <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* EMAIL */}
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full pl-10 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-gray-900 outline-none"
                  />
                </div>

                {/* PASSWORD */}
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full pl-10 pr-10 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-gray-900 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition">
                  Login
                </button>
              </form>

              {/* REAL GOOGLE LOGIN */}
              <div className="mt-4 flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google login failed")}
                  theme="outline"
                  size="large"
                />
              </div>

              <p className="mt-6 text-sm text-center text-gray-600">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-gray-900 font-medium hover:underline"
                >
                  Register
                </Link>
              </p>
            </>
          )}
        </div>
      </motion.div>

      {/* RIGHT — ILLUSTRATION */}
      <div className="hidden md:flex items-center justify-center bg-blue-900 p-12">
        <motion.div {...floatAnimation} className="text-center">
          <img src={authIllustration} className="max-w-sm mx-auto mb-8" />
          <h2 className="text-2xl font-semibold text-white mb-3">
            Build. Learn. Grow.
          </h2>
          <p className="text-blue-100">
            Access real-world learning and powerful tools designed for growth.
          </p>
        </motion.div>
      </div>

    </div>
  );
};

export default Login;
