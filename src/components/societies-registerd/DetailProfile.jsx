import React, { useEffect, useState } from "react";
import {
  FileUser,
  User,
  PhoneCall,
  Mails,
  MapPinHouse,
  Building2,
  CircleCheckBig,
  CircleAlert,
  CircleX,
  Ban,
  MessageSquare,
  Pencil,
  Trash2,
  ListTodo,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocietyContext } from "../../context/SocietyContext";


const DetailProfile = () => {
  const { societyId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic info");
  const [society, setSociety] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSociety = async () => {
      const data = {
        id: societyId,
        name: "Ocean View Apartments",
        status: "Active",
        location: "Rajendra Nagar",
        contactPerson: "Ravi Kumar",
        phone: "9876543210",
        email: "ravi.kumar@example.com",
        address: "Sector 45, Gurugram",
        city: "Gurugram",
        pincode: "122003",
        totalJobsPosted: 25,
        activeJobs: 7,
        jobDetails: [
          {
            id: "J001",
            title: "Plumbing Work",
            type: "Maintenance",
            postedDate: "2024-06-15",
            status: "Completed",
            assignedVendor: "Suresh Patel",
            price: 4000,
          },
          {
            id: "J002",
            title: "Electrical Issue Fix",
            type: "Repair",
            postedDate: "2024-06-18",
            status: "Active",
            assignedVendor: "Amit Singh",
            price: 2500,
          },
          {
            id: "J003",
            title: "Pest Control",
            type: "Service",
            postedDate: "2024-06-20",
            status: "Pending",
            assignedVendor: "Priya Sharma",
            price: 1500,
          },
        ],
      };
      setSociety(data);
      setLoading(false);
    };

    fetchSociety();
  }, [societyId]);

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;

  if (!society)
    return (
      <div className="text-center py-10 text-red-500">Society not found.</div>
    );

  if (society.status === "Pending" || society.status === "Rejected") {
    return (
      <div className="text-center py-10 text-gray-500 space-y-6">
        <button
          onClick={() => navigate("/vendors")}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-md gap-1 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </button>
        <div>
          Society profile is hidden as it is {society.status.toLowerCase()}.
        </div>
      </div>
    );
  }
  const getStatusBadge = (status) => {
    const baseClasses =
      "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium select-none";

    switch (status) {
      case "Active":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <CircleCheckBig className="w-4 h-4" /> Active
          </span>
        );
      case "Pending":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <CircleAlert className="w-4 h-4" /> Pending
          </span>
        );
      case "Rejected":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <CircleX className="w-4 h-4" /> Rejected
          </span>
        );
      case "Banned":
        return (
          <span className={`${baseClasses} bg-gray-300 text-gray-700`}>
            <Ban className="w-4 h-4" /> Disabled
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-200 text-gray-700`}>
            {status}
          </span>
        );
    }
  };

  const handleChangeStatus = (newStatus) => {
    if (
      window.confirm(
        `Are you sure you want to change status to "${
          newStatus === "Banned" ? "Disabled" : newStatus
        }"?`
      )
    ) {
      setSociety((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const getActionButtons = () => {
    switch (society.status) {
      case "Active":
        return [
          {
            label: "Disable",
            newStatus: "Banned",
            color: "bg-[#5E686D] hover:bg-[#4C585B]",
          },
        ];
      case "Banned":
        return [
          {
            label: "Activate",
            newStatus: "Active",
            color: "bg-green-600 hover:bg-green-700",
          },
        ];
      case "Rejected":
        return [
          {
            label: "Approve",
            newStatus: "Active",
            color: "bg-green-600 hover:bg-green-700",
          },
        ];
      default:
        return [];
    }
  };

  const completedJobs = society.jobDetails.filter(
    (job) => job.status === "Completed"
  ).length;

  const completedPercent =
    society.totalJobsPosted > 0
      ? (completedJobs / society.totalJobsPosted) * 100
      : 0;

  const activePercent =
    society.totalJobsPosted > 0
      ? (society.activeJobs / society.totalJobsPosted) * 100
      : 0;

  const ProgressBar = ({ label, count, percent, colorClass }) => (
    <div className="mb-5">
      <div className="flex justify-between text-sm font-medium mb-1 text-gray-700">
        <span>{label}</span>
        <span>
          {count} ({percent.toFixed(1)}%)
        </span>
      </div>
      <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
        <div
          style={{ width: `${percent}%` }}
          className={`${colorClass} h-5 rounded-full transition-all duration-500`}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Top bar */}
      <div className="flex items-center justify-between mt-3 px-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-md px-2 sm:px-4"
          aria-label="Go Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Main Details */}
      <div className="px-4 sm:px-6 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {society.name}
              </h2>
              {getStatusBadge(society.status)}
            </div>
            <div className="text-gray-500 text-sm mt-1">{society.location}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-wrap md:flex-nowrap lg:flex-nowrap justify-end gap-2 pt-4 md:pt-0 sticky bottom-0 bg-white z-20">
            {getActionButtons().map(({ label, newStatus, color }) => (
              <button
                key={label}
                onClick={() => handleChangeStatus(newStatus)}
                className={`${color} px-4 py-2 rounded text-white text-sm font-semibold whitespace-nowrap`}
              >
                {label}
              </button>
            ))}

            <button
              onClick={() => navigate(`/edit-society/${society.id}`)}
              className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 text-sm font-medium w-fit lg:px-4 lg:py-2 lg:flex lg:items-center lg:gap-2"
            >
              <Pencil className="w-4 h-4" />
              <span className="hidden lg:inline">Edit Profile</span>
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this society?"
                  )
                ) {
                  navigate("/societies");
                }
              }}
              className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200 text-sm font-medium w-fit lg:px-4 lg:py-2 lg:flex lg:items-center lg:gap-2"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden lg:inline">Delete Vendor</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-0 sm:gap-2 border-b bg-white px-1 sm:px-0">
          {["basic info", "jobDetails", "jobStatus"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm sm:text-base font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {tab === "basic info"
                ? "Basic Info"
                : tab === "jobDetails"
                ? "Job Details"
                : "Job Status"}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="min-h-32 mt-4">
          {activeTab === "basic info" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow p-5 sm:p-6 space-y-4 border border-gray-100">
                <h2 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-700">
                  <FileUser className="text-blue-600 w-5 h-5" />
                  Contact Information
                </h2>
                <div className="space-y-3 text-gray-700 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-800">
                      {society.contactPerson}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-800">
                      {society.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mails className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-800">
                      {society.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl shadow p-5 sm:p-6 space-y-4 border border-gray-100">
                <h2 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-700">
                  <MapPinHouse className="text-blue-600 w-5 h-5" />
                  Address Details
                </h2>
                <div className="space-y-3 text-gray-700 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-800">
                      {society.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-6 text-gray-600">
                    {society.city} - {society.pincode}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "jobDetails" && (
            <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    {[
                      "Job ID",
                      "Title",
                      "Type",
                      "Posted Date",
                      "Status",
                      "Assigned Vendor",
                      "Price",
                    ].map((th) => (
                      <th
                        key={th}
                        className="text-left px-4 py-3 border-b whitespace-nowrap"
                      >
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {society.jobDetails.map((job) => {
                    let statusClass = "bg-gray-100 text-gray-700";
                    if (job.status === "Completed")
                      statusClass = "bg-green-100 text-green-700";
                    else if (job.status === "Active")
                      statusClass = "bg-blue-100 text-blue-700";
                    else if (job.status === "Pending")
                      statusClass = "bg-yellow-100 text-yellow-700";

                    return (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 border-b">{job.id}</td>
                        <td className="px-4 py-3 border-b">{job.title}</td>
                        <td className="px-4 py-3 border-b">{job.type}</td>
                        <td className="px-4 py-3 border-b">{job.postedDate}</td>
                        <td className="px-4 py-3 border-b">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusClass}`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 border-b">
                          {job.assignedVendor}
                        </td>
                        <td className="px-4 py-3 border-b">₹{job.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "jobStatus" && (
            <section className="bg-white rounded-xl shadow-md p-5 sm:p-6 max-w-xl mx-auto">
              <h2 className="flex items-center gap-2 text-md font-semibold text-gray-700 mb-6">
                <ListTodo className="text-blue-600 w-5 h-5" />
                Job Status
              </h2>
              <ProgressBar
                label="Total Jobs"
                count={society.totalJobsPosted}
                percent={100}
                colorClass="bg-blue-500"
              />
              <ProgressBar
                label="Active Jobs"
                count={society.activeJobs}
                percent={activePercent}
                colorClass="bg-yellow-400"
              />
              <ProgressBar
                label="Completed Jobs"
                count={completedJobs}
                percent={completedPercent}
                colorClass="bg-green-500"
              />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;
