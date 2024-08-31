import React from "react";
import Link from "next/link";
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
  AiOutlineUpload
} from "react-icons/ai";
import { MdColorLens } from "react-icons/md";
import { Tooltip } from 'react-tooltip';

const SpreadSheetNavbar = ({
  onFilter,
  onSortAsc,
  onSortDesc,
  onAddRow,
  onAddColumn,
  onDeleteRow,
  onDeleteColumn,
  onBold,
  onItalic,
  onUnderline,
  onCellColor,
  onSave,
  onExport,
  onToggleChart,
  onImport
}) => {
  return (
    <div className="bg-gray-200 p-2 flex items-center space-x-3 shadow-md">
      {/* Filter Button */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onFilter}
        data-tooltip-id="filter-tooltip"
      >
        <AiOutlineFilter className="text-base" />
        <span className="hidden md:inline">Filter</span>
      </button>
      <Tooltip id="filter-tooltip" content="Apply Filter" />

      {/* Sorting Buttons */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onSortAsc}
        data-tooltip-id="sort-asc-tooltip"
      >
        <AiOutlineSortAscending className="text-base" />
        <span className="hidden md:inline">Sort Asc</span>
      </button>
      <Tooltip id="sort-asc-tooltip" content="Sort Ascending" />

      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onSortDesc}
        data-tooltip-id="sort-desc-tooltip"
      >
        <AiOutlineSortDescending className="text-base" />
        <span className="hidden md:inline">Sort Desc</span>
      </button>
      <Tooltip id="sort-desc-tooltip" content="Sort Descending" />

      {/* Add Row/Column Buttons */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onAddRow}
        data-tooltip-id="add-row-tooltip"
      >
        <AiOutlinePlus className="text-base" />
        <span className="hidden md:inline">Add Row</span>
      </button>
      <Tooltip id="add-row-tooltip" content="Add a new row" />

      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onAddColumn}
        data-tooltip-id="add-column-tooltip"
      >
        <AiOutlinePlus className="text-base" />
        <span className="hidden md:inline">Add Column</span>
      </button>
      <Tooltip id="add-column-tooltip" content="Add a new column" />

      {/* Delete Row/Column Buttons */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onDeleteRow}
        data-tooltip-id="delete-row-tooltip"
      >
        <AiOutlineMinus className="text-base" />
        <span className="hidden md:inline">Delete Row</span>
      </button>
      <Tooltip id="delete-row-tooltip" content="Delete selected row" />

      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onDeleteColumn}
        data-tooltip-id="delete-column-tooltip"
      >
        <AiOutlineMinus className="text-base" />
        <span className="hidden md:inline">Delete Column</span>
      </button>
      <Tooltip id="delete-column-tooltip" content="Delete selected column" />

      {/* Text Formatting */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onBold}
        data-tooltip-id="bold-tooltip"
      >
        <AiOutlineBold className="text-base" />
        <span className="hidden md:inline">Bold</span>
      </button>
      <Tooltip id="bold-tooltip" content="Bold text" />

      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onItalic}
        data-tooltip-id="italic-tooltip"
      >
        <AiOutlineItalic className="text-base" />
        <span className="hidden md:inline">Italic</span>
      </button>
      <Tooltip id="italic-tooltip" content="Italicize text" />

      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onUnderline}
        data-tooltip-id="underline-tooltip"
      >
        <AiOutlineUnderline className="text-base" />
        <span className="hidden md:inline">Underline</span>
      </button>
      <Tooltip id="underline-tooltip" content="Underline text" />

      {/* Cell Color Picker */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onCellColor}
        data-tooltip-id="cell-color-tooltip"
      >
        <MdColorLens className="text-base" />
        <span className="hidden md:inline">Cell Color</span>
      </button>
      <Tooltip id="cell-color-tooltip" content="Change cell color" />

      {/* Save/Export Options */}
      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onSave}
        data-tooltip-id="save-tooltip"
      >
        <AiOutlineSave className="text-base" />
        <span className="hidden md:inline">Save</span>
      </button>
      <Tooltip id="save-tooltip" content="Save document" />

      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onExport}
        data-tooltip-id="export-tooltip"
      >
        <AiOutlineDownload className="text-base" />
        <span className="hidden md:inline">Export</span>
      </button>
      <Tooltip id="export-tooltip" content="Export document" />

      <button
        className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
        onClick={onImport}
        data-tooltip-id="import-tooltip"
      >
        <AiOutlineUpload className="text-base" />
        <span className="hidden md:inline">Import</span>
      </button>
      <Tooltip id="import-tooltip" content="Import document" />

      {/* Toggle Chart Button with Link */}
      <Link href="/chart">
        <button
          className="flex items-center space-x-1 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 text-sm"
          onClick={onToggleChart}
          data-tooltip-id="create-chart-tooltip"
        >
          <AiOutlineMergeCells className="text-base" />
          <span className="hidden md:inline">Create Chart</span>
        </button>
        <Tooltip id="create-chart-tooltip" content="Create a chart" />
      </Link>
    </div>
  );
};

export default SpreadSheetNavbar;
