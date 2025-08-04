import React, { useState, useEffect } from "react";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa6";
import {
  FaClipboardList,
  FaUsers,
  FaLocationDot,
  FaWrench,
  FaFileInvoice,
} from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const mockJobs = [
  {
    id: 1,
    society: "Green Residency",
    vendor: "Rahul Mehta",
    status: "open",
    category: "Plumber",
    location: "Indore",
    quotationRequested: true,
    createdAt: "2025-07-10",
  },
  {
    id: 2,
    society: "Sunshine Society",
    vendor: "Vendor B",
    status: "completed",
    category: "Electrician",
    location: "Bhopal",
    quotationRequested: false,
    createdAt: "2025-07-05",
  },
  {
    id: 3,
    society: "Green Residency",
    vendor: "Vendor C",
    status: "in progress",
    category: "Cleaning",
    location: "Indore",
    quotationRequested: true,
    createdAt: "2025-07-01",
  },
  {
    id: 4,
    society: "Elite Towers",
    vendor: "Vendor D",
    status: "cancelled",
    category: "Gardening",
    location: "Ujjain",
    quotationRequested: false,
    createdAt: "2025-06-25",
  },
  {
    id: 5,
    society: "Sunrise Apartments",
    vendor: "Vendor E",
    status: "in progress",
    category: "Pest Control",
    location: "Bhopal",
    quotationRequested: true,
    createdAt: "2025-07-07",
  },
  {
    id: 6,
    society: "Elite Towers",
    vendor: "Vendor F",
    status: "completed",
    category: "Electrician",
    location: "Indore",
    quotationRequested: true,
    createdAt: "2025-07-03",
  },
];

const JobReport = () => {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    society: "",
    location: "",
    vendor: "",
  });
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const filtered = mockJobs.filter((job) => {
      const dateCheck =
        (!filters.from || new Date(job.createdAt) >= new Date(filters.from)) &&
        (!filters.to || new Date(job.createdAt) <= new Date(filters.to));

      const societyCheck =
        !filters.society ||
        job.society.toLowerCase().includes(filters.society.toLowerCase());

      const locationCheck =
        !filters.location ||
        job.location.toLowerCase().includes(filters.location.toLowerCase());

      const vendorCheck =
        !filters.vendor ||
        job.vendor.toLowerCase().includes(filters.vendor.toLowerCase());

      return dateCheck && societyCheck && locationCheck && vendorCheck;
    });

    setFilteredJobs(filtered);
  }, [filters]);

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const totalJobs = filteredJobs.length;
  const openJobs = filteredJobs.filter((job) => job.status === "open").length;
  const jobsWithQuotation = filteredJobs.filter(
    (job) => job.quotationRequested
  ).length;
  const jobsWithoutQuotation = filteredJobs.filter(
    (job) => !job.quotationRequested
  ).length;

  const statusCounts = {
    open: 0,
    "in progress": 0,
    completed: 0,
    cancelled: 0,
  };
  const categoryCounts = {};
  const locationCounts = {};

  filteredJobs.forEach((job) => {
    statusCounts[job.status]++;
    categoryCounts[job.category] = (categoryCounts[job.category] || 0) + 1;
    locationCounts[job.location] = (locationCounts[job.location] || 0) + 1;
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Job Report", 14, 15);

    const tableData = filteredJobs.map((job) => [
      job.society,
      job.vendor,
      job.status,
      job.category,
      job.location,
      job.quotationRequested ? "Yes" : "No",
      job.createdAt,
    ]);

    autoTable(doc, {
      head: [
        [
          "Society",
          "Vendor",
          "Status",
          "Category",
          "Location",
          "Quotation",
          "Date",
        ],
      ],
      body: tableData,
      startY: 25,
    });

    doc.save("job-report.pdf");
  };
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredJobs.map((job) => ({
        Society: job.society,
        Vendor: job.vendor,
        Status: job.status,
        Category: job.category,
        Location: job.location,
        Quotation: job.quotationRequested ? "Yes" : "No",
        Date: job.createdAt,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Job Report");
    XLSX.writeFile(wb, "job-report.xlsx");
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:items-end">
        {["from", "to", "society", "vendor", "location"].map((field) => (
          <div key={field} className="w-full sm:w-auto flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
              {field}
            </label>
            {["from", "to"].includes(field) ? (
              <input
                type="date"
                name={field}
                value={filters[field]}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />
            ) : (
              <input
                type="text"
                name={field}
                value={filters[field]}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
                placeholder={`e.g., ${
                  field === "society"
                    ? "Green Residency"
                    : field === "location"
                    ? "Indore"
                    : "Vendor A"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="col-span-1 xs:col-span-2 md:col-span-3 lg:col-span-1">
          <Card title="Total Jobs" count={totalJobs} big />
        </div>

        <div className="col-span-1 lg:col-span-1">
          <Card title="Open Jobs" count={openJobs} />
        </div>

        <div className="col-span-1 lg:col-span-1">
          <Card title="With Quote" count={jobsWithQuotation} />
        </div>

        <div className="col-span-1 lg:col-span-1">
          <Card title="No Quote" count={jobsWithoutQuotation} />
        </div>
      </div>
      {/* Status Bar + Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="bg-white p-2 lg:p-6 rounded-2xl shadow space-y-5">
          <h3 className="font-semibold text-gray-800 text-lg mb-2">
            Jobs by Status
          </h3>
          {Object.entries(statusCounts).map(([status, count]) => {
            const percent = (count / (totalJobs || 1)) * 100;
            return (
              <div key={status} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="capitalize text-sm font-medium text-gray-700">
                    {status}
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    {count} jobs
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-5 relative overflow-hidden">
                  <div
                    className="h-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-700 text-white text-xs font-semibold flex items-center justify-center"
                    style={{
                      width: `${percent}%`,
                      minWidth: percent > 10 ? "40px" : "32px",
                      transition: "width 0.5s ease",
                    }}
                  >
                    {percent >= 12 ? `${Math.round(percent)}%` : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white p-0 xl:p-4 rounded-xl shadow space-y-6 md:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-2 mb-3">
            Jobs Breakdown
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Section */}
            <div className="bg-[#f0f2f9] rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 space-y-3 border border-blue-100">
              <h3 className="font-semibold text-gray-800 text-lg mb-3 border-b pb-1">
                By Category
              </h3>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
                {Object.entries(categoryCounts).map(([category, count]) => (
                  <div
                    key={category}
                    className="flex justify-between items-center text-sm font-semibold text-gray-900 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition cursor-pointer select-none"
                    title={`${category}: ${count}`}
                  >
                    <span className="truncate max-w-[70%]">{category}</span>
                    <span className="text-gray-800">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-[#f0f2f9] rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 space-y-3 border border-blue-100">
              <h3 className="font-semibold text-gray-800 text-lg mb-3 border-b pb-1">
                By Location
              </h3>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
                {Object.entries(locationCounts).map(([location, count]) => (
                  <div
                    key={location}
                    className="flex justify-between items-center text-sm font-semibold text-gray-900 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition cursor-pointer select-none"
                    title={`${location}: ${count}`}
                  >
                    <span className="truncate max-w-[70%]">{location}</span>
                    <span className="text-gray-800">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-1 xl:p-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FaClipboardList className="text-gray-700 text-2xl" /> Job Details
        </h2>

        {/* Table for lg */}
        <div className="hidden md:block">
          <table className="w-full text-md">
            <thead>
              <tr className="text-gray-700 border-b bg-gray-50">
                <th className="py-3 text-left px-4">Society</th>
                <th className="py-3 text-left px-4">Vendor</th>
                <th className="py-3 text-left px-4">Status</th>
                <th className="py-3 text-left px-4">Category</th>
                <th className="py-3 text-left px-4">Location</th>
                <th className="py-3 text-left px-4">Quotation</th>
                <th className="py-3 text-left px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="bg-white border-b last:border-none hover:shadow-md hover:scale-[1.007] transition-all duration-300 rounded-md last:rounded-b-xl"
                  >
                    <td className="px-4 py-4 font-semibold text-gray-800">
                      {job.society}
                    </td>
                    <td className="px-4 py-4">{job.vendor}</td>
                    <td className="px-4 py-4 capitalize">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          job.status === "open"
                            ? "text-green-700"
                            : job.status === "in progress"
                            ? "text-yellow-700"
                            : job.status === "completed"
                            ? "text-blue-700"
                            : job.status === "cancelled"
                            ? "text-red-700"
                            : "text-gray-700"
                        }`}
                      >
                        {job.status.charAt(0).toUpperCase() +
                          job.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4">{job.category}</td>
                    <td className="px-4 py-4">{job.location}</td>
                    <td className="px-4 py-4">
                      {job.quotationRequested ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-4">{job.createdAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card View for sm and md */}
        <div className="md:hidden space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 p-4 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <div className="flex items-center gap-2 text-base font-semibold text-gray-800">
                    <FaUsers className="text-gray-500 text-sm" />
                    {job.society}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700 font-medium bg-gray-100 px-3 py-1.5 rounded-full w-fit shadow-sm">
                    <FaUser className="text-gray-500" />
                    <span className="whitespace-normal break-words">
                      {job.vendor}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 capitalize">
                  <span className="font-medium text-gray-700">Status:</span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      job.status === "open"
                        ? "bg-green-100 text-green-700"
                        : job.status === "in progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : job.status === "completed"
                        ? "bg-blue-100 text-blue-700"
                        : job.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaFileInvoice className="text-gray-500 text-sm" />
                  <span className="text-gray-700 font-medium">
                    Quotation: {job.quotationRequested ? "Yes" : "No"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaLocationDot className="text-gray-500 text-sm" />
                  <span className="text-gray-800">{job.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaWrench className="text-gray-500 text-sm" />
                  <span className="text-gray-800">
                    Category: {job.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MdDateRange className="text-gray-500 text-sm" />
                  <span className="text-gray-800">{job.createdAt}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center">
              No job records found.
            </div>
          )}
        </div>
      </div>
      {/* Export Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 px-2 sm:px-0">
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
      </div>
    </div>
  );
};

const Card = ({ title, count, big }) => (
  <div
    className={`rounded-2xl bg-[#f9fafb] shadow-md ${
      big ? "py-4" : "p-4"
    } text-center hover:shadow-lg transition-shadow duration-300 h-full flex flex-col justify-between`}
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
        big ? "text-4xl text-gray-900" : "text-xl text-gray-900"
      }`}
    >
      {count}
    </p>
  </div>
);

export default JobReport;
