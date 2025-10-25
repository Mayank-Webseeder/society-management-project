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
      description: "Complete management solution for residential societies and communities",
    },
    {
      icon: <FaUsers className="w-16 h-16 text-white" />,
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
      title: "Resident Services",
      description: "Streamlined communication and service requests for all residents",
    },
    {
      icon: <FaShieldAlt className="w-16 h-16 text-white" />,
      image: "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg",
      title: "Secure Access",
      description: "Advanced security with role-based access control and data protection",
    },
    {
      icon: <FaCog className="w-16 h-16 text-white" />,
      image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
      title: "Admin Control",
      description: "Powerful dashboard for complete society oversight and management",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        if (data.subrole) {
          localStorage.setItem('subrole', data.subrole);
        }

        // Show success message
        console.log('Login successful!');
        
        // Redirect to dashboard or home
        window.location.href = '/';
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="grid lg:grid-cols-2">
            {/* Left Side - Enhanced Features Slider */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-12 flex flex-col justify-center min-h-[500px] overflow-hidden">
              {/* Animated background patterns */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>

              {/* Logo and Title */}
              <div className="text-center mb-12 relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20  backdrop-blur-sm rounded-2xl mb-3 transform hover:scale-110 transition-transform duration-300">
                  <img
                    src="/Logo.png"
                    alt="My Society Needs Logo"
                    className="w-16 h-16 sm:w-20 sm:h-20 mb-"
                  />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
                  My Society Needs
                </h1>
              </div>

              {/* Feature Carousel */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {features.map((feature, index) => (
                      <div key={index} className="w-full flex-shrink-0 px-4">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                          <div className="flex items-center mb-6">
                            <div className="bg-white/20 p-4 rounded-xl">
                              {feature.icon}
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-blue-100 text-lg leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel indicators */}
                <div className="flex justify-center gap-2 mt-8">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        currentSlide === index
                          ? "w-12 h-3 bg-white"
                          : "w-3 h-3 bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Login Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                    Welcome Back
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Sign in to access your dashboard
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Email Input */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <HiOutlineMailOpen className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <RiLockPasswordFill className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
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
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                    Protected by enterprise-grade security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            © 2025 My Society Needs. All Rights Reserved. | Designed & developed by{" "}
            <a
              href="https://www.webseeder.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              WebSeeder Technologies
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;