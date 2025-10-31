import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", category: "", status: "Active" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const navigate = useNavigate();

  // 🔗 Real API Endpoints
  const API_BASE_URL = "https://api.mysocietyneeds.com"; // Replace with import.meta.env if needed

  const GET_SERVICES_API = `${API_BASE_URL}/api/admin/services`;
  const ADD_SERVICE_API = `${API_BASE_URL}/api/admin/add-service`;
  const DELETE_SERVICE_API = `${API_BASE_URL}/api/admin/delete-services`; // ✅ Updated (uses POST with {names: []})

  const categories = [
    "Home Services",
    "Security Services",
    "Cleaning Services",
    "Transport Services",
    "Outdoor Services",
  ];

  // ✅ Fetch Services (with Token)
  const fetchServices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const { data } = await axios.get(GET_SERVICES_API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const mapped = data.services.map((s) => ({
        id: s._id,
        name: s.name,
        category: "General Services",
        isActive: s.isActive,
        createdAt: new Date(s.createdAt).toLocaleDateString(),
      }));

      setServices(mapped);
      setFilteredServices(mapped);
    } catch (error) {
      console.error("❌ Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // 🔍 Filter Services
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
    setFormData({ name: "", category: "", status: "Active" });
    setShowModal(true);
  };

  const handleEditClick = (service) => {
    setIsEditMode(true);
    setCurrentEditId(service.id);
    setFormData({
      name: service.name,
      category: service.category,
      status: service.isActive ? "Active" : "Inactive",
    });
    setShowModal(true);
  };

  // ✅ Add Service API
  const handleFormSubmit = async () => {
    if (!formData.name) {
      alert("Please enter a service name.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        ADD_SERVICE_API,
        { name: formData.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Service added successfully!");
      await fetchServices();
      setShowModal(false);
    } catch (error) {
      console.error("❌ Error adding service:", error);
      alert("Failed to add service.");
    }
  };

  // ✅ Delete Service API
  const handleDelete = async (name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        DELETE_SERVICE_API,
        { names: [name] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("🗑️ Service deleted successfully!");
      await fetchServices();
    } catch (error) {
      console.error("❌ Error deleting service:", error);
      alert("Failed to delete service.");
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
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
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
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

        {/* ✅ Services List */}
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
                    <h3 className="text-[16px] font-semibold text-[#2E2E2E]">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-500">{service.category}</p>
                  </div>
                </div>

                <div
                  onClick={() => handleVendorClick(service.name)}
                  className="w-full sm:w-1/3 text-md md:text-sm font-semibold text-slate-600 cursor-pointer hover:underline hover:text-[#00809D] text-left sm:text-center"
                >
                  View Vendors
                </div>

                <div className="w-full sm:w-1/3 flex justify-end gap-2">
                  <button
                    className="p-2 rounded-md text-gray-600 transition hover:bg-green-100 hover:text-green-700"
                    onClick={() => handleEditClick(service)}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    className="p-2 rounded-md text-red-600 transition hover:bg-red-100 hover:text-red-700"
                    onClick={() => handleDelete(service.name)}
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

      {/* ✅ Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              {isEditMode ? "Edit Service" : "Add New Service"}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Service Name"
                className="border border-gray-300 rounded-md w-full px-3 py-2"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <select
                className="border border-gray-300 rounded-md w-full px-3 py-2"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                className="px-4 py-2 bg-[#00809D] text-white rounded-md hover:bg-[#006f86]"
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
