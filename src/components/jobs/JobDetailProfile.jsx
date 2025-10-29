import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJobContext } from "../../context/JobContext";
import {
  PhoneCall,
  Mail,
  CheckCircle2,
  ChevronLeft,
  FileText,
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  AlertCircle,
  Trash2,
  XCircle,
  Building2,
  User2Icon,
} from "lucide-react";

const JobDetailProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { jobs } = useJobContext();
  const [activeTab, setActiveTab] = useState("description");

  // Find the actual job from context
  const job = jobs.find((j) => j._id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Job Not Found</h3>
          <p className="text-gray-500 mb-6">This job doesn't exist in our system</p>
          <button
            onClick={() => navigate("/jobs")}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

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

  const getStatusConfig = (status) => {
    const configs = {
      Open: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        dot: "bg-emerald-500",
      },
      "In Progress": {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        dot: "bg-amber-500",
      },
      Closed: {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        dot: "bg-rose-500",
      },
    };
    return configs[status] || configs.Open;
  };

  const statusConfig = getStatusConfig(job.status);

  return (
    <div className="">
      {/* Header */}
      <div>
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </button>
        </div>
      </div>

      <div className="mx-auto py-4 space-y-6">
        {/* Job Header Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className=" h-20"></div>
          <div className="px-6 pb-6 -mt-16">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 rounded-2xl bg-white shadow border-4 border-white flex items-center justify-center">
                  <FileText className="w-12 h-12 text-blue-600" />
                </div>
                <div className="pb-2">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {job.title}
                    </h1>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}></span>
                      {job.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      {job.societyName}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Created: {job.createdAt}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4" />
                      ID: {job._id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => alert("Job Closed")}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Close Job
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
          <div className="flex flex-wrap gap-1">
            {[
              { id: "description", icon: FileText, label: "Description" },
              { id: "vendor applications", icon: Users, label: "Applications" },
              { id: "assign vendor", icon: UserCheck, label: "Assign Vendor" },
              { id: "selected vendor", icon: CheckCircle2, label: "Selected" },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 font-medium text-sm rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Description */}
          {activeTab === "description" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600 block mb-1">Society Name</span>
                  <span className="font-semibold text-gray-900">{job.societyName}</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600 block mb-1">Job Title</span>
                  <span className="font-semibold text-gray-900">{job.title}</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600 block mb-1">Status</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg ${statusConfig.bg} ${statusConfig.text}`}
                  >
                    {job.status}
                  </span>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600 block mb-1">Created Date</span>
                  <span className="font-semibold text-gray-900">{job.createdAt}</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600 block mb-1">Quotation Required</span>
                  <span className="font-semibold text-gray-900">
                    {job.quotationRequired ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Job Description
                </h3>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>
            </div>
          )}

          {/* Vendor Applications */}
          {activeTab === "vendor applications" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Vendor Applications</h2>
                    <p className="text-sm text-gray-500">
                      {job.vendorApplications?.length || 0} vendor(s) applied
                    </p>
                  </div>
                </div>
              </div>

              {!job.vendorApplications || job.vendorApplications.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No vendor has applied yet.</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Vendor Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Applied Date
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {job.vendorApplications.map((vendor) => (
                          <tr
                            key={vendor._id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                  {vendor.name.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-900">
                                  {vendor.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {vendor.contact}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {vendor.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {vendor.appliedDate}
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                                {vendor.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

        
          {activeTab === "assign vendor" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Assign Vendor</h2>
                    <p className="text-sm text-gray-500">Select a vendor for this job</p>
                  </div>
                </div>
              </div>

              {!job.vendorApplications || job.vendorApplications.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No vendor has applied yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {job.vendorApplications.map((vendor) => (
                    <div
                      key={vendor._id}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {vendor.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {vendor.name}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1">
                                <PhoneCall className="w-3.5 h-3.5" />
                                {vendor.contact}
                              </span>
                              <span className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5" />
                                {vendor.email}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center gap-4">
                              <span className="text-sm text-gray-600">
                                Applied: {vendor.appliedDate}
                              </span>
                           
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAssignVendor(vendor)}
                          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Assign Vendor
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

       
          {activeTab === "selected vendor" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Selected Vendor</h2>
                    <p className="text-sm text-gray-500">Current assigned vendor for this job</p>
                  </div>
                </div>
              </div>

              {job.selectedVendor ? (
                <div className=" bg-white rounded-2xl shadow-sm border-2  p-8 relative overflow-hidden">
                  
                  <div className="relative">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-20 h-20 rounded-2xl  flex items-center justify-center text-balck text-2xl font-bold shadow">
                        {job.selectedVendor.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {job.selectedVendor.name}
                          </h3>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Selected
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-700">
                            <PhoneCall className="w-4 h-4" />
                            <span>{job.selectedVendor.contact}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Mail className="w-4 h-4" />
                            <span>{job.selectedVendor.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4" />
                            <span>Selected: {job.selectedVendor.appliedDate}</span>
                          </div>
                       
                        </div>
                      </div>
                    </div>

                    {job.selectedVendor.remarks && (
                      <div className="bg-white rounded-xl border border-amber-200 p-5 shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                          Remarks
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {job.selectedVendor.remarks}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-4">No vendor has been selected yet.</p>
                  <button
                    onClick={() => setActiveTab("assign vendor")}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Assign a Vendor
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailProfile;