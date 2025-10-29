import React, { useState, useEffect } from "react";
import { HiOutlineMailOpen, HiEye, HiEyeOff } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaBuilding, FaUsers, FaShieldAlt, FaCog } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: <FaBuilding className="w-16 h-16 text-white" />,
      image: "https://images.pexels.com/photos/1481105/pexels-photo-1481105.jpeg",
      title: "My Society Needs",
      description:
        "Complete management solution for residential societies and communities",
    },
    {
      icon: <FaUsers className="w-16 h-16 text-white" />,
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
      title: "Resident Services",
      description:
        "Streamlined communication and service requests for all residents",
    },
    {
      icon: <FaShieldAlt className="w-16 h-16 text-white" />,
      image: "https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2020/04/Features-of-Top-Housing-Societies-A-08-04-1024x640.jpg",
      title: "Secure Access",
      description:
        "Advanced security with role-based access control and data protection",
    },
    {
      icon: <FaCog className="w-16 h-16 text-white" />,
      image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
      title: "Admin Control",
      description:
        "Powerful dashboard for complete society oversight and management",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/login`,
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        if (data.subrole) {
          localStorage.setItem("subrole", data.subrole);
        }
        window.location.href = "/";
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-white">
      <div className="w-full h-full grid lg:grid-cols-2">
        {/* LEFT SIDE - IMAGE SLIDES */}
        <div className="relative h-full flex overflow-hidden hidden lg:block">
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {features.map((feature, index) => (
              <div key={index} className="w-full flex-shrink-0 h-full">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-[#000000a8]" />

          {/* Text & Icon Overlay */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 lg:p-16 text-center text-white">
            <div className="mb-10">
              <img
                src="/Logo.png"
                alt="My Society Needs Logo"
                className="w-20 h-20 mx-auto mb-3"
              />
              <h1 className="text-4xl lg:text-5xl font-bold mb-3">
                My Society Needs
              </h1>
            </div>

            <div className="max-w-md text-center">
              <div className="flex justify-center mb-6">
                {features[currentSlide].icon}
              </div>
              <h2 className="text-2xl font-semibold mb-3">
                {features[currentSlide].title}
              </h2>
              <p className="text-blue-100 text-lg">
                {features[currentSlide].description}
              </p>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "w-10 h-3 bg-white"
                      : "w-3 h-3 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="flex flex-col justify-center items-center p-8 lg:p-16 bg-white">
          <div className="max-w-md w-full">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                Welcome Back
              </h2>
              <p className="text-gray-600 text-lg">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <HiOutlineMailOpen className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <RiLockPasswordFill className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5" />
                  ) : (
                    <HiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>

            {/* Footer */}
            {/* <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Protected by enterprise-grade security
              </p>
            </div> */}
            

          </div>

             <div className="absolute bottom-4 w-full text-center text-sm text-gray-600">
        © 2025 My Society Needs. All Rights Reserved. | Designed & developed by{" "}
        <a
          href="https://www.webseeder.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          WebSeeder Technologies
        </a>
      </div>
        </div>
      </div>

      {/* Bottom Footer */}
   
    </div>
  );
};

export default Login;
