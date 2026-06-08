import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import adminService from "../services/adminService";
import CourseForm from "../components/CourseForm";

export default function AdminCourseCreate() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (formData) => {
    try {
      setSubmitting(true);
      setError("");
      await adminService.createCourse(formData);
      navigate("/admin/courses");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create course. Please verify your fields.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/courses")}
          className="p-2 border border-gray-200 rounded-xl hover:bg-gray-150 bg-white text-gray-500 transition"
          title="Back to Courses"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create Course</h1>
          <p className="text-sm text-gray-500 mt-1">Configure name, levels, syllabus details, and description.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200 max-w-4xl">
          {error}
        </div>
      )}

      <CourseForm onSubmit={handleCreate} submitting={submitting} />
    </div>
  );
}
