import React, { useEffect, useState } from "react";
import { Eye, XCircle, Clock } from "lucide-react";

const VendorSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);

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
      },
      {
        _id: "sub2",
        vendorName: "XYZ Services",
        plan: "Basic Plan",
        startDate: "2024-07-01",
        endDate: "2024-08-01",
        subscriptionStatus: "Trial",
        paymentStatus: "Pending",
      },
      {
        _id: "sub3",
        vendorName: "Delta Corp",
        plan: "Premium Plan",
        startDate: "2024-05-15",
        endDate: "2025-05-15",
        subscriptionStatus: "Active",
        paymentStatus: "Paid",
      },
      {
        _id: "sub4",
        vendorName: "Omega Solutions",
        plan: "Quarterly Plan",
        startDate: "2024-04-01",
        endDate: "2024-07-01",
        subscriptionStatus: "Expired",
        paymentStatus: "Failed",
      },
      {
        _id: "sub5",
        vendorName: "Nova Enterprises",
        plan: "Basic Plan",
        startDate: "2024-03-10",
        endDate: "2024-06-10",
        subscriptionStatus: "Cancelled",
        paymentStatus: "Failed",
      },
    ]);
  }, []);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this subscription?")) {
      setSubscriptions(subscriptions.map((sub) =>
        sub._id === id ? { ...sub, subscriptionStatus: "Cancelled" } : sub
      ));
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

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-black-800 inline-block px-4 py-2 rounded-lg">
        Vendor Subscriptions
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <thead className="bg-[#e3f3e7] text-green-700 text-md">
            <tr>
              <th className="p-4 text-left">Vendor Name</th>
              <th className="p-4 text-left">Plan</th>
              <th className="p-4 text-left">Start Date</th>
              <th className="p-4 text-left">End Date</th>
              <th className="p-4 text-left">Subscription Status</th>
              <th className="p-4 text-left">Payment Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr
                key={sub._id}
                className="border-b hover:bg-[#f3f6f3] transition group"
              >
                <td className="p-4 font-medium text-gray-800">{sub.vendorName}</td>
                <td className="p-4">{sub.plan}</td>
                <td className="p-4">{sub.startDate}</td>
                <td className="p-4">{sub.endDate}</td>

                {/* Subscription Status */}
                <td className="p-10">
                  <span className={`text-sm font-semibold ${
                    sub.subscriptionStatus === "Active"
                      ? "text-green-700"
                      : sub.subscriptionStatus === "Trial"
                      ? "text-blue-600"
                      : sub.subscriptionStatus === "Expired"
                      ? "text-yellow-700"
                      : sub.subscriptionStatus === "Cancelled"
                      ? "text-red-600 line-through"
                      : "text-gray-500"
                  }`}>
                    {sub.subscriptionStatus}
                  </span>
                </td>

                {/* Payment Status */}
                <td className="p-8">
                  <span className={`text-sm font-medium ${
                    sub.paymentStatus === "Paid"
                      ? "text-green-700"
                      : sub.paymentStatus === "Pending"
                      ? "text-yellow-600 italic"
                      : sub.paymentStatus === "Failed"
                      ? "text-red-700"
                      : "text-gray-500"
                  }`}>
                    {sub.paymentStatus}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <div className="flex justify-center items-center gap-1 flex-wrap">
                    <button
                      className="px-3 py-1 text-blue-700 rounded-full text-sm font-medium hover:underline transition flex items-center gap-1"
                      onClick={() => console.log("View details")}
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>

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
    </div>
  );
};

export default VendorSubscriptions;
