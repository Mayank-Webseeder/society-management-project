import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PhoneCall,
  MessageSquare,
  BadgeCheck,
  FileUser,
  User,
  Mails,
  Pencil,
  Trash2,
  Star,
  StarHalf,
  Star as StarOutline,
} from "lucide-react";

const VendorDetailProfile = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("vendor info");
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStatusBadge = (status) => {
    let bgColor = "bg-gray-300 text-gray-800";
    if (status === "Active") bgColor = "bg-green-100 text-green-700";
    else if (status === "Pending") bgColor = "bg-yellow-100 text-yellow-700";
    else if (status === "Rejected") bgColor = "bg-red-100 text-red-700";
    else if (status === "Ban") bgColor = "bg-red-100 text-red-700";

    return (
      <span
        className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${bgColor}`}
      >
        {status}
      </span>
    );
  };

  const getActionButtons = () => {
    if (vendor.status === "Active") {
      return [
        {
          label: "Ban Vendor",
          newStatus: "Ban",
          color: "bg-red-600 hover:bg-red-700",
        },
      ];
    } else if (vendor.status === "Ban") {
      return [
        {
          label: "Activate Vendor",
          newStatus: "Active",
          color: "bg-green-600 hover:bg-green-700",
        },
      ];
    }
    return [];
  };

  const handleChangeStatus = (newStatus) => {
    if (
      window.confirm(`Are you sure you want to change status to ${newStatus}?`)
    ) {
      setVendor((prev) => ({ ...prev, status: newStatus }));
      alert(`Vendor status changed to ${newStatus}`);
    }
  };

  useEffect(() => {
    const data = {
      id: vendorId,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91-9876543210",
      location: "Indore",
      status: "Active",
      subscriptionStatus: "Active",
      servicesProvided: ["Plumbing", "Electrical"],
      rating: 4.5,
      totalJobsApplied: 23,
      completedJobs: 18,
      ongoingJobs: 2,
      jobSuccessRate: 85, // in percentage
      recentJobs: [
        {
          id: 101,
          title: "Plumbing Repair",
          status: "Completed",
          price: 1500,
          date: "2024-06-15",
        },
        {
          id: 102,
          title: "Electrical Wiring",
          status: "Completed",
          price: 2200,
          date: "2024-06-18",
        },
        {
          id: 103,
          title: "AC Installation",
          status: "Ongoing",
          price: 3000,
          date: "2024-06-20",
        },
      ],

      documents: [
        {
          name: "Aadhar Card",
          type: "Identity Proof",
          status: "Verified",
          uploadedOn: "2024-05-10",
        },
        {
          name: "Address Proof",
          type: "Address Proof",
          status: "Pending",
          uploadedOn: "--",
        },
        {
          name: "PAN Card",
          type: "Tax Document",
          status: "Verified",
          uploadedOn: "2024-05-15",
        },
      ],

      jobHistory: [
        {
          id: "J001",
          title: "Leakage Fix",
          type: "Plumbing",
          status: "Completed",
          price: 1200,
          date: "2025-05-05",
        },
        {
          id: "J002",
          title: "Fan Installation",
          type: "Electrical",
          status: "Completed",
          price: 800,
          date: "2025-05-22",
        },
        {
          id: "J003",
          title: "Geyser Repair",
          type: "Electrical",
          status: "Ongoing",
          price: 1500,
          date: "2025-06-30",
        },
        {
          id: "J004",
          title: "Bathroom Fitting",
          type: "Plumbing",
          status: "Completed",
          price: 2500,
          date: "2025-07-3",
        },
      ],
      subscription: {
        plan: "Premium",
        startDate: "2024-04-01",
        endDate: "2025-03-31",
        price: 5000,
        paymentStatus: "Paid",
        renewalDue: false,
      },
    };
    setVendor(data);
    setLoading(false);
  }, [vendorId]);

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (!vendor)
    return (
      <div className="text-center py-10 text-red-500">Vendor not found.</div>
    );

  // for rating stars in job status
  const RatingDisplay = ({ rating }) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    return (
      <div className="flex items-center gap-1 text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5" />
        ))}
        {hasHalfStar && <StarHalf className="w-5 h-5" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOutline key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
        ))}
        <span className="ml-2 text-gray-700 font-semibold">
          {rating.toFixed(1)} / 5
        </span>
      </div>
    );
  };

  const isProfileHidden =
    vendor.status === "Pending" || vendor.status === "Rejected";

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back button and title */}
      <div className="flex items-center justify-between mb-6">
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
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
          Back
        </button>
        <h1 className="text-2xl font-bold text-center flex-grow text-gray-900">
          Vendor Detail Profile
        </h1>
        <div className="w-20" />
      </div>

      {isProfileHidden ? (
        <div className="text-center text-gray-500 py-20 text-lg">
          Vendor profile is not available.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-4 sticky top-0 bg-white z-20">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-gray-800">
                  {vendor.name}
                </h2>
                {getStatusBadge(vendor.status)}
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {vendor.location}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 text-sm font-medium">
                <PhoneCall className="w-4 h-4" />
                Call
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 text-sm font-medium">
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b sticky top-16 bg-white z-20">
            {[
              "vendor info",
              "documents",
              "job history",
              "job status",
              "subscription",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium capitalize ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="min-h-32 mt-4">
            {activeTab === "vendor info" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-gray-100">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-2">
                    <FileUser className="text-blue-600 w-5 h-5" /> Contact
                    Information
                  </h2>
                  <div className="space-y-3 text-gray-700 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-800">
                        {vendor.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-800">
                        {vendor.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mails className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-800">
                        {vendor.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Services Offered */}
                <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-gray-100">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-2">
                    <BadgeCheck className="text-blue-600 w-5 h-5" /> Services
                    Offered
                  </h2>
                  <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
                    {vendor.servicesProvided.map((service, idx) => (
                      <li key={idx} className="font-medium text-gray-800">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* documents */}
            {activeTab === "documents" && (
              <div className="space-y-4">
                {vendor.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 p-4 rounded-xl shadow bg-white hover:shadow-md transition"
                  >
                    <div className="space-y-1">
                      <div className="text-gray-900 font-semibold text-base">
                        {doc.name}
                      </div>
                      <div className="text-gray-500 text-sm">{doc.type}</div>
                    </div>

                    <div className="text-gray-600 text-sm mt-3 md:mt-0 md:text-center">
                      <span className="font-medium text-gray-700">
                        Uploaded On:
                      </span>{" "}
                      {doc.uploadedOn !== "--"
                        ? doc.uploadedOn
                        : "Not Uploaded"}
                    </div>

                    <div
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        doc.status === "Verified"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      } mt-3 md:mt-0`}
                    >
                      {doc.status}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "job history" && (
              <div className="overflow-x-auto border rounded-lg shadow">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-4 py-3">Job ID</th>
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Price (₹)</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendor.jobHistory.map((job) => (
                      <tr
                        key={job.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-2">{job.id}</td>
                        <td className="px-4 py-2 font-medium text-gray-800">
                          {job.title}
                        </td>
                        <td className="px-4 py-2">{job.type}</td>
                        <td className="px-4 py-2">₹{job.price}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              job.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : job.status === "Ongoing"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-gray-600">{job.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* job status */}
            {activeTab === "job status" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Jobs Applied */}
                <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow border border-gray-100">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-xl font-bold">
                    {vendor.totalJobsApplied}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-800">
                      Total Jobs Applied
                    </div>
                    <div className="text-sm text-gray-500">
                      Across all categories
                    </div>
                  </div>
                </div>

                {/* Completed Jobs */}
                <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow border border-gray-100">
                  <div className="relative w-16 h-16">
                    <svg
                      className="w-16 h-16 transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        className="text-gray-200"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-green-500"
                        strokeWidth="4"
                        strokeDasharray={`${
                          (vendor.completedJobs / vendor.totalJobsApplied) * 100
                        }, 100`}
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-green-600 font-bold">
                      {vendor.completedJobs}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-800">
                      Completed Jobs
                    </div>
                    <div className="text-sm text-gray-500">
                      Successfully finished
                    </div>
                  </div>
                </div>

                {/* Ongoing Jobs */}
                <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow border border-gray-100">
                  <div className="relative w-16 h-16">
                    <svg
                      className="w-16 h-16 transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        className="text-gray-200"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-yellow-500"
                        strokeWidth="4"
                        strokeDasharray={`${
                          (vendor.ongoingJobs / vendor.totalJobsApplied) * 100
                        }, 100`}
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-yellow-600 font-bold">
                      {vendor.ongoingJobs}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-800">
                      Ongoing Jobs
                    </div>
                    <div className="text-sm text-gray-500">In progress</div>
                  </div>
                </div>

                {/* Success Rate */}
                <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow border border-gray-100">
                  <div className="relative w-16 h-16">
                    <svg
                      className="w-16 h-16 transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        className="text-gray-200"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-green-500"
                        strokeWidth="4"
                        strokeDasharray={`${vendor.jobSuccessRate}, 100`}
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-green-600 font-bold">
                      {vendor.jobSuccessRate}%
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-800">
                      Success Rate
                    </div>
                    <div className="text-sm text-gray-500">
                      Overall performance
                    </div>
                  </div>
                </div>
                  <div className="flex items-center justify-center gap-3 mb-10">
                    <h3 className="font-semibold text-gray-700 m-0 text-lg">Rating:</h3>
                    <RatingDisplay rating={vendor.rating} />
                  </div>
              </div>
            )}

            {activeTab === "subscription" && (
               <div className="border rounded-2xl p-6 shadow bg-white max-w-xl mx-auto space-y-6">

    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Subscription Details</h2>

    <div className="space-y-4 text-gray-800 text-base">

      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-700">Plan:</span>
        <span className="font-medium">{vendor.subscription.plan}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-600">Price:</span>
        <span className="font-medium">₹{vendor.subscription.price}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-600">Payment Status:</span>
        <span className={`font-medium ${vendor.subscription.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}`}>
          {vendor.subscription.paymentStatus}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-600">Start Date:</span>
        <span className="font-medium">{vendor.subscription.startDate}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-600">End Date:</span>
        <span className="font-medium">{vendor.subscription.endDate}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-600">Renewal Due:</span>
        <span className={`font-medium ${vendor.subscription.renewalDue ? "text-yellow-600" : "text-green-600"}`}>
          {vendor.subscription.renewalDue ? "Yes" : "No"}
        </span>
      </div>

    </div>

  </div>

            )}
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-end gap-6 border-t pt-4 sticky bottom-0 bg-white z-20">
            {getActionButtons().map(({ label, newStatus, color }) => (
              <button
                key={label}
                onClick={() => handleChangeStatus(newStatus)}
                className={`${color} px-4 py-2 rounded text-white text-sm font-semibold`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate(`/vendor-edit/${vendor.id}`)}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm font-semibold flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this vendor?")
                ) {
                  navigate("/vendors");
                }
              }}
              className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-semibold flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Vendor
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDetailProfile;
