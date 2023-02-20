import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { UserPlus } from "react-feather";
import PermittedIndividualsModal, {
  PermittedIndividuals,
  PermittedIndividualsDetails,
} from "./PermittedIndividualsModal";
import PromptBox from "./PromptBox";

export type PermittedIndividualsProps = {
  permittedIndividuals: PermittedIndividuals;
  setPermittedIndividuals: React.Dispatch<
    React.SetStateAction<PermittedIndividuals>
  >;
};

const PermittedIndividualsForm = ({
  permittedIndividuals,
  setPermittedIndividuals,
}: PermittedIndividualsProps): React.ReactElement => {
  const [
    permittedIndividualsDeleted,
    setPermittedIndividualsDeleted,
  ] = useState(0);
  const {
    onOpen: onOpenAddPermittedIndividuals,
    isOpen: isOpenAddPermittedIndividuals,
    onClose: onCloseAddPermittedIndividuals,
  } = useDisclosure();

  const onClickAddPermittedIndividual = (
    newPermittedIndividual: PermittedIndividualsDetails,
  ) => {
    permittedIndividuals.push(newPermittedIndividual);
    setPermittedIndividuals(permittedIndividuals);
  };

  const deletePermittedIndividual = (index: number) => {
    permittedIndividuals.splice(index, 1);
    setPermittedIndividualsDeleted(permittedIndividualsDeleted + 1);
    setPermittedIndividuals(permittedIndividuals);
  };

  const permittedIndividualsOverview: PermittedIndividualsDetails[] = permittedIndividuals.map(
    (permittedIndividual) => {
      const individualDetail: PermittedIndividualsDetails = {
        providerName: permittedIndividual.providerName,
        phoneNo: permittedIndividual.phoneNo,
        relationshipToChild: permittedIndividual.relationshipToChild,
        additionalNotes: permittedIndividual.additionalNotes,
      };
      return individualDetail;
    },
  );

  if (permittedIndividuals.length === 0) {
    return (
      <>
        <Box display="flex" justifyContent="space-between" paddingTop="35px">
          <Text alignSelf="start" textStyle="title-medium">
            Other permitted individuals
          </Text>
          <Button
            alignSelf="end"
            leftIcon={<Icon as={UserPlus} />}
            variant="secondary"
            mr={2}
            onClick={onOpenAddPermittedIndividuals}
          >
            Add
          </Button>
        </Box>
        <PermittedIndividualsModal
          isOpen={isOpenAddPermittedIndividuals}
          onClick={onClickAddPermittedIndividual}
          onClose={onCloseAddPermittedIndividuals}
        />
      </>
    );
  }
  return (
    <>
      <Center paddingTop="35px">
        <PromptBox
          headerText="Permitted Individuals"
          descriptionText="No other permitted individuals have been added to the case yet."
          buttonText="Add permitted individuals"
          buttonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
          onButtonClick={onOpenAddPermittedIndividuals}
          permittedIndividualDetails={permittedIndividualsOverview}
          deleteIndividual={deletePermittedIndividual}
        />
        <PermittedIndividualsModal
          isOpen={isOpenAddPermittedIndividuals}
          onClick={onClickAddPermittedIndividual}
          onClose={onCloseAddPermittedIndividuals}
        />
      </Center>
    </>
  );
};

export default PermittedIndividualsForm;
