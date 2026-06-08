import { Users, BookOpen, GraduationCap, DollarSign, Briefcase, Mail } from "lucide-react";

export default function StatsCards({ stats }) {
  if (!stats) return null;

  const cardConfig = [
    {
      label: "Total Users",
      value: stats.users ?? 0,
      icon: Users,
      colorClass: "bg-blue-50 text-blue-650 border-blue-100",
    },
    {
      label: "Total Courses",
      value: stats.courses ?? 0,
      icon: BookOpen,
      colorClass: "bg-purple-50 text-purple-650 border-purple-100",
    },
    {
      label: "Active Enrollments",
      value: stats.enrollments ?? 0,
      icon: GraduationCap,
      colorClass: "bg-green-50 text-green-650 border-green-100",
    },
    {
      label: "Total Revenue",
      value: `Rs ${stats.revenue ?? 0}`,
      icon: DollarSign,
      colorClass: "bg-emerald-50 text-emerald-650 border-emerald-100",
    },
    {
      label: "Service Requests",
      value: stats.services ?? 0,
      icon: Briefcase,
      colorClass: "bg-amber-50 text-amber-650 border-amber-100",
    },
    {
      label: "Contact Leads",
      value: stats.contacts ?? 0,
      icon: Mail,
      colorClass: "bg-rose-50 text-rose-650 border-rose-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cardConfig.map(({ label, value, icon: Icon, colorClass }) => (
        <div
          key={label}
          className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${colorClass} group-hover:scale-105 transition-transform duration-200`}>
              <Icon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
