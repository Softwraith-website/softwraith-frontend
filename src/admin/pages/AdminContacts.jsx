import { useEffect, useState } from "react";
import { Mail, Phone, Trash2, MailQuestion } from "lucide-react";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

const statuses = ["new", "contacted", "closed"];

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/contact");
      setContacts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (contact, status) => {
    try {
      const res = await api.put(`/contact/${contact._id}`, { status });
      setContacts((prev) => prev.map((item) => item._id === contact._id ? res.data : item));
      setMsg("Contact status updated successfully.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to update contact");
    }
  };

  const deleteContact = async (contact) => {
    if (!confirm(`Delete contact lead from ${contact.name}?`)) return;
    try {
      await api.delete(`/contact/${contact._id}`);
      setContacts((prev) => prev.filter((item) => item._id !== contact._id));
      setMsg("Contact lead deleted successfully.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to delete contact");
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
        <ErrorState title="Error loading contacts" message={error} onRetry={load} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Contact Leads</h1>
        <p className="text-sm text-gray-500 mt-1">Track and close inbound website sales enquiries.</p>
      </div>

      {msg && <div className="mb-4 px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg">{msg}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <div key={contact._id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-gray-900">{contact.name}</h2>
                <div className="mt-2 space-y-1 text-xs text-gray-500">
                  <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {contact.email}</p>
                  {contact.phone && <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {contact.phone}</p>}
                </div>
              </div>
              <button onClick={() => deleteContact(contact)} className="text-gray-400 hover:text-red-500 transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-gray-650 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">{contact.message}</p>

            <div className="flex items-center justify-between">
              <select
                value={contact.status}
                onChange={(e) => updateStatus(contact, e.target.value)}
                className="border border-gray-250 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:border-indigo-500 transition"
              >
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <EmptyState
          title="No contact leads yet"
          message="When users submit inquiries through the contact form, they will appear here."
          icon={MailQuestion}
        />
      )}
    </div>
  );
}
