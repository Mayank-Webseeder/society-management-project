import React, { useState, useEffect } from "react";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const mockVendors = [
  {
    id: 1,
    name: "Vendor A",
    status: "active",
    location: "Indore",
    category: "Plumber",
    subscription: "active",
    revenue: 12000,
    rating: 4.5,
    registeredAt: "2025-06-10",
  },
  {
    id: 2,
    name: "Vendor B",
    status: "inactive",
    location: "Bhopal",
    category: "Electrician",
    subscription: "expired",
    revenue: 8000,
    rating: 2.8,
    registeredAt: "2025-06-15",
  },
  {
    id: 3,
    name: "Vendor C",
    status: "active",
    location: "Indore",
    category: "Electrician",
    subscription: "renewal due",
    revenue: 15000,
    rating: 4.2,
    registeredAt: "2025-07-05",
  },
  {
    id: 4,
    name: "Vendor D",
    status: "active",
    location: "Ujjain",
    category: ["Plumber", "Cleaning"],
    subscription: "active",
    revenue: 18000,
    rating: 4.9,
    registeredAt: "2025-07-12",
  },
  {
    id: 5,
    name: "Vendor E",
    status: "inactive",
    location: "Dewas",
    category: ["Cleaning", "Pest Control"],
    subscription: "expired",
    revenue: 5000,
    rating: 3.2,
    registeredAt: "2025-06-22",
  },
  {
    id: 6,
    name: "Vendor F",
    status: "active",
    location: "Indore",
    category: "Cleaning",
    subscription: "active",
    revenue: 9500,
    rating: 4.0,
    registeredAt: "2025-07-14",
  },
  {
    id: 7,
    name: "Vendor G",
    status: "inactive",
    location: "Ujjain",
    category: ["Gardening", "Waste Management"],
    subscription: "active",
    revenue: 7000,
    rating: 3.5,
    registeredAt: "2025-07-02",
  },
  {
    id: 8,
    name: "Vendor H",
    status: "active",
    location: "Bhopal",
    category: ["Carpenter", "Painting"],
    subscription: "active",
    revenue: 11000,
    rating: 4.3,
    registeredAt: "2025-07-10",
  },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const VendorReport = () => {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    location: "",
    category: "",
  });
  const [filteredVendors, setFilteredVendors] = useState([]);

  useEffect(() => {
    const filtered = mockVendors.filter((vendor) => {
      const dateCheck =
        (!filters.from ||
          new Date(vendor.registeredAt) >= new Date(filters.from)) &&
        (!filters.to || new Date(vendor.registeredAt) <= new Date(filters.to));

      const locationCheck =
        !filters.location ||
        vendor.location.toLowerCase().includes(filters.location.toLowerCase());

      const categoryCheck =
        !filters.category ||
        (Array.isArray(vendor.category)
          ? vendor.category.some((cat) =>
              cat.toLowerCase().includes(filters.category.toLowerCase())
            )
          : vendor.category
              .toLowerCase()
              .includes(filters.category.toLowerCase()));

      return dateCheck && locationCheck && categoryCheck;
    });
    setFilteredVendors(filtered);
  }, [filters]);

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  // Subscription Pie Chart Data
  const subscriptionCounts = { active: 0, expired: 0, "renewal due": 0 };
  filteredVendors.forEach((v) => {
    const key = v.subscription.toLowerCase();
    if (subscriptionCounts[key] !== undefined) subscriptionCounts[key]++;
  });
  const subscriptionData = Object.entries(subscriptionCounts).map(
    ([status, count]) => ({ name: status, value: count })
  );

  // Cards Summary
  const totalVendors = filteredVendors.length;
  const activeVendors = filteredVendors.filter(
    (v) => v.status === "active"
  ).length;
  const inactiveVendors = filteredVendors.filter(
    (v) => v.status === "inactive"
  ).length;
  const totalRevenue = filteredVendors.reduce((sum, v) => sum + v.revenue, 0);
  const avgRating = filteredVendors.length
    ? (
        filteredVendors.reduce((sum, v) => sum + v.rating, 0) /
        filteredVendors.length
      ).toFixed(1)
    : 0;

  // Category Table
  const revenueCount = {};
  filteredVendors.forEach((v) => {
    const cats = Array.isArray(v.category) ? v.category : [v.category];
    cats.forEach((cat) => {
      if (!revenueCount[cat]) revenueCount[cat] = { count: 0, revenue: 0 };
      revenueCount[cat].count += 1;
      revenueCount[cat].revenue += v.revenue;
    });
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Vendor Report", 14, 15);

    const tableData = filteredVendors.map((v) => [
      v.name,
      v.location,
      Array.isArray(v.category) ? v.category.join(", ") : v.category,
      v.subscription,
      v.status,
      `Rs. ${v.revenue.toLocaleString("en-IN")}`,

      v.rating,
      v.registeredAt,
    ]);

    autoTable(doc, {
      head: [
        [
          "Name",
          "Location",
          "Category",
          "Subscription",
          "Status",
          "Revenue",
          "Rating",
          "Registered",
        ],
      ],
      body: tableData,
      startY: 25,
    });

    doc.save("vendor-report.pdf");
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredVendors.map((v) => ({
        Name: v.name,
        Location: v.location,
        Category: Array.isArray(v.category)
          ? v.category.join(", ")
          : v.category,
        Subscription: v.subscription,
        Status: v.status,
        Revenue: v.revenue,
        Rating: v.rating,
        Registered: v.registeredAt,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vendor Report");
    XLSX.writeFile(wb, "vendor-report.xlsx");
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow items-end">
        {["from", "to", "location", "category"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 capitalize"
            >
              {field}
            </label>
            {field === "from" || field === "to" ? (
              <input
                id={field}
                type="date"
                name={field}
                value={filters[field]}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                aria-label={field}
              />
            ) : (
              <input
                id={field}
                type="text"
                name={field}
                value={filters[field]}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
                placeholder={
                  field === "location" ? "e.g., Indore" : "e.g., Cleaning"
                }
                aria-label={field}
              />
            )}
          </div>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4">
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <Card title="Total Vendors" count={totalVendors} big />
        </div>

        <Card title="Active Vendors" count={activeVendors} />
        <Card title="Inactive Vendors" count={inactiveVendors} />
        <Card
          title="Avg Rating"
          count={
            <>
              <FaStar className="inline text-yellow-500 mr-1 text-sm gap-2" />
              {avgRating}
            </>
          }
        />
        <Card
          title="Total Revenue"
          count={`₹${totalRevenue.toLocaleString("en-IN")}`}
        />
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 min-h-[320px] flex flex-col">
          <h2 className="font-bold text-xl text-gray-800 mb-6">
            📊 Subscription Status
          </h2>

          {totalVendors === 0 ? (
            <p className="text-center text-gray-400 mt-auto mb-auto">
              No vendors match the filter criteria.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={subscriptionData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  innerRadius={70}
                  stroke="#fff"
                  strokeWidth={3}
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {subscriptionData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="bg-white p-6 rounded-xl shadow text-sm font-semibold text-gray-800">
                        <p>{payload[0].name.toUpperCase()}</p>
                        <p className="text-gray-500">
                          Total: {payload[0].value}
                        </p>
                      </div>
                    ) : null
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Category Table */}
        <div className="bg-white p-4 rounded-xl shadow min-h-[320px] flex flex-col">
          <h2 className="font-semibold text-lg mb-4">Category Summary</h2>
          {totalVendors === 0 ? (
            <p className="text-center text-gray-400 mt-auto mb-auto">
              No data to display.
            </p>
          ) : (
            <div className="overflow-auto flex-grow">
              <table className="w-full text-left border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-3 border">Category</th>
                    <th className="py-2 px-3 border">Vendors</th>
                    <th className="py-2 px-3 border">Revenue (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(revenueCount).map(
                    ([cat, { count, revenue }]) => (
                      <tr key={cat} className="border-t">
                        <td className="py-2 px-3 border">{cat}</td>
                        <td className="py-2 px-3 border">{count}</td>
                        <td className="py-2 px-3 border">
                          ₹{revenue.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FaClipboardList className="text-gray-700 text-2xl" /> Vendor Full
          Details
        </h2>

        {totalVendors === 0 ? (
          <p className="text-center text-gray-400 py-6">No data to display.</p>
        ) : (
          <div>
            <table className="w-full text-md">
              <thead>
                <tr className="text-gray-700 border-b">
                  <th className="py-3 text-left px-4">Name</th>
                  <th className="py-3 text-left px-4">Location</th>
                  <th className="py-3 text-left px-4">Category</th>
                  <th className="py-3 text-left px-4">Subscription</th>
                  <th className="py-3 text-left px-4">Status</th>
                  <th className="py-3 text-left px-4">Revenue (₹)</th>
                  <th className="py-3 text-left px-4">Rating</th>
                  <th className="py-3 text-left px-4">Registered</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((v) => (
                  <tr
                    key={v.id}
                    className="bg-white border-b last:border-none hover:shadow-md hover:scale-[1.007] transition-all duration-300 rounded-md last:rounded-b-xl"
                  >
                    <td className="px-4 py-4 font-semibold text-gray-800">
                      {v.name}
                    </td>
                    <td className="px-4 py-4 text-gray-600">{v.location}</td>
                    <td className="px-4 py-4 text-gray-600">
                      {Array.isArray(v.category)
                        ? v.category.join(", ")
                        : v.category}
                    </td>
                    <td className="px-4 py-4 text-gray-600 capitalize">
                      {v.subscription}
                    </td>
                    <td className="px-4 py-4 capitalize">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          v.status === "active"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-800 font-semibold">
                      ₹{v.revenue.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-4 text-gray-800">⭐ {v.rating}</td>
                    <td className="px-4 py-4 text-gray-600">
                      {v.registeredAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-4 py-3 rounded-lg border font-medium bg-white shadow hover:bg-gray-100"
          aria-label="Export report as PDF"
        >
          <FaRegFilePdf className="text-red-500 text-lg" /> Export PDF
        </button>
        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2 px-4 py-3 rounded-lg border font-medium bg-white shadow hover:bg-gray-100"
          aria-label="Export report as Excel"
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
        big ? "text-xl text-gray-900" : "text-sm text-gray-700"
      }`}
    >
      {title}
    </h3>
    <p
      className={`font-bold ${
        big ? "text-5xl text-gray-900" : "text-2xl text-gray-900"
      }`}
    >
      {count}
    </p>
  </div>
);

export default VendorReport;
