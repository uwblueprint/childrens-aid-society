import React, { ReactElement } from "react";
import {
  Button,
  VStack,
  Text,
  HStack,
  Icon,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowRight, Trash } from "react-feather";
import NewCaregiverModal, {
  Caregivers,
  CaregiverDetails,
} from "./NewCaregiverModal";

export type IndividualDetailsOverview = {
  name: string;
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
  deleteIndividual?: (index: number) => void;
  caregivers?: Caregivers;
  setCaregivers?: React.Dispatch<React.SetStateAction<Caregivers>>;
  caregiverDetails?: CaregiverDetails;
  setCaregiverDetails?: React.Dispatch<React.SetStateAction<CaregiverDetails>>;
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
  deleteIndividual,
  caregivers,
  setCaregivers,
  caregiverDetails,
  setCaregiverDetails,
}: PromptBoxProps): React.ReactElement => {
  const onClickNewCaregiver = (newCaregiver: CaregiverDetails) => {
    if (caregivers !== undefined && setCaregivers !== undefined) {
      caregivers.push(newCaregiver);
      setCaregivers(caregivers);
    }
  };
  const {
    onOpen: onOpenAddCaregivers,
    isOpen: isOpenAddCaregivers,
    onClose: onCloseAddCaregivers,
  } = useDisclosure();

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
        {individualDetails && individualDetails.length > 0 ? (
          individualDetails.map((indiv, i) => (
            <VStack key={i} w="full">
              <HStack w="full">
                <VStack align="flex-start" w="full" spacing="0px">
                  <HStack>
                    <Text textStyle="title-small">{indiv.name}</Text>
                    <Icon
                      onClick={() => {
                        if (deleteIndividual !== undefined) {
                          deleteIndividual(i);
                        }
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
                    onOpenAddCaregivers();
                  }}
                  rightIcon={<Icon as={ArrowRight} h="16px" />}
                >
                  View and edit details
                </Button>
                {caregiverDetails && setCaregiverDetails && (
                  <NewCaregiverModal
                    isOpen={isOpenAddCaregivers}
                    onClick={onClickNewCaregiver}
                    onClose={onCloseAddCaregivers}
                    caregiverDetails={caregiverDetails}
                    setCaregiverDetails={setCaregiverDetails}
                  />
                )}
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
