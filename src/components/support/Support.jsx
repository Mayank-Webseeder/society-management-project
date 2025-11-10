import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertCircle, CheckCircle, Clock, Search, Eye, X, Image, Calendar, User, Building2, MessageSquare } from "lucide-react";

const Support = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_BASE_URL}/api/admin/support-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(response.data.requests || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "resolved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "in-progress":
        return <AlertCircle className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  const filteredRequests = requests.filter((req) => {
    const name = req.vendor?.name?.toLowerCase() || "";
    const business = req.vendor?.businessName?.toLowerCase() || "";
    const msg = req.message?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return name.includes(term) || business.includes(term) || msg.includes(term);
  });

  const groupedRequests = filteredRequests.reduce((acc, req) => {
    const vendorId = req.vendor?._id || "unknown";
    if (!acc[vendorId]) {
      acc[vendorId] = {
        vendor: req.vendor,
        requests: [],
      };
    }
    acc[vendorId].requests.push(req);
    return acc;
  }, {});

  const openImageModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setImageModalOpen(true);
  };

  if (loading) {
    return (
      <div className=" bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading support requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="">
        {/* Header Section */}
        <div className="mb-8">
          {/* <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Support Center</h1>
              <p className="text-gray-600 mt-1">Manage and track vendor support requests</p>
            </div>
          </div> */}
          
     

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
  {[
    {
      label: "Total Requests",
      value: requests.length,
      icon: MessageSquare,
      bg: "bg-blue-200",
    },
    {
      label: "Active Vendors",
      value: Object.keys(groupedRequests).length,
      icon: Building2,
      bg: "bg-emerald-200",
    },
    {
      label: "Pending Issues",
      value: requests.filter((r) => r.status === "pending").length,
      icon: Clock,
      bg: "bg-amber-200",
    },
  ].map(({ label, value, icon: Icon, bg }, index) => (
    <div
      key={index}
      className={`${bg} text-black rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow`}
    >
      <div>
        <p className="text-sm opacity-80">{label}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className="bg-white p-3 rounded-full shadow-sm">
        <Icon className="w-6 h-6 text-black" />
      </div>
    </div>
  ))}
</div>

        </div>

        {error && (
          <div className="bg-red-50 border-2  border-red-200 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center gap-3 text-red-800">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm mb-6 border border-gray-200">
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by vendor name, business, or message content..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Grouped Requests */}
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pb-8 scrollbar-hide">
          {Object.entries(groupedRequests).length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">No support requests found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms</p>
            </div>
          ) : (
            Object.entries(groupedRequests).map(([vendorId, data]) => (
              <div key={vendorId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Vendor Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-xl shadow-sm">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {data.vendor?.name || "Unknown Vendor"}
                        </h2>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-600 font-medium">
                            {data.vendor?.businessName || "N/A"}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded">
                            ID: {vendorId.slice(-8)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-semibold text-gray-700">
                        {data.requests.length} {data.requests.length === 1 ? "Request" : "Requests"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Requests List */}
                <div className="divide-y divide-gray-100">
                  {data.requests.map((request) => (
                    <div
                      key={request._id}
                      className="p-6 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getStatusColor(
                                  request.status
                                )}`}
                              >
                                {getStatusIcon(request.status)}
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace("-", " ")}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {getRelativeTime(request.createdAt)}
                              </span>
                            </div>
                            <button
                              onClick={() => setSelectedRequest(request)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          </div>

                          <p className="text-gray-800 text-base leading-relaxed mb-3">
                            {request.message}
                          </p>

                          {request.imageUrl && (
                            <div className="mt-3">
                              <button
                                onClick={() => openImageModal(request.imageUrl)}
                                className="relative group/img inline-block"
                              >
                                <img
                                  src={request.imageUrl}
                                  alt="Support attachment"
                                  className="max-w-xs h-32 object-cover rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all shadow-sm"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/img:bg-opacity-20 rounded-lg transition-all flex items-center justify-center">
                                  <Image className="w-8 h-8 text-white opacity-0 group-hover/img:opacity-100 transition-opacity" />
                                </div>
                              </button>
                            </div>
                          )}

                          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              Request ID: {request._id.slice(-8)}
                            </span>
                            <span>•</span>
                            <span>Updated: {formatDate(request.updatedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gray-800 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Request Details</h2>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Vendor Info */}
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                  Vendor Information
                </label>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">
                        {selectedRequest.vendor?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedRequest.vendor?.businessName || "N/A"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-mono bg-white px-3 py-2 rounded-lg inline-block">
                    Vendor ID: {selectedRequest.vendor?._id || "N/A"}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                  Support Message
                </label>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <p className="text-gray-900 leading-relaxed">{selectedRequest.message}</p>
                </div>
              </div>

              {/* Image Attachment */}
              {selectedRequest.imageUrl && (
                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                    Attachment
                  </label>
                  <button
                    onClick={() => openImageModal(selectedRequest.imageUrl)}
                    className="relative group/img w-full"
                  >
                    <img
                      src={selectedRequest.imageUrl}
                      alt="Support attachment"
                      className="w-full rounded-xl border-2 border-gray-200 hover:border-blue-400 transition-all shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/img:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
                      <div className="bg-white p-3 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg">
                        <Image className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {/* Status & Timeline */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                    Current Status
                  </label>
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold border ${getStatusColor(
                      selectedRequest.status
                    )}`}
                  >
                    {getStatusIcon(selectedRequest.status)}
                    {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1).replace("-", " ")}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
                    Request ID
                  </label>
                  <div className="bg-gray-100 rounded-lg px-4 py-2.5 font-mono text-sm text-gray-700 border border-gray-200">
                    {selectedRequest._id}
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Created
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium">{formatDate(selectedRequest.createdAt)}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Last Updated
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium">{formatDate(selectedRequest.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {imageModalOpen && currentImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-fadeIn"
          onClick={() => setImageModalOpen(false)}
        >
          <div className="relative max-w-6xl w-full">
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute -top-12 right-0 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <img
              src={currentImage}
              alt="Full size attachment"
              className="w-full h-auto rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;