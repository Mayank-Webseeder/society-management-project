import React, { useEffect, useState } from "react";
import { Search, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useJobContext } from "../../context/JobContext";

const JobsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [societyFilter, setSocietyFilter] = useState("");
  const { jobs ,setJobs } = useJobContext();

  const handleDelete = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );
  if (confirmDelete) {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
  }
};


  const filteredJobs = jobs.filter((job) => {
    const matchesStatus =
      statusFilter === "" ||
      statusFilter === "All" ||
      job.status === statusFilter;
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.societyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter === "" || job.createdAt === dateFilter;
    const matchesSociety =
      societyFilter === "" ||
      societyFilter === "All" ||
      job.societyName === societyFilter;

    return matchesSearch && matchesStatus && matchesDate && matchesSociety;
  });

  const uniqueSocieties = Array.from(
    new Set(jobs.map((job) => job.societyName))
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="relative w-full sm:w-1/4">
          <input
            type="text"
            placeholder="Search by society or job title..."
            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Society Filter */}
        <select
          value={societyFilter}
          onChange={(e) => setSocietyFilter(e.target.value)}
          className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="" disabled>
            Select Society
          </option>
          <option value="All">All</option>
          {uniqueSocieties.map((society) => (
            <option key={society} value={society}>
              {society}
            </option>
          ))}
        </select>

        {/* Date Filter */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Total Count */}
        <div className="text-lg font-semibold">
          Total Jobs:{" "}
          <span className="text-green-600">{filteredJobs.length}</span>
        </div>
      </div>

      {/* Job List */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-6 text-gray-500">No Job list found.</div>
      ) : (
        <>
          {/* Table View (lg and above) */}
          <div className="hidden md:block mt-6 overflow-x-auto rounded-2xl shadow-lg border border-gray-300">
            <table className="min-w-full divide-y divide-gray-200 text-sm lg:text-base">
              <thead className="bg-gradient-to-r from-[#b4d6e0] to-[#d5e8ed] text-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Society Name
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Job Title
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Created Date
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Stage</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Quotation
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-800">
                      {job.societyName}
                    </td>
                    <td className="px-6 py-4 text-gray-800">{job.title}</td>
                    <td className="px-6 py-4 text-gray-600">{job.createdAt}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap ${
                          job.status === "Open"
                            ? "bg-green-100 text-green-700"
                            : job.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-700 capitalize tracking-wide">
                        {job.jobStage.charAt(0).toUpperCase() +
                          job.jobStage.slice(1)}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                          job.quotationRequired
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {job.quotationRequired ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 flex-nowrap">
                        <Link
                          to={`/job-details/${job._id}`}
                          className="text-blue-600 hover:underline font-medium text-sm"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="text-red-600 hover:text-red-500"
                          title="Delete Job"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* for small screen in cards */}
          <div className="md:hidden mt-6 space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-300 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                {/* Top Info */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-gray-600 tracking-wide">
                      {job.societyName}
                    </div>
                    <div className="text-lg font-bold text-gray-900 leading-tight">
                      {job.title}
                    </div>
                    <div className="text-xs text-gray-400 tracking-wide">
                      Created: {job.createdAt}
                    </div>
                  </div>

                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-red-500 hover:text-red-600 p-1"
                    aria-label="Delete job"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : job.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>

                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                      job.quotationRequired
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    Quotation: {job.quotationRequired ? "Yes" : "No"}
                  </span>

                  <span className="text-sm font-medium text-gray-700 capitalize tracking-wide">
                    {job.jobStage.charAt(0).toUpperCase() +
                      job.jobStage.slice(1)}
                  </span>
                </div>

                {/* Footer */}
                <div className="mt-4 border-t pt-3 flex justify-between items-center text-sm">
                  <Link
                    to={`/job-details/${job._id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default JobsList;
