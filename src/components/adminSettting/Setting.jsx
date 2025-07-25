import React, { useState } from "react";
import MyProfile from "./MyProfile";
import SecurityForm from "./SecurityForm";

const tabs = [
  { key: "profile", label: "Profile Info" },
  { key: "security", label: "Security Settings" },
];

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Tabs */}
      <div className="px-6 pt-5 border-b border-gray-100">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative pb-2 text-md font-semibold transition-all duration-300 hover:text-[#0D5EA6] ${
                activeTab === tab.key ? "text-[#0D5EA6]" : "text-[#548cab]"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#0D5EA6] rounded-full transition-all duration-300" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {activeTab === "profile" && <MyProfile />}
        {activeTab === "security" && <SecurityForm />}
      </div>
    </div>
  );
};

export default Setting;
