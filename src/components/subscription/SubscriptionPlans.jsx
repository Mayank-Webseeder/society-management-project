import React, { useEffect, useState } from "react";
import { Pencil, X, Crown, Check, Trash2 } from "lucide-react";

// Edit Modal Component - Separated for better readability and modularity
const EditPlanModal = ({ plan, onSave, onClose }) => {
  // Local state for the form data, initialized with the plan's current values
  const [formData, setFormData] = useState({
    name: plan.name,
    price: plan.price.toString(),
    description: plan.description,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async () => {
    // Basic validation
    if (!formData.name.trim() || !formData.price || !formData.description.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Prepare the updated plan object
    const updatedPlan = {
      ...plan,
      name: formData.name.trim(),
      price: Number(formData.price),
      description: formData.description.trim(),
    };

    onSave(updatedPlan);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Edit Subscription Plan</h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
              <span>{errorMessage}</span>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="e.g., Subscription Plan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) <span className="text-red-500">*</span></label>
              <input
                type="number"
                placeholder="999"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              />
            </div>
            {/* The Duration field is now a static text for a single yearly plan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <p className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-lg">Yearly</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
            <textarea
              placeholder="Brief description of the plan"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};


const DeleteConfirmModal = ({ onConfirm, onCancel, loading }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
        <div className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Trash2 className="w-12 h-12 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Deletion</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to delete this subscription plan? This action cannot be undone.</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-5 py-2 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const SubscriptionPlans = () => {
  const [plan, setPlan] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Use a simulated data fetch on component mount
  useEffect(() => {
    // Simulate API call to fetch initial data
    const fetchPlan = () => {
      setPlan({
        _id: "plan1",
        name: "Subscription Plan",
        price: 9999,
        duration: "yearly",
        description: "Perfect for growing businesses",
        isPopular: false
      });
    };
    fetchPlan();
  }, []);

  // Function to show a temporary notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdatePlan = (updatedPlan) => {
    setLoading(true);
    setPlan(updatedPlan);
    setShowEditModal(false);
    setLoading(false);
    showNotification("Plan updated successfully!");
  };

  const handleDeletePlan = async () => {
    setLoading(true);
    setShowDeleteModal(false);
    await new Promise(resolve => setTimeout(resolve, 500));
    setPlan(null);
    setLoading(false);
    showNotification("Plan deleted successfully!");
  };

  // If there's no plan, show the "Create Plan" view
  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 font-sans">
        <div className="text-center p-8 sm:p-12 bg-white rounded-3xl shadow-xl max-w-lg">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">No Subscription Plan</h3>
          <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            It looks like there isn't a plan set up yet. Please create one to get started.
          </p>
          <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Create Plan
          </button>
        </div>
      </div>
    );
  }

  // Main plan card UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4 font-sans">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-medium transition-all duration-300 ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            {notification.message}
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Plan</h1>
          <p className="text-lg text-gray-600">Manage your pricing and features</p>
        </div>

        {/* Plan Card */}
        <div className="relative">
          <div className={`bg-white rounded-2xl shadow-xl border-2 ${plan.isPopular ? 'border-indigo-200' : 'border-gray-100'} overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1.5"></div>

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center shadow-lg">
                  <Crown className="w-7 h-7 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h2>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-500 text-lg">/{plan.duration}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Billed {plan.duration}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowEditModal(true)}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Plan
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center px-5 py-2.5 border-2 border-red-200 text-red-600 font-semibold rounded-lg hover:bg-red-50 hover:border-red-300 transition-all duration-200 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render modals based on state */}
      {showEditModal && <EditPlanModal plan={plan} onSave={handleUpdatePlan} onClose={() => setShowEditModal(false)} />}
      {showDeleteModal && <DeleteConfirmModal onConfirm={handleDeletePlan} onCancel={() => setShowDeleteModal(false)} loading={loading} />}
    </div>
  );
};

export default SubscriptionPlans;
