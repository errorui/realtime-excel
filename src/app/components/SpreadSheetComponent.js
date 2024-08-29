"use client";
import React, { useState, useRef, useEffect } from "react";
import SpreadSheetNavbar from "./SpreadSheetNavbar";
import { HexColorPicker } from "react-colorful";
const Spreadsheet = () => {
  const [cells, setCells] = useState(() =>
    Array(100)
      .fill()
      .map(() =>
        Array(26).fill({
          value: "",
          bold: false,
          italic: false,
          underline: false,
        })
      )
  );
  const [columnSize, setColumnSize]= useState(26);

  const [selectedCells, setSelectedCells] = useState({
    start: null,
    end: null,
  });
  const [cellColors, setCellColors] = useState(
    Array(100).fill().map(() =>
      Array(26).fill('')
    )
  );
  const [isSelecting, setIsSelecting] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const inputRefs = useRef([]);

  // useEffect(() => {
  //   console.log("Selected cells:", selectedCells);
  // }, [selectedCells]);

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
                rIndex === rowIndex && cIndex === colIndex
                  ? { ...cell, value: result }
                  : cell
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
        rIndex === rowIndex && cIndex === colIndex
          ? { ...cell, value: e.target.value }
          : cell
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
  const applyFormattingToSelectedCells = (updateFn, updateColor) => {
    const newCells = cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (
          rowIndex >= selectedCells.start.rowIndex &&
          rowIndex <= selectedCells.end.rowIndex &&
          colIndex >= selectedCells.start.colIndex &&
          colIndex <= selectedCells.end.colIndex
        ) {
          const updatedCell = updateFn(cell);
          if (updateColor) {
            setCellColors((prev) =>
              prev.map((row, rIndex) =>
                row.map((color, cIndex) =>
                  rIndex === rowIndex && cIndex === colIndex
                    ? updateColor
                    : color
                )
              )
            );
          }
          return updatedCell;
        }
        return cell;
      })
    );
    setCells(newCells);
  };

  const handleBold = () => {
    applyFormattingToSelectedCells((cell) => ({
      ...cell,
      bold: !cell.bold,
    }));
  };

  const handleItalic = () => {
    applyFormattingToSelectedCells((cell) => ({
      ...cell,
      italic: !cell.italic,
    }));
  };

  const handleUnderline = () => {
    applyFormattingToSelectedCells((cell) => ({
      ...cell,
      underline: !cell.underline,
    }));
  };
  const handleCellColor = () => {
    setColorPickerVisible(!colorPickerVisible);
  };

  useEffect(() => {
    if (colorPickerVisible) {
      applyFormattingToSelectedCells((cell) => cell, currentColor);
    }
  }, [currentColor]);
  const toggleColorPicker = () => {
    setColorPickerVisible(!colorPickerVisible);
  };



  // const handleFilter = () => {
  //   console.log("Filter clicked");
  // };



  const handleFilter = () => {
    // Prompt the user for filter parameters
    const colIndex = parseInt(prompt("Enter the column number to filter (starting from 1):"), 10) - 1;
    const operator = prompt("Enter the operator for filtering (>, >=, <, <=, = ):").trim();
    const value = prompt("Enter the value to filter by:").trim();
  
    // Validate input
    if (isNaN(colIndex) || colIndex < 0 || colIndex >= cells[0].length) {
      alert("Invalid column number.");
      return;
    }
  
    const validOperators = [">", "<", "=", ">=", "<="];
    if (!validOperators.includes(operator)) {
      alert("Invalid operator. Please enter one of: >, <, =, >=, <=");
      return;
    }
  
    // Convert the value to a number if possible (useful for numeric comparisons)
    const filterValue = isNaN(value) ? value : parseFloat(value);
  
    // Apply the filter and highlight cells
    const newCellColors = cellColors.map(row =>
      row.map(() => "")
    );
  
    const newCells = cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (colIndex === colIndex) { // Apply filter only to the selected column
          let meetsCondition = false;
  
          switch (operator) {
            case ">":
              meetsCondition = (isNaN(cell.value) ? false : parseFloat(cell.value) > filterValue);
              break;
            case "<":
              meetsCondition = (isNaN(cell.value) ? false : parseFloat(cell.value) < filterValue);
              break;
            case "=":
              meetsCondition = (cell.value === filterValue);
              break;
            case ">=":
              meetsCondition = (isNaN(cell.value) ? false : parseFloat(cell.value) >= filterValue);
              break;
            case "<=":
              meetsCondition = (isNaN(cell.value) ? false : parseFloat(cell.value) <= filterValue);
              break;
            default:
              meetsCondition = false;
              break;
          }
  
          if (meetsCondition) {
            newCellColors[rowIndex][colIndex] = "#ffeb3b"; // Highlight color (yellow)
          }
        }
        return cell;
      })
    );
  
    setCellColors(newCellColors);
  };
  
  const handleSortAsc = () => {
    if (selectedCells.start && selectedCells.end) {
      // Determine the column to sort by (using the starting cell's column index)
      const sortColIndex = selectedCells.start.colIndex;
      // Extract rows and sort them based on the values in the selected column
      // console.log(cells);
      const sortedCells = [...cells].sort((rowA, rowB) => {
        const valA = rowA[sortColIndex].value || ""; // Handle empty cells
        const valB = rowB[sortColIndex].value || "";

        if (!isNaN(valA) && !isNaN(valB)) {
          return parseFloat(valA) - parseFloat(valB); // Numeric comparison
        }
        return valA.localeCompare(valB);
      });

      // Update the cells state with the sorted rows
      setCells(sortedCells);
    } else {
      alert("Please select a column to sort by.");
    }
  };


  const handleSortDesc = () => {
    if (selectedCells.start && selectedCells.end) {
      // Determine the column to sort by (using the starting cell's column index)
      const sortColIndex = selectedCells.start.colIndex;

      // Extract rows and sort them based on the values in the selected column
      const sortedCells = [...cells].sort((rowA, rowB) => {
        const valA = rowA[sortColIndex].value || ""; // Handle empty cells
        const valB = rowB[sortColIndex].value || "";

        if (!isNaN(valA) && !isNaN(valB)) {
          return parseFloat(valB) - parseFloat(valA); // Numeric comparison, reversed for descending
        }

        return valB.localeCompare(valA); // String comparison, reversed for descending
      });

      // Update the cells state with the sorted rows
      // console.log(sortedCells);
      setCells(sortedCells);
    } else {
      alert("Please select a column to sort by.");
    }
  };

  const handleAddRowColumn = () => {
    const action = prompt("Add Row or Column? Type 'row' or 'column':").toLowerCase();
    if (action === 'row') {
      setCells((prev) => [
        ...prev,
        Array(prev[0].length).fill({
          value: "",
          bold: false,
          italic: false,
          underline: false,
        })
      ]);
      setCellColors((prev) => [
        ...prev,
        Array(prev[0].length).fill('')
      ]);
    } else if (action === 'column') {
      setCells((prev) => prev.map(row => [
        ...row,
        {
          value: "",
          bold: false,
          italic: false,
          underline: false,
        }
      ]));
      setCellColors((prev) => prev.map(row => [
        ...row,
        ''
      ]));
      setColumnSize(columnSize+1);
    } 
    else {
      alert("Invalid input. Please type 'row' or 'column'.");
    }
  };
  const handleDeleteRowColumn = () => {
    const action = prompt("Delete Row or Column? Type 'row' or 'column':").toLowerCase();
    if (action === 'row') {
      const rowIndex = parseInt(prompt("Enter the row number to delete (starting from 1):"), 10) - 1;
      if (rowIndex >= 0 && rowIndex < cells.length) {
        setCells((prev) => prev.filter((_, index) => index !== rowIndex));
        setCellColors((prev) => prev.filter((_, index) => index !== rowIndex));
      } else {
        alert("Invalid row number.");
      }
    } else if (action === 'column') {
      const colIndex = parseInt(prompt("Enter the column number to delete (starting from 1):"), 10) - 1;
      if (colIndex >= 0 && colIndex < cells[0].length) {
        setCells((prev) => prev.map(row => row.filter((_, index) => index !== colIndex)));
        setCellColors((prev) => prev.map(row => row.filter((_, index) => index !== colIndex)));
      } else {
        alert("Invalid column number.");
      }
    } else {
      alert("Invalid input. Please type 'row' or 'column'.");
    }
  };


  const handleSave = () => {
    console.log(cells);
    console.log("Save clicked");
  };
  const handleExport = () => {
    const rows = cells.map(row =>
      row.map(cell => `"${cell.value.replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = rows.join('\n');

    // Create a blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "spreadsheet_data.csv");

    // Append to the document and trigger click to download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };



  const handleRowHeaderClick = (rowIndex) => {
    setSelectedCells({
      start: { rowIndex, colIndex: 0 },
      end: { rowIndex, colIndex: cells[0].length - 1 },
    });
  };

  const handleColumnHeaderClick = (colIndex) => {
    console.log(colIndex);
    setSelectedCells({
      start: { rowIndex: 0, colIndex },
      end: { rowIndex: cells.length - 1, colIndex },
    });
  };


  return (
    <div className="overflow-x-auto spreadsheet" onMouseUp={handleMouseUp}>
      <SpreadSheetNavbar
        onFilter={handleFilter}
        onSortAsc={handleSortAsc}
        onSortDesc={handleSortDesc}
        onAddRowColumn={handleAddRowColumn}
        onDeleteRowColumn={handleDeleteRowColumn}
        onBold={handleBold}
        onItalic={handleItalic}
        onUnderline={handleUnderline}
        onCellColor={handleCellColor}
        onSave={handleSave}
        onExport={handleExport}
      />
      <div className="min-w-max">
        <table className="border-collapse border border-gray-300" id='myTable'>
          <thead>
            <tr>
              <th className="border border-gray-300 p-1 bg-gray-100 w-20 h-8"></th>
              {Array.from({ length: columnSize }, (_, i) => (
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
                    className={`border border-gray-300 p-1 w-20 h-8 z-1000 ${isSelected(rowIndex, colIndex) ? "bg-blue-200" : ""
                      }`}
                    style={{ backgroundColor: cellColors[rowIndex][colIndex] }}
                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                    onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
                  >
                    <input
                      type="text"
                      value={cell.value}
                      onChange={(e) => handleChange(e, rowIndex, colIndex)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                      className={`w-full h-full text-left bg-transparent focus:outline-none ${cell.bold ? "font-bold" : ""
                        } ${cell.italic ? "italic" : ""
                        } ${cell.underline ? "underline" : ""
                        }`}
                      ref={(el) =>
                        (inputRefs.current[rowIndex * cells[0].length + colIndex] = el)
                      }
                    />
                </td>

                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {colorPickerVisible && (
          <div className="absolute top-0 right-0 p-4">
            <HexColorPicker
              color={currentColor}
              onChange={setCurrentColor}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Spreadsheet;