import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Settings,
  Star,
  Calendar,
  Tag,
} from "lucide-react";

const AddVendor = ({ onClose, onAddVendor }) => {
  const servicesOptions = [
    "Plumbing",
    "Electrician",
    "Carpentry",
    "Cleaning",
    "Painting",
    "Pest Control",
    "Other",
  ];
  const subscriptionPlans = ["None", "Basic", "Premium"];

  const [formData, setFormData] = useState({
    vendorName: "",
    email: "",
    phone: "",
    location: "",
    servicesProvided: [],
    otherService: "",
    status: "Active",
    subscriptionPlan: "None",
    subscriptionStatus:"",
  });

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    if (type === "select-multiple") {
      const selected = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prev) => ({ ...prev, [name]: selected }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  // For subscriptionExpiry enable/disable:
  const isSubscriptionActive = formData.subscriptionPlan !== "None";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.vendorName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.location.trim() ||
      !formData.servicesProvided
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (
      !formData.servicesProvided.length ||
      (formData.servicesProvided.includes("Other") &&
        !formData.otherService.trim())
    ) {
      alert("Please select services and specify 'Other' if selected.");
      return;
    }

    console.log("Submitting vendor:", formData);
    onAddVendor(formData);
    alert("Vendor added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 relative">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <User size={20} className="text-blue-600" />
          Add New Vendor
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Vendor Name */}
          <div>
            <label
              htmlFor="vendorName"
              className="block text-sm font-semibold mb-1"
            >
              Vendor Name <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="vendorName"
                name="vendorName"
                type="text"
                value={formData.vendorName}
                onChange={handleChange}
                placeholder="Enter vendor name"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-1">
              Phone <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold mb-1"
            >
              Location <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
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
              Status <span className="text-red-600">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-3 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          {/* Subscription Plan */}
          <div>
            <label
              htmlFor="subscriptionPlan"
              className="block text-sm font-semibold mb-1"
            >
              Subscription Plan
            </label>
            <select
              id="subscriptionPlan"
              name="subscriptionPlan"
              value={formData.subscriptionPlan}
              onChange={handleChange}
              className="w-full px-3 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {subscriptionPlans.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subscription Status
            </label>
            <select
              name="subscriptionStatus"
              value={formData.subscriptionStatus}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>


          {/* Services Provided */}
          <div>
            <label
              htmlFor="servicesProvided"
              className="block text-sm font-semibold mb-1"
            >
              Service Provided <span className="text-red-600">*</span>
            </label>
            <select
              id="servicesProvided"
              name="servicesProvided"
              value={formData.servicesProvided}
              onChange={handleChange}
              multiple
              required
              className="w-full px-3 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {servicesOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            {formData.servicesProvided.includes("Other") && (
              <div className="mt-2">
                <label
                  htmlFor="otherService"
                  className="block text-sm font-semibold mb-1"
                >
                  Please specify service <span className="text-red-600">*</span>
                </label>
                <input
                  id="otherService"
                  name="otherService"
                  type="text"
                  value={formData.otherService}
                  onChange={handleChange}
                  placeholder="Enter custom service"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Submit Button full width col-span-2 */}
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
              Add Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVendor;
