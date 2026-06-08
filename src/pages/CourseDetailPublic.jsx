import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BookOpen, Award, Clock, Loader2, ArrowRight, Lock, BookX } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";

export default function CourseDetailPublic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        // Fetch course details
        const courseRes = await api.get(`/courses/${id}`);
        setCourse(courseRes.data);

        // Fetch curriculum lectures
        const lecturesRes = await api.get(`/lectures/${id}`);
        setLectures(lecturesRes.data);

        // Check if user is logged in & enrolled
        if (user) {
          const enrollRes = await api.get("/enroll/mycourses");
          const isEnrolled = enrollRes.data.some(
            (e) => e.courseId?._id === id || e.courseId === id
          );
          setEnrolled(isEnrolled);
        }
      } catch (err) {
        console.error("Failed to load details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id, user]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setActionLoading(true);

      if (course.price > 0) {
        // Create order
        const { data } = await api.post(`/payments/create-order/${id}`);

        if (data.simulated) {
          // Dev simulation mode
          const confirmPayment = window.confirm(
            "Razorpay keys not configured. Click OK to simulate a successful payment."
          );
          if (!confirmPayment) {
            setActionLoading(false);
            return;
          }

          // Verify simulation
          await api.post("/payments/verify", {
            razorpayOrderId: data.orderId,
            simulated: true,
          });

          navigate(`/dashboard/courses/${id}`);
        } else {
          // Live mode
          const scriptLoaded = await loadRazorpayScript();
          if (!scriptLoaded) {
            alert("Razorpay SDK failed to load. Are you offline?");
            setActionLoading(false);
            return;
          }

          const options = {
            key: data.keyId,
            amount: data.amount,
            currency: data.currency,
            name: "Softwraith Solutions",
            description: course.title,
            order_id: data.orderId,
            handler: async function (response) {
              try {
                setActionLoading(true);
                await api.post("/payments/verify", {
                  razorpayOrderId: data.orderId,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  simulated: false,
                });
                navigate(`/dashboard/courses/${id}`);
              } catch (err) {
                console.error(err);
                alert("Payment verification failed. Please contact support.");
              } finally {
                setActionLoading(false);
              }
            },
            prefill: {
              name: user.name,
              email: user.email,
            },
            theme: {
              color: "#111827",
            },
            modal: {
              ondismiss: function () {
                setActionLoading(false);
              }
            }
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      } else {
        // Free course direct enrollment
        await api.post("/enroll", { courseId: id });
        navigate(`/dashboard/courses/${id}`);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Enrollment/Payment failed");
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-[60vh] py-20">
        <EmptyState
          title="Course Not Found"
          message="The course you are looking for does not exist or has been removed."
          icon={BookX}
          actionText="Back to Courses"
          onAction={() => navigate("/courses")}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Back button */}
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 font-medium transition"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-200">
              {course.category || "General"}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 leading-tight">
              {course.title}
            </h1>
            <p className="mt-6 text-gray-600 leading-relaxed text-base md:text-lg">
              {course.description}
            </p>
          </div>

          {/* Curriculum */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Curriculum Outline</h2>
            <p className="text-sm text-gray-500">
              This course contains {lectures.length} lessons. Here is what is covered:
            </p>

            <ul className="border border-gray-200 rounded-xl divide-y divide-gray-150 overflow-hidden bg-white shadow-sm">
              {lectures.length === 0 ? (
                <li className="p-4 text-sm text-gray-500 text-center">No lectures uploaded yet.</li>
              ) : (
                lectures.map((lec, index) => (
                  <li key={lec._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-semibold text-gray-400 w-5 text-right">{index + 1}</span>
                      <span className="text-sm font-semibold text-gray-800 truncate pr-4">{lec.title}</span>
                    </div>
                    <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Enrollment Card Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 sticky top-24">
            <div className="aspect-video bg-gray-950 rounded-xl flex items-center justify-center text-white relative">
              <BookOpen className="w-12 h-12 text-blue-500 opacity-60" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Price</span>
              <h2 className="text-3xl font-black text-gray-900">
                {course.price > 0 ? `Rs ${course.price}` : "Free"}
              </h2>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              {enrolled ? (
                <Link
                  to={`/dashboard/courses/${course._id}`}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                >
                  Continue Learning
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition disabled:opacity-60"
                >
                  {actionLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                  ) : user ? (
                    course.price > 0 ? `Buy Course` : `Enroll Now`
                  ) : (
                    "Login to Enroll"
                  )}
                </button>
              )}
            </div>

            {/* Inclusions */}
            <div className="space-y-3.5 pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Full Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-gray-400" />
                <span>Certificate of Completion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
