import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="px-10 py-6 flex items-center justify-between bg-white border-b border-gray-200 shadow-sm">
        <h2 className="font-serif text-2xl text-gray-800 tracking-wide">
          Society Management Hub
        </h2>
        <div className="flex items-center space-x-4">
          {/* Notification */}
          <div>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition">
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
          </div>

          {/* Profile */}
          <div>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
              </svg>
            </button>
          </div>

          {/* Logout*/}
          <div>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                navigate("/login");
              }}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-full shadow-sm transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
