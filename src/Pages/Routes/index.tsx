import { useColorMode } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GameLogicProvider from "../../Components/GameLogicProvider";
import TestComp from "../../Components/Test";
import GamePage from "../GamePage";
import HomePage from "../HomePage";

const Routes = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  React.useEffect(() => {
    if (colorMode === "light") {
      toggleColorMode();
    }
  }, []);

  return (
    <Router>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/game">
        <GameLogicProvider>
          <GamePage />
        </GameLogicProvider>
      </Route>
      <Route path="/test">
        <TestComp />
      </Route>
    </Router>
  );
};

export default Routes;
