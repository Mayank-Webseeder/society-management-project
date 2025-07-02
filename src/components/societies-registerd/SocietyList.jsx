import React, { useEffect, useState } from "react";
import {
  Search,
  CircleCheckBig,
  CircleAlert,
  CircleX,
  Trash2,
  Ban,
} from "lucide-react";
import DetailProfile from "./DetailProfile";
import { Link, useNavigate } from "react-router-dom";

const SocietyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const [societies, setSocieties] = useState([]);
  const [selectSociety, setSelectSociety] = useState(null);
  const navigate = useNavigate();

  const filterSocieties = societies.filter((soc) => {
    const matchesStatus =
      statusFilter === "Select Status" ||
      statusFilter === "All" ||
      soc.status === statusFilter;
    const matchesSearch =
      soc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      soc.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="flex items-center px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
            <CircleCheckBig className="w-4 h-4 mr-2" />
            Active
          </span>
        );
      case "Pending":
        return (
          <span className="flex items-center px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
            <CircleAlert className="w-4 h-4 mr-2" />
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="flex items-center px-2 py-1 text-sm rounded-full bg-red-100 text-red-800">
            <CircleX className="w-4 h-4 mr-2" />
            Rejected
          </span>
        );
      case "Banned":
        return (
          <span className="flex items-center px-2 py-1 text-sm rounded-full bg-gray-300 text-gray-800">
            <Ban className="w-4 h-4 mr-2" />
            Banned
          </span>
        );
      default:
        return (
          <span className="flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  useEffect(() => {
    const fetchSociety = async () => {
      try {
        setSocieties([
          {
            id: 1,
            name: "Dolphine plaza",
            location: "Vijay Nagar, Indore",
            status: "Active",
            totalJobsPosted: 25,
            activeJobs: 5,
          },
          {
            id: 2,
            name: "Sunshine Apartments",
            location: "Bengali Square, Indore",
            status: "Pending",
            totalJobsPosted: 10,
            activeJobs: 0,
          },
          {
            id: 3,
            name: "PQR Heights",
            location: "Bhawarkuan, Indore",
            status: "Rejected",
            totalJobsPosted: 15,
            activeJobs: 0,
          },
          {
            id: 4,
            name: "Green Valley Society",
            location: "MR 10, Indore",
            status: "Active",
            totalJobsPosted: 18,
            activeJobs: 3,
          },
          {
            id: 5,
            name: "Maple Residency",
            location: "Scheme No. 78, Indore",
            status: "Active",
            totalJobsPosted: 30,
            activeJobs: 7,
          },
          {
            id: 6,
            name: "Ocean View Apartments",
            location: "Rajendra Nagar, Indore",
            status: "Pending",
            totalJobsPosted: 12,
            activeJobs: 0,
          },
          {
            id: 7,
            name: "ABC Apartments",
            location: "Palasia, Indore",
            status: "Active",
            totalJobsPosted: 26,
            activeJobs: 11,
          },
        ]);
      } catch (error) {
        console.log("Error fetching societies:", error);
      }
    };
    fetchSociety();
  }, []);

  const handleViewSociety = (society) => {
    setSelectSociety({
      ...society,
      badge: getStatusBadge(society.status),
    });
  };

  const handleApprove = (id) => {
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Active" } : soc))
    );
    if (selectSociety?.id === id) {
      setSelectSociety((prev) => ({ ...prev, status: "Active" }));
    }
  };
  const handleReject = (id) => {
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Rejected" } : soc))
    );
    if (selectSociety?.id === id)
      setSelectSociety((prev) => ({ ...prev, status: "Rejected" }));
  };
  const handlePending = (id) => {
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Pending" } : soc))
    );
    if (setSocieties?.id === id) {
      setSelectSociety((prev) => ({ ...prev, status: "Pending" }));
    }
  };

  const handleBan = (id) => {
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Banned" } : soc))
    );
    if (selectSociety?.id === id)
      setSelectSociety((prev) => ({ ...prev, status: "Banned" }));
  };

  const handleEdit = (id) => {};
  const handleDeleteSociety = (id) => {
    if (window.confirm("Are you sure you want to delete this society?")) {
      setSocieties((prev) => prev.filter((soc) => soc.id !== id));
      if (selectSociety?.id === id) setSelectSociety(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="w-full flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between xl:flex-row xl:flex-nowrap xl:items-center xl:gap-5">
          {/* Search Bar */}
          <div className="px-4 relative w-full sm:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search society by name or location..."
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
              <option value="Select Status">Select Status</option>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Rejected">Rejected</option>
              <option value="Banned">Banned</option>
            </select>
          </div>

          {/* Total Count */}
          <div className="mr-10 text-lg font-semibold">
            Total Societies:{" "}
            <span className="text-green-600 font-bold">
              {filterSocieties.length}
            </span>
          </div>
        </div>

        {/* Society List */}
        {filterSocieties.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">
              No societies found matching your criteria.
            </p>
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
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">
                    Total Jobs
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">
                    Active Jobs
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filterSocieties.map((soc) => (
                  <tr key={soc.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900 cursor-pointer hover:text-blue-600 hover:font-semibold transition-all duration-200">
                      <Link to={`/society-details/${soc.id}`}>{soc.name}</Link>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{soc.location}</td>
                    <td className="px-6 py-4 relative">
                      <div className="inline-block">
                        <button
                          onClick={() => setSelectSociety(soc)}
                          className="flex items-center px-2 py-1 text-sm rounded-full border cursor-pointer
                          hover:bg-gray-100 focus:outline-none"
                        >
                          {getStatusBadge(soc.status)}
                        </button>
                        {selectSociety?.id === soc.id && (
                          <div className="absolute mt-2 bg-white border rounded shadow w-36 z-10">
                            {["Active", "Pending", "Rejected", "Banned"]
                              .filter(
                                (currentStatus) => currentStatus !== soc.status
                              )
                              .map((statusOption) => (
                                <button
                                  key={statusOption}
                                  onClick={() => {
                                    const updater = {
                                      Active: handleApprove,
                                      Pending: handlePending,
                                      Rejected: handleReject,
                                      Banned: handleBan,
                                    };
                                    updater[statusOption](soc.id);
                                    setSelectSociety(null);
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
                    <td className="px-6 py-4 text-center">
                      {soc.totalJobsPosted}
                    </td>
                    <td className="px-6 py-4 text-center">{soc.activeJobs}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-6">
                        <button
                          onClick={() => handleDeleteSociety(soc.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

export default SocietyList;
