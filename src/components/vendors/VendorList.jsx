import React, { useEffect, useState } from "react";
import { Search, Trash2, Star } from "lucide-react";
import { Link } from "react-router-dom";

const VendorList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [vendors, setVendors] = useState([]);
  const [selectVendor , setSelectVendor]=useState(null);

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
            subscriptionStatus: "Active",
            servicesProvided: ["Security", "CCTV Maintenance"],
            rating: 4.7,
            totalJobsApplied: 18,
          },
          {
            id: 7,
            name: "Meera Joshi",
            email: "meera.joshi@example.com",
            phone: "+91-9988665544",
            location: "Bhopal",
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

    const handleEdit = (id) => {};
  const handleDeleteVendor = (id) => {
  if (window.confirm("Are you sure you want to delete this vendor?")) {
    const updatedVendors = vendors.filter((vendor) => vendor.id !== id);
    setVendors(updatedVendors);
  }
};

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "" ||
      statusFilter === "All" ||
      vendor.subscriptionStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-4 border-b border-gray-200">
        {/* Top Bar */}
        <div className="w-full flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between xl:flex-nowrap xl:gap-5">
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
              <option value="">Search status</option>
              <option value="All">All</option>
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
                    <td className="px-6 py-4 font-medium text-gray-900 cursor-pointer hover:text-blue-600 hover:font-semibold transition-all duration-200">
                      <Link to={`/vendor-details/${vendor.id}`}> {vendor.name} </Link> 
                       </td>
                    <td className="px-6 py-4">{vendor.location}</td>
                    <td className="px-6 py-4 relative">
  <div className="inline-block">
    <button
      onClick={() => setSelectVendor(vendor)}
      className="flex items-center px-2 py-1 text-sm rounded-full border cursor-pointer hover:bg-gray-100 focus:outline-none"
    >
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          vendor.subscriptionStatus === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {vendor.subscriptionStatus}
      </span>
    </button>

    {selectVendor?.id === vendor.id && (
      <div className="absolute mt-2 bg-white border rounded shadow w-36 z-10">
        {["Active", "Expired"]
          .filter((statusOption) => statusOption !== vendor.subscriptionStatus)
          .map((statusOption) => (
            <button
              key={statusOption}
              onClick={() => {
                const updatedVendors = vendors.map((v) =>
                  v.id === vendor.id
                    ? { ...v, subscriptionStatus: statusOption }
                    : v
                );
                setVendors(updatedVendors);
                setSelectVendor(null);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {statusOption}
            </button>
          ))}
      </div>
    )}
  </div>
</td>
                    <td className="px-6 py-4">
                      {vendor.servicesProvided.join(", ")}
                    </td>
                    <td className="px-6 py-4 text-center flex items-center justify-center gap-1">
                      {vendor.rating}
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      {vendor.totalJobsApplied}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-3">
                      <button onClick={()=>handleDeleteVendor(vendor.id)} 
                      className="text-red-500 hover:text-red-700">
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
