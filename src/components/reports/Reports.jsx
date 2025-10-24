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
 <div className="flex gap-2 sm:gap-4 overflow-x-auto border-b border-gray-200 pb-2 mb-4 sm:mb-6 custom-scrollbar">
  {tabs.map((tab) => (
    <button
      key={tab.key}
      onClick={() => setActiveTab(tab.key)}
      className={`whitespace-nowrap flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium transition-colors duration-200
        ${
          activeTab === tab.key
            ? "text-[#00bfa5] border-b-2 border-[#00bfa5]"
            : "text-gray-600 hover:text-gray-900"
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
