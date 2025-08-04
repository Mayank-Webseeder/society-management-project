import React, { useState } from "react";
import { ClipboardList, Users, BarChart2, Star } from "lucide-react";
import SubscriptionPlans from "./SubscriptionPlans";
import VendorSubscriptions from "./VendorSubscriptions";
import RevenueBreakdown from "./RevenueBreakdown";

const Subscription = () => {
  const [activeCard, setActiveCard] = useState("plans");

  const cards = [
    {
      key: "plans",
      label: "Subscription Plans",
      quote: "Flexible plans to suit every vendor.",
      icon: <ClipboardList className="w-8 h-8 text-blue-500 mb-3" />,
      bg: "from-blue-100 to-blue-50",
      border: "border border-blue-300",
    },
    {
      key: "vendor",
      label: "Vendor Subscriptions",
      quote: "Monitor active subscriptions with ease.",
      icon: <Users className="w-8 h-8 text-green-500 mb-3" />,
      bg: "from-green-100 to-green-50",
      border: "border border-green-300",
    },
    {
      key: "revenue",
      label: "Revenue Breakdown",
      quote: "Visualize your revenue growth smartly.",
      icon: <BarChart2 className="w-8 h-8 text-purple-500 mb-3" />,
      bg: "from-purple-100 to-purple-50",
      border: "border border-purple-300",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Card Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.key}
            onClick={() => setActiveCard(card.key)}
            className={`p-6 h-40 flex flex-col justify-center items-center text-center rounded-lg cursor-pointer transition transform
            bg-gradient-to-br ${
              activeCard === card.key
                ? `${card.bg} ${card.border} shadow-xl`
                : `from-white to-gray-50 border border-gray-200 shadow hover:shadow-lg hover:border ${
                    card.key === "plans"
                      ? "hover:border-blue-300"
                      : card.key === "vendor"
                      ? "hover:border-green-300"
                      : "hover:border-purple-300"
                  }`
            }`}
          >
            {card.icon}
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {card.label}
            </h2>
            <div className="w-12 h-1 bg-blue-200 mb-2 rounded-full" />
            <p className="text-sm text-gray-500 max-w-[200px]">{card.quote}</p>
          </div>
        ))}
      </div>

      {/* Section Details */}
      <div className="mt-4">
        {activeCard === "plans" && <SubscriptionPlans />}
        {activeCard === "vendor" && <VendorSubscriptions />}
        {activeCard === "revenue" && <RevenueBreakdown />}
      </div>
    </div>
  );
};

export default Subscription;
