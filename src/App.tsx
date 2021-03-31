import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import GameSettingsProvider from "./Components/GameSettingsProvider";
import Routes from "./Pages/Routes";

const App = () => {
  return (
    <ChakraProvider resetCSS>
      <GameSettingsProvider>
        <Routes />
      </GameSettingsProvider>
    </ChakraProvider>
  );
};

export default App;
