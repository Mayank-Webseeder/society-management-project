import React from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({onLoginSuccess}) => {
  const navigate = useNavigate();

  const handleSubmit =(evt)=>{
    evt.preventDefault();
    onLoginSuccess();
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="relative bg-white shadow-xl rounded-xl p-8 sm:p-10 w-full max-w-sm space-y-6 border border-gray-200">
        
        {/* <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          onClick={onClose}
        >
          ✕
        </button> */}

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-500 text-sm">Fill in your details to sign up</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Contact No.</label>
            <input
              type="tel"
              placeholder="ex:- 000 0000 000"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Flat No.</label>
            <input
              type="text"
              placeholder="E.g. 102B"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="*******"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-md font-medium transition"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate('/')}
            className="text-gray-800 font-semibold hover:underline cursor-pointer"
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
