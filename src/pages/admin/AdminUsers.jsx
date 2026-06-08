import { useEffect, useState } from "react";
import { Shield, ShieldOff, Trash2, Users } from "lucide-react";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/admin/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRole = async (targetUser) => {
    try {
      const res = await api.put(`/admin/users/${targetUser._id}/role`);
      setUsers((prev) =>
        prev.map((item) => (item._id === targetUser._id ? { ...item, role: res.data.role } : item))
      );
      setMsg(`Role changed to ${res.data.role}`);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to change role");
    }
  };

  const deleteUser = async (targetUser) => {
    if (!confirm(`Delete ${targetUser.name}? This also removes their enrollments and service requests.`)) return;
    try {
      await api.delete(`/admin/users/${targetUser._id}`);
      setUsers((prev) => prev.filter((item) => item._id !== targetUser._id));
      setMsg("User deleted");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to delete user");
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
      <div className="py-12">
        <ErrorState title="Error loading users" message={error} onRetry={load} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Users</h1>
      <p className="text-sm text-gray-500 mb-6">Manage user roles and remove inactive accounts.</p>

      {msg && <div className="mb-4 px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg">{msg}</div>}

      {users.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-5 py-3 font-semibold text-gray-500">Name</th>
                  <th className="px-5 py-3 font-semibold text-gray-500">Email</th>
                  <th className="px-5 py-3 font-semibold text-gray-500">Role</th>
                  <th className="px-5 py-3 font-semibold text-gray-500">Joined</th>
                  <th className="px-5 py-3 font-semibold text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((targetUser) => {
                  const isSelf = targetUser._id === currentUser?._id;

                  return (
                    <tr key={targetUser._id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-3 font-semibold text-gray-900">{targetUser.name}</td>
                      <td className="px-5 py-3 text-gray-500 text-sm">{targetUser.email}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${targetUser.role === "admin" ? "bg-purple-50 text-purple-700" : "bg-gray-100 text-gray-600"}`}>
                          {targetUser.role}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-550 text-sm">
                        {targetUser.createdAt ? new Date(targetUser.createdAt).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="inline-flex items-center gap-3">
                          <button
                            disabled={isSelf}
                            onClick={() => toggleRole(targetUser)}
                            title={isSelf ? "You cannot change your own role" : targetUser.role === "admin" ? "Remove admin" : "Make admin"}
                            className="text-gray-400 hover:text-purple-650 disabled:opacity-30 disabled:hover:text-gray-400 transition"
                          >
                            {targetUser.role === "admin" ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                          </button>
                          <button
                            disabled={isSelf}
                            onClick={() => deleteUser(targetUser)}
                            title={isSelf ? "You cannot delete your own account" : "Delete user"}
                            className="text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-gray-400 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {users.length === 0 && (
        <EmptyState
          title="No users found"
          message="No user accounts exist in the database."
          icon={Users}
        />
      )}
    </div>
  );
}
