import React, { useState } from "react";
import {
  X,
  Building2,
  MapPin,
  LocateIcon,
  Landmark,
  Mail,
  User,
  Phone,
  CheckCircle,
} from "lucide-react";

const AddSociety = ({ onClose, onAddSociety }) => {
  // Form state
  const [formData, setFormData] = useState({
    societyName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactName: "",
    contactNumber: "",
    email: "",
    status: "Active",
  });

  const states = [
    "Select State",
    "Madhya Pradesh",
    "Maharashtra",
    "Delhi",
    "Karnataka",
    "Tamil Nadu",
    "Uttar Pradesh",
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simple validation and submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.societyName.trim() ||
      !formData.address.trim() ||
      formData.state === "Select State" ||
      !formData.city.trim() ||
      !formData.pincode.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }
    // Here you can send formData to backend API
     const newSociety = {
    ...formData,
    location: formData.city, 
  };

    onAddSociety(newSociety);
    console.log("new society", formData);
    alert("Society added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 relative">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Building2 size={20} className="text-blue-600" />
          Add New Society
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Society Name */}
          <div>
            <label
              htmlFor="societyName"
              className="block text-sm font-semibold mb-1"
            >
              Society Name <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="societyName"
                name="societyName"
                type="text"
                value={formData.societyName}
                onChange={handleChange}
                placeholder="Enter society name"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-semibold mb-1"
            >
              Address <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-semibold mb-1">
              City <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <LocateIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-semibold mb-1">
              State <span className="text-red-600">*</span>
            </label>

            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full pl-3 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Pincode */}
          <div>
            <label
              htmlFor="pincode"
              className="block text-sm font-semibold mb-1"
            >
              Pincode <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <LocateIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="pincode"
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                required
                maxLength={6}
                pattern="\d{6}"
                title="6 digit pincode"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contact Person Name */}
          <div>
            <label
              htmlFor="contactName"
              className="block text-sm font-semibold mb-1"
            >
              Contact Person Name
            </label>

            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="contactName"
                name="contactName"
                type="text"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Contact person name"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>

            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label
              htmlFor="contactNumber"
              className="block text-sm font-semibold mb-1"
            >
              Contact Number
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+91-XXXXXXXXXX"
                pattern="^\+?\d{10,15}$"
                title="Enter valid phone number"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-semibold mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Add Society
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSociety;
