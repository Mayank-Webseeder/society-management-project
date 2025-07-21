import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Wrench } from "lucide-react";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "Active",
    vendorsCount: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setServices([
      {
        id: 1,
        name: "Plumber",
        category: "Home Services",
        status: "Active",
        vendorsCount: 12,
      },
      {
        id: 2,
        name: "Electrician",
        category: "Home Services",
        status: "Inactive",
        vendorsCount: 8,
      },
      {
        id: 3,
        name: "Carpenter",
        category: "Home Services",
        status: "Active",
        vendorsCount: 9,
      },
      {
        id: 4,
        name: "CCTV Installation",
        category: "Security Services",
        status: "Inactive",
        vendorsCount: 4,
      },
      {
        id: 5,
        name: "Maid Services",
        category: "Cleaning Services",
        status: "Active",
        vendorsCount: 11,
      },
      {
        id: 6,
        name: "Driver on Demand",
        category: "Transport Services",
        status: "Active",
        vendorsCount: 5,
      },
      {
        id: 7,
        name: "Gardening",
        category: "Outdoor Services",
        status: "Active",
        vendorsCount: 7,
      },
    ]);
  }, []);

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
            ? {
                ...item,
                ...formData,
                vendorsCount: parseInt(formData.vendorsCount),
              }
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
    const confirmDelete = window.confirm(
      "Do you really want to delete this item from the list?"
    );
    if (confirmDelete) {
      setServices(services.filter((serv) => serv.id !== id));
    }
  };

  return (
    <div className="p-6 bg-[#F8F9FA] min-h-screen">
      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6">
        {/* Heading */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2E2E2E]">
            Available Services & Associated Vendors
          </h2>
          <button
            onClick={openAddModal}
            className="bg-[#00809D] text-white px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-[#006f86]"
          >
            + Add New Service
          </button>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between rounded-xl px-5 py-4 border border-[#F0F0F0] bg-white transition-transform duration-200 hover:scale-[1.01] hover:shadow-md"
            >
              {/* Left */}
              <div className="flex items-center gap-4 w-[30%]">
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

              {/* Status */}
              <div className="w-[20%] flex items-center gap-2 text-sm">
                {service.status === "Active" ? (
                  <GoDotFill className="text-green-600 text-base" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                )}
                <span
                  className={`font-medium ${
                    service.status === "Active"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {service.status}
                </span>
              </div>

              {/* Vendors Count */}
              <div
                onClick={() => handleVendorClick(service.name)}
                className="w-[20%] text-center text-sm font-semibold text-slate-600 cursor-pointer hover:underline hover:text-[#00809D]"
              >
                {service.vendorsCount} Vendors
              </div>

              {/* Actions */}
              <div className="w-[20%] flex justify-end gap-2">
                <button
                  className="p-2 rounded-md text-gray-600 transition hover:bg-green-100 hover:text-green-700"
                  title="Edit"
                  onClick={() => handleEditClick(service)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="p-2 rounded-md text-gray-600 transition hover:bg-red-100 hover:text-red-700"
                  title="Delete"
                  onClick={() => handleDelete(service.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
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
              <input
                type="text"
                placeholder="Category"
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00809D]"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00809D]"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
