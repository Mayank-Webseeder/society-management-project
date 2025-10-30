import React, { useEffect, useState } from "react";
import {
  FileUser,
  User,
  PhoneCall,
  Mail,
  MapPin,
  Building2,
  CircleCheckBig,
  CircleAlert,
  CircleX,
  Ban,
  Pencil,
  Trash2,
  ListTodo,
  ArrowLeft,
  Briefcase,
  Clock,
  CheckCircle2,
  Calendar,
  DollarSign,
  UserCheck,
  TrendingUp,
  Activity,
  ChevronLeft
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocietyContext } from "../../context/SocietyContext";

const DetailProfile = () => {
  // const { societyId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic info");
  // const [society, setSociety] = useState(null);
  // const [loading, setLoading] = useState(true);

  const { id: societyId } = useParams();
  const { societies, loading } = useSocietyContext();
  const [society, setSociety] = useState(null);
  

  useEffect(() => {
    if (societies.length > 0) {
      const found = societies.find(
        (item) => item._id === societyId || item.id === societyId
      );
      setSociety(found || null);
    }
  }, [societies, societyId]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (!society) {
    return <div className="text-center mt-10 text-gray-500">Society not found 😕</div>;
  }

  // useEffect(() => {
  //   const fetchSociety = async () => {
  //     const data = {
  //       id: societyId,
  //       name: "Ocean View Apartments",
  //       status: "Active",
  //       location: "Rajendra Nagar",
  //       contactPerson: "Ravi Kumar",
  //       phone: "9876543210",
  //       email: "ravi.kumar@example.com",
  //       address: "Sector 45, Gurugram",
  //       city: "Gurugram",
  //       pincode: "122003",
  //       totalJobsPosted: 25,
  //       activeJobs: 7,
  //       jobDetails: [
  //         {
  //           id: "J001",
  //           title: "Plumbing Work",
  //           type: "Maintenance",
  //           postedDate: "2024-06-15",
  //           status: "Completed",
  //           assignedVendor: "Suresh Patel",
  //           price: 4000,
  //         },
  //         {
  //           id: "J002",
  //           title: "Electrical Issue Fix",
  //           type: "Repair",
  //           postedDate: "2024-06-18",
  //           status: "Active",
  //           assignedVendor: "Amit Singh",
  //           price: 2500,
  //         },
  //         {
  //           id: "J003",
  //           title: "Pest Control",
  //           type: "Service",
  //           postedDate: "2024-06-20",
  //           status: "Pending",
  //           assignedVendor: "Priya Sharma",
  //           price: 1500,
  //         },
  //       ],
  //     };
  //     setSociety(data);
  //     setLoading(false);
  //   };

  //   fetchSociety();
  // }, [societyId]);

  // if (loading) {
  //   return (
  //     <div className="flex flex-col justify-center items-center h-96 space-y-4">
  //       <div className="relative">
  //         <svg
  //           className="animate-spin h-16 w-16 text-blue-600"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //         >
  //           <circle
  //             className="opacity-25"
  //             cx="12"
  //             cy="12"
  //             r="10"
  //             stroke="currentColor"
  //             strokeWidth="4"
  //           />
  //           <path
  //             className="opacity-75"
  //             fill="currentColor"
  //             d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
  //           />
  //         </svg>
  //       </div>
  //       <p className="text-gray-700 font-semibold text-xl">
  //         Loading society details...
  //       </p>
  //     </div>
  //   );
  // }

  // if (!society) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-96 space-y-4">
  //       <div className="bg-red-50 border border-red-200 rounded-full p-4">
  //         <CircleX className="w-12 h-12 text-red-500" />
  //       </div>
  //       <p className="text-xl font-semibold text-gray-800">Society not found</p>
  //       <button
  //         onClick={() => navigate("/societies")}
  //         className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  //       >
  //         <ArrowLeft className="w-4 h-4" />
  //         Back to Societies
  //       </button>
  //     </div>
  //   );
  // }

  // if (society.status === "Pending" || society.status === "Rejected") {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-96 space-y-6">
  //       <div className="bg-gray-50 border border-gray-200 rounded-full p-4">
  //         {society.status === "Pending" ? (
  //           <Clock className="w-12 h-12 text-amber-500" />
  //         ) : (
  //           <CircleX className="w-12 h-12 text-red-500" />
  //         )}
  //       </div>
  //       <div className="text-center space-y-2">
  //         <p className="text-xl font-semibold text-gray-800">Access Restricted</p>
  //         <p className="text-gray-600">
  //           Society profile is hidden as it is {society.status.toLowerCase()}.
  //         </p>
  //       </div>
  //       <button
  //         onClick={() => navigate("/societies")}
  //         className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  //       >
  //         <ArrowLeft className="w-4 h-4" />
  //         Back to Societies
  //       </button>
  //     </div>
  //   );
  // }

  const getStatusBadge = (status) => {
    const baseClasses =
      "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold select-none";

    switch (status) {
      case "Active":
        return (
          <span className={`${baseClasses} bg-emerald-50 text-emerald-700 border border-emerald-200`}>
            <CircleCheckBig className="w-4 h-4" /> Active
          </span>
        );
      case "Pending":
        return (
          <span className={`${baseClasses} bg-amber-50 text-amber-700 border border-amber-200`}>
            <CircleAlert className="w-4 h-4" /> Pending
          </span>
        );
      case "Rejected":
        return (
          <span className={`${baseClasses} bg-rose-50 text-rose-700 border border-rose-200`}>
            <CircleX className="w-4 h-4" /> Rejected
          </span>
        );
      case "Banned":
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-700 border border-gray-300`}>
            <Ban className="w-4 h-4" /> Disabled
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`}>
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
            color: "bg-gray-600 hover:bg-gray-700",
            icon: <Ban className="w-4 h-4" />,
          },
        ];
      case "Banned":
        return [
          {
            label: "Activate",
            newStatus: "Active",
            color: "bg-emerald-600 hover:bg-emerald-700",
            icon: <CircleCheckBig className="w-4 h-4" />,
          },
        ];
      case "Rejected":
        return [
          {
            label: "Approve",
            newStatus: "Active",
            color: "bg-emerald-600 hover:bg-emerald-700",
            icon: <CircleCheckBig className="w-4 h-4" />,
          },
        ];
      default:
        return [];
    }
  };

// ✅ Safe handling even if jobDetails or activeJobs is undefined
const completedJobs = society?.jobDetails?.filter(
  (job) => job.status === "Completed"
)?.length || 0;

const completedPercent =
  society?.totalJobsPosted > 0
    ? (completedJobs / society.totalJobsPosted) * 100
    : 0;

const activePercent =
  society?.totalJobsPosted > 0
    ? ((society?.activeJobs || 0) / society.totalJobsPosted) * 100
    : 0;


  const ProgressBar = ({ label, count, percent, colorClass, icon }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between text-sm font-semibold mb-2 text-gray-800">
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        <span className="text-gray-600">
          {count} <span className="text-xs font-normal">({percent.toFixed(1)}%)</span>
        </span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
        <div
          style={{ width: `${percent}%` }}
          className={`${colorClass} h-3 rounded-full transition-all duration-700 ease-out`}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
         <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-black font-medium text-sm  transition-colors"
        >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Societies
        </button>
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow p-4 text-black">
     

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold">{society.name}</h1>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                <span className="text-sm font-semibold">{getStatusBadge(society.status)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-black">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{society.location}</span>
            </div>
          </div>

          {/* Quick Stats */}
          {/* <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
              <div className="text-2xl font-bold">{society.totalJobsPosted}</div>
              <div className="text-xs text-black">Total Jobs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
              <div className="text-2xl font-bold">{society.activeJobs}</div>
              <div className="text-xs text-black">Active Jobs</div>
            </div>
          </div> */}
              <div className="flex flex-wrap gap-3 justify-end">
        {getActionButtons().map(({ label, newStatus, color, icon }) => (
          <button
            key={label}
            onClick={() => handleChangeStatus(newStatus)}
            className={`${color} flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all`}
          >
            {icon}
            {label}
          </button>
        ))}

        <button
          onClick={() => navigate(`/edit-society/${society.id}`)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-semibold transition-colors"
        >
          <Pencil className="w-4 h-4" />
          Edit Profile
        </button>

        {/* <button
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to delete this society?"
              )
            ) {
              navigate("/societies");
            }
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-sm font-semibold transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete Society
        </button> */}
      </div>
        </div>

            {/* Action Buttons */}
  
      </div>

  

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-200 bg-gray-50">
          {[
            { key: "basic info", label: "Basic Info", icon: <FileUser className="w-4 h-4" /> },
            { key: "jobDetails", label: "Job Details", icon: <Briefcase className="w-4 h-4" /> },
             { key: "jobStatus", label: "Job Status", icon: <Briefcase className="w-4 h-4" /> },
            
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? "border-b-2 border-blue-600 text-blue-600 bg-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "basic info" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Info */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-md p-6 border border-blue-200">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-5">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <FileUser className="text-white w-5 h-5" />
                  </div>
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Contact Person</p>
                      <p className="font-semibold text-gray-900">{society.contactPerson || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <PhoneCall className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                      <p className="font-semibold text-gray-900">{society.phone || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email Address</p>
                      <p className="font-semibold text-gray-900 break-all">{society.email || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl shadow-md p-6 border border-emerald-200">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-5">
                  <div className="bg-emerald-600 p-2 rounded-lg">
                    <MapPin className="text-white w-5 h-5" />
                  </div>
                  Address Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Building2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Street Address</p>
                      <p className="font-semibold text-gray-900">{society.address || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">City & Pincode</p>
                      <p className="font-semibold text-gray-900">
                        {society.city || "N/A"} - {society.pincode || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "jobDetails" && (
            <div>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto h-[50vh] scrollbar-hide rounded-lg border border-gray-200">
                <table className="min-w-full bg-white text-sm">
                  <thead className="bg-gray-100 sticky top-0 z-10 text-gray-700 uppercase text-xs font-bold tracking-wider">
                    <tr>
                      {[
                        { label: "Job ID", icon: <Activity className="w-3.5 h-3.5" /> },
                        { label: "Title", icon: <Briefcase className="w-3.5 h-3.5" /> },
                        { label: "Type", icon: <ListTodo className="w-3.5 h-3.5" /> },
                        { label: "Posted Date", icon: <Calendar className="w-3.5 h-3.5" /> },
                        { label: "Status", icon: <Activity className="w-3.5 h-3.5" /> },
                        { label: "Vendor", icon: <UserCheck className="w-3.5 h-3.5" /> },
                      ].map((th) => (
                        <th
                          key={th.label}
                          className="text-left px-6 py-4 font-bold text-xs text-gray-700 uppercase tracking-wider border-b-2 border-gray-200"
                        >
                          <div className="flex items-center gap-2">
                            {/* {th.icon || "N/A"} */}
                            {th.label || "N/A"}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {society.jobDetails.map((job, index) => {
                      let statusClass = "bg-gray-100 text-gray-700 border-gray-300";
                      if (job.status === "Completed")
                        statusClass = "bg-emerald-100 text-emerald-700 border-emerald-300";
                      else if (job.status === "Active")
                        statusClass = "bg-blue-100 text-blue-700 border-blue-300";
                      else if (job.status === "Pending")
                        statusClass = "bg-amber-100 text-amber-700 border-amber-300";

                      return (
                        <tr 
                          key={job._id || index}
                          className={`hover:bg-blue-50 transition-colors ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }`}
                        >
                          <td className="px-6 py-4 font-mono text-xs font-semibold text-gray-700">
                             {`JOB${index + 1}`}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">{job.title || "N/A"}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">
                              {job.type}
                            </span>
                          </td>
                         <td className="px-6 py-4 text-gray-600">
  {job?.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A"}
</td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${statusClass}`}
                            >
                              {job.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{job.assignedVendor || "N/A"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {society.jobDetails.map((job) => {
                  let statusClass = "bg-gray-100 text-gray-700 border-gray-300";
                  if (job.status === "Completed")
                    statusClass = "bg-emerald-100 text-emerald-700 border-emerald-300";
                  else if (job.status === "Active")
                    statusClass = "bg-blue-100 text-blue-700 border-blue-300";
                  else if (job.status === "Pending")
                    statusClass = "bg-amber-100 text-amber-700 border-amber-300";

                  return (
                    <div
                      key={job.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-gray-900">{job.title}</p>
                          <p className="text-xs text-gray-500 font-mono mt-1">{job.id}</p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${statusClass}`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Type</p>
                          <p className="font-semibold text-gray-900">{job.type}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Posted</p>
                          <p className="font-semibold text-gray-900">{job.postedDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Vendor</p>
                          <p className="font-semibold text-gray-900">{job.assignedVendor}</p>
                        </div>
                     <td className="px-6 py-4 text-gray-600">
  {job?.createdAt
    ? new Date(job.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A"}
</td>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "jobStatus" && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-8">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <TrendingUp className="text-white w-5 h-5" />
                  </div>
                  Job Performance Overview
                </h3>
                
                <ProgressBar
                  label="Total Jobs Posted"
                  count={society.totalJobsPosted}
                  percent={100}
                  colorClass="bg-gradient-to-r from-blue-500 to-blue-600"
                  icon={<Briefcase className="w-4 h-4 text-blue-600" />}
                />
                <ProgressBar
                  label="Active Jobs"
                  count={society.activeJobs}
                  percent={activePercent}
                  colorClass="bg-gradient-to-r from-amber-400 to-amber-500"
                  icon={<Clock className="w-4 h-4 text-amber-600" />}
                />
                <ProgressBar
                  label="Completed Jobs"
                  count={completedJobs}
                  percent={completedPercent}
                  colorClass="bg-gradient-to-r from-emerald-500 to-emerald-600"
                  icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                />

                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{society.totalJobsPosted}</div>
                    <div className="text-xs text-gray-500 mt-1">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">{society.activeJobs}</div>
                    <div className="text-xs text-gray-500 mt-1">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">{completedJobs}</div>
                    <div className="text-xs text-gray-500 mt-1">Completed</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;