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
import IntakeAPIClient from "../../APIClients/IntakeAPIClient";
import { Case } from "../../types/CasesContextTypes";

export type StatusModalProps = {
  caseId: number;
  status: string;
  caseDetails: Case;
  isOpen: boolean;
  onClick: (updatedData: {
    changedData: Record<string, string>;
    intakeID: number;
  }) => void;
  onClose: () => void;
  onDeleteClick: () => void;
  goToIntake: () => void;
  intakeNotes: string;
};

const StatusModal = ({
  caseId,
  status,
  caseDetails,
  isOpen,
  onClose,
  onClick,
  onDeleteClick,
  goToIntake,
  intakeNotes,
}: StatusModalProps): React.ReactElement => {
  const {
    setStep,
    setId,
    setIsReviewOnly,
    setReferralDetails,
    setCourtDetails,
    setProgramDetails,
    setIntakeStatus,
  } = useStepValueContext();

  const [workerName, setWorkerName] = useState(
    caseDetails.caseReferral.referringWorker,
  );
  const [selectedOption, setSelectedOption] = useState(status);
  const [meetingNotes, setMeetingNotes] = useState(intakeNotes);

  const handleClearPage = () => {
    setWorkerName("");
    setMeetingNotes("");
  };

  const showClearButton = () => {
    const shouldShowClearButton = meetingNotes !== "" || workerName !== "";
    return shouldShowClearButton;
  };

  const sendToReview = () => {
    const reviewCaseDetailsStep = 4;

    setStep(reviewCaseDetailsStep);
    setId(typeof caseId === "string" ? caseId : caseId.toString());
    setReferralDetails(caseDetails.caseReferral);
    setCourtDetails(caseDetails.courtInformation);
    setProgramDetails(caseDetails.programDetails);
    setIsReviewOnly(true);
    setIntakeStatus(caseDetails.intakeStatus);
    goToIntake();
  };

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
              <Text>Date: {caseDetails.caseReferral.referralDate}</Text>
              <Text>Family Name: {caseDetails.caseReferral.familyName}</Text>
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
                  value={
                    selectedOption === "ACTIVE"
                      ? caseDetails.caseReferral.referringWorker
                      : ""
                  }
                  onChange={(event) => {
                    setReferralDetails({
                      referringWorker: event.target.value,
                      referralDate: caseDetails.caseReferral.referralDate,
                      referringWorkerContact:
                        caseDetails.caseReferral.referringWorkerContact,
                      familyName: caseDetails.caseReferral.familyName,
                      cpinFileNumber: caseDetails.caseReferral.cpinFileNumber,
                      cpinFileType: caseDetails.caseReferral.cpinFileType,
                    });
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
        onClick={async () => {
          const updatedData: {
            changedData: Record<string, string>;
            intakeID: number;
          } = {
            changedData: {
              intake_status: selectedOption,
              referring_worker_name: caseDetails.caseReferral.referringWorker,
              intake_meeting_notes: meetingNotes,
            },
            intakeID: caseId,
          };
          const updatedFrontend: {
            changedData: Record<string, string>;
            intakeID: number;
          } = {
            changedData: {
              intakeStatus: selectedOption,
              referringWorkerName: caseDetails.caseReferral.referringWorker,
              intakeMeetingNote: meetingNotes,
            },
            intakeID: caseId,
          };
          await IntakeAPIClient.put(updatedData);
          onClick(updatedFrontend);
          onClose();
        }}
        disabled={selectedOption === ""}
        primaryButtonTitle="Save"
        isOpen={isOpen}
        onClose={onClose}
        unsavedProgressModal={false}
      />
    </Box>
  );
};

export default StatusModal;
