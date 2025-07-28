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
import AddSociety from "./AddSociety";

const SocietyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const [societies, setSocieties] = useState([]);
  const [selectSociety, setSelectSociety] = useState(null);
  const [showSocietyForm, setShowSocietyForm] = useState(false);

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
            <Ban className="w-4 h-4 mr-2" /> Disabled
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

 const handleAddSociety = (newSociety) => {
  const societyWithDefaults = {
    id: Date.now(),
    name: newSociety.societyName,
    location: newSociety.location,
    status: "Active",
    totalJobsPosted: 0,
    activeJobs: 0,
  };

  setSocieties((prev) => [...prev, societyWithDefaults]);
  setShowSocietyForm(false);
};
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="px-3 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Search Input */}
          <div className="relative w-full sm:w-[45%] lg:w-[30%]">
            <input
              type="text"
              placeholder="Search society by name or location..."
              className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-300 rounded focus:outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-[30%] lg:w-[20%]">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 lg:py-3 border border-gray-300 rounded text-sm"
            >
              <option value="Select Status">Select Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="ActiveJobs">Active Jobs</option>
              <option value="Banned">Disabled</option>
            </select>
          </div>

          {/* Total Count */}
          <div className="w-full sm:w-auto text-lg font-semibold text-gray-700">
            Total Societies:{" "}
            <span className="text-green-600 font-bold">
              {filterSocieties.length}
            </span>
          </div>

          {/* add society */}
          <div className="w-full sm:w-auto sm:ml-auto flex justify-end">
            <button
              onClick={() => setShowSocietyForm(true)}
              className="bg-[#57a0b8] text-black px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg text-xs lg:text-sm font-medium hover:bg-[#6dabbc] transition focus:outline-none focus:ring-2 focus:ring-[#68b9d5] focus:ring-offset-1"
            >
              + Add Society
            </button>
          </div>
        </div>

        {showSocietyForm && (
          <AddSociety onClose={() => setShowSocietyForm(false)} onAddSociety={handleAddSociety} />
        )}

        {filterSocieties.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No societies found.
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto bg-white rounded-3xl shadow border border-gray-200 mt-5">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#adccd6]">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold md:text-sm lg:text-base">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left font-semibold md:text-sm lg:text-base">
                      Location
                    </th>
                    <th className="px-6 py-3 text-center font-semibold md:text-sm lg:text-base">
                      Total Jobs
                    </th>
                    <th className="px-6 py-3 text-center font-semibold md:text-sm lg:text-base">
                      Active Jobs
                    </th>
                    <th className="px-10 py-3 text-left font-semibold md:text-sm lg:text-base">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center font-semibold md:text-sm lg:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filterSocieties.map((soc) => (
                    <tr key={soc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 md:text-sm lg:text-base font-medium text-black-800 hover:text-blue-700">
                        <Link to={`/society-details/${soc.id}`}>
                          {soc.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 md:text-sm lg:text-base">
                        {soc.location}
                      </td>

                      <td className="px-6 py-4 text-center md:text-sm lg:text-base">
                        {soc.totalJobsPosted}
                      </td>
                      <td className="px-14 py-4 md:text-sm lg:text-base">
                        {soc.activeJobs}
                      </td>

                      <td className="px-6 py-4 relative md:text-sm lg:text-base">
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
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 md:text-sm lg:text-base"
                                >
                                  Disable
                                </button>
                              )}

                              {soc.status === "Banned" && (
                                <button
                                  onClick={() => {
                                    handleApprove(soc.id);
                                    setSelectSociety(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 md:text-sm lg:text-base"
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
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 md:text-sm lg:text-base"
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
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 md:text-sm lg:text-base"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleReject(soc.id);
                                      setSelectSociety(null);
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 md:text-sm lg:text-base"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center md:text-sm lg:text-base">
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

            {/* in card for small screen */}
            <div className="space-y-4 mt-5 md:hidden">
              {filterSocieties.map((soc) => (
                <div
                  key={soc.id}
                  className="bg-white border rounded-lg shadow p-4 flex flex-col gap-3"
                >
                  {/* Name + Location */}
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        to={`/society-details/${soc.id}`}
                        className="text-lg font-semibold text-blue-700 hover:underline"
                      >
                        {soc.name}
                      </Link>
                      <div className="text-sm text-gray-600">
                        {soc.location}
                      </div>
                    </div>
                    {/* Status Badge + Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setSelectSociety(soc)}
                        className="px-2 py-1 border rounded-full text-sm hover:bg-gray-100"
                      >
                        {getStatusBadge(soc.status)}
                      </button>
                      {selectSociety?.id === soc.id && (
                        <div className="absolute right-0 mt-2 bg-white border rounded shadow w-36 z-20">
                          {soc.status === "Active" && (
                            <button
                              onClick={() => {
                                handleBan(soc.id);
                                setSelectSociety(null);
                              }}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              Disable
                            </button>
                          )}
                          {soc.status === "Banned" && (
                            <button
                              onClick={() => {
                                handleApprove(soc.id);
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
                  </div>

                  <div className="flex justify-between text-sm text-gray-700">
                    <div>
                      <span className="font-medium">Total Jobs:</span>{" "}
                      {soc.totalJobsPosted}
                    </div>
                    <div>
                      <span className="font-medium">Active Jobs:</span>{" "}
                      {soc.activeJobs}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDeleteSociety(soc.id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
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
  );
};

export default SocietyList;
