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
<div className="bg-white rounded-xl p-4 sm:p-6 shadow max-w-full">
  {/* Page Heading */}
  <div className="flex gap-2 sm:gap-4 overflow-x-auto border-b pb-2 mb-4 sm:mb-6 custom-scrollbar">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        onClick={() => setActiveTab(tab.key)}
        className={`whitespace-nowrap flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded-t-2xl text-sm sm:text-base font-medium sm:font-semibold transition-all duration-300
          ${
            activeTab === tab.key
              ? "bg-gradient-to-r from-[#00bfa5] to-[#004d40] text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-[#dddde2] shadow-inner hover:shadow-lg hover:scale-[1.02]"
          }
        `}
      >
        {tab.label}
      </button>
    ))}
  </div>

  {/* Report Component Rendering */}
  <div className="w-full overflow-x-auto">
    {activeTab === "society" && (
      <div className="min-w-full">
        <SocietyReport />
      </div>
    )}
    {activeTab === "vendor" && (
      <div className="min-w-full">
        <VendorReport />
      </div>
    )}
    {activeTab === "job" && (
      <div className="min-w-full">
        <JobReport />
      </div>
    )}
    {activeTab === "revenue" && (
      <div className="min-w-full">
        <RevenueReport />
      </div>
    )}
    {activeTab === "performance" && (
      <div className="min-w-full">
        <PerformanceReport />
      </div>
    )}
  </div>
</div>

  );
};
export default Reports;
