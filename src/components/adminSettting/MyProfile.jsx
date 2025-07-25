import React, { useState } from "react";

const MyProfile = () => {
  const [profilePic, setProfilePic] = useState(null);

  const [formData, setFormData] = React.useState({
    firstName: "Priya",
    lastName: "Malhotra",
    email: "priya.malhotra@adminpanel.com",
    phone: "98111 22334",
    bio: "Senior Admin Executive handling operational workflows and vendor coordination.",
    address: {
      country: "India",
      state: "Delhi",
      city: "New delhi",
      pincode: "110001",
      details: "3rd Floor, Corporate Heights, Connaught Place",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved!");
  };

  return (
  <form
    onSubmit={handleSubmit}
    className="space-y-6 px-1 sm:px-3 md:px-4" 
  >
    {/* Profile Image */}
  <div className="flex flex-col items-center gap-4">
    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-gray-300 shadow-md hover:shadow-lg transition group">
      {profilePic ? (
        <img
          src={profilePic}
          alt="Profile Preview"
          className="w-full h-full object-cover group-hover:opacity-80 transition"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-5xl font-bold">
          A
        </div>
      )}
    </div>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="text-sm text-gray-600"
    />
    <p className="text-xs text-gray-500">Max size 2MB • JPG, PNG</p>
  </div>

  {/* Form Inputs */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Left Column */}
    <div className="space-y-6">
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-800">
          First Name
        </label>
        <input
          name="firstName"
          type="text"
          placeholder="Admin"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 font-medium placeholder-gray-400 focus:ring-2 focus:ring-[#6f8a93] focus:outline-none shadow-sm"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-800">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={formData.email}
          disabled
          className="w-full border rounded-lg px-4 py-3 font-medium bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-800">
          Country
        </label>
        <input
          name="address.country"
          type="text"
          placeholder="India"
          value={formData.address.country}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 font-medium placeholder-gray-400 focus:ring-2 focus:ring-[#6f8a93] focus:outline-none shadow-sm"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-800">
          Pincode
        </label>
        <input
          name="address.pincode"
          type="text"
          placeholder="452001"
          value={formData.address.pincode}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 font-medium placeholder-gray-400 focus:ring-2 focus:ring-[#6f8a93] focus:outline-none shadow-sm"
        />
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-6">
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-800">
          Last Name
        </label>
        <input
          name="lastName"
          type="text"
          placeholder="Manager"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 font-medium placeholder-gray-400 focus:ring-2 focus:ring-[#6f8a93] focus:outline-none shadow-sm"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-800">
          Phone
        </label>
        <input
          name="phone"
          type="tel"
          placeholder="+91 99999 12345"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 font-medium placeholder-gray-400 focus:ring-2 focus:ring-[#6f8a93] focus:outline-none shadow-sm"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-800">
          State / City
        </label>
        <input
          name="address.state"
          type="text"
          placeholder="Madhya Pradesh / Indore"
          value={formData.address.state}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 font-medium placeholder-gray-400 focus:ring-2 focus:ring-[#6f8a93] focus:outline-none shadow-sm"
        />
      </div>
    </div>

    {/* Bio (Full Width) */}
    <div className="md:col-span-2">
      <label className="block mb-1 text-sm font-semibold text-gray-800">
        Bio
      </label>
      <textarea
        name="bio"
        rows={3}
        placeholder="System Administrator at Admin Panel Pvt Ltd."
        value={formData.bio}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3 font-medium resize-none placeholder-gray-400 focus:ring-2 focus:ring-[#6f8a93] focus:outline-none shadow-sm"
      />
    </div>

    <div className="md:col-span-2">
      <label className="block mb-1 text-sm font-semibold text-gray-800">
        Detailed Address
      </label>
      <textarea
        name="address.details"
        rows={2}
        placeholder="Street, Building, Landmark..."
        value={formData.address.details}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3 font-medium resize-none placeholder-gray-400 focus:ring-2 focus:ring-[#6f8a93] focus:outline-none shadow-sm"
      />
    </div>
  </div>

  {/* Submit */}
  <div className="text-right">
    <button
      type="submit"
      className="bg-[#447D9B] hover:bg-[#3e7390] transition text-white font-bold px-8 py-3 rounded-lg shadow-lg"
    >
      Save Profile
    </button>
  </div>
    </form>
  );
};

export default MyProfile;
