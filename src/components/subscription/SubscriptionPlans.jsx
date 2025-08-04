import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { CiTrash } from "react-icons/ci";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
  });

  useEffect(() => {
    setPlans([
      {
        _id: "plan1",
        name: "Basic Plan",
        price: 499,
        duration: "Monthly",
      },
    ]);
  }, []);

  const handleOpenModal = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedPlan = {
      ...editingPlan,
      name: formData.name,
      price: Number(formData.price),
      duration: formData.duration,
    };

    setPlans(plans.map((p) => (p._id === editingPlan._id ? updatedPlan : p)));
    setShowModal(false);
  };

  const handleOnDelete = (id) => {
    if (window.confirm("Do you want to remove this plan?")) {
      setPlans(plans.filter((plan) => plan._id !== id));
      alert("Plan removed");
    }
  };

  return (
   <div className="py-8 max-w-4xl mx-0 space-y-8 px-0">
  {/* Section Header */}
  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
    <h3 className="text-2xl font-semibold text-gray-800 tracking-wide">
      Subscription Plan
    </h3>
  </div>

  {/* Plan Card */}
  {plans.length === 0 ? (
    <div className="text-left text-gray-400 italic">No plan available.</div>
  ) : (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start p-6 gap-6">
        {/* Left: Plan Info */}
        <div className="flex flex-col space-y-1 md:space-y-2 text-gray-700 text-left">
          <h4 className="text-lg font-medium">{plans[0].name}</h4>
          <p className="text-sm text-gray-500">
            Duration: <span className="font-normal text-gray-600">{plans[0].duration}</span>
          </p>
        </div>

        {/* Right: Price + Actions */}
        <div className="flex flex-col md:items-end gap-3">
          <div className="text-2xl font-semibold text-gray-900">₹{plans[0].price}</div>
          <div className="flex gap-3">
            <button
              onClick={() => handleOpenModal(plans[0])}
              className="px-4 py-1.5 rounded-md border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleOnDelete(plans[0]._id)}
              className="px-4 py-1.5 rounded-md border border-red-500 text-red-600 hover:bg-red-50 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )}


      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-800">Edit Plan</h3>
            <input
              type="text"
              placeholder="Plan Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Duration (e.g., Monthly)"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
