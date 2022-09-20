import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

export type StepperProps = {
  pages: string[];
  activePage: number;
};

const Stepper = ({ pages, activePage }: StepperProps): React.ReactElement => {
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
              <GridItem
                gridRowStart={1}
                justifySelf="center"
                sx={{ "svg path": { stroke: color } }}
              >
                {isComplete ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 11.0799V11.9999C21.9988 14.1563 21.3005 16.2545 20.0093 17.9817C18.7182 19.7088 16.9033 20.9723 14.8354 21.5838C12.7674 22.1952 10.5573 22.1218 8.53447 21.3744C6.51168 20.6271 4.78465 19.246 3.61096 17.4369C2.43727 15.6279 1.87979 13.4879 2.02168 11.3362C2.16356 9.18443 2.99721 7.13619 4.39828 5.49694C5.79935 3.85768 7.69279 2.71525 9.79619 2.24001C11.8996 1.76477 14.1003 1.9822 16.07 2.85986"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 4L12 14.01L9 11.01"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </GridItem>
              <GridItem color={color} gridRowStart={2} fontWeight={500}>
                {page}
              </GridItem>
            </React.Fragment>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Stepper;
