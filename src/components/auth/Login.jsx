import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMailOpen } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Trying login with:", formData.email, formData.password);

    const res = await handleLogin(formData);

    if (res) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      setError("Invalid credentials");
      toast.error("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
  <div className="relative flex flex-col m-6 space-y-8 bg-white/40 shadow-2xl rounded-2xl md:flex-row md:space-y-0 w-full max-w-sm sm:max-w-md md:max-w-lg">
    <div className="flex flex-col justify-center items-center w-full px-6 py-10 sm:px-10 md:p-14">
      <h1 className="mb-2 font-bold text-3xl md:text-4xl text-center text-[#00809D]">
        Login
      </h1>
      <p className="text-sm sm:text-base text-gray-600 pb-5 text-center">
        Secure access to your society’s command center
      </p>

      <form
        className="flex flex-col gap-4 items-center w-full"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full max-w-sm">
          <div className="absolute top-3 left-1 px-2 flex items-center justify-center text-[#00809D]">
            <HiOutlineMailOpen />
          </div>
          <input
            className="w-full pl-10 pr-4 py-2 border rounded-xl placeholder:text-gray-500 shadow-md border-[#37AFE1] focus:outline-none focus:ring-2 focus:ring-[#4FC3DC] transition duration-200"
            type="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div className="relative w-full max-w-sm">
          <div className="absolute top-3 left-1 px-2 flex items-center justify-center text-[#00809D]">
            <RiLockPasswordFill />
          </div>
          <input
            className="w-full pl-10 pr-4 py-2 border rounded-xl placeholder:text-gray-500 shadow-md border-[#37AFE1] focus:outline-none focus:ring-2 focus:ring-[#4FC3DC] transition duration-200"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-between w-full max-w-sm">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" className="accent-[#00809D]" />
            Remember me
          </label>
          <p className="italic text-sm text-gray-700 hover:underline cursor-pointer">
            Forgot password?
          </p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full max-w-sm text-center rounded-lg font-semibold bg-[#00809D] text-white hover:scale-105 hover:bg-[#037892] py-2 hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center text-slate-800 text-sm sm:text-base pt-4">
          Not a member?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#00809D] font-semibold hover:underline cursor-pointer"
          >
            Sign up here
          </span>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default Login;
