import { Box, useDisclosure, Icon, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { UserPlus } from "react-feather";
import ExistingProvider from "../ExistingProviderModal";
import NewProviderModal, {
  ProviderDetails,
  Providers,
} from "../NewProviderModal";
import PromptBox, { IndividualDetailsOverview } from "../PromptBox";

export type ChildProviderFormProps = {
  providers: Providers;
  setProviders: React.Dispatch<React.SetStateAction<Providers>>;
};

const ChildProviderForm = ({
  providers,
  setProviders,
}: ChildProviderFormProps): React.ReactElement => {
  const [providersDeleted, setProvidersDeleted] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const {
    onOpen: onOpenExistingProviders,
    isOpen: isOpenExistingProviders,
    onClose: onCloseExistingProviders,
  } = useDisclosure();
  const {
    onOpen: onOpenNewProviders,
    isOpen: isOpenNewProviders,
    onClose: onCloseNewProviders,
  } = useDisclosure();

  const onClickNewProvider = (newProvider: ProviderDetails) => {
    if (selectedIndex >= 0) {
      providers.splice(selectedIndex, 1, newProvider);
    } else {
      providers.push(newProvider);
    }
    setProviders(providers);
  };

  const deleteProvider = (index: number) => {
    providers.splice(index, 1);
    // this isn't really useful, but it helps refresh the component
    // ideally should have something useEffect, but current way of passing data does not work well with it
    setProvidersDeleted(providersDeleted + 1);
    setProviders(providers);
  };

  const providerDetailsOverview: IndividualDetailsOverview[] = providers.map(
    (provider) => {
      const individualDetail: IndividualDetailsOverview = {
        name: provider.providerName,
        fileNumber: provider.providerFileNo,
      };
      return individualDetail;
    },
  );

  const emptyProvider: ProviderDetails = {
    providerName: "",
    providerFileNo: "",
    primaryPhoneNo: "",
    secondaryPhoneNo: "",
    email: "",
    contactNotes: "",
    address: "",
    relationship: "",
  };

  return (
    <>
      <VStack padding="100px">
        <PromptBox
          headerText="Providers"
          descriptionText="At least one provider must be indicated for each child"
          buttonText="Add new provider"
          onButtonClick={onOpenNewProviders}
          secondaryButtonText="Select providers"
          secondaryButtonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
          secondaryOnButtonClick={onOpenExistingProviders}
          individualDetails={providerDetailsOverview}
          deleteIndividual={deleteProvider}
          setSelectedIndex={setSelectedIndex}
        />
        <Box>
          <ExistingProvider
            isOpen={isOpenExistingProviders}
            onClose={onCloseExistingProviders}
          />
          <NewProviderModal
            isOpen={isOpenNewProviders}
            onClick={onClickNewProvider}
            onClose={onCloseNewProviders}
            provider={
              selectedIndex >= 0 ? providers[selectedIndex] : emptyProvider
            }
          />
        </Box>
      </VStack>
    </>
  );
};

export default ChildProviderForm;
