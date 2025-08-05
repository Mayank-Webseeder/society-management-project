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
import { useSocietyContext } from "../../context/SocietyContext";
const SocietyList = () => {
  const {
    societies,
    setSocieties,
    handleApprove,
    handleReject,
    handleBan,
    handleDeleteSociety,
  } = useSocietyContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
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

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="px-3 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Search Input */}
          <div className="relative w-full sm:w-[45%] lg:w-[30%]">
            <input
              type="text"
              placeholder="Search society by name or location..."
              className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
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
              className="w-full px-4 py-2 lg:py-3 border border-gray-300 rounded focus:outline-none focus:ring-blue-400 text-sm"
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
        </div>

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
                    <th className="px-6 py-3 text-left font-semibold">Name</th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Location
                    </th>
                    <th className="px-6 py-3 text-center font-semibold">
                      Total Jobs
                    </th>
                    <th className="px-6 py-3 text-center font-semibold">
                      Active Jobs
                    </th>
                    <th className="px-10 py-3 text-left font-semibold">
                      Status
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
                        <Link to={`/society-details/${soc.id}`}>
                          {soc.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4">{soc.location}</td>

                      <td className="px-6 py-4 text-center">
                        {soc.totalJobsPosted}
                      </td>
                      <td className="px-14 py-4">{soc.activeJobs}</td>

                      <td className="px-6 py-4 relative">
                        <div className="inline-block">
                          <button
                            onClick={() => setSelectSociety(soc)}
                            className="fflex items-center px-2 py-1 text-sm border rounded-full hover:bg-gray-100"
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
                      </td>

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
