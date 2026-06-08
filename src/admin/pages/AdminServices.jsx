import { useEffect, useState } from "react";
import { Trash2, Wrench } from "lucide-react";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

const statuses = ["pending", "in_progress", "completed", "cancelled"];

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/services");
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load service requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (service, status) => {
    try {
      const res = await api.put(`/services/${service._id}`, { status });
      setServices((prev) => prev.map((item) => item._id === service._id ? res.data : item));
      setMsg("Service request status updated successfully.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to update service request");
    }
  };

  const deleteService = async (service) => {
    if (!confirm(`Delete service request "${service.title}"?`)) return;
    try {
      await api.delete(`/services/${service._id}`);
      setServices((prev) => prev.filter((item) => item._id !== service._id));
      setMsg("Service request deleted successfully.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to delete service request");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <ErrorState title="Error loading requests" message={error} onRetry={load} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Service Requests</h1>
        <p className="text-sm text-gray-500 mt-1">Manage client/student service requests, consultations, and delivery status.</p>
      </div>

      {msg && <div className="mb-4 px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg">{msg}</div>}

      {services.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-5 py-3.5 pl-6">Request</th>
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3 pl-6">
                      <p className="font-semibold text-gray-900">{service.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 max-w-sm line-clamp-1">{service.description || "No description provided"}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-600 text-sm">
                      <p className="font-semibold text-gray-900">{service.userId?.name || "Unknown Student"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{service.userId?.email || ""}</p>
                    </td>
                    <td className="px-5 py-3">
                      <select
                        value={service.status}
                        onChange={(e) => updateStatus(service, e.target.value)}
                        className="border border-gray-250 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:border-indigo-500 transition font-medium"
                      >
                        {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-3 pr-6 text-right">
                      <button onClick={() => deleteService(service)} className="text-gray-450 hover:text-red-500 transition p-1 rounded-md hover:bg-gray-50 border border-gray-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {services.length === 0 && (
        <EmptyState
          title="No service requests yet"
          message="Service requests submitted by students will appear here."
          icon={Wrench}
        />
      )}
    </div>
  );
}
