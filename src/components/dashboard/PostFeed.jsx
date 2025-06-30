import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dailyData = [
  { day: "Mon", jobs: 5 },
  { day: "Tue", jobs: 8 },
  { day: "Wed", jobs: 4 },
  { day: "Thu", jobs: 10 },
  { day: "Fri", jobs: 6 },
  { day: "Sat", jobs: 7 },
  { day: "Sun", jobs: 3 },
];
const monthlyData = [
  { month: "Jan", jobs: 65 },
  { month: "Feb", jobs: 45 },
  { month: "Mar", jobs: 80 },
  { month: "Apr", jobs: 70 },
  { month: "May", jobs: 100 },
  { month: "Jun", jobs: 125 },
  { month: "Jul", jobs: 111 },
  { month: "Aug", jobs: 145 },
  { month: "Sep", jobs: 132 },
  { month: "Oct", jobs: 100 },
  { month: "Nov", jobs: 135 },
  { month: "Dec", jobs: 155 },
];

const yearlyData = [
  { year: "2021", jobs: 1200 },
  { year: "2022", jobs: 1500 },
  { year: "2023", jobs: 2200 },
  { year: "2024", jobs: 2000 },
  { year: "2025", jobs: 2500 },
];


const lineColor = "#7E6363";

const PostFeed = ({selected}) => {
        const getCharData =()=>{
        if(selected==="Daily") return dailyData;
        if(selected === "Monthly") return monthlyData;
        return yearlyData;
    };
    
  const getXAxisKey = () => {
    if (selected === "Daily") return "day";
    if (selected === "Monthly") return "month";
    return "year";
  };

  return (
    <div className="h-64 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={getCharData()}
          margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />

          <XAxis
            dataKey={getXAxisKey()}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#1A120B", fontSize: 14 }}
            padding={{ left: 35, right: 35 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#1A120B", fontSize: 14 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "10px",
            }}
            cursor={{ stroke: "#CBD5E1", strokeWidth: 1 }}
          />

          <Line
            type="monotone"
            dataKey="jobs"
            stroke={lineColor}
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={2500}
            animationEasing="ease-in-out"
            dot={{ r: 4, fill: lineColor, stroke: "#fff", strokeWidth: 2 }}
            activeDot={{
              r: 6,
              stroke: lineColor,
              strokeWidth: 2,
              fill: "#fff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PostFeed;
