import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleSubmit =(evt)=>{
    evt.preventDefault();
    onLoginSuccess();
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="relative bg-white shadow-xl rounded-xl p-8 sm:p-10 w-full max-w-sm space-y-6 border border-gray-200">
        
        {/* <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          ✕
        </button> */}

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Please enter your details to login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="*******"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-gray-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md font-medium transition"
          >
            Log In
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate('/signup')}
            className="text-gray-800 font-semibold hover:underline cursor-pointer"
          >
            Sign up here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
