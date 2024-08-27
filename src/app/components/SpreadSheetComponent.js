"use client";
import React, { useState, useRef, useCallback, memo } from "react";
import Spreadsheet from "react-spreadsheet";
import SpreadSheetNavbar from "./SpreadSheetNavbar";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './styles.css'; // Import your CSS file

const Cell = memo(({ cell, rowIndex, colIndex }) => {
  console.log(`Rendering Cell: Row ${rowIndex}, Column ${colIndex}`);

  return (
    <div className="cell" key={`${rowIndex}-${colIndex}`}>
      {cell.value}
    </div>
  );
});

const SpreadsheetComponent = () => {
  const [data, setData] = useState(Array.from({ length: 100 }, () =>
    Array.from({ length: 26 }, () => ({ value: "" }))
  ));
  const [columnSizes, setColumnSizes] = useState(Array.from({ length: 26 }, () => 100)); // Initial sizes for columns
  const spreadsheetRef = useRef(null);

  const handleFilter = () => {
    // Implement filter functionality
  };

  const handleSortAsc = () => {
    // Implement sorting ascending functionality
  };

  const handleSortDesc = () => {
    // Implement sorting descending functionality
  };

  const handleAddRowColumn = () => {
    // Implement adding rows/columns functionality
  };

  const handleDeleteRowColumn = () => {
    // Implement deleting rows/columns functionality
  };

  const handleMergeCells = () => {
    // Implement merge cells functionality
  };

  const handleBold = () => {
    // Implement bold text formatting functionality
  };

  const handleItalic = () => {
    // Implement italic text formatting functionality
  };

  const handleUnderline = () => {
    // Implement underline text formatting functionality
  };

  const handleCellColor = () => {
    // Implement cell color picker functionality
  };

  const handleSave = () => {
    // Implement save functionality
    console.log(data);
  };

  const handleExport = () => {
    // Implement export functionality
  };

  const handleColumnResize = useCallback((index, newSize) => {
    setColumnSizes(prevSizes => {
      const newSizes = [...prevSizes];
      newSizes[index] = newSize;
      return newSizes;
    });
  }, []);

  const renderCell = useCallback((cell, rowIndex, colIndex) => {
    return <Cell key={`${rowIndex}-${colIndex}`} cell={cell} rowIndex={rowIndex} colIndex={colIndex} />;
  }, []);

  return (
    <div className="w-full">
      <SpreadSheetNavbar
        onFilter={handleFilter}
        onSortAsc={handleSortAsc}
        onSortDesc={handleSortDesc}
        onAddRowColumn={handleAddRowColumn}
        onDeleteRowColumn={handleDeleteRowColumn}
        onMergeCells={handleMergeCells}
        onBold={handleBold}
        onItalic={handleItalic}
        onUnderline={handleUnderline}
        onCellColor={handleCellColor}
        onSave={handleSave}
        onExport={handleExport}
      />
      <div className="w-full overflow-x-auto">
        <div className="relative" ref={spreadsheetRef}>
          <div className="flex">
            {columnSizes.map((size, index) => (
              <div key={index} className="relative">
                <ResizableBox
                  width={size}
                  height={0}
                  axis="x"
                  minConstraints={[30, 0]}
                  maxConstraints={[300, 0]}
                  resizeHandles={['e']}
                  onResizeStop={(e, data) => handleColumnResize(index, data.size.width)}
                  className="resize-handle"
                >
                  <div className="h-full bg-gray-200"></div>
                </ResizableBox>
              </div>
            ))}
          </div>
          <Spreadsheet
            data={data.map((row, rowIndex) =>
              row.map((cell, colIndex) => ({
                ...cell,
                render: () => renderCell(cell, rowIndex, colIndex)
              }))
            )}
            onChange={setData}
          />
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetComponent;
