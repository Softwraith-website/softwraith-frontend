import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Play, CheckCircle2, Circle, Award, Download, ArrowLeft, Loader2, VideoOff } from "lucide-react";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [activeLecture, setActiveLecture] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [certLoading, setCertLoading] = useState(false);

  useEffect(() => {
    const fetchProgressAndLectures = async () => {
      try {
        setLoading(true);
        // Fetch enrollments
        const enrollRes = await api.get("/enroll/mycourses");
        const matchingEnrollment = enrollRes.data.find(
          (e) => e.courseId._id === courseId || e.courseId === courseId
        );

        if (matchingEnrollment) {
          setEnrollment(matchingEnrollment);
          // Fetch progress detail
          const progressRes = await api.get(`/enroll/progress/${matchingEnrollment._id}`);
          setProgress(progressRes.data.progress);
          setCompletedLectures(progressRes.data.enrollment.completedLectures || []);
        }

        // Fetch lectures
        const lecRes = await api.get(`/lectures/${courseId}`);
        setLectures(lecRes.data);
        if (lecRes.data.length > 0) {
          setActiveLecture(lecRes.data[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressAndLectures();
  }, [courseId]);

  const toggleLectureCompletion = async (lectureId) => {
    if (!enrollment) return;

    const isCompleted = completedLectures.includes(lectureId);
    try {
      if (isCompleted) {
        const res = await api.delete(`/enroll/progress/${enrollment._id}/complete/${lectureId}`);
        setProgress(res.data.progress);
        setCompletedLectures(res.data.completedLectures);
      } else {
        const res = await api.post(`/enroll/progress/${enrollment._id}/complete/${lectureId}`);
        setProgress(res.data.progress);
        setCompletedLectures(res.data.completedLectures);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadCertificate = async () => {
    if (!enrollment) return;
    try {
      setCertLoading(true);
      // Generate certificate
      const genRes = await api.post(`/certificates/generate/${enrollment._id}`);
      const cert = genRes.data.certificate;
      
      // Open download URL
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("token");
      window.open(
        `${apiBase}/certificates/download/${cert._id}?token=${encodeURIComponent(token)}`,
        "_blank"
      );
    } catch (err) {
      console.error("Certificate generation error:", err);
      alert(err.response?.data?.message || "Failed to generate certificate");
    } finally {
      setCertLoading(false);
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
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Back navigation & Course Title */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard/trainings"
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </Link>
          <div>
            <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">
              Course Player
            </span>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">
              {enrollment?.courseId?.title || "Course Details"}
            </h1>
          </div>
        </div>

        {/* Certificate Button or Progress */}
        {progress === 100 ? (
          <button
            onClick={handleDownloadCertificate}
            disabled={certLoading}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md hover:from-amber-600 hover:to-yellow-700 transition duration-150 disabled:opacity-50"
          >
            {certLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Award className="w-4 h-4" />
            )}
            Download Certificate
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">Progress:</span>
            <div className="w-40 bg-gray-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-blue-600">{progress}%</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Lecture List Sidebar */}
        <aside className="lg:col-span-1 border border-gray-200 rounded-xl bg-white p-4 h-fit shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
            Course Curriculum
          </h2>

          <ul className="space-y-1.5">
            {lectures.map((lec, idx) => {
              const isCompleted = completedLectures.includes(lec._id);
              const isActive = activeLecture?._id === lec._id;

              return (
                <li
                  key={lec._id}
                  className={`
                    group flex items-center justify-between p-3 rounded-lg cursor-pointer transition
                    ${isActive ? "bg-blue-50 text-blue-900 font-medium border border-blue-100" : "hover:bg-gray-50 text-gray-700"}
                  `}
                >
                  <div
                    onClick={() => setActiveLecture(lec)}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <div className="shrink-0">
                      {isActive ? (
                        <Play className="w-4 h-4 text-blue-600" />
                      ) : (
                        <span className="text-xs font-semibold text-gray-400 w-4 h-4 flex items-center justify-center">
                          {idx + 1}
                        </span>
                      )}
                    </div>
                    <span className="text-sm truncate pr-2">{lec.title}</span>
                  </div>

                  <button
                    onClick={() => toggleLectureCompletion(lec._id)}
                    className="shrink-0 p-1 hover:bg-gray-100 rounded-full transition"
                    title={isCompleted ? "Mark incomplete" : "Mark complete"}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-50" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 hover:text-gray-400" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Video Player Main Content */}
        <section className="lg:col-span-3 border border-gray-200 rounded-xl bg-white p-6 shadow-sm">
          {activeLecture ? (
            <>
              {/* Responsive Video Container */}
              <div className="relative aspect-video rounded-xl bg-black overflow-hidden mb-6 shadow-inner group">
                <video
                  src={activeLecture.videoUrl}
                  controls
                  key={activeLecture._id} // Reload video when lecture changes
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100 mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {activeLecture.title}
                </h2>

                <button
                  onClick={() => toggleLectureCompletion(activeLecture._id)}
                  className={`
                    flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold transition
                    ${completedLectures.includes(activeLecture._id)
                      ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}
                  `}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {completedLectures.includes(activeLecture._id)
                    ? "Completed"
                    : "Mark Complete"}
                </button>
              </div>

              {activeLecture.description && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    Lecture Description
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {activeLecture.description}
                  </p>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title="No Lectures Available"
              message="This course doesn't have any lectures yet. Check back later or contact support."
              icon={VideoOff}
            />
          )}
        </section>
      </div>
    </div>
  );
}
