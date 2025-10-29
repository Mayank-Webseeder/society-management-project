import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "Active",
    vendorsCount: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const navigate = useNavigate();

  // 🔹 Mock Data
  const mockServices = [
    { id: 1, name: "Plumber", category: "Home Services", vendorsCount: 12 },
    { id: 2, name: "Electrician", category: "Home Services", vendorsCount: 8 },
    { id: 3, name: "Carpenter", category: "Home Services", vendorsCount: 9 },
    { id: 4, name: "CCTV Installation", category: "Security Services", vendorsCount: 4 },
    { id: 5, name: "Maid Services", category: "Cleaning Services", vendorsCount: 11 },
    { id: 6, name: "Driver on Demand", category: "Transport Services", vendorsCount: 5 },
    { id: 7, name: "Gardening", category: "Outdoor Services", vendorsCount: 7 },
  ];

  const categories = [
    "Home Services",
    "Security Services",
    "Cleaning Services",
    "Transport Services",
    "Outdoor Services",
  ];

  // 🧠 Load mock data
  useEffect(() => {
    setTimeout(() => {
      setServices(mockServices);
      setFilteredServices(mockServices);
      setLoading(false);
    }, 500);
  }, []);

  // 🧮 Filtering logic
  useEffect(() => {
    let filtered = [...services];

    if (filterCategory !== "All") {
      filtered = filtered.filter((s) => s.category === filterCategory);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  }, [filterCategory, searchTerm, services]);

  const handleVendorClick = (serviceName) => {
    navigate(`/vendors-by-service/${encodeURIComponent(serviceName)}`);
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      name: "",
      category: "",
      status: "Active",
      vendorsCount: "",
    });
    setShowModal(true);
  };

  const handleEditClick = (service) => {
    setIsEditMode(true);
    setCurrentEditId(service.id);
    setFormData({
      name: service.name,
      category: service.category,
      status: service.status,
      vendorsCount: service.vendorsCount,
    });
    setShowModal(true);
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.category || !formData.vendorsCount) {
      alert("Please fill all fields.");
      return;
    }

    if (isEditMode) {
      setServices((prev) =>
        prev.map((item) =>
          item.id === currentEditId
            ? { ...item, ...formData, vendorsCount: parseInt(formData.vendorsCount) }
            : item
        )
      );
    } else {
      const newService = {
        ...formData,
        id: services.length + 1,
        vendorsCount: parseInt(formData.vendorsCount),
      };
      setServices([...services, newService]);
    }

    setShowModal(false);
    setFormData({ name: "", category: "", status: "Active", vendorsCount: "" });
    setIsEditMode(false);
    setCurrentEditId(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Do you really want to delete this item?");
    if (confirmDelete) {
      setServices(services.filter((serv) => serv.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-4">
        <svg
          className="animate-spin h-10 w-10 text-[#00809D]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p className="text-gray-600 text-lg font-medium tracking-wide">
          Loading services...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow h-screen">
      <div className="px-4 py-4 border-b border-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Search service..."
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00809D]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00809D]"
            >
              <option value="All">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={openAddModal}
            className="bg-[#00809D] text-white px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-[#006f86]"
          >
            + Add New Service
          </button>
        </div>

        {/* Services List */}
        <div className="space-y-4 max-h-[75vh] overflow-y-auto scrollbar-hide">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl px-4 sm:px-5 py-4 border border-[#F0F0F0] bg-white transition-transform duration-200 hover:scale-[1.01] hover:shadow-md gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-1/3">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center text-xl shadow-sm bg-gradient-to-br from-[#EDEDED] to-[#F7F7F7] text-[#5A5A5A]">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#2E2E2E] leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-500">{service.category}</p>
                  </div>
                </div>

                <div
                  onClick={() => handleVendorClick(service.name)}
                  className="w-full sm:w-1/3 text-md md:text-sm font-semibold text-slate-600 cursor-pointer hover:underline hover:text-[#00809D] text-left sm:text-center"
                >
                  {service.vendorsCount} Vendors
                </div>

                <div className="w-full sm:w-1/3 flex justify-end gap-2">
                  <button
                    className="p-2 rounded-md text-gray-600 transition hover:bg-green-100 hover:text-green-700"
                    title="Edit"
                    onClick={() => handleEditClick(service)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="p-2 rounded-md text-red-600 transition hover:bg-red-100 hover:text-red-700"
                    title="Delete"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">No services found.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex items-center justify-center z-50 px-6">
          <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-2xl border border-gray-100 ring-1 ring-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {isEditMode ? "Edit Service" : "Add New Service"}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Service Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00809D]"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              {/* 🔽 Select category instead of text input */}
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00809D]"
              >
                <option value="">Select Category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Vendors Count"
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00809D]"
                value={formData.vendorsCount}
                onChange={(e) =>
                  setFormData({ ...formData, vendorsCount: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsEditMode(false);
                  setFormData({
                    name: "",
                    category: "",
                    status: "Active",
                    vendorsCount: "",
                  });
                }}
                className="px-4 py-2 rounded-md text-sm text-gray-900 bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                className="px-4 py-2 rounded-md text-sm text-white bg-[#00809D] hover:bg-[#006f86]"
              >
                {isEditMode ? "Update Service" : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
