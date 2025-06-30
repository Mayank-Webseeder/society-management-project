import React from "react";
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
import { RiCheckboxBlankCircleLine } from "react-icons/ri";

const RevenueChart = () => {
  const data = [
    { month: "Jan", revenue: 6500, lastYear: 5200 },
    { month: "Feb", revenue: 4000, lastYear: 5000 },
    { month: "Mar", revenue: 8000, lastYear: 6100 },
    { month: "Apr", revenue: 7500, lastYear: 6800 },
    { month: "May", revenue: 9500, lastYear: 7200 },
    { month: "Jun", revenue: 8500, lastYear: 7900 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 sm:p-4 border border-gray-200 shadow-lg rounded-xl text-xs sm:text-sm">
          <p className="font-medium text-gray-800">{`${label}`}</p>
          <p className="text-[#2c8582] font-semibold">{`This Year: ₹${payload[0].value.toLocaleString()}`}</p>
          <p className="text-[#57aca2]">{`Last Year: ₹${payload[1].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;s
  };
  return (
    <div className="w-full bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-3 gap-2 sm:gap-4">
        <div>
          <h4 className="text-md sm:text-lg font-semibold text-gray-800">
            Revenue Overview
          </h4>
          <p className="text-xs text-gray-500 hidden sm:block">
            This Year vs Last Year
          </p>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-sm text-[#096B68] font-medium">
              2025 Revenue
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-light"></div>
            <span className="text-sm text-[#50ada2] font-medium">
              2024 Revenue
            </span>
          </div>
        </div>
      </div>

    {/* chart-container */}
      <div className="w-full overflow-x-auto h-64 sm:h-80 focus:outline-none">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap="3%">
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              padding={{ left: 0, right: 10 }}
              tick={{ fill: "#6B7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280" }}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="#2c8c99"
              name="This Year"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="lastYear"
              fill="#aed9e0"
              name="Last Year"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
