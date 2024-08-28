"use client";
import React, { useState, useRef, useEffect } from "react";
import SpreadSheetNavbar from "./SpreadSheetNavbar";

const Spreadsheet = () => {
  const [cells, setCells] = useState(() =>
    Array(100)
      .fill()
      .map(() => Array(26).fill(""))
  );

  const [selectedCells, setSelectedCells] = useState({
    start: null,
    end: null,
  });
  const [isSelecting, setIsSelecting] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    console.log("Selected cells:", selectedCells);
  }, [selectedCells]);

  const handleKeyDown = (e, rowIndex, colIndex) => {
    const input = e.target;
    const { selectionStart, selectionEnd, value } = input;

    if (
      (e.key === "ArrowLeft" && selectionStart > 0) ||
      (e.key === "ArrowRight" && selectionEnd < value.length) ||
      (e.key === "ArrowUp" && selectionStart !== 0) ||
      (e.key === "ArrowDown" && selectionEnd !== 0) ||
      (selectionStart !== selectionEnd)
    ) {
      return;
    }

    let nextRow = rowIndex;
    let nextCol = colIndex;

    switch (e.key) {
      case "Enter":
        if (value.startsWith("=")) {
          try {
            const expression = value.slice(1);
            const result = eval(expression);
            const newCells = cells.map((row, rIndex) =>
              row.map((cell, cIndex) =>
                rIndex === rowIndex && cIndex === colIndex ? result : cell
              )
            );
            setCells(newCells);
          } catch (error) {
            console.error("Error evaluating expression:", error);
          }
        }
        nextRow = rowIndex + 1;
        break;
      case "ArrowUp":
        nextRow = rowIndex - 1;
        break;
      case "ArrowDown":
        nextRow = rowIndex + 1;
        break;
      case "ArrowLeft":
        nextCol = colIndex - 1;
        break;
      case "ArrowRight":
        nextCol = colIndex + 1;
        break;
      default:
        return;
    }

    if (
      nextRow >= 0 &&
      nextRow < cells.length &&
      nextCol >= 0 &&
      nextCol < cells[0].length
    ) {
      const nextCell =
        inputRefs.current[nextRow * cells[0].length + nextCol];
      if (nextCell) {
        nextCell.focus();
      }
    }

    setSelectedCells({ start: null, end: null });
    setIsSelecting(false);
  };

  const handleChange = (e, rowIndex, colIndex) => {
    const newCells = cells.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? e.target.value : cell
      )
    );
    setCells(newCells);
  };

  const handleMouseDown = (rowIndex, colIndex) => {
    setSelectedCells({ start: { rowIndex, colIndex }, end: { rowIndex, colIndex } });
    setIsSelecting(true);
  };

  const handleMouseOver = (rowIndex, colIndex) => {
    if (isSelecting) {
      setSelectedCells((prev) => ({
        ...prev,
        end: { rowIndex, colIndex },
      }));
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const isSelected = (rowIndex, colIndex) => {
    const { start, end } = selectedCells;
    if (!start || !end) return false;

    const [startRow, endRow] = [start.rowIndex, end.rowIndex].sort((a, b) => a - b);
    const [startCol, endCol] = [start.colIndex, end.colIndex].sort((a, b) => a - b);

    return rowIndex >= startRow && rowIndex <= endRow && colIndex >= startCol && colIndex <= endCol;
  };

  // New handlers for row and column header clicks
  const handleRowHeaderClick = (rowIndex) => {
    setSelectedCells({
      start: { rowIndex, colIndex: 0 },
      end: { rowIndex, colIndex: cells[0].length - 1 },
    });
  };

  const handleColumnHeaderClick = (colIndex) => {
    setSelectedCells({
      start: { rowIndex: 0, colIndex },
      end: { rowIndex: cells.length - 1, colIndex },
    });
  };

  // Handler functions for navbar actions
  const handleFilter = () => {
    // Add your filter logic here
    console.log("Filter clicked");
  };

  const handleSortAsc = () => {
    // Add your sort ascending logic here
    console.log("Sort Asc clicked");
  };

  const handleSortDesc = () => {
    // Add your sort descending logic here
    console.log("Sort Desc clicked");
  };

  const handleAddRowColumn = () => {
    // Add your add row/column logic here
    console.log("Add Row/Column clicked");
  };

  const handleDeleteRowColumn = () => {
    // Add your delete row/column logic here
    console.log("Delete Row/Column clicked");
  };

  const handleMergeCells = () => {
    // Add your merge cells logic here
    console.log("Merge Cells clicked");
  };

  const handleBold = () => {
    // Add your bold text logic here
    console.log("Bold clicked");
  };

  const handleItalic = () => {
    // Add your italic text logic here
    console.log("Italic clicked");
  };

  const handleUnderline = () => {
    // Add your underline text logic here
    console.log("Underline clicked");
  };

  const handleCellColor = () => {
    // Add your cell color logic here
    console.log("Cell Color clicked");
  };

  const handleSave = () => {
    // Add your save logic here
    console.log("Save clicked");
  };

  const handleExport = () => {
    // Add your export logic here
    console.log("Export clicked");
  };

  return (
    <div className="overflow-x-auto spreadsheet" onMouseUp={handleMouseUp}>
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
      <div className="min-w-max">
        <table className="border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-1 bg-gray-100 w-20 h-8"></th>
              {Array.from({ length: 26 }, (_, i) => (
                <th
                  key={i}
                  className="border border-gray-300 p-1 text-gray-700 bg-gray-100 w-20 h-8 cursor-pointer"
                  onClick={() => handleColumnHeaderClick(i)}
                >
                  {String.fromCharCode(65 + i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cells.map((row, rowIndex) => (
              <tr key={rowIndex} className="h-8">
                <th
                  className="border border-gray-300 p-1 text-gray-700 bg-gray-100 w-20 h-8 cursor-pointer"
                  onClick={() => handleRowHeaderClick(rowIndex)}
                >
                  {rowIndex + 1}
                </th>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border border-gray-300 p-1 w-20 h-8 ${
                      isSelected(rowIndex, colIndex) ? "bg-blue-200" : ""
                    }`}
                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                    onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleChange(e, rowIndex, colIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                      className="w-full h-full text-left bg-transparent focus:outline-none"
                      ref={(el) =>
                        (inputRefs.current[
                          rowIndex * cells[0].length + colIndex
                        ] = el)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;