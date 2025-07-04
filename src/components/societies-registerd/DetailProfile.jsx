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
        location: "Indore",
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
            <Ban className="w-4 h-4" /> Banned
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
        `Are you sure you want to change status to "${newStatus}"?`
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
            label: "Ban",
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
    <div className="max-w-6xl mx-auto px-2 py-6">
      {/* Back Button + Heading */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/societies")}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-lg gap-1"
          aria-label="Go Back"
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
          Society Detail Profile
        </h1>

        {/* Empty div to balance flex space */}
        <div className="w-20" />
      </div>

      <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4 sticky top-0 bg-white z-20">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-bold text-gray-800">
                {society.name}
              </h2>
              {getStatusBadge(society.status)}
            </div>
            <div className="text-gray-500 text-sm mt-1">{society.location}</div>
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
        <div className="flex gap-4 border-b sticky top-16 bg-white z-10">
          <button
            onClick={() => setActiveTab("basic info")}
            className={`px-4 py-2 font-medium ${
              activeTab === "basic info"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Basic Info
          </button>
          <button
            onClick={() => setActiveTab("jobDetails")}
            className={`px-4 py-2 font-medium ${
              activeTab === "jobDetails"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Job Details
          </button>
          <button
            onClick={() => setActiveTab("jobStatus")}
            className={`px-4 py-2 font-medium ${
              activeTab === "jobStatus"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Job Status
          </button>
        </div>

        {/* Main Content */}
        <div className="min-h-32 mt-4">
          {activeTab === "basic info" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-gray-100">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-2">
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

              <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-gray-100">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-2">
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
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 border-b">Job ID</th>
                    <th className="text-left px-4 py-3 border-b">Title</th>
                    <th className="text-left px-4 py-3 border-b">Type</th>
                    <th className="text-left px-4 py-3 border-b">
                      Posted Date
                    </th>
                    <th className="text-left px-4 py-3 border-b">Status</th>
                    <th className="text-left px-4 py-3 border-b">
                      Assigned Vendor
                    </th>
                    <th className="text-left px-4 py-3 border-b">Price</th>
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
            <section className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-6">
                <ListTodo className="text-blue-600 w-5 h-5" /> Job Status
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

        {/* Action Buttons */}
        <div className="flex justify-end gap-6 border-t pt-4 sticky bottom-0 bg-white z-20">
          {getActionButtons().map(({ label, newStatus, color }) => (
            <button
              key={label}
              onClick={() => handleChangeStatus(newStatus)}
              className={`${color} px-4 py-2 rounded text-white text-sm font-semibold`}
            >
              {label}
            </button>
          ))}

          <button
            onClick={() => navigate(`/edit-society/${society.id}`)}
            className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm font-semibold flex items-center gap-2"
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </button>
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this society?")
              ) {
                navigate("/societies");
              }
            }}
            className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-semibold flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Society
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;
