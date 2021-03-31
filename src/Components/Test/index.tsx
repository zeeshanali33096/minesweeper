// import { Grid } from "@chakra-ui/layout";
import React from "react";

const genArray = (size: number) =>
  new Array(size)
    .fill(0)
    .map((val) => new Array(size).fill(0).map((subArrVal) => false));

const TestComp = () => {
  const [someArr, setSomeArr] = React.useState(genArray(12));

  const handleClick = (rowId: number, cellId: number) =>
    setSomeArr((prev) =>
      prev.map((r, rId) =>
        r.map((c, cId) => (rId === rowId && cId === cellId ? true : c))
      )
    );

  return (
    <div
      style={{
        display: "grid",
        height: 12 * 50,
        width: 12 * 50,
        gridTemplateRows: "repeat(12, 1fr)",
        gridTemplateColumns: "repeat(12, 1fr)",
      }}
    >
      {someArr.map((row, rowId) =>
        row.map((cell, cellId) => (
          <button
            key={`button-${rowId}-${cellId}`}
            onClick={(e) => {
              e.preventDefault();
              handleClick(rowId, cellId);
            }}
            style={{ backgroundColor: cell === true ? "red" : "green" }}
          >
            b
          </button>
        ))
      )}
    </div>
  );
};

export default TestComp;
