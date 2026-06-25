import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, CheckCircle, Award, ArrowRight } from "lucide-react";
import enrollmentService from "../../services/enrollmentService";
import courseService from "../../services/courseService";
import CourseCard from "../../components/ui/CourseCard";
import ProgressBar from "../../components/ui/ProgressBar";
import EnrollButton from "../../components/EnrollButton";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

export default function Trainings() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const [myEnrollments, allCourses] = await Promise.all([
        enrollmentService.getMyCourses(),
        courseService.getAll(),
      ]);
      setEnrollments(Array.isArray(myEnrollments) ? myEnrollments : []);
      setCourses(Array.isArray(allCourses) ? allCourses : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load trainings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const enrolledCourseIds = useMemo(
    () => new Set(enrollments.map((e) => e.courseId?._id).filter(Boolean)),
    [enrollments]
  );
  const available = courses.filter((c) => !enrolledCourseIds.has(c._id));

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-12 max-w-5xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{error}</div>
      )}

      {/* MY TRAININGS */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">My Trainings</h1>
        </div>

        {enrollments.length === 0 ? (
          <EmptyState title="No Courses Yet" message="Browse available programs below." icon={BookOpen} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {enrollments.map((item) => {
              const course = item.courseId;
              if (!course) return null;
              const done = item.progress === 100;
              return (
                <div key={item._id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-gray-900 leading-snug">{course.title}</h3>
                    {done && (
                      <span className="shrink-0 flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded-full border border-green-200">
                        <CheckCircle className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>

                  <ProgressBar value={item.progress || 0} size="md" />

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    {done ? (
                      <Link to={`/dashboard/courses/${course._id}`} className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1.5">
                        <Award className="w-4 h-4" /> Get Certificate
                      </Link>
                    ) : (
                      <span className="text-xs text-gray-400">In Progress</span>
                    )}
                    <Link to={`/dashboard/courses/${course._id}`} className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition">
                      Continue <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* AVAILABLE PROGRAMS */}
      {available.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-bold text-gray-900">Available Programs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {available.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                href={`/courses/${course._id}`}
                action={<EnrollButton course={course} onEnrolled={load} />}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
