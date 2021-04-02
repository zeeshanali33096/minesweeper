import { Box } from "@chakra-ui/layout";
import { Button, Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import React, { FormEvent } from "react";
import { useHistory } from "react-router";
import { GameSettingsContext } from "../../Components/GameSettingsProvider";
import { allowedDifficulty, allowedSize } from "../../Utils/gameSettings";

const HomePage = () => {
  const history = useHistory();
  const settings = React.useContext(GameSettingsContext);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    settings.setGameState(1);
    history.push("/game");
  };
  return (
    <Flex
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Box padding="5em" borderRadius="10px" backgroundColor="gray.900">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" width="20em">
            <FormControl id="difficulty">
              <FormLabel>Select Difficulty</FormLabel>
              <Select
                value={settings.difficulty}
                onChange={(e) => settings.setDifficulty(e.target.value)}
                placeholder="Select Difficulty"
              >
                {Object.keys(allowedDifficulty).map((di) => (
                  <option key={di} value={di}>
                    {di}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="size" marginBottom="1em">
              <FormLabel>Select Size</FormLabel>
              <Select
                value={settings.size}
                onChange={(e) => settings.setSize(parseInt(e.target.value))}
                placeholder="Select Size"
              >
                {allowedSize.map((di) => (
                  <option key={di} value={di}>
                    {di}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" alignSelf="center">
              Play!
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default HomePage;
