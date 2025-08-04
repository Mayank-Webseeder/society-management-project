import React, { useEffect, useState } from "react";
import { Pencil, Check, X, Star, Crown } from "lucide-react";

const SubscriptionPlans = () => {
  const [plan, setPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
  });

  useEffect(() => {
    setPlan({
      _id: "plan1",
      name: "Premium Plan",
      price: 999,
      duration: "Monthly",
    });
  }, []);

  const handleOpenModal = () => {
    if (plan) {
      setFormData({
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
      });
      setShowModal(true);
    }
  };

  const handleSave = () => {
    const updatedPlan = {
      ...plan,
      name: formData.name,
      price: Number(formData.price),
      duration: formData.duration,
    };

    setPlan(updatedPlan);
    setShowModal(false);
  };

  const handleDelete = () => {
    if (
      window.confirm("Are you sure you want to delete this subscription plan?")
    ) {
      setPlan(null);
      alert("Subscription plan deleted successfully");
    }
  };

  if (!plan) {
    return (
      <div className="py-8 max-w-4xl mx-auto px-4">
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <Crown className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No Subscription Plan
          </h3>
          <p className="text-gray-500 mb-6">
            Create a subscription plan to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 w-full mx-auto space-y-8">
      <div className="relative w-full max-w-xl">
        <div className="absolute -top-3 left-4 z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
            <Star className="w-3 h-3 mr-1.5" />
            Current Plan
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-2"></div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Side - Plan Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="text-gray-500 text-sm">Subscription Plan</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-sm font-medium text-gray-600">
                      Plan Duration
                    </p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {plan.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Price & Actions */}
              <div className="w-full lg:w-auto">
                <div className="mb-6 text-center lg:text-right">
                  <div className="flex items-baseline justify-center lg:justify-end gap-1">
                    <span className="text-xl sm:text-4xl font-bold text-gray-900">
                      ₹{plan.price}
                    </span>
                    <span className="text-gray-500">
                      /{plan.duration.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Per user</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-end gap-3 mt-0 xl:mt-20">
                  <button
                    onClick={handleOpenModal}
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Plan
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-2 px-6 py-2 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors font-medium"
                  >
                    <X className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white">
                Edit Subscription Plan
              </h3>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Name
                </label>
                <input
                  type="text"
                  placeholder="Enter plan name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
