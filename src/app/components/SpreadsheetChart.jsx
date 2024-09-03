// SpreadsheetChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpreadsheetChart = ({ data }) => {
  // Prepare data for the chart
  const chartData = {
    labels: data.map((_, index) => `Row ${index + 1}`),
    datasets: [
      {
        label: "Values",
        data: data.map(row => row.reduce((sum, cell) => sum + (parseFloat(cell.value) || 0), 0)),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <Bar data={chartData} />
    </div>
  );
};

export default SpreadsheetChart;
