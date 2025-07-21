import React, { useState, useEffect } from "react";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa6";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Mock revenue data — payments records
const mockPayments = [
  {
    id: 1,
    user: "User A",
    planType: "Basic",
    amountPaid: 499,
    paymentStatus: "completed",
    paymentDate: "2025-07-10",
    refundOrDiscount: 0,
  },
  {
    id: 2,
    user: "User B",
    planType: "Premium",
    amountPaid: 3999,
    paymentStatus: "pending",
    paymentDate: "2025-07-08",
    refundOrDiscount: 0,
  },
  {
    id: 3,
    user: "User C",
    planType: "Basic",
    amountPaid: 499,
    paymentStatus: "completed",
    paymentDate: "2025-06-12",
    refundOrDiscount: 100,
  },
  {
    id: 4,
    user: "User D",
    planType: "Premium",
    amountPaid: 3999,
    paymentStatus: "completed",
    paymentDate: "2025-05-15",
    refundOrDiscount: 0,
  },
  {
    id: 5,
    user: "User E",
    planType: "Pro",
    amountPaid: 1299,
    paymentStatus: "refunded",
    paymentDate: "2025-07-05",
    refundOrDiscount: 1299,
  },
  {
    id: 6,
    user: "User F",
    planType: "Pro",
    amountPaid: 1299,
    paymentStatus: "completed",
    paymentDate: "2025-07-03",
    refundOrDiscount: 0,
  },
];

const groupByPeriod = (payments, period, fromDate, toDate) => {
  const groups = {};

  // fromDate & toDate for filtering
  const from = fromDate ? new Date(fromDate) : null;
  const to = toDate ? new Date(toDate) : null;

  payments.forEach((p) => {
    const payDate = new Date(p.paymentDate);
    if ((from && payDate < from) || (to && payDate > to)) return;

    if (p.paymentStatus === "pending") return;

    let key = "";
    if (period === "month") {
      key = payDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    } else if (period === "quarter") {
      const quarter = Math.floor(payDate.getMonth() / 3) + 1;
      key = `Q${quarter} ${payDate.getFullYear()}`;
    } else if (period === "year") {
      key = `${payDate.getFullYear()}`;
    }

    groups[key] = (groups[key] || 0) + p.amountPaid;
  });

  return groups;
};

const RevenueReport = () => {
  // Filters state
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    planType: "",
  });

  const [period, setPeriod] = useState("month");

  // Filtered payments (by date & planType & paymentStatus)
  const filteredPayments = mockPayments.filter((p) => {
    const payDate = new Date(p.paymentDate);
    const fromCheck = !filters.from || payDate >= new Date(filters.from);
    const toCheck = !filters.to || payDate <= new Date(filters.to);
    const planCheck = !filters.planType || p.planType === filters.planType;
    return fromCheck && toCheck && planCheck;
  });

  const totalRevenue = filteredPayments
    .filter((p) => p.paymentStatus === "completed")
    .reduce((acc, p) => acc + p.amountPaid, 0);

  const pendingPayments = filteredPayments
    .filter((p) => p.paymentStatus === "pending")
    .reduce((acc, p) => acc + p.amountPaid, 0);

  const totalRefunds = filteredPayments
    .filter((p) => p.paymentStatus === "refunded")
    .reduce((acc, p) => acc + p.refundOrDiscount, 0);

  // Revenue by plan type
  const revenueByPlanType = filteredPayments.reduce(
    (acc, p) => {
      if (p.paymentStatus === "completed") {
        acc[p.planType].revenue += p.amountPaid;
        acc[p.planType].count++;
      }
      return acc;
    },
    {
      Basic: { revenue: 0, count: 0 },
      Pro: { revenue: 0, count: 0 },
      Premium: { revenue: 0, count: 0 },
    }
  );

  // Revenue grouped by period for breakdown
  const revenueByPeriod = groupByPeriod(
    filteredPayments,
    period,
    filters.from,
    filters.to
  );

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleExportPDF = () => {
  const doc = new jsPDF();
  doc.text("Revenue Report", 14, 15);

  const tableData = filteredPayments.map((p) => [
    p.user,
    p.planType,
    `₹${p.amountPaid.toLocaleString("en-IN")}`,
    p.paymentStatus,
    p.paymentDate,
    `₹${p.refundOrDiscount.toLocaleString("en-IN")}`,
  ]);

  autoTable(doc, {
    head: [["User", "Plan Type", "Amount Paid", "Status", "Date", "Refund/Discount"]],
    body: tableData,
    startY: 25,
  });

  doc.save("revenue-report.pdf");
};
 const handleExportExcel = () => {
  const ws = XLSX.utils.json_to_sheet(
    filteredPayments.map((p) => ({
      User: p.user,
      "Plan Type": p.planType,
      "Amount Paid": p.amountPaid,
      Status: p.paymentStatus,
      "Payment Date": p.paymentDate,
      "Refund / Discount": p.refundOrDiscount,
    }))
  );
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Revenue Report");
  XLSX.writeFile(wb, "revenue-report.xlsx");
};


  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow items-end">
        {["from", "to"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 capitalize"
            >
              {field}
            </label>
            <input
              type="date"
              id={field}
              name={field}
              value={filters[field]}
              onChange={handleFilterChange}
              className="border rounded-md px-3 py-2"
            />
          </div>
        ))}
        <div>
          <label
            htmlFor="planType"
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            Plan Type
          </label>
          <select
            id="planType"
            name="planType"
            value={filters.planType}
            onChange={handleFilterChange}
            className="border rounded-md px-3 py-2"
          >
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <Card
            title="Total Revenue"
            count={`₹${totalRevenue.toLocaleString()}`}
            big
          />
        </div>
        <Card
          title="Pending Payments"
          count={`₹${pendingPayments.toLocaleString()}`}
        />
        <Card
          title="Refunds / Discounts"
          count={`₹${totalRefunds.toLocaleString()}`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Revenue by period */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-5 md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-lg">
              Revenue by {period}
            </h3>
            <select
              className="border rounded-md px-3 py-1"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              aria-label="Select revenue grouping period"
            >
              <option value="month">Month</option>
              <option value="quarter">Quarter</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
            {Object.entries(revenueByPeriod).length ? (
              Object.entries(revenueByPeriod).map(([key, val]) => {
                const percent = (val / (totalRevenue || 1)) * 100;
                return (
                  <div
                    key={key}
                    className="flex justify-between items-center text-sm font-semibold text-gray-900 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition cursor-default"
                    title={`${key}: ₹${val.toLocaleString()}`}
                  >
                    <span className="truncate max-w-[70%]">{key}</span>
                    <span className="text-gray-800">
                      ₹{val.toLocaleString()}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-10">No data found</p>
            )}
          </div>
        </div>

        {/* Revenue by Plan Type */}
        <div className="bg-[#f0f2f9] rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 space-y-3 border border-blue-100">
          <h3 className="font-semibold text-gray-800 text-lg mb-3 border-b pb-1">
            By Plan Type
          </h3>
          {["Basic", "Pro", "Premium"].map((type) => (
            <div
              key={type}
              className="flex justify-between items-center text-sm font-semibold text-gray-900 bg-white rounded-lg px-4 py-4 shadow-sm hover:shadow-md transition cursor-default"
              title={`${type} - ${revenueByPlanType[type].count} subscriptions`}
            >
              <div>
                <p>{type} Plan</p>
                <p className="text-gray-600 text-xs">
                  {revenueByPlanType[type].count} subscriptions
                </p>
              </div>
              <div className="text-gray-800 font-bold">
                ₹{revenueByPlanType[type].revenue.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          Payment Details
        </h2>
        <table className="w-full text-md border-collapse">
          <thead>
            <tr className="text-gray-700 border-b bg-gray-50">
              <th className="py-3 text-left px-4">User</th>
              <th className="py-3 text-left px-4">Plan Type</th>
              <th className="py-3 text-left px-4">Amount Paid</th>
              <th className="py-3 text-left px-4">Payment Status</th>
              <th className="py-3 text-left px-4">Payment Date</th>
              <th className="py-3 text-left px-4">Refund / Discount</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length ? (
              filteredPayments.map((p) => (
                <tr
                  key={p.id}
                  className="bg-white border-b last:border-none hover:shadow-md hover:scale-[1.007] transition-all duration-300 rounded-md last:rounded-b-xl"
                >
                  <td className="px-4 py-4 font-semibold text-gray-800">
                    {p.user}
                  </td>
                  <td className="px-4 py-4">{p.planType}</td>
                  <td className="px-4 py-4">
                    ₹{p.amountPaid.toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-4 capitalize font-semibold ${
                      p.paymentStatus === "completed"
                        ? "text-green-700"
                        : p.paymentStatus === "pending"
                        ? "text-yellow-700"
                        : p.paymentStatus === "refunded"
                        ? "text-red-700"
                        : "text-gray-700"
                    }`}
                  >
                    {p.paymentStatus.charAt(0).toUpperCase() +
                      p.paymentStatus.slice(1)}
                  </td>
                  <td className="px-4 py-4">{p.paymentDate}</td>
                  <td className="px-4 py-4">
                    ₹{p.refundOrDiscount.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-4 py-3 rounded-lg border font-medium bg-white shadow hover:bg-gray-100"
          aria-label="Export revenue report as PDF"
        >
          <FaRegFilePdf className="text-red-500 text-lg" /> Export PDF
        </button>
        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2 px-4 py-3 rounded-lg border font-medium bg-white shadow hover:bg-gray-100"
          aria-label="Export revenue report as Excel"
        >
          <FaRegFileExcel className="text-green-600 text-lg" /> Export Excel
        </button>
      </div>
    </div>
  );
};

// Card component
const Card = ({ title, count, big }) => (
  <div
    className={`rounded-2xl bg-[#f9fafb] shadow-md ${
      big ? "py-4" : "p-4"
    } text-center space-y-2 hover:shadow-lg transition-shadow duration-300`}
  >
    <h3
      className={`font-semibold ${
        big ? "text-lg text-gray-800" : "text-sm text-gray-700"
      }`}
    >
      {title}
    </h3>
    <p
      className={`font-bold ${
        big ? "text-4xl text-gray-900" : "text-2xl text-gray-900"
      }`}
    >
      {count}
    </p>
  </div>
);

export default RevenueReport;
