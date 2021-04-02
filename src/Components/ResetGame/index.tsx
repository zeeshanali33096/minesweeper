import { Box, Heading } from "@chakra-ui/layout";
import React from "react";
import { GameLogicContext } from "../GameLogicProvider";

const ResetGame = () => {
  const {resetGame} = React.useContext(GameLogicContext);
  return (
    <Box
      height="35px"
      width="35px"
      backgroundColor="gray.300"
      border={`2px solid black`}
      onClick={() => resetGame()}
    >
      <Heading fontSize="25px" cursor="pointer" textAlign="center" color="black">
        ↻
      </Heading>
    </Box>
  );
};

export default ResetGame;
