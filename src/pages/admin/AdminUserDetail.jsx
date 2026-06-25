import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Shield, ShieldOff, UserX, UserCheck, Trash2,
  Mail, Calendar, BookOpen, User,
} from "lucide-react";
import adminService from "../../admin/services/adminService";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();

  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null); // { type, label, message }

  useEffect(() => {
    adminService
      .getUsers()
      .then((users) => {
        const found = users.find((u) => u._id === id);
        if (!found) navigate("/admin/users");
        else setUserDetail(found);
      })
      .catch(() => navigate("/admin/users"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const isSelf = userDetail?._id === currentUser?._id;

  const handleToggleRole = async () => {
    const updated = await adminService.changeUserRole(userDetail._id);
    setUserDetail((u) => ({ ...u, role: updated.role }));
    showToast(`Role changed to ${updated.role}`, "success");
  };

  const handleToggleStatus = async () => {
    const updated = await adminService.toggleUserStatus(userDetail._id);
    setUserDetail((u) => ({ ...u, status: updated.status }));
    showToast(
      updated.status === "suspended" ? "User suspended" : "User reactivated",
      "success"
    );
  };

  const handleDelete = async () => {
    await adminService.deleteUser(userDetail._id);
    showToast("User deleted", "success");
    navigate("/admin/users");
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (!userDetail) return null;

  const roleVariant = { admin: "primary", superadmin: "danger", user: "default" };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/users")}
          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
        >
          <ArrowLeft className="w-4 h-4 text-gray-500" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">User Detail</h1>
      </div>

      {/* Profile card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 px-6 py-8 flex items-center gap-5">
          <Avatar src={userDetail.avatar} name={userDetail.name} size="xl" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{userDetail.name}</h2>
              {isSelf && (
                <span className="text-xs bg-slate-100 border text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                  You
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{userDetail.email}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant={roleVariant[userDetail.role] || "default"}>
                {userDetail.role}
              </Badge>
              <Badge variant={userDetail.status === "suspended" ? "danger" : "success"}>
                {userDetail.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4 divide-y divide-gray-100">
          <DetailRow icon={User} label="Full Name" value={userDetail.name} />
          <DetailRow icon={Mail} label="Email" value={userDetail.email} />
          <DetailRow icon={Shield} label="Role" value={userDetail.role} />
          <DetailRow
            icon={Calendar}
            label="Joined"
            value={
              userDetail.createdAt
                ? new Date(userDetail.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })
                : "—"
            }
          />
          <DetailRow
            icon={BookOpen}
            label="Enrollments"
            value={`${userDetail.enrollments?.length ?? 0} course(s)`}
          />
        </div>
      </div>

      {/* Enrolled courses */}
      {userDetail.enrollments?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Enrolled Courses</h3>
          <div className="space-y-3">
            {userDetail.enrollments.map((e) => (
              <div key={e.courseId} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{e.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full"
                        style={{ width: `${e.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-500 shrink-0">{e.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {!isSelf && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() =>
                setConfirm({
                  type: "role",
                  label: userDetail.role === "admin" ? "Demote to Student" : "Promote to Admin",
                  message: `Change ${userDetail.name}'s role to ${userDetail.role === "admin" ? "user" : "admin"}?`,
                })
              }
            >
              {userDetail.role === "admin" ? (
                <><ShieldOff className="w-4 h-4" /> Demote to Student</>
              ) : (
                <><Shield className="w-4 h-4" /> Promote to Admin</>
              )}
            </Button>

            <Button
              variant={userDetail.status === "suspended" ? "secondary" : "secondary"}
              onClick={() =>
                setConfirm({
                  type: "status",
                  label: userDetail.status === "suspended" ? "Reactivate User" : "Suspend User",
                  message:
                    userDetail.status === "suspended"
                      ? `Reactivate ${userDetail.name}'s account?`
                      : `Suspend ${userDetail.name}'s account? They won't be able to log in.`,
                })
              }
            >
              {userDetail.status === "suspended" ? (
                <><UserCheck className="w-4 h-4" /> Reactivate</>
              ) : (
                <><UserX className="w-4 h-4" /> Suspend</>
              )}
            </Button>

            <Button
              variant="danger"
              onClick={() =>
                setConfirm({
                  type: "delete",
                  label: "Delete User",
                  message: `Permanently delete ${userDetail.name}? This also removes all their enrollments.`,
                })
              }
            >
              <Trash2 className="w-4 h-4" /> Delete User
            </Button>
          </div>
        </div>
      )}

      {confirm && (
        <ConfirmDialog
          isOpen
          onClose={() => setConfirm(null)}
          onConfirm={async () => {
            if (confirm.type === "role") await handleToggleRole();
            if (confirm.type === "status") await handleToggleStatus();
            if (confirm.type === "delete") await handleDelete();
          }}
          title={confirm.label}
          message={confirm.message}
          confirmLabel={confirm.label}
          variant={confirm.type === "delete" ? "danger" : "primary"}
        />
      )}
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 pt-4 first:pt-0">
      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-indigo-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-gray-800 mt-0.5">{value || "—"}</p>
      </div>
    </div>
  );
}
