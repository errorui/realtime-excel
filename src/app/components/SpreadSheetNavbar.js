import React from "react";
import {
  AiOutlineFilter,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineMergeCells,
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineSave,
  AiOutlineDownload,
} from "react-icons/ai";
import { MdColorLens } from "react-icons/md";

const SpreadSheetNavbar = ({
  onFilter,
  onSortAsc,
  onSortDesc,
  onAddRowColumn,
  onDeleteRowColumn,
  onMergeCells,
  onBold,
  onItalic,
  onUnderline,
  onCellColor,
  onSave,
  onExport
}) => {
  return (
    <div className="bg-gray-200 p-2 flex items-center space-x-3 shadow-md">
      {/* Filter Button */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onFilter}
      >
        <AiOutlineFilter className="text-base" />
        <span className="hidden md:inline">Filter</span>
      </button>
      
      {/* Sorting Buttons */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onSortAsc}
      >
        <AiOutlineSortAscending className="text-base" />
        <span className="hidden md:inline">Sort Asc</span>
      </button>
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onSortDesc}
      >
        <AiOutlineSortDescending className="text-base" />
        <span className="hidden md:inline">Sort Desc</span>
      </button>
      
      {/* Add/Delete Rows/Columns */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onAddRowColumn}
      >
        <AiOutlinePlus className="text-base" />
        <span className="hidden md:inline">Add Row/Column</span>
      </button>
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onDeleteRowColumn}
      >
        <AiOutlineMinus className="text-base" />
        <span className="hidden md:inline">Delete Row/Column</span>
      </button>
      {/* Text Formatting */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onBold}
      >
        <AiOutlineBold className="text-base" />
        <span className="hidden md:inline">Bold</span>
      </button>
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onItalic}
      >
        <AiOutlineItalic className="text-base" />
        <span className="hidden md:inline">Italic</span>
      </button>
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onUnderline}
      >
        <AiOutlineUnderline className="text-base" />
        <span className="hidden md:inline">Underline</span>
      </button>
      
      {/* Cell Color Picker */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onCellColor}
      >
        <MdColorLens className="text-base" />
        <span className="hidden md:inline">Cell Color</span>
      </button>
      
      {/* Save/Export Options */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onSave}
      >
        <AiOutlineSave className="text-base" />
        <span className="hidden md:inline">Save</span>
      </button>
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onExport}
      >
        <AiOutlineDownload className="text-base" />
        <span className="hidden md:inline">Export</span>
      </button>
    </div>
  );
};

export default SpreadSheetNavbar;