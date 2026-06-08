import { useState } from "react";
import { Search, GraduationCap, Calendar, CheckCircle2, Loader, SlidersHorizontal } from "lucide-react";

export default function EnrollmentTable({ enrollments }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredEnrollments = enrollments.filter((e) => {
    const studentName = e.userId?.name || "";
    const studentEmail = e.userId?.email || "";
    const courseTitle = e.courseId?.title || "";

    const matchesSearch =
      studentName.toLowerCase().includes(search.toLowerCase()) ||
      studentEmail.toLowerCase().includes(search.toLowerCase()) ||
      courseTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && e.progress === 100) ||
      (statusFilter === "In Progress" && e.progress < 100);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Filters panel */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full md:max-w-xs">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search student or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 focus:border-indigo-500 rounded-lg text-sm outline-none transition"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs bg-white outline-none focus:border-indigo-500 transition font-medium"
          >
            <option value="All">All Progress</option>
            <option value="Completed">Completed (100%)</option>
            <option value="In Progress">In Progress (&lt; 100%)</option>
          </select>
        </div>
      </div>

      {/* Enrollment Grid */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 pl-6">Student</th>
                <th className="p-4">Enrolled Course</th>
                <th className="p-4">Progress Meter</th>
                <th className="p-4">Enrollment Date</th>
                <th className="p-4 pr-6 text-right">Completion Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredEnrollments.map((e) => (
                <tr key={e._id} className="hover:bg-gray-50/50 transition">
                  {/* User Profile */}
                  <td className="p-4 pl-6">
                    <div>
                      <p className="font-semibold text-gray-900">{e.userId?.name || "Deleted Student"}</p>
                      <p className="text-xs text-gray-405 font-medium mt-0.5">{e.userId?.email || "—"}</p>
                    </div>
                  </td>

                  {/* Course Title */}
                  <td className="p-4 font-semibold text-gray-900">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-indigo-50 text-indigo-500 rounded border border-indigo-100 shrink-0">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate max-w-xs">{e.courseId?.title || "Deleted Course"}</span>
                    </div>
                  </td>

                  {/* Progress bar */}
                  <td className="p-4 min-w-[150px]">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                        <span>{e.progress}% Completed</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden border border-gray-200/50">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${e.progress === 100 ? "bg-green-55" : "bg-indigo-600"}`}
                          style={{ width: `${e.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="p-4 text-gray-450 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-300" />
                      <span>
                        {e.createdAt ? new Date(e.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }) : "—"}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4 pr-6 text-right">
                    {e.progress === 100 ? (
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Finished
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-250">
                        <Loader className="w-3 h-3 animate-spin text-indigo-500" />
                        In Learning
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredEnrollments.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">
                    No enrollments match the search query.
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
