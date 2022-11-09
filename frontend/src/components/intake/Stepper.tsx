import React from "react";
import { Box, Grid, GridItem, Icon } from "@chakra-ui/react";
import { CheckCircle, Circle } from "react-feather";

export type StepperProps = {
  pages: string[];
  activePage: number;
  setTheStep: (index: number) => void;
};

const Stepper = ({
  pages,
  activePage,
  setTheStep,
}: StepperProps): React.ReactElement => {
  return (
    <Box
      bg="gray.50"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="4px"
      margin="0 96px 20px 96px"
      padding="15px"
    >
      {/* 1fr for each title, 0.25fr for each "connector" */}
      <Grid
        templateColumns={`1fr repeat(${pages.length - 1}, 0.25fr 1fr)`}
        rowGap="10px"
      >
        {pages.map((page, index) => {
          const isFirst = index === 0;
          const isActive = index === activePage;
          const isComplete = index < activePage;
          const color = isActive ? "blue.300" : "gray.600";
          return (
            <React.Fragment key={index}>
              <div
                onClick={() => {
                  setTheStep(index);
                }}
                style={{ display: "contents" }}
              >
                {isFirst || (
                  <>
                    {/* connector */}
                    <GridItem
                      bg="gray.100"
                      height="4px"
                      alignSelf="center"
                      gridRowStart={1}
                    />
                    <GridItem gridRowStart={2} />
                  </>
                )}
                <GridItem color={color} gridRowStart={1} justifySelf="center">
                  <Icon
                    as={isComplete ? CheckCircle : Circle}
                    width="24px"
                    height="24px"
                  />
                </GridItem>
                <GridItem color={color} gridRowStart={2} fontWeight={500}>
                  {page}
                </GridItem>
              </div>
            </React.Fragment>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Stepper;
