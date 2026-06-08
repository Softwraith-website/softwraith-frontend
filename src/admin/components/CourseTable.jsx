import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit3, Video, Trash2, ExternalLink, Search, SlidersHorizontal, BookOpen } from "lucide-react";

export default function CourseTable({ courses, onDelete, onTogglePublish }) {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      (course.category && course.category.toLowerCase().includes(search.toLowerCase()));

    const matchesLevel = levelFilter === "All" || course.level === levelFilter;
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Published" && course.isPublished) ||
      (statusFilter === "Draft" && !course.isPublished);

    return matchesSearch && matchesLevel && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filters panel */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 focus:border-indigo-500 rounded-lg text-sm outline-none transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
          </div>
          
          {/* Level Filter */}
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs bg-white outline-none focus:border-indigo-500 transition font-medium"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs bg-white outline-none focus:border-indigo-500 transition font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Course Table Grid */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 pl-6">Course Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Duration & Level</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredCourses.map((course) => {
                const thumbUrl = course.thumbnail
                  ? course.thumbnail.startsWith("http")
                    ? course.thumbnail
                    : `http://localhost:5000${course.thumbnail}`
                  : null;

                return (
                  <tr key={course._id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        {thumbUrl ? (
                          <img
                            src={thumbUrl}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover border bg-gray-55 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0">
                            <BookOpen className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate max-w-xs md:max-w-md">{course.title}</p>
                          <p className="text-xs text-gray-400 truncate max-w-xs mt-0.5">{course.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-medium text-gray-800">{course.category || "General"}</span>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-gray-900">{course.duration || "N/A"}</div>
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                          ${course.level === "Advanced" ? "bg-red-50 text-red-700 border border-red-100" : ""}
                          ${course.level === "Intermediate" ? "bg-amber-50 text-amber-700 border border-amber-100" : ""}
                          ${course.level === "Beginner" || !course.level ? "bg-blue-50 text-blue-700 border border-blue-100" : ""}
                        `}>
                          {course.level || "Beginner"}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 font-bold text-gray-900">
                      {course.price > 0 ? `Rs ${course.price}` : "Free"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => onTogglePublish(course)}
                        title="Click to toggle status"
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border transition hover:opacity-80
                          ${course.isPublished
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }
                        `}
                      >
                        {course.isPublished ? "Published" : "Draft"}
                      </button>
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        {/* Edit details */}
                        <Link
                          to={`/admin/courses/edit/${course._id}`}
                          title="Edit Details"
                          className="p-1.5 rounded-lg border border-gray-200 hover:border-blue-500 hover:text-blue-600 bg-white text-gray-400 transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        
                        {/* Manage lectures */}
                        <Link
                          to={`/admin/courses/${course._id}/lectures`}
                          title="Manage Lectures"
                          className="p-1.5 rounded-lg border border-gray-200 hover:border-purple-500 hover:text-purple-600 bg-white text-gray-400 transition flex items-center gap-1 text-xs font-semibold"
                        >
                          <Video className="w-4 h-4" />
                          <span className="hidden sm:inline">Lectures</span>
                        </Link>

                        {/* View syllabus if exists */}
                        {course.syllabusUrl && (
                          <a
                            href={course.syllabusUrl.startsWith("http") ? course.syllabusUrl : `http://localhost:5000${course.syllabusUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            title="Open Syllabus PDF"
                            className="p-1.5 rounded-lg border border-gray-200 hover:border-indigo-500 hover:text-indigo-650 bg-white text-gray-400 transition"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        {/* Delete course */}
                        <button
                          onClick={() => onDelete(course)}
                          title="Delete Course"
                          className="p-1.5 rounded-lg border border-gray-200 hover:border-red-500 hover:text-red-600 bg-white text-gray-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    No courses match the active filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
