import React from "react";
import { Box, Text, Tag, Icon, useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ArrowUpRight } from "react-feather";
import PermanentDeleteModal from "./PermanentDeleteModal";
import StatusModal from "./StatusModal";
import { Case } from "../../types/CasesContextTypes";

export type CaseCardProps = {
  caseId: number;
  caseDetails: Case;
  intakeMeetingNotes: string;
  caseTag: string;
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
  caseDetails,
  caseTag,
  intakeMeetingNotes,
}: CaseCardProps): React.ReactElement => {
  const history = useHistory();

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

  const goToIntake = () => {
    history.push({
      pathname: "/intake",
    });
  };

  // TODO refactor to display proper case data
  const onCardClick = (status: string) => {
    if (status === "ACTIVE") {
      history.push({
        pathname: `/caseoverview/${caseId}`,
        state: `${caseDetails.caseReferral.referringWorker}`,
      });
    } else {
      onOpenStatusModal();
    }
  };

  const onClickStatusUpdate = () => {
    window.location.reload();
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
            {caseDetails.caseReferral.referringWorker}
          </Text>
          <Text textStyle="body-medium" marginBottom="15px">
            {caseDetails.caseReferral.referralDate}
          </Text>
          <Text textStyle="body-medium" marginBottom="25px">
            {caseDetails.caseReferral.familyName}
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
          onClosePermanentDelete();
          onCloseStatusModal();
          onClickStatusUpdate();
        }}
        onClose={onClosePermanentDelete}
        intakeId={caseId}
      />
      <StatusModal
        caseId={caseId}
        status={caseTag}
        caseDetails={caseDetails}
        intakeNotes={intakeMeetingNotes}
        isOpen={isOpenStatusModal}
        onClick={onClickStatusUpdate}
        onClose={onCloseStatusModal}
        onDeleteClick={onOpenPermanentDelete}
        goToIntake={goToIntake}
      />
    </>
  );
};

export default CaseCard;
