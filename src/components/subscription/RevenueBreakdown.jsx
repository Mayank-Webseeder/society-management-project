import { useState, useEffect } from "react";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { UserCheck } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";

const RevenueBreakdown = () => {
  const plan = {
    name: "Basic Plan",
    value: 95000,
    activeUsers: 1200,
  };

  // Monthly revenue trend data
  const monthlyTrend = [
    { month: "Jan", revenue: 15000 },
    { month: "Feb", revenue: 22000 },
    { month: "Mar", revenue: 30000 },
    { month: "Apr", revenue: 27000 },
    { month: "May", revenue: 40000 },
    { month: "Jun", revenue: 55000 },
    { month: "Jul", revenue: 50000 },
    { month: "Aug", revenue: 60000 },
    { month: "Sep", revenue: 58000 },
    { month: "Oct", revenue: 65000 },
    { month: "Nov", revenue: 70000 },
    { month: "Dec", revenue: 80000 },
  ];
  const statsCards = [
    {
      label: "Total Revenue",
      value: plan.value,
      isCurrency: true,
      icon: FaRupeeSign,
      bg: "bg-indigo-200",
    },
    {
      label: "Active Users",
      value: plan.activeUsers,
      icon: UserCheck,
      bg: "bg-amber-200",
    },
  ];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 px-0 sm:px-0 md:px-0">
        Revenue Breakdown
      </h3>

<div className="flex flex-col sm:flex-row flex-wrap gap-4 lg:gap-6">
        {statsCards.map(({ label, value, icon: Icon, bg, isCurrency }, index) => (
          <div
            key={index}
            className={`${bg} w-full lg:w-[20vw] rounded-2xl p-4 shadow flex items-center justify-between min-h-[80px]`}
          >
            <div>
              <p className="text-black text-sm font-medium">{label}</p>
              <p className="text-3xl font-bold text-black mt-1">
                {isCurrency ? (
                  <CountUp end={value} duration={3} separator="," prefix="₹" />
                ) : (
                  value.toLocaleString()
                )}
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-full">
              <Icon className="w-6 h-6 text-black" />
            </div>
          </div>
        ))}
      </div>



      {/* Monthly Revenue Trend */}
      <div className="p-0 md:p-6 rounded-2xl shadow-lg bg-white mt-6 w-full max-w-full overflow-x-auto">
        <h4 className="text-md font-semibold text-gray-700 mb-6 px-4 md:px-0">
          Monthly Revenue Trend
        </h4>

        <div className="min-w-[700px] md:min-w-full mb-4">
          <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
            <BarChart data={monthlyTrend} barSize={isMobile ? 32 : 40}>
              <CartesianGrid strokeDasharray="2 2" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                tick={{
                  fontSize: isMobile ? 12 : 16,
                  fill: "#6B7280",
                  fontWeight: 600,
                }}
                axisLine={false}
                tickLine={false}
                interval={isMobile ? 0 : "preserveStartEnd"}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? "end" : "middle"}
              />
              <YAxis
                tick={{
                  fontSize: isMobile ? 10 : 14,
                  fill: "#6B7280",
                  fontWeight: 600,
                }}
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
