import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DonutChart = () => {
  const data = [
    { name: "Completed", value: 50 },
    { name: "In Progress", value: 30 },
    { name: "Awaiting Response", value: 20 },
  ];

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B"];

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 35; // Slice ke bahar thoda door label
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={COLORS[index % COLORS.length]}
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {data[index].name}
      </text>
    );
  };

  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className='relative flex-1 flex items-center justify-center h-64'>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} Jobs`} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Total Text */}
      <div className="absolute text-center text-gray-800 font-semibold text-lg">
        {total} Jobs
      </div>
    </div>
  );
};

export default DonutChart;
