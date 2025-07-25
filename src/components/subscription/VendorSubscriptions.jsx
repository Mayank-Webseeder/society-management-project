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
  FileText,
} from "lucide-react";
import { IoCloudDownloadOutline } from "react-icons/io5";

const VendorSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [paymentModal, setPaymentModal] = useState({
    open: false,
    payment: null,
    vendorInfo: null,
  });

  useEffect(() => {
    setSubscriptions([
      {
        _id: "sub1",
        vendorName: "ABC Enterprises",
        plan: "Pro Plan",
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
        _id: "sub2",
        vendorName: "XYZ Services",
        plan: "Basic Plan",
        startDate: "2024-07-01",
        endDate: "2024-08-01",
        subscriptionStatus: "Trial",
        paymentStatus: "Pending",
        paymentDetails: {
          transactionId: "TXN987654321",
          amount: "₹1,500",
          method: "Netbanking",
          status: "Pending",
          dateTime: "2024-07-01 12:00 PM",
        },
      },
      {
        _id: "sub3",
        vendorName: "Delta Corp",
        plan: "Premium Plan",
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
        _id: "sub4",
        vendorName: "Omega Solutions",
        plan: "Quarterly Plan",
        startDate: "2024-04-01",
        endDate: "2024-07-01",
        subscriptionStatus: "Expired",
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
        _id: "sub5",
        vendorName: "Nova Enterprises",
        plan: "Basic Plan",
        startDate: "2024-03-10",
        endDate: "2024-06-10",
        subscriptionStatus: "Cancelled",
        paymentStatus: "Failed",
        paymentDetails: {
          transactionId: "TXN9988776655",
          amount: "₹1,500",
          method: "UPI",
          status: "Failed",
          dateTime: "2024-03-10 11:00 AM",
        },
      },
    ]);
  }, []);

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

  const handleExtend = (id) => {
    const extendDays = window.prompt("Enter number of days to extend:");
    if (extendDays && !isNaN(extendDays)) {
      setSubscriptions(
        subscriptions.map((sub) => {
          if (sub._id === id) {
            const newEndDate = new Date(sub.endDate);
            newEndDate.setDate(newEndDate.getDate() + parseInt(extendDays));
            return { ...sub, endDate: newEndDate.toISOString().split("T")[0] };
          }
          return sub;
        })
      );
      alert(`Subscription extended by ${extendDays} days.`);
    }
  };

  const exportCSV = () => {
    //
  };

  const exportPDF = () => {
    //
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
              <th className="px-5 py-4 text-left">Plan</th>
              <th className="px-5 py-4 text-left">Start Date</th>
              <th className="px-5 py-4 text-left">End Date</th>
              <th className="px-5 py-4 text-left">Payment Status</th>
              <th className="px-5 py-4 text-left">Subscription Status</th>
              <th className="px-5 py-4 text-center">Payment Details</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((sub) => (
              <tr
                key={sub._id}
                className="border-b hover:bg-[#f3f6f3] transition group"
              >
                <td className="px-5 py-4 font-medium text-gray-800">
                  {sub.vendorName}
                </td>
                <td className="px-5 py-4">{sub.plan}</td>
                <td className="px-5 py-4">{sub.startDate}</td>
                <td className="px-5 py-4">{sub.endDate}</td>

                <td className="px-7 py-4">
                  <span
                    className={`text-sm font-medium ${
                      sub.paymentStatus === "Paid"
                        ? "text-green-700"
                        : sub.paymentStatus === "Pending"
                        ? "text-yellow-600 italic"
                        : sub.paymentStatus === "Failed"
                        ? "text-red-700"
                        : "text-gray-500"
                    }`}
                  >
                    {sub.paymentStatus}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
                      sub.subscriptionStatus === "Active"
                        ? "bg-green-100 text-green-700"
                        : sub.subscriptionStatus === "Trial"
                        ? "bg-blue-100 text-blue-700"
                        : sub.subscriptionStatus === "Expired"
                        ? "bg-yellow-100 text-yellow-700"
                        : sub.subscriptionStatus === "Cancelled"
                        ? "bg-red-100 text-red-700 line-through"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {sub.subscriptionStatus}
                  </span>
                </td>

                <td className="px-5 py-4 text-center">
                  <button
                    className="px-3 py-1 text-blue-700 rounded-full text-sm font-medium hover:underline transition flex items-center gap-1"
                    onClick={() =>
                      setPaymentModal({
                        open: true,
                        payment: sub.paymentDetails,
                        vendorInfo: {
                          vendorName: sub.vendorName,
                          plan: sub.plan,
                        },
                      })
                    }
                  >
                    <Eye className="w-3 h-3" /> View
                  </button>
                </td>

                <td className="px-5 py-4 text-center">
                  <div className="flex justify-center items-center gap-2 flex-nowrap">
                    <button
                      className="px-3 py-1 text-emerald-700 rounded-full text-sm font-medium hover:underline transition flex items-center gap-1"
                      onClick={() => handleExtend(sub._id)}
                    >
                      <Clock className="w-3 h-3" /> Extend
                    </button>
                    <button
                      className="px-3 py-1 text-red-700 rounded-full text-sm font-medium hover:underline transition flex items-center gap-1"
                      onClick={() => handleCancel(sub._id)}
                    >
                      <XCircle className="w-3 h-3" /> Cancel
                    </button>
                  </div>
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
                <p>
                  <strong>Plan:</strong> {paymentModal.vendorInfo?.plan}
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

            {/* Action Buttons */}
            <div className="flex justify-between gap-3 pt-3">
              <button
                onClick={exportPDF}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#57A6A1] text-white hover:bg-[#48938d] w-full justify-center shadow-sm"
              >
                <Download className="w-4 h-4" /> Download PDF
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
