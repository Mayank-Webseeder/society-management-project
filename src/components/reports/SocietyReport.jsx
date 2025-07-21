import React, { useState, useEffect } from "react";
import { FaRegFileExcel } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa6";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

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
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            From
          </label>
          <input
            type="date"
            name="from"
            value={filters.from}
            onChange={handleFilterChange}
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="date"
            name="to"
            value={filters.to}
            onChange={handleFilterChange}
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border rounded-md px-3 py-2 w-full"
          >
            <option value="">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="banned">Banned</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="border rounded-md px-3 py-2 w-full"
            placeholder="e.g., Indore"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <Card title="Total Societies" count={summary.total} big />
        </div>

        <Card title="Approved" count={summary.approved} />
        <Card title="Pending" count={summary.pending} />
        <Card title="Rejected" count={summary.rejected} />
        <Card title="Banned" count={summary.banned} />
        <Card title="Active" count={summary.active} />
        <Card title="Inactive" count={summary.inactive} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <FaClipboardList className="text-gray-700 text-2xl"/> Table View
        </h2>

        <table className="w-full text-md">
          <thead>
            <tr className="text-gray-700 border-b">
              <th className="py-3 text-left px-4">Name</th>
              <th className="py-3 text-left px-4">Status</th>
              <th className="py-3 text-left px-4">Date</th>
              <th className="py-3 text-left px-4">Location</th>
              <th className="py-3 text-left px-4">Jobs Posted</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length > 0 ? (
              filteredList.map((s) => (
                <tr
                  key={s.id}
                  className="bg-white border-b last:border-none hover:shadow-md hover:scale-[1.007] transition-all duration-300 rounded-md last:rounded-b-xl"
                >
                  <td className="px-4 py-4 font-semibold text-gray-800">
                    {s.name}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        s.status === "approved"
                          ? "text-green-700"
                          : s.status === "pending"
                          ? "text-yellow-700"
                          : s.status === "rejected"
                          ? "text-red-700"
                          : s.status === "banned"
                          ? "text-gray-700"
                          : "text-gray-700"
                      }`}
                    >
                      {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{s.createdAt}</td>
                  <td className="px-4 py-4 text-gray-600">{s.location}</td>
                  <td className="px-8 py-4 font-bold text-gray-900">
                    {s.jobsPosted}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
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

export default SocietyReport;
