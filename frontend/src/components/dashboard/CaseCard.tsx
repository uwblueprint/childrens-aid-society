import React from "react";
import { Box, Text, Tag, Icon, useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ArrowUpRight } from "react-feather";
import CaseStatus from "../../types/CaseStatus";
import StatusModal from "./StatusModal";
import PermanentDeleteModal from "./PermanentDeleteModal";

export type CaseCardProps = {
  caseId: number;
  caseLead: string;
  date: string;
  familyName: string;
  caseTag: CaseStatus;
};

const colorChange = (value: string) => {
  let color;
  if (value === "Active") {
    color = "green.400";
  } else if (value === "Submitted") {
    color = "blue.300";
  } else if (value === "Archived") {
    color = "gray.500";
  } else {
    color = "orange.400";
  }

  return color;
};

const CaseCard = ({
  caseId,
  caseLead,
  date,
  familyName,
  caseTag,
}: CaseCardProps): React.ReactElement => {
  const {
    onOpen: onOpenStatusModal,
    isOpen: isOpenStatusModal,
    onClose: onCloseStatusModal,
  } = useDisclosure();

  const {
    onOpen: onOpenPermanentDelete,
    isOpen: isOpenPermanentDelete,
    onClose: onClosePermanentDelete,
  } = useDisclosure();

  const history = useHistory();
  function goToIntake() {
    history.push("/intake");
  }

  return (
    <>
      <Box
        as="button"
        _hover={{ boxShadow: "md", borderWidth: "2px" }}
        paddingRight="30px"
        paddingLeft="30px"
        width="297px"
        height="289px"
        borderWidth="1px"
        borderRadius="lg"
        onClick={onOpenStatusModal}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          textStyle="title-medium"
        >
          <Text textStyle="title-medium" marginBottom="15px">
            Case {caseId}
          </Text>
          <Icon w="6" h="6" as={ArrowUpRight} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          marginBottom="10px"
        >
          <Text textStyle="body-medium" marginBottom="15px">
            {caseLead}
          </Text>
          <Text textStyle="body-medium" marginBottom="15px">
            {date}
          </Text>
          <Text textStyle="body-medium" marginBottom="25px">
            {familyName}
          </Text>
        </Box>
        <Box display="flex" justifyContent="end">
          <Tag
            pointerEvents="none"
            backgroundColor={colorChange(caseTag)}
            textColor="white"
            borderWidth="0"
            textStyle="button-medium"
          >
            {caseTag.toUpperCase()}
          </Tag>
        </Box>
      </Box>
      <PermanentDeleteModal
        isOpen={isOpenPermanentDelete}
        onClick={() => {
          // TODO: add deletion logic
          onClosePermanentDelete();
          onCloseStatusModal();
        }}
        onClose={onClosePermanentDelete}
        intakeId={2} // TODO implement so that this componet gets passed in real intakeId
      />
      <StatusModal
        caseId={caseId}
        status={caseTag.toUpperCase()}
        isOpen={isOpenStatusModal}
        onClick={() => {}}
        onClose={onCloseStatusModal}
        onDeleteClick={onOpenPermanentDelete}
        goToIntake={goToIntake}
      />
    </>
  );
};

export default CaseCard;
