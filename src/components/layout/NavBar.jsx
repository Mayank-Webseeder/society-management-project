import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { RiLogoutCircleLine } from "react-icons/ri";
import "react-confirm-alert/src/react-confirm-alert.css";
import { removeToken } from "../../utils/Token";

const NavBar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const getTitlePath = (path) => {
    if (
      path.startsWith("/societies") ||
      path.startsWith("/society-details") ||
      path.startsWith("/edit-society")
    ) {
      return "Society Directory";
    }

    if (
      path.startsWith("/vendors") ||
      path.startsWith("/vendor-details") ||
      path.startsWith("/vendor-edit")
    ) {
      return "Vendor Control Panel";
    }

    if (path.startsWith("/jobs") || path.startsWith("/job-details")) {
      return "Job Postings";
    }

    if (
      path.startsWith("/services-categories") ||
      path.startsWith("/vendors-by-service")
    ) {
      return "Available Services & Associated Vendors";
    }

    const map = {
      "/": "Dashboard Overview",
      "/subscriptions": "Subscription Plans",
      "/ratings": "Vendor Ratings & Feedback",
      "/admin-settings": "Admin Controls",
      "/reports": "Reports Dashboard",
    };

    return map[path] || "Admin Dashboard";
  };

  const pageTitle = getTitlePath(location.pathname);

  // Logout with confirmation dialog
  const handleLogout = () => {
    confirmAlert({
      title: "Exit Dashboard",
      message: "Do you want to sign out of your admin account?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            removeToken();
            navigate("/admin/login");
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    if (isNotificationOpen || isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen, isProfileOpen]);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-5 lg:py-6 flex items-center justify-between">
        <h2 className="font-serif text-xl sm:text-2xl text-gray-800 tracking-wide">
          {pageTitle}
        </h2>

        <div className="flex items-center space-x-2 sm:space-x-3 relative">
          {/* Notification Button with Relative Wrapper */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen((prev) => !prev)}
              className="group flex items-center gap-2 rounded-full px-3 py-2 hover:bg-gray-100 transition-all focus:outline-none ring-1 ring-transparent hover:ring-indigo-200"
              aria-label="Toggle notifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <path d="M4.214 3.227a.75.75 0 0 0-1.156-.955 8.97 8.97 0 0 0-1.856 3.825.75.75 0 0 0 1.466.316 7.47 7.47 0 0 1 1.546-3.186ZM16.942 2.272a.75.75 0 0 0-1.157.955 7.47 7.47 0 0 1 1.547 3.186.75.75 0 0 0 1.466-.316 8.971 8.971 0 0 0-1.856-3.825Z" />
                <path
                  fillRule="evenodd"
                  d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6Zm0 14.5a2 2 0 0 1-1.95-1.557 33.54 33.54 0 0 0 3.9 0A2 2 0 0 1 10 16.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden lg:inline text-sm">Notifications</span>
            </button>

            {/* Dropdown */}
            {isNotificationOpen && (
              <div
                ref={notificationRef}
                className="absolute right-0 mt-2 w-64 rounded-xl shadow-xl bg-white ring-1 ring-gray-200 z-50"
              >
                <div className="px-4 py-3 border-b">
                  <h4 className="font-semibold text-sm text-gray-800">
                    Notifications
                  </h4>
                </div>
                <div className="px-4 py-6 text-center text-sm text-gray-500">
                  <a
                    href="#"
                    className="text-xs text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="group flex items-center gap-2 rounded-full px-3 py-2 hover:bg-gray-100 transition-all focus:outline-none ring-1 ring-transparent hover:ring-indigo-200"
              aria-label="Toggle profile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
              </svg>
              <span className="hidden lg:inline text-sm font-medium text-gray-700">
                Profile
              </span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl shadow-2xl bg-white ring-1 ring-gray-200 z-50 animate-fade-in">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-gray-600 text-sm text-center">
                    Manage your profile
                  </p>
                </div>

                <div className="flex flex-col p-3 space-y-3 items-center">
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="group flex items-center gap-2 rounded-full px-3 py-2 hover:bg-gray-100 transition-all focus:outline-none ring-1 ring-transparent hover:ring-indigo-200"
                  >
                    Your Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/admin-settings");
                      setIsProfileOpen(false);
                    }}
                    className="group flex items-center rounded-full px-3 py-2 hover:bg-gray-100 transition-all focus:outline-none ring-1 ring-transparent hover:ring-indigo-200"
                  >
                    Settings
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="group flex items-center px-3 py-2 gap-2 rounded-full hover:bg-gray-100 transition-all ring-1 ring-transparent hover:ring-red-300 focus:outline-none"
            title="Logout"
            aria-label="Logout"
          >
            <RiLogoutCircleLine className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition duration-200" />
            <span className="hidden lg:inline text-sm font-medium text-gray-700 group-hover:text-red-600">
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
