"use client";
import { useState } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, ArcElement);

export default function CreateChart() {
  const [tableData, setTableData] = useState([{ x: '', y: '' }]);
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState('line'); // Default chart type

  const handleChange = (index, key, value) => {
    const updatedData = [...tableData];
    updatedData[index][key] = value;
    setTableData(updatedData);
  };

  const handleAddRow = () => {
    setTableData([...tableData, { x: '', y: '' }]);
  };

  const handleGenerateChart = () => {
    const labels = tableData.map(item => item.x);
    const dataPoints = tableData.map(item => item.y);

    const data = {
      labels,
      datasets: [
        {
          label: 'User Data',
          data: dataPoints,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };

    setChartData(data);
  };

  const handleExportPDF = () => {
    const input = document.getElementById('chart-container');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('chart.pdf');
    });
  };

  const ChartComponent = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} />;
      case 'pie':
        return <Pie data={chartData} />;
      case 'doughnut':
        return <Doughnut data={chartData} />;
      default:
        return <Line data={chartData} />;
    }
  };

  return (
    <div className="min-h-screen p-4 bg-black">
      <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-white">Create Your Chart</h2>

        {/* Chart Type Selector */}
        <div className="mb-4">
          <label className="block text-white mb-2">Select Chart Type:</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
          >
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
            <option value="doughnut">Doughnut</option>
          </select>
        </div>

        {tableData.map((row, index) => (
          <div key={index} className="flex space-x-4 mb-2">
            <input
              type="text"
              placeholder="X Value"
              value={row.x}
              onChange={(e) => handleChange(index, 'x', e.target.value)}
              className="w-1/2 p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Y Value"
              value={row.y}
              onChange={(e) => handleChange(index, 'y', e.target.value)}
              className="w-1/2 p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
        <button
          onClick={handleAddRow}
          className="w-full p-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add Row
        </button>
        <button
          onClick={handleGenerateChart}
          className="w-full p-2 mb-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Generate Chart
        </button>

        {chartData && (
          <div className="mt-6 bg-gray-900 p-4 rounded-lg">
            <div id="chart-container">
              <ChartComponent />
            </div>
            <button
              onClick={handleExportPDF}
              className="w-full p-2 mt-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Export as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

