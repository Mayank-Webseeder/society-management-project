import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DonutChart = () => {
  const data = [
    { name: "Completed", value: 50 },
    { name: "Pending", value: 30 },
    { name: "Expired", value: 20 },
  ];

  const COLORS = ["#10B981", "#3B82F6", "#FF8F8F"];
  const total = data.reduce((acc, item) => acc + item.value, 0);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const name = data[index].name;
    const words = name.split(' ');

    return (
      <text
        x={x}
        y={y}
        fill="#1F2937"
        fontSize="12"
        fontWeight="600"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="middle"
         className="hidden sm:block"
      >
        {words.map((word, i) => (
          <tspan x={x} dy={i === 0 ? 0 : 12} key={i}>
            {word}
          </tspan>
        ))}
      </text>
    );
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow flex flex-col items-center w-full">
      {/* Chart */}
      <div className="relative w-full min-h-[240px] sm:min-h-[300px] md:min-h-[360px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
              isAnimationActive={true}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} Jobs`} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-lg sm:text-xl font-bold text-gray-800">{total}</span>
          <span className="text-[11px] sm:text-sm text-gray-500 font-medium">Total Jobs</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-5 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            <span>{item.name}: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
