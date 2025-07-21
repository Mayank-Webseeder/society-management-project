import React, { useState } from "react";
import MyProfile from "./MyProfile";
import SecurityForm from "./SecurityForm";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl bg-gray-100 p-1 shadow-inner">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-7 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === "profile"
                ? "bg-[#6f8a93] text-white shadow-md scale-[1.02]"
                : "bg-[#f9fafb] text-gray-800 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-7 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === "security"
                ? "bg-[#6f8a93] text-white shadow-md scale-[1.02]"
                : "bg-[#f9fafb] text-gray-800 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            Security Settings
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div>
        {activeTab === "profile" && <MyProfile />}
        {activeTab === "security" && <SecurityForm />}
      </div>
    </div>
  );
};

export default Setting;
