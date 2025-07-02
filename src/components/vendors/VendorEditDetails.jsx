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
    const fetchVendorDetails = () => {
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
    };

    fetchVendorDetails();
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
    <div className="max-w-xl mx-auto mt-14 bg-white p-6 rounded-xl shadow-lg outline outline-1 outline-[#52cbf4]">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit Vendor
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Subscription Status
          </label>
          <select
            name="subscriptionStatus"
            value={formData.subscriptionStatus}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
          >
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Services Provided (comma separated)
          </label>
          <input
            type="text"
            name="servicesProvided"
            value={formData.servicesProvided}
            onChange={handleChange}
            placeholder="e.g. Plumbing, Electrical"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/vendors")}
            className="px-5 py-2 rounded shadow text-gray-700 border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded shadow text-white bg-[#307991] hover:bg-[#00b4d8]"
          >
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
};

export default VendorEdit;
