import { useEffect, useState } from "react";
import api, { authFetch } from "../../utils/api";


export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      const data = await authFetch("/api/services/my");
      setServices(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    loadServices();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading services...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">My Services</h1>

      {services.length === 0 && (
        <p className="text-gray-500">No services requested yet.</p>
      )}

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white border rounded-lg p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="font-medium">
                {service.title}
              </h2>
              <p className="text-sm text-gray-500">
                Service Request
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                service.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {service.status || "pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
