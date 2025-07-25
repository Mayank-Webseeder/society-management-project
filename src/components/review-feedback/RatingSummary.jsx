import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaFilter } from "react-icons/fa";
import ReviewModel from "./ReviewModel";
import VendorAverageRating from "./VendorAverageRating";

const RatingSummary = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [filteredRating, setFilteredRating] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState("review");

  const [reviews, setReviews] = useState([
    {
      id: "rev001",
      vendorId: "v001",
      vendorName: "Raj Electrician",
      societyId: "s001",
      societyName: "Skyline Residency",
      rating: 5,
      comment: "Very professional and quick service.",
      createdAt: "2025-07-08T10:12:00Z",
      adminReply: "",
    },
    {
      id: "rev002",
      vendorId: "v002",
      vendorName: "Maya Plumber",
      societyId: "s002",
      societyName: "Green Meadows",
      rating: 3,
      comment: "Work was okay, could improve punctuality.",
      createdAt: "2025-07-07T14:45:00Z",
      adminReply: "",
    },
    {
      id: "rev003",
      vendorId: "v003",
      vendorName: "CleanMaster Services",
      societyId: "s003",
      societyName: "Lakeview Apartments",
      rating: 4,
      comment: "Good service, staff was friendly.",
      createdAt: "2025-07-06T09:18:00Z",
      adminReply: "",
    },
    {
      id: "rev004",
      vendorId: "v004",
      vendorName: "Sunlight Pest Control",
      societyId: "s001",
      societyName: "Skyline Residency",
      rating: 2,
      comment: "Didn't fully resolve the issue.",
      createdAt: "2025-07-05T17:23:00Z",
      adminReply: "",
    },
    {
      id: "rev005",
      vendorId: "v002",
      vendorName: "Maya Plumber",
      societyId: "s004",
      societyName: "Palm Springs Villas",
      rating: 4,
      comment: "Neat work and well-behaved.",
      createdAt: "2025-07-05T11:05:00Z",
      adminReply: "",
    },
    {
      id: "rev006",
      vendorId: "v005",
      vendorName: "Ravi Electric Co.",
      societyId: "s005",
      societyName: "Ocean Park",
      rating: 1,
      comment: "Rude behavior, poor service quality.",
      createdAt: "2025-07-04T16:40:00Z",
      adminReply: "",
    },
  ]);

  const handleAdminReply = (reviewId, replyText) => {
    setReviews((prev) =>
      prev.map((rev) =>
        rev.id === reviewId
          ? {
              ...rev,
              adminReply: replyText,
            }
          : rev
      )
    );
  };

  const totalReviews = reviews.length;
  const avgRating =
    totalReviews === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

  const ratingCounts = [1, 2, 3, 4, 5].map(
    (star) => reviews.filter((r) => r.rating === star).length
  );

  const ratingPercentages = ratingCounts.map((count) =>
    totalReviews === 0 ? 0 : (count / totalReviews) * 100
  );

  const renderStars = (value) => {
    const stars = [];
    let ratingLeft = value;
    for (let i = 1; i <= 5; i++) {
      if (ratingLeft >= 1) {
        stars.push(<FaStar key={i} className="text-yellow-400 w-5 h-5" />);
        ratingLeft -= 1;
      } else if (ratingLeft >= 0.75) {
        stars.push(<FaStar key={i} className="text-yellow-400 w-5 h-5" />);
        ratingLeft = 0;
      } else if (ratingLeft >= 0.25) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-400 w-5 h-5" />
        );
        ratingLeft = 0;
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 w-5 h-5" />);
      }
    }
    return stars;
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];
    for (let interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };

  const filteredReviews = filteredRating
    ? reviews.filter((r) => r.rating === filteredRating)
    : reviews;

  return (
<div className="p-6 bg-white rounded-xl shadow-md mx-auto">
  <div className="w-full flex justify-center mb-10">
    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg">
      <div className="relative flex w-full bg-gray-200 rounded-full p-1 shadow-inner overflow-hidden">
        <button
          onClick={() => setActiveTab("review")}
          className={`w-1/2 text-center px-3 py-2 text-sm sm:text-base font-semibold transition-all duration-300 z-10 relative ${
            activeTab === "review"
              ? "text-white"
              : "text-gray-700 hover:text-[#5F85DB]"
          }`}
        >
          Reviews
        </button>

        <button
          onClick={() => setActiveTab("average")}
          className={`w-1/2 text-center px-3 py-2 text-sm sm:text-base font-semibold transition-all duration-300 z-10 relative ${
            activeTab === "average"
              ? "text-white"
              : "text-gray-700 hover:text-[#5F85DB]"
          }`}
        >
          Avg Ratings
        </button>

        <span
          className={`absolute top-0 left-0 h-full w-1/2 bg-[#00A8CC] rounded-full transition-all duration-300 ${
            activeTab === "average" ? "translate-x-full" : ""
          }`}
        />
      </div>
    </div>
  </div>

      {activeTab === "review" && (
        <>
          {/* Rating Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="px-3 text-xl font-semibold mb-4 text-gray-700">
                Rating Distribution
              </h3>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center mb-3 gap-2">
                  <span className="text-sm w-6 font-medium text-gray-600">
                    {star}★
                  </span>
                  <div className="flex-1 h-3 bg-gray-200 rounded overflow-hidden">
                    <div
                      className="h-3 bg-yellow-400 rounded transition-all duration-500"
                      style={{ width: `${ratingPercentages[star - 1]}%` }}
                    ></div>
                  </div>
                  <span className="text-sm w-12 text-right text-gray-600">
                    {ratingPercentages[star - 1].toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center border-l border-r border-gray-200 px-6">
              <h3 className="text-2xl font-sans text-gray-700 mb-5">Total Reviews</h3>
              <p className="text-4xl font-bold text-gray-800">{totalReviews}</p>
            </div>

            <div className="flex flex-col items-center justify-center px-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Average Rating
              </h3>
              <p className="text-5xl font-bold text-gray-900">
                {avgRating.toFixed(1)}
              </p>
              <div className="flex mt-1 space-x-1">{renderStars(avgRating)}</div>
            </div>
          </div>

          <div className="mt-10">
            <div className="px-4 flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Vendor Service Reviews
              </h2>
              <div className="relative">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  <FaFilter className="text-gray-500" />
                  All Ratings
                </button>
                {showFilter && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <ul>
                      <li
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setFilteredRating(null);
                          setShowFilter(false);
                        }}
                      >
                        All Ratings
                      </li>
                      {[5, 4, 3, 2, 1].map((star) => (
                        <li
                          key={star}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setFilteredRating(star);
                            setShowFilter(false);
                          }}
                        >
                          {star} Stars
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition rounded-xl p-5 flex flex-col justify-between"
                >
                  <div className="text-center">
                    <h3 className="text-base font-semibold text-gray-900">
                      {review.vendorName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {review.societyName}
                    </p>
                    <div className="flex justify-center space-x-1 text-yellow-400 mb-4">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm text-gray-700 italic mb-3 line-clamp-3">
                      "{review.comment}"
                    </p>
                  </div>
                  <hr className="border-gray-200 mb-6" />
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span>🕒 {formatTimeAgo(review.createdAt)}</span>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium transition"
                    >
                      More Details →
                    </button>
                  </div>

                  {review.adminReply && (
                    <div className="mt-4 bg-gray-100 border border-gray-200 rounded-xl p-4 text-sm shadow-sm">
                      <h4 className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                        💬 Admin Reply :
                      </h4>
                      <p className="px-5 text-gray-800 leading-relaxed tracking-wide font-medium">
                        {review.adminReply}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedReview && (
              <ReviewModel
                review={selectedReview}
                setReviews={setReviews}
                onClose={() => setSelectedReview(null)}
                onReply={handleAdminReply}
                renderStars={renderStars}
                formatTimeAgo={formatTimeAgo}
              />
            )}
          </div>
        </>
      )}

      {activeTab === "average" && <VendorAverageRating reviews={reviews} renderStars={renderStars} formatTimeAgo={formatTimeAgo} />}
    </div>
  );
};

export default RatingSummary;
