import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Edit3,
  Eye,
  EyeOff,
  Plus,
  Save,
  Trash2,
  Video,
  X,
  BookOpen,
} from "lucide-react";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

const emptyCourse = {
  title: "",
  description: "",
  thumbnail: "",
  price: "",
  category: "",
  syllabusUrl: "",
  isPublished: false,
};

const emptyLecture = { title: "", videoUrl: "", order: "" };

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState(emptyCourse);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [lectureForm, setLectureForm] = useState(emptyLecture);
  const [editingLectureId, setEditingLectureId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lecturesLoading, setLecturesLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await api.get("/admin/courses");
      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to load courses");
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

  const resetCourseForm = () => {
    setCourseForm(emptyCourse);
    setEditingCourseId(null);
    setShowForm(false);
  };

  const startEditCourse = (course) => {
    setEditingCourseId(course._id);
    setCourseForm({
      title: course.title || "",
      description: course.description || "",
      thumbnail: course.thumbnail || "",
      price: course.price ?? "",
      category: course.category || "",
      syllabusUrl: course.syllabusUrl || "",
      isPublished: Boolean(course.isPublished),
    });
    setShowForm(true);
  };

  const saveCourse = async (e) => {
    e.preventDefault();
    const payload = {
      ...courseForm,
      price: Number(courseForm.price) || 0,
    };

    try {
      if (editingCourseId) {
        const res = await api.put(`/courses/${editingCourseId}`, payload);
        setCourses((prev) => prev.map((course) => course._id === editingCourseId ? res.data : course));
        setMsg("Course updated");
      } else {
        const res = await api.post("/courses", payload);
        setCourses((prev) => [res.data, ...prev]);
        setMsg("Course created");
      }
      resetCourseForm();
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to save course");
    }
  };

  const deleteCourse = async (course) => {
    if (!confirm(`Delete "${course.title}" and all related lectures/enrollments?`)) return;
    try {
      await api.delete(`/courses/${course._id}`);
      setCourses((prev) => prev.filter((item) => item._id !== course._id));
      if (expandedCourse === course._id) setExpandedCourse(null);
      setMsg("Course deleted");
    } catch (err) {
      setMsg(err.response?.data?.message || "Delete failed");
    }
  };

  const togglePublish = async (course) => {
    try {
      const res = await api.put(`/courses/${course._id}`, {
        isPublished: !course.isPublished,
      });
      setCourses((prev) => prev.map((item) => item._id === course._id ? res.data : item));
      setMsg(res.data.isPublished ? "Course published" : "Course moved to draft");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to update course");
    }
  };

  const loadLectures = async (courseId) => {
    setLecturesLoading(true);
    try {
      const res = await api.get(`/lectures/${courseId}`);
      setLectures(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setLectures([]);
      setMsg(err.response?.data?.message || "Failed to load lectures");
    } finally {
      setLecturesLoading(false);
    }
  };

  const toggleLectures = async (courseId) => {
    setLectureForm(emptyLecture);
    setEditingLectureId(null);
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
      return;
    }
    setExpandedCourse(courseId);
    await loadLectures(courseId);
  };

  const startEditLecture = (lecture) => {
    setEditingLectureId(lecture._id);
    setLectureForm({
      title: lecture.title || "",
      videoUrl: lecture.videoUrl || "",
      order: lecture.order || "",
    });
  };

  const resetLectureForm = () => {
    setEditingLectureId(null);
    setLectureForm(emptyLecture);
  };

  const saveLecture = async (e) => {
    e.preventDefault();
    const payload = {
      courseId: expandedCourse,
      title: lectureForm.title,
      videoUrl: lectureForm.videoUrl,
      order: Number(lectureForm.order) || lectures.length + 1,
    };

    try {
      if (editingLectureId) {
        const res = await api.put(`/lectures/${editingLectureId}`, payload);
        setLectures((prev) =>
          prev.map((lecture) => lecture._id === editingLectureId ? res.data : lecture)
            .sort((a, b) => a.order - b.order)
        );
        setMsg("Lecture updated");
      } else {
        const res = await api.post("/lectures", payload);
        setLectures((prev) => [...prev, res.data].sort((a, b) => a.order - b.order));
        setMsg("Lecture added");
      }
      resetLectureForm();
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to save lecture");
    }
  };

  const deleteLecture = async (lecture) => {
    if (!confirm(`Delete lecture "${lecture.title}"?`)) return;
    try {
      await api.delete(`/lectures/${lecture._id}`);
      setLectures((prev) => prev.filter((item) => item._id !== lecture._id));
      if (editingLectureId === lecture._id) resetLectureForm();
      setMsg("Lecture deleted");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to delete lecture");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-sm text-gray-500 mt-1">Create, edit, publish, and manage course lectures.</p>
        </div>
        <button
          onClick={() => {
            if (showForm) resetCourseForm();
            else setShowForm(true);
          }}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Course"}
        </button>
      </div>

      {msg && <div className="mb-4 px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg">{msg}</div>}

      {showForm && (
        <form onSubmit={saveCourse} className="bg-white border border-gray-200 rounded-xl p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">{editingCourseId ? "Edit Course" : "New Course"}</h2>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={courseForm.isPublished}
                onChange={(e) => setCourseForm({ ...courseForm, isPublished: e.target.checked })}
              />
              Published
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Course title" value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} required />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Category" value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Thumbnail URL" value={courseForm.thumbnail} onChange={(e) => setCourseForm({ ...courseForm, thumbnail: e.target.value })} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Price" type="number" value={courseForm.price} onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })} />
            <input className="md:col-span-2 border rounded-lg px-3 py-2 text-sm" placeholder="Syllabus PDF URL" value={courseForm.syllabusUrl} onChange={(e) => setCourseForm({ ...courseForm, syllabusUrl: e.target.value })} />
          </div>
          <textarea className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Description" value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} rows={4} required />
          <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
            <Save className="w-4 h-4" />
            {editingCourseId ? "Save Changes" : "Create Course"}
          </button>
        </form>
      )}

      {loading ? (
        <Spinner size="lg" className="my-8" />
      ) : courses.length === 0 ? (
        <EmptyState
          title="No courses found"
          message="Create a new course to get started with curriculum building."
          icon={BookOpen}
          actionText="Add Course"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <div className="space-y-3">
          {courses.map((course) => (
            <div key={course._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-gray-900 truncate">{course.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${course.isPublished ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-500">
                    <span>{course.category || "No category"}</span>
                    <span>{course.price > 0 ? `Rs ${course.price}` : "Free"}</span>
                    {course.syllabusUrl && <span className="text-blue-500">Syllabus attached</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => togglePublish(course)} title={course.isPublished ? "Move to draft" : "Publish"} className="text-gray-400 hover:text-green-600 p-1">
                    {course.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => startEditCourse(course)} title="Edit course" className="text-gray-400 hover:text-blue-600 p-1">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => toggleLectures(course._id)} title="Manage lectures" className="flex items-center gap-1 text-gray-400 hover:text-gray-700 px-2 py-1 rounded-md hover:bg-gray-50">
                    <Video className="w-4 h-4" />
                    {expandedCourse === course._id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                  <button onClick={() => deleteCourse(course)} title="Delete course" className="text-gray-400 hover:text-red-500 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {expandedCourse === course._id && (
                <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">Lectures</h4>
                    {editingLectureId && (
                      <button onClick={resetLectureForm} className="text-xs text-gray-500 hover:text-gray-900">Cancel edit</button>
                    )}
                  </div>

                  {lecturesLoading ? (
                    <Spinner size="sm" className="my-4" />
                  ) : (
                    <>
                      <ul className="space-y-2 mb-4">
                        {lectures.map((lecture) => (
                          <li key={lecture._id} className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-200">
                            <span className="text-gray-400 font-mono text-xs w-6">{lecture.order}.</span>
                            <span className="flex-1 truncate">{lecture.title}</span>
                            <a href={lecture.videoUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 text-xs">View</a>
                            <button onClick={() => startEditLecture(lecture)} className="text-gray-400 hover:text-blue-600"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => deleteLecture(lecture)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                          </li>
                        ))}
                      </ul>

                      <form onSubmit={saveLecture} className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_auto] gap-3">
                        <input className="border rounded-lg px-3 py-2 text-sm bg-white" placeholder="Order" type="number" value={lectureForm.order} onChange={(e) => setLectureForm({ ...lectureForm, order: e.target.value })} />
                        <input className="border rounded-lg px-3 py-2 text-sm bg-white" placeholder="Lecture title" value={lectureForm.title} onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })} required />
                        <input className="border rounded-lg px-3 py-2 text-sm bg-white" placeholder="Video URL" value={lectureForm.videoUrl} onChange={(e) => setLectureForm({ ...lectureForm, videoUrl: e.target.value })} required />
                        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 whitespace-nowrap">
                          {editingLectureId ? "Save" : "Add"}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
