import React, { useState } from "react";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { Providers, ProviderDetails } from "./NewProviderModal";
import ModalComponent from "../common/ModalComponent";

type ExistingProviderProps = {
  isOpen: boolean;
  onClick: (existingProvider: ProviderDetails) => void;
  onClose: () => void;
  existingProviders: Providers;
};

const ExistingProvider = ({
  isOpen,
  onClick,
  onClose,
  existingProviders,
}: ExistingProviderProps): React.ReactElement => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Box>
      <ModalComponent
        primaryTitle="Existing Provider"
        modalContent={
          <Box>
            {existingProviders.length > 0 ? (
              <>
                <Flex paddingBottom="15px">
                  <Text>
                    Providers previously indicated for children in this case
                    referral can be selected.
                  </Text>
                </Flex>
                <Select
                  placeholder="Select provider"
                  onChange={(event) => {
                    if (event.target.value) {
                      setIsSelected(true);
                      setSelectedIndex(event.target.selectedIndex - 1);
                    } else {
                      setIsSelected(false);
                    }
                  }}
                >
                  {existingProviders.map((provider) => (
                    <option key={provider.providerName}>
                      {provider.providerName}
                    </option>
                  ))}
                </Select>
              </>
            ) : (
              "There are no existing providers associated with this case. You will need to add a new provider and enter their details."
            )}
          </Box>
        }
        disabled={!isSelected} // if modal button disabled or not
        onClick={() => {
          if (isSelected && selectedIndex < existingProviders.length) {
            onClick(existingProviders[selectedIndex]);
          }
          setIsSelected(false);
          onClose();
        }}
        isOpen={isOpen}
        onClose={() => {
          setIsSelected(false);
          onClose();
        }}
        secondaryTitle="Individual Details"
        primaryButtonTitle="Select providers"
      />
    </Box>
  );
};

export default ExistingProvider;
