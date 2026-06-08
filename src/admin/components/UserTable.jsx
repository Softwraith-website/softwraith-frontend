import { useState } from "react";
import { Shield, ShieldOff, Trash2, Search, SlidersHorizontal, Eye, UserX, UserCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function UserTable({ users, onToggleRole, onToggleStatus, onDeleteUser }) {
  const { user: currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  
  // Track which user's enrollment popover is open
  const [activePopoverId, setActivePopoverId] = useState(null);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-4">
      {/* Search and filter panel */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 focus:border-indigo-500 rounded-lg text-sm outline-none transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs bg-white outline-none focus:border-indigo-500 transition font-medium"
          >
            <option value="All">All Roles</option>
            <option value="admin">Admins</option>
            <option value="user">Students / Users</option>
          </select>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 pl-6">Profile</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Courses Enrolled</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredUsers.map((u) => {
                const isSelf = u._id === currentUser?._id;
                const enrollmentsCount = u.enrollments?.length || 0;

                return (
                  <tr key={u._id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 border flex items-center justify-center text-xs font-bold uppercase">
                          {u.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{u.name}</p>
                          {isSelf && (
                            <span className="text-[10px] bg-slate-100 border text-slate-700 px-1 py-0.2 rounded font-semibold mt-0.5 inline-block">
                              You
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-gray-500 font-medium">{u.email}</td>

                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border
                        ${u.role === "admin"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : "bg-gray-50 text-gray-600 border-gray-200"
                        }
                      `}>
                        {u.role === "admin" ? "Admin" : "Student"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border
                        ${u.status === "suspended"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-green-50 text-green-700 border-green-200"
                        }
                      `}>
                        {u.status === "suspended" ? "Suspended" : "Active"}
                      </span>
                    </td>

                    <td className="p-4 text-gray-400 font-medium">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }) : "N/A"}
                    </td>

                    {/* Courses enrolled popover trigger */}
                    <td className="p-4 relative">
                      {enrollmentsCount === 0 ? (
                        <span className="text-gray-400 text-xs font-medium">No enrollments</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActivePopoverId(activePopoverId === u._id ? null : u._id)}
                            className="inline-flex items-center gap-1.5 hover:bg-slate-100 px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-650 bg-indigo-50 border border-indigo-100 transition shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{enrollmentsCount} {enrollmentsCount === 1 ? "course" : "courses"}</span>
                          </button>

                          {/* Enrollment Popover Card */}
                          {activePopoverId === u._id && (
                            <>
                              <div
                                className="fixed inset-0 z-20"
                                onClick={() => setActivePopoverId(null)}
                              />
                              <div className="absolute left-4 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-30 space-y-3 animate-in fade-in slide-in-from-top-1 duration-150">
                                <div className="border-b border-gray-100 pb-2 flex items-center justify-between">
                                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Courses & Progress</h4>
                                  <button onClick={() => setActivePopoverId(null)} className="text-gray-450 hover:text-gray-900 text-xs font-bold">Close</button>
                                </div>
                                <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin">
                                  {u.enrollments.map((e) => (
                                    <div key={e.courseId} className="text-xs border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                                      <p className="font-semibold text-gray-900 line-clamp-1">{e.title}</p>
                                      <div className="flex items-center gap-2 mt-1.5">
                                        <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                          <div
                                            className="bg-indigo-650 h-full rounded-full transition-all duration-300"
                                            style={{ width: `${e.progress}%` }}
                                          />
                                        </div>
                                        <span className="font-bold text-gray-600 shrink-0 text-[10px]">{e.progress}%</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        {/* Toggle Role */}
                        <button
                          disabled={isSelf}
                          onClick={() => onToggleRole(u)}
                          title={isSelf ? "You cannot revoke your own admin rights." : u.role === "admin" ? "Demote to Student" : "Promote to Admin"}
                          className="p-1.5 rounded-lg border border-gray-200 hover:border-purple-500 hover:text-purple-650 bg-white text-gray-400 disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition"
                        >
                          {u.role === "admin" ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                        </button>
                        
                        {/* Toggle Status */}
                        <button
                          disabled={isSelf}
                          onClick={() => onToggleStatus(u)}
                          title={isSelf ? "You cannot suspend your own account." : u.status === "suspended" ? "Activate User" : "Suspend User"}
                          className={`p-1.5 rounded-lg border bg-white transition
                            ${u.status === "suspended"
                              ? "border-green-200 text-green-600 hover:border-green-500 hover:text-green-700"
                              : "border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-650"
                            }
                          `}
                        >
                          {u.status === "suspended" ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                        </button>

                        {/* Delete User */}
                        <button
                          disabled={isSelf}
                          onClick={() => onDeleteUser(u)}
                          title={isSelf ? "You cannot delete your own account." : "Delete User"}
                          className="p-1.5 rounded-lg border border-gray-200 hover:border-red-500 hover:text-red-650 bg-white text-gray-400 disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    No users match the search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
