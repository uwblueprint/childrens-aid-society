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
  caregiverDetails: CaregiverDetails;
  setCaregiverDetails: React.Dispatch<React.SetStateAction<CaregiverDetails>>;
};

const NewCaregiverModal = ({
  isOpen,
  onClick,
  onClose,
  caregiverDetails,
  setCaregiverDetails,
}: NewCaregiverProps): React.ReactElement => {
  const initialCaregiver = {
    caregiverName: "",
    dateOfBirth: "",
    primaryPhoneNo: "",
    secondaryPhoneNo: "",
    contactNotes: "",
    address: "",
    relationship: "",
    indivConsiderations: "",
  };

  const handleClose = () => {
    setCaregiverDetails({ ...initialCaregiver });
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
                  icon={<Icon as={User} />}
                  onChange={(event) => {
                    setCaregiverDetails((prev) => ({
                      ...prev,
                      caregiverName: event.target.value,
                    }));
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
                    setCaregiverDetails((prev) => ({
                      ...prev,
                      dateOfBirth: event.target.value,
                    }));
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
                    setCaregiverDetails((prev) => ({
                      ...prev,
                      primaryPhoneNo: event.target.value,
                    }));
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
                    setCaregiverDetails((prev) => ({
                      ...prev,
                      secondaryPhoneNo: event.target.value,
                    }));
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
                  setCaregiverDetails((prev) => ({
                    ...prev,
                    contactNotes: event.target.value,
                  }));
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
                  icon={<Icon as={Navigation} />}
                  onChange={(event) => {
                    setCaregiverDetails((prev) => ({
                      ...prev,
                      address: event.target.value,
                    }));
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
                    setCaregiverDetails((prev) => ({
                      ...prev,
                      relationship: event.target.value,
                    }));
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
                placeholder="Note any visiting family member needs for case consideration, ex. special needs, cultural needs."
                height="10rem"
                paddingBottom="7rem"
                onChange={(event) => {
                  setCaregiverDetails((prev) => ({
                    ...prev,
                    indivConsiderations: event.target.value,
                  }));
                }}
              />
            </Box>
          </Box>
        }
        onClick={() => {
          onClick(caregiverDetails);
          onClose();
        }}
        isOpen={isOpen}
        onClose={() => {
          handleClose();
        }}
        disabled={
          !(
            caregiverDetails.caregiverName &&
            caregiverDetails.dateOfBirth &&
            caregiverDetails.primaryPhoneNo &&
            caregiverDetails.address &&
            caregiverDetails.relationship
          )
        }
        secondaryTitle="Individual Details"
        primaryButtonTitle="Save visiting family member"
      />
    </Box>
  );
};

export default NewCaregiverModal;
