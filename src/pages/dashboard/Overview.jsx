import { useEffect, useState } from "react";
import api, { authFetch } from "../../utils/api";


export default function Overview() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    trainings: 0,
    services: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const enrollments = await authFetch("/api/enrollments/my");
      const services = await authFetch("/api/services/my");

      setStats({
        trainings: Array.isArray(enrollments) ? enrollments.length : 0,
        services: Array.isArray(services) ? services.length : 0,
      });

      setLoading(false);
    }

    loadStats();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading overview...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Trainings */}
        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-500">Trainings Enrolled</p>
          <h2 className="text-3xl font-semibold mt-2">
            {stats.trainings}
          </h2>
        </div>

        {/* Services */}
        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-500">Services Requested</p>
          <h2 className="text-3xl font-semibold mt-2">
            {stats.services}
          </h2>
        </div>

        {/* Account */}
        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-500">Account Status</p>
          <h2 className="text-xl font-semibold mt-2 text-green-600">
            Active
          </h2>
        </div>
      </div>
    </div>
  );
}
