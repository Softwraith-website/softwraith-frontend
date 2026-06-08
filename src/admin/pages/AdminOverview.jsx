import { useEffect, useState } from "react";
import { Users, BookOpen, Briefcase, Mail } from "lucide-react";
import adminService from "../services/adminService";
import StatsCards from "../components/StatsCards";
import AnalyticsCharts from "../components/AnalyticsCharts";
import Spinner from "../../components/ui/Spinner";
import ErrorState from "../../components/ui/ErrorState";

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setError("");
      setLoading(true);
      const [statsRes, activityRes, analyticsRes] = await Promise.all([
        adminService.getStats(),
        adminService.getActivity(),
        adminService.getAnalytics(),
      ]);
      setStats(statsRes);
      setActivity(activityRes);
      setAnalytics(analyticsRes);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
          title="Error Loading Dashboard"
          message={error}
          onRetry={loadData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <StatsCards stats={stats} />

      {/* Analytics Charts */}
      {analytics && (
        <AnalyticsCharts
          trendsData={analytics.monthlyTrends}
          categoryData={analytics.categoryDistribution}
        />
      )}

      {/* Activity Feeds */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Users */}
        <ActivityList
          title="Recent Registrations"
          icon={Users}
          items={activity?.users || []}
          render={(item) => (
            <>
              <span className="font-semibold text-gray-900">{item.name}</span>
              <span className="text-gray-450 text-xs truncate">{item.email}</span>
            </>
          )}
        />

        {/* Recent Courses */}
        <ActivityList
          title="Recent Courses"
          icon={BookOpen}
          items={activity?.courses || []}
          render={(item) => (
            <>
              <span className="font-semibold text-gray-900">{item.title}</span>
              <span className={`inline-flex px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider
                ${item.isPublished
                  ? "bg-green-50 text-green-700 border border-green-150"
                  : "bg-yellow-50 text-yellow-700 border border-yellow-150"
                }
              `}>
                {item.isPublished ? "Published" : "Draft"}
              </span>
            </>
          )}
        />

        {/* Service Requests */}
        <ActivityList
          title="Recent Service Requests"
          icon={Briefcase}
          items={activity?.services || []}
          render={(item) => (
            <>
              <span className="font-semibold text-gray-900">{item.title}</span>
              <span className="text-gray-450 text-xs">{item.userId?.email || item.status}</span>
            </>
          )}
        />

        {/* Contact Leads */}
        <ActivityList
          title="Recent Contact Inquiries"
          icon={Mail}
          items={activity?.contacts || []}
          render={(item) => (
            <>
              <span className="font-semibold text-gray-900">{item.name}</span>
              <span className="text-gray-450 text-xs truncate">{item.email}</span>
            </>
          )}
        />
      </div>
    </div>
  );
}

function ActivityList({ title, icon: Icon, items, render }) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <Icon className="w-4 h-4 text-indigo-500" />
        <h2 className="font-bold text-gray-800 text-sm tracking-tight">{title}</h2>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-gray-400 py-2">No recent records available.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between gap-4 text-sm border-b border-gray-50 pb-2.5 last:border-0 last:pb-0"
            >
              <span className="min-w-0 flex flex-col truncate">{render(item)}</span>
              <span className="text-[10px] text-gray-400 font-semibold shrink-0">
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
