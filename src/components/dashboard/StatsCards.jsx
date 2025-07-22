import React from "react";
import {
  MdPeopleAlt,
  MdOutlineApartment,
  MdSubscriptions,
  MdPendingActions,
} from "react-icons/md";

const StatsCards = ({ statsData }) => {
  const icons = [
    MdOutlineApartment,
    MdPendingActions,
    MdPeopleAlt,
    MdSubscriptions,
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
      {statsData.map((stat, index) => {
        const Icon = icons[index % icons.length];

        return (
          <div
            key={index}
            className="relative rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 mt-8 bg-gradient-to-br"
            style={{
              background: `linear-gradient(145deg, ${stat.color}E6 0%, ${stat.color}CC 100%)`,
            }}
          >
            {/* Icon Badge */}
            <div
              className="absolute -top-6 sm:-top-10 rounded-full p-3 sm:p-4 shadow-md flex items-center justify-center transition-transform"
              style={{
                backgroundColor: stat.color,
                outline: `2px solid ${stat.color}cc`,
                outlineOffset: "4px",
              }}
            >
              <Icon
                size={24}
                className="sm:size-7 text-white"
                style={{
                  textShadow:
                    "0 0 8px rgba(96, 165, 250, 0.9), 0 0 15px rgba(96, 165, 250, 0.7)",
                }}
              />
            </div>

            <h3 className="mt-8 sm:mt-12 text-3xl lg:text-4xl font-extrabold text-gray-700 select-none">
              {stat.value}
            </h3>

            <p className="mt-2 text-center text-sm lg:text-base font-semibold text-gray-600 tracking-wide select-none">
              {stat.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
