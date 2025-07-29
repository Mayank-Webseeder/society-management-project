import React, { useEffect, useState } from "react";
import { Pencil, PlusCircle } from "lucide-react";
import { CiTrash } from "react-icons/ci";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    features: "",
  });

  useEffect(() => {
    setPlans([
      {
        _id: "plan1",
        name: "Basic Plan",
        price: 499,
        duration: "Monthly",
        features: ["Upto 5 Job Posts", "Basic Support", "Dashboard Access"],
      },
    ]);
  }, []);

  const handleOpenModal = (plan = null) => {
    setEditingPlan(plan);
    if (plan) {
      setFormData({
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
        features: plan.features.join(", "),
      });
    } else {
      setFormData({ name: "", price: "", duration: "", features: "" });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    const newPlan = {
      _id: editingPlan ? editingPlan._id : `plan_${Date.now()}`,
      name: formData.name,
      price: Number(formData.price),
      duration: formData.duration,
      features: formData.features.split(",").map((ft) => ft.trim()),
    };

    if (editingPlan) {
      setPlans(plans.map((p) => (p._id === editingPlan._id ? newPlan : p)));
    } else {
      setPlans([...plans, newPlan]);
    }
    setShowModal(false);
  };

  const handleOnDelete = (id) => {
    if (window.confirm("Do you want to remove this plan?")) {
      setPlans(plans.filter((plan) => plan._id !== id));
      alert("Plan removed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800 px-8">
          Available Plans
        </h3>
        <button
          onClick={() => handleOpenModal(null)}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-sm font-medium transition"
        >
          <PlusCircle className="w-4 h-4" /> Add New Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="text-center text-gray-500">
          No plans available. Please add a plan.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="p-6 h-72 flex flex-col justify-between bg-gradient-to-br from-white to-gray-50 rounded-e-3xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border border-gray-200 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold text-gray-800">{plan.name}</h4>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenModal(plan)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Pencil className="w-5 h-4" />
                  </button>
                  <button
                    onClick={() => handleOnDelete(plan._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <CiTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-gray-700 mb-1">
                  ₹{plan.price}
                </div>
                <div className="text-gray-500 text-sm">{plan.duration}</div>
              </div>

              <ul className="mt-2 space-y-1 text-gray-600 text-sm list-disc list-inside">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-800">
              {editingPlan ? "Edit Plan" : "Add New Plan"}
            </h3>
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
            <textarea
              placeholder="Features (comma separated)"
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
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
