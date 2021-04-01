import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { GameLogicContext } from "../GameLogicProvider";

interface Props {
  val: number;
  iIndex: number;
  jIndex: number;
  show: boolean;
  marker: boolean;
}
const Cell = ({ val, iIndex, jIndex, show, marker }: Props) => {
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
      {show ? CellText(val) : marker ? CellTextMarked() : ""}
    </Box>
  );
};

const CellText = (val: number) => (
  <Heading
    fontSize="25px"
    pointerEvents="none"
    textAlign="center"
    color="black"
  >
    {val === 0 ? "" : val > 20 ? "X" : val}
  </Heading>
);

const CellTextMarked = () => (
  <Heading fontSize="25px" pointerEvents="none" textAlign="center" color="red">
    !
  </Heading>
);

export default Cell;
