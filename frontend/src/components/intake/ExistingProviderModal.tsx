import React, { useState } from "react";
import {
  Button,
  Box,
  Select,
  Text,
  Icon,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { UserPlus } from "react-feather";
import ModalComponent from "../common/ModalComponent";

type ExistingProviderProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ExistingProvider = ({
  isOpen,
  onClose,
}: ExistingProviderProps): React.ReactElement => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Box>
      <ModalComponent
        primaryTitle="Existing Provider"
        modalContent={
          <Box>
            <Flex paddingBottom="15px">
              <Text>
                Providers previously indicated for children in this case
                referral can be selected.
              </Text>
              <Spacer />
              <Button
                size="sm"
                variant="tertiary"
                leftIcon={<Icon as={UserPlus} />}
              >
                Add new provider
              </Button>
            </Flex>
            <Select
              placeholder="Select provider"
              onChange={(event) =>
                event.target.value ? setIsSelected(true) : setIsSelected(false)
              }
            >
              <option>First Last</option>
              <option>AFirst ALast</option>
              <option>BFirst BLast</option>
              <option>CFirst CLast</option>
            </Select>
          </Box>
        }
        disabled={!isSelected} // if modal button disabled or not
        onClick={() => {}} // empty for now
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
