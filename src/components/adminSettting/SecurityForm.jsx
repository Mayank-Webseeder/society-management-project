import React from "react";

const SecurityForm = () => {
  const [formData, setFormData] = React.useState({
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
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 max-w-5xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Update Password
      </h2>

      <div className="grid grid-cols-1 gap-6 max-w-lg mx-auto">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-800">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            placeholder="Enter current password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 text-[15px] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-400 shadow-sm"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-800">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 text-[15px] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-400 shadow-sm"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-800">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Re-enter new password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 text-[15px] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-400 shadow-sm"
          />
        </div>
      </div>

      <div className="flex justify-end flex-wrap gap-4 pt-8 border-t border-gray-200">
        <button
          type="button"
          onClick={() => alert("Logged out from all devices")}
          className="px-6 py-3 border border-neutral-500 text-neutral-800 font-semibold rounded-lg hover:bg-neutral-100 transition shadow-sm"
        >
          Logout All Devices
        </button>

        <button
          type="submit"
          className="bg-[#6f8a93] hover:bg-[#5b7078] transition text-white font-bold px-8 py-3 rounded-lg shadow-lg"
        >
          Save Password
        </button>
      </div>
    </form>
  );
};

export default SecurityForm;
