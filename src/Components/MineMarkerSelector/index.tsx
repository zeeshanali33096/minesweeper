import { Box, Heading } from "@chakra-ui/layout";
import React from "react";
import { GameLogicContext } from "../GameLogicProvider";

interface Props {
  selected: boolean;
}

const MineMarkerSelector = ({ selected }: Props) => {
  const { markerSelected, setMarkerSelected } = React.useContext(
    GameLogicContext
  );
  return (
    <Box
      height="35px"
      width="35px"
      backgroundColor={markerSelected ? "gray.600" : "gray.300"}
      border={`2px solid ${markerSelected ? "white" : "black"}`}
      onClick={() => setMarkerSelected(!markerSelected)}
    >
      <Heading fontSize="25px" cursor="pointer" textAlign="center" color="red">
        !
      </Heading>
    </Box>
  );
};

export default MineMarkerSelector;
