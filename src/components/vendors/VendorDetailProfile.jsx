import React, { useEffect, useState } from "react";
import {
  FileUser,
  User,
  PhoneCall,
  Mails,
  MapPinHouse,
  Star,
  ListTodo,
  CircleCheckBig,
  CircleX,
  BadgeCheck,
} from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";

const getStatusBadge = (status) => {
  switch (status) {
    case "Active":
      return (
        <span className="flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold max-w-max">
          <CircleCheckBig className="w-5 h-5 mr-2" /> Active
        </span>
      );
    case "Expired":
      return (
        <span className="flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-semibold max-w-max">
          <CircleX className="w-5 h-5 mr-2" /> Expired
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

const VendorDetailProfile = ({ onDelete }) => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const data = {
          id: vendorId,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+91-9876543210",
          location: "Indore",
          subscriptionStatus: "Active",
          servicesProvided: ["Plumbing", "Electrical"],
          rating: 4.5,
          totalJobsApplied: 23,
          completedJobs: 18,
          ongoingJobs: 2,
          jobSuccessRate: 85,
          recentJobs: [
            { id: 101, title: "Plumbing Repair", status: "Completed" },
            { id: 102, title: "Electrical Wiring", status: "Completed" },
            { id: 103, title: "AC Installation", status: "Ongoing" },
          ],
          documents: [
            { name: "Aadhar Card", status: "Verified" },
            { name: "Address Proof", status: "Pending" },
          ],
        };

        setVendor(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [vendorId]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!vendor)
    return (
      <div className="p-6 text-center text-red-500">Vendor not found.</div>
    );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg outline outline-1 outline-[#52cbf4] max-w-5xl mx-auto mt-14">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/vendors")}
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
          Vendor Detailed Profile
        </h2>
      </div>

      {/* Name & Status */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 mb-2">
        <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
          {vendor.name}
        </h1>
        <div>{getStatusBadge(vendor.subscriptionStatus)}</div>
      </div>
      <p className="text-gray-600 mb-10">{vendor.location}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
        {/* Contact Info */}
        <section>
          <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-5 gap-2">
            <FileUser className="text-blue-600" /> Contact Information
          </h2>
          <div className="space-y-4 text-gray-700 ml-2">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{vendor.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{vendor.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mails className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{vendor.email}</span>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section>
          <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-5 gap-2">
            <BadgeCheck className="text-blue-600" /> Services Offered
          </h2>
          <ul className="list-disc ml-7 text-gray-700 space-y-1">
            {vendor.servicesProvided.map((service, idx) => (
              <li key={idx}>{service}</li>
            ))}
          </ul>
        </section>

        {/* Job Stats */}
        <section>
          <h2 className="flex items-center text-xl font-semibold text-gray-700 mb-5 gap-2">
            <ListTodo className="text-blue-600" /> Job History & Stats
          </h2>
          <div className="space-y-4 text-gray-700 ml-2 text-sm md:text-base">
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="font-semibold">Total Jobs Applied:</span>
              <span>{vendor.totalJobsApplied}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="font-semibold">Completed Jobs:</span>
              <span>{vendor.completedJobs}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="font-semibold">Ongoing Jobs:</span>
              <span>{vendor.ongoingJobs}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Job Success Rate:</span>
              <span>{vendor.jobSuccessRate}%</span>
            </div>
          </div>
        </section>
      </div>

      {/* Recent Jobs */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Jobs
        </h2>
        <ul className="divide-y divide-gray-200">
          {vendor.recentJobs.map((job) => (
            <li
              key={job.id}
              className="flex justify-between py-3 text-gray-700"
            >
              <span>{job.title}</span>
              <span
                className={`text-sm font-medium ${
                  job.status === "Completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {job.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Documents */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Documents</h2>
        <ul className="divide-y divide-gray-200">
          {vendor.documents.map((doc, idx) => (
            <li key={idx} className="flex justify-between py-3 text-gray-700">
              <span>{doc.name}</span>
              <span
                className={`text-sm font-medium ${
                  doc.status === "Verified"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {doc.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        {/* Activate Button */}
        <button
          onClick={() =>
            setVendor((prev) => ({
              ...prev,
              subscriptionStatus: "Active",
            }))
          }
          disabled={vendor.subscriptionStatus === "Active"}
          className={`px-5 py-2 rounded shadow text-white 
      ${
        vendor.subscriptionStatus === "Active"
          ? "bg-green-500 cursor-not-allowed"
          : "bg-green-700 hover:bg-green-700"
      }`}
        >
          Activate
        </button>

        {/* Expire Button */}
        <button
          onClick={() =>
            setVendor((prev) => ({
              ...prev,
              subscriptionStatus: "Expired",
            }))
          }
          disabled={vendor.subscriptionStatus === "Expired"}
          className={`px-5 py-2 rounded shadow text-white 
      ${
        vendor.subscriptionStatus === "Expired"
          ? "bg-red-500 cursor-not-allowed"
          : "bg-red-600 hover:bg-red-600"
      }`}
        >
          Expire
        </button>

        <Link
          to={`/vendor-edit/${vendor.id}`}
          className="bg-[#118ab2] hover:bg-[#00b4d8] text-white px-5 py-2 rounded shadow"
        >
          Edit
        </Link>

        {/* Delete Button */}
        <button
          onClick={() => {
            if (onDelete) {
              onDelete(vendor.id);
            } else {
              if (
                window.confirm("Are you sure you want to delete this vendor?")
              ) {
                navigate("/vendors");
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

export default VendorDetailProfile;
