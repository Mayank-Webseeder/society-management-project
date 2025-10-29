import React, { useState, useEffect, } from "react";
import { Search, Trash2, Star, Eye, Trash,   CircleCheckBig,Ban,
  CircleAlert,
  CircleX,  } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import { useVendorContext } from "../../context/VendorContext";
import { Users, UserCheck, Clock, UserX, ShieldAlert } from "lucide-react";

const VendorList = () => {
  const {
    vendors,
    handleApprove,
    handleReject,
    handleBlacklist,
    handleDeleteVendor,
    loading,
  } = useVendorContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState("");
  const [selectVendor, setSelectVendor] = useState(null);
  const [serviceFilter, setServiceFilter] = useState("");

   const navigate = useNavigate();

  const filteredVendors = vendors.filter((vendor) => {
    const name = vendor.name || "";
    const location = vendor.location || "";
    const services = vendor.services || [];

    //  Search by name or location
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase());

    //  Status Filter
    const matchesStatus =
      statusFilter === "" ||
      statusFilter === "All" ||
      vendor.status === statusFilter;

    // Subscription Filter
    const matchesSubscription =
      subscriptionFilter === "" ||
      subscriptionFilter === "All" ||
      vendor.subscriptionStatus === subscriptionFilter;

    //  Services Filter
    const matchesService =
      serviceFilter === "" ||
      serviceFilter === "All" ||
      services.includes(serviceFilter);

    return (
      matchesSearch && matchesStatus && matchesSubscription && matchesService
    );
  });

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".vendor-status-dropdown")) {
      setSelectVendor(null);
    }
  };
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);


  const statusColorMap = {
    active: "text-green-500",
    inactive: "text-yellow-600",
    cancelled: "text-gray-600",
    expired: "text-red-600",
  };

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
            <CircleX className="w-3.5 h-3.5 mr-1.5" />  Rejected
          </span>
        );
      case "Blacklisted":
        return (
          <span className="flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-300">
           <Ban className="w-3.5 h-3.5 mr-1.5" /> Blacklisted
          </span>
        );
      case "Disabled":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-700">
          <Ban className="w-3.5 h-3.5 mr-1.5" />  Blacklisted
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
    <div className="flex flex-col justify-center items-center h-48 space-y-2">
      <p className="text-gray-700 font-semibold text-lg">
        Fetching vendors, just a moment....
      </p>
      <svg
        className="animate-spin h-12 w-12 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12" cy="12" r="10"
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
  );
}



  return (
 
    <div>
      {/* --- Vendor Stats Section --- */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
  {[
    {
      label: "Total Vendors",
      value: vendors.length,
      icon: Users,
      bg: "bg-blue-200",
    },
    {
      label: "Active",
      value: vendors.filter((v) => v.status === "Active").length,
      icon: UserCheck,
      bg: "bg-green-200",
    },

    {
      label: "Blacklisted",
      value: vendors.filter((v) => v.status === "Blacklisted").length,
      icon: ShieldAlert,
      bg: "bg-purple-200",
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



<div className="w-full flex flex-col gap-4 mb-6 xl:flex-row xl:items-center xl:justify-between bg-white p-4 rounded-lg shadow">
  {/* Search Box */}
  <div className="relative w-full xl:w-[40%]">
    <input
      type="text"
      placeholder="Search vendor by name or location..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm placeholder-gray-400 transition-all duration-200"
    />
    <div className="absolute left-3 top-3 text-gray-400">
      <Search className="h-5 w-5" />
    </div>
  </div>

  {/* Filters */}
  <div className="flex flex-wrap gap-4 xl:flex-nowrap xl:items-center xl:flex-grow">
    {/* Status Filter */}
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="flex-1 min-w-[140px] px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200"
    >
      <option value="">All Status</option>
      <option value="Active">Active</option>
      <option value="Pending">Pending</option>
      <option value="Rejected">Rejected</option>
      <option value="Blacklisted">Blacklisted</option>
    </select>

    {/* Subscription Filter */}
    <select
      value={subscriptionFilter}
      onChange={(e) => setSubscriptionFilter(e.target.value)}
      className="flex-1 min-w-[140px] px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
    >
      <option value="">All Subscriptions</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
      <option value="Cancelled">Cancelled</option>
      <option value="Expired">Expired</option>
    </select>
  </div>
</div>

   <div>
      
      <div className=" border-b overflow-hidden p-1 border-gray-200">
    

        {/* Table */}
        {filteredVendors.length === 0 ? (
          <div className="text-center py-6 text-gray-500 font-medium">
            No vendors found matching your criteria.
          </div>
        ) : (
          <>
            {/* table view for big screen*/}
           <div className="hidden md:block rounded-2xl  overflow-x-auto scrollbar-hide max-h-[55vh] border border-gray-200 shadow">
  <table className="min-w-full  text-sm">
    {/* --- Table Head --- */}
    <thead className="bg-[#E5E7EB]">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Name</th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Location</th>
        <th className=" py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Services</th>
        <th className=" py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Ratings</th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Jobs</th>
        {/* <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Status</th> */}
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Subscription</th>
        <th className="py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">Actions</th>
      </tr>
    </thead>

    {/* --- Table Body --- */}
<tbody className="divide-y divide-gray-200 bg-white">
  {filteredVendors.map((vendor) => (
    <tr
      key={vendor.id} 
      onClick={(e) => {
    if (
      !e.target.closest(".vendor-status-dropdown") &&
      !e.target.closest("button") &&
      !e.target.closest("a")
    ) {
      navigate(`/vendor-details/${vendor.id}`);

    }
  }}
      className="hover:bg-blue-50 cursor-pointer transition-colors duration-150"
    >
      {/* Name */}
      <td className="px-6 py-3 font-medium text-blue-600">{vendor.name || "N/A"}</td>

      {/* Location */}
      <td className="px-6 py-3 text-gray-600">{vendor.location || "N/A"}</td>

      {/* Services Provided */}
      <td className=" py-3 text-gray-600">
        {vendor.servicesProvided.length === 0
          ? "-"
          : vendor.servicesProvided.length <= 2
          ? vendor.servicesProvided.join(", ")
          : vendor.servicesProvided.slice(0, 2).join(", ") + " ..."}
      </td>

      {/* Ratings */}
      <td className=" py-3">
        <div className=" flex items-center gap-1 text-gray-800">
          {vendor.rating > 0 ? vendor.rating : 0}
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        </div>
      </td>

  

        <td className="px-6 ">
        <span className=" px-3 py-2 rounded-full bg-purple-50 text-purple-700 text-sm font-medium">
         {vendor.totalJobsApplied || "N/A"}
        </span>
      </td>

      {/* Status Dropdown */}
      {/* <td className=" py-3 relative vendor-status-dropdown">
        <button
          onClick={() =>
            setSelectVendor(
              (selectVendor?.id || selectVendor?._id) ===
              (vendor.id || vendor._id)
                ? null // close dropdown if clicked again
                : vendor // open new one
            )
          }
          className="inline-flex items-center justify-center px-6 py-2 rounded-full  text-cyan-700 text-sm font-medium"
        >
       {getStatusBadge(vendor.status || "N/A")}
        </button>

        {(selectVendor?.id || selectVendor?._id) ===
          (vendor.id || vendor._id) && (
          <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-36 z-10">
            {vendor.status === "Active" && (
              <button
                onClick={() => {
                  handleBlacklist(vendor.id || vendor._id);
                  setSelectVendor(null);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Blacklist
              </button>
            )}
            {vendor.status === "Pending" && (
              <>
                <button
                  onClick={() => {
                    handleApprove(vendor.id || vendor._id);
                    setSelectVendor(null);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleReject(vendor.id || vendor._id);
                    setSelectVendor(null);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Reject
                </button>
              </>
            )}
            {vendor.status === "Rejected" && (
              <button
                onClick={() => {
                  handleApprove(vendor.id || vendor._id);
                  setSelectVendor(null);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-green-600"
              >
                Approve
              </button>
            )}
            {vendor.status === "Blacklisted" && (
              <button
                onClick={() => {
                  handleApprove(vendor.id || vendor._id);
                  setSelectVendor(null);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-green-600"
              >
                Activate
              </button>
            )}
          </div>
        )}
      </td> */}

      {/* Subscription */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            vendor.subscriptionStatus === "Active"
              ? "text-black border-black"
              : vendor.subscriptionStatus === "Expired"
              ? "text-gray-500 border-gray-300"
              : "text-gray-600 border-gray-200"
          }`}
        >
          {vendor.subscriptionStatus || "N/A"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-center flex  gap-4">
        {/* <Link
          to={`/vendor-details/${vendor.id}`}
          className="text-gray-700 hover:text-black transition"
          title="View Details"
        >
          <Eye className="w-5 h-5" />
        </Link> */}
        <button
          onClick={() => handleDeleteVendor(vendor.id)}
          className="text-red-500 py-2 hover:text-red-600 transition"
          title="Delete Vendor"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  ))}
</tbody>

  </table>
</div>


            {/* card view for small screen */}
            <div className="block md:hidden mt-5 space-y-4">
              {filteredVendors.map((vendor) => (
                <div
                  key={vendor.id || vendor._id}
                  className="bg-white shadow-md rounded-xl p-4 border border-gray-200 relative"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-base font-bold text-gray-800">
                      {vendor.name}
                    </h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        vendor.subscriptionStatus === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {vendor.subscriptionStatus}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mb-1">
                    <strong>📍 Location:</strong> {vendor.location}
                  </div>

                  <div className="text-sm text-gray-700 mb-1">
                    <strong>🛠️ Services:</strong>{" "}
                    {vendor.servicesProvided.length === 0
                      ? "-"
                      : vendor.servicesProvided.length <= 2
                      ? vendor.servicesProvided.join(", ")
                      : vendor.servicesProvided.slice(0, 2).join(", ") + " ..."}
                  </div>

                  <div className="text-sm mb-1">
                    <strong>⭐ Rating:</strong>{" "}
                    <span className="inline-flex items-center gap-1">
                      {vendor.rating}
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </span>
                  </div>

                  <div className="text-sm mb-1">
                    <strong>📄 Total Jobs:</strong> {vendor.totalJobsApplied}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="relative">
                      <button
                        onClick={() => setSelectVendor(vendor)}
                        className="text-sm border rounded-full px-3 py-1 hover:bg-gray-100"
                      >
                        {getStatusBadge(vendor.status)}
                      </button>

                      {(selectVendor?.id || selectVendor?._id) ===
                        (vendor.id || vendor._id) && (
                        <div className="absolute mt-2 bg-white border rounded shadow w-36 z-10">
                          {vendor.status === "Active" && (
                            <button
                              onClick={() => {
                                handleBlacklist(vendor.id || vendor._id);
                                setSelectVendor(null);
                              }}
                              className="block w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                            >
                              Blacklist
                            </button>
                          )}
                          {vendor.status === "Pending" && (
                            <>
                              <button
                                onClick={() => {
                                  handleApprove(vendor.id || vendor._id);
                                  setSelectVendor(null);
                                }}
                                className="block w-full px-4 py-2 hover:bg-gray-100 text-green-600"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  handleReject(vendor.id || vendor._id);
                                  setSelectVendor(null);
                                }}
                                className="block w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {vendor.status === "Rejected" && (
                            <button
                              onClick={() => {
                                handleApprove(vendor.id || vendor._id);
                                setSelectVendor(null);
                              }}
                              className="block w-full px-4 py-2 hover:bg-gray-100 text-green-600"
                            >
                              Approve
                            </button>
                          )}
                          {vendor.status === "Blacklisted" && (
                            <button
                              onClick={() => {
                                handleApprove(vendor.id || vendor._id);
                                setSelectVendor(null);
                              }}
                              className="block w-full px-4 py-2 hover:bg-gray-100 text-green-600"
                            >
                              Active
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Link
                        to={`/vendor-details/${vendor.id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteVendor(vendor.id)}
                        className="text-red-500 flex  hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

export default VendorList;
