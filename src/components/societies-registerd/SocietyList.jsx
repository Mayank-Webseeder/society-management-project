import React, { useState, useEffect } from "react";
import {
  Search,
  CircleCheckBig,
  CircleAlert,
  CircleX,
  Trash2,
  Ban,
  Building2,
  TrendingUp,
  Clock,
  XCircle,
  ShieldOff,
  Briefcase,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSocietyContext } from "../../context/SocietyContext";

const SocietyList = () => {
  const {
    societies,
    handleApprove,
    handleReject,
    handleBan,
    handleDeleteSociety,
    loading,
  } = useSocietyContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const [selectSociety, setSelectSociety] = useState(null);

  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectSociety && !event.target.closest('.status-dropdown')) {
        setSelectSociety(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectSociety]);

  // Calculate statistics
  const stats = {
    total: societies.length,
    active: societies.filter(s => s.status === "Active").length,
    pending: societies.filter(s => s.status === "Pending").length,
    rejected: societies.filter(s => s.status === "Rejected").length,
    banned: societies.filter(s => s.status === "Banned").length,
    totalJobs: societies.reduce((acc, s) => acc + (s.totalJobsPosted || 0), 0),
    activeJobs: societies.reduce((acc, s) => acc + (s.activeJobs || 0), 0),
  };

  const filterSocieties = societies.filter((soc) => {
    const matchesStatus = 
      statusFilter === "Select Status" || 
      statusFilter === "All" || 
      soc.status === statusFilter;
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      (soc.username?.toLowerCase() || "").includes(searchLower) ||
      (soc.name?.toLowerCase() || "").includes(searchLower) ||
      (soc.location?.toLowerCase() || "").includes(searchLower) ||
      (soc.address?.toLowerCase() || "").includes(searchLower);
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CircleCheckBig className="w-3.5 h-3.5 mr-1.5" /> Active
          </span>
        );
      case "Pending":
        return (
          <span className="flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <CircleAlert className="w-3.5 h-3.5 mr-1.5" /> Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            <CircleX className="w-3.5 h-3.5 mr-1.5" /> Rejected
          </span>
        );
      case "Banned":
        return (
          <span className="flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-300">
            <Ban className="w-3.5 h-3.5 mr-1.5" /> Disabled
          </span>
        );
      default:
        return (
          <span className="flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-gray-50 text-gray-700 border border-gray-200">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-4">
        <div className="relative">
          <svg
            className="animate-spin h-16 w-16 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
        <p className="text-gray-700 font-semibold text-xl">
          Loading society data...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
  {[
    {
      label: "Total Societies",
      value: stats.total,
      icon: Building2,
      bg: "bg-blue-200",
    },
    {
      label: "Total Jobs",
      value: stats.totalJobs,
      icon: Briefcase,
      bg: "bg-purple-200",
    },
    {
      label: "Active",
      value: stats.active,
      icon: TrendingUp,
      bg: "bg-green-200",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      bg: "bg-amber-200",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      bg: "bg-red-200",
    },
  ].map(({ label, value, icon: Icon, bg }, index) => (
    <div
      key={index}
      className={`${bg} text-black rounded-2xl p-4 flex items-center justify-between`}
    >
      <div>
        <p className="text-sm opacity-90">{label}</p>
        <h3 className="text-3xl font-bold mt-1">{value}</h3>
      </div>
      <div className="bg-gray-50 p-3 rounded-full">
        <Icon className="w-6 h-6 text-black" />
      </div>
    </div>
  ))}
</div>


      {/* Main Content Card */}
      <div className=" rounded-xl flex flex-col gap-6 ">
        {/* Header Section */}
        <div className="px-6 bg-white rounded-lg shadow py-4 border-b border-gray-200">
          
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by name, location..."
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
            </div>

            {/* Filter and Count */}
            <div className="flex items-center gap-4 flex-wrap">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm bg-white min-w-[160px]"
              >
                <option value="Select Status">All Status</option>
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Banned">Disabled</option>
              </select>

           
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="">
          {filterSocieties.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-600">No societies found</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden bg-white md:block overflow-x-auto rounded-2xl min-h-[50vh] border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#E5E7EB]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Society Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Total Jobs
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Active Jobs
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

             <tbody className="bg-white divide-y divide-gray-100">
  {filterSocieties.map((soc, index) => (
    <tr
      key={soc._id || soc.id}
      onClick={(e) => {
        // prevent navigation if clicking on buttons, dropdowns, or links
        if (
          e.target.closest("button") ||
          e.target.closest(".status-dropdown") ||
          e.target.closest("a")
        ) {
          return;
        }
        navigate(`/society-details/${soc._id || soc.id}`);
      }}
      className={`cursor-pointer hover:bg-blue-50 transition-colors ${
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      }`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <Link
          to={`/society-details/${soc._id || soc.id}`}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
        >
          {soc.username}
        </Link>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {soc.location}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium">
          {soc.totalJobsPosted || 0}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-sm font-medium">
          {soc.activeJobs || 0}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center relative">
        <div className="inline-block status-dropdown">
          <button
            onClick={() =>
              setSelectSociety(
                selectSociety?._id === soc._id ? null : soc
              )
            }
            className="hover:scale-105 transition-transform"
          >
            {getStatusBadge(soc.status)}
          </button>

          {selectSociety?._id === soc._id && (
            <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-xl w-40 z-10 right-0">
              {soc.status === "Active" && (
                <button
                  onClick={() => {
                    handleBan(soc._id || soc.id);
                    setSelectSociety(null);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700"
                >
                  Disable
                </button>
              )}
              {soc.status === "Banned" && (
                <button
                  onClick={() => {
                    handleApprove(soc._id || soc.id);
                    setSelectSociety(null);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700"
                >
                  Activate
                </button>
              )}
              {soc.status === "Rejected" && (
                <button
                  onClick={() => {
                    handleApprove(soc._id || soc.id);
                    setSelectSociety(null);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700"
                >
                  Approve
                </button>
              )}
              {soc.status === "Pending" && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(soc._id || soc.id);
                      setSelectSociety(null);
                    }}
                    className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-emerald-700 border-b border-gray-100"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleReject(soc._id || soc.id);
                      setSelectSociety(null);
                    }}
                    className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-rose-700"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <button
          onClick={() => handleDeleteSociety(soc._id || soc.id)}
          className="inline-flex items-center justify-center p-2 text-rose-500 hover:text-white hover:bg-rose-500 rounded-lg transition-colors"
          title="Delete Society"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  ))}
</tbody>

                </table>
              </div>

              {/* Mobile Card View */}
              <div className="space-y-4 md:hidden">
                {filterSocieties.map((soc) => (
                  <div
                    key={soc._id || soc.id}
                    className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <Link
                          to={`/society-details/${soc._id || soc.id}`}
                          className="text-lg font-bold text-blue-600 hover:text-blue-800 hover:underline block mb-1"
                        >
                          {soc.username}
                        </Link>
                        <div className="text-sm text-gray-600 flex items-center">
                          <span className="mr-1">📍</span>
                          {soc.location}
                        </div>
                      </div>
                      
                      {/* Status Dropdown */}
                      <div className="relative status-dropdown">
                        <button
                          onClick={() => setSelectSociety(
                            selectSociety?._id === soc._id ? null : soc
                          )}
                          className="hover:scale-105 transition-transform"
                        >
                          {getStatusBadge(soc.status)}
                        </button>
                        {selectSociety?._id === soc._id && (
                          <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl w-36 z-20">
                            {soc.status === "Active" && (
                              <button
                                onClick={() => {
                                  handleBan(soc._id || soc.id);
                                  setSelectSociety(null);
                                }}
                                className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium"
                              >
                                Disable
                              </button>
                            )}
                            {soc.status === "Banned" && (
                              <button
                                onClick={() => {
                                  handleApprove(soc._id || soc.id);
                                  setSelectSociety(null);
                                }}
                                className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium"
                              >
                                Activate
                              </button>
                            )}
                            {soc.status === "Rejected" && (
                              <button
                                onClick={() => {
                                  handleApprove(soc._id || soc.id);
                                  setSelectSociety(null);
                                }}
                                className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium"
                              >
                                Approve
                              </button>
                            )}
                            {soc.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => {
                                    handleApprove(soc._id || soc.id);
                                    setSelectSociety(null);
                                  }}
                                  className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium border-b"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    handleReject(soc._id || soc.id);
                                    setSelectSociety(null);
                                  }}
                                  className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-purple-700 mb-1">Total Jobs</p>
                        <p className="text-xl font-bold text-purple-900">{soc.totalJobsPosted || 0}</p>
                      </div>
                      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-cyan-700 mb-1">Active Jobs</p>
                        <p className="text-xl font-bold text-cyan-900">{soc.activeJobs || 0}</p>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <div className="flex justify-end pt-3 border-t border-gray-200">
                      <button
                        onClick={() => handleDeleteSociety(soc._id || soc.id)}
                        className="flex items-center gap-2 px-4 py-2 text-rose-600 hover:text-white hover:bg-rose-500 rounded-lg transition-colors text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocietyList;