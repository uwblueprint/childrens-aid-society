import React, { useEffect, useState } from "react";
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
  caregiver: CaregiverDetails;
};

const NewCaregiverModal = ({
  isOpen,
  onClick,
  onClose,
  caregiver,
}: NewCaregiverProps): React.ReactElement => {
  const [caregiverName, setCaregiverName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [primaryPhoneNo, setPrimaryPhoneNo] = useState("");
  const [secondaryPhoneNo, setSecondaryPhoneNo] = useState("");
  const [contactNotes, setContactNotes] = useState("");
  const [address, setAddress] = useState("");
  const [relationship, setRelationship] = useState("");
  const [indivConsiderations, setIndivConsiderations] = useState("");

  const handleClose = () => {
    setCaregiverName("");
    setDateOfBirth("");
    setPrimaryPhoneNo("");
    setSecondaryPhoneNo("");
    setContactNotes("");
    setAddress("");
    setRelationship("");
    setIndivConsiderations("");
    onClose();
  };

  useEffect(() => {
    if (caregiver) {
      setCaregiverName(caregiver.caregiverName);
      setDateOfBirth(caregiver.dateOfBirth);
      setPrimaryPhoneNo(caregiver.primaryPhoneNo);

      if (caregiver.secondaryPhoneNo !== undefined) {
        setSecondaryPhoneNo(caregiver.secondaryPhoneNo);
      }
      if (caregiver.contactNotes !== undefined) {
        setContactNotes(caregiver.contactNotes);
      }
      setAddress(caregiver.address);
      setRelationship(caregiver.relationship);
      if (caregiver.indivConsiderations !== undefined) {
        setIndivConsiderations(caregiver.indivConsiderations);
      }
    }
  }, [caregiver]);

  return (
    <Box>
      <ModalComponent
        primaryTitle="New Visiting Family Member"
        modalContent={
          <Box>
            <SimpleGrid columns={2} spacingX="3rem" spacingY="0.75rem">
              <Box>
                <FormLabel htmlFor="caregiverName">NAME</FormLabel>
                <CustomInput
                  id="caregiverName"
                  name="caregiverName"
                  type="string"
                  placeholder="Enter full name of visiting family member..."
                  defaultValue={caregiver ? caregiver.caregiverName : ""}
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
                  defaultValue={caregiver ? caregiver.dateOfBirth : ""}
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
                  defaultValue={caregiver ? caregiver.primaryPhoneNo : ""}
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
                  defaultValue={caregiver ? caregiver.secondaryPhoneNo : ""}
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
                defaultValue={caregiver ? caregiver.contactNotes : ""}
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
                  placeholder="Enter address of visiting family member..."
                  defaultValue={caregiver ? caregiver.address : ""}
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
                  placeholder="Select relationship to child(ren)"
                  onChange={(event) => {
                    setRelationship(event.target.value);
                  }}
                  defaultValue={caregiver ? caregiver.relationship : ""}
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
                placeholder="Note any visiting family member needs for case consideration, ex. special needs, cultural needs."
                defaultValue={caregiver ? caregiver.indivConsiderations : ""}
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
          handleClose();
        }}
        isOpen={isOpen}
        onClose={() => {
          handleClose();
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
        primaryButtonTitle="Save visiting family member"
      />
    </Box>
  );
};

export default NewCaregiverModal;
