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
  allProviders: Providers;
  setAllProviders: React.Dispatch<React.SetStateAction<Providers>>;
};

const ChildProviderForm = ({
  providers,
  setProviders,
  allProviders,
  setAllProviders,
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
      allProviders.push(newProvider);
    }
    setProviders(providers);
    setAllProviders(allProviders);
  };

  const onClickExistingProvider = (existingProvider: ProviderDetails) => {
    providers.push(existingProvider);
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
    providerId: 0,
  };

  return (
    <>
      <VStack padding="100px">
        <PromptBox
          headerText="Providers"
          descriptionText="At least one provider must be indicated for each child"
          buttonText="Select providers"
          onButtonClick={onOpenExistingProviders}
          secondaryButtonText="Add new provider"
          secondaryButtonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
          secondaryOnButtonClick={onOpenNewProviders}
          individualDetails={providerDetailsOverview}
          deleteIndividual={deleteProvider}
          setSelectedIndex={setSelectedIndex}
          useSecondaryOnClick
        />
        <Box>
          <ExistingProvider
            isOpen={isOpenExistingProviders}
            onClick={onClickExistingProvider}
            onClose={onCloseExistingProviders}
            existingProviders={allProviders}
          />
          <NewProviderModal
            isOpen={isOpenNewProviders}
            onClick={onClickNewProvider}
            onClose={onCloseNewProviders}
            provider={
              selectedIndex >= 0 ? providers[selectedIndex] : emptyProvider
            }
            providerId={
              selectedIndex >= 0 ? selectedIndex : allProviders.length - 1
            }
          />
        </Box>
      </VStack>
    </>
  );
};

export default ChildProviderForm;
