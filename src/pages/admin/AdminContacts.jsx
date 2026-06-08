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
      setMsg("Contact updated");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to update contact");
    }
  };

  const deleteContact = async (contact) => {
    if (!confirm(`Delete contact from ${contact.name}?`)) return;
    try {
      await api.delete(`/contact/${contact._id}`);
      setContacts((prev) => prev.filter((item) => item._id !== contact._id));
      setMsg("Contact deleted");
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
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Contact Leads</h1>
      <p className="text-sm text-gray-500 mb-6">Track and close inbound website enquiries.</p>

      {msg && <div className="mb-4 px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg">{msg}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <div key={contact._id} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-gray-900">{contact.name}</h2>
                <div className="mt-2 space-y-1 text-sm text-gray-500">
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {contact.email}</p>
                  {contact.phone && <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {contact.phone}</p>}
                </div>
              </div>
              <button onClick={() => deleteContact(contact)} className="text-gray-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">{contact.message}</p>

            <div className="mt-4 flex items-center justify-between">
              <select
                value={contact.status}
                onChange={(e) => updateStatus(contact, e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
              >
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
              <span className="text-xs text-gray-400">
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
