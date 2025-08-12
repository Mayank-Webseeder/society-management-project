import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMailOpen, HiEye, HiEyeOff } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaBuilding, FaUsers, FaShieldAlt, FaCog } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "/Logo.png"; // Assuming your logo is in the public folder

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);

  // Features for slider
  const features = [
    {
      icon: (
        <FaBuilding className="w-12 sm:w-16 h-12 sm:h-16 text-[#1860ca]" />
      ),
      title: "My Society Needs",
      description:
        "Complete management solution for residential societies and communities",
    },
    {
      icon: <FaUsers className="w-12 sm:w-16 h-12 sm:h-16 text-[#72a6e7]" />,
      title: "Resident Services",
      description:
        "Streamlined communication and service requests for all residents",
    },
    {
      icon: <FaShieldAlt className="w-12 sm:w-16 h-12 sm:h-16 text-[#38c6d2]" />,
      title: "Secure Access",
      description:
        "Advanced security with role-based access control and data protection",
    },
    {
      icon: <FaCog className="w-12 sm:w-16 h-12 sm:h-16 text-[#1860ca]" />,
      title: "Admin Control",
      description:
        "Powerful dashboard for complete society oversight and management",
    },
  ];

  // Page loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

try {
  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/admin/login`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  //console.log(res.data);

      const { token, role, subrole } = res.data;
      const success = await handleLogin({ token, role, subrole });

      if (success) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        setError("Login failed");
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Login API error:", error);
      setError("Invalid credentials");
      toast.error("Login failed");
    }

    setLoading(false);
  };

  // Loading Screen Component
  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0933a6] to-[#51cedb] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-pulse">
            <img src= "/Logo.png" alt="Logo"className="w-25 h-25"/>
          </div>
          <div className="absolute -inset-2 border-2 border-white/30 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          My Society Needs
        </h2>
        <div className="w-32 h-1 bg-white/30 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  if (pageLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-2 sm:p-4 relative">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side - Features Slider */}
            <div className="lg:w-1/2 h-[40vh] lg:h-auto relative bg-gradient-to-br from-[#0933a6] to-[#51cedb] overflow-hidden">
              <div className="absolute top-4 sm:top-10 left-4 sm:left-10 w-16 sm:w-32 h-16 sm:h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-8 sm:bottom-20 right-6 sm:right-16 w-20 sm:w-40 h-20 sm:h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
              <div className="absolute top-20 sm:top-40 right-8 sm:right-20 w-12 sm:w-24 h-12 sm:h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>

              {/* Smooth curve at bottom for mobile */}
              <div className="absolute bottom-0 left-0 w-full h-6 bg-white lg:hidden">
                <svg
                  viewBox="0 0 100 10"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,10 Q50,0 100,10 L100,10 L0,10 Z"
                    fill="currentColor"
                    className="text-[#51cedb]"
                  />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col justify-center items-center w-full p-4 sm:p-8 lg:p-12 text-white h-full">
                <div className="text-center mb-4 lg:mb-12 flex flex-col items-center">
                  <img
                    src={logo}
                    alt="My Society Needs Logo"
                    className="w-16 h-16 sm:w-20 sm:h-20 mb-4"
                  />
                  <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold mb-2 lg:mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    My Society Needs
                  </h1>
                  <p className="text-sm sm:text-lg lg:text-xl text-blue-100 font-medium">
                    Admin Dashboard
                  </p>
                  <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-white/30 rounded-full mx-auto mt-2 sm:mt-4"></div>
                </div>

                {/* Feature Slider */}
                <div className="relative w-full max-w-lg">
                  <div className="overflow-hidden rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm p-1 sm:p-2">
                    <div
                      className="flex transition-transform duration-700 ease-in-out"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                    >
                      {features.map((feature, index) => (
                        <div
                          key={index}
                          className="w-full flex-shrink-0 p-3 sm:p-6 lg:p-8 text-center"
                        >
                          <div className="mb-2 sm:mb-6 lg:mb-8 flex justify-center transform hover:scale-110 transition-transform duration-300">
                            {feature.icon}
                          </div>
                          <h3 className="text-sm sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-3 lg:mb-4">
                            {feature.title}
                          </h3>
                          <p className="text-blue-100 leading-relaxed text-xs sm:text-sm lg:text-lg">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex justify-center mt-3 sm:mt-6 lg:mt-8 space-x-2 sm:space-x-3">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                          currentSlide === index
                            ? "bg-white shadow-lg scale-125"
                            : "bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form*/}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-16 min-h-[60vh] lg:min-h-auto">
              <div className="w-full max-w-md">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0933a6] mb-2 sm:mb-3">
                    Welcome Back
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-lg">
                    Secure access to your society's command center
                  </p>
                </div>

                <form
                  className="space-y-4 sm:space-y-6"
                  onSubmit={handleSubmit}
                >
                  {/* Email Input */}
                  <div className="relative group">
                    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#0933a6] group-focus-within:text-[#51cedb] group-focus-within:scale-110 transition-all duration-300">
                      <HiOutlineMailOpen className="w-4 sm:w-5 h-4 sm:h-5" />
                    </div>
                    <input
                      className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 rounded-lg sm:rounded-xl placeholder:text-gray-400 shadow-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#51cedb] focus:border-[#51cedb] transition-all duration-300 bg-gray-50/50 hover:bg-white hover:shadow-xl transform hover:scale-[1.01] text-sm sm:text-base"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative group">
                    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#0933a6] group-focus-within:text-[#51cedb] group-focus-within:scale-110 transition-all duration-300">
                      <RiLockPasswordFill className="w-4 sm:w-5 h-4 sm:h-5" />
                    </div>
                    <input
                      className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border-2 rounded-lg sm:rounded-xl placeholder:text-gray-400 shadow-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#51cedb] focus:border-[#51cedb] transition-all duration-300 bg-gray-50/50 hover:bg-white hover:shadow-xl transform hover:scale-[1.01] text-sm sm:text-base"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-[#0933a6] hover:scale-110 transition-all duration-300"
                    >
                      {showPassword ? (
                        <HiEyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
                      ) : (
                        <HiEye className="w-4 sm:w-5 h-4 sm:h-5" />
                      )}
                    </button>
                  </div>

                  {/* Remember me & Forgot password */}
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <label className="flex items-center gap-1 sm:gap-2 text-gray-700 cursor-pointer hover:text-[#0933a6] transition-colors duration-300">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="w-3 sm:w-4 h-3 sm:h-4 text-[#0933a6] border-gray-300 rounded focus:ring-[#51cedb] focus:ring-2"
                      />
                      <span>Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-[#0933a6] hover:text-[#51cedb] font-medium hover:underline transition-colors duration-300"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm shadow-lg animate-bounce">
                      {error}
                    </div>
                  )}

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#0933a6] to-[#51cedb] text-white font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl hover:from-[#082a8b] hover:to-[#38c6d2] hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Logging in...
                      </div>
                    ) : (
                      "Sign In to Dashboard"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <footer className="absolute bottom-4 left-0 right-0 text-xs sm:text-sm text-gray-700 p-2">
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-2 sm:space-y-0">
          <p className="text-[#000f05]">
            © 2025 My Society Needs. All Rights Reserved.
          </p>
          <p className="text-[#000f05]">
            Designed & developed by{" "}
            <a
              href="https://www.webseeder.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#127ab4] hover:text-[#1860ca] hover:underline font-semibold transition-colors duration-300"
            >
              WebSeeder Technologies
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;