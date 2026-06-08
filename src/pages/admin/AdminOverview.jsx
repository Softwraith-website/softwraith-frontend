import { useEffect, useState } from "react";
import { BookOpen, Briefcase, GraduationCap, Mail, Users, DollarSign } from "lucide-react";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";
import ErrorState from "../../components/ui/ErrorState";

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setError("");
      setLoading(true);
      const [statsRes, activityRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/activity"),
      ]);
      setStats(statsRes.data);
      setActivity(activityRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
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
      <div className="py-12">
        <ErrorState
          title="Error Loading Stats"
          message={error}
          onRetry={load}
        />
      </div>
    );
  }

  const cards = [
    { label: "Total Users", value: stats.users, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Total Courses", value: stats.courses, icon: BookOpen, color: "bg-purple-50 text-purple-600" },
    { label: "Enrollments", value: stats.enrollments, icon: GraduationCap, color: "bg-green-50 text-green-600" },
    { label: "Total Revenue", value: `Rs ${stats.revenue || 0}`, icon: DollarSign, color: "bg-emerald-50 text-emerald-600" },
    { label: "Service Requests", value: stats.services, icon: Briefcase, color: "bg-amber-50 text-amber-600" },
    { label: "Contact Leads", value: stats.contacts, icon: Mail, color: "bg-rose-50 text-rose-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{label}</span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-8">
        <ActivityList title="Recent Users" items={activity.users} render={(item) => (
          <>
            <span className="font-medium text-gray-900">{item.name}</span>
            <span className="text-gray-500">{item.email}</span>
          </>
        )} />
        <ActivityList title="Recent Courses" items={activity.courses} render={(item) => (
          <>
            <span className="font-medium text-gray-900">{item.title}</span>
            <span className={item.isPublished ? "text-green-600" : "text-yellow-600"}>
              {item.isPublished ? "Published" : "Draft"}
            </span>
          </>
        )} />
        <ActivityList title="Recent Services" items={activity.services} render={(item) => (
          <>
            <span className="font-medium text-gray-900">{item.title}</span>
            <span className="text-gray-500">{item.userId?.email || item.status}</span>
          </>
        )} />
        <ActivityList title="Recent Contacts" items={activity.contacts} render={(item) => (
          <>
            <span className="font-medium text-gray-900">{item.name}</span>
            <span className="text-gray-500">{item.email}</span>
          </>
        )} />
      </div>
    </div>
  );
}

function ActivityList({ title, items, render }) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5">
      <h2 className="font-semibold text-gray-900 mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400">No activity yet.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item._id} className="flex items-center justify-between gap-4 text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <span className="min-w-0 flex flex-col truncate">{render(item)}</span>
              <span className="text-xs text-gray-400 shrink-0">
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
