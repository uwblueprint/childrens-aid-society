import React, { useState } from "react";
import { Box, Icon, SimpleGrid, FormLabel } from "@chakra-ui/react";
import { Calendar, ChevronDown, Navigation, Phone, User } from "react-feather";
import ModalComponent from "../common/ModalComponent";
import CustomInput from "../common/CustomInput";
import OptionalLabel from "./OptionalLabel";
import { CustomSelectNonFormik } from "./CustomSelectField";
import CaregiverAPIClient from "../../APIClients/CaregiverAPIClient";
import { CaregiverDetails } from "../../types/CaregiverDetailTypes";
import CaregiverRelationship from "../../types/CaregiverRelationship";

type NewCaregiverProps = {
  intakeId: number;
  isOpen: boolean;
  onClick: (newCaregiver: CaregiverDetails) => void;
  onClose: () => void;
  caregiver: CaregiverDetails;
};

const NewCaregiverModal = ({
  intakeId,
  isOpen,
  onClick,
  onClose,
  caregiver,
}: NewCaregiverProps): React.ReactElement => {
  // ideally refactor to have less complicated state logic
  const [caregiverName, setCaregiverName] = useState(
    caregiver ? caregiver.caregiverName : "",
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    caregiver ? caregiver.dateOfBirth : "",
  );
  const [primaryPhoneNo, setPrimaryPhoneNo] = useState(
    caregiver ? caregiver.primaryPhoneNo : "",
  );
  const [secondaryPhoneNo, setSecondaryPhoneNo] = useState(
    caregiver ? caregiver.secondaryPhoneNo : "",
  );
  const [contactNotes, setContactNotes] = useState(
    caregiver ? caregiver.contactNotes : "",
  );
  const [address, setAddress] = useState(caregiver ? caregiver.address : "");
  const [relationship, setRelationship] = useState<
    CaregiverRelationship | string
  >(caregiver ? caregiver.relationship : "");
  const [indivConsiderations, setIndivConsiderations] = useState(
    caregiver ? caregiver.indivConsiderations : "",
  );

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
  const [dateOfBirthError, setDateOfBirthError] = useState<string | null>(null);
  const [primaryPhoneNoError, setPrimaryPhoneNoError] = useState<string | null>(
    null
  );
  const [secondaryPhoneNoError, setSecondaryPhoneNoError] = useState<
    string | null
  >(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleClose = () => {
    setCaregiverName(caregiver ? caregiver.caregiverName : "");
    setDateOfBirth(caregiver ? caregiver.dateOfBirth : "");
    setPrimaryPhoneNo(caregiver ? caregiver.primaryPhoneNo : "");
    setSecondaryPhoneNo(caregiver ? caregiver.secondaryPhoneNo : "");
    setContactNotes(caregiver ? caregiver.contactNotes : "");
    setAddress(caregiver ? caregiver.address : "");
    setRelationship(caregiver ? caregiver.relationship : "");
    setIndivConsiderations(caregiver ? caregiver.indivConsiderations : "");

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

  const RelationshipToChild: Record<string, CaregiverRelationship> = {
    Other: CaregiverRelationship.OTHER,
    Sibling: CaregiverRelationship.SIBLING,
    "Biological Parent": CaregiverRelationship.BIOLOGICAL_PARENT,
    "Adoptive Parent": CaregiverRelationship.ADOPTIVE_PARENT,
    "Foster Parent": CaregiverRelationship.FOSTER_PARENT,
    "Step-Parent": CaregiverRelationship.STEP_PARENT,
    "Maternal Grandparent": CaregiverRelationship.MATERNAL_GRANDPARENT,
    "Paternal Grandparent": CaregiverRelationship.PATERNAL_GRANDPARENT,
    "Step-Sibling": CaregiverRelationship.STEP_SIBLING,
    "Half-Sibling": CaregiverRelationship.HALF_SIBLING,
    "Uncle/Aunt": CaregiverRelationship.UNCLE_AUNT,
    "Other Relative": CaregiverRelationship.OTHER_RELATIVE,
  };

  const formattedDate = (date: string): string => {
    const inputDate = new Date(date);
    inputDate.setDate(inputDate.getDate() + 1);
    const newDate = inputDate.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return newDate;
  };

  function validateDate(value: string) {
    if (!value) {
      setDateOfBirthError("Required");
    } else if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[01])$/.test(value)) {
      setDateOfBirthError("Invalid Date");
    } else {
      setDateOfBirthError(null);
    }
  }

  function validatePrimaryPhoneNo(value: string) {
    if (!value) {
      setPrimaryPhoneNoError("Required");
      setButtonDisabled(true);
    } else if (
      !/^(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4}[,]?)(\s?([E|e]xt[.]?)(\s?\d+))?/.test(
        value
      )
    ) {
      setPrimaryPhoneNoError("Invalid phone number");
      setButtonDisabled(true);
    } else {
      setPrimaryPhoneNoError(null);
      setButtonDisabled(false);
    }
  }

  function validateSecondaryPhoneNo(value: string) {
    if (
      !/^(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4}[,]?)(\s?([E|e]xt[.]?)(\s?\d+))?/.test(
        value
      )
    ) {
      setSecondaryPhoneNoError("Invalid phone number");
      setButtonDisabled(true);
    } else {
      setSecondaryPhoneNoError(null);
      setButtonDisabled(false);
    }
  }

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
                  defaultValue={
                    caregiver
                      ? caregiver.dateOfBirth &&
                      formattedDate(caregiver.dateOfBirth)
                      : ""
                  }
                  icon={<Icon as={Calendar} />}
                  onChange={(event) => {
                    setDateOfBirth(event.target.value);
                    setDateOfBirthChanged(true);
                    validateDate(event.target.value);
                  }}
                />
                {dateOfBirthError && (
                  <div style={{ color: "red" }}>{dateOfBirthError}</div>
                )}
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
                    validatePrimaryPhoneNo(event.target.value);
                  }}
                />
                {primaryPhoneNoError && (
                  <div style={{ color: "red" }}>{primaryPhoneNoError}</div>
                )}
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
                    validateSecondaryPhoneNo(event.target.value);
                  }}
                />
                {secondaryPhoneNoError && (
                  <div style={{ color: "red" }}>{secondaryPhoneNoError}</div>
                )}
              </Box>
            </SimpleGrid>
            <Box marginTop="0.75rem">
              <FormLabel htmlFor="contactnotes">
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
                <FormLabel htmlFor="relationship">
                  RELATIONSHIP TO CHILD(REN)
                </FormLabel>
                <CustomSelectNonFormik
                  name="relationship"
                  id="relationship"
                  options={[
                    // TODO: Pair with enum values or POST and PUT calls
                    "Adoptive Parent",
                    "Biological Parent",
                    "Foster Parent",
                    "Step-Parent",
                    "Maternal Grandparent",
                    "Paternal Grandparent",
                    "Sibling",
                    "Half-Sibling",
                    "Step-Sibling",
                    "Uncle/Aunt",
                    "Other Relative",
                    "Other",
                  ]}
                  placeholder="Select relationship to child(ren)"
                  iconRight={<Icon as={ChevronDown} />}
                  value={
                    relationshipChanged && relationship !== undefined
                      ? RelationshipToChild[relationship]
                      : caregiver?.relationship
                  }
                  defaultValue={caregiver ? caregiver.relationship : ""}
                  setValue={setRelationship}
                  handler={() => setRelationshipChanged(true)}
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
        onClick={async () => {
          const newCaregiver: CaregiverDetails = {
            intakeId: caregiver.intakeId,
            email: caregiver.email ? caregiver.email : "email@email.com",
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
              ? RelationshipToChild[relationship]
              : caregiver.relationship,
            indivConsiderations: indivConsiderationsChanged
              ? indivConsiderations
              : caregiver.indivConsiderations,
          };
          if (caregiver.id) {
            const madeCaregiver = await CaregiverAPIClient.put(
              caregiver.id,
              newCaregiver.intakeId,
              newCaregiver.caregiverName,
              newCaregiver.email,
              newCaregiver.dateOfBirth,
              newCaregiver.primaryPhoneNo,
              newCaregiver.relationship,
              newCaregiver.address,
              newCaregiver.secondaryPhoneNo,
              newCaregiver.indivConsiderations,
              newCaregiver.contactNotes,
            );
            const madeCaregiverDetails = {
              id: madeCaregiver.id,
              caregiverName: madeCaregiver.name,
              intakeId: madeCaregiver.intake_id,
              email: madeCaregiver.email,
              dateOfBirth: madeCaregiver.date_of_birth,
              primaryPhoneNo: madeCaregiver.primary_phone_number,
              relationship: madeCaregiver.relationship_to_child,
              address: madeCaregiver.address,
              secondaryPhoneNo: madeCaregiver.secondary_phone_number,
              indivConsiderations: madeCaregiver.individual_considerations,
              contactNotes: madeCaregiver.additional_contact_notes,
            };
            onClick(madeCaregiverDetails);
          } else {
            const madeCaregiver = await CaregiverAPIClient.post(
              intakeId,
              newCaregiver.caregiverName,
              newCaregiver.email,
              formattedDate(newCaregiver.dateOfBirth),
              newCaregiver.primaryPhoneNo,
              newCaregiver.relationship,
              newCaregiver.address,
              newCaregiver.secondaryPhoneNo,
              newCaregiver.indivConsiderations,
              newCaregiver.contactNotes,
            );
            const madeCaregiverDetails = {
              id: madeCaregiver.id,
              caregiverName: madeCaregiver.name,
              intakeId: madeCaregiver.intake_id,
              email: madeCaregiver.email,
              dateOfBirth: formattedDate(madeCaregiver.date_of_birth),
              primaryPhoneNo: madeCaregiver.primary_phone_number,
              relationship: madeCaregiver.relationship_to_child,
              address: madeCaregiver.address,
              secondaryPhoneNo: madeCaregiver.secondary_phone_number,
              indivConsiderations: madeCaregiver.individual_considerations,
              contactNotes: madeCaregiver.additional_contact_notes,
            };
            onClick(madeCaregiverDetails);
          }
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
            (relationshipChanged ? relationship : caregiver?.relationship) &&
            isButtonDisabled
          )
        }
        secondaryTitle="Individual Details"
        primaryButtonTitle="Save visiting family member"
      />
    </Box>
  );
};

export default NewCaregiverModal;
