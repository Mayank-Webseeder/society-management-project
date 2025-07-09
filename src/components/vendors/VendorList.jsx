import React, { useState } from "react";
import { Search, Trash2, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useVendorContext } from "../../context/VendorContext";

const VendorList = () => {
  const {
    vendors,
    handleApprove,
    handleReject,
    handlePending,
    handleBan,
    handleDeleteVendor,
  } = useVendorContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState("");
  const [selectVendor, setSelectVendor] = useState(null);

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "" ||
      statusFilter === "All" ||
      vendor.status === statusFilter;

    const matchesSubscription =
      subscriptionFilter === "" ||
      subscriptionFilter === "All" ||
      vendor.subscriptionStatus === subscriptionFilter;

    return matchesSearch && matchesStatus && matchesSubscription;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">Active</span>;
      case "Pending":
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">Pending</span>;
      case "Rejected":
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">Rejected</span>;
      case "Banned":
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-800">Banned</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-4 border-b border-gray-200">

        {/* Top Filters */}
        <div className="w-full flex flex-col gap-4 sm:flex-row sm:items-center xl:flex-nowrap xl:gap-10">
          <div className="px-4 relative w-full sm:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search vendor by name or location..."
              className="w-full pl-9 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-6 top-2.5 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded focus:ring-blue-500"
          >
            <option value="" disabled>Select Status</option>
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Banned">Banned</option>
          </select>

          <select
            value={subscriptionFilter}
            onChange={(e) => setSubscriptionFilter(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded focus:ring-blue-500"
          >
            <option value="">All Subscriptions</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>

          <div className="text-lg font-semibold">
            Total Vendors: <span className="text-green-600 font-bold">{filteredVendors.length}</span>
          </div>
        </div>

        {/* Table */}
        {filteredVendors.length === 0 ? (
          <div className="text-center py-6 text-gray-500 font-medium">
            No vendors found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-3xl shadow border mt-5">
            <table className="min-w-full divide-y divide-gray-200 text-md">
              <thead className="bg-[#adccd6]">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Location</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Subscription</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">Services Provided</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Ratings</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Total Jobs</th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{vendor.name}</td>
                    <td className="px-6 py-4">{vendor.location}</td>
                    <td className="px-6 py-4 relative">
                      <button
                        onClick={() => setSelectVendor(vendor)}
                        className="flex items-center px-2 py-1 text-sm border rounded-full hover:bg-gray-100"
                      >
                        {getStatusBadge(vendor.status)}
                      </button>
                      {selectVendor?.id === vendor.id && (
                        <div className="absolute mt-2 bg-white border rounded shadow w-36 z-10">
                          {vendor.status === "Active" && (
                            <button onClick={() => { handleBan(vendor.id); setSelectVendor(null); }} className="block w-full px-4 py-2 hover:bg-gray-100">Ban</button>
                          )}
                          {vendor.status === "Banned" && (
                            <button onClick={() => { handleApprove(vendor.id); setSelectVendor(null); }} className="block w-full px-4 py-2 hover:bg-gray-100">Active</button>
                          )}
                          {vendor.status === "Rejected" && (
                            <button onClick={() => { handleApprove(vendor.id); setSelectVendor(null); }} className="block w-full px-4 py-2 hover:bg-gray-100">Approve</button>
                          )}
                          {vendor.status === "Pending" && (
                            <>
                              <button onClick={() => { handleApprove(vendor.id); setSelectVendor(null); }} className="block w-full px-4 py-2 hover:bg-gray-100">Approve</button>
                              <button onClick={() => { handleReject(vendor.id); setSelectVendor(null); }} className="block w-full px-4 py-2 hover:bg-gray-100">Reject</button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        vendor.subscriptionStatus === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {vendor.subscriptionStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {vendor.servicesProvided.length === 0
                        ? "-"
                        : vendor.servicesProvided.length <= 2
                        ? vendor.servicesProvided.join(", ")
                        : vendor.servicesProvided.slice(0, 2).join(", ") + " ..."}
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center items-center gap-1">
                      {vendor.rating}
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </td>
                    <td className="px-6 py-4 text-center">{vendor.totalJobsApplied}</td>
                    <td className="px-6 py-4 flex justify-center gap-5">
                      <Link to={`/vendor-details/${vendor.id}`} 
                      className="text-blue-500 hover:text-blue-700">
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
        )}
      </div>
    </div>
  );
};

export default VendorList;
