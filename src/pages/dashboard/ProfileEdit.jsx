import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import userService from "../../services/userService";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function ProfileEdit() {
  const { user, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast("Avatar must be under 2 MB", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      setAvatarPreview(base64);
      setAvatarUploading(true);
      try {
        const { user: updated } = await userService.uploadAvatar(base64, file.name);
        const token = localStorage.getItem("token");
        login(updated, token);
        showToast("Avatar updated", "success");
      } catch (err) {
        showToast(err.response?.data?.message || "Avatar upload failed", "error");
        setAvatarPreview(user?.avatar || null);
      } finally {
        setAvatarUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      showToast("Name must be at least 2 characters", "error");
      return;
    }
    setSaving(true);
    try {
      const { user: updated } = await userService.updateProfile({ name: name.trim(), bio: bio.trim() });
      const token = localStorage.getItem("token");
      login(updated, token);
      showToast("Profile saved", "success");
      navigate("/dashboard/profile");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to save profile", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/dashboard/profile")}
          className="p-1.5 rounded-lg hover:bg-gray-100 border border-gray-200 transition"
        >
          <ArrowLeft className="w-4 h-4 text-gray-500" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar src={avatarPreview} name={user?.name} size="xl" />
            {avatarUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-full">
                <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
              </div>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={avatarUploading}
              className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
            >
              <Camera className="w-4 h-4" />
              Change Photo
            </button>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2 MB</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={80}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={300}
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-y"
              placeholder="Write a short bio about yourself..."
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{bio.length}/300</p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={saving} className="flex-1">
              Save Changes
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dashboard/profile")}
              disabled={saving}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
