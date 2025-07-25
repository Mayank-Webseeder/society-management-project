import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VendorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    subscriptionStatus: "Active",
    servicesProvided: "",
  });

  useEffect(() => {
    const dummyData = {
      id,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91-9876543210",
      location: "Indore",
      subscriptionStatus: "Active",
      servicesProvided: ["Plumbing", "Electrical"],
    };
    setFormData({
      ...dummyData,
      servicesProvided: dummyData.servicesProvided.join(", "),
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      servicesProvided: formData.servicesProvided
        .split(",")
        .map((s) => s.trim()),
    };
    console.log("Updated Vendor Data:", updatedData);
    alert("Vendor updated successfully!");
    navigate("/vendors");
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/vendors")}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </button>

        <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">
          Edit Vendor Details
        </h1>

        <div className="w-14" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/90 rounded-3xl p-4 space-y-6 border border-gray-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5187ac]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5187ac]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5187ac]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5187ac]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Subscription Status
            </label>
            <select
              name="subscriptionStatus"
              value={formData.subscriptionStatus}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5187ac]"
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Services Provided
            </label>
            <input
              type="text"
              name="servicesProvided"
              value={formData.servicesProvided}
              onChange={handleChange}
              placeholder="e.g. Plumbing, Electrical"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#5187ac]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/vendors")}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#00809D] text-white rounded hover:bg-[#237688]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorEdit;
