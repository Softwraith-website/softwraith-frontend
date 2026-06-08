import { useEffect, useState } from "react";
import { AlertCircle, GraduationCap } from "lucide-react";
import adminService from "../services/adminService";
import EnrollmentTable from "../components/EnrollmentTable";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await adminService.getEnrollments();
      setEnrollments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load enrollment ledger.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <ErrorState
          title="Error Loading Enrollments"
          message={error}
          onRetry={fetchEnrollments}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student Enrollments</h1>
        <p className="text-sm text-gray-500 mt-1">Audit active course registrations, completion times, and course completion percentages.</p>
      </div>

      {enrollments.length === 0 ? (
        <EmptyState
          title="No enrollments recorded"
          message="Course enrollment records will populate here as students enroll in classes."
          icon={GraduationCap}
        />
      ) : (
        <EnrollmentTable enrollments={enrollments} />
      )}
    </div>
  );
}
