import { Flex, Grid } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import Cell from "../../Components/Cell";
import { GameLogicContext } from "../../Components/GameLogicProvider";
import { GameSettingsContext } from "../../Components/GameSettingsProvider";
import MineMarkerSelector from "../../Components/MineMarkerSelector";

const GamePage = () => {
  const {
    logicArray,
    clickedArr,
    setMarkerSelected,
    markerSelected,
    markerArray
  } = React.useContext(GameLogicContext);
  const { size, gameState } = React.useContext(GameSettingsContext);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const history = useHistory();

  React.useEffect(() => {
    if (gameState > 1) {
      setIsOpen(true);
      setTimeout(() => {
        history.replace("/");
      }, 2000);
    }
  }, [gameState]);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Flex
      marginTop="2em"
      alignItems="center"
      // justifyContent="center"
      width="100%"
      height="100vh"
      direction="column"
      onClick={() => (markerSelected ? setMarkerSelected(false) : {})}
    >
      <Flex id="minemarker_selector" marginTop="1em" marginBottom="1em">
        <MineMarkerSelector selected />
      </Flex>
      <Grid
        id="game_area"
        height={size * 35}
        width={size * 35}
        templateColumns={`repeat(${size}, 1fr)`}
        templateRows={`repeat(${size}, 1fr)`}
      >
        {logicArray.map((i, index) => {
          return printRow(i, clickedArr[index], index, markerArray[index]);
        })}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader(gameState)}</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>{modalBody(gameState)}</ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

const printRow = (i: number[], selectedArr: boolean[], iIndex: number, markerRow: boolean[]) => {
  return i.map((j, index) => {
    return (
      <Cell
        key={`${j}-${iIndex}-${index}`}
        val={j}
        iIndex={iIndex}
        jIndex={index}
        show={selectedArr[index]}
        marker={markerRow[index]}
      />
    );
  });
};

const modalHeader = (gameState: number) =>
  gameState === 2 ? "Wohoo!" : "Oops!";

const modalBody = (gameState: number) =>
  gameState === 2 ? "Way to go!" : "Try Again... Noob.";
export default GamePage;
