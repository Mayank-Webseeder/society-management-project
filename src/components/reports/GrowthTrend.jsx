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
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[800px] bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Growth Trend
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSociety" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7E3AF2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7E3AF2" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorVendor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#4B5563" }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#4B5563" }}
              allowDecimals={false}
              domain={[0, "dataMax + 5"]}
            />

            <Tooltip
              formatter={(value, name) => [
                value,
                name === "societies" ? "New Societies" : "New Vendors",
              ]}
              labelFormatter={(label) => label}
            />
            <Area
              type="basis"
              dataKey="societies"
              stroke="#7E3AF2"
              fillOpacity={1}
              fill="url(#colorSociety)"
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#5B21B6" }}
            />
            <Area
              type="basis"
              dataKey="vendors"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorVendor)"
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#2563EB" }}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-8 mt-4 text-gray-700 text-sm select-none">
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#7E3AF2" }}
            />
            New Societies
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#3B82F6" }}
            />
            New Vendors
          </div>
        </div>
      </div>

    </div>
      
     
  
  );
};

export default GrowthTrend;
