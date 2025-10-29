import React, { useState } from "react";
import SocietyReport from "./SocietyReport";
import VendorReport from "./VendorReport";
import JobReport from "./JobReport";
import RevenueReport from "./RevenueReport";
import PerformanceReport from "./PerformanceReport";

// 🧩 Import Lucide icons
import { Folder, Wrench, FileText, DollarSign, BarChart3 } from "lucide-react";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("society");

  const tabs = [
    { key: "society", label: "Society Reports", icon: <Folder size={18} /> },
    { key: "vendor", label: "Vendor Reports", icon: <Wrench size={18} /> },
    { key: "job", label: "Job Reports", icon: <FileText size={18} /> },
    { key: "revenue", label: "Revenue Reports", icon: <DollarSign size={18} /> },
    { key: "performance", label: "Performance Reports", icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow max-w-full">
      {/* Page Heading Tabs */}
      <div className="flex gap-2 sm:gap-4 overflow-x-auto border-b border-gray-200 pb-2 mb-4 sm:mb-6 custom-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`whitespace-nowrap flex items-center gap-2 flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium transition-colors duration-200
              ${
                activeTab === tab.key
                  ? "text-[#00bfa5] border-b-2 border-[#00bfa5]"
                  : "text-gray-600 hover:text-gray-900"
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Report Components */}
      <div className="w-full overflow-x-auto">
        {activeTab === "society" && <SocietyReport />}
        {activeTab === "vendor" && <VendorReport />}
        {activeTab === "job" && <JobReport />}
        {activeTab === "revenue" && <RevenueReport />}
        {activeTab === "performance" && <PerformanceReport />}
      </div>
    </div>
  );
};

export default Reports;
