import React from "react";
import { Redirect } from "react-router";
import { ContextProps } from "../../Utils/ContextProps";
import { allowedDifficulty } from "../../Utils/gameSettings";
import {
  generateMines,
  generateMinesLogicArray,
  generateNewClickedArray,
} from "../../Utils/generate.logic";
import { GameSettingsContext } from "../GameSettingsProvider";

const initialState = {
  ...generateMines(12),
  setClickedShow: (iIndex: number, jIndex: number) => {},
  markerSelected: false,
  setMarkerSelected: (val: boolean) => {},
  markerArray: generateNewClickedArray(12),
  flashHint: () => {},
  resetGame: () => {},
  // setMarkerArray: (newMarkerArray)=> {}
};

export const GameLogicContext = React.createContext(initialState);

const GameLogicProvider = ({ children }: ContextProps) => {
  const { size, difficulty, gameState, setGameState } = React.useContext(
    GameSettingsContext
  );
  const [Clicked, setClicked] = React.useState<boolean[][]>(
    generateNewClickedArray(size)
  );
  const [LogicArray, setLogicArray] = React.useState<number[][]>(
    generateMinesLogicArray(size, (allowedDifficulty as any)[difficulty])
  );

  const [minesCount, setMinesCount] = React.useState<number>(
    LogicArray.reduce(
      (c, v) => c + v.reduce((sum, cv) => (cv > 20 ? sum + 1 : sum), 0),
      0
    )
  );

  const [markerArray, setMarkerArray] = React.useState<boolean[][]>(
    generateNewClickedArray(size)
  );

  const [markerSelected, setMarkerSelected] = React.useState<boolean>(false);

  const [total, setTotal] = React.useState<number>(0);

  const resetShown = () => setClicked(generateNewClickedArray(size));

  const showBlanks = () =>
    setClicked(LogicArray.map((r) => r.map((c) => (c === 0 ? true : false))));

  const resetAfterTimeout = () => {
    setTimeout(() => {
      resetShown();
    }, 400);
  };

  const resetGame = () => {
    setLogicArray(
      generateMinesLogicArray(size, (allowedDifficulty as any)[difficulty])
    );
    setMarkerArray(generateNewClickedArray(size));
    setClicked(generateNewClickedArray(size));

    setTimeout(() => {
      flashHint();
    }, 500);
  };

  React.useEffect(() => {
    setMinesCount(
      LogicArray.reduce(
        (c, v) => c + v.reduce((sum, cv) => (cv > 20 ? sum + 1 : sum), 0),
        0
      )
    );
  }, [LogicArray]);

  const flashHint = () => {
    if (
      Clicked.reduce(
        (t, r) => t + r.reduce((s, c) => (c === true ? s + 1 : s), 0),
        0
      ) === 0
    )
      setTimeout(() => {
        showBlanks();
        resetAfterTimeout();
      }, 500);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setTotal(
        Clicked.reduce(
          (sum, current) =>
            sum + current.reduce((s, c) => (c === true ? s + 1 : s), 0),
          0
        )
      );
    }, 50);
  }, [Clicked]);

  React.useEffect(() => {
    if (total === size * size - minesCount) {
      setGameState(2);
    }
  }, [total]);

  const setCellClicked = (iIndex: number, jIndex: number) => {
    // console.log("setting to true", iIndex, jIndex);
    setClicked((prevState) => {
      const n = prevState.map((r, rI) =>
        r.map((c, cI) => (rI === iIndex && cI === jIndex ? true : c))
      );
      return n;
    });
  };

  const setClickedShow = (iIndex: number, jIndex: number) => {
    if (gameState === 1) {
      if (markerSelected) {
        setMarkerArray(
          markerArray.map((r, rId) =>
            r.map((c, cId) =>
              rId === iIndex && cId === jIndex ? (c === true ? false : true) : c
            )
          )
        );
      } else {
        if (LogicArray[iIndex][jIndex] === 0) {
          handleBlankCellClicked(iIndex, jIndex, {});
        } else {
          setCellClicked(iIndex, jIndex);
          if (LogicArray[iIndex][jIndex] > 20) {
            const newClicked = Clicked.map((r, rId) =>
              r.map((c, cId) => (LogicArray[rId][cId] > 20 ? true : c))
            );
            setClicked(newClicked);
            setGameState(3);
          }
        }
      }
    }
  };

  const handleBlankCellClicked = (
    iIndex: number,
    jIndex: number,
    state: any
  ) => {
    console.log({ iIndex, jIndex });
    if (iIndex < 0 || jIndex < 0 || iIndex > size - 1 || jIndex > size - 1) {
      // console.log("<0 or > size");
      return;
    } else if (
      LogicArray[iIndex][jIndex] > 0 &&
      LogicArray[iIndex][jIndex] < 20
    ) {
      // console.log("val not 0");
      setCellClicked(iIndex, jIndex);
      state[iIndex + "," + jIndex] = true;
      return;
    } else if (state[iIndex + "," + jIndex]) {
      // console.log("cell already selected");
      return;
    } else {
      setCellClicked(iIndex, jIndex);
      state[iIndex + "," + jIndex] = true;
      // console.log("cell not selected", iIndex, jIndex);
      if (iIndex - 1 >= 0) {
        if (state[iIndex - 1 + "," + jIndex]) {
        } else {
          handleBlankCellClicked(iIndex - 1, jIndex, state); // top
        }
      }
      if (iIndex - 1 >= 0 && jIndex + 1 <= size - 1) {
        if (state[iIndex - 1 + "," + (jIndex + 1)]) {
        } else {
          handleBlankCellClicked(iIndex - 1, jIndex + 1, state); //top right
        }
      }
      if (jIndex + 1 <= size - 1) {
        if (state[iIndex + "," + (jIndex + 1)]) {
        } else {
          handleBlankCellClicked(iIndex, jIndex + 1, state); // right
        }
      }

      if (iIndex + 1 <= size - 1 && jIndex + 1 <= size - 1) {
        if (state[iIndex + 1 + "," + (jIndex + 1)]) {
        } else {
          handleBlankCellClicked(iIndex + 1, jIndex + 1, state); //bottom right
        }
      }

      if (iIndex + 1 <= size - 1) {
        if (state[iIndex + 1 + "," + jIndex]) {
        } else {
          handleBlankCellClicked(iIndex + 1, jIndex, state); //bottom
        }
      }

      if (iIndex + 1 <= size - 1 && jIndex - 1 >= 0) {
        if (state[iIndex + 1 + "," + (jIndex - 1)]) {
        } else {
          handleBlankCellClicked(iIndex + 1, jIndex - 1, state); //bottom left
        }
      }

      if (jIndex - 1 >= 0) {
        if (state[iIndex + "," + (jIndex - 1)]) {
        } else {
          handleBlankCellClicked(iIndex, jIndex - 1, state); // left
        }
      }

      if (iIndex - 1 >= 0 && jIndex - 1 >= 0) {
        if (state[iIndex - 1 + "," + (jIndex - 1)]) {
        } else {
          handleBlankCellClicked(iIndex - 1, jIndex - 1, state); //top left
        }
      }
    }
  };
  return (
    <GameLogicContext.Provider
      value={{
        markerArray,
        clickedArr: Clicked,
        logicArray: LogicArray,
        setClickedShow,
        markerSelected,
        setMarkerSelected,
        flashHint,
        resetGame,
      }}
    >
      {gameState === 0 ? <Redirect to="/" /> : children}
    </GameLogicContext.Provider>
  );
};

export default GameLogicProvider;
