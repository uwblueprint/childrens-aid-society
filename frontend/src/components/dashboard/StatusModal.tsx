import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  FormLabel,
  SimpleGrid,
  FormControl,
  Icon,
} from "@chakra-ui/react";
import { ChevronDown } from "react-feather";
import ModalComponent from "../common/ModalComponent";

import CustomInput from "../common/CustomInput";
import OptionalLabel from "../intake/OptionalLabel";
import { StatusSelectField } from "./StatusSelectField";
import { useStepValueContext } from "../../contexts/IntakeValueContext";

export type StatusModalProps = {
  caseId?: number;
  status: string;
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
  onDeleteClick: () => void;
  goToIntake: () => void;
};

const StatusModal = ({
  caseId,
  status,
  isOpen,
  onClose,
  onClick,
  onDeleteClick,
  goToIntake,
}: StatusModalProps): React.ReactElement => {
  const [selectedOption, setSelectedOption] = useState(status);
  const [workerName, setWorkerName] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");

  const handleClearPage = () => {
    setWorkerName("");
    setMeetingNotes("");
  };

  const showClearButton = () => {
    const shouldShowClearButton = meetingNotes !== "" || workerName !== "";
    return shouldShowClearButton;
  };

  const {
    setStep,
    setReferralDetails,
    setCourtDetails,
    setProgramDetails,
  } = useStepValueContext();

  // TEMPORARY MOCK VALUES TO TEST REVIEW BUTTON
  const mockReferralDetails = {
    referringWorker: "Referring Worker",
    referringWorkerContact: "unused",
    familyName: "Family Name",
    referralDate: "Tue, 01 Jan 2019 00:00:00 GMT",
    cpinFileNumber: "1234321",
    cpinFileType: "INVESTIGATION",
    phoneNumber: "6475551234",
  };
  const mockCourtDetails = {
    currentCourtStatus: "INTERIM_CARE",
    firstNationHeritage: "FIRST_NATION_REGISTERED",
    firstNationBand: "first nation band",
    orderReferral: null,
  };
  const mockProgramDetails = {
    transportationRequirements: "transport requirements",
    schedulingRequirements: "scheduling requirements",
    suggestedStartDate: "Tue, 01 Jan 2019 00:00:00 GMT",
    shortTermGoals: ["goal1", "goal2"],
    longTermGoals: ["goal1", "goal2"],
    familialConcerns: ["concern1", "concern2"],
  };

  function sendToReview() {
    const reviewCaseDetailsStep = 4;

    setStep(reviewCaseDetailsStep);
    setReferralDetails(mockReferralDetails);
    setCourtDetails(mockCourtDetails);
    setProgramDetails(mockProgramDetails);

    goToIntake();
  }
  return (
    <Box>
      <ModalComponent
        showClearButton={showClearButton}
        onClearPage={handleClearPage}
        primaryTitle={`Case ${caseId}`}
        secondaryTitle=""
        showLeftButton={selectedOption === "ARCHIVED"}
        leftButtonTitle="Delete"
        leftButtonVariant="delete"
        onLeftButtonClick={onDeleteClick}
        modalContent={
          <Box>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              padding="1.5rem"
              position="relative"
            >
              <Text fontWeight="semibold" fontSize="2xl" mb="6px">
                Case Submission
              </Text>
              {/* TODO: Need to be changed for dynamic values */}
              <Text>Lead: XXX</Text>
              <Text>Date: XXX</Text>
              <Text>Family Name: XXX</Text>
              <Flex justify="flex-end" align="flex-end">
                <Button
                  variant="tertiary"
                  border="1px solid"
                  paddingLeft="6"
                  paddingRight="6"
                  onClick={sendToReview}
                >
                  Review
                </Button>
              </Flex>
            </Box>

            <SimpleGrid columns={2} spacingX="3rem" spacingY="0.75rem">
              <Box>
                <FormControl>
                  <FormLabel pt="15px" htmlFor="curStatus">
                    STATUS
                  </FormLabel>
                  <StatusSelectField
                    id="curStatus"
                    name="curStatus"
                    placeholder={selectedOption}
                    options={["SUBMITTED", "PENDING", "ACTIVE", "ARCHIVED"]}
                    iconRight={<Icon as={ChevronDown} />}
                    readOnly={false}
                    setSelected={setSelectedOption}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormLabel
                  htmlFor="childrenServicesWorker"
                  fontWeight={selectedOption === "ACTIVE" ? "" : "light"}
                  color={selectedOption === "ACTIVE" ? "" : "lightgray"}
                >
                  CHILDREN SERVICES OR KINSHIP WORKER
                </FormLabel>
                <CustomInput
                  id="childrenServicesWorker"
                  type="string"
                  placeholder={
                    selectedOption === "ACTIVE" ? "Enter worker name" : ""
                  }
                  value={workerName}
                  onChange={(event) => {
                    setWorkerName(event.target.value);
                  }}
                  isDisabled={!(selectedOption === "ACTIVE")}
                />
              </Box>
            </SimpleGrid>

            <Box marginTop="0.75rem">
              <FormLabel htmlFor="meetingNotes">
                MEETING NOTES <OptionalLabel />
              </FormLabel>
              <CustomInput
                id="meetingNotes"
                type="string"
                placeholder="Note any additional information in regards to this case."
                height="10rem"
                paddingBottom="7rem"
                value={meetingNotes}
                onChange={(event) => {
                  setMeetingNotes(event.target.value);
                }}
              />
            </Box>
          </Box>
        }
        disabled={selectedOption === ""}
        primaryButtonTitle="Save"
        onClick={onClick}
        isOpen={isOpen}
        onClose={onClose}
        unsavedProgressModal={false}
      />
    </Box>
  );
};

export default StatusModal;
