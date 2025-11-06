import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("Daily");

  // ✅ Fetch stats data using Axios
useEffect(() => {
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get JWT token

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/dashboard-stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token in header
          },
        }
      );

      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      if (error.response && error.response.status === 401) {
        console.warn("Unauthorized - Token might be invalid or expired");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);


  // ✅ Prepare dynamic data after API fetch
  const statsData = stats
    ? [
        {
          title: "Total Societies Registered",
          value: stats.societies.total,
          color: "#cbc0d3",
        },
        {
          title: "Societies Pending Approval",
          value: stats.societies.pendingApproval,
          color: "#98c1d9",
        },
        {
          title: "Total Vendors",
          value: stats.vendors.total,
          color: "#aed9e0",
        },
        {
          title: "Active Subscriptions",
          value: stats.vendors.activeSubscriptions,
          color: "#ccc5b9",
        },
      ]
    : [];

  const jobPosted = stats
    ? [
        {
          title: "New Jobs",
          value: stats.jobs.new,
          subText: "New jobs created till date",
          icon: <FaArrowTrendUp />,
          isPositive: true,
        },
        {
          title: "Completed Jobs",
          value: stats.jobs.completed,
          subText: "Jobs successfully completed",
          icon: <FaArrowTrendUp />,
          isPositive: true,
        },
      ]
    : [];

  if (loading) {
    return <p className="text-center text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className="w-full mx-auto space-y-5 sm:space-y-6">
      {/* Stats Cards */}
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

        {/* Job Post Trends */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-200 pb-3">
            <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Job Post Trends
            </h4>
            <div className="flex flex-wrap gap-5 sm:gap-2 bg-white shadow-inner border border-gray-200 p-1 rounded-lg">
              {["Weekly", "Monthly", "Yearly"].map((option) => (
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
