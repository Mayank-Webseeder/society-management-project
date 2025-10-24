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
  FaUsers,
  FaUserCheck,
   FaUserTimes,
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
      <div className="bg-white rounded-xl border shadow p-4 flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:items-end">
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
    <div className="flex w-full gap-4">
  <div className="">
    <Card
      title="Total Vendors"
      count={totalVendors}
      icon={FaUsers}
      bgColor="bg-blue-200"
    />
  </div>

  <div className="">
    <Card
      title="Active Vendors"
      count={activeVendors}
      icon={FaUserCheck}
      bgColor="bg-green-200"
    />
  </div>

  <div className="">
    <Card
      title="Inactive Vendors"
      count={inactiveVendors}
      icon={FaUserTimes}
      bgColor="bg-red-200"
    />
  </div>

 

  <div className="">
    <Card
      title="Total Revenue"
      count={
        <span className="text-lg sm:text-xl md:text-2xl xl:text-xl 2xl:text-2xl text-gray-900 font-bold whitespace-nowrap">
          ₹{totalRevenue.toLocaleString("en-IN")}
        </span>
      }
      icon={FaRupeeSign}
      bgColor="bg-purple-200"
    />
  </div>
</div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="bg-white border p-4 sm:p-5 rounded-2xl shadow transition-shadow duration-300 min-h-[300px] flex flex-col">
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
      

          <div className=" flex items-center justify-between py-3">
  <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaClipboardList className="text-gray-700 text-2xl" />
          Vendor Full Details
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

    {totalVendors === 0 ? (
  <p className="text-center text-gray-400 py-6">No data to display.</p>
) : (
  <>
    {/* Mobile card view */}
    <div className="block md:hidden space-y-5">
      {filteredVendors.map((v) => (
        <div
          key={v.id}
          className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white p-5"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {v.name}
          </h3>

          <div className="space-y-2 text-gray-700 text-sm">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <span><strong>Location:</strong> {v.location}</span>
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
    <div className="hidden md:block overflow-x-auto rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr className="text-gray-700 uppercase text-xs tracking-wide">
            <th className="py-4 px-5 font-semibold">Name</th>
            <th className="py-4 px-5 font-semibold">Location</th>
            <th className="py-4 px-5 font-semibold">Category</th>
            <th className="py-4 px-5 font-semibold">Subscription</th>
            <th className="py-4 px-5 font-semibold">Status</th>
            <th className="py-4 px-5 font-semibold">Revenue (₹)</th>
            <th className="py-4 px-5 font-semibold">Rating</th>
            <th className="py-4 px-5 font-semibold">Registered</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.map((v, idx) => (
            <tr
              key={v.id}
              className={`${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50 hover:shadow-md transition-all duration-200`}
            >
              <td className="px-5 py-4 font-medium text-gray-800">
                {v.name}
              </td>
              <td className="px-5 py-4 text-gray-600">{v.location}</td>
              <td className="px-5 py-4 text-gray-600">
                {Array.isArray(v.category)
                  ? v.category.join(", ")
                  : v.category}
              </td>
              <td className="px-5 py-4 capitalize text-gray-600">
                {v.subscription}
              </td>
              <td className="px-5 py-4 capitalize">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    v.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {v.status}
                </span>
              </td>
              <td className="px-5 py-4 font-semibold text-gray-800">
                ₹{v.revenue.toLocaleString("en-IN")}
              </td>
              <td className="px-5 py-4 text-gray-800">
                <FaStar className="inline text-yellow-500 mr-1" />
                {v.rating}
              </td>
              <td className="px-5 py-4 text-gray-600">
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

export default VendorReport;
