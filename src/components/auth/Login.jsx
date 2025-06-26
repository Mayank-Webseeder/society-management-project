import React from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";

const Login = ({onClose}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 md:p-10 relative">
        <button onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Log In</h1>
        <p className="text-center text-gray-500 mb-6">Welcome back! Please enter your details.</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-gray-700 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition font-medium"
          >
            Log In
          </button>
        </form>

        <div className="text-center text-gray-700 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate(<SignIn/>)}
            className="text-blue-900 font-semibold hover:underline cursor-pointer"
          >
            Sign up here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
