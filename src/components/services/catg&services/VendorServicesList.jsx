import React, { useEffect, useState } from "react";
import { TbPhoneCall } from "react-icons/tb";
import { LuCircleCheckBig } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { IoMailUnreadOutline, IoBackspaceOutline } from "react-icons/io5";
import { useVendorContext } from "../../../context/VendorContext";
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
      className="p-6 bg-[#F8F9FA] min-h-screen font-sans antialiased"
      style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}
    >
      <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/services-categories")}
          className="absolute top-5 right-10 flex items-center gap-2 text-[#4e9cad] font-semibold hover:underline text-md hover:text-[#006f86] hover:scale-105 transition"
        >
          <IoBackspaceOutline size={28} />
        </button>

        {/* Heading */}
        <h2 className="px-5 text-2xl font-bold text-[#2E2E2E] mb-6 leading-relaxed">
          Vendors Registered Under:{" "}
          <span className="text-[#00809D] capitalize font-semibold">
            {serviceName}
          </span>
        </h2>

        {/* No Vendors */}
        {serviceVendors.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-24 italic">
            No vendors found for this service.
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
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
                {serviceVendors.map((vendor, idx) => (
                  <tr
                    key={vendor.id}
                    className={`transition duration-300 ease-in-out cursor-pointer bg-white hover:bg-gray-100 hover:shadow-md`}
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
        )}
      </div>
    </div>
  );
};

export default VendorServicesList;
