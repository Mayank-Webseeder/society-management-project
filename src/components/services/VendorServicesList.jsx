import React, { useEffect, useState } from "react";
import { TbPhoneCall } from "react-icons/tb";
import { LuCircleCheckBig } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { IoMailUnreadOutline, IoBackspaceOutline } from "react-icons/io5";
import { useVendorContext } from "../../context/VendorContext";
import { useParams, Link, useNavigate } from "react-router-dom";

const VendorServicesList = () => {
  const { serviceName } = useParams();
  const { vendors } = useVendorContext();
  const [serviceVendors, setServiceVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = vendors.filter((vendor) =>
      vendor.servicesProvided?.some(
        (service) => service.toLowerCase() === serviceName.toLowerCase()
      )
    );
    setServiceVendors(filtered);
  }, [vendors, serviceName]);

  return (
    <div
      className="bg-white rounded-lg shadow px-4 py-6 relative"
      style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}
    >
      <div className="flex items-center justify-between flex-wrap max-w-7xl mx-auto px-4 mb-6 gap-3 md:gap-0">
        <div className="shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[#4e9cad] text-sm sm:text-base font-medium hover:underline hover:text-[#006f86] hover:scale-105 transition"
          >
            <IoBackspaceOutline size={18} />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>

        <h2 className="flex-1 text-center text-base md:text-xl lg:text-2xl font-bold text-[#2E2E2E] leading-relaxed truncate px-2">
          Vendors Registered Under:{" "}
          <span className="text-[#00809D] capitalize font-semibold">
            {serviceName}
          </span>
        </h2>
        <div className="shrink-0 w-[60px] hidden md:block" />
      </div>

      {serviceVendors.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-24 italic">
          No vendors found for this service.
        </div>
      ) : (
        <>
          <div className="hidden md:block rounded-2xl overflow-x-auto shadow-md border border-gray-200">
            <table className="w-full bg-white text-md table-auto">
              <thead>
                <tr className="bg-[#F7F9FB] border-b border-gray-200">
                  {[
                    "Name",
                    "Location",
                    "Rating",
                    "Status",
                    "Contact",
                    "Actions",
                  ].map((heading, idx) => (
                    <th
                      key={idx}
                      className={`text-left py-3 ${
                        heading === "Contact" ? "px-16" : "px-5"
                      } font-semibold tracking-wide text-gray-700`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {serviceVendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="transition duration-300 ease-in-out cursor-pointer bg-white hover:bg-gray-100 hover:shadow-md"
                  >
                    <td className="py-4 px-5 font-medium text-[#2E2E2E]">
                      {vendor.name}
                    </td>
                    <td className="py-4 px-5 text-gray-600">
                      {vendor.location}
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#fcfdfe] text-[#2E2E2E] font-semibold text-sm rounded-md shadow-sm border border-gray-200">
                        <CiStar className="text-[#FFC107] text-base font-extralight" />
                        {vendor.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-shadow duration-300 ${
                          vendor.status === "Active"
                            ? "bg-green-100 text-green-700 shadow-inner"
                            : vendor.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 shadow-inner"
                            : "bg-red-100 text-red-700 shadow-inner"
                        }`}
                      >
                        <LuCircleCheckBig className="inline" size={12} />
                        {vendor.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex gap-3">
                        <a
                          href={`tel:${vendor.phone}`}
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#E9F7EF] text-[#1A7F64] font-medium rounded-md shadow-sm hover:bg-[#D4F1E6] transition-all duration-300 cursor-pointer"
                        >
                          <TbPhoneCall size={16} />
                          Call
                        </a>
                        <a
                          href={`mailto:${vendor.email}`}
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#EAF2FD] text-[#1C4E80] font-medium rounded-md shadow-sm hover:bg-[#D6E7FB] transition-all duration-300 cursor-pointer"
                        >
                          <IoMailUnreadOutline size={16} />
                          Email
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <Link
                        to={`/vendor-details/${vendor.id}`}
                        className="text-[#00809D] font-semibold hover:underline text-sm transition"
                      >
                        See Full Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-5">
            {serviceVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="rounded-xl border border-gray-200 p-4 shadow-sm bg-white"
              >
                {/* Name & Location */}
                <div className="mb-3">
                  <h3 className="text-base font-semibold text-[#2E2E2E]">
                    {vendor.name}
                  </h3>
                  <p className="text-sm text-gray-500">{vendor.location}</p>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-[#fcfdfe] border border-gray-200 rounded-md font-medium text-[#2E2E2E]">
                      <CiStar className="text-[#FFC107]" />
                      {vendor.rating.toFixed(1)}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-shadow duration-300 ${
                        vendor.status === "Active"
                          ? "bg-green-100 text-green-700 shadow-inner"
                          : vendor.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 shadow-inner"
                          : "bg-red-100 text-red-700 shadow-inner"
                      }`}
                    >
                      <LuCircleCheckBig className="inline" size={12} />
                      {vendor.status}
                    </span>
                  </div>

                  <Link
                    to={`/vendor-details/${vendor.id}`}
                    className="text-[#00809D] font-semibold hover:underline whitespace-nowrap text-xs sm:text-sm ml-auto"
                  >
                    See Full Details
                  </Link>
                </div>

                <div className="flex flex-wrap justify-end gap-3">
                  <a
                    href={`tel:${vendor.phone}`}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#E9F7EF] text-[#1A7F64] font-semibold rounded-md shadow-sm hover:bg-[#D4F1E6] transition duration-300"
                  >
                    <TbPhoneCall size={18} />
                    Call
                  </a>
                  <a
                    href={`mailto:${vendor.email}`}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#EAF2FD] text-[#1C4E80] font-semibold rounded-md shadow-sm hover:bg-[#D6E7FB] transition duration-300"
                  >
                    <IoMailUnreadOutline size={18} />
                    Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VendorServicesList;
