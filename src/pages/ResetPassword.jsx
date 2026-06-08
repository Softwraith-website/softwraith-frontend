import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState } from "react";

import authIllustration from "../assets/auth-login.svg";
import logo from "../assets/logo.png";
import api from "../utils/api";

const floatAnimation = {
  animate: { y: [0, -10, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const { data } = await api.post(`/auth/reset-password/${token}`, { password });
      setMessage(data.message || "Your password has been reset successfully.");
      
      // Auto redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
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
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Softwraith" className="h-8" />
          </div>

          <h1 className="text-2xl font-semibold text-center mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 text-center mb-6 text-sm">
            Enter your new password below.
          </p>

          {error && (
            <p className="mb-4 text-sm text-red-600 bg-red-50 p-2.5 rounded">
              {error}
            </p>
          )}

          {message && (
            <p className="mb-4 text-sm text-green-600 bg-green-50 p-2.5 rounded">
              {message} Redirecting to login...
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-gray-900 outline-none"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-60 font-medium"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>

      {/* RIGHT — ILLUSTRATION */}
      <div className="hidden md:flex items-center justify-center bg-blue-900 p-12">
        <motion.div {...floatAnimation} className="text-center">
          <img src={authIllustration} className="max-w-sm mx-auto mb-8" />
          <h2 className="text-2xl font-semibold text-white mb-3">
            Secure Your Account
          </h2>
          <p className="text-blue-100">
            Choose a strong password containing numbers, symbols, and letters.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
