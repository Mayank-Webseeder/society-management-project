import React, { useState, useEffect } from "react";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa6";
import {
  FaClipboardList,
  FaMapMarkerAlt,
  FaTags,
  FaTag,
  FaCheckCircle,
  FaTimesCircle,
  FaRupeeSign,
  FaStar,
  FaCalendarAlt,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { useMediaQuery } from "react-responsive";

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
  const isSmallScreen = useMediaQuery({ maxWidth: 639 });

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
      <div className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:items-end">
        {["from", "to", "category", "location"].map((field) => (
          <div key={field} className="w-full sm:w-auto flex-1 min-w-[150px]">
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 mb-1 capitalize"
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
                className="border rounded-md px-3 py-2 w-full"
                aria-label={field}
              />
            ) : (
              <input
                id={field}
                type="text"
                name={field}
                value={filters[field]}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
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
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="col-span-1 xs:col-span-2 md:col-span-3 lg:col-span-1">
          <Card title="Total Vendors" count={totalVendors} big />
        </div>

        <div className="col-span-1 lg:col-span-1">
          <Card title="Active Vendors" count={activeVendors} />
        </div>

        <div className="col-span-1 lg:col-span-1">
          <Card title="Inactive Vendors" count={inactiveVendors} />
        </div>

        <div className="col-span-1 lg:col-span-1">
          <Card
            title="Avg Rating"
            count={
              <div className="flex items-center justify-center gap-1 text-sm text-gray-800 font-semibold">
                <FaStar className="text-yellow-500 text-sm mt-[1px]" />
                {avgRating}
              </div>
            }
          />
        </div>

        <div className="col-span-1 lg:col-span-1">
          <Card
            title="Total Revenue"
            count={
              <span className="text-lg sm:text-xl md:text-2xl xl:text-xl 2xl:text-2xl text-gray-900 font-bold whitespace-nowrap">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </span>
            }
          />
        </div>
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 min-h-[300px] flex flex-col">
          <h2 className="font-bold text-lg sm:text-xl text-gray-800 mb-4 sm:mb-6">
            📊 Subscription Status
          </h2>

          {totalVendors === 0 ? (
            <p className="text-center text-gray-400 mt-auto mb-auto text-sm sm:text-base">
              No vendors match the filter criteria.
            </p>
          ) : (
            <div className="w-full h-[260px] sm:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={isSmallScreen ? 80 : 110}
                    innerRadius={isSmallScreen ? 50 : 70}
                    stroke="#fff"
                    strokeWidth={3}
                    labelLine={false}
                    label={
                      !isSmallScreen
                        ? ({ name, value }) => `${name}: ${value}`
                        : false
                    }
                  >
                    {subscriptionData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="bg-white p-3 rounded-xl shadow text-xs sm:text-sm font-semibold text-gray-800">
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
            </div>
          )}
        </div>

        {/* Category Table */}
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow min-h-[300px] flex flex-col">
          <h2 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
            Category Summary
          </h2>
          {totalVendors === 0 ? (
            <p className="text-center text-gray-400 mt-auto mb-auto text-sm sm:text-base">
              No data to display.
            </p>
          ) : (
            <div className="overflow-x-auto flex-grow">
              <table className="w-full min-w-[320px] text-left border text-sm sm:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-2 sm:px-3 border whitespace-nowrap">
                      Category
                    </th>
                    <th className="py-2 px-2 sm:px-3 border whitespace-nowrap">
                      Vendors
                    </th>
                    <th className="py-2 px-2 sm:px-3 border whitespace-nowrap">
                      Revenue (₹)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(revenueCount).map(
                    ([cat, { count, revenue }]) => (
                      <tr key={cat} className="border-t">
                        <td className="py-2 px-2 sm:px-3 border">{cat}</td>
                        <td className="py-2 px-2 sm:px-3 border">{count}</td>
                        <td className="py-2 px-2 sm:px-3 border">
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

      <div className="bg-white rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FaClipboardList className="text-gray-700 text-2xl" />
          Vendor Full Details
        </h2>

        {totalVendors === 0 ? (
          <p className="text-center text-gray-400 py-6">No data to display.</p>
        ) : (
          <>
            <div className="block md:hidden space-y-5">
              {filteredVendors.map((v) => (
                <div
                  key={v.id}
                  className="rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 bg-white p-5"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {v.name}
                  </h3>

                  <div className="space-y-3 text-gray-700 text-sm">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-500" />
                      <span>
                        <strong>Location:</strong> {v.location}
                      </span>
                    </p>

                    <p className="flex items-center gap-2">
                      <FaTags className="text-gray-500" />
                      <span>
                        <strong>Category:</strong>{" "}
                        {Array.isArray(v.category)
                          ? v.category.join(", ")
                          : v.category}
                      </span>
                    </p>

                    <p className="flex items-center gap-2 capitalize">
                      <FaTag className="text-gray-500" />
                      <span>
                        <strong>Subscription:</strong> {v.subscription}
                      </span>
                    </p>

                    <p className="flex items-center gap-2 capitalize">
                      {v.status === "active" ? (
                        <FaCheckCircle className="text-green-600" />
                      ) : (
                        <FaTimesCircle className="text-red-600" />
                      )}
                      <span
                        className={`font-semibold ${
                          v.status === "active"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        Status: {v.status}
                      </span>
                    </p>

                    <p className="flex items-center gap-2 font-semibold text-gray-800">
                      <FaRupeeSign />
                      <span>Revenue: ₹{v.revenue.toLocaleString("en-IN")}</span>
                    </p>

                    <p className="flex items-center gap-2 text-gray-800">
                      <FaStar className="text-yellow-500" />
                      <span>Rating: {v.rating}</span>
                    </p>

                    <p className="flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt />
                      <span>Registered: {v.registeredAt}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Table view for large screens */}
            <div className="hidden md:block">
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
          </>
        )}
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

export default VendorReport;
