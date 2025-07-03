import React, { useEffect, useState } from "react";
import {
  Search,
  CircleCheckBig,
  CircleAlert,
  CircleX,
  Trash2,
  Ban,
} from "lucide-react";
import { Link } from "react-router-dom";

const SocietyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const [societies, setSocieties] = useState([]);
  const [selectSociety, setSelectSociety] = useState(null);

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
            <CircleCheckBig className="w-4 h-4 mr-2" /> Active
          </span>
        );
      case "Pending":
        return (
          <span className="flex items-center px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
            <CircleAlert className="w-4 h-4 mr-2" /> Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="flex items-center px-2 py-1 text-sm rounded-full bg-red-100 text-red-800">
            <CircleX className="w-4 h-4 mr-2" /> Rejected
          </span>
        );
      case "Banned":
        return (
          <span className="flex items-center px-2 py-1 text-sm rounded-full bg-gray-300 text-gray-800">
            <Ban className="w-4 h-4 mr-2" /> Banned
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
      setSocieties([
        {
          id: 1,
          name: "Dolphine plaza",
          location: "Vijay Nagar",
          status: "Active",
          totalJobsPosted: 25,
          activeJobs: 5,
        },
        {
          id: 2,
          name: "Sunshine Apartments",
          location: "Bengali Square",
          status: "Pending",
          totalJobsPosted: 10,
          activeJobs: 0,
        },
        {
          id: 3,
          name: "PQR Heights",
          location: "Bhawarkuan",
          status: "Rejected",
          totalJobsPosted: 15,
          activeJobs: 0,
        },
        {
          id: 4,
          name: "Green Valley Society",
          location: "MR 10",
          status: "Active",
          totalJobsPosted: 18,
          activeJobs: 3,
        },
        {
          id: 5,
          name: "Maple Residency",
          location: "Scheme No. 78",
          status: "Active",
          totalJobsPosted: 30,
          activeJobs: 7,
        },
        {
          id: 6,
          name: "Ocean View Apartments",
          location: "Rajendra Nagar",
          status: "Pending",
          totalJobsPosted: 12,
          activeJobs: 0,
        },
        {
          id: 7,
          name: "ABC Apartments",
          location: "Palasia",
          status: "Active",
          totalJobsPosted: 26,
          activeJobs: 11,
        },
      ]);
    };
    fetchSociety();
  }, []);

  const handleApprove = (id) => {
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Active" } : soc))
    );
  };
  const handleReject = (id) => {
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Rejected" } : soc))
    );
  };
  const handlePending = (id) => {
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Pending" } : soc))
    );
  };
  const handleBan = (id) => {
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Banned" } : soc))
    );
  };

  const handleDeleteSociety = (id) => {
    if (window.confirm("Are you sure you want to delete this society?")) {
      setSocieties((prev) => prev.filter((soc) => soc.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="px-5 flex flex-col sm:flex-row sm:items-center gap-10">
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search society by name or location..."
              className="w-full pl-9 px-4 py-2 border border-gray-300 rounded focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded"
          >
            <option value="Select Status">Select Status</option>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Rejected">Rejected</option>
            <option value="Banned">Banned</option>
          </select>

          <div className="text-lg font-semibold">
            Total Societies:{" "}
            <span className="text-green-600">{filterSocieties.length}</span>
          </div>
        </div>

        {filterSocieties.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No societies found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-3xl shadow border border-gray-200 mt-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#adccd6]">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Name</th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-center font-semibold">
                    Total Jobs
                  </th>
                  <th className="px-6 py-3 text-center font-semibold">
                    Active Jobs
                  </th>
                  <th className="px-6 py-3 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filterSocieties.map((soc) => (
                  <tr key={soc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-black-800 hover:text-blue-700">
                      <Link to={`/society-details/${soc.id}`}>{soc.name}</Link>
                    </td>
                    <td className="px-6 py-4">{soc.location}</td>
                    <td className="px-6 py-4 relative">
                      <div className="inline-block">
                        <button
                          onClick={() => setSelectSociety(soc)}
                          className="flex items-center px-2 py-1 text-sm rounded-full border hover:bg-gray-100"
                        >
                          {getStatusBadge(soc.status)}
                        </button>
                        {selectSociety?.id === soc.id && (
                          <div className="absolute mt-2 bg-white border rounded shadow w-36 z-10">
                            {soc.status === "Active" && (
                              <button
                                onClick={() => {
                                  handleBan(soc.id);
                                  setSelectSociety(null);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Ban
                              </button>
                            )}
                            {soc.status === "Banned" && (
                              <button
                                onClick={() => {
                                  handleApprove(soc.id); // Active means Approve
                                  setSelectSociety(null);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Active
                              </button>
                            )}
                            {soc.status === "Rejected" && (
                              <button
                                onClick={() => {
                                  handleApprove(soc.id);
                                  setSelectSociety(null);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Approve
                              </button>
                            )}
                            {soc.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => {
                                    handleApprove(soc.id);
                                    setSelectSociety(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    handleReject(soc.id);
                                    setSelectSociety(null);
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
                    <td className="px-6 py-4 text-center">
                      {soc.totalJobsPosted}
                    </td>
                    <td className="px-6 py-4 text-center">{soc.activeJobs}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDeleteSociety(soc.id)}
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

export default SocietyList;
