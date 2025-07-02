import React, { useEffect, useState } from "react";
import {
  FileUser,
  User,
  PhoneCall,
  Mails,
  MapPinHouse,
  Building2,
  ListTodo,
  CircleCheckBig,
  CircleAlert,
  CircleX,
  Ban,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const getStatusBadge = (status) => {
  switch (status) {
    case "Active":
      return (
        <span className="flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold max-w-max">
          <CircleCheckBig className="w-5 h-5 mr-2" /> Active
        </span>
      );
    case "Pending":
      return (
        <span className="flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold max-w-max">
          <CircleAlert className="w-5 h-5 mr-2" /> Pending
        </span>
      );
    case "Rejected":
      return (
        <span className="flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-semibold max-w-max">
          <CircleX className="w-5 h-5 mr-2" /> Rejected
        </span>
      );
    case "Banned":
      return (
        <span className="flex items-center px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-sm font-semibold max-w-max">
          <Ban className="w-5 h-5 mr-2" /> Banned
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-semibold max-w-max">
          {status}
        </span>
      );
  }
};

const DetailProfile = ({ onEdit, onDelete }) => {
  const { societyId } = useParams();
  const [society, setSociety] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSociety = async () => {
      try {
        // Mock data for now
        const data = {
          id: societyId,
          name: "Ocean View Apartments",
          status: "Active",
          location: "New Delhi",
          contactPerson: "Ravi Kumar",
          phone: "9876543210",
          email: "ravi.kumar@example.com",
          address: "Sector 45, Gurugram",
          city: "Gurugram",
          pincode: "122003",
          totalJobsPosted: 25,
          activeJobs: 5,
        };
        setSociety(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSociety();
  }, [societyId]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!society)
    return (
      <div className="p-6 text-center text-red-500">Society not found.</div>
    );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg outline outline-1 outline-[#52cbf4] max-w-5xl mx-auto mt-14">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/societies")}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-lg gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
          Back
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center flex-1">
          Society Detailed Profile
        </h2>
      </div>

      {/* status*/}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 mb-2">
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
          {society.name}
        </h1>
        <div>{getStatusBadge(society.status)}</div>
      </div>

      <p className="text-gray-600 mb-10">{society.location}</p>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
        <section>
          <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-5 gap-2">
            <FileUser className="text-blue-600" /> Contact Information
          </h2>
          <div className="space-y-4 text-gray-700 ml-2">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{society.contactPerson}</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{society.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mails className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{society.email}</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-5 gap-2">
            <MapPinHouse className="text-blue-600" /> Address
          </h2>
          <div className="space-y-4 text-gray-700 ml-2">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{society.address}</span>
            </div>
            <p className="text-sm text-gray-500 ml-7">
              {society.city} - {society.pincode}
            </p>
          </div>
        </section>

        <section>
          <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-5 gap-2">
            <ListTodo className="text-blue-600" /> Job Status
          </h2>
          <div className="space-y-5 text-gray-700 ml-2 text-sm md:text-base">
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="font-semibold">Total Jobs Posted:</span>
              <span>{society.totalJobsPosted}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="font-semibold">Active Jobs:</span>
              <span>{society.activeJobs}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="font-semibold">Completed Jobs:</span>
              <span>{society.totalJobsPosted - society.activeJobs}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {["Active", "Pending", "Reject", "Ban"]
          .filter((currentOption) => currentOption !== society.status)
          .map((currentOption) => (
            <button
              key={currentOption}
              onClick={() =>
                setSociety((prev) => ({
                  ...prev,
                  status: currentOption,
                }))
              }
              className={`px-5 py-2 rounded shadow text-white
          ${currentOption === "Active" && "bg-green-600 hover:bg-green-700"}
          ${currentOption === "Pending" && "bg-yellow-400 hover:bg-yellow-500"}
          ${currentOption === "Reject" && "bg-[#2d6c80] hover:bg-[#2c5966]"}
          ${currentOption === "Ban" && "bg-[#935f37] hover:bg-[#6d4c3d]"}`}
            >
              {currentOption}
            </button>
          ))}

        <button
          onClick={() => onEdit(society.id)}
          className="bg-[#118ab2] hover:bg-[#00b4d8] text-white px-5 py-2 rounded shadow"
        >
          Edit
        </button>

        <button
          onClick={() => {
            if (onDelete) {
              onDelete(society.id);
            } else {
              if (
                window.confirm("Are you sure you want to delete this society?")
              ) {
                navigate("/societies");
              }
            }
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded shadow"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DetailProfile;
