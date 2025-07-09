import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneCall, MessageSquare, CheckCircle2 } from "lucide-react";

const JobDetailProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");

  // Dummy Job Data
  const [job, setJob] = useState({
    title: "Plumbing Pipe Replacement",
    societyName: "Green Valley",
    status: "Open",
    createdAt: "2024-07-04",
    description:
      "Pipes in Block A and Block B are leaking, causing water accumulation. Work to be completed within 3 days. Vendor to arrange material and labor.",
    quotationRequired: true,
    vendorApplications: [
      {
        _id: "v1",
        name: "Sharma Plumbing Services",
        contact: "+91-9876543210",
        email: "sharma.plumbing@example.com",
        appliedDate: "2024-07-05",
        quotation: 15500,
        status: "Pending",
      },
      {
        _id: "v2",
        name: "Mohan Painter",
        contact: "+91-9123456789",
        email: "mohan12@example.com",
        appliedDate: "2024-07-06",
        quotation: 14800,
        status: "Pending",
      },
      {
        _id: "v3",
        name: "Reliable Infrastructure",
        contact: "+91-9988776655",
        email: "reliableinfra@example.com",
        appliedDate: "2024-07-07",
        quotation: 16200,
        status: "Pending",
      },
    ],
    selectedVendor: {
      _id: "v2",
      name: "Mohan Painter",
      contact: "+91-9123456789",
      email: "mohan12@example.com",
      appliedDate: "2024-07-06",
      quotation: 14800,
      remarks:
        "Vendor selected based on lowest quotation and positive reviews.",
    },
  });

  const handleAssignVendor = (vendor) => {
    setJob({ ...job, selectedVendor: vendor });
    alert(`${vendor.name} has been assigned as the selected vendor.`);
    setActiveTab("selected vendor");
  };

const handleDelete = () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this job?");
  if (confirmDelete) {
    alert("Job Deleted Successfully");
    navigate("/jobs");
  }
};


  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back Button & Title */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/jobs")}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-lg gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
          Back
        </button>

        <h1 className="text-2xl font-bold text-center flex-grow text-gray-900">
          Job Detail Profile
        </h1>

        <div className="w-20" />
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-gray-200">
        {/* Sticky Header */}
        <div className="flex justify-between items-start border-b pb-4 sticky top-0 bg-white z-20">
          <div>
            <div className="px-3 flex items-center gap-8 flex-wrap">
              <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
              <span
                className={`px-6 py-2 rounded-full text-xs font-medium ${
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
            <div className="px-5 text-gray-500 text-sm mt-1">
              {job.societyName} • {job.createdAt}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 text-sm font-medium">
              <PhoneCall className="w-4 h-4" />
              Call
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 text-sm font-medium">
              <MessageSquare className="w-4 h-4" />
              Message
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b sticky top-16 bg-white z-20">
          {[
            "description",
            "vendor applications",
            "assign vendor",
            "selected vendor",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

      
        <div className="mt-6">
          {/* Description Tab */}
          {activeTab === "description" && (
            <div className="bg-gray-50 p-6 rounded-xl shadow border border-gray-200 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Job Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
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

              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Description:
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>
          )}

          {/* Vendor Applications Tab */}
          {activeTab === "vendor applications" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Vendor Applications
              </h3>
              {job.vendorApplications.length === 0 ? (
                <p className="text-gray-500">No vendor has applied yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-[#e3f2f7] text-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left font-medium">
                          Vendor Name
                        </th>
                        <th className="px-6 py-3 text-left font-medium">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left font-medium">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left font-medium">
                          Applied Date
                        </th>
                        <th className="px-6 py-3 text-left font-medium">
                          Quotation (₹)
                        </th>
                        <th className="px-6 py-3 text-left font-medium">
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
                          <td className="px-6 py-4 font-medium">
                            {vendor.name}
                          </td>
                          <td className="px-6 py-4">{vendor.contact}</td>
                          <td className="px-6 py-4">{vendor.email}</td>
                          <td className="px-6 py-4">{vendor.appliedDate}</td>
                          <td className="px-6 py-4">₹{vendor.quotation}</td>
                          <td className="px-6 py-4">{vendor.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Assign Vendor Tab */}
          {activeTab === "assign vendor" && (
            <div>
              <h3 className="px-5 text-xl font-bold mb-6 text-gray-800">
                Assign Vendor
              </h3>

              {job.vendorApplications.length === 0 ? (
                <p className="text-gray-500 px-5">No vendor has applied yet.</p>
              ) : (
                <div className="space-y-4">
                  {job.vendorApplications.map((vendor) => (
                    <div
                      key={vendor._id}
                      className="flex justify-between items-center p-5 border border-gray-200 rounded-2xl bg-gray-50 hover:shadow transition group"
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

                      {/* Assign Button */}
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

          {/* Selected Vendor Tab */}
          {activeTab === "selected vendor" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Selected Vendor</h3>
              {job.selectedVendor ? (
                <div className="flex items-start gap-5 p-5 border border-green-200 rounded-xl bg-green-50 shadow-sm relative">
                  <div className="absolute -top-3 -left-3 bg-green-500 text-white p-2 rounded-full shadow">
                    ✔
                  </div>

                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-lg font-bold">
                    {job.selectedVendor.name.charAt(0)}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 mb-14">
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

                    <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md text-gray-900">
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

          {/* Bottom Actions */}
          <div className="flex justify-end gap-4 mt-8 border-t pt-4">
            <button
              onClick={() => alert("Job Closed")}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition"
            >
              Close Job
            </button>

            <button
              onClick={(handleDelete)}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium transition"
            >
              Delete Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailProfile;
