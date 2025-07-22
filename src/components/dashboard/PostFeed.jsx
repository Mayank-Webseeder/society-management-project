import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dailyData = [
  { day: "Mon", jobs: 5 },
  { day: "Tue", jobs: 8 },
  { day: "Wed", jobs: 4 },
  { day: "Thu", jobs: 10 },
  { day: "Fri", jobs: 6 },
  { day: "Sat", jobs: 7 },
  { day: "Sun", jobs: 3 },
];
const monthlyData = [
  { month: "Jan", jobs: 65 },
  { month: "Feb", jobs: 45 },
  { month: "Mar", jobs: 80 },
  { month: "Apr", jobs: 70 },
  { month: "May", jobs: 100 },
  { month: "Jun", jobs: 125 },
  { month: "Jul", jobs: 111 },
  { month: "Aug", jobs: 145 },
  { month: "Sep", jobs: 132 },
  { month: "Oct", jobs: 100 },
  { month: "Nov", jobs: 135 },
  { month: "Dec", jobs: 155 },
];

const yearlyData = [
  { year: "2021", jobs: 1200 },
  { year: "2022", jobs: 1500 },
  { year: "2023", jobs: 2200 },
  { year: "2024", jobs: 2000 },
  { year: "2025", jobs: 2500 },
];

const PostFeed = ({ selected }) => {
  const getChartData = () => {
    if (selected === "Daily") return dailyData;
    if (selected === "Monthly") return monthlyData;
    return yearlyData;
  };

  const getXAxisKey = () => {
    if (selected === "Daily") return "day";
    if (selected === "Monthly") return "month";
    return "year";
  };

  const chartData = getChartData();
  const latest = chartData[chartData.length - 1]?.jobs || 0;

  return (
    <div className="w-full flex flex-col">
      {/* Small Screen Card */}
      <div className="block md:hidden p-4">
        <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#cde6ea] to-[#8DBCC7] shadow-xl border border-white/30 overflow-hidden flex flex-col justify-between min-h-[240px] gap-4">
          <div className="flex justify-center mb-2">
            <span className="px-4 py-1 rounded-full text-sm font-semibold text-[#0e3d47] bg-white/50 backdrop-blur-sm border border-white/40 shadow-sm select-none">
              {selected} Overview
            </span>
          </div>

          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-md flex flex-col items-center justify-center text-[#0e3d47] select-none">
              <span className="text-3xl font-extrabold drop-shadow-sm">
                {latest}
              </span>
              <span className="text-[11px] font-medium">Jobs</span>
            </div>
          </div>

          <p className="text-center text-sm text-[#0e3d47] font-medium tracking-wide select-none">
            Total Jobs in {selected}
          </p>

          <div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-white/40 blur-3xl opacity-30 pointer-events-none"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/30 blur-2xl opacity-20 pointer-events-none"></div>
        </div>
      </div>

      {/* Large Screen Chart */}
      <div className="hidden md:block h-72 lg:h-96 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey={getXAxisKey()}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#374151", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#374151", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                fontSize: "12px",
              }}
              cursor={{ stroke: "#CBD5E1", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="jobs"
              stroke="#7E6363"
              strokeWidth={2}
              dot={{ r: 4, fill: "#7E6363", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{
                r: 6,
                fill: "#fff",
                stroke: "#7E6363",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PostFeed;
