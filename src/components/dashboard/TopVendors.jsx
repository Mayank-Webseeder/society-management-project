import React from "react";
import { useVendorContext } from "../../context/VendorContext";
import { useJobContext } from "../../context/JobContext";
import { Briefcase } from "lucide-react";
import { Star } from "lucide-react";

const TopVendors = () => {
  const { vendors } = useVendorContext();
  const { totalJobs } = useJobContext();

  const topVendors = [...vendors]
    .sort((a, b) => b.totalJobsApplied - a.totalJobsApplied)
    .slice(0, 3);

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl p-6 space-y-6">
      {/* Total Jobs */}
      <div className="px-2 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Total Jobs Posted</h2>
        <div className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-[#e0f2f1] to-[#b2dfdb] shadow-inner">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#26a69a] rounded-full flex items-center justify-center text-white shadow-md">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Total Jobs</p>
              <p className="text-xs text-gray-500">Till Date</p>
            </div>
          </div>
          <span
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500 select-none"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {totalJobs}
          </span>
        </div>
      </div>
      <hr className="border-t border-gray-300" />

      {/* Top Vendors */}
      <div className="space-y-4">
        <h2 className="px-2 text-lg font-semibold text-gray-900">
          Top Performing Vendors
        </h2>
        {topVendors.length === 0 ? (
          <p className="text-gray-500">No vendors found.</p>
        ) : (
          topVendors.map((vendor, index) => (
            <div
              key={vendor.id}
              className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              style={{ minHeight: "56px" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-teal-500 text-white font-semibold text-base shadow-sm select-none">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {vendor.name}
                  </p>
                  <p className="text-xs text-gray-500">{vendor.location}</p>
                </div>
              </div>
              <div className="text-right text-sm select-none">
                <p className="font-semibold text-gray-800 leading-tight">
                  {vendor.totalJobsApplied} Jobs
                </p>
                <div className="flex items-center justify-end gap-1 text-yellow-400 text-xs font-medium">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{vendor.rating.toFixed(1)}</span>
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
