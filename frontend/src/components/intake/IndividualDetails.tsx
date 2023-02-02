import React from "react";
import { Button, VStack, Text, HStack, Icon, Divider } from "@chakra-ui/react";
import { Edit2, ArrowRight } from "react-feather";
import { useHistory } from "react-router-dom";
import { IndividualDetailsOverview } from "./PromptBox";

type IndividualDetailsProps = {
  title: string;
  childrenDetails: IndividualDetailsOverview[];
  caregiverDetails: IndividualDetailsOverview[];
};

const IndividualDetails = ({
  title,
  childrenDetails,
  caregiverDetails,
}: IndividualDetailsProps): React.ReactElement => {
  const history = useHistory();

  return (
    <>
      <VStack padding="32px" align="flex-start" spacing="16px">
        <HStack w="full" display="flex" justifyContent="space-between">
          <Text color="b&w.black" textStyle="header-large">
            {title}
          </Text>
          <Button
            textStyle="button-medium"
            variant="primary"
            rightIcon={<Icon as={Edit2} h="16px" />}
          >
            Edit {/* TODO: implement edit button */}
          </Button>
        </HStack>
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
                  <Text textStyle="title-small">
                    {indiv.firstName} {indiv.lastName}
                  </Text>
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
      <VStack padding="32px" align="flex-start" spacing="16px">
        <Text
          color="blue.500"
          textStyle="label"
          bg="gray.50"
          padding={1}
          borderRadius="5px"
        >
          CAREGIVERS
        </Text>
        {caregiverDetails.map((indiv, i) => (
          <VStack key={i} w="full">
            <HStack w="full">
              <VStack align="flex-start" w="full" spacing="0px">
                <HStack>
                  <Text textStyle="title-small">
                    {indiv.firstName} {indiv.lastName}
                  </Text>
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
