"use client";
import { useState } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import NavBarHome from '../NavBarHome';

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
        <div className="min-h-screen bg-black text-white flex flex-col">
            <div className='flex w-full justify-center items-center pt-5'>
                <NavBarHome/>
            </div>
            {/* Main Content */}
            <div className="flex flex-1 p-8 space-x-8">
                {/* Chart Creation Panel */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-md w-1/3 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-center">Create a Chart</h2>

                        <div className="mb-4">
                            <label className="block mb-2">Select chart type:</label>
                            <select
                                value={chartType}
                                onChange={(e) => setChartType(e.target.value)}
                                className="w-full p-2 bg-black text-white border border-gray-600 rounded"
                            >
                                <option value="line">Line Chart</option>
                                <option value="bar">Bar Chart</option>
                                <option value="pie">Pie Chart</option>
                                <option value="doughnut">Doughnut Chart</option>
                            </select>
                        </div>

                        <div className="flex justify-end mb-4">
                            <button
                                onClick={handleAddRow}
                                className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Add Row
                            </button>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold mb-2">Co-ordinates</h3>
                        </div>

                        {tableData.map((row, index) => (
                            <div key={index} className="flex space-x-4 mb-2">
                                <input
                                    type="text"
                                    placeholder="X"
                                    value={row.x}
                                    onChange={(e) => handleChange(index, 'x', e.target.value)}
                                    className="w-1/2 p-2 bg-black text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Y"
                                    value={row.y}
                                    onChange={(e) => handleChange(index, 'y', e.target.value)}
                                    className="w-1/2 p-2 bg-black text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleGenerateChart}
                            className="w-1/2 p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                            Generate Chart
                        </button>

                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-md flex-1 flex flex-col justify-between">
                    <div
                        id="chart-container"
                        className="flex-1 flex justify-center items-center border border-white p-4"
                        style={{ maxHeight: '100%', maxWidth: '100%', overflow: 'hidden' }}
                    >
                        {chartData ? (
                            <div style={{ height: '100%', width: '100%' }}>
                                <ChartComponent />
                            </div>
                        ) : (
                            <div className="text-gray-500">Chart display</div>
                        )}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleExportPDF}
                            className="w-1/5 p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                            Export PDF
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
