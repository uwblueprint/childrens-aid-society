import React from "react";
import { Box, Icon, SimpleGrid, FormLabel } from "@chakra-ui/react";
import { File, Mail, Navigation, Phone, User } from "react-feather";
import ModalComponent from "../common/ModalComponent";
import CustomInput from "../common/CustomInput";

type ExistingProviderProps = {
  isOpen: boolean;
  onClose: () => void;
};

const NewProviderModal = ({
  isOpen,
  onClose,
}: ExistingProviderProps): React.ReactElement => {
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
                />
              </Box>
              <Box>
                <FormLabel htmlFor="secondaryPhoneNumber">
                  SECONDARY PHONE NUMBER
                </FormLabel>
                <CustomInput
                  id="secondaryPhoneNumber"
                  name="secondaryPhoneNumber"
                  type="string"
                  placeholder="e.g. 555-555-5555"
                  icon={<Icon as={Phone} />}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="email">EMAIL (OPTIONAL)</FormLabel>
                <CustomInput
                  id="email"
                  name="email"
                  type="string"
                  placeholder="Enter email address of provider"
                  icon={<Icon as={Mail} />}
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
                />
              </Box>
            </SimpleGrid>
            <Box marginTop="0.75rem">
              <FormLabel htmlFor="address">
                ADDITIONAL CONTACT NOTES (OPTIONAL)
              </FormLabel>
              <CustomInput
                id="contactNotes"
                name="contactNotes"
                type="string"
                placeholder="Note any preferences or additional channels of communication."
                height="10rem"
                paddingBottom="7rem"
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
              />
            </Box>
          </Box>
        }
        onClick={() => {}} // empty for now
        isOpen={isOpen}
        onClose={onClose}
        secondaryTitle="Individual Details"
        primaryButtonTitle="Add provider"
      />
    </Box>
  );
};

export default NewProviderModal;
