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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const Icon = icons[index % icons.length];

        return (
          <div
            key={index}
            className="relative rounded-3xl p-5 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 mt-3"
            style={{
              background: `linear-gradient(145deg, ${stat.color}E6 0%, ${stat.color}CC 100%)`,
            }}
          >
            <div
              className="absolute -top-8 rounded-full p-4 shadow-md flex items-center justify-center"
              style={{
                backgroundColor: stat.color,
                outline: `2px solid ${stat.color}cc`,
                outlineOffset: "4px",
              }}
            >
              <Icon
                size={28}
                className="text-white"
                style={{
                  textShadow:
                    "0 0 8px rgba(96, 165, 250, 0.9), 0 0 15px rgba(96, 165, 250, 0.7)",
                }}
              />
            </div>
            <h3 className="mt-10 text-4xl font-extrabold text-gray-700 select-none">
              {stat.value}
            </h3>
            <p className="mt-2 text-center text-md font-semibold text-gray-600 tracking-wide select-none">
              {stat.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
