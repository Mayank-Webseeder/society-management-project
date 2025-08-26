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
      name: "Subscription Plan",
      price: 999,
      duration: "yearly",
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
      <div className="py-16 flex items-center justify-center bg-gray-50 min-h-screen w-full">
        <div className="text-center p-10 bg-white rounded-2xl shadow-xl max-w-xl mx-auto transform transition-all duration-500 hover:scale-[1.02]">
          <div className="w-20 h-10 mx-auto mb-5 rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
            <Crown className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
            No Subscription Plan
          </h3>
          <p className="text-gray-500 mb-6">
            It looks like there isn't a plan set up yet. Please create one to get started.
          </p>
          <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
            Create Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 w-full min-h-fit bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="relative w-full max-w-5xl mx-auto px-4 group">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 animate-pulse-slow">
          <span className="inline-flex items-center px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform hover:scale-110 transition-transform duration-300">
            <Star className="w-3 h-3 mr-1.5 text-yellow-300 animate-spin-slow" />
            Current Plan
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transform transition-all duration-500 group-hover:scale-[1.01]">
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-2 animate-gradient-flow"></div>

          <div className="p-8 md:p-10 lg:flex lg:items-center lg:justify-between gap-10">
            {/* Left Side - Plan Details & Features */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Crown className="w-8 h-8 text-indigo-600 animate-crown-bounce" />
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-base mt-1">
                    Required for vendors to apply for jobs and access premium features.
                  </p>
                </div>
              </div>

              {/* Features Section */}
              <div className="p-5 bg-gray-50 rounded-xl shadow-inner border border-gray-100">
                <h4 className="text-lg font-bold text-gray-800 mb-3">What you get:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-1.5">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 animate-checkmark-pop" />
                    <span className="text-gray-700 font-medium text-sm">Access to all exclusive job listings</span>
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-1.5">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 animate-checkmark-pop animation-delay-100" />
                    <span className="text-gray-700 font-medium text-sm">Unlimited, high-priority job applications</span>
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-1.5">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 animate-checkmark-pop animation-delay-200" />
                    <span className="text-gray-700 font-medium text-sm">Enhanced vendor profile visibility</span>
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-1.5">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 animate-checkmark-pop animation-delay-300" />
                    <span className="text-gray-700 font-medium text-sm">24/7 dedicated support team</span>
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-1.5">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 animate-checkmark-pop animation-delay-400" />
                    <span className="text-gray-700 font-medium text-sm">Access to premium analytics and reports</span>
                  </li>
                  <li className="flex items-center transition-transform duration-300 hover:translate-x-1.5">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 animate-checkmark-pop animation-delay-500" />
                    <span className="text-gray-700 font-medium text-sm">Opportunity to bid on large-scale projects</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Price & Actions */}
            <div className="w-full lg:w-auto mt-8 lg:mt-0">
              <div className="text-center lg:text-right mb-6">
                <div className="flex items-baseline justify-center lg:justify-end gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 animate-price-pulse">
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-500 text-xl font-medium">/service</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Billed {plan.duration}</p>
              </div>

              {/* <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3">
                <button
                  onClick={handleOpenModal}
                  className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Plan
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center justify-center w-full sm:w-auto px-8 py-3 border-2 border-red-200 text-red-600 font-semibold rounded-full hover:bg-red-50 hover:border-red-300 transition-all duration-300 transform hover:scale-105"
                >
                  <X className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 opacity-100">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform scale-100 transition-transform duration-300">
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors shadow-sm text-sm"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors shadow-sm text-sm"
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors shadow-sm text-sm"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 text-gray-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors shadow-md"
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