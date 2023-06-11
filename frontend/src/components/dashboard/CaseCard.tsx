import { Box, Text, Tag, Icon } from "@chakra-ui/react";
import React from "react";
import { ArrowUpRight } from "react-feather";
import CaseStatus from "../../types/CaseTypes";

export type CaseCardProps = {
  caseTitle: string;
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
  caseTitle,
  caseLead,
  date,
  familyName,
  caseTag,
}: CaseCardProps): React.ReactElement => (
  <Box
    as="button"
    _hover={{ boxShadow: "md", borderWidth: "2px" }}
    paddingRight="30px"
    paddingLeft="30px"
    width="297px"
    height="289px"
    borderWidth="1px"
    borderRadius="lg"
    onClick={
      () => {} // TODO: FINISH THIS CALLBACK
    }
  >
    <Box display="flex" justifyContent="space-between" textStyle="title-medium">
      <Text textStyle="title-medium" marginBottom="15px">
        {caseTitle}
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
);

export default CaseCard;
