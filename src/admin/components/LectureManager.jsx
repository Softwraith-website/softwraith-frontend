import { useState } from "react";
import { Plus, Edit3, Trash2, Video, Eye, X, Loader2, Save } from "lucide-react";

export default function LectureManager({
  lectures,
  onAddLecture,
  onUpdateLecture,
  onDeleteLecture,
  loading,
}) {
  const emptyForm = { title: "", description: "", videoUrl: "", order: "" };
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const handleEdit = (lecture) => {
    setEditingId(lecture._id);
    setFormData({
      title: lecture.title || "",
      description: lecture.description || "",
      videoUrl: lecture.videoUrl || "",
      order: lecture.order ?? "",
    });
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setFormOpen(false);
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setErrorMsg("Lecture Title is required.");
      return;
    }
    if (!formData.videoUrl.trim()) {
      setErrorMsg("Video URL is required.");
      return;
    }

    setErrorMsg("");
    setSaving(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        videoUrl: formData.videoUrl,
        order: formData.order === "" ? lectures.length + 1 : Number(formData.order),
      };

      if (editingId) {
        await onUpdateLecture(editingId, payload);
      } else {
        await onAddLecture(payload);
      }
      handleCancel();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to save lecture.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-650" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lecture List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">Curriculum Syllabus ({lectures.length} Lectures)</h2>
          {!formOpen && (
            <button
              onClick={() => setFormOpen(true)}
              className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-150 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Lecture
            </button>
          )}
        </div>

        {lectures.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm">
            <Video className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p>No lectures added yet. Build the curriculum by adding modules.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lectures.map((lecture) => (
              <div
                key={lecture._id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-gray-300 transition-all flex items-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                  {lecture.order}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-905 text-sm truncate">{lecture.title}</h3>
                  {lecture.description && (
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">{lecture.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <span className="truncate max-w-[200px] hover:text-indigo-650 transition cursor-pointer" onClick={() => window.open(lecture.videoUrl, "_blank")}>
                      🎥 Video Attached
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleEdit(lecture)}
                    className="p-1.5 rounded bg-gray-50 border border-gray-200 text-gray-450 hover:text-blue-600 hover:border-blue-200 transition"
                    title="Edit Lecture"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteLecture(lecture)}
                    className="p-1.5 rounded bg-gray-50 border border-gray-200 text-gray-450 hover:text-red-500 hover:border-red-200 transition"
                    title="Delete Lecture"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lecture Form Panel */}
      <div className="lg:col-span-1">
        {formOpen ? (
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4 sticky top-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-800">
                {editingId ? "Edit Lecture" : "New Lecture"}
              </h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-650 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-55 border border-red-200 text-red-700 text-xs rounded-lg">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Order */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sort Order (Number)</label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 1 (blank defaults to next)"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  className="border border-gray-200 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs outline-none transition"
                />
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Lecture Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Introduction to JSX"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border border-gray-200 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs outline-none transition"
                />
              </div>

              {/* Video URL */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Video URL *</label>
                <input
                  type="url"
                  required
                  placeholder="e.g. https://youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="border border-gray-200 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs outline-none transition"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
                <textarea
                  rows={3}
                  placeholder="Explain what the student will learn in this lecture..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border border-gray-200 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs outline-none transition resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1.5 border rounded-lg text-xs font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-1.5 rounded-lg shadow-sm disabled:opacity-50 transition"
                >
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{editingId ? "Save Changes" : "Add Lecture"}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 text-center text-slate-500 text-xs py-8 sticky top-6">
            <p>Click "Add Lecture" to append a new module to the syllabus curriculum.</p>
          </div>
        )}
      </div>
    </div>
  );
}
