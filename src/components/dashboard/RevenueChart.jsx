import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const RevenueChart = () => {
  const allData = [
    { month: "Jan", date: "2025-01-01", revenue: 6500, lastYear: 5200 },
    { month: "Feb", date: "2025-02-01", revenue: 4000, lastYear: 5000 },
    { month: "Mar", date: "2025-03-01", revenue: 8000, lastYear: 6100 },
    { month: "Apr", date: "2025-04-01", revenue: 7500, lastYear: 6800 },
    { month: "May", date: "2025-05-01", revenue: 9500, lastYear: 7200 },
    { month: "Jun", date: "2025-06-01", revenue: 8500, lastYear: 7900 },
  ];

  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-06-30");

  const filteredData = allData.filter((item) => {
    const date = new Date(item.date);
    return (
      date >= new Date(startDate) &&
      date <= new Date(endDate)
    );
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-xl text-xs sm:text-sm">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-[#2c8582] font-semibold">
            This Year: ₹{payload[0].value.toLocaleString()}
          </p>
          <p className="text-[#57aca2]">
            Last Year: ₹{payload[1].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col gap-4">
      {/* --- Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-3 gap-2 sm:gap-4">
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-800">
            Revenue Overview
          </h4>
          <p className="text-xs text-gray-500 hidden sm:block">
            This Year vs Last Year
          </p>
        </div>

        {/* --- Date Range Filter --- */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-1 text-sm focus:ring focus:ring-blue-200"
          />
          <label className="text-sm text-gray-600">To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-1 text-sm focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      {/* --- Legend --- */}
      {/* <div className="flex items-center justify-end gap-3 sm:gap-6">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#2c8c99]"></div>
          <span className="text-xs sm:text-sm text-[#096B68] font-medium">
            2025 Revenue
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#3fc1c0]"></div>
          <span className="text-xs sm:text-sm text-[#50ada2] font-medium">
            2024 Revenue
          </span>
        </div>
      </div> */}

      {/* --- Chart --- */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[500px] md:min-w-0 min-h-[250px] md:min-h-[320px]">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={filteredData} barGap="5%">
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6B7280",
                  fontSize: window.innerWidth < 640 ? 10 : 12,
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6B7280",
                  fontSize: window.innerWidth < 640 ? 10 : 12,
                }}
                tickFormatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
              <Bar
                dataKey="revenue"
                fill="#2c8c99"
                name="This Year"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="lastYear"
                fill="#3fc1c0"
                name="Last Year"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
