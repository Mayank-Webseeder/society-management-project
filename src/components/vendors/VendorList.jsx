import React, { useEffect, useState } from "react";
import { Search, Trash2, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const VendorList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // for status filter
  const [subscriptionFilter, setSubscriptionFilter] = useState(""); // for subscription filter
  const [vendors, setVendors] = useState([]);
  const [selectVendor, setSelectVendor] = useState(null);

  useEffect(() => {
    const fetchVendor = () => {
      try {
        setVendors([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+91-9876543210",
            location: "Indore",
            status: "Pending",
            subscriptionStatus: "Active",
            servicesProvided: ["Plumbing", "Electrical"],
            rating: 4.5,
            totalJobsApplied: 23,
          },
          {
            id: 2,
            name: "Priya Sharma",
            email: "priya.sharma@example.com",
            phone: "+91-9123456780",
            location: "Bhopal",
            status: "Active",
            subscriptionStatus: "Expired",
            servicesProvided: ["Cleaning", "Pest Control"],
            rating: 4.2,
            totalJobsApplied: 15,
          },
          {
            id: 3,
            name: "Ravi Kumar",
            email: "ravi.kumar@example.com",
            phone: "+91-9988776655",
            location: "Ujjain",
            status: "Pending",
            subscriptionStatus: "Active",
            servicesProvided: ["Carpentry", "Painting"],
            rating: 4.8,
            totalJobsApplied: 35,
          },
          {
            id: 4,
            name: "Neha Verma",
            email: "neha.verma@example.com",
            phone: "+91-9345612789",
            location: "Indore",
            status: "Rejected",
            subscriptionStatus: "Active",
            servicesProvided: ["Electrician"],
            rating: 4.0,
            totalJobsApplied: 12,
          },
          {
            id: 5,
            name: "Suresh Patel",
            email: "suresh.patel@example.com",
            phone: "+91-9812345678",
            location: "Dewas",
            status: "Active",
            subscriptionStatus: "Expired",
            servicesProvided: ["Plumbing", "Cleaning"],
            rating: 3.9,
            totalJobsApplied: 8,
          },
          {
            id: 6,
            name: "Amit Singh",
            email: "amit.singh@example.com",
            phone: "+91-9977554433",
            location: "Indore",
            status: "Active",
            subscriptionStatus: "Active",
            servicesProvided: [
              "Security",
              "CCTV Maintenance",
              "Access Control",
            ],
            rating: 4.7,
            totalJobsApplied: 18,
          },
          {
            id: 7,
            name: "Meera Joshi",
            email: "meera.joshi@example.com",
            phone: "+91-9988665544",
            location: "Bhopal",
            status: "Rejected",
            subscriptionStatus: "Expired",
            servicesProvided: ["Gardening", "Waste Management"],
            rating: 4.3,
            totalJobsApplied: 10,
          },
        ]);
      } catch (error) {
        console.log("Error fetching vendors list", error);
      }
    };
    fetchVendor();
  }, []);

  // Status action handlers same as society:
  const handleApprove = (id) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Active" } : v))
    );
  };
  const handleReject = (id) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Rejected" } : v))
    );
  };
  const handlePending = (id) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Pending" } : v))
    );
  };
  const handleBan = (id) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "Banned" } : v))
    );
  };

  const handleDeleteVendor = (id) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      setVendors((prev) => prev.filter((v) => v.id !== id));
    }
  };

  // Filtering by both status and subscriptionStatus + search:
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
        return (
          <span className="flex items-center px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-semibold">
            Active
          </span>
        );
      case "Pending":
        return (
          <span className="flex items-center px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-semibold">
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="flex items-center px-3 py-1 text-xs rounded-full bg-red-100 text-red-800 font-semibold">
            Rejected
          </span>
        );
      case "Banned":
        return (
          <span className="flex items-center px-3 py-1 text-xs rounded-full bg-gray-300 text-gray-800 font-semibold">
            Banned
          </span>
        );
      default:
        return (
          <span className="flex items-center px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800 font-semibold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-4 border-b border-gray-200">
        {/* Top Bar */}
        <div className="w-full flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center xl:flex-nowrap xl:gap-10">
          {/* Search Bar */}
          <div className="px-4 relative w-full sm:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search vendor by name or location..."
              className="w-full pl-9 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-6 top-2.5 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-40">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Banned">Banned</option>
            </select>
          </div>

          {/* Subscription Filter */}
          <div className="w-full sm:w-40">
            <select
              value={subscriptionFilter}
              onChange={(e) => setSubscriptionFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Subscriptions</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          {/* Total Count */}
          <div className="mr-10 text-lg font-semibold">
            Total Vendors:{" "}
            <span className="text-green-600 font-bold">
              {filteredVendors.length}
            </span>
          </div>
        </div>

        {/* Table OR No Data */}
        {filteredVendors.length === 0 ? (
          <div className="text-center py-6 text-gray-500 font-medium">
            No vendors found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-3xl shadow border border-gray-200 mt-5">
            <table className="min-w-full divide-y divide-gray-200 text-md">
              <thead className="bg-[#adccd6]">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700">
                    Subscription
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
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 cursor-pointer hover:font-semibold transition-all duration-200">
                      {/* <Link to={`/vendor-details/${vendor.id}`}> */}
                        {vendor.name}
                      {/* </Link> */}
                    </td>
                    <td className="px-6 py-4">{vendor.location}</td>

                    {/* Status with dropdown actions */}
                    <td className="px-6 py-4 relative">
                      <div className="inline-block">
                        <button
                          onClick={() => setSelectVendor(vendor)}
                          className="flex items-center px-2 py-1 text-sm rounded-full border cursor-pointer hover:bg-gray-100 focus:outline-none"
                        >
                          {getStatusBadge(vendor.status)}
                        </button>

                        {selectVendor?.id === vendor.id && (
                          <div className="absolute mt-2 bg-white border rounded shadow w-36 z-10">
                            {vendor.status === "Active" && (
                              <button
                                onClick={() => {
                                  handleBan(vendor.id);
                                  setSelectVendor(null);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Ban
                              </button>
                            )}
                            {vendor.status === "Banned" && (
                              <button
                                onClick={() => {
                                  handleApprove(vendor.id);
                                  setSelectVendor(null);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Active
                              </button>
                            )}
                            {vendor.status === "Rejected" && (
                              <button
                                onClick={() => {
                                  handleApprove(vendor.id);
                                  setSelectVendor(null);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Approve
                              </button>
                            )}
                            {vendor.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => {
                                    handleApprove(vendor.id);
                                    setSelectVendor(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    handleReject(vendor.id);
                                    setSelectVendor(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Subscription status, no dropdown */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          vendor.subscriptionStatus === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {vendor.subscriptionStatus}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {vendor.servicesProvided.length === 0 ? (
                        "-"
                      ) : vendor.servicesProvided.length <= 2 ? (
                        vendor.servicesProvided.map((service, index) => (
                          <span key={index}>
                            {service}
                            {index !== vendor.servicesProvided.length - 1 &&
                              ", "}
                          </span>
                        ))
                      ) : (
                        <>
                          {vendor.servicesProvided
                            .slice(0, 2)
                            .map((service, index) => (
                              <span key={index}>
                                {service}
                                {index !== 1 && ", "}
                              </span>
                            ))}
                          ...
                        </>
                      )}
                    </td>

                    <td className="px-6 py-4 text-center flex items-center justify-center gap-1">
                      {vendor.rating}
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </td>

                    <td className="px-6 py-4 text-center">
                      {vendor.totalJobsApplied}
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
        )}
      </div>
    </div>
  );
};

export default VendorList;
