import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const VendorAverageRating = ({ reviews, renderStars, formatTimeAgo }) => {
  const [sortOrder, setSortOrder] = useState("desc");
  const [showPoorOnly, setShowPoorOnly] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const vendorMap = {};
  reviews.forEach(({ vendorId, vendorName, rating }) => {
    if (!vendorMap[vendorId]) {
      vendorMap[vendorId] = { vendorName, ratings: [] };
    }
    vendorMap[vendorId].ratings.push(rating);
  });

  let vendorList = Object.entries(vendorMap).map(([vendorId, data]) => {
    const avg = data.ratings.reduce((a, b) => a + b, 0) / data.ratings.length;
    return {
      vendorId,
      vendorName: data.vendorName,
      avgRating: avg,
      totalReviews: data.ratings.length,
    };
  });

  // Optional filter for poor vendors
  if (showPoorOnly) {
    vendorList = vendorList.filter((v) => v.avgRating < 3);
  }

  // Sorting
  vendorList.sort((a, b) =>
    sortOrder === "asc" ? a.avgRating - b.avgRating : b.avgRating - a.avgRating
  );

  const getPerformance = (avg) => {
    if (avg >= 4.5) return { label: "Excellent", color: "text-green-600" };
    if (avg >= 3) return { label: "Good", color: "text-blue-500" };
    if (avg >= 2) return { label: "Average", color: "text-yellow-500" };
    return { label: "Poor", color: "text-red-500" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          Vendor Average Ratings
        </h2>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none pr-10 pl-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200"
            >
              <option value="desc">Sort: Highest First</option>
              <option value="asc">Sort: Lowest First</option>
            </select>
            {/* Down arrow icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              <MdOutlineKeyboardArrowDown />
            </div>
          </div>

          {/* Toggle Poor Only Button */}
          <button
            onClick={() => setShowPoorOnly((prev) => !prev)}
            className={`px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-200 shadow-sm
      ${
        showPoorOnly
          ? "bg-red-100 text-red-600 border-red-300 hover:bg-red-200"
          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
      }`}
          >
            {showPoorOnly ? "Showing Poor Only" : "Show Poor Only"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm border">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-md text-left">
              <th className="px-5 py-3 font-medium">Vendor</th>
              <th className="px-4 py-3 font-medium">Avg Rating</th>
              <th className="px-5 py-3 font-medium">Stars</th>
              <th className="px-14 py-3 font-medium">Progress</th>
              <th className="px-5 py-3 font-medium">Reviews</th>
              <th className="px-5 py-3 font-medium">Performance</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {vendorList.map((vendor) => {
              const perf = getPerformance(vendor.avgRating);
              const progressPercent = (vendor.avgRating / 5) * 100;

              return (
                <tr
                  key={vendor.vendorId}
                  className={`border-b transition ${
                    vendor.avgRating >= 4.5 ? "bg-green-50" : ""
                  }`}
                >
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {vendor.vendorName}
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    {vendor.avgRating.toFixed(1)}
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex space-x-1 text-yellow-400">
                      {renderStars(vendor.avgRating)}
                    </div>
                  </td>
                  <td className="px-5 py-4 min-w-[10rem]">
                    <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                      <div
                        className={`
                        h-full text-xs font-semibold text-white flex items-center justify-center transition-all duration-500
                   ${
                     progressPercent >= 90
                       ? "bg-[#A3DC9A]"
                       : progressPercent >= 70
                       ? "bg-[#5EABD6]"
                       : progressPercent >= 50
                       ? "bg-[#FFAD60] text-gray-900"
                       : "bg-[#EE4E4E]"
                   }
                 `}
                        style={{ width: `${progressPercent}%` }}
                      >
                        {vendor.avgRating.toFixed(1)}
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {vendor.totalReviews}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`font-medium ${perf.color}`}>
                      {perf.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelectedVendor(vendor)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Drawer Panel */}

      {selectedVendor && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-25"
            onClick={() => setSelectedVendor(null)}
          ></div>

          <div className="absolute right-0 top-0 h-full w-[400px] bg-white shadow-xl border-l border-gray-200 p-6 overflow-y-auto transition-transform duration-300 rounded-l-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">
                {selectedVendor.vendorName}
              </h3>
              <button
                onClick={() => setSelectedVendor(null)}
                className="text-gray-500 hover:text-[#BB8493] text-3xl"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-gray-700 font-medium">
                Average Rating:{" "}
                <span className="text-lg font-bold text-gray-800">
                  {selectedVendor.avgRating.toFixed(1)}
                </span>
              </div>

              <div className="flex space-x-1 text-yellow-400">
                {renderStars(selectedVendor.avgRating)}
              </div>

              <div className="text-sm text-gray-500">
                Total Reviews: {selectedVendor.totalReviews}
              </div>

              <hr className="my-4 border-gray-300" />

              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Reviews by This Vendor
              </h4>

              {reviews
                .filter((r) => r.vendorId === selectedVendor.vendorId)
                .map((review) => (
                  <div
                    key={review.id}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm space-y-2"
                  >
                    <div className="text-sm font-semibold text-gray-800">
                      {review.societyName}
                    </div>
                    <div className="text-sm text-gray-600 italic">
                      "{review.comment}"
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>⭐ {review.rating}</span>
                      <span>🕒 {formatTimeAgo(review.createdAt)}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorAverageRating;
