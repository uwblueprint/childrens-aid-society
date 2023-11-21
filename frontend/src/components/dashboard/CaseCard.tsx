import React from "react";
import { Box, Text, Tag, Icon, useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ArrowUpRight } from "react-feather";
import CaseStatus from "../../types/CaseStatus";
import StatusModal from "./StatusModal";
import PermanentDeleteModal from "./PermanentDeleteModal";

export type CaseCardProps = {
  caseId: number;
  referringWorker: string;
  date: string;
  familyName: string;
  caseTag: CaseStatus;
};

const colorChange = (value: string) => {
  let color;
  if (value === "ACTIVE") {
    color = "green.400";
  } else if (value === "SUBMITTED") {
    color = "blue.300";
  } else if (value === "ARCHIVED") {
    color = "gray.500";
  } else {
    color = "orange.400";
  }

  return color;
};

const CaseCard = ({
  caseId,
  referringWorker,
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

  const goToIntake = () => {
    history.push("/intake");
  };

  // TODO refactor to display proper case data
  const onCardClick = (status: string) => {
    if (status === "ACTIVE") {
      history.push({
        pathname: `/caseoverview/${caseId}`,
        state: { referringWorker },
      });
    } else {
      onOpenStatusModal();
    }
  };

  return (
    <>
      <Box
        as="button"
        _hover={{ boxShadow: "md", borderWidth: "2px" }}
        paddingRight="30px"
        paddingLeft="30px"
        width="250px"
        height="289px"
        borderWidth="1px"
        borderRadius="lg"
        onClick={() => onCardClick(caseTag)}
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
            {referringWorker}
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
            {caseTag}
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
        intakeId={caseId}
      />
      <StatusModal
        caseId={caseId}
        status={caseTag}
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
