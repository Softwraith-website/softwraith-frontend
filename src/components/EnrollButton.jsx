import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import enrollmentService from "../services/enrollmentService";
import Button from "./ui/Button";

export default function EnrollButton({ course, onEnrolled, className = "" }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const isFree = !course?.price || course.price === 0;

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/courses/${course._id}` } } });
      return;
    }

    if (!isFree) {
      navigate(`/courses/${course._id}#checkout`);
      return;
    }

    setLoading(true);
    try {
      await enrollmentService.enroll(course._id);
      showToast("Successfully enrolled!", "success");
      onEnrolled?.();
      navigate("/dashboard/trainings");
    } catch (err) {
      const msg = err.response?.data?.message || "Enrollment failed";
      if (msg.toLowerCase().includes("already")) {
        showToast("Already enrolled — go to dashboard", "info");
        navigate("/dashboard/trainings");
      } else {
        showToast(msg, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleEnroll}
      loading={loading}
      className={className}
    >
      {isFree ? "Enroll Free" : `Enroll — ₹${course.price}`}
    </Button>
  );
}
