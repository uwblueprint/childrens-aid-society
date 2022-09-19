import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export type StepperProps = {
  pages: string[];
  activePage: number;
};

const Stepper = ({
  pages,
  activePage,
}: StepperProps): React.ReactElement => {
  return (
    <Box bg="gray.50" borderWidth="1px" borderColor="gray.100" borderRadius="4px" margin="0 96px 20px 96px" padding="15px">
      {/* 1fr for each title, 0.25fr for each "connector" */}
      <Grid templateColumns={`1fr repeat(${pages.length - 1}, 0.25fr 1fr)`} rowGap="10px">
        {pages.map((page, index) => {
          const isFirst = (index === 0)
          const isActive = (index === activePage)
          const color = isActive ? "blue.300" : "gray.600"
          return <>
            {isFirst || <>
              {/* connector */}
              <GridItem bg="gray.100" height="4px" alignSelf="center" gridRowStart={1} />
              <GridItem gridRowStart={2} />
            </>}
            <GridItem gridRowStart={1} width="20px" height="20px" justifySelf="center" borderRadius="10px" borderWidth="2px" borderColor={color} />
            <GridItem color={color} gridRowStart={2} fontWeight={500}>{page}</GridItem>
          </>
        })}
      </Grid>
    </Box>
  );
};

export default Stepper;
