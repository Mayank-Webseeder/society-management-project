import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const GrowthTrend = ({ societies, vendors }) => {
  const chartData = useMemo(() => {
    const groupedData = {};

    societies.forEach(({ createdAt }) => {
      const month = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
      groupedData[month] = groupedData[month] || {
        month,
        societies: 0,
        vendors: 0,
      };
      groupedData[month].societies += 1;
    });

    vendors.forEach(({ createdAt }) => {
      const month = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
      groupedData[month] = groupedData[month] || {
        month,
        societies: 0,
        vendors: 0,
      };
      groupedData[month].vendors += 1;
    });

    const sortedMonths = Object.keys(groupedData).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    return sortedMonths.map((month) => groupedData[month]);
  }, [societies, vendors]);

  return (
    <div className="w-full">
      <div className=" bg-white rounded-2xl  p-4 sm:p-6 border">
        <div className="mb-5">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Growth Trend
          </h3>
          <p className="text-sm text-gray-500">
            Monthly overview of new registrations
          </p>
        </div>

        {/* Chart */}
        <div className="w-full overflow-x-auto sm:overflow-x-visible">
          <div className="min-w-[400px] sm:min-w-full">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="societyFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="vendorFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  allowDecimals={false}
                  domain={[0, "dataMax + 5"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                  labelStyle={{ color: "#111827", fontWeight: "500" }}
                  formatter={(value, name) => [
                    value,
                    name === "societies" ? "New Societies" : "New Vendors",
                  ]}
                />
                <Area
                  type="cardinal"
                  dataKey="societies"
                  stroke="#3B82F6"
                  strokeWidth={1}
                  fill="url(#societyFill)"
                  activeDot={{ r: 5, strokeWidth: 2, stroke: "#2563EB" }}
                />
                <Area
                  type="cardinal"
                  dataKey="vendors"
                  stroke="#10B981"
                  strokeWidth={1}
                  fill="url(#vendorFill)"
                  activeDot={{ r: 5, strokeWidth: 2, stroke: "#059669" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex justify-end gap-6 mt-5 text-sm text-gray-700 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#3B82F6]" />
            New Societies
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            New Vendors
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthTrend;
