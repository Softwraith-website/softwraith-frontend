import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp, BarChart3, PieChart as PieIcon, Landmark } from "lucide-react";

// Curated palette for pie chart cells
const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6"];

export default function AnalyticsCharts({ trendsData, categoryData }) {
  
  // Format month labels from e.g. "2026-05" to "May 26"
  const formatMonth = (monthStr) => {
    try {
      const [year, month] = monthStr.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1, 1);
      return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    } catch {
      return monthStr;
    }
  };

  // Custom tooltips for currency formatting
  const CurrencyTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 shadow-xl text-xs space-y-1">
          <p className="font-bold text-slate-400">{formatMonth(label)}</p>
          <p className="font-semibold text-emerald-400">
            Revenue: Rs {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltips for multi-bar counts
  const CountsTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 text-white rounded-lg p-2.5 shadow-xl text-xs space-y-1.5">
          <p className="font-bold text-slate-400">{formatMonth(label)}</p>
          <p className="font-semibold text-blue-400">
            Sign-ups: {payload[0].value}
          </p>
          {payload[1] && (
            <p className="font-semibold text-purple-400">
              Enrollments: {payload[1].value}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      {/* 1. Monthly Revenue Area Chart */}
      <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <Landmark className="w-4 h-4 text-indigo-600" />
          <div>
            <h3 className="text-sm font-bold text-gray-900 leading-none">Monthly Sales Revenue</h3>
            <p className="text-[10px] text-gray-400 mt-1 font-semibold">Total gross intake from paid course checkouts (INR)</p>
          </div>
        </div>

        <div className="h-72 w-full text-xs font-semibold text-gray-400">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tickFormatter={formatMonth} stroke="#94a3b8" tickLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} />
              <Tooltip content={<CurrencyTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Category Popularity Pie Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <PieIcon className="w-4 h-4 text-emerald-600" />
          <div>
            <h3 className="text-sm font-bold text-gray-900 leading-none">Category Distribution</h3>
            <p className="text-[10px] text-gray-400 mt-1 font-semibold">Active enrollments sorted by topic areas</p>
          </div>
        </div>

        <div className="h-56 w-full relative">
          {categoryData.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-450">
              No enrollment metrics available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip formatter={(value) => [`${value} Enrolled`, "Students"]} />
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Custom Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-[10px] font-bold text-gray-500 max-h-16 overflow-y-auto scrollbar-thin">
          {categoryData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-1.5 whitespace-nowrap">
              <span
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span>{entry.name} ({entry.value})</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. User Growth vs Enrollments Comparison */}
      <div className="xl:col-span-3 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <BarChart3 className="w-4 h-4 text-blue-650" />
          <div>
            <h3 className="text-sm font-bold text-gray-900 leading-none">Acquisition & Subscriptions</h3>
            <p className="text-[10px] text-gray-400 mt-1 font-semibold">Comparison between new user sign-ups and active course enrollments</p>
          </div>
        </div>

        <div className="h-64 w-full text-xs font-semibold text-gray-400">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tickFormatter={formatMonth} stroke="#94a3b8" tickLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} />
              <Tooltip content={<CountsTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} />
              <Bar dataKey="users" name="New Sign-ups" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={30} />
              <Bar dataKey="enrollments" name="Course Enrollments" fill="#a855f7" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
