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

const GamePage = () => {
  const { logicArray, clickedArr } = React.useContext(GameLogicContext);
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
      justifyContent="center"
      width="100%"
    >
      <Grid
        height={size * 50}
        width={size * 50}
        templateColumns={`repeat(${size}, 1fr)`}
        templateRows={`repeat(${size}, 1fr)`}
      >
        {logicArray.map((i, index) => {
          return printRow(i, clickedArr[index], index);
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

const printRow = (i: number[], selectedArr: boolean[], iIndex: number) => {
  return i.map((j, index) => {
    return (
      <Cell
        key={`${j}-${iIndex}-${index}`}
        val={j}
        iIndex={iIndex}
        jIndex={index}
        show={selectedArr[index]}
      />
    );
  });
};

const modalHeader = (gameState: number) =>
  gameState === 2 ? "Wohoo!" : "Oops!";

const modalBody = (gameState: number) =>
  gameState === 2 ? "Way to go!" : "Try Again... Noob.";
export default GamePage;
