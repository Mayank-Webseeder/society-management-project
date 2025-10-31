import React, { useEffect, useState } from "react";
import {
  Eye,
  XCircle,
  Clock,
  BadgeDollarSign,
  Banknote,
  CalendarCheck,
  CreditCard,
  Download,
  User,
  Calendar,
  CheckCircle2,
   CheckCircle,
  AlertCircle,
  XOctagon,
  TrendingUp,
  FileText,
  Trash2,
  Trash,
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SUBSCRIPTIONS_API = `${API_BASE_URL}/api/admin/all-subscriptions`;
const SUBSCRIPTION_HISTORY = `${API_BASE_URL}/api/admin/vendor-subscription-history`;
const VendorSubscriptions = () => {
   const [loading, setLoading] = useState(true);
   const [subscriptions, setSubscriptions] = useState([]);
    //  const [stats, setStats] = useState({ total: 0, active: 0, cancelled: 0 });
  const [error, setError] = useState("");
  const token = localStorage.getItem("token"); 
 

   useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);

        // ✅ Replace this with your actual API endpoint
       const response = await axios.get(SUBSCRIPTIONS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
          });

        if (response.data?.subscriptions) {
          setSubscriptions(response.data.subscriptions);
        } else if (Array.isArray(response.data)) {
          setSubscriptions(response.data);
        } else {
          setError("Invalid response format from server");
        }
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        setError("Failed to fetch data from server");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  useEffect(() => {
    const total = subscriptions.length;
    const active = subscriptions.filter((s) => s.subscriptionStatus === "Active").length;
    const cancelled = subscriptions.filter((s) => s.subscriptionStatus === "Cancelled").length;
    setStats({ total, active, cancelled });
  }, [subscriptions]);


  const [paymentModal, setPaymentModal] = useState({
    open: false,
    payment: null,
    vendorInfo: null,
    history: [],
  });

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const total = subscriptions.length;
    const active = subscriptions.filter(s => s.subscriptionStatus === "Active").length;
    const cancelled = subscriptions.filter(s => s.subscriptionStatus === "Cancelled").length;
    setStats({ total, active, cancelled });
  }, [subscriptions]);




 const fetchSubscriptionHistory = async (vendorId) => {
  try {
    const token = getToken(); // your stored JWT token

    const response = await axios.get(`${SUBSCRIPTION_HISTORY}/${vendorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming your API returns data like: { history: [...] }
    return response.data.history || [];
  } catch (error) {
    console.error("Error fetching subscription history:", error);
    return [];
  }
};


  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this subscription?")) {
      setSubscriptions(
        subscriptions.map((sub) =>
          sub._id === id ? { ...sub, subscriptionStatus: "Cancelled" } : sub
        )
      );
    }
  };

  const exportExcel = () => {
    const sanitizeCSVField = (value) => {
      if (value === null || value === undefined) return "";
      const str = value.toString();
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvRows = [];
    csvRows.push(
      ["Vendor Name", "Start Date", "End Date", "Payment Status", "Subscription Status"]
        .map(sanitizeCSVField)
        .join(",")
    );

    subscriptions.forEach((row) => {
      const startDate = row.startDate
        ? new Date(row.startDate).toISOString().split("T")[0]
        : "N/A";
      const endDate = row.endDate
        ? new Date(row.endDate).toISOString().split("T")[0]
        : "N/A";
      csvRows.push(
        [
          row.vendor?.name || row.vendorName || "N/A",
          startDate,
          endDate,
          row.paymentStatus || "N/A",
          row.subscriptionStatus || "N/A",
        ]
          .map(sanitizeCSVField)
          .join(",")
      );
    });

    const csvString = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "vendor_subscriptions_list.csv");
    link.click();
  };

  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-amber-600" />;
      case "Failed":
        return <XOctagon className="w-4 h-4 text-rose-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div >
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex flex-col   sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-xl font-bold ">
              Vendor Subscriptions
            </h1>

          </div>
          <button
            onClick={exportExcel}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-200"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            Export Data
          </button>
        </div>

        {/* Stats Cards */}
{/* Stats Cards */}
<div className="grid grid-cols-1 max-w-4xl sm:grid-cols-3 gap-4 sm:gap-6">
  {[
    { label: "Total Subscriptions", value: stats.total, icon: TrendingUp, bg: "bg-blue-200" },
    { label: "Active Plans", value: stats.active, icon: CheckCircle2, bg: "bg-emerald-200" },
    { label: "Cancelled", value: stats.cancelled, icon: XCircle, bg: "bg-rose-200" },
  ].map(({ label, value, icon: Icon, bg }, index) => (
    <div
      key={index}
      className={`${bg}   rounded-2xl p-4  shadow text-black flex items-center justify-between min-h-[20px]`}
    >
      <div>
        <p className="text-sm opacity-90">{label}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className="bg-gray-50 p-3 rounded-full">
        <Icon className="w-6 h-6 text-black" />
      </div>
    </div>
  ))}
</div>



        {/* Desktop Table */}
        <div className="hidden mt-5 lg:block bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto h-[50vh]">
            <table className="min-w-full divide-y border  divide-slate-200">
              <thead>
                <tr className="bg-[#E5E7EB] ">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Vendor Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Duration
                  </th>
                  {/* <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Payment
                  </th> */}
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y   divide-slate-100">
                {subscriptions.map((sub, index) => (
                  <tr
                    key={sub._id + "-" + index}
                    onClick={async () => {
          const vendorId = sub.vendorId || sub.vendor || sub._id;
          const historyData = await fetchSubscriptionHistory(vendorId);
          setPaymentModal({
            open: true,
            payment: sub.paymentDetails,
            vendorInfo: { vendorName: sub.vendor?.name || sub.vendorName },
            history: historyData,
          });
        }}
                    className="hover:bg-gradient-to-r  hover:from-slate-50 hover:to-emerald-50/30 transition-all duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                    
                        <div>
                          <p className="font-semibold text-slate-900">
                            {sub.vendor?.name || sub.vendorName || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar className="w-4 h-4 text-emerald-600" />
                          <span>
                            {sub.startDate
                              ? new Date(sub.startDate).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar className="w-4 h-4 text-rose-600" />
                          <span>
                            {sub.endDate
                              ? new Date(sub.endDate).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getPaymentStatusIcon(sub.paymentStatus)}
                        <span
                          className={`text-sm font-semibold ${
                            sub.paymentStatus === "Paid"
                              ? "text-emerald-700"
                              : sub.paymentStatus === "Pending"
                              ? "text-amber-700"
                              : "text-rose-700"
                          }`}
                        >
                          {sub.paymentStatus || "N/A"}
                        </span>
                      </div>
                    </td> */}
                <td className="px-6 py-4">
  <span
    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
      sub.subscriptionStatus === "Active"
        ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200"
        : sub.subscriptionStatus === "Pending"
        ? "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200"
        : "bg-rose-100 text-rose-800 ring-1 ring-rose-200"
    }`}
  >
    {sub.subscriptionStatus === "Active" && (
      <CheckCircle className="w-3 h-3 text-emerald-500 animate-pulse" />
    )}
    {sub.subscriptionStatus === "Pending" && (
      <Clock className="w-3 h-3 text-yellow-500 animate-pulse" />
    )}
    {sub.subscriptionStatus === "Cancelled" && (
      <XCircle className="w-3 h-3 text-rose-500" />
    )}

    {sub.subscriptionStatus || "N/A"}
  </span>
</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                    
                        <button
                          className="p-2 rounded-lg  text-rose-700 hover:bg-rose-100 hover:scale-110 transition-all duration-200"
                          onClick={() => handleCancel(sub._id)}
                        >
                        <Trash2  className="w-4 h-4"></Trash2>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="block lg:hidden space-y-4">
          {subscriptions.map((sub) => (
            <div
              key={sub._id}
              className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-4 border-b border-emerald-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <User className="w-6 h-6 text-emerald-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {sub.vendor?.name || sub.vendorName || "N/A"}
                      </h3>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                      sub.subscriptionStatus === "Active"
                        ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200"
                        : "bg-rose-100 text-rose-800 ring-1 ring-rose-200"
                    }`}
                  >
                    {sub.subscriptionStatus === "Active" ? (
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                    )}
                    {sub.subscriptionStatus}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Start Date
                    </p>
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      {sub.startDate
                        ? new Date(sub.startDate).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      End Date
                    </p>
                    <div className="flex items-center gap-2 text-slate-900 font-semibold">
                      <Calendar className="w-4 h-4 text-rose-600" />
                      {sub.endDate
                        ? new Date(sub.endDate).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    Payment Status
                  </p>
                  <div className="flex items-center gap-2">
                    {getPaymentStatusIcon(sub.paymentStatus)}
                    <span
                      className={`text-sm font-bold ${
                        sub.paymentStatus === "Paid"
                          ? "text-emerald-700"
                          : sub.paymentStatus === "Pending"
                          ? "text-amber-700"
                          : "text-rose-700"
                      }`}
                    >
                      {sub.paymentStatus || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all duration-200"
                    onClick={async () => {
                      const vendorId = sub.vendorId || sub.vendor || sub._id;
                      const historyData = await fetchSubscriptionHistory(vendorId);
                      setPaymentModal({
                        open: true,
                        payment: sub.paymentDetails,
                        vendorInfo: { vendorName: sub.vendorName },
                        history: historyData,
                      });
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 font-semibold hover:bg-rose-100 border border-rose-200 hover:scale-105 transition-all duration-200"
                    onClick={() => handleCancel(sub._id)}
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Modal */}
        {paymentModal.open && (
          <div className="fixed top-0 inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Payment Details</h3>
                      <p className="text-emerald-50 text-sm">
                        {paymentModal.vendorInfo?.vendorName}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setPaymentModal({
                        open: false,
                        payment: null,
                        vendorInfo: null,
                        history: [],
                      })
                    }
                    className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <XCircle className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                {/* Current Payment Info */}
                <div className="bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-2xl p-5 space-y-4 border border-slate-200">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <BadgeDollarSign className="w-5 h-5 text-emerald-600" />
                    Current Payment Information
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Banknote className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-medium">Amount</p>
                        <p className="text-lg font-bold text-slate-900">
                          {/* {paymentModal.payment.amount} */}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-medium">Payment Method</p>
                        <p className="text-lg font-bold text-slate-900">
                          {/* {paymentModal.payment.method} */}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <CalendarCheck className="w-5 h-5 text-purple-700" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-medium">Date & Time</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {/* {paymentModal.payment.dateTime} */}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      {/* <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        paymentModal.payment.status === "Paid"
                          ? "bg-emerald-100"
                          : paymentModal.payment.status === "Pending"
                          ? "bg-amber-100"
                          : "bg-rose-100"
                      }`}>
                        {getPaymentStatusIcon(paymentModal.payment.status)}
                      </div> */}
                      <div>
                        {/* <p className="text-xs text-slate-600 font-medium">Status</p>
                        <p className={`text-sm font-bold ${
                          paymentModal.payment.status === "Paid"
                            ? "text-emerald-700"
                            : paymentModal.payment.status === "Pending"
                            ? "text-amber-700"
                            : "text-rose-700"
                        }`}>
                          {paymentModal.payment.status}
                        </p> */}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-xs text-slate-600 font-medium mb-1">Transaction ID</p>
                    <p className="text-sm font-mono font-semibold text-slate-900 bg-white px-3 py-2 rounded-lg border border-slate-200">
                      {/* {paymentModal.payment.transactionId} */}
                    </p>
                  </div>
                </div>

                {/* Subscription History */}
                {paymentModal.history.length > 0 && (
                  <div>
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-slate-600" />
                      Subscription History
                    </h4>
                    <div className="space-y-3">
                      {paymentModal.history.map((item) => (
                        <div
                          key={item._id}
                          className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-bold text-slate-900">
                              ₹{item.price || item.planPrice}
                            </span>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                  item.subscriptionStatus === "Active"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-rose-100 text-rose-800"
                                }`}
                              >
                                {item.subscriptionStatus === "Active" ? (
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                ) : (
                                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                )}
                                {item.subscriptionStatus}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-slate-500 text-xs mb-1">Start Date</p>
                              <p className="text-slate-900 font-semibold">
                                {new Date(item.startDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-500 text-xs mb-1">End Date</p>
                              <p className="text-slate-900 font-semibold">
                                {new Date(item.endDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-slate-100">
                            <div className="flex items-center gap-2">
                              {getPaymentStatusIcon(item.paymentStatus)}
                              <span className="text-xs text-slate-600">Payment:</span>
                              <span
                                className={`text-sm font-bold ${
                                  item.paymentStatus === "Paid"
                                    ? "text-emerald-700"
                                    : item.paymentStatus === "Pending"
                                    ? "text-amber-700"
                                    : "text-rose-700"
                                }`}
                              >
                                {item.paymentStatus}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => {
                    // PDF export logic would go here
                    alert("PDF export functionality");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 hover:scale-105 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  className="px-6 py-3 rounded-xl bg-white text-slate-700 font-semibold border border-slate-300 hover:bg-slate-50 hover:scale-105 transition-all duration-200"
                  onClick={() =>
                    setPaymentModal({
                      open: false,
                      payment: null,
                      vendorInfo: null,
                      history: [],
                    })
                  }
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorSubscriptions;