import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { FileText } from "react-feather";
import colors from "../../theme/colors";

export type CaseOverviewFooterProps = {
  nextButtonRef?: React.RefObject<HTMLButtonElement>;
  showClearPageBtn?: boolean;
  nextStepCallBack: () => void;
  clearFields?: () => void;
};

const CaseOverviewFooter = (): React.ReactElement => {
  return (
    <Flex
      bg="gray.50"
      boxShadow="sm"
      minH="92px"
      width="100vw"
      align="center"
      justify="space-between" //
      flexWrap="wrap"
      padding="20px"
      left="0"
      position="fixed"
      bottom="0"
    >
      <Button
        onClick={() => {
          // TODO: Handle generate report logic
        }}
      >
        <FileText width="13px" />
        <Box pl="2">Generate Report (PDF)</Box>
      </Button>

      <Button
        width={{ sm: "95vw", md: "45vw", lg: "auto" }}
        height="38px"
        variant="archive"
        // background={colors.red[600]}
        // isLoading={}
        onClick={() => {}}
      >
        <FileText width="13px" />
        <Box pl="2">Archive Case</Box>
      </Button>
    </Flex>
  );
};

export default CaseOverviewFooter;
