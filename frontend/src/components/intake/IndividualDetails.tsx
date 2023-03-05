import React from "react";
import { Button, VStack, Text, HStack, Icon, Divider } from "@chakra-ui/react";
import { ArrowRight } from "react-feather";
import { useHistory } from "react-router-dom";
import { IndividualDetailsOverview } from "./PromptBox";

type IndividualDetailsProps = {
  childrenDetails: IndividualDetailsOverview[];
  caregiverDetails: IndividualDetailsOverview[];
};

const IndividualDetails = ({
  childrenDetails,
  caregiverDetails,
}: IndividualDetailsProps): React.ReactElement => {
  const history = useHistory();

  return (
    <>
      <VStack paddingY="32px" align="flex-start" spacing="16px">
        <Text
          color="blue.500"
          textStyle="label"
          bg="gray.50"
          padding={1}
          borderRadius="5px"
        >
          CHILDREN
        </Text>
        {childrenDetails.map((indiv, i) => (
          <VStack key={i} w="full">
            <HStack w="full">
              <VStack align="flex-start" w="full" spacing="0px">
                <HStack>
                  <Text textStyle="title-small">{indiv.name}</Text>
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
        ))}
      </VStack>
      <VStack paddingY="32px" align="flex-start" spacing="16px">
        <Text
          color="blue.500"
          textStyle="label"
          bg="gray.50"
          padding={1}
          borderRadius="5px"
        >
          VISITING FAMILY MEMBERS
        </Text>
        {caregiverDetails.map((indiv, i) => (
          <VStack key={i} w="full">
            <HStack w="full">
              <VStack align="flex-start" w="full" spacing="0px">
                <HStack>
                  <Text textStyle="title-small">{indiv.name}</Text>
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
        ))}
      </VStack>
    </>
  );
};

export default IndividualDetails;
