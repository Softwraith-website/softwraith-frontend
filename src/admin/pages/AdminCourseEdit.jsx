import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import adminService from "../services/adminService";
import CourseForm from "../components/CourseForm";
import Spinner from "../../components/ui/Spinner";
import ErrorState from "../../components/ui/ErrorState";

export default function AdminCourseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadCourse = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await adminService.getCourseById(id);
      setCourse(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load course details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadCourse();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      setSubmitting(true);
      setError("");
      await adminService.updateCourse(id, formData);
      navigate("/admin/courses");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update course. Please check your inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="py-8">
        <ErrorState
          title="Error Loading Course"
          message={error}
          onRetry={loadCourse}
        />
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Course</h1>
          <p className="text-sm text-gray-500 mt-1">
            Update course title, difficulty, pricing, and curriculum syllabus.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200 max-w-4xl">
          {error}
        </div>
      )}

      {course && (
        <CourseForm
          initialData={course}
          onSubmit={handleUpdate}
          submitting={submitting}
        />
      )}
    </div>
  );
}
