import React, { ReactElement } from "react";
import { Button, VStack, Text, HStack, Icon, Divider } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ArrowRight, Trash } from "react-feather";

export type IndividualDetailsOverview = {
  firstName: string;
  lastName: string;
  fileNumber: string;
};

export type PromptBoxProps = {
  headerText: string;
  descriptionText: string;
  buttonText: string;
  buttonIcon?: ReactElement;
  onButtonClick: () => void;
  secondaryButtonText?: string;
  secondaryButtonIcon?: ReactElement;
  secondaryOnButtonClick?: () => void;
  individualDetails?: IndividualDetailsOverview[];
};

const PromptBox = ({
  headerText,
  descriptionText,
  buttonText,
  buttonIcon,
  onButtonClick,
  secondaryButtonText,
  secondaryButtonIcon,
  secondaryOnButtonClick,
  individualDetails,
}: PromptBoxProps): React.ReactElement => {
  const history = useHistory();

  return (
    <VStack
      bg="gray.50"
      borderRadius="14px"
      borderWidth="1px"
      borderColor="gray.100"
      align="flex-end"
      w="full"
      maxW={816}
      padding="32px"
      spacing="16px"
    >
      <VStack align="flex-start" w="full" spacing="8px">
        <Text color="b&w.black" textStyle="title-large">
          {headerText}
        </Text>
        {individualDetails ? (
          individualDetails.map((indiv, i) => (
            <VStack key={i} w="full">
              <HStack w="full">
                <VStack align="flex-start" w="full" spacing="0px">
                  <HStack>
                    <Text textStyle="title-small">
                      {indiv.firstName} {indiv.lastName}
                    </Text>
                    <Icon
                      onClick={() => {
                        history.goBack();
                        // TODO: deletes details, history.goBack() is just a placeholder, replace when ready
                      }}
                      as={Trash}
                      h="16px"
                      color="grey.600"
                      cursor="pointer"
                    />
                  </HStack>
                  <Text color="gray.600" textStyle="body-medium">
                    {indiv.fileNumber}
                  </Text>
                </VStack>
                <Button
                  color="blue.300"
                  textStyle="button-small"
                  variant="tertiary"
                  onClick={() => {
                    history.goBack();
                    // TODO: implement view and edit details button, history.goBack() is just a placeholder, replace when ready
                  }}
                  rightIcon={<Icon as={ArrowRight} h="16px" />}
                >
                  View and edit details
                </Button>
              </HStack>
              <Divider orientation="horizontal" w="full" />
            </VStack>
          ))
        ) : (
          <Text color="gray.600" textStyle="body-large">
            {descriptionText}
          </Text>
        )}
      </VStack>
      <HStack>
        {secondaryButtonText && (
          <Button
            variant="tertiary"
            colorScheme="gray.600"
            leftIcon={secondaryButtonIcon}
            onClick={secondaryOnButtonClick}
          >
            {secondaryButtonText}
          </Button>
        )}
        <Button
          variant="secondary"
          colorScheme="gray.600"
          leftIcon={buttonIcon}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </HStack>
    </VStack>
  );
};

export default PromptBox;
