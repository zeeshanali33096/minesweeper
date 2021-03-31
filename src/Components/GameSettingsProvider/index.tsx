import React from "react";
import { Redirect } from "react-router";
import { ContextProps } from "../../Utils/ContextProps";
import {
  allowedDifficulty,
  allowedGameState,
  allowedSize,
} from "../../Utils/gameSettings";

//game state : 0 - not started , 1 - running , 2 - win, 3 over
const initialState = {
  size: 12,
  difficulty: "Easy",
  gameState: 0,
  setSize: (size: number) => {},
  setDifficulty: (difficulty: string) => {},
  setGameState: (state: number) => {},
};

export  const GameSettingsContext = React.createContext(initialState);

const GameSettingsProvider = ({ children }: ContextProps) => {
  const [size, setSize] = React.useState<number>(12);
  const [difficulty, setDifficulty] = React.useState<string>("Easy");
  const [gameState, setGameState] = React.useState<number>(0);

  React.useEffect(() => {
    if (allowedSize.indexOf(size) === -1) {
      setSize(12);
    }
  }, [size]);

  React.useEffect(() => {
    if (Object.keys(allowedDifficulty).indexOf(difficulty) === -1) {
      setDifficulty("Easy");
    }
  }, [difficulty]);

  React.useEffect(() => {
    if (allowedGameState.indexOf(gameState) === -1) {
      setGameState(2);
    }
  }, [gameState]);

  return (
    <GameSettingsContext.Provider
      value={{
        size,
        difficulty,
        gameState,
        setSize,
        setDifficulty,
        setGameState,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};

export default GameSettingsProvider;
