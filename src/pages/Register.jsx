import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import AuthSuccess from "../components/ui/AuthSuccess";
import authIllustration from "../assets/auth-register.svg";
import logo from "../assets/logo.png";

const floatAnimation = {
  animate: { y: [0, -10, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    setError("");
    // existing email/password register backend logic
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
        throw new Error(data.message || "Google signup failed");
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
            <AuthSuccess message="Account created successfully" />
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-center mb-2">
                Create your account
              </h1>
              <p className="text-gray-600 text-center mb-6">
                Start learning with Softwraith
              </p>

              {error && (
                <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />

                <input
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10"
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
                  Register
                </button>
              </form>

              {/* REAL GOOGLE SIGNUP */}
              <div className="mt-4 flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google signup failed")}
                  theme="outline"
                  size="large"
                />
              </div>

              <p className="mt-6 text-sm text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium hover:underline"
                >
                  Login
                </Link>
              </p>
            </>
          )}
        </div>
      </motion.div>

      {/* RIGHT — ILLUSTRATION */}
      <div className="hidden md:flex items-center justify-center bg-blue-900 p-12">
        <motion.div {...floatAnimation}>
          <img src={authIllustration} className="max-w-sm mb-8" />
          <h2 className="text-2xl font-semibold text-white mb-3">
            Learn with purpose
          </h2>
          <p className="text-blue-100">
            Build real skills with hands-on training and real projects.
          </p>
        </motion.div>
      </div>

    </div>
  );
};

export default Register;
