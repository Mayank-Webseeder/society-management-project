import React, { useState } from "react";
import StatsCards from "./StatsCards";
import RevenueChart from "./RevenueChart";
import DonutChart from "./DonutChart";
import { FaArrowTrendUp } from "react-icons/fa6";
import PostFeed from "./PostFeed";
import { useVendorContext } from "../../context/VendorContext";
import { useJobContext } from "../../context/JobContext";
import TopVendors from "./TopVendors";

const Dashboard = () => {
  const { vendors } = useVendorContext();
  const { jobs, totalJobs } = useJobContext();

  const statsData = [
    {
      title: "Total Societies Registered",
      value: 55,
      color: "#cbc0d3",
    },
    {
      title: "Societies Pending Approval",
      value: 20,

      color: "#98c1d9",
    },
    {
      title: "Total Vendors",
      value: 150,

      color: "#aed9e0",
    },
    {
      title: "Active Subscriptions",
      value: 130,

      color: "#ccc5b9",
    },
  ];

  const jobPosted = [
    {
      title: "Total jobs",
      value: 88,
      subText: "Jobs posted with status trends till the date",
      icon: <FaArrowTrendUp />,
      isPositive: true,
    },
  ];

  const [selected, setSelected] = useState("Daily");

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-5 space-y-5 sm:space-y-6">
      <StatsCards statsData={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col">
          <div className="pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Revenue Generated
            </h2>
          </div>
          <div className="flex-1 w-full">
            <RevenueChart />
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Jobs Overview
            </h4>
          </div>
          <DonutChart />
        </div>

        {/* Top Vendors */}
        <TopVendors />

        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-200 pb-3">
            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Job Post Trends
            </h4>
            <div className="flex flex-wrap gap-5 sm:gap-2 bg-white shadow-inner border border-gray-200 p-1 rounded-lg">
              {["Daily", "Monthly", "Yearly"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSelected(option)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition ${
                    selected === option
                      ? "bg-gray-300 text-gray-800 shadow"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <PostFeed selected={selected} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
