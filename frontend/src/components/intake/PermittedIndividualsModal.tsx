import React, { useState } from "react";
import { Box, FormLabel, Icon, SimpleGrid } from "@chakra-ui/react";
import { Phone, User } from "react-feather";
import OptionalLabel from "./OptionalLabel";
import CustomInput from "../common/CustomInput";
import ModalComponent from "../common/ModalComponent";

export type PermittedIndividualsDetails = {
  providerName: string;
  phoneNo?: string;
  relationshipToChild: string;
  additionalNotes?: string;
};

export type PermittedIndividuals = PermittedIndividualsDetails[];

type PermittedIndividualsProps = {
  isOpen: boolean;
  onClick: (newPermittedIndividual: PermittedIndividualsDetails) => void;
  onClose: () => void;
  permittedIndividual: PermittedIndividualsDetails;
};

const PermittedIndividualsModal = ({
  isOpen,
  onClick,
  onClose,
  permittedIndividual,
}: PermittedIndividualsProps): React.ReactElement => {
  const [providerName, setProviderName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [relationshipToChild, setRelationshipToChild] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [providerNameChanged, setProviderNameChanged] = useState(false);
  const [phoneNoChanged, setPhoneNoChanged] = useState(false);
  const [relationshipToChildChanged, setRelationshipToChildChanged] =
    useState(false);
  const [additionalNotesChanged, setAdditionalNotesChanged] = useState(false);

  const handleClose = () => {
    setProviderName("");
    setPhoneNo("");
    setRelationshipToChild("");
    setAdditionalNotes("");

    setProviderNameChanged(false);
    setPhoneNoChanged(false);
    setRelationshipToChildChanged(false);
    setAdditionalNotesChanged(false);

    onClose();
  };

  return (
    <Box>
      <ModalComponent
        primaryTitle="Other Permitted Individuals"
        secondaryTitle="Individual Details"
        modalContent={
          <Box>
            <SimpleGrid columns={2} spacingX="3rem" spacingY="0.75rem">
              <Box>
                <FormLabel htmlFor="providerName">NAME</FormLabel>
                <CustomInput
                  id="providerName"
                  name="providerName"
                  type="string"
                  placeholder="Enter full name of individual"
                  icon={<Icon as={User} />}
                  defaultValue={
                    permittedIndividual ? permittedIndividual.providerName : ""
                  }
                  onChange={(event) => {
                    setProviderName(event.target.value);
                    setProviderNameChanged(true);
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="phoneNo">
                  PERMITTED INDIVIDUAL PHONE <OptionalLabel />
                </FormLabel>
                <CustomInput
                  id="phoneNo"
                  name="phoneNo"
                  type="string"
                  placeholder="e.g. 555-555-5555"
                  icon={<Icon as={Phone} />}
                  defaultValue={
                    permittedIndividual ? permittedIndividual.phoneNo : ""
                  }
                  onChange={(event) => {
                    setPhoneNo(event.target.value);
                    setPhoneNoChanged(true);
                  }}
                />
              </Box>
            </SimpleGrid>
            <Box paddingTop="10px">
              <FormLabel htmlFor="relationshipToChild">
                RELATIONSHIP TO CHILD(REN)
              </FormLabel>
              <CustomInput
                id="relationshipToChild"
                name="relationshipToChild"
                type="string"
                placeholder="Note permitted individual's relationship to child(ren)..."
                defaultValue={
                  permittedIndividual
                    ? permittedIndividual.relationshipToChild
                    : ""
                }
                onChange={(event) => {
                  setRelationshipToChild(event.target.value);
                  setRelationshipToChildChanged(true);
                }}
              />
            </Box>
            <Box paddingTop="10px">
              <FormLabel htmlFor="additionalNotes">
                ADDITIONAL NOTES <OptionalLabel />
              </FormLabel>
              <CustomInput
                id="additionalNotes"
                name="additionalNotes"
                type="string"
                placeholder="Click to add notes..."
                height="10rem"
                paddingBottom="7rem"
                defaultValue={
                  permittedIndividual ? permittedIndividual.additionalNotes : ""
                }
                onChange={(event) => {
                  setAdditionalNotes(event.target.value);
                  setAdditionalNotesChanged(true);
                }}
              />
            </Box>
          </Box>
        }
        onClick={() => {
          const newPermittedIndividual: PermittedIndividualsDetails = {
            providerName: providerNameChanged
              ? providerName
              : permittedIndividual.providerName,
            phoneNo: phoneNoChanged ? phoneNo : permittedIndividual.phoneNo,
            relationshipToChild: relationshipToChildChanged
              ? relationshipToChild
              : permittedIndividual.relationshipToChild,
            additionalNotes: additionalNotesChanged
              ? additionalNotes
              : permittedIndividual.additionalNotes,
          };
          onClick(newPermittedIndividual);
          handleClose();
        }}
        isOpen={isOpen}
        onClose={() => {
          handleClose();
        }}
        disabled={
          !(
            (providerNameChanged
              ? providerName
              : permittedIndividual?.providerName) &&
            (relationshipToChildChanged
              ? relationshipToChild
              : permittedIndividual?.relationshipToChild)
          )
        }
        primaryButtonTitle="Save permitted individual"
      />
    </Box>
  );
};

export default PermittedIndividualsModal;
