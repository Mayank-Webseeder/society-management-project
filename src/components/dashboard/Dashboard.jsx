import React, { useState } from "react";
import StatsCards from "./StatsCards";
import RevenueChart from "./RevenueChart";
import DonutChart from "./DonutChart";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
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
    <div className="space-y-4 px-3 sm:px-4 md:px-5 py-1">
      <StatsCards statsData={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4 flex flex-col">
          <div className="pb-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Revenue Generated
            </h2>
          </div>
          <div className="flex-1">
            <RevenueChart />
          </div>
        </div>

        <div className="w-full bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-800">
              Jobs Overview
            </h4>
          </div>
          <DonutChart />
        </div>

        {/* Total jobs stat card */}
            <TopVendors />
      
        {/* line chart for job post trends */}
        <div className="lg:col-span-2 w-full bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-200 pb-3">
            <h4 className="text-lg sm:text-xl font-semibold text-gray-800">
              Job Post Trends
            </h4>
            <div className="flex gap-2 bg-white shadow-inner border border-gray-200 p-1 rounded-lg">
              {["Daily", "Monthly", "Yearly"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSelected(option)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
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

          {/* Chart area */}
          <PostFeed selected={selected} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
