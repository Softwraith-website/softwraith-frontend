import { useEffect, useState } from "react";
import { AlertCircle, Users } from "lucide-react";
import adminService from "../services/adminService";
import UserTable from "../components/UserTable";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await adminService.getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load user directories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!msg) return undefined;
    const timer = setTimeout(() => setMsg(""), 3500);
    return () => clearTimeout(timer);
  }, [msg]);

  const handleToggleRole = async (targetUser) => {
    try {
      const updatedUser = await adminService.changeUserRole(targetUser._id);
      setUsers((prev) =>
        prev.map((u) => (u._id === targetUser._id ? { ...u, role: updatedUser.role } : u))
      );
      setMsg(`Role for ${targetUser.name} changed to ${updatedUser.role} successfully.`);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to change user access privileges.");
    }
  };

  const handleDeleteUser = async (targetUser) => {
    if (!confirm(`Are you sure you want to delete student "${targetUser.name}"? This removes all active course enrollments and service tickets associated with this email.`)) return;
    try {
      await adminService.deleteUser(targetUser._id);
      setUsers((prev) => prev.filter((u) => u._id !== targetUser._id));
      setMsg("User profile deleted successfully.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to remove user account.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <ErrorState
          title="Error Loading Users"
          message={error}
          onRetry={fetchUsers}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Users</h1>
        <p className="text-sm text-gray-500 mt-1">Manage system administrators, search student registers, and edit roles.</p>
      </div>

      {msg && (
        <div className="flex items-center gap-2 px-4 py-3 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm rounded-xl transition max-w-4xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {users.length === 0 ? (
        <EmptyState
          title="No users found"
          message="No user profiles exist in the system database currently."
          icon={Users}
        />
      ) : (
        <UserTable
          users={users}
          onToggleRole={handleToggleRole}
          onDeleteUser={handleDeleteUser}
        />
      )}
    </div>
  );
}
