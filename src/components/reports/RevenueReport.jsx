import React, { useState } from "react";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa6";
import {
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaUndo,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { FaRegClock } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FiRotateCcw } from "react-icons/fi";


// ✅ Cleaned mock data — no planType now
const mockPayments = [
  {
    id: 1,
    user: "User A",
    amountPaid: 499,
    paymentStatus: "completed",
    paymentDate: "2025-07-10",
    refundOrDiscount: 0,
  },
  {
    id: 2,
    user: "User B",
    amountPaid: 3999,
    paymentStatus: "pending",
    paymentDate: "2025-07-08",
    refundOrDiscount: 0,
  },
  {
    id: 3,
    user: "User C",
    amountPaid: 499,
    paymentStatus: "completed",
    paymentDate: "2025-06-12",
    refundOrDiscount: 100,
  },
  {
    id: 4,
    user: "User D",
    amountPaid: 3999,
    paymentStatus: "completed",
    paymentDate: "2025-05-15",
    refundOrDiscount: 0,
  },
  {
    id: 5,
    user: "User E",
    amountPaid: 1299,
    paymentStatus: "refunded",
    paymentDate: "2025-07-05",
    refundOrDiscount: 1299,
  },
  {
    id: 6,
    user: "User F",
    amountPaid: 1299,
    paymentStatus: "completed",
    paymentDate: "2025-07-03",
    refundOrDiscount: 0,
  },
];

const groupByPeriod = (payments, period, fromDate, toDate) => {
  const groups = {};
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
  const [filters, setFilters] = useState({
    from: "",
    to: "",
  });

  const [period, setPeriod] = useState("month");

  const filteredPayments = mockPayments.filter((p) => {
    const payDate = new Date(p.paymentDate);
    const fromCheck = !filters.from || payDate >= new Date(filters.from);
    const toCheck = !filters.to || payDate <= new Date(filters.to);
    return fromCheck && toCheck;
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
      p.paymentStatus,
      p.paymentDate,
      `₹${p.refundOrDiscount.toLocaleString("en-IN")}`,
    ]);
    autoTable(doc, {
      head: [["User", "Status", "Date", "Refund/Discount"]],

      body: tableData,
      startY: 25,
    });
    doc.save("revenue-report.pdf");
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredPayments.map((p) => ({
        User: p.user,
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
      <div className="bg-white border rounded-xl shadow p-4 flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:items-end">
        {["from", "to"].map((field) => (
          <div key={field} className="w-full sm:w-auto min-w-[150px]">
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 capitalize mb-1"
            >
              {field}
            </label>
            <input
              type="date"
              id={field}
              name={field}
              value={filters[field]}
              onChange={handleFilterChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4e9cad]"
            />
          </div>
        ))}
      </div>

      {/* Overview Cards */}
    <div className="flex flex-wrap gap-4 w-full">
  <div className="">
    <Card
      title="Total Revenue"
      count={`₹${totalRevenue.toLocaleString()}`}
      icon={LiaRupeeSignSolid}
      bgColor="bg-blue-200"
    />
  </div>

  <div className="col-span-1 lg:col-span-2">
    <Card
      title="Pending Payments"
      count={`₹${pendingPayments.toLocaleString()}`}
      icon={FaRegClock}
      bgColor="bg-yellow-200"
    />
  </div>

  <div className="col-span-1 lg:col-span-2">
    <Card
      title="Refunds Discounts"
      count={`₹${totalRefunds.toLocaleString()}`}
      icon={FiRotateCcw}
      bgColor="bg-red-200"
    />
  </div>
</div>


      {/* Revenue by Period */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border p-4 sm:p-6 rounded-2xl shadow space-y-5 md:col-span-3">
          <div className="px-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <h3 className="font-semibold text-gray-800 text-lg">
              Revenue by {period}
            </h3>
            <select
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 bg-white
             hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition
              cursor-pointer w-auto"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="month">Month</option>
              <option value="quarter">Quarter</option>
              <option value="year">Year</option>
            </select>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
            {Object.entries(revenueByPeriod).length ? (
              Object.entries(revenueByPeriod).map(([key, val]) => (
                <div
                  key={key}
                  className="flex justify-between items-center text-sm font-semibold text-gray-900 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition cursor-default"
                  title={`${key}: ₹${val.toLocaleString()}`}
                >
                  <span className="truncate max-w-[70%]">{key}</span>
                  <span className="text-gray-800">₹{val.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">No data found</p>
            )}
          </div>
        </div>
      </div>

      {/* Large screen table layout */}
{/* <div className="bg-white rounded-2xl shadow-sm p-6 hidden md:block">
  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
    Payment Details
  </h2>

  <div className="overflow-x-auto">
    <table className="min-w-[800px] w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
          <th className="py-3 px-6 text-left font-semibold">User</th>
          <th className="py-3 px-6 text-left font-semibold">Payment Status</th>
          <th className="py-3 px-6 text-left font-semibold">Payment Date</th>
          <th className="py-3 px-6 text-left font-semibold">Refund / Discount</th>
        </tr>
      </thead>

      <tbody>
        {filteredPayments.length ? (
          filteredPayments.map((p, index) => (
            <tr
              key={p.id}
              className={`transition-all duration-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {p.user}
              </td>
              <td
                className={`px-6 py-4 capitalize font-semibold ${
                  p.paymentStatus === "completed"
                    ? "text-green-600"
                    : p.paymentStatus === "pending"
                    ? "text-yellow-600"
                    : p.paymentStatus === "refunded"
                    ? "text-red-600"
                    : "text-gray-700"
                }`}
              >
                {p.paymentStatus}
              </td>
              <td className="px-6 py-4 text-gray-700">{p.paymentDate}</td>
              <td className="px-6 py-4 font-medium text-gray-800">
                ₹{p.refundOrDiscount.toLocaleString()}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="4"
              className="py-6 text-center text-gray-500 font-medium"
            >
              No Data Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div> */}


      <div className="space-y-4 md:hidden">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          Payment Details
        </h2>
        {filteredPayments.length ? (
          filteredPayments.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md rounded-xl p-4 space-y-2 border border-gray-100"
            >
              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                <FaUser className="text-gray-500" />
                {p.user}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {p.paymentStatus === "completed" ? (
                  <FaCheckCircle className="text-green-600" />
                ) : p.paymentStatus === "pending" ? (
                  <FaClock className="text-yellow-600" />
                ) : p.paymentStatus === "refunded" ? (
                  <FaUndo className="text-red-600" />
                ) : null}
                <span className="capitalize">{p.paymentStatus}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaCalendarAlt />
                {p.paymentDate}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-800">
  
                < LiaRupeeSignSolid />₹{p.refundOrDiscount.toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6">No Data Found</div>
        )}
      </div>

      {/* Export Buttons */}
      {/* <div className="flex flex-col sm:flex-row justify-end gap-3 px-2 sm:px-0">
        <button
          onClick={handleExportPDF}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-lg border font-medium bg-white shadow hover:bg-gray-100 transition"
          aria-label="Export PDF"
        >
          <FaRegFilePdf className="text-red-500 text-xl" />
          <span className="text-base">Export PDF</span>
        </button>

        <button
          onClick={handleExportExcel}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-lg border font-medium bg-white shadow hover:bg-gray-100 transition"
          aria-label="Export Excel"
        >
          <FaRegFileExcel className="text-green-600 text-xl" />
          <span className="text-base">Export Excel</span>
        </button>
      </div> */}
    </div>
  );
};

const Card = ({ title, count, icon: Icon, bgColor = "bg-gray-100" }) => (
  <div
    className={`flex justify-between items-center rounded-2xl shadow p-5 transition-all min-w-[280px] ${bgColor}`}
  >
    <div>
      <p className="text-sm text-gray-700 font-medium">{title}</p>
      <p className="text-3xl font-bold mt-1">{count}</p>
    </div>
    <div className="bg-white p-3 rounded-full shadow-sm">
      <Icon className="text-gray-800 text-xl" />
    </div>
  </div>
);

export default RevenueReport;
