import React from "react";
import GaugeChart from "react-gauge-chart";

const ResponseGauge = ({ avgResponseTime }) => {
  let gaugeValue;
  if (avgResponseTime <= 4) {
    gaugeValue = avgResponseTime / 4;
  } else if (avgResponseTime <= 8) {
    gaugeValue = 1 - ((8 - avgResponseTime) / 4) * 0.5;
  } else {
    gaugeValue = 1;
  }

  let badgeColor, badgeText;
  if (avgResponseTime <= 4) {
    badgeColor = "bg-green-500";
    badgeText = "Fast";
  } else if (avgResponseTime <= 8) {
    badgeColor = "bg-yellow-400";
    badgeText = "Average";
  } else {
    badgeColor = "bg-red-500";
    badgeText = "Slow";
  }

  return (
    <div>
      <h3 className="font-semibold text-gray-800 text-xl mb-8">Vendor Avg Response Time</h3>
      <GaugeChart
        id="vendor-response-gauge"
        nrOfLevels={3}
        colors={["#22c55e", "#eab308", "#ef4444"]}
        arcWidth={0.3}
        percent={gaugeValue}
        textColor="#374151"
        needleColor="#374151"
      />
      <p className={`text-white text-center py-1 px-3 rounded ${badgeColor} font-semibold`}>
        {avgResponseTime} hrs — {badgeText}
      </p>
    </div>
  );
};

export default ResponseGauge;
