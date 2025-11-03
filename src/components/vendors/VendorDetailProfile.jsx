import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVendorContext } from "../../context/VendorContext";
import {
  PhoneCall,
  Mail,
  MapPin,
  Pencil,
  Trash2,
  Star,
  StarHalf,
  CheckCircle2,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  CreditCard,
  ChevronLeft,
  BadgeCheck,
  Briefcase,
  XCircle,
  AlertCircle
} from "lucide-react";

const mockSubscriptions = [
  {
    vendorId: "68e3a79c1936f27d2976063e",
    plan: "Premium",
    price: 999,
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    paymentStatus: "Paid",
    renewalDue: false,
  },
];

const VendorDetailProfile = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams();
  const { vendors } = useVendorContext();

  const [vendor, setVendor] = useState(null);
  const [activeTab, setActiveTab] = useState("vendor info");
  const [loading, setLoading] = useState(true);

  const getStatusBadge = (status) => {
    const statusConfig = {
      Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Pending: "bg-amber-50 text-amber-700 border-amber-200",
      Rejected: "bg-rose-50 text-rose-700 border-rose-200",
      Blacklisted: "bg-red-50 text-red-700 border-red-200",
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border ${
          statusConfig[status] || "bg-gray-50 text-gray-700 border-gray-200"
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-emerald-500' : status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'}`}></span>
        {status}
      </span>
    );
  };

  const getActionButtons = () => {
    if (!vendor) return [];

    switch (vendor.status) {
      case "Active":
        return [
          {
            label: "Blacklist Vendor",
            newStatus: "Blacklisted",
            color: "bg-rose-600 hover:bg-rose-700",
          },
        ];

      case "Pending":
        return [
          {
            label: "Approve",
            newStatus: "Active",
            color: "bg-emerald-600 hover:bg-emerald-700",
          },
          {
            label: "Reject",
            newStatus: "Rejected",
            color: "bg-rose-600 hover:bg-rose-700",
          },
        ];

      case "Blacklisted":
        return [
          {
            label: "Activate",
            newStatus: "Active",
            color: "bg-emerald-600 hover:bg-emerald-700",
          },
        ];

      case "Rejected":
        return [
          {
            label: "Approve",
            newStatus: "Active",
            color: "bg-emerald-600 hover:bg-emerald-700",
          },
        ];

      default:
        return [];
    }
  };

  const handleChangeStatus = (newStatus) => {
    if (
      window.confirm(`Are you sure you want to change status to ${newStatus}?`)
    ) {
      setVendor((prev) => ({ ...prev, status: newStatus }));
      alert(`Vendor status changed to ${newStatus}`);
    }
  };

  // Transform API response to match component structure
  const transformVendorData = (apiVendor) => {
    // Determine status based on API flags
    let status = "Active";
    if (apiVendor.isBlacklisted) {
      status = "Blacklisted";
    } else if (!apiVendor.isApproved) {
      status = "Pending";
    }

    // Format location from address
    const location = `${apiVendor.address.city}, ${apiVendor.address.state}`;

    // Transform to component structure
    return {
      id: apiVendor._id,
      name: apiVendor.name,
      businessName: apiVendor.businessName,
      phone: apiVendor.contactNumber,
      email: apiVendor.email || "N/A",
      location: location,
      status: status,
      servicesProvided: apiVendor.services || [],
      rating: apiVendor.averageRating || 0,
      totalRatings: apiVendor.totalRatings || 0,
      experience: apiVendor.experience || "N/A",
      profilePicture: apiVendor.profilePicture,
      address: {
        buildingNumber: apiVendor.address.buildingNumber,
        locality: apiVendor.address.locality,
        landmark: apiVendor.address.landmark,
        city: apiVendor.address.city,
        state: apiVendor.address.state,
        pincode: apiVendor.address.pincode,
      },
      documents: [
        {
          name: "ID Proof",
          type: "PDF Document",
          status: apiVendor.idProof ? "Verified" : "Pending",
          uploadedOn: apiVendor.idProof ? new Date().toLocaleDateString() : "--",
          url: apiVendor.idProof,
        },
      ],
      totalJobsApplied: 0,
      completedJobs: 0,
      ongoingJobs: 0,
      cancelledJobs: 0,
      jobHistory: [],
    };
  };

  useEffect(() => {
    setLoading(true);
    const foundVendor = vendors.find((v) => String(v._id || v.id) === String(vendorId));

    if (foundVendor) {
      const transformedVendor = transformVendorData(foundVendor);
      setVendor(transformedVendor);
    } else {
      setVendor(null);
    }
    setLoading(false);
  }, [vendorId, vendors]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vendor details...</p>
        </div>
      </div>
    );

  if (!vendor)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <p className="text-gray-800 font-semibold text-lg">Vendor not found</p>
          <p className="text-gray-500 mt-1">This vendor doesn't exist in our system</p>
        </div>
      </div>
    );

  const RatingDisplay = ({ rating }) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-amber-400 text-amber-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-1.5 text-sm font-semibold text-gray-700">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const isProfileHidden =
    vendor.status === "Pending" || vendor.status === "Rejected";

  // Filter subscription for current vendor
  const vendorSubscription = mockSubscriptions.filter(sub => sub.vendorId === vendor.id);

  return (
    <div>
      {/* Header */}
      <div className="">
        <div className="">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Vendors
          </button>
        </div>
      </div>

      {isProfileHidden ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Profile Unavailable</h3>
            <p className="text-gray-500">This vendor's profile is currently not available for viewing.</p>
          </div>
        </div>
      ) : (
        <div className="py-4 space-y-6">
          {/* Vendor Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className=" h-20"></div>
            <div className="px-6 pb-6 -mt-16">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div className="flex items-end gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-white shadow border-4 border-white flex items-center justify-center text-3xl font-bold text-blue-600">
                    {vendor.name?.charAt(0) || "N"}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">{vendor.name}</h1>
                      {getStatusBadge(vendor.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {vendor.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        {vendor.businessName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {getActionButtons().map(({ label, newStatus, color }) => (
                    <button
                      key={label}
                      onClick={() => handleChangeStatus(newStatus)}
                      className={`${color} px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all hover:shadow-lg`}
                    >
                      {label}
                    </button>
                  ))}

                  <button
                    onClick={() => navigate(`/vendor-edit/${vendor.id}`)}
                    className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm font-semibold transition-all flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
            <div className="flex flex-wrap gap-1">
              {[
                { id: "vendor info", icon: BadgeCheck },
                { id: "subscription", icon: CreditCard },
                { id: "job history", icon: Briefcase },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 font-medium capitalize text-sm rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div>
            {activeTab === "vendor info" && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Contact Info */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <PhoneCall className="w-4 h-4 text-blue-600" />
                      </div>
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <PhoneCall className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                          <p className="font-medium text-gray-900">{vendor.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Email</p>
                          <p className="font-medium text-gray-900 break-all">{vendor.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Full Address</p>
                          <p className="font-medium text-gray-900">
                            {vendor.address.buildingNumber}, {vendor.address.locality}, {vendor.address.landmark}, {vendor.address.city}, {vendor.address.state} - {vendor.address.pincode}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Experience</p>
                          <p className="font-medium text-gray-900">{vendor.experience}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <BadgeCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      Services Offered
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {vendor.servicesProvided?.map((service, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span className="font-medium text-gray-800 text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-1 gap-4 py-4">
                    {vendor.documents?.map((doc, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                              <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">{doc.name}</h4>
                              <p className="text-sm text-gray-500">{doc.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 sm:flex-row-reverse">
                            <span
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                                doc.status === "Verified"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {doc.status}
                            </span>
                            <span className="text-sm text-gray-600">
                              {doc.uploadedOn !== "--" ? doc.uploadedOn : "Not Uploaded"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "subscription" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="overflow-x-auto min-h-[50vh]">
                  <table className="min-w-full border-b border-gray-300">
                    <thead className="bg-gray-100 sticky top-0 z-10 text-gray-700 uppercase text-xs font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Plan</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Start Date</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">End Date</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Renewal Due</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {vendorSubscription.length > 0 ? (
                        vendorSubscription.map((subscription, index) => (
                          <tr key={index} className="hover:bg-[#F0F6FC] border-b border-gray-200">
                            <td className="px-6 py-3 font-medium text-gray-800">{subscription.plan}</td>
                            <td className="px-6 py-3 text-gray-700">{subscription.startDate}</td>
                            <td className="px-6 py-3 text-gray-700">{subscription.endDate}</td>
                            <td className="px-6 py-3">
                              <span
                                className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${
                                  subscription.renewalDue
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {subscription.renewalDue ? (
                                  <>
                                    <CheckCircle className="w-3 h-3" /> Yes
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-3 h-3" /> No
                                  </>
                                )}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                            No subscription data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "job history" && (
              <div>
                <div className="mb-6">
                  {/* Job Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                    {[
                      {
                        label: "Total Jobs",
                        value: vendor.totalJobsApplied,
                        icon: Briefcase,
                        bg: "bg-blue-200",
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
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100 sticky top-0 z-10 text-gray-700 uppercase text-xs font-bold tracking-wider">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Job ID</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {vendor.jobHistory?.length > 0 ? (
                          vendor.jobHistory.map((job) => (
                            <tr key={job.id} className="hover:bg-[#F0F6FC] transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{job.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{job.type}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{job.date}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                              No job history available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDetailProfile;