import React, { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

const ReviewModel = ({
  review,
  setReviews,
  onClose,
  renderStars,
  formatTimeAgo,
}) => {
  if (!review) return null;

  const deleteReview = (id) => {
    const confirmDelete = window.confirm("Permanently delete this review?");
    if (confirmDelete) {
      setReviews((prev) => prev.filter((rev) => rev.id !== id));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-400 hover:text-gray-500 hover:scale-105 text-2xl"
        >
          <IoClose />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Review Details
        </h2>

        <div className="space-y-3 text-sm text-gray-700 text-center">
          <p>
            <span className="font-semibold">Vendor Name:</span>{" "}
            {review.vendorName}
          </p>
          <p>
            <span className="font-semibold">Society Name:</span>{" "}
            {review.societyName}
          </p>

          <div className="flex justify-center items-center gap-2">
            <span className="font-semibold">Rating:</span>
            <div className="flex">{renderStars(review.rating)}</div>
          </div>

          <div className="space-y-1">
            <div className="bg-gray-50 border border-gray-200 p-3 rounded-md">
              <p className="text-sm text-gray-700 font-[500] leading-relaxed tracking-wide text-left">
                “{review.comment}”
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-left px-4">
            🕒 {formatTimeAgo(review.createdAt)}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 space-y-4 text-center">
          <button
            onClick={() => deleteReview(review.id)}
            className="text-red-600 border border-red-500 px-4 py-1.5 rounded-md text-sm hover:bg-red-50 transition flex items-center justify-center mx-auto gap-2"
          >
            <RiDeleteBin2Line className="w-4 h-4" />
            Delete this review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModel;
