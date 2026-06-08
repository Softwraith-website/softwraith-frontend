import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

const emptyForm = { title: "", description: "" };

export default function Services() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/services/my");
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setMessage("");
      await api.post("/services", form);
      setForm(emptyForm);
      await load();
      setMessage("Service request submitted");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit service request");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold mb-6">My Services</h1>

        {message && (
          <p className="mb-4 rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-700">
            {message}
          </p>
        )}

        <form onSubmit={submit} className="bg-white border rounded-lg p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Service title"
              required
              className="border rounded-lg px-3 py-2 text-sm"
            />
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Short description"
              className="border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <button
            disabled={submitting}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Request Service"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Requests</h2>

        {services.length === 0 && (
          <EmptyState
            title="No Services Requested"
            message="Need help with a software project or customization? Submit a request above."
            icon={Wrench}
          />
        )}

        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white border rounded-lg p-5 flex justify-between items-center"
            >
              <div>
                <h2 className="font-medium">{service.title}</h2>
                <p className="text-sm text-gray-500">{service.description || "Service Request"}</p>
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
      </section>
    </div>
  );
}
