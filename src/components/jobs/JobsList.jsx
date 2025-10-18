import React, { useState } from "react";
import { Search, Trash, Briefcase, CheckCircle, Clock, XCircle, Eye } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import { useJobContext } from "../../context/JobContext";

const JobsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [societyFilter, setSocietyFilter] = useState("");
  const { jobs, setJobs } = useJobContext();
  const navigate = useNavigate();

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
      <div className="flex flex-col justify-between sm:flex-row sm:items-center gap-4 flex-wrap bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        {/* Search */}
        <div className="relative  w-full sm:w-1/4">
          <Search className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search society or title..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

     <div className="flex gap-3">
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
      </div>

      {/* === JOB TABLE === */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No Job List Found</div>
      ) : (
  <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
  <table className="min-w-full divide-y divide-gray-200 text-gray-700">
    <thead className="bg-gray-200 text-gray-700 uppercase text-sm font-semibold">
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

    <tbody className="divide-y divide-gray-100">
      {filteredJobs.map((job, index) => (
        <tr
          key={job._id}
          onClick={(e) => {
            // prevent navigation when clicking buttons/links/icons
            if (
              e.target.closest("button") ||
              e.target.closest("a") ||
              e.target.closest("svg")
            ) {
              return;
            }
            navigate(`/job-details/${job._id}`);
          }}
          className={`cursor-pointer transition-colors ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          } hover:bg-blue-50`}
        >
          <td className="px-6 py-3  text-gray-900">
            {job.societyName}
          </td>
          <td className="px-6 py-3">{job.title}</td>
          <td className="px-6 py-3 text-gray-600">
            {new Date(job.createdAt).toLocaleDateString()}
          </td>

          {/* Status */}
          <td className="px-6 py-3">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                job.status === "Open"
                  ? "bg-green-200 text-black"
                  : job.status === "In Progress"
                  ? "bg-yellow-200 text-black"
                  : "bg-red-200 text-black"
              }`}
            >
              {job.status}
            </span>
          </td>

          {/* Stage */}
          <td className="px-6 py-3 capitalize text-gray-700">
            {job.jobStage}
          </td>

          {/* Quotation */}
          <td className="px-6 py-3">
            {job.quotationRequired ? (
              <span className="bg-blue-500 text-white px-3 py-1 text-xs rounded-full font-medium">
                Yes
              </span>
            ) : (
              <span className="bg-gray-400 text-white px-3 py-1 text-xs rounded-full font-medium">
                No
              </span>
            )}
          </td>

          {/* Action Buttons */}
          <td className="px-6 py-3 text-center">
            <div className="flex items-center justify-center gap-3">
    

              <button
                onClick={() => handleDelete(job._id)}
                className="p-1 rounded-md hover:bg-rose-100 text-rose-600 transition"
                title="Delete Job"
              >
                <Trash className="w-4 h-4" />
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
  );
};

export default JobsList;
