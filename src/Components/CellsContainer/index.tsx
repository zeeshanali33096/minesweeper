import { Grid } from "@chakra-ui/react";
import React from "react";

interface Props {
  size: number;
}
const CellsContainer = ({ size }: Props) => {
  return (
    <Grid
      height={size * 50}
      width={size * 50}
      templateColumns={`repeat(${size}, 1fr)`}
      templateRows={`repeat(${size}, 1fr)`}
    ></Grid>
  );
};

export default CellsContainer;
