import React, { useState } from "react";
import { Search, Trash2, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useVendorContext } from "../../context/VendorContext";

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
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            Active
          </span>
        );
      case "Pending":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            Rejected
          </span>
        );
      case "Blacklisted":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-700">
            Blacklisted
          </span>
        );
      case "Disabled":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-700">
            Blacklisted
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
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
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="w-full flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
          {/* Search + filters + total vendors */}
          <div className="px-0 lg:px-3 flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-4 xl:flex-grow">
            <div className="relative w-full xl:w-[40%]">
              <input
                type="text"
                placeholder="Search vendor by name or location..."
                className="w-full pl-10 px-4 py-2 lg:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 xl:flex-nowrap xl:items-center xl:flex-grow">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 min-w-[120px] px-4 py-2 lg:py-3 border border-gray-300 rounded focus:ring-blue-400 text-sm"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Blacklisted">Blacklisted</option>
              </select>

              {/* Subscription Filter */}
              <select
                value={subscriptionFilter}
                onChange={(e) => setSubscriptionFilter(e.target.value)}
                className="flex-1 min-w-[120px] px-4 py-2 lg:py-3 border border-gray-300 rounded focus:ring-blue-400 text-sm"
              >
                <option value="">All Subscriptions</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="cancelled">Cancelled</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            {/* Total Vendors */}
            <div className="text-md font-medium whitespace-nowrap md:text-right xl:ml-6">
              Total Vendors:{" "}
              <span className="text-green-600 font-semibold">
                {filteredVendors.length}
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        {filteredVendors.length === 0 ? (
          <div className="text-center py-6 text-gray-500 font-medium">
            No vendors found matching your criteria.
          </div>
        ) : (
          <>
            {/* table view for big screen*/}
            <div className="hidden md:block mt-6 overflow-x-auto rounded-xl shadow border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#adccd6]">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">
                      Services Provided
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-700">
                      Ratings
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-700">
                      Total Jobs
                    </th>
                    <th className="px-8 py-3 text-left font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700">
                      Subscription
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredVendors.map((vendor) => (
                    <tr
                      key={vendor.id || vendor._id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{vendor.name}</td>
                      <td className="px-6 py-4">{vendor.location}</td>
                      <td className="px-6 py-4">
                        {vendor.servicesProvided.length === 0
                          ? "-"
                          : vendor.servicesProvided.length <= 2
                          ? vendor.servicesProvided.join(", ")
                          : vendor.servicesProvided.slice(0, 2).join(", ") +
                            " ..."}
                      </td>
                      <td className="px-6 py-4 text-center flex justify-center items-center gap-1">
                        {vendor.rating > 0 ? vendor.rating : 0}
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        {vendor.totalJobsApplied ?? "-"}
                      </td>

                      <td className="px-6 py-4 relative">
                        <button
                          onClick={() => setSelectVendor(vendor)}
                          className="flex items-center px-2 py-1 text-sm border rounded-full hover:bg-gray-100"
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
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            statusColorMap[vendor.subscriptionStatus] ||
                            "text-slate-600"
                          }`}
                        >
                          {vendor.subscriptionStatus}
                        </span>
                      </td>

                      <td className="px-6 py-4 flex justify-center gap-5">
                        <Link
                          to={`/vendor-details/${vendor.id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteVendor(vendor.id)}
                          className="text-red-500 hover:text-red-700"
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
                        className="text-red-500 hover:text-red-700"
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
  );
};

export default VendorList;
