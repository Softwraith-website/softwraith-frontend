import { useEffect, useState } from "react";
import { CreditCard, DollarSign, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await api.get("/payments/admin/all");
        setPayments(data);
      } catch (err) {
        console.error("Failed to load payments for admin:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const completedCount = payments.filter((p) => p.status === "completed").length;
  const successRate = payments.length > 0
    ? Math.round((completedCount / payments.length) * 100)
    : 0;

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 bg-green-50 text-green-755 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-250">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Success
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-red-200">
            <AlertCircle className="w-3.5 h-3.5" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-750 text-xs font-semibold px-2.5 py-1 rounded-full border border-yellow-250">
            <HelpCircle className="w-3.5 h-3.5" />
            Pending
          </span>
        );
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Payments</h1>
        <p className="text-gray-500 text-sm mt-1">
          Monitor real-time checkout metrics, transaction status, and payment gateway logs.
        </p>
      </div>

      {/* Stats summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-250/60 rounded-xl p-5 shadow-sm flex items-center gap-5 hover:border-gray-300 transition-colors">
          <div className="h-11 w-11 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shrink-0">
            <DollarSign className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Sales Revenue</p>
            <h2 className="text-xl font-bold text-gray-900 mt-0.5">Rs {totalRevenue}</h2>
          </div>
        </div>

        <div className="bg-white border border-gray-250/60 rounded-xl p-5 shadow-sm flex items-center gap-5 hover:border-gray-300 transition-colors">
          <div className="h-11 w-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <CreditCard className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Transactions</p>
            <h2 className="text-xl font-bold text-gray-900 mt-0.5">{payments.length}</h2>
          </div>
        </div>

        <div className="bg-white border border-gray-250/60 rounded-xl p-5 shadow-sm flex items-center gap-5 hover:border-gray-300 transition-colors">
          <div className="h-11 w-11 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <CheckCircle2 className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Gateway Success Rate</p>
            <h2 className="text-xl font-bold text-gray-900 mt-0.5">{successRate}%</h2>
          </div>
        </div>
      </div>

      {/* Transaction list */}
      {payments.length === 0 ? (
        <EmptyState
          title="No Payments Logged"
          message="Payment transactions will appear here once users attempt to buy courses."
          icon={CreditCard}
        />
      ) : (
        <div className="bg-white border border-gray-250/60 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4 pl-6">Student</th>
                  <th className="p-4">Course Details</th>
                  <th className="p-4">Amount Paid</th>
                  <th className="p-4">Reference ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 pr-6 text-right">Gateway Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-55/50 transition">
                    <td className="p-4 pl-6">
                      <div className="font-semibold text-gray-905">{payment.user?.name || "Deleted User"}</div>
                      <div className="text-xs text-gray-400">{payment.user?.email || "—"}</div>
                    </td>
                    <td className="p-4 font-semibold text-gray-900">
                      {payment.course?.title || "Deleted Course"}
                    </td>
                    <td className="p-4 font-bold text-gray-900">
                      Rs {payment.amount}
                    </td>
                    <td className="p-4 font-mono text-xs text-gray-400">
                      {payment.razorpayPaymentId || "—"}
                    </td>
                    <td className="p-4 text-gray-450 font-medium">
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      {getStatusBadge(payment.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
