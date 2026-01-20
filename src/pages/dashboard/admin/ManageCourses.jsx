import { useEffect, useState } from "react";
import api, { authFetch } from "../../../utils/api";



export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseId: "",
    title: "",
    description: "",
    videoUrl: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await authFetch.get("/courses");
      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Upload lecture
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await authFetch.post("/lectures", form);
      setMessage("✅ Lecture uploaded successfully");

      setForm({
        courseId: "",
        title: "",
        description: "",
        videoUrl: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to upload lecture");
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6">Upload Lecture</h2>

      {message && (
        <p className="mb-4 text-sm font-medium">
          {message}
        </p>
      )}

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-xl shadow"
        >
          <select
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>

          <input
            name="title"
            placeholder="Lecture Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Lecture Description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            name="videoUrl"
            placeholder="Video URL (YouTube / Cloudinary)"
            value={form.videoUrl}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
          >
            Upload Lecture
          </button>
        </form>
      )}
    </div>
  );
}
