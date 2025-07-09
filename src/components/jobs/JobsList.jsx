import React, { useEffect, useState } from "react";
import { Search, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const JobsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [societyFilter, setSocietyFilter] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      setJobs(jobs.filter((job) => job._id !== id));
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus = statusFilter === "" || statusFilter === "All" || job.status === statusFilter;
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.societyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter === "" || job.createdAt === dateFilter;
    const matchesSociety = societyFilter === "" || societyFilter === "All" || job.societyName === societyFilter;

    return matchesSearch && matchesStatus && matchesDate && matchesSociety;
  });

  const uniqueSocieties = Array.from(new Set(jobs.map((job) => job.societyName)));

  useEffect(() => {
    setJobs([
      {
        _id: "j1",
        societyName: "Green Valley",
        title: "Plumbing Pipe Replacement",
        createdAt: "2024-07-04",
        status: "Open",
        quotationRequired: true,
      },
      {
        _id: "j2",
        societyName: "Sunshine Residency",
        title: "Painting Building Entrance",
        createdAt: "2024-07-02",
        status: "In Progress",
        quotationRequired: true,
      },
      {
        _id: "j3",
        societyName: "Silver Heights",
        title: "Security Camera Installation",
        createdAt: "2024-06-28",
        status: "Closed",
        quotationRequired: true,
      },
      {
        _id: "j4",
        societyName: "Green Valley",
        title: "Gym Equipment Repair",
        createdAt: "2024-06-30",
        status: "Open",
        quotationRequired: false,
      },
      {
        _id: "j5",
        societyName: "Royal Heights",
        title: "Lift Maintenance",
        createdAt: "2024-07-04",
        status: "Open",
        quotationRequired: true,
      },
      {
        _id: "j6",
        societyName: "Palm County",
        title: "Clubhouse Painting",
        createdAt: "2024-06-30",
        status: "Closed",
        quotationRequired: false,
      },
      {
        _id: "j7",
        societyName: "Emerald Residency",
        title: "Parking Area Lighting Fix",
        createdAt: "2024-07-02",
        status: "In Progress",
        quotationRequired: true,
      },
      {
        _id: "j8",
        societyName: "Maple Woods",
        title: "Boundary Wall Crack Repair",
        createdAt: "2024-06-28",
        status: "Open",
        quotationRequired: false,
      },
    ]);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-4 border-b border-gray-200">
        
        {/* Search, Filter, Count */}
        <div className="px-5 flex flex-col sm:flex-row sm:items-center gap-6 flex-wrap">
          
          {/* Search */}
          <div className="relative w-full sm:w-1/4">
            <input
              type="text"
              placeholder="Search by society or job title..."
              className="w-full pl-9 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            <option value="" disabled>Select Status</option>
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
            <option value="" disabled>Select Society</option>
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
          <div className="text-center py-4 text-gray-500">
            No Job list found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-3xl shadow border border-gray-200 mt-5">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#adccd6]">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Society Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Job Title</th>
                  <th className="px-6 py-3 text-left font-semibold">Created Date</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Quotation</th>
                  <th className="px-6 py-3 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{job.societyName}</td>
                    <td className="px-6 py-4">{job.title}</td>
                    <td className="px-6 py-4">{job.createdAt}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-medium ${
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
                      {job.quotationRequired ? (
                        <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-medium">
                          Yes
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-xs font-medium">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex gap-6">
                      <Link
                        to={`/job-details/${job._id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-600 hover:text-red-500"
                      >
                        <Trash className="w-5 h-5" />
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

export default JobsList;
