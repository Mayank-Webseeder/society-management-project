import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneCall, MessageSquare, CheckCircle2 } from "lucide-react";
import { useJobContext } from "../../context/JobContext";
import { useParams } from "react-router-dom";

const JobDetailProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");
  const { jobs } = useJobContext();
  const { id } = useParams();
  const job = jobs.find((j) => j._id === id);

  if (!job) return <div className="text-center py-10">Job Not Found</div>;

  const handleAssignVendor = (vendor) => {
    alert(`${vendor.name} has been assigned as the selected vendor.`);
    setActiveTab("selected vendor");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmDelete) {
      alert("Job Deleted Successfully");
      navigate("/jobs");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mt-3 px-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-md gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
          Back
        </button>
        <div className="w-20" />
      </div>

      {/* Main Card */}
      <div className="px-4 sm:px-6 py-6 space-y-4">
        {/* Sticky Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start border-b pb-4 bg-white z-20">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {job.title}
              </h2>
              <span
                className={`px-4 py-1 rounded-full text-xs font-medium ${
                  job.status === "Open"
                    ? "bg-green-100 text-green-700"
                    : job.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {job.status}
              </span>
            </div>
            <div className="text-gray-500 text-sm">
              {job.societyName} • {job.createdAt}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex gap-2 mt-4 sm:mt-0 sm:justify-end">
            <button
              onClick={() => alert("Job Closed")}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition"
            >
              Close Job
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium transition"
            >
              Delete Job
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b bg-white px-1 sm:px-0">
          {[
            "description",
            "vendor applications",
            "assign vendor",
            "selected vendor",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 font-medium capitalize text-sm sm:text-base whitespace-nowrap ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-8">
          {/* Description */}
          {activeTab === "description" && (
            <div className="mt-[20px] sm:mt-0 bg-gray-50 p-4 sm:p-6 rounded-xl shadow border border-gray-200 space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Job Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
                <div>
                  <span className="font-semibold">Society Name: </span>
                  {job.societyName}
                </div>
                <div>
                  <span className="font-semibold">Job Title: </span>
                  {job.title}
                </div>
                <div>
                  <span className="font-semibold">Status: </span>
                  {job.status}
                </div>
                <div>
                  <span className="font-semibold">Created Date: </span>
                  {job.createdAt}
                </div>
                <div>
                  <span className="font-semibold">Quotation Required: </span>
                  {job.quotationRequired ? "Yes" : "No"}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Description:
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>
          )}

          {/* Vendor Applications */}
          {activeTab === "vendor applications" && (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Vendor Applications
              </h3>
              {job.vendorApplications.length === 0 ? (
                <p className="text-gray-500">No vendor has applied yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-[#e3f2f7] text-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">
                          Vendor Name
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          Contact
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          Applied Date
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          Quotation (₹)
                        </th>
                        <th className="px-4 py-3 text-left font-medium">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {job.vendorApplications.map((vendor) => (
                        <tr
                          key={vendor._id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-4 font-medium">
                            {vendor.name}
                          </td>
                          <td className="px-4 py-4">{vendor.contact}</td>
                          <td className="px-4 py-4">{vendor.email}</td>
                          <td className="px-4 py-4">{vendor.appliedDate}</td>
                          <td className="px-4 py-4">₹{vendor.quotation}</td>
                          <td className="px-4 py-4">{vendor.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Assign Vendor */}
          {activeTab === "assign vendor" && (
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
                Assign Vendor
              </h3>
              {job.vendorApplications.length === 0 ? (
                <p className="text-gray-500">No vendor has applied yet.</p>
              ) : (
                <div className="space-y-4">
                  {job.vendorApplications.map((vendor) => (
                    <div
                      key={vendor._id}
                      className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-2xl bg-gray-50 hover:shadow transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                          {vendor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {vendor.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {vendor.contact} • {vendor.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAssignVendor(vendor)}
                        className="flex items-center gap-2 bg-green-200 text-green-700 px-4 py-2 rounded-2xl hover:bg-green-400 text-sm font-medium transition transform hover:scale-105"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Assign this vendor
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Selected Vendor */}
          {activeTab === "selected vendor" && (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Selected Vendor
              </h3>
              {job.selectedVendor ? (
                <div className="flex flex-col sm:flex-row items-start gap-5 p-5 border border-green-200 rounded-xl bg-green-50 shadow-sm relative">
                  <div className="absolute -top-3 -left-3 bg-green-500 text-white p-2 rounded-full shadow">
                    ✔
                  </div>
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-lg font-bold">
                    {job.selectedVendor.name.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 mb-4">
                      <div>
                        <span className="font-semibold">Name: </span>
                        {job.selectedVendor.name}
                      </div>
                      <div>
                        <span className="font-semibold">Contact: </span>
                        {job.selectedVendor.contact}
                      </div>
                      <div>
                        <span className="font-semibold">Email: </span>
                        {job.selectedVendor.email}
                      </div>
                      <div>
                        <span className="font-semibold">Selected Date: </span>
                        {job.selectedVendor.appliedDate}
                      </div>
                      <div>
                        <span className="font-semibold">Quotation (₹): </span>₹
                        {job.selectedVendor.quotation}
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md text-gray-900">
                      <h4 className="font-semibold text-yellow-700 mb-1">
                        Remarks:
                      </h4>
                      <p className="leading-relaxed">
                        {job.selectedVendor.remarks}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  No vendor has been selected yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailProfile;
