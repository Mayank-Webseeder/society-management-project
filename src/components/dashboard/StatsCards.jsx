import React from "react";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from "react-icons/md";

const StatsCards = ({ statsData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <div
          key={index}
          style={{ backgroundColor: stat.color }}
          className="rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center gap-4">
            <p className="text-3xl font-semibold text-gray-800">{stat.value}</p>
          </div>
          <p className="mt-4 text-center text-gray-900 text-md font-medium tracking-wide">
            {stat.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
