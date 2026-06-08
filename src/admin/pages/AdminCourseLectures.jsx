import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, AlertCircle } from "lucide-react";
import adminService from "../services/adminService";
import LectureManager from "../components/LectureManager";
import Spinner from "../../components/ui/Spinner";
import ErrorState from "../../components/ui/ErrorState";

export default function AdminCourseLectures() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [courseData, lecturesData] = await Promise.all([
        adminService.getCourseById(courseId),
        adminService.getLectures(courseId),
      ]);
      setCourse(courseData);
      setLectures(Array.isArray(lecturesData) ? lecturesData : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load course curriculum.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) loadData();
  }, [courseId]);

  useEffect(() => {
    if (!msg) return undefined;
    const timer = setTimeout(() => setMsg(""), 3500);
    return () => clearTimeout(timer);
  }, [msg]);

  const handleAddLecture = async (lectureData) => {
    const res = await adminService.createLecture({
      courseId,
      ...lectureData,
    });
    setLectures((prev) => [...prev, res].sort((a, b) => a.order - b.order));
    setMsg("Lecture added successfully.");
  };

  const handleUpdateLecture = async (lectureId, lectureData) => {
    const res = await adminService.updateLecture(lectureId, lectureData);
    setLectures((prev) =>
      prev.map((l) => (l._id === lectureId ? res : l)).sort((a, b) => a.order - b.order)
    );
    setMsg("Lecture updated successfully.");
  };

  const handleDeleteLecture = async (lecture) => {
    if (!confirm(`Are you sure you want to delete lecture "${lecture.title}"?`)) return;
    try {
      await adminService.deleteLecture(lecture._id);
      setLectures((prev) => prev.filter((l) => l._id !== lecture._id));
      setMsg("Lecture deleted successfully.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to delete lecture.");
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
          title="Error Loading Curriculum"
          message={error}
          onRetry={loadData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dynamic Title Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/courses")}
          className="p-2 border border-gray-200 rounded-xl hover:bg-gray-150 bg-white text-gray-500 transition"
          title="Back to Courses"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Curriculum & Lectures</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage course modules for: <span className="font-semibold text-gray-800">{course?.title}</span>
          </p>
        </div>
      </div>

      {msg && (
        <div className="flex items-center gap-2 px-4 py-3 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm rounded-xl transition max-w-4xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      <div className="max-w-7xl">
        <LectureManager
          lectures={lectures}
          onAddLecture={handleAddLecture}
          onUpdateLecture={handleUpdateLecture}
          onDeleteLecture={handleDeleteLecture}
          loading={loading}
        />
      </div>
    </div>
  );
}
