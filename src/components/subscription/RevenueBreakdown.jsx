import React from "react";
import CountUp from "react-countup";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { TrendingUp, UserCheck } from "lucide-react";

const RevenueBreakdown = () => {
  const totalRevenue = 235000;

  const revenueByPlan = [
    { name: "Basic Plan", value: 95000, activeUsers: 1200 },
    { name: "Pro Plan", value: 60000, activeUsers: 800 },
    { name: "Premium Plan", value: 85000, activeUsers: 1500 },
  ];

  const COLORS = ["#60A5FA", "#34D399", "#FBBF24"];

  const monthlyTrend = [
    { month: "Jan", revenue: 15000 },
    { month: "Feb", revenue: 22000 },
    { month: "Mar", revenue: 30000 },
    { month: "Apr", revenue: 27000 },
    { month: "May", revenue: 40000 },
    { month: "Jun", revenue: 55000 },
    { month: "July", revenue: 50000 },
    { month: "Aug", revenue: 60000 },
    { month: "Sep", revenue: 58000 },
    { month: "Oct", revenue: 65000 },
    { month: "Nov", revenue: 70000 },
    { month: "Dec", revenue: 80000 },
  ];

  //top selling plan by revenue
  const topSellingPlan = revenueByPlan.reduce((prev, current) =>
    current.value > prev.value ? current : prev
  );

  // most active plan by activeUsers
  const mostActivePlan = revenueByPlan.reduce((prev, current) =>
    current.activeUsers > prev.activeUsers ? current : prev
  );

  // Calculate total active users for progress bar scaling
  const totalActiveUsers = revenueByPlan.reduce(
    (sum, plan) => sum + plan.activeUsers,
    0
  );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 px-8">Revenue Breakdown</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="p-6 rounded-3xl border border-indigo-200 bg-gradient-to-tr from-indigo-50 to-purple-100 shadow-lg flex flex-col justify-center items-center hover:shadow-2xl transition-transform duration-300">
          <h4 className="text-lg font-semibold text-indigo-700 mb-2 tracking-wide">
            Total Revenue
          </h4>
          <div className="text-5xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-600 text-transparent bg-clip-text">
            <CountUp end={totalRevenue} duration={3} separator="," prefix="₹" />
          </div>
        </div>

        {/* Top Selling Plan */}
        <div className="p-6 rounded-3xl border border-green-300 bg-gradient-to-tr from-green-50 to-green-100 shadow-md flex flex-col justify-center items-center hover:shadow-xl transition-transform duration-300 relative">
          <div className="absolute -top-6 bg-green-400 rounded-full p-3 shadow-lg">
            <TrendingUp size={28} className="text-white" />
          </div>
          <h4 className="mt-6 text-lg font-semibold text-green-700 mb-1 tracking-wide">
            Top Selling Plan
          </h4>
          <div className="text-2xl font-bold text-green-800">
            {topSellingPlan.name}
          </div>
          <div className="text-lg text-green-700 mt-1">
            ₹{topSellingPlan.value.toLocaleString()}
          </div>
        </div>

        {/* Most Active Plan */}
        <div className="p-6 rounded-3xl border border-yellow-300 bg-gradient-to-tr from-yellow-50 to-yellow-100 shadow-md flex flex-col justify-center items-center hover:shadow-xl transition-transform duration-300 relative">
          <div className="absolute -top-6 bg-yellow-400 rounded-full p-3 shadow-lg">
            <UserCheck size={28} className="text-white" />
          </div>
          <h4 className="mt-6 text-lg font-semibold text-yellow-700 mb-1 tracking-wide">
            Most Active Plan
          </h4>
          <div className="text-2xl font-bold text-yellow-800">
            {mostActivePlan.name}
          </div>
          <div className="text-lg text-yellow-700 mt-1">
            {mostActivePlan.activeUsers.toLocaleString()}
            <span className="text-sm text-yellow-600 ml-1">users</span>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl shadow-lg bg-white md:col-span-1">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Revenue by Plan
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={revenueByPlan}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {revenueByPlan.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center mt-4 gap-4 flex-wrap">
            {revenueByPlan.map((entry, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="p-6 rounded-2xl shadow-lg bg-white md:col-span-2">
          <h4 className="text-md font-semibold text-gray-700 mb-4">
            Monthly Revenue Trend
          </h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyTrend} barSize={40}>
              <CartesianGrid strokeDasharray="2 2" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 16, fill: "#6B7280", fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 14, fill: "#6B7280", fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
                labelStyle={{ color: "#374151", fontWeight: 500 }}
                itemStyle={{ color: "#6366F1", fontWeight: 500 }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Bar
                dataKey="revenue"
                fill="url(#colorRevenue)"
                radius={[6, 6, 0, 0]}
                isAnimationActive={true}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A5B4FC" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#C4B5FD" stopOpacity={0.7} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueBreakdown;
