import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, BookOpen, AlertCircle } from "lucide-react";
import adminService from "../services/adminService";
import CourseTable from "../components/CourseTable";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await adminService.getCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (!msg) return undefined;
    const timer = setTimeout(() => setMsg(""), 3500);
    return () => clearTimeout(timer);
  }, [msg]);

  const handleDelete = async (course) => {
    if (!confirm(`Are you sure you want to delete "${course.title}"? This will permanently delete all related lectures and student enrollment records.`)) return;
    try {
      await adminService.deleteCourse(course._id);
      setCourses((prev) => prev.filter((c) => c._id !== course._id));
      setMsg("Course deleted successfully.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to delete course.");
    }
  };

  const handleTogglePublish = async (course) => {
    try {
      const updated = await adminService.updateCourse(course._id, {
        isPublished: !course.isPublished,
      });
      setCourses((prev) =>
        prev.map((c) => (c._id === course._id ? updated : c))
      );
      setMsg(updated.isPublished ? "Course published successfully." : "Course reverted to draft.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to update course status.");
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
          title="Error Loading Courses"
          message={error}
          onRetry={fetchCourses}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and create triggers */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Courses</h1>
          <p className="text-sm text-gray-500 mt-1">Review, search, publish, and delete courses from the directory.</p>
        </div>
        <Link
          to="/admin/courses/create"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-indigo-600/10 transition shrink-0"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Add Course</span>
        </Link>
      </div>

      {msg && (
        <div className="flex items-center gap-2 px-4 py-3 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm rounded-xl transition">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {courses.length === 0 ? (
        <EmptyState
          title="No courses found"
          message="Create a new course catalog with modules and syllabus to start enrollments."
          icon={BookOpen}
          actionText="Create Course"
          onAction={() => window.location.assign("/admin/courses/create")}
        />
      ) : (
        <CourseTable
          courses={courses}
          onDelete={handleDelete}
          onTogglePublish={handleTogglePublish}
        />
      )}
    </div>
  );
}
