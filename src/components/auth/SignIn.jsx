import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaVenusMars } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { RiUserStarFill } from "react-icons/ri";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    department: "",
    subrole: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

     if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  if (!formData.terms) {
    alert("Please agree to the terms before submitting.");
    return;
  }

    try {
      const response = await fetch(
        "https://society-services-backend.onrender.com/api/admin/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg || "Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (error) {
      toast.error("Network error, please try again");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="relative flex flex-col m-6 space-y-8 bg-white/40 shadow-2xl rounded-2xl md:flex-row md:space-y-0 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 md:p-14">
          <h1 className="mb-2 font-bold text-3xl sm:text-4xl text-center text-[#00809D]">
            Registration
          </h1>

          <p className="text-sm sm:text-base text-gray-600 pb-5 text-center">
            Create your admin account to manage operations efficiently!
          </p>

          <form className="justify-center items-center" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <div className="py-2 relative">
                <div className="absolute top-5 left-1 px-2 flex items-center justify-center text-[#00809D]">
                  <IoPersonAdd />
                </div>
                <input
                  className="w-full p-2 border rounded-xl placeholder:text-gray-500 px-12 shadow-md border-[#37AFE1] focus:outline-none focus:ring-2 focus:ring-[#44b1ca] transition-all duration-200"
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="py-2 relative">
                <div className="absolute top-5 left-1 px-2 flex items-center justify-center text-[#00809D]">
                  <MdAttachEmail />
                </div>
                <input
                  className="w-full p-2 border rounded-xl placeholder:text-gray-500 px-12 shadow-md border-[#37AFE1] focus:outline-none focus:ring-2 focus:ring-[#44b1ca] transition-all duration-200"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="py-2 relative">
                <div className="absolute top-5 left-1 px-2 flex items-center justify-center text-[#00809D]">
                  <FaVenusMars />
                </div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className={`w-full p-2 border rounded-xl px-12 shadow-md border-[#37AFE1] focus:outline-none focus:ring-2 focus:ring-[#4FC3DC] transition-all duration-200 ${
                    formData.gender === "" ? "text-gray-500" : "text-black"
                  }`}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="py-2 relative">
                <div className="absolute top-5 left-1 px-2 flex items-center justify-center text-[#00809D]">
                  <MdApartment />
                </div>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className={`w-full p-2 border rounded-xl px-12 shadow-md border-[#37AFE1] focus:outline-none focus:ring-2 focus:ring-[#4FC3DC] transition-all duration-200 ${
                    formData.gender === "" ? "text-gray-500" : "text-black"
                  }`}
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div className="py-2 relative">
                <div className="absolute top-5 left-1 px-2 flex items-center justify-center text-[#00809D]">
                  <RiUserStarFill />
                </div>
                <select
                  name="subrole"
                  value={formData.subrole}
                  onChange={handleChange}
                  required
                  className={`w-full p-2 border rounded-xl px-12 shadow-md border-[#37AFE1] focus:outline-none focus:ring-2 focus:ring-[#4FC3DC] transition-all duration-200 ${
                    formData.gender === "" ? "text-gray-500" : "text-black"
                  }`}
                >
                  <option value="" disabled>
                    Select Subrole
                  </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <div className="py-2 relative">
                <div className="absolute top-5 left-1 px-2 flex items-center justify-center text-[#00809D]">
                  <RiLockPasswordFill />
                </div>
                <input
                  className="w-full p-2 border rounded-xl px-12 placeholder:text-gray-500 shadow-md border-[#37AFE1] focus:outline-none focus:ring-2 focus:ring-[#44b1ca] transition-all duration-200"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="py-2 relative">
                <div className="absolute top-5 left-1 px-2 flex items-center justify-center text-[#00809D]">
                  <RiLockPasswordFill />
                </div>
                <input
                  className="w-full p-2 border rounded-xl px-12 placeholder:text-gray-500 shadow-md border-[#37AFE1] focus:outline-none focus:ring-2 focus:ring-[#4FC3DC] transition-all duration-200"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {formData.confirmPassword &&
                  formData.confirmPassword !== formData.password && (
                    <p className="text-sm text-red-600 mt-1 px-2">
                      Passwords do not match
                    </p>
                  )}
              </div>

              <div className="p-6 relative">
                <input
                  className="w-4 h-4 absolute top-7 left-1"
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />
                <p className="text-sm text-gray-700 w-full px-3">
                  By continuing, I agree to the terms of use & privacy policy.
                </p>
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="w-full rounded-lg font-semibold bg-[#00809D] text-white hover:scale-105 hover:bg-[#037892] p-2 hover:shadow-lg transition-all duration-300"
                >
                  Create Account
                </button>
              </div>

              <div className="text-sm sm:text-base flex items-center justify-center py-6 text-slate-800">
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-[#00809D] font-semibold hover:underline cursor-pointer"
                  >
                    Login here
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
