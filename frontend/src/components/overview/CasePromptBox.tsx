import React, { ReactElement } from "react";
import { Button, Divider, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { ArrowRight, Trash } from "react-feather";

export type IndividualDetailsOverview = {
  name: string;
  id: number | undefined;
};

export type CasePromptBoxProps = {
  descriptionText: string;
  buttonText: string;
  buttonIcon?: ReactElement;
  onButtonClick: () => void;
  secondaryButtonText?: string;
  secondaryButtonIcon?: ReactElement;
  secondaryOnButtonClick?: () => void;
  individualDetails?: IndividualDetailsOverview[];
  setSelectedIndex?: React.Dispatch<React.SetStateAction<number>>;
  useSecondaryOnClick?: boolean;
  deleteIndividual?: (index: number, deleteId: number) => void;
};

const PromptBox = ({
  descriptionText,
  buttonText,
  buttonIcon,
  onButtonClick,
  secondaryOnButtonClick,
  individualDetails,
  setSelectedIndex,
  useSecondaryOnClick,
  deleteIndividual,
}: CasePromptBoxProps): React.ReactElement => {
  return (
    <VStack
      bg="white"
      borderRadius="14px"
      borderWidth="1px"
      borderColor="gray.100"
      align="flex-end"
      w="full"
      maxW={816}
      padding="32px"
      spacing="16px"
      position="relative"
    >
      <VStack align="flex-start" w="full" spacing="8px" marginBottom="45px">
        {individualDetails && individualDetails.length > 0
          ? individualDetails.map((indiv, i) => (
              <VStack key={i} w="full">
                <HStack w="full">
                  <VStack align="flex-start" w="full" spacing="0px">
                    <HStack>
                      <Text textStyle="title-small">{indiv.name}</Text>
                      <Icon
                        onClick={() => {
                          if (
                            deleteIndividual !== undefined &&
                            indiv.id !== undefined
                          ) {
                            deleteIndividual(i, indiv.id);
                          }
                        }}
                        as={Trash}
                        h="16px"
                        color="grey.600"
                        cursor="pointer"
                      />
                    </HStack>
                  </VStack>
                  <Button
                    color="blue.600"
                    textStyle="button-small"
                    variant="tertiary"
                    onClick={() => {
                      if (setSelectedIndex) {
                        setSelectedIndex(i);
                        if (useSecondaryOnClick && secondaryOnButtonClick) {
                          secondaryOnButtonClick();
                        } else {
                          onButtonClick();
                        }
                      }
                    }}
                    rightIcon={<Icon as={ArrowRight} h="16px" />}
                  />
                </HStack>
                <Divider orientation="horizontal" w="full" />
              </VStack>
            ))
          : !individualDetails && (
              <Text color="gray.600" textStyle="body-large">
                {descriptionText}
              </Text>
            )}
        <Button
          position="absolute"
          right="4"
          bottom="4"
          variant="caseoverview"
          colorScheme="blue.100"
          leftIcon={buttonIcon}
          onClick={() => {
            onButtonClick();
            if (setSelectedIndex) {
              setSelectedIndex(-1);
            }
          }}
        >
          {buttonText}
        </Button>
      </VStack>
    </VStack>
  );
};

export default PromptBox;
