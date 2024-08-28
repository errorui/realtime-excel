const handleKeyDown = (e, rowIndex, colIndex, cells, setCells, inputRefs) => {
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
};

export default handleKeyDown;
