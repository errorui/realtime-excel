"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import SpreadSheetNavbar from "./SpreadSheetNavbar";
import { HexColorPicker } from "react-colorful";
import socket from "./socket";
import * as XLSX from "xlsx";
import axios from 'axios';
const Spreadsheet = ({
  socket,roomId
}) => {
  const spreadhsheetid= 'cd068e2a-87e4-4729-873d-217eba2da69b';
  // -s
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4002/api/file/spreadsheet/${spreadhsheetid}`);
        
        // Assuming response.data is a 2D array of numbers
        const fetchedData = response.data.data;
        // Create a new array with 100 rows and 26 columns
        console.log(fetchedData);
        const paddedData = Array(100).fill().map((_, rowIndex) => 
          Array(26).fill().map((_, colIndex) => {
            const value = fetchedData[rowIndex]?.[colIndex] ?? '';
            return {
              value: value,
              bold: false, // Default value, can be customized later
              italic: false, // Default value, can be customized later
              underline: false, // Default value, can be customized later
            };
          })
        );

        // Update the cells state with the padded data
        setCells(paddedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only on mount
  const [cellColors, setCellColors] = useState(
    Array(100).fill().map(() =>
      Array(26).fill('')
    )
  );
  const [spreadsheetName, setSpreadsheetName]= useState('Untitled Spreadsheet');
  const [isEditingName, setIsEditingName] = useState(false);
   const isSocketUpdate = useRef(false);

  const handleTableUpdate = useCallback((data) => {
    
    isSocketUpdate.current = true;
    setCells(data.cells);
    setCellColors(data.cellColors);
  }, []);

  useEffect(() => {
    if (roomId) {
      socket.emit('join room', roomId);
      console.log("joined room");
    }

    socket.on("table-update", handleTableUpdate);

    return () => {
      socket.off("table-update", handleTableUpdate);
    };
  }, [roomId, handleTableUpdate]);

  useEffect(() => {
    if (!isSocketUpdate.current) {
      socket.emit('handletablechange', { cells, cellColors, roomId, columnSize });
    }
    isSocketUpdate.current = false;
  }, [cells, cellColors, roomId]);
  // -s
  const [columnSize, setColumnSize]= useState(26);

  // no-s
  const [selectedCells, setSelectedCells] = useState({
    start: null,
    end: null,
  });
 
  const [isSelecting, setIsSelecting] = useState(false);

  const [colorPickerVisible, setColorPickerVisible] = useState(false);


  const [currentColor, setCurrentColor] = useState("#ffffff");


  const inputRefs = useRef([]);
  const [showChart, setShowChart] = useState(false);
  // useEffect(() => {
  //   console.log("Selected cells:", selectedCells);
  // }, [selectedCells]);
  const toggleChart = () => {
    console.log('Toggle chart')
    setShowChart(!showChart);
  };
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
   let val=e.target.value;
    // socket.emit("handle-cell",{rowIndex, colIndex,val})
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
  const handleAddRow= ()=>{
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
  }
  const handleAddColumn= ()=>{
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
    } 
    else if (action === 'column') {
      const colIndex = parseInt(prompt("Enter the column number to delete (starting from 1):"), 10) - 1;
      if (colIndex >= 0 && colIndex < cells[0].length) {
        setCells((prev) => prev.map(row => row.filter((_, index) => index !== colIndex)));
        setCellColors((prev) => prev.map(row => row.filter((_, index) => index !== colIndex)));
        setColumnSize(columnSize-1);
      } else {
        alert("Invalid column number.");
      }
    } 
    else {
      alert("Invalid input. Please type 'row' or 'column'.");
    }
  };
  const handleDeleteRow= ()=>{
    const rowIndex = parseInt(prompt("Enter the row number to delete (starting from 1):"), 10) - 1;
      if (rowIndex >= 0 && rowIndex < cells.length) {
        setCells((prev) => prev.filter((_, index) => index !== rowIndex));
        setCellColors((prev) => prev.filter((_, index) => index !== rowIndex));
      } else {
        alert("Invalid row number.");
      } 
  }
  const handleDeleteColumn= ()=>{
    const colIndex = parseInt(prompt("Enter the column number to delete (starting from 1):"), 10) - 1;
    if (colIndex >= 0 && colIndex < cells[0].length) {
      setCells((prev) => prev.map(row => row.filter((_, index) => index !== colIndex)));
      setCellColors((prev) => prev.map(row => row.filter((_, index) => index !== colIndex)));
      setColumnSize(columnSize-1);
    } else {
      alert("Invalid column number.");
    }
  }
  const handleSave = async () => {
    try {
      // Transform cells to include only the 'value' property
      const transformedCells = cells.map(row => 
        row.map(cell => cell.value)
      );
      console.log(transformedCells);
      // Example data you want to send in the request body
      const dataToSend = {
        data: transformedCells,
        name: 'My Spreadsheet'
      };
  
      // // Send POST request
      const response = await axios.post(`http://localhost:4002/api/file/spreadsheet/${spreadhsheetid}`, dataToSend);
      // // Handle success
      console.log('Data saved successfully:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error saving data:', error);
    }
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
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const fileExtension = file.name.split(".").pop();
  
      // Clear all cells before processing the file
      const clearedCells = cells.map((row) =>
        row.map((cell) => ({
          ...cell,
          value: "", // Set the value to empty for all cells
        }))
      );
  
      // Update the state to cleared cells
      setCells(clearedCells);
  
      reader.onload = function (event) {
        if (fileExtension === "csv") {
          // Handle CSV file
          const text = event.target.result;
          const rows = text.split("\n"); // Split by newline to get rows
          const parsedData = rows.map((row) => row.split(",")); // Split each row by comma to get columns
  
          const updatedCells = clearedCells.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (parsedData[rowIndex] && parsedData[rowIndex][colIndex]) {
                const cleanData = parsedData[rowIndex][colIndex].replace(/"/g, '');
                return {
                  ...cell,
                  value: cleanData || "", // Update the value from CSV
                };
              }
              return cell;
            })
          );
  
          setCells(updatedCells);
        } else if (fileExtension === "xlsx") {
          // Handle XLSX file
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const parsedData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
  
          const updatedCells = clearedCells.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (parsedData[rowIndex] && parsedData[rowIndex][colIndex]) {
                return {
                  ...cell,
                  value: parsedData[rowIndex][colIndex] || "", // Update the value from XLSX
                };
              }
              return cell;
            })
          );
  
          setCells(updatedCells);
        } else {
          console.error("Unsupported file type. Please upload a CSV or XLSX file.");
        }
      };
  
      if (fileExtension === "csv") {
        reader.readAsText(file);
      } else if (fileExtension === "xlsx") {
        reader.readAsArrayBuffer(file);
      }
    }
  };
  
  const handleFileUpload= ()=>{
    document.getElementById("fileInput").click();
  }
  const handleNameClick = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setSpreadsheetName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setIsEditingName(false);
    }
  };
  const handleGoogleSheetsImport = async () => {
    try {
      const googleSheetsUrl = prompt("Please enter the Google Sheets API URL:");
  
      if (!googleSheetsUrl) {
        alert("No URL provided. Import cancelled.");
        return;
      }
  
      const response = await fetch(googleSheetsUrl);
      const text = await response.text();
      const rows = text.split("\n");
      const parsedData = rows.map((row) => row.split(","));
  
      const updatedCells = cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (parsedData[rowIndex] && parsedData[rowIndex][colIndex]) {
            return {
              ...cell,
              value: parsedData[rowIndex][colIndex],
              bold: false,
              italic: false,
              underline: false,
            };
          }
          return cell;
        })
      );
  
      setCells(updatedCells);
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
    }
  };
  
  return (
    <div className="overflow-x-auto spreadsheet" onMouseUp={handleMouseUp}>
      {isEditingName ? (
        <input
          type="text"
          value={spreadsheetName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          onKeyDown={handleNameKeyDown}
          autoFocus
          className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 focus:outline-none"
        />
      ) : (
        <h2
          className="text-2xl font-bold text-gray-800 mb-4 cursor-pointer"
          onClick={handleNameClick}
        >
          {spreadsheetName}
        </h2>
      )}
      <SpreadSheetNavbar
        onFilter={handleFilter}
        onSortAsc={handleSortAsc}
        onSortDesc={handleSortDesc}
        onAddColumn={handleAddColumn}
        onAddRow={handleAddRow}
        onDeleteColumn={handleDeleteColumn}
        onDeleteRow={handleDeleteRow}
        onBold={handleBold}
        onItalic={handleItalic}
        onUnderline={handleUnderline}
        onCellColor={handleCellColor}
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleFileUpload}
        onGoogleSheetsImport={handleGoogleSheetsImport}
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
                      value={cell.value==" "? "" : cell.value}
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
         <input
          type="file"
          id="fileInput"
          accept=".csv, .xlsx"
          style={{ display: "none" }}
          onChange={handleImport}
        />
      </div>
    </div>
  );
};

export default Spreadsheet;