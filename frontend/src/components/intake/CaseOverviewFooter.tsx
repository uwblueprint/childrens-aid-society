import React from "react";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
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
      justify="flex-end"
      flexWrap="wrap"
      padding="20px"
      left="0"
      position="fixed"
      bottom="0"
      zIndex="5"
    >
      <Button
        height="38px"
        onClick={() => {
          // TODO: Handle generate report logic
        }}
      >
        <div style={{ paddingRight: "10px" }}>
          <FileText width="13px" />
        </div>
        Generate Report (PDF)
      </Button>
      <Box flex="1" /> {/* Spacer element */}
      <Button
        width={{ sm: "95vw", md: "45vw", lg: "auto" }}
        height="38px"
        background={colors.red[600]}
        // isLoading={}
        onClick={() => {}}
      >
        <div style={{ paddingRight: "10px" }}>
          <FileText width="13px" />
        </div>
        <Box pr="5px">Archive Case</Box>
      </Button>
    </Flex>
  );
};

export default CaseOverviewFooter;
