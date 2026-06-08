import { useEffect, useState } from "react";
import { GraduationCap, Award, Wrench, ShieldCheck, KeyRound, Loader2, Key } from "lucide-react";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";

export default function Overview() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ trainings: 0, services: 0, certificates: 0 });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    async function loadStats() {
      try {
        const [enrollRes, serviceRes, certRes] = await Promise.allSettled([
          api.get("/enroll/mycourses"),
          api.get("/services/my"),
          api.get("/certificates/my"),
        ]);

        setStats({
          trainings: enrollRes.status === "fulfilled" && Array.isArray(enrollRes.value.data)
            ? enrollRes.value.data.length : 0,
          services: serviceRes.status === "fulfilled" && Array.isArray(serviceRes.value.data)
            ? serviceRes.value.data.length : 0,
          certificates: certRes.status === "fulfilled" && Array.isArray(certRes.value.data)
            ? certRes.value.data.length : 0,
        });
      } catch (err) {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      setSavingPassword(true);
      setPasswordMessage("");
      setPasswordSuccess(false);
      await api.put("/auth/password", passwordForm);
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setPasswordMessage("Password changed successfully");
      setPasswordSuccess(true);
    } catch (err) {
      setPasswordMessage(err.response?.data?.message || "Failed to change password");
      setPasswordSuccess(false);
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back! Here is a summary of your active training and requests.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Trainings Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex items-center gap-5">
          <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">My Courses</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">{stats.trainings}</h2>
          </div>
        </div>

        {/* Certificates Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex items-center gap-5">
          <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Certificates</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">{stats.certificates}</h2>
          </div>
        </div>

        {/* Services Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex items-center gap-5">
          <div className="h-12 w-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Services</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">{stats.services}</h2>
          </div>
        </div>

        {/* Account Status Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex items-center gap-5">
          <div className="h-12 w-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</p>
            <h2 className="text-lg font-bold text-green-700 mt-1">Active</h2>
          </div>
        </div>
      </div>

      {/* PASSWORD SECTION */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 max-w-xl shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <KeyRound className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-bold text-gray-900">Account Security</h2>
        </div>

        {passwordMessage && (
          <div
            className={`p-3.5 border rounded-xl text-sm font-medium animate-fadeIn ${
              passwordSuccess
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            {passwordMessage}
          </div>
        )}

        <form onSubmit={changePassword} className="space-y-4">
          <div className="relative">
            <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              placeholder="Current password"
              className="w-full pl-9 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 outline-none transition"
              required
            />
          </div>

          <div className="relative">
            <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              placeholder="New password"
              minLength={8}
              className="w-full pl-9 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-gray-900 outline-none transition"
              required
            />
          </div>

          <button
            disabled={savingPassword}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition disabled:opacity-60"
          >
            {savingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
            {savingPassword ? "Updating..." : "Change Password"}
          </button>
        </form>
      </section>
    </div>
  );
}
