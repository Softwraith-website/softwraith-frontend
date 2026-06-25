import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { User, Mail, Shield, Calendar, Edit2 } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";

export default function Profile() {
  const { user } = useAuth();

  const roleVariant = { admin: "primary", superadmin: "danger", user: "default" };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <Link
          to="/dashboard/profile/edit"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition"
        >
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 px-6 py-8 flex items-center gap-5">
          <Avatar
            src={user?.avatar}
            name={user?.name}
            size="xl"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
            <div className="mt-2">
              <Badge variant={roleVariant[user?.role] || "default"}>
                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4 divide-y divide-gray-100">
          <ProfileRow icon={User} label="Full Name" value={user?.name} />
          <ProfileRow icon={Mail} label="Email Address" value={user?.email} />
          <ProfileRow icon={Shield} label="Role" value={user?.role} />
          <ProfileRow
            icon={Calendar}
            label="Member Since"
            value={
              user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "—"
            }
          />
          {user?.bio && (
            <div className="pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Bio</p>
              <p className="text-sm text-gray-700">{user.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileRow({ icon: Icon, label, value }) {
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
