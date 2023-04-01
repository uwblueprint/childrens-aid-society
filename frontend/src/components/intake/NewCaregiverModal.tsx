import React, { useState } from "react";
import { Box, Icon, SimpleGrid, FormLabel, Select } from "@chakra-ui/react";
import { Calendar, Navigation, Phone, User } from "react-feather";
import ModalComponent from "../common/ModalComponent";
import CustomInput from "../common/CustomInput";
import OptionalLabel from "./OptionalLabel";
import { CustomSelectField } from "./CustomSelectField";

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

  const [caregiverNameChanged, setCaregiverNameChanged] = useState(false);
  const [dateOfBirthChanged, setDateOfBirthChanged] = useState(false);
  const [primaryPhoneNoChanged, setPrimaryPhoneNoChanged] = useState(false);
  const [secondaryPhoneNoChanged, setSecondaryPhoneNoChanged] = useState(false);
  const [contactNotesChanged, setContactNotesChanged] = useState(false);
  const [addressChanged, setAddressChanged] = useState(false);
  const [relationshipChanged, setRelationshipChanged] = useState(false);
  const [indivConsiderationsChanged, setIndivConsiderationsChanged] = useState(
    false,
  );

  const handleClose = () => {
    setCaregiverName("");
    setDateOfBirth("");
    setPrimaryPhoneNo("");
    setSecondaryPhoneNo("");
    setContactNotes("");
    setAddress("");
    setRelationship("");
    setIndivConsiderations("");

    setCaregiverNameChanged(false);
    setDateOfBirthChanged(false);
    setPrimaryPhoneNoChanged(false);
    setSecondaryPhoneNoChanged(false);
    setContactNotesChanged(false);
    setAddressChanged(false);
    setRelationshipChanged(false);
    setIndivConsiderationsChanged(false);
    onClose();
  };

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
                    setCaregiverNameChanged(true);
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
                    setDateOfBirthChanged(true);
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
                    setPrimaryPhoneNoChanged(true);
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
                    setSecondaryPhoneNoChanged(true);
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
                  setContactNotesChanged(true);
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
                    setAddressChanged(true);
                  }}
                />
              </Box>
              <Box marginTop="0.75rem">
                <FormLabel htmlFor="address">
                  RELATIONSHIP TO CHILD(REN)
                </FormLabel>
                <CustomSelectField
                  name="relationshipToChild"
                  id="relationshipToChild"
                  options={[
                    "Foster caregiver",
                    "Kinship caregiver",
                    "Foster provider will transport",
                  ]}
                  placeholder="Select relationship to child(ren)"
                  defaultValue={caregiver ? caregiver.relationship : ""}
                  onChange={(event) => {
                    setRelationship(event.target.value);
                    setRelationshipChanged(true);
                  }}
                />
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
                  setIndivConsiderationsChanged(true);
                }}
              />
            </Box>
          </Box>
        }
        onClick={() => {
          const newCaregiver: CaregiverDetails = {
            caregiverName: caregiverNameChanged
              ? caregiverName
              : caregiver.caregiverName,
            dateOfBirth: dateOfBirthChanged
              ? dateOfBirth
              : caregiver.dateOfBirth,
            primaryPhoneNo: primaryPhoneNoChanged
              ? primaryPhoneNo
              : caregiver.primaryPhoneNo,
            secondaryPhoneNo: secondaryPhoneNoChanged
              ? secondaryPhoneNo
              : caregiver.secondaryPhoneNo,
            contactNotes: contactNotesChanged
              ? contactNotes
              : caregiver.contactNotes,
            address: addressChanged ? address : caregiver.address,
            relationship: relationshipChanged
              ? relationship
              : caregiver.relationship,
            indivConsiderations: indivConsiderationsChanged
              ? indivConsiderations
              : caregiver.indivConsiderations,
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
            (caregiverNameChanged ? caregiverName : caregiver?.caregiverName) &&
            (dateOfBirthChanged ? dateOfBirth : caregiver?.dateOfBirth) &&
            (primaryPhoneNoChanged
              ? primaryPhoneNo
              : caregiver?.primaryPhoneNo) &&
            (addressChanged ? address : caregiver?.address) &&
            (relationshipChanged ? relationship : caregiver?.relationship)
          )
        }
        secondaryTitle="Individual Details"
        primaryButtonTitle="Save visiting family member"
      />
    </Box>
  );
};

export default NewCaregiverModal;
