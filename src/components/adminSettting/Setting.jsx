import React, { useState } from "react";

const Setting = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    alert("Password changed!");
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <form onSubmit={handleSubmit} className="px-2 sm:px-6 py-8 space-y-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Update Password</h2>
          <p className="text-sm text-gray-500 mt-1">
            Use a strong and unique password to protect your account.
          </p>
        </div>

        {/* Password Section */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm space-y-3 md:space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#40719c] focus:border-[#4278a7] shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#40719c] focus:border-[#4278a7] shadow-sm"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Re-enter new password"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#40719c] focus:border-[#4278a7] shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#447D9B] hover:bg-[#3e7390] transition text-white font-bold px-8 py-3 rounded-lg shadow-lg text-sm"
          >
            Save Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
