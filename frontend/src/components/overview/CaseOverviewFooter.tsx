import React from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { FileText } from "react-feather";
import ArchiveCaseModal from "../dashboard/ArchiveCaseModal";

export type CaseOverviewFooterProps = {
  nextButtonRef?: React.RefObject<HTMLButtonElement>;
  showClearPageBtn?: boolean;
  nextStepCallBack: () => void;
  clearFields?: () => void;
};

const CaseOverviewFooter = (): React.ReactElement => {
  const {
    onOpen: onOpenArchiveCaseModal,
    isOpen: isOpenArchiveCaseModal,
    onClose: onCloseArchiveCaseModal,
  } = useDisclosure();

  // style pdf document
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  // place dynamic data into document here
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );

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
      <PDFDownloadLink document={<MyDocument />} fileName="fee_acceptance.pdf">
        {({ loading }) => (loading ? "Loading document..." : "Download now!")}
        <Button onClick={() => {}}>
          <FileText width="13px" />
          <Box pl="2">Generate Report (PDF)</Box>
        </Button>
      </PDFDownloadLink>

      <Button
        width={{ sm: "95vw", md: "45vw", lg: "auto" }}
        height="38px"
        variant="delete"
        // TODO add isLoading={}
        onClick={onOpenArchiveCaseModal}
      >
        <FileText width="13px" />
        <Box pl="2">Archive Case</Box>
      </Button>
      <ArchiveCaseModal
        intakeID={1} // TODO add isLoading
        isOpen={isOpenArchiveCaseModal}
        onClose={onCloseArchiveCaseModal}
        caseName="Case 1"
      />
    </Flex>
  );
};

export default CaseOverviewFooter;
