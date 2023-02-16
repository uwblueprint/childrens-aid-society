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
};

const NewProviderModal = ({
  isOpen,
  onClick,
  onClose,
}: NewProviderProps): React.ReactElement => {
  const [providerName, setProviderName] = useState("");
  const [providerFileNo, setProviderFileNo] = useState("");
  const [primaryPhoneNo, setPrimaryPhoneNo] = useState("");
  const [secondaryPhoneNo, setSecondaryPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [contactNotes, setContactNotes] = useState("");
  const [address, setAddress] = useState("");
  const [relationship, setRelationship] = useState("");

  const handleClose = () => {
    setProviderName("");
    setProviderFileNo("");
    setPrimaryPhoneNo("");
    setSecondaryPhoneNo("");
    setEmail("");
    setContactNotes("");
    setAddress("");
    setRelationship("");
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
                  icon={<Icon as={User} />}
                  onChange={(event) => {
                    setProviderName(event.target.value);
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
                  icon={<Icon as={File} />}
                  onChange={(event) => {
                    setProviderFileNo(event.target.value);
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
              <Box>
                <FormLabel htmlFor="email">
                  EMAIL <OptionalLabel />
                </FormLabel>
                <CustomInput
                  id="email"
                  name="email"
                  type="string"
                  placeholder="Enter email address of provider"
                  icon={<Icon as={Mail} />}
                  onChange={(event) => {
                    setEmail(event.target.value);
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
                  icon={<Icon as={Navigation} />}
                  onChange={(event) => {
                    setAddress(event.target.value);
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
            <Box marginTop="0.75rem">
              <FormLabel htmlFor="address">
                RELATIONSHIP TO CHILD(REN)
              </FormLabel>
              <CustomInput
                id="relationship"
                name="relationship"
                type="string"
                placeholder="Describe provider's relationship to children"
                onChange={(event) => {
                  setRelationship(event.target.value);
                }}
              />
            </Box>
          </Box>
        }
        onClick={() => {
          const newProvider: ProviderDetails = {
            providerName,
            providerFileNo,
            primaryPhoneNo,
            secondaryPhoneNo,
            email,
            contactNotes,
            address,
            relationship,
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
            providerName &&
            providerFileNo &&
            primaryPhoneNo &&
            address &&
            relationship
          )
        }
        secondaryTitle="Individual Details"
        primaryButtonTitle="Add provider"
      />
    </Box>
  );
};

export default NewProviderModal;
