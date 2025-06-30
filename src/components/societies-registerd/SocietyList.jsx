import React, { useEffect, useState } from "react";
import {
  Search,
  CircleCheckBig,
  CircleAlert,
  CircleX,
  Trash2,
  
} from "lucide-react";
import DetailProfile from "./DetailProfile";

const SocietyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [societies, setSocieties] = useState([]);
  const [selectSociety, setSelectSociety] = useState(null);

  // Filter drivers based on search term and status filter
  const filterSocieties = societies.filter((soc) => {
    const matchesStatus = statusFilter === "All" || soc.status === statusFilter;
    const matchesSearch =
      soc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      soc.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="flex items-center px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
            <CircleCheckBig className="w-4 h-4 mr-2" />
            Approved
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
            status: "Approved",
            totalJobsPosted: 25,
            activeJobs: 5,
            contactPerson: "Devendra Ganesh Rampersaud",
            phone: "9876543210",
            email: "dolphine@gmail.com",
            address: "Dolphine plaza, Vijay Nagar, Indore",
            pincode: "452001",
            city: "Indore",
          },
          {
            id: 2,
            name: "Sunshine Apartments",
            location: "Bengali Square, Indore",
            status: "Pending",
            totalJobsPosted: 10,
            activeJobs: 0,
            contactPerson: "Mr.Manoj kumar",
            phone: "7025669801",
            email: "SunshineAp@gmail.com",
            address: "Sunshine Apartments, Bengali Square",
            pincode: "452001",
            city: "Indore",
          },
          {
            id: 3,
            name: "PQR Heights",
            location: "Bhawarkuan, Indore",
            status: "Rejected",
            totalJobsPosted: 15,
            activeJobs: 0,
            contactPerson: "Mohan lal",
            phone: "9876543210",
            email: "PQR@gmail.com",
            address: "PQR Heights,Bhawarkuan",
            pincode: "452001",
            city: "Indore",
          },
          {
            id: 4,
            name: "Green Valley Society",
            location: "MR 10, Indore",
            status: "Approved",
            totalJobsPosted: 18,
            activeJobs: 3,
            contactPerson: "Mr.peter fernandes",
            phone: "7000465200",
            email: "greenV@gmail.com",
            address: "Green Valley Society, near HDF bank",
            pincode: "452002",
            city: "Indore",
          },
          {
            id: 5,
            name: "Maple Residency",
            location: "Scheme No. 78, Indore",
            status: "Approved",
            totalJobsPosted: 30,
            activeJobs: 7,
            contactPerson: "Ganesh Lal Dash",
            phone: "7455459102",
            email: "greenV@gmail.com",
            address: "Maple Residency, 68, Mridula Heights,",
            pincode: "	452010",
            city: "Indore",
          },
          {
            id: 6,
            name: "Ocean View Apartments",
            location: "Rajendra Nagar, Indore",
            status: "Pending",
            totalJobsPosted: 12,
            activeJobs: 0,
            contactPerson: "Kamlesh Pillai",
            phone: "349 7531216",
            email: "greenV@gmail.com",
            address: "Ocean View Apartments,HariPur Warangal",
            pincode: "452011",
            city: "Indore",
          },
          {
            id: 7,
            name: "ABC Apartments",
            location: "Palasia, Indore",
            status: "Approved",
            totalJobsPosted: 26,
            activeJobs: 11,
            contactPerson: "Mukul Ramakrishnan",
            phone: "9051250568",
            email: "greenV@gmail.com",
            address: "ABC Apartments, 93, Kamini Nagar,",
            pincode: "452001",
            city: "Indore",
          },
        ]);
      } catch (error) {
        console.log("Error fetching societies:", error);
      }
    };
    fetchSociety();
  }, []);

  const handleViewSociety = (society) => {
    console.log("society details ", society);
    setSelectSociety({
      ...society,
      badge: getStatusBadge(society.status),
    });
  };

  const handleApprove = (id) => {
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Approved" } : soc))
    );
    if (selectSociety?.id === id) {
      setSelectSociety((prev) => ({ ...prev, status: "Approved" }));
    }
  };
  const handleReject = (id) => {
    setSocieties((prev) =>
      prev.map((soc) => (soc.id === id ? { ...soc, status: "Rejected" } : soc))
    );
    if (selectSociety?.id === id)
      setSelectSociety((prev) => ({ ...prev, status: "Rejected" }));
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
      {selectSociety && (
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="px-8 text-xl sm:text-lg font-semibold text-gray-800">
              Society Detailed Profile
            </h2>

            <button
              onClick={() => setSelectSociety(null)}
              className="px-8 text-gray-400 hover:text-gray-600 hover:scale-110 font-bold"
            >
              ✕
            </button>
          </div>

          {/* Profile Details */}
          <DetailProfile
            selectSociety={selectSociety}
            onApprove={handleApprove}
            onReject={handleReject}
            onBan={handleBan}
            onEdit={handleEdit}
            onDelete={handleDeleteSociety}
          />
        </div>
      )}

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
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
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
                {filterSocieties.map((soc, index) => (
                  <tr key={soc.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {soc.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{soc.location}</td>
                    <td className="px-6 py-4">{getStatusBadge(soc.status)}</td>
                    <td className="px-6 py-4 text-center">
                      {soc.totalJobsPosted}
                    </td>
                    <td className="px-6 py-4 text-center">{soc.activeJobs}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-6">
                        <button
                          onClick={() => handleViewSociety(soc)}
                          className="text-indigo-600 hover:underline font-medium"
                        >
                          View
                        </button>

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
