import { useEffect, useState } from "react";
import { CreditCard, Calendar, CheckCircle2, AlertCircle, HelpCircle, Loader2 } from "lucide-react";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await api.get("/payments/my");
        setPayments(data);
      } catch (err) {
        console.error("Failed to load payment history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
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
          <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-yellow-200">
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
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
          <p className="text-gray-500 text-sm mt-1">
            Review your purchase history and course receipts.
          </p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
          <CreditCard className="w-5 h-5 text-blue-600" />
        </div>
      </div>

      {payments.length === 0 ? (
        <EmptyState
          title="No Transactions Found"
          message="You haven't purchased any paid courses yet. Enrolled free courses won't appear here."
          icon={CreditCard}
        />
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4 pl-6">Course Name</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 pr-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 pl-6 font-semibold text-gray-900">
                      {payment.course?.title || "Deleted Course"}
                    </td>
                    <td className="p-4 font-bold text-gray-900">
                      Rs {payment.amount}
                    </td>
                    <td className="p-4 font-mono text-xs text-gray-400">
                      {payment.razorpayPaymentId || "—"}
                    </td>
                    <td className="p-4">
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
