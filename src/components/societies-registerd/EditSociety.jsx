import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SocietyEdit = () => {
  const { societyId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
    location: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const data = {
      name: "Ocean View Apartments",
      status: "Active",
      location: "Indore",
      contactPerson: "Ravi Kumar",
      phone: "9876543210",
      email: "ravi.kumar@example.com",
      address: "Sector 45, Gurugram",
      city: "Gurugram",
      pincode: "122003",
    };
    setFormData(data);
  }, [societyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    navigate("/societies");
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
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

        <h1 className="text-lg sm:text-xl font-bold text-gray-800 text-center flex-grow">
          Edit Society Details
        </h1>

        <div className="hidden sm:block w-14" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/90 rounded-3xl p-4 space-y-6 border border-gray-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-2 text-gray-500 font-medium text-sm"
            >
              Society Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5187ac]"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="mb-2 text-gray-500 font-medium text-sm"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5187ac]"
            >
              <option>Active</option>
              <option>Pending</option>
              <option>Rejected</option>
              <option>Banned</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="location"
              className="mb-2 text-gray-500 font-medium text-sm"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5187ac]"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="contactPerson"
              className="mb-2 text-gray-500 font-medium text-sm"
            >
              Contact Person
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5187ac]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="mb-2 text-gray-500 font-medium text-sm"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5187ac]"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-gray-500 font-medium text-sm"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5187ac]"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="address"
            className="mb-2 text-gray-500 font-medium text-sm"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5187ac]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="city"
              className="mb-2 text-gray-500 font-medium text-sm"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5187ac]"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="pincode"
              className="mb-2 text-gray-500 font-medium text-sm"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5187ac]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => navigate("/societies")}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#00809D] text-white rounded hover:bg-[#237688] text-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocietyEdit;
