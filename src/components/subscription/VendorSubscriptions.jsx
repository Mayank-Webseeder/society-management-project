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
} from "lucide-react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import axios from "axios";
import { getToken } from "../../utils/Token";
import jsPDF from "jspdf";
import "jspdf-autotable";

const VendorSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [paymentModal, setPaymentModal] = useState({
    open: false,
    payment: null,
    vendorInfo: null,
    history: [],
  });

  useEffect(() => {
    setSubscriptions([
      {
        _id: "687f2d0fb425015d9dde6678",
        vendorName: "ABC Enterprises",
        startDate: "2024-06-01",
        endDate: "2024-09-01",
        subscriptionStatus: "Active",
        paymentStatus: "Paid",
        paymentDetails: {
          transactionId: "TXN123456789",
          amount: "₹5,000",
          method: "UPI",
          status: "Paid",
          dateTime: "2024-06-01 10:30 AM",
        },
      },
      {
        _id: "687f2d0fb425015d9dde6679",
        vendorName: "XYZ Services",
        startDate: "2024-07-01",
        endDate: "2024-08-01",
        subscriptionStatus: "Cancelled",
        paymentStatus: "Unpaid",
        paymentDetails: {
          transactionId: "TXN987654321",
          amount: "₹1,500",
          method: "Netbanking",
          status: "Pending",
          dateTime: "2024-07-01 12:00 PM",
        },
      },
      {
        _id: "687f2d0fb425015d9dde6680",
        vendorName: "Delta Corp",
        startDate: "2024-05-15",
        endDate: "2025-05-15",
        subscriptionStatus: "Active",
        paymentStatus: "Paid",
        paymentDetails: {
          transactionId: "TXN1122334455",
          amount: "₹12,000",
          method: "Credit Card",
          status: "Paid",
          dateTime: "2024-05-15 09:45 AM",
        },
      },
      {
        _id: "687f2d0fb425015d9dde6681",
        vendorName: "Omega Solutions",
        startDate: "2024-04-01",
        endDate: "2024-07-01",
        subscriptionStatus: "Cancelled",
        paymentStatus: "Failed",
        paymentDetails: {
          transactionId: "TXN5566778899",
          amount: "₹3,000",
          method: "Debit Card",
          status: "Failed",
          dateTime: "2024-04-01 02:20 PM",
        },
      },
      {
        _id: "687f2d0fb425015d9dde6682",
        vendorName: "Nova Enterprises",
        startDate: "2024-03-10",
        endDate: "2024-06-10",
        subscriptionStatus: "Active",
        paymentStatus: "Paid",
        paymentDetails: {
          transactionId: "TXN9988776655",
          amount: "₹1,500",
          method: "UPI",
          status: "Failed",
          dateTime: "2024-03-10 11:00 AM",
        },
      },
    ]);

    const token = getToken();

    const fetchSubscription = async () => {
      try {
        const res = await axios.get(
          "https://society-services-backend.onrender.com/api/admin/all-subscriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const apiData = res.data.subscriptions || [];

        setSubscriptions((prev) => {
          const merged = [...prev];
          apiData.forEach((apiSub) => {
            const exists = merged.find((m) => m._id === apiSub._id);
            if (!exists) merged.push(apiSub);
          });
          return merged;
        });
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
      }
    };

    fetchSubscription();
  }, []);

  const fetchSubscriptionHistory = async (vendorId) => {
    try {
      const token = getToken();
      const res = await axios.get(
        `https://society-services-backend.onrender.com/api/admin/vendor-subscription-history/${vendorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.history || [];
    } catch (error) {
      console.error("Failed to fetch subscription history:", error);
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
      alert("Subscription marked as Cancelled.");
    }
  };

  const exportCSV = () => {
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
      [
        "Vendor Name",
        "Start Date",
        "End Date",
        "Payment Status",
        "Subscription Status",
      ]
        .map(sanitizeCSVField)
        .join(", ")
    );

    subscriptions.forEach((row) => {
      csvRows.push(
        [
          row.vendorName,
          row.startDate,
          row.endDate,
          row.paymentStatus,
          row.subscriptionStatus,
        ]
          .map(sanitizeCSVField)
          .join(", ")
      );
    });

    // CSV string banake download karna
    const csvString = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "vendor_subscriptions_list.csv");
    link.click();
  };

  const exportPDF = () => {
    if (!paymentModal.payment || !paymentModal.vendorInfo) return;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Payment Details", 14, 20);

    // Vendor & Payment info
    doc.setFontSize(12);
    doc.text(`Vendor: ${paymentModal.vendorInfo.vendorName}`, 14, 30);
    const cleanAmount = paymentModal.payment.amount.replace(/[^\d.,]/g, "");
    doc.text(`Amount: Rs. ${cleanAmount}`, 14, 40);
    doc.text(`Method: ${paymentModal.payment.method}`, 14, 50);
    doc.text(`Date & Time: ${paymentModal.payment.dateTime}`, 14, 60);
    doc.text(`Transaction ID: ${paymentModal.payment.transactionId}`, 14, 70);
    doc.text(`Payment Status: ${paymentModal.payment.status}`, 14, 80);

    // Subscription history table
    if (paymentModal.history?.length > 0) {
      const tableColumn = ["Price", "Status", "Start Date", "End Date"];
      const tableRows = paymentModal.history.map((item) => [
        `Rs.${item.price}`,
        item.isActive ? "Active" : "Expired",
        new Date(item.startDate).toLocaleDateString(),
        new Date(item.endDate).toLocaleDateString(),
      ]);

      doc.autoTable({
        startY: 90,
        head: [tableColumn],
        body: tableRows,
        theme: "grid",
      });
    } else {
      doc.text("No past subscription history available.", 14, 90);
    }

    doc.save(`${paymentModal.vendorInfo.vendorName}_payment_details.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800 px-8">
          Vendor Subscriptions
        </h3>
        <button
          onClick={exportCSV}
          className="mr-6 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#44a59f] text-gray-800 hover:bg-[#76bcb8] border border-[#3D8D7A] transition"
        >
          <IoCloudDownloadOutline className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <thead className="bg-[#e3f3e7] text-green-700 text-md">
            <tr>
              <th className="px-5 py-4 text-left">Vendor Name</th>
              <th className="px-5 py-4 text-left">Start Date</th>
              <th className="px-5 py-4 text-left">End Date</th>
              <th className="px-5 py-4 text-left">Payment Status</th>
              <th className="px-5 py-4 text-left">Subscription Status</th>
              <th className="px-5 py-4 text-center">Payment Details</th>
              <th className="px-5 py-4 text-center">Cancel</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((sub, index) => (
              <tr
                key={sub._id + "-" + index}
                className="border-b hover:bg-[#f3f6f3] transition group"
              >
                <td className="px-5 py-4 font-medium text-gray-800">
                  {sub.vendorName || "N/A"}
                </td>
                <td className="px-5 py-4">{sub.startDate || "N/A"}</td>
                <td className="px-5 py-4">{sub.endDate || "N/A"}</td>
                <td className="px-7 py-4">
                  <span
                    className={`text-sm font-medium ${
                      sub.paymentStatus === "Paid"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {sub.paymentStatus || "N/A"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
                      sub.subscriptionStatus === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700 line-through"
                    }`}
                  >
                    {sub.subscriptionStatus}
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button
                    className="px-3 py-1 text-blue-700 rounded-full text-sm font-medium hover:underline transition flex items-center gap-1"
                    onClick={async () => {
                      const vendorId = sub.vendorId || sub.vendor || sub._id;
                      const historyData = await fetchSubscriptionHistory(
                        vendorId
                      );
                      setPaymentModal({
                        open: true,
                        payment: sub.paymentDetails,
                        vendorInfo: { vendorName: sub.vendorName },
                        history: historyData,
                      });
                    }}
                  >
                    <Eye className="w-3 h-3" /> View
                  </button>
                </td>
                <td className="px-5 py-4 text-center">
                  <button
                    className="px-3 py-1 text-red-700 rounded-full text-sm font-medium hover:underline transition flex items-center gap-1"
                    onClick={() => handleCancel(sub._id)}
                  >
                    <XCircle className="w-3 h-3" /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paymentModal.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 space-y-5 shadow-xl border border-[#e3f3e7]">
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <BadgeDollarSign className="w-6 h-6 text-green-700" /> Payment
                Details
              </h3>
              <button
                onClick={() =>
                  setPaymentModal({
                    open: false,
                    payment: null,
                    vendorInfo: null,
                  })
                }
                className="text-gray-500 hover:text-[#164B60] transition"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Vendor Info */}
            <div className="text-gray-700 space-y-2 text-sm">
              <div className="flex justify-between">
                <p>
                  <strong>Vendor:</strong> {paymentModal.vendorInfo?.vendorName}
                </p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-3 text-[15px] text-gray-800 bg-[#f9fdf9] p-4 rounded-lg border border-[#e6f3ea]">
              <p className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-emerald-700" />
                <span>
                  <strong>Amount:</strong> {paymentModal.payment.amount}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-700" />
                <span>
                  <strong>Method:</strong> {paymentModal.payment.method}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-indigo-700" />
                <span>
                  <strong>Date & Time:</strong> {paymentModal.payment.dateTime}
                </span>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <span className="font-semibold">Transaction ID:</span>{" "}
                {paymentModal.payment.transactionId}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Payment Status:</span>
                <span
                  className={`ml-1 inline-block px-2 rounded-full font-medium ${
                    paymentModal.payment.status === "Paid"
                      ? " text-green-700"
                      : paymentModal.payment.status === "Pending"
                      ? " text-yellow-700 italic"
                      : " text-red-700"
                  }`}
                >
                  {paymentModal.payment.status}
                </span>
              </p>
            </div>

            {/* --- Past Subscriptions Section --- */}
            {paymentModal.history?.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  Past Subscription History
                </h4>
                <div className="space-y-2 max-h-56 overflow-auto">
                  {paymentModal.history.map((item) => (
                    <div
                      key={item._id}
                      className="p-3 border border-[#e8f1ec] rounded-lg bg-[#f5fbf7] text-sm text-gray-700"
                    >
                      <div className="flex justify-between">
                        <span>
                          <strong>Price:</strong> ₹{item.price}
                        </span>
                        <span>
                          <strong>Status:</strong>{" "}
                          <span
                            className={`${
                              item.isActive
                                ? "text-green-700"
                                : "text-gray-500 italic"
                            }`}
                          >
                            {item.isActive ? "Active" : "Expired"}
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 pt-1">
                        <span>
                          <strong>Start:</strong>{" "}
                          {new Date(item.startDate).toLocaleDateString()}
                        </span>
                        <span>
                          <strong>End:</strong>{" "}
                          {new Date(item.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between gap-3 pt-3">
              <button
                onClick={exportPDF}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#57A6A1] text-white hover:bg-[#48938d] w-full justify-center shadow-sm"
              >
                <Download onClick={exportPDF} className="w-4 h-4" /> Download
                PDF
              </button>
              <button
                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 w-full justify-center"
                onClick={() =>
                  setPaymentModal({
                    open: false,
                    payment: null,
                    vendorInfo: null,
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
  );
};

export default VendorSubscriptions;
