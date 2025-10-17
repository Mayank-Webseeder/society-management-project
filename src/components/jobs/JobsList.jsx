import React, { useState } from "react";
import { Search, Trash, Briefcase, CheckCircle, Clock, XCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useJobContext } from "../../context/JobContext";

const JobsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [societyFilter, setSocietyFilter] = useState("");
  const { jobs, setJobs } = useJobContext();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus =
      statusFilter === "" || statusFilter === "All" || job.status === statusFilter;
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.societyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter === "" || job.createdAt === dateFilter;
    const matchesSociety =
      societyFilter === "" || societyFilter === "All" || job.societyName === societyFilter;
    return matchesSearch && matchesStatus && matchesDate && matchesSociety;
  });

  const uniqueSocieties = Array.from(new Set(jobs.map((job) => job.societyName)));

  // Stats
  const totalJobs = jobs.length;
  const openJobs = jobs.filter((j) => j.status === "Open").length;
  const inProgressJobs = jobs.filter((j) => j.status === "In Progress").length;
  const closedJobs = jobs.filter((j) => j.status === "Closed").length;

  return (
    <div className="space-y-6">
      {/* === STATS SECTION === */}
  
      

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
  {[
    {
      label: "Total Jobs",
      value: jobs.length,
      icon: Briefcase,
      bg: "bg-blue-200",
    },
    {
      label: "Open",
      value: jobs.filter((j) => j.status === "Open").length,
      icon: CheckCircle,
      bg: "bg-green-200",
    },
    {
      label: "In Progress",
      value: jobs.filter((j) => j.status === "In Progress").length,
      icon: Clock,
      bg: "bg-amber-200",
    },
    {
      label: "Closed",
      value: jobs.filter((j) => j.status === "Closed").length,
      icon: XCircle,
      bg: "bg-red-200",
    },
    {
      label: "Quotation Required",
      value: jobs.filter((j) => j.quotationRequired).length,
      icon: Briefcase,
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



      {/* === FILTERS SECTION === */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-1/4">
          <Search className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search society or title..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-40 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Society Filter */}
        <select
          value={societyFilter}
          onChange={(e) => setSocietyFilter(e.target.value)}
          className="w-full sm:w-40 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Societies</option>
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
          className="w-full sm:w-40 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* === JOB TABLE === */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No Job List Found</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Society</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Created</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Stage</th>
                <th className="px-6 py-3 text-left">Quotation</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{job.societyName}</td>
                  <td className="px-6 py-3">{job.title}</td>
                  <td className="px-6 py-3">{job.createdAt}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
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
                  <td className="px-6 py-3 capitalize">{job.jobStage}</td>
                  <td className="px-6 py-3">
                    {job.quotationRequired ? (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full font-medium">
                        Yes
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs rounded-full font-medium">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-center flex items-center justify-center gap-3">
                    <Link to={`/job-details/${job._id}`} className=" hover:underline">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(job._id)} className="text-red-500 hover:text-red-400">
                      <Trash  className="w-4 h-4 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobsList;
