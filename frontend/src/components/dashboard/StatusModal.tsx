import React, { useState } from "react";
import {
  Box,
  Flex,
  Select,
  Text,
  Button,
  FormLabel,
  SimpleGrid,
} from "@chakra-ui/react";

import ModalComponent from "../common/ModalComponent";

import CustomInput from "../common/CustomInput";
import OptionalLabel from "../intake/OptionalLabel";

export type StatusModalProps = {
  caseNumber?: number;
  status?: string;
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
  onDeleteClick: () => void;
};

const StatusModal = ({
  caseNumber,
  status,
  isOpen,
  onClose,
  onClick,
  onDeleteClick,
}: StatusModalProps): React.ReactElement => {
  const [selectedOption, setSelectedOption] = useState(status);
  const [workerName, setWorkerName] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");

  return (
    <Box>
      <ModalComponent
        primaryTitle={`Case ${caseNumber}`}
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
                >
                  Review
                </Button>
              </Flex>
            </Box>
            <SimpleGrid columns={2} spacingX="3rem" spacingY="0.75rem">
              <Box>
                {" "}
                {/* TODO: Need to change status dropdown */}
                <FormLabel htmlFor="status">STATUS</FormLabel>
                <Select
                  id="status"
                  placeholder={selectedOption || "Select an option"}
                  value={selectedOption}
                  onChange={(event) => {
                    setSelectedOption(event.target.value);
                  }}
                >
                  <option value="SUBMITTED" style={{ color: "red" }}>
                    SUBMITTED
                  </option>
                  <option value="PENDING" style={{ color: "orange" }}>
                    PENDING
                  </option>
                  <option value="ACTIVE" style={{ color: "green" }}>
                    ACTIVE
                  </option>
                  <option value="ARCHIVED" style={{ color: "gray" }}>
                    ARCHIVED
                  </option>
                </Select>
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
        disabled={selectedOption === "" || workerName === ""}
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
