import React, { useEffect, useState } from "react";
import ResponseGauge from "./ResponseGauge";
import { GoCheckCircle, GoXCircle } from "react-icons/go";
import GrowthTrend from "./GrowthTrend";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa6";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx"

const mockReportData = {
  societies: [
    {
      id: 1,
      name: "Green Residency",
      location: "Indore",
      createdAt: "2025-07-01",
    },
    {
      id: 2,
      name: "Sunshine Society",
      location: "Bhopal",
      createdAt: "2025-07-08",
    },
    {
      id: 3,
      name: "Elite Towers",
      location: "Ujjain",
      createdAt: "2025-06-22",
    },
    {
      id: 4,
      name: "Sunrise Apartments",
      location: "Bhopal",
      createdAt: "2025-07-15",
    },
  ],
  vendors: [
    { id: 1, name: "Vendor A", location: "Indore", createdAt: "2025-07-02" },
    { id: 2, name: "Vendor B", location: "Bhopal", createdAt: "2025-07-04" },
    { id: 3, name: "Vendor C", location: "Indore", createdAt: "2025-06-28" },
    { id: 4, name: "Vendor D", location: "Ujjain", createdAt: "2025-07-12" },
    { id: 5, name: "Vendor E", location: "Ujjain", createdAt: "2025-07-24" },
  ],
  jobs: [
    {
      id: 1,
      society: "Green Residency",
      location: "Indore",
      postedAt: "2025-07-05",
      completedAt: "2025-07-09",
      vendorResponseTimeInHours: 4,
      status: "completed",
    },
    {
      id: 2,
      society: "Sunshine Society",
      location: "Bhopal",
      postedAt: "2025-07-07",
      completedAt: null,
      vendorResponseTimeInHours: 7,
      status: "open",
    },
    {
      id: 3,
      society: "Elite Towers",
      location: "Ujjain",
      postedAt: "2025-07-01",
      completedAt: "2025-07-06",
      vendorResponseTimeInHours: 3,
      status: "completed",
    },
    {
      id: 4,
      society: "Sunrise Apartments",
      location: "Bhopal",
      postedAt: "2025-06-29",
      completedAt: "2025-07-02",
      vendorResponseTimeInHours: 10,
      status: "completed",
    },
    {
      id: 5,
      society: "Sunshine Society",
      location: "Bhopal",
      postedAt: "2025-07-10",
      completedAt: null,
      vendorResponseTimeInHours: null,
      status: "open",
    },
  ],
};

const PerformanceReport = () => {
  const [filters, setFilters] = useState({ from: "", to: "", location: "" });
  const [filtered, setFiltered] = useState({
    societies: [],
    vendors: [],
    jobs: [],
  });

  useEffect(() => {
    const filterByDate = (date) =>
      (!filters.from || new Date(date) >= new Date(filters.from)) &&
      (!filters.to || new Date(date) <= new Date(filters.to));
    const filterByLocation = (location) =>
      !filters.location ||
      location.toLowerCase().includes(filters.location.toLowerCase());

    const societies = mockReportData.societies.filter(
      (s) => filterByDate(s.createdAt) && filterByLocation(s.location)
    );
    const vendors = mockReportData.vendors.filter(
      (v) => filterByDate(v.createdAt) && filterByLocation(v.location)
    );
    const jobs = mockReportData.jobs.filter(
      (j) => filterByDate(j.postedAt) && filterByLocation(j.location)
    );

    setFiltered({ societies, vendors, jobs });
  }, [filters]);

  const totalSocieties = filtered.societies.length;
  const totalVendors = filtered.vendors.length;
  const totalJobs = filtered.jobs.length;
  const completedJobs = filtered.jobs.filter(
    (j) => j.status === "completed"
  ).length;
  const fulfillmentRate = totalJobs
    ? Math.round((completedJobs / totalJobs) * 100)
    : 0;

  const responseTimes = filtered.jobs
    .filter((j) => j.vendorResponseTimeInHours !== null)
    .map((j) => j.vendorResponseTimeInHours);
  const avgResponseTime = responseTimes.length
    ? Math.round(
        responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      )
    : 0;

 const handleExportPDF = () => {
  const doc = new jsPDF();
  doc.text("Performance Report", 14, 15);

  const summaryData = [
    ["Total Societies", totalSocieties],
    ["Total Vendors", totalVendors],
    ["Total Jobs Posted", totalJobs],
    ["Fulfillment Rate", `${fulfillmentRate}%`],
    ["Average Response Time (hrs)", `${avgResponseTime}`],
  ];

  autoTable(doc, {
    head: [["Metric", "Value"]],
    body: summaryData,
    startY: 25,
  });

  // Jobs Table
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Society", "Location", "Posted At", "Status"]],
    body: filtered.jobs.map((j) => [
      j.society,
      j.location,
      j.postedAt,
      j.status,
    ]),
  });

  doc.save("performance-report.pdf");
};

const handleExportExcel = () => {
  const summarySheet = [
    { Metric: "Total Societies", Value: totalSocieties },
    { Metric: "Total Vendors", Value: totalVendors },
    { Metric: "Total Jobs Posted", Value: totalJobs },
    { Metric: "Fulfillment Rate", Value: `${fulfillmentRate}%` },
    { Metric: "Avg Response Time (hrs)", Value: avgResponseTime },
  ];

  const jobsSheet = filtered.jobs.map((j) => ({
    Society: j.society,
    Location: j.location,
    "Posted At": j.postedAt,
    Status: j.status,
  }));

  const wb = XLSX.utils.book_new();
const summaryWS = XLSX.utils.json_to_sheet(summarySheet);
summaryWS["!cols"] = [{ wch: 25 }, { wch: 20 }];

const jobsWS = XLSX.utils.json_to_sheet(jobsSheet);
jobsWS["!cols"] = [
  { wch: 25 }, 
  { wch: 20 }, 
  { wch: 15 }, 
  { wch: 15 }, 
];

  XLSX.utils.book_append_sheet(wb, summaryWS, "Summary");
  XLSX.utils.book_append_sheet(wb, jobsWS, "Jobs List");

  XLSX.writeFile(wb, "performance-report.xlsx");
};


  return (
    <div className="space-y-6 p-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow items-end">
        {["from", "to", "location"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field}
            </label>
            <input
              type={field === "location" ? "text" : "date"}
              name={field}
              value={filters[field]}
              onChange={(e) =>
                setFilters({ ...filters, [field]: e.target.value })
              }
              className="border rounded-md px-3 py-2"
              placeholder={field === "location" ? "Enter location" : ""}
            />
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Total Societies" count={totalSocieties} />
        <Card title="Total Vendors" count={totalVendors} />
        <Card title="Total Jobs Posted" count={totalJobs} />
        <Card title="Fulfillment Rate" count={`${fulfillmentRate}%`} />
      </div>

      {/* Vendor Speed Indicator */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-8 justify-between items-center">
        <div className="flex-1 flex flex-col items-center space-y-4 min-w-[250px]">
          <ResponseGauge avgResponseTime={avgResponseTime} />
          <p className="text-sm text-gray-600 text-center max-w-xs mb-4">
            Average hours vendors take to respond to job postings.
          </p>
        </div>
        <div className="hidden md:block h-20 border-l border-gray-200 mx-6" />

        {/* Right: Completed vs Total Jobs */}
        <div className="flex-1 flex flex-col items-center space-y-4 min-w-[280px]">
          <h3 className="font-semibold text-gray-800 text-xl mb-14">
            Job Fulfillment
          </h3>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-gray-900">
              {completedJobs} / {totalJobs}
            </p>
          </div>

          <p className="text-sm font-medium text-gray-600">
            Successfully Closed Jobs out of Total Posted
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-2">
            <div
              className={`h-4 rounded-full ${
                fulfillmentRate >= 80
                  ? "bg-green-500"
                  : fulfillmentRate >= 50
                  ? "bg-yellow-400"
                  : "bg-red-500"
              }`}
              style={{ width: `${fulfillmentRate}%` }}
            ></div>
          </div>

          {/* Extra Icons with labels */}
          <div className="flex justify-around w-full mt-4 text-gray-700 font-medium text-sm">
            <div className="flex items-center gap-1">
              <GoCheckCircle className="text-green-600 text-xl" />
              <span>Completed</span>
              <span className="font-bold ml-1 text-gray-900">
                {completedJobs}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <GoXCircle className="text-red-600 text-xl" />
              <span>Pending</span>
              <span className="font-bold ml-1 text-gray-900">
                {totalJobs - completedJobs}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <GrowthTrend
          societies={mockReportData.societies}
          vendors={mockReportData.vendors}
          filters={filters}
        />
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
        big ? "text-lg text-gray-800" : "text-md text-gray-700"
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

export default PerformanceReport;
