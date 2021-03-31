import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { GameLogicContext } from "../GameLogicProvider";

interface Props {
  val: number;
  iIndex: number;
  jIndex: number;
  show: boolean;
}
const Cell = ({ val, iIndex, jIndex, show }: Props) => {
  const { setClickedShow } = React.useContext(GameLogicContext);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickedShow(iIndex, jIndex);
  };
  return (
    <Box
      onClick={handleClick}
      background={
        show && val === 0 ? "gray.900" : show && val > 20 ? "red" : "gray.300"
      }
      border="1px solid black"
      key={`${val}-${iIndex}-${jIndex}`}
    >
      {show ? CellText(val) : ""}
    </Box>
  );
};

const CellText = (val: number) => (
  <Heading cursor="none" textAlign="center" color="black">
    {val === 0 ? "" : val > 20 ? "X" : val}
  </Heading>
);

export default Cell;
