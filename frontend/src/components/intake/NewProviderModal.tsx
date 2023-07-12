import React, { useState } from "react";
import { Box, Icon, SimpleGrid, FormLabel } from "@chakra-ui/react";
import { File, Mail, Navigation, Phone, User } from "react-feather";
import ModalComponent from "../common/ModalComponent";
import CustomInput from "../common/CustomInput";
import OptionalLabel from "./OptionalLabel";

export type ProviderDetails = {
  providerName: string;
  providerFileNo: string;
  primaryPhoneNo: string;
  secondaryPhoneNo?: string;
  email?: string;
  contactNotes?: string;
  address: string;
  relationship: string;
};

export type Providers = ProviderDetails[];

type NewProviderProps = {
  isOpen: boolean;
  onClick: (newProvider: ProviderDetails) => void;
  onClose: () => void;
  provider: ProviderDetails;
};

const NewProviderModal = ({
  isOpen,
  onClick,
  onClose,
  provider,
}: NewProviderProps): React.ReactElement => {
  const [providerName, setProviderName] = useState("");
  const [providerFileNo, setProviderFileNo] = useState("");
  const [primaryPhoneNo, setPrimaryPhoneNo] = useState("");
  const [secondaryPhoneNo, setSecondaryPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [contactNotes, setContactNotes] = useState("");
  const [address, setAddress] = useState("");
  const [relationship, setRelationship] = useState("");

  const [providerNameChanged, setProviderNameChanged] = useState(false);
  const [providerFileNoChanged, setProviderFileNoChanged] = useState(false);
  const [primaryPhoneNoChanged, setPrimaryPhoneNoChanged] = useState(false);
  const [secondaryPhoneNoChanged, setSecondaryPhoneNoChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [contactNotesChanged, setContactNotesChanged] = useState(false);
  const [addressChanged, setAddressChanged] = useState(false);
  const [relationshipChanged, setRelationshipChanged] = useState(false);

  const handleClose = () => {
    setProviderName("");
    setProviderFileNo("");
    setPrimaryPhoneNo("");
    setSecondaryPhoneNo("");
    setEmail("");
    setContactNotes("");
    setAddress("");
    setRelationship("");

    setProviderNameChanged(false);
    setProviderFileNoChanged(false);
    setPrimaryPhoneNoChanged(false);
    setSecondaryPhoneNoChanged(false);
    setEmailChanged(false);
    setContactNotesChanged(false);
    setAddressChanged(false);
    setRelationshipChanged(false);
    onClose();
  };

  return (
    <Box>
      <ModalComponent
        primaryTitle="New Provider"
        modalContent={
          <Box>
            <SimpleGrid columns={2} spacingX="3rem" spacingY="0.75rem">
              <Box>
                <FormLabel htmlFor="providerName">NAME</FormLabel>
                <CustomInput
                  id="providerName"
                  name="providerName"
                  type="string"
                  placeholder="Enter full name of provider..."
                  defaultValue={provider ? provider.providerName : ""}
                  icon={<Icon as={User} />}
                  onChange={(event) => {
                    setProviderName(event.target.value);
                    setProviderNameChanged(true);
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="providerFileNumber">
                  PROVIDER FILE NUMBER
                </FormLabel>
                <CustomInput
                  id="providerFileNumber"
                  name="providerFileNumber"
                  type="string"
                  placeholder="e.g. 123456789"
                  defaultValue={provider ? provider.providerFileNo : ""}
                  icon={<Icon as={File} />}
                  onChange={(event) => {
                    setProviderFileNo(event.target.value);
                    setProviderFileNoChanged(true);
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
                  defaultValue={provider ? provider.primaryPhoneNo : ""}
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
                  defaultValue={provider ? provider.secondaryPhoneNo : ""}
                  icon={<Icon as={Phone} />}
                  onChange={(event) => {
                    setSecondaryPhoneNo(event.target.value);
                    setSecondaryPhoneNoChanged(true);
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="email">
                  EMAIL <OptionalLabel />
                </FormLabel>
                <CustomInput
                  id="email"
                  name="email"
                  type="string"
                  placeholder="Enter email address of provider"
                  defaultValue={provider ? provider.email : ""}
                  icon={<Icon as={Mail} />}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailChanged(true);
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="address">ADDRESS</FormLabel>
                <CustomInput
                  id="address"
                  name="address"
                  type="string"
                  placeholder="Enter address of provider"
                  defaultValue={provider ? provider.address : ""}
                  icon={<Icon as={Navigation} />}
                  onChange={(event) => {
                    setAddress(event.target.value);
                    setAddressChanged(true);
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
                defaultValue={provider ? provider.contactNotes : ""}
                height="10rem"
                paddingBottom="7rem"
                onChange={(event) => {
                  setContactNotes(event.target.value);
                  setContactNotesChanged(true);
                }}
              />
            </Box>
            <Box marginTop="0.75rem">
              <FormLabel htmlFor="address">
                RELATIONSHIP TO CHILD(REN)
              </FormLabel>
              <CustomInput
                id="relationship"
                name="relationship"
                type="string"
                placeholder="Describe provider's relationship to children"
                defaultValue={provider ? provider.relationship : ""}
                onChange={(event) => {
                  setRelationship(event.target.value);
                  setRelationshipChanged(true);
                }}
              />
            </Box>
          </Box>
        }
        onClick={() => {
          const newProvider: ProviderDetails = {
            providerName: providerNameChanged
              ? providerName
              : provider.providerName,
            providerFileNo: providerFileNoChanged
              ? providerFileNo
              : provider.providerFileNo,
            primaryPhoneNo: primaryPhoneNoChanged
              ? primaryPhoneNo
              : provider.primaryPhoneNo,
            secondaryPhoneNo: secondaryPhoneNoChanged
              ? secondaryPhoneNo
              : provider.secondaryPhoneNo,
            email: emailChanged ? email : provider.email,
            contactNotes: contactNotesChanged
              ? contactNotes
              : provider.contactNotes,
            address: addressChanged ? address : provider.address,
            relationship: relationshipChanged
              ? relationship
              : provider.relationship,
          };
          onClick(newProvider);
          handleClose();
        }}
        isOpen={isOpen}
        onClose={() => {
          handleClose();
        }}
        disabled={
          !(
            (providerNameChanged ? providerName : provider?.providerName) &&
            (providerFileNoChanged
              ? providerFileNo
              : provider?.providerFileNo) &&
            (primaryPhoneNoChanged
              ? primaryPhoneNo
              : provider?.primaryPhoneNo) &&
            (addressChanged ? address : provider?.address) &&
            (relationshipChanged ? relationship : provider?.relationship)
          )
        }
        secondaryTitle="Individual Details"
        primaryButtonTitle={
          provider?.providerName &&
          provider?.providerFileNo &&
          provider?.primaryPhoneNo &&
          provider?.address &&
          provider?.relationship
            ? "Save provider"
            : "Add provider"
        }
      />
    </Box>
  );
};

export default NewProviderModal;
