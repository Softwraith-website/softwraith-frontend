import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, CheckCircle, Award, Loader2, ArrowRight } from "lucide-react";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

export default function Trainings() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [enrollLoading, setEnrollLoading] = useState(null);

  const enrolledCourseIds = useMemo(
    () => new Set(enrollments.map((item) => item.courseId?._id).filter(Boolean)),
    [enrollments]
  );

  const availableCourses = courses.filter((course) => !enrolledCourseIds.has(course._id));

  const load = async () => {
    try {
      setLoading(true);
      const [enrollRes, courseRes] = await Promise.all([
        api.get("/enroll/mycourses"),
        api.get("/courses"),
      ]);
      setEnrollments(Array.isArray(enrollRes.data) ? enrollRes.data : []);
      setCourses(Array.isArray(courseRes.data) ? courseRes.data : []);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to load trainings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const enroll = async (courseId) => {
    try {
      setMessage("");
      setEnrollLoading(courseId);
      await api.post("/enroll", { courseId });
      await load();
      setMessage("Enrolled successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Enrollment failed");
    } finally {
      setEnrollLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-6xl">
      {/* Messages */}
      {message && (
        <div className="p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-sm font-medium animate-fadeIn">
          {message}
        </div>
      )}

      {/* MY TRAININGS */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">My Trainings</h1>
        </div>

        {enrollments.length === 0 ? (
          <EmptyState
            title="Not Enrolled in Any Course"
            message="Browse available programs below and start your learning journey."
            icon={BookOpen}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.map((item) => {
              const course = item.courseId;
              if (!course) return null;
              const isCompleted = item.progress === 100;

              return (
                <div
                  key={item._id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg leading-snug">
                        {course.title}
                      </h3>
                      {isCompleted && (
                        <span className="shrink-0 flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded-full border border-green-200">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-6">
                      {course.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1.5">
                        <span>Progress</span>
                        <span>{item.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${item.progress || 0}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      {isCompleted ? (
                        <Link
                          to={`/dashboard/courses/${course._id}`}
                          className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1.5"
                        >
                          <Award className="w-4 h-4" />
                          Get Certificate
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-400">
                          In Progress
                        </span>
                      )}

                      <Link
                        to={`/dashboard/courses/${course._id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* AVAILABLE TRAININGS */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-bold text-gray-900">Available Programs</h2>
        </div>

        {availableCourses.length === 0 ? (
          <p className="text-gray-500 text-sm">No additional published courses are available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300"
              >
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-6">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-base font-bold text-gray-900">
                    {course.price > 0 ? `Rs ${course.price}` : "Free"}
                  </span>
                  <button
                    onClick={() => enroll(course._id)}
                    disabled={enrollLoading === course._id}
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 bg-white text-sm font-semibold rounded-lg text-gray-700 hover:bg-gray-50 transition min-w-[80px]"
                  >
                    {enrollLoading === course._id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                    ) : (
                      "Enroll"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
