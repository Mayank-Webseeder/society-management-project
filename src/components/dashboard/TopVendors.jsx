import React from "react";
import { useVendorContext } from "../../context/VendorContext";
import { useJobContext } from "../../context/JobContext";
import { Briefcase, Star } from "lucide-react";

const TopVendors = () => {
  const { vendors } = useVendorContext();
  const { totalJobs } = useJobContext();

  const topVendors = [...vendors]
    .sort((a, b) => (b.totalJobsApplied || 0) - (a.totalJobsApplied || 0))
    .slice(0, 3);

  return (
    <div className="w-full bg-white rounded-2xl shadow p-4 sm:p-6 md:p-8 flex flex-col gap-6">
      <div className="space-y-3">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Total Jobs Posted
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#e0f2f1] to-[#b2dfdb] shadow-inner">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#26a69a] rounded-full flex items-center justify-center text-white shadow-md shrink-0">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Total Jobs</p>
              <p className="text-xs text-gray-500">Till Date</p>
            </div>
          </div>
          <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500 select-none tabular-nums">
            {totalJobs || 0}
          </span>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300" />

      {/* Top Vendors */}
      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Top Performing Vendors
        </h2>
        {topVendors.length === 0 ? (
          <p className="text-gray-500 text-sm">No vendors found.</p>
        ) : (
          topVendors.map((vendor, index) => (
            <div
              key={vendor.id || vendor._id || index}
              className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition duration-300"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-teal-500 text-white font-semibold text-sm sm:text-base shrink-0">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {vendor.name || "Unnamed Vendor"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {vendor.location?.formattedAddress || "No address available"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end text-sm">
                <p className="font-semibold text-gray-800">
                  {(vendor.totalJobsApplied || 0) + " Jobs"}
                </p>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span className="font-medium text-xs sm:text-sm text-gray-800">
                    {Number(vendor.averageRating || 0).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopVendors;
