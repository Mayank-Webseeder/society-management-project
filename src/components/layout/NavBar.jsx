import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificatioOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="px-10 py-6 flex items-center justify-between bg-white border-b border-gray-200 shadow-sm">
        <h2 className="font-serif text-2xl text-gray-800 tracking-wide">
          Society Management Hub
        </h2>
        <div className="flex items-center space-x-4">
          {/* Notification */}
          <div>
            <button
              onClick={() => setIsNotificatioOpen(!isNotificationOpen)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M4.214 3.227a.75.75 0 0 0-1.156-.955 8.97 8.97 0 0 0-1.856 3.825.75.75 0 0 0 1.466.316 7.47 7.47 0 0 1 1.546-3.186ZM16.942 2.272a.75.75 0 0 0-1.157.955 7.47 7.47 0 0 1 1.547 3.186.75.75 0 0 0 1.466-.316 8.971 8.971 0 0 0-1.856-3.825Z" />
                <path
                  fillRule="evenodd"
                  d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6Zm0 14.5a2 2 0 0 1-1.95-1.557 33.54 33.54 0 0 0 3.9 0A2 2 0 0 1 10 16.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isNotificationOpen && (
              <div className="origin-top-right absolute transform -translate-x-1/3 right-0 mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-2 px-3 border-b border-gray-200">
                  <h4 className="font-semibold mb-2 text-gray-700">
                    Notifications
                  </h4>
                  {/* yhe bataye gaye notifications aayenge */}
                </div>
                <div className="py-1 px-3 text-center border-t border-gray-200">
                  <a
                    href="#"
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
  {/* Profile Avatar Button */}
  <button
    onClick={() => setIsProfileOpen(!isProfileOpen)}
    className="p-2 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 shadow-md transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
    </svg>
  </button>

  {/* Dropdown Menu */}
  {isProfileOpen && (
    <div className="absolute right-0 mt-3 w-56 rounded-xl shadow-2xl bg-white ring-1 ring-gray-200 z-50 animate-fade-in">
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-gray-600 text-sm text-center">Manage your profile</p>
      </div>

 <div className="flex flex-col p-3 space-y-3 items-center">

        <button
          onClick={() => {
            setIsProfileOpen(false);
            // Navigate to profile
          }}
          className="px-5 py-2 rounded-2xl text-sm text-black bg-[#e2e0e1] shadow-md hover:scale-105 transition duration-200 font-semibold"
        >
          Your Profile
        </button>

        <button
          onClick={() => {
            navigate("/admin-settings");
            setIsProfileOpen(false);
          }}
          className="px-5 py-2 rounded-2xl text-sm text-black bg-[#e2e0e1] shadow-md hover:scale-105 transition duration-200 font-semibold"
        >
          Settings
        </button>

        <button
          onClick={() => {
            setIsLoggedIn(false);
            navigate("/login");
          }}
          className="px-5 py-2 rounded-2xl text-sm text-black bg-[#e2e0e1] shadow-md hover:scale-105 transition duration-200 font-semibold"
        >
          Logout
        </button>

      </div>
    </div>
  )}
</div>

        </div>
      </div>
    </header>
  );
};

export default NavBar;
