import React, { useState } from "react";
import SocietyReport from "./SocietyReport";
import VendorReport from "./VendorReport";
import JobReport from "./JobReport";
import RevenueReport from "./RevenueReport";
import PerformanceReport from "./PerformanceReport";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("society");
  const tabs = [
    { key: "society", label: "📁 Society Reports" },
    { key: "vendor", label: "🧰 Vendor Reports" },
    { key: "job", label: "📝 Job Reports" },
    { key: "revenue", label: "💵 Revenue Reports" },
    { key: "performance", label: "📈 Performance Reports" },
  ];

  return (
    <div className="p-6 space-y-6 bg-[#f9fafb] min-h-screen">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-800">📊 Reports Dashboard</h1>

      {/* Horizontal Tabs */}
      <div className="flex gap-4 overflow-x-auto border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`whitespace-nowrap px-6 py-3 rounded-t-2xl font-semibold
            transition-colors duration-700 ease-in-out
         ${
           activeTab === tab.key
             ? "bg-gradient-to-r from-[#00bfa5] to-[#004d40] text-white shadow-md"
             : "bg-gray-200 text-gray-700 hover:bg-[#dddde2] shadow-inner hover:shadow-xl hover:scale-[1.03]"
         }
        `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Report Component Rendering */}
      <div className="bg-white rounded-xl p-6 shadow">
        {activeTab === "society" && (
          <div>
            <SocietyReport/>
          </div>
        )}
        {activeTab === "vendor" && (
            <div>
            <VendorReport/>
            </div>
        )}
        {activeTab === "job" && <div>
          <JobReport/>
          </div>}
        {activeTab === "revenue" && (
          <div>
            <RevenueReport/>
          </div>
        )}
        {activeTab === "performance" && (
          <div>
            <PerformanceReport/>
          </div>
        )}
      </div>
    </div>
  );
};
export default Reports;
