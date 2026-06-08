import { useState, useEffect } from "react";
import { Save, Upload, Link2, AlertCircle, Loader2 } from "lucide-react";
import adminService from "../services/adminService";

export default function CourseForm({ initialData, onSubmit, submitting }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "Beginner",
    duration: "",
    price: "",
    thumbnail: "",
    syllabusUrl: "",
    isPublished: false,
  });

  // Toggles for upload method vs direct URL
  const [thumbMode, setThumbMode] = useState("url"); // "url" | "upload"
  const [syllabusMode, setSyllabusMode] = useState("url"); // "url" | "upload"
  
  const [thumbUploading, setThumbUploading] = useState(false);
  const [syllabusUploading, setSyllabusUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "",
        level: initialData.level || "Beginner",
        duration: initialData.duration || "",
        price: initialData.price ?? "",
        thumbnail: initialData.thumbnail || "",
        syllabusUrl: initialData.syllabusUrl || "",
        isPublished: Boolean(initialData.isPublished),
      });
      if (initialData.thumbnail && !initialData.thumbnail.startsWith("http") && initialData.thumbnail.includes("/uploads/")) {
        setThumbMode("upload");
      }
      if (initialData.syllabusUrl && !initialData.syllabusUrl.startsWith("http") && initialData.syllabusUrl.includes("/uploads/")) {
        setSyllabusMode("upload");
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "thumbnail" && !file.type.startsWith("image/")) {
      setErrorMsg("Thumbnail must be an image file.");
      return;
    }
    if (type === "syllabus" && file.type !== "application/pdf") {
      setErrorMsg("Syllabus must be a PDF document.");
      return;
    }

    setErrorMsg("");
    const reader = new FileReader();
    
    if (type === "thumbnail") setThumbUploading(true);
    else setSyllabusUploading(true);

    reader.onload = async () => {
      try {
        const base64Data = reader.result;
        const res = await adminService.uploadFile(base64Data, file.name);
        setFormData((prev) => ({
          ...prev,
          [type === "thumbnail" ? "thumbnail" : "syllabusUrl"]: res.url,
        }));
      } catch (err) {
        setErrorMsg(err.response?.data?.message || "Failed to upload file. Please try again.");
      } finally {
        if (type === "thumbnail") setThumbUploading(false);
        else setSyllabusUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setErrorMsg("Course Title is required.");
      return;
    }
    if (!formData.description.trim()) {
      setErrorMsg("Course Description is required.");
      return;
    }
    
    setErrorMsg("");
    onSubmit({
      ...formData,
      price: formData.price === "" ? 0 : Number(formData.price),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {errorMsg && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{errorMsg}</p>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Course Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-xs font-semibold text-gray-500">Course Title *</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="e.g. Master React and Tailwind CSS"
                value={formData.title}
                onChange={handleChange}
                className="border border-gray-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm transition focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="text-xs font-semibold text-gray-500">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                placeholder="e.g. Frontend Development"
                value={formData.category}
                onChange={handleChange}
                className="border border-gray-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm transition focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Level */}
            <div className="flex flex-col gap-1">
              <label htmlFor="level" className="text-xs font-semibold text-gray-500">Difficulty Level</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="border border-gray-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm bg-white transition focus:ring-1 focus:ring-indigo-500 outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-1">
              <label htmlFor="duration" className="text-xs font-semibold text-gray-500">Duration / Length</label>
              <input
                id="duration"
                name="duration"
                type="text"
                placeholder="e.g. 12 Hours or 6 Weeks"
                value={formData.duration}
                onChange={handleChange}
                className="border border-gray-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm transition focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="text-xs font-semibold text-gray-500">Price (INR) - 0 for Free</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                placeholder="e.g. 2999"
                value={formData.price}
                onChange={handleChange}
                className="border border-gray-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm transition focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Status */}
            <div className="flex flex-col justify-end pb-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  name="isPublished"
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-indigo-600 border-gray-350 focus:ring-indigo-500 focus:ring-offset-0"
                />
                <div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition">Publish Course</span>
                  <p className="text-[10px] text-gray-400">Make this course searchable and enrollable immediately.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Media & Attachments */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Media & Syllabus</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Thumbnail */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">Course Thumbnail</span>
                <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-[10px] font-bold text-gray-500">
                  <button
                    type="button"
                    onClick={() => setThumbMode("url")}
                    className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${thumbMode === "url" ? "bg-white text-slate-800 shadow-sm" : ""}`}
                  >
                    <Link2 className="w-3 h-3" /> URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setThumbMode("upload")}
                    className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${thumbMode === "upload" ? "bg-white text-slate-800 shadow-sm" : ""}`}
                  >
                    <Upload className="w-3 h-3" /> Upload
                  </button>
                </div>
              </div>

              {thumbMode === "url" ? (
                <input
                  name="thumbnail"
                  type="text"
                  placeholder="https://example.com/thumbnail.png"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="border border-gray-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm outline-none"
                />
              ) : (
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-indigo-500 rounded-xl p-3 cursor-pointer hover:bg-slate-50/50 transition relative group min-h-[46px]">
                    {thumbUploading ? (
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> Uploading image...
                      </div>
                    ) : formData.thumbnail ? (
                      <span className="text-xs font-semibold text-emerald-600 truncate max-w-xs">✓ {formData.thumbnail.split("/").pop()}</span>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                        <Upload className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition" />
                        <span>Select PNG/JPG image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "thumbnail")}
                      className="hidden"
                    />
                  </label>
                  {formData.thumbnail && (
                    <img
                      src={formData.thumbnail.startsWith("http") ? formData.thumbnail : `http://localhost:5000${formData.thumbnail}`}
                      alt="Thumbnail Preview"
                      className="w-12 h-12 rounded-lg border object-cover bg-gray-50 shrink-0"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Syllabus */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">Syllabus PDF</span>
                <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-[10px] font-bold text-gray-500">
                  <button
                    type="button"
                    onClick={() => setSyllabusMode("url")}
                    className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${syllabusMode === "url" ? "bg-white text-slate-800 shadow-sm" : ""}`}
                  >
                    <Link2 className="w-3 h-3" /> URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setSyllabusMode("upload")}
                    className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${syllabusMode === "upload" ? "bg-white text-slate-800 shadow-sm" : ""}`}
                  >
                    <Upload className="w-3 h-3" /> Upload
                  </button>
                </div>
              </div>

              {syllabusMode === "url" ? (
                <input
                  name="syllabusUrl"
                  type="text"
                  placeholder="https://example.com/syllabus.pdf"
                  value={formData.syllabusUrl}
                  onChange={handleChange}
                  className="border border-gray-200 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm outline-none"
                />
              ) : (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-indigo-500 rounded-xl p-3 cursor-pointer hover:bg-slate-50/50 transition relative group min-h-[46px]">
                  {syllabusUploading ? (
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> Uploading PDF...
                    </div>
                  ) : formData.syllabusUrl ? (
                    <span className="text-xs font-semibold text-emerald-600 truncate max-w-xs">✓ {formData.syllabusUrl.split("/").pop()}</span>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                      <Upload className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition" />
                      <span>Select PDF brochure</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileUpload(e, "syllabus")}
                    className="hidden"
                  />
                </label>
              )}
            </div>

          </div>
        </div>

        {/* Description */}
        <div className="border-t border-gray-100 pt-6 flex flex-col gap-1">
          <label htmlFor="description" className="text-xs font-semibold text-gray-500">Course Description *</label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            placeholder="Provide a comprehensive course breakdown, outline key outcomes, target audience, and certification details."
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-200 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm transition focus:ring-1 focus:ring-indigo-500 outline-none resize-y"
          />
        </div>
      </div>

      {/* Save Trigger */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={submitting || thumbUploading || syllabusUploading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md shadow-indigo-600/20 disabled:opacity-50 transition"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{initialData ? "Save Course Changes" : "Create New Course"}</span>
        </button>
      </div>
    </form>
  );
}
