import React, { useState, useEffect } from "react";
import { FaRegFileExcel } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaMapMarkerAlt, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { FaBriefcase, FaTimesCircle, FaCheckCircle, FaChartLine } from "react-icons/fa";

const mockSocietyList = [
  {
    id: 1,
    name: "ABC Heights",
    status: "approved",
    isActive: true,
    createdAt: "2025-07-05",
    location: "Indore",
    jobsPosted: 12,
  },
  {
    id: 2,
    name: "Shiv Residency",
    status: "pending",
    isActive: true,
    createdAt: "2025-07-12",
    location: "Indore",
    jobsPosted: 5,
  },
  {
    id: 3,
    name: "Green Villa",
    status: "rejected",
    isActive: false,
    createdAt: "2025-07-15",
    location: "Ujjain",
    jobsPosted: 0,
  },
  {
    id: 4,
    name: "Sunshine Towers",
    status: "approved",
    isActive: true,
    createdAt: "2025-07-20",
    location: "Bhopal",
    jobsPosted: 8,
  },
  {
    id: 5,
    name: "Skyline Plaza",
    status: "pending",
    isActive: false,
    createdAt: "2025-07-22",
    location: "Indore",
    jobsPosted: 4,
  },
  {
    id: 6,
    name: "Classic Apartments",
    status: "approved",
    isActive: true,
    createdAt: "2025-07-25",
    location: "Indore",
    jobsPosted: 10,
  },
  {
    id: 7,
    name: "Moonlight Valley",
    status: "banned",
    isActive: false,
    createdAt: "2025-05-10",
    location: "Dewas",
    jobsPosted: 0,
  },
];

const SocietyReport = () => {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    status: "",
    location: "",
  });
  const [filteredList, setFilteredList] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    banned: 0,
    active: 0,
    inactive: 0,
  });

  useEffect(() => {
    let filtered = mockSocietyList;

    if (filters.from) {
      filtered = filtered.filter(
        (s) => new Date(s.createdAt) >= new Date(filters.from)
      );
    }
    if (filters.to) {
      filtered = filtered.filter(
        (s) => new Date(s.createdAt) <= new Date(filters.to)
      );
    }
    if (filters.status) {
      filtered = filtered.filter((s) => s.status === filters.status);
    }
    if (filters.location) {
      filtered = filtered.filter((s) =>
        s.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredList(filtered);

    setSummary({
      total: filtered.length,
      approved: filtered.filter((s) => s.status === "approved").length,
      pending: filtered.filter((s) => s.status === "pending").length,
      rejected: filtered.filter((s) => s.status === "rejected").length,
      banned: filtered.filter((s) => s.status === "banned").length,
      active: filtered.filter((s) => s.isActive).length,
      inactive: filtered.filter((s) => !s.isActive).length,
    });
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Society Report", 14, 15);

    const tableData = filteredList.map((s, index) => [
      index + 1,
      s.name,
      s.status,
      s.createdAt,
      s.location,
      s.jobsPosted,
    ]);

    autoTable(doc, {
      startY: 25,
      head: [["#", "Name", "Status", "Created At", "Location", "Jobs Posted"]],
      body: tableData,
    });

    doc.save("society_report.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredList.map((s) => ({
        Name: s.name,
        Status: s.status,
        "Created At": s.createdAt,
        Location: s.location,
        "Jobs Posted": s.jobsPosted,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Society Report");
    XLSX.writeFile(workbook, "society_report.xlsx");
  };

  return (
    <div className=" flex flex-col gap-5">
      {/* Filter Form */}
  <div className="bg-white p-4 rounded-2xl border-gray-200 border-2   flex flex-col sm:flex-row sm:flex-wrap gap-4 items-start sm:items-end">
  {/* From Date */}
  <div className="flex-1 min-w-[180px]">
    <label className="block text-sm font-semibold text-gray-700 mb-1">From</label>
    <input
      type="date"
      name="from"
      value={filters.from}
      onChange={handleFilterChange}
      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
    />
  </div>

  {/* To Date */}
  <div className="flex-1 min-w-[180px]">
    <label className="block text-sm font-semibold text-gray-700 mb-1">To</label>
    <input
      type="date"
      name="to"
      value={filters.to}
      onChange={handleFilterChange}
      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
    />
  </div>

  {/* Status */}
  <div className="flex-1 min-w-[180px]">
    <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
    <select
      name="status"
      value={filters.status}
      onChange={handleFilterChange}
      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
    >
      <option value="">All</option>
      <option value="approved">Approved</option>
      <option value="pending">Pending</option>
      <option value="rejected">Rejected</option>
      <option value="banned">Banned</option>
    </select>
  </div>

  {/* Location */}
  <div className="flex-1 min-w-[180px]">
    <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
    <input
      type="text"
      name="location"
      value={filters.location}
      onChange={handleFilterChange}
      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
      placeholder="e.g., Indore"
    />
  </div>


</div>


      {/* Summary Cards */}
     <div className=" flex w-full gap-4">
        <Card
          title="Total Societies"
          count={summary.total}
          icon={FaBriefcase}
          bgColor="bg-purple-200"
        />
      <Card title="Rejected" count={summary.rejected} icon={FaTimesCircle} bgColor="bg-red-200" />
      <Card title="Active" count={summary.active} icon={FaChartLine} bgColor="bg-green-200" />
      <Card title="Inactive" count={summary.inactive} icon={FaCheckCircle} bgColor="bg-yellow-200" />
    </div>

      {/* Table / Card View */}
      <div className="bg-white shadow">
      

            {/* Export Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3 px-2 sm:px-0">
     <div>
           <h2 className="text-lg font-semibold flex justify-between items-center gap-2">
          <FaClipboardList className="text-gray-700 text-2xl" /> Table View
        </h2>
     </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-lg border font-medium bg-white shadow hover:bg-gray-100 transition"
          aria-label="Export PDF"
        >
          <FaRegFilePdf className="text-red-500 text-xl" />
          <span className="text-base">Export</span>
        </button>


      </div>

        {/* for small screen : Card */}
        <div className="space-y-4 md:hidden">
          {filteredList.length > 0 ? (
            filteredList.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 bg-white p-4 py-5"
              >
                {/* Title */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {s.name}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      s.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : s.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : s.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-500" />
                    <span className="font-medium">Date:</span> {s.createdAt}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span className="font-medium">Location:</span> {s.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaClipboardList className="text-gray-500" />
                    <span className="font-medium">Jobs Posted:</span>{" "}
                    {s.jobsPosted}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No Data Found</p>
          )}
        </div>

  
          {/* Large screen: Table */}
<div className="overflow-x-auto w-full bg-white rounded-2xl  border">
  <table className="min-w-[700px] w-full text-sm text-gray-700 border-collapse">
    <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
      <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
        <th className="py-4 px-5 rounded-tl-2xl">Society Name</th>
        <th className="py-4 px-5">Status</th>
        <th className="py-4 px-5">Date</th>
        <th className="py-4 px-5">Location</th>
        <th className="py-4 px-5 rounded-tr-2xl">Jobs Posted</th>
      </tr>
    </thead>

    <tbody>
      {filteredList.length > 0 ? (
        filteredList.map((s, index) => (
          <tr
            key={s.id}
            className={`transition-all duration-300  hover:shadow-md ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <td className="px-5 py-4 font-semibold text-gray-800 whitespace-nowrap">
              {s.name}
            </td>

            <td className="px-5 py-4">
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                  s.status === "approved"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : s.status === "pending"
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    : s.status === "rejected"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
              </span>
            </td>

            <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
              {s.createdAt}
            </td>

            <td className="px-5 py-4 text-gray-600">{s.location}</td>

            <td className="px-5 py-4 font-bold text-gray-900">
              {s.jobsPosted}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="5"
            className="py-8 text-center text-gray-500 font-medium bg-gray-50 rounded-b-2xl"
          >
            No Data Found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      </div>

    </div>
  );
};
const Card = ({ title, count, icon: Icon, bgColor = "bg-gray-100" }) => (
 <div
      className={`flex justify-between items-center rounded-2xl shadow-sm p-5 transition-all min-w-[280px] duration-300 hover:shadow-md ${bgColor}`}
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


export default SocietyReport;
