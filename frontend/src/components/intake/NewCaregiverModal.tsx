import React, { useState } from "react";
import { Box, Icon, SimpleGrid, FormLabel, Select } from "@chakra-ui/react";
import { Calendar, Navigation, Phone, User } from "react-feather";
import ModalComponent from "../common/ModalComponent";
import CustomInput from "../common/CustomInput";
import OptionalLabel from "./OptionalLabel";

export type CaregiverDetails = {
  caregiverName: string;
  dateOfBirth: string;
  primaryPhoneNo: string;
  secondaryPhoneNo?: string;
  contactNotes?: string;
  address: string;
  relationship: string;
  indivConsiderations?: string;
};

export type Caregivers = CaregiverDetails[];

type NewCaregiverProps = {
  isOpen: boolean;
  onClick: (newCaregiver: CaregiverDetails) => void;
  onClose: () => void;
};

const NewCaregiverModal = ({
  isOpen,
  onClick,
  onClose,
}: NewCaregiverProps): React.ReactElement => {
  const [caregiverName, setCaregiverName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [primaryPhoneNo, setPrimaryPhoneNo] = useState("");
  const [secondaryPhoneNo, setSecondaryPhoneNo] = useState("");
  const [contactNotes, setContactNotes] = useState("");
  const [address, setAddress] = useState("");
  const [relationship, setRelationship] = useState("");
  const [indivConsiderations, setIndivConsiderations] = useState("");

  return (
    <Box>
      <ModalComponent
        primaryTitle="New Caregiver"
        modalContent={
          <Box>
            <SimpleGrid columns={2} spacingX="3rem" spacingY="0.75rem">
              <Box>
                <FormLabel htmlFor="caregiverName">NAME</FormLabel>
                <CustomInput
                  id="caregiverName"
                  name="caregiverName"
                  type="string"
                  placeholder="Enter full name of caregiver..."
                  icon={<Icon as={User} />}
                  onChange={(event) => {
                    setCaregiverName(event.target.value);
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="dateOfBirth">DATE OF BIRTH</FormLabel>
                <CustomInput
                  id="caregiverFileNumber"
                  name="caregiverFileNumber"
                  type="string"
                  placeholder="YYYY-MM-DD"
                  icon={<Icon as={Calendar} />}
                  onChange={(event) => {
                    setDateOfBirth(event.target.value);
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="primaryPhoneNumber">
                  PRIMARY PHONE NUMBER
                </FormLabel>
                <CustomInput
                  id="primaryPhoneNumber"
                  name="primaryPhoneNumber"
                  type="string"
                  placeholder="e.g. 555-555-5555"
                  icon={<Icon as={Phone} />}
                  onChange={(event) => {
                    setPrimaryPhoneNo(event.target.value);
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="secondaryPhoneNumber">
                  SECONDARY PHONE NUMBER <OptionalLabel />
                </FormLabel>
                <CustomInput
                  id="secondaryPhoneNumber"
                  name="secondaryPhoneNumber"
                  type="string"
                  placeholder="e.g. 555-555-5555"
                  icon={<Icon as={Phone} />}
                  onChange={(event) => {
                    setSecondaryPhoneNo(event.target.value);
                  }}
                />
              </Box>
            </SimpleGrid>
            <Box marginTop="0.75rem">
              <FormLabel htmlFor="address">
                ADDITIONAL CONTACT NOTES <OptionalLabel />
              </FormLabel>
              <CustomInput
                id="contactNotes"
                name="contactNotes"
                type="string"
                placeholder="Note any preferences or additional channels of communication."
                height="10rem"
                paddingBottom="7rem"
                onChange={(event) => {
                  setContactNotes(event.target.value);
                }}
              />
            </Box>
            <SimpleGrid columns={2} spacingX="3rem" spacingY="0.75rem">
              <Box marginTop="0.75rem">
                <FormLabel htmlFor="address">ADDRESS</FormLabel>
                <CustomInput
                  id="address"
                  name="address"
                  placeholder="Enter address of caregiver..."
                  icon={<Icon as={Navigation} />}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </Box>
              <Box marginTop="0.75rem">
                <FormLabel htmlFor="address">
                  RELATIONSHIP TO CHILD(REN)
                </FormLabel>
                <Select
                  placeholder="Select caregiver's relationship to child(ren)"
                  onChange={(event) => {
                    setRelationship(event.target.value);
                  }}
                >
                  <option>TO DO:</option>
                  <option>Add proper list options</option>
                </Select>
              </Box>
            </SimpleGrid>
            <Box marginTop="0.75rem">
              <FormLabel htmlFor="address">
                INDIVIDUAL CONSIDERATIONS <OptionalLabel />
              </FormLabel>
              <CustomInput
                id="contactNotes"
                name="contactNotes"
                type="string"
                placeholder="Note any caregiver needs for case consideration, ex. special needs, cultural needs."
                height="10rem"
                paddingBottom="7rem"
                onChange={(event) => {
                  setIndivConsiderations(event.target.value);
                }}
              />
            </Box>
          </Box>
        }
        onClick={() => {
          const newCaregiver: CaregiverDetails = {
            caregiverName,
            dateOfBirth,
            primaryPhoneNo,
            secondaryPhoneNo,
            contactNotes,
            address,
            relationship,
            indivConsiderations,
          };
          onClick(newCaregiver);
          onClose();
        }} // empty for now
        isOpen={isOpen}
        onClose={() => {
          setCaregiverName("");
          setDateOfBirth("");
          setPrimaryPhoneNo("");
          setSecondaryPhoneNo("");
          setContactNotes("");
          setAddress("");
          setRelationship("");
          setIndivConsiderations("");
          onClose();
        }}
        disabled={
          !(
            caregiverName &&
            dateOfBirth &&
            primaryPhoneNo &&
            address &&
            relationship
          )
        }
        secondaryTitle="Individual Details"
        primaryButtonTitle="Save caregiver"
      />
    </Box>
  );
};

export default NewCaregiverModal;
