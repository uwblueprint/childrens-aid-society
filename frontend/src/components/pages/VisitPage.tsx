import React from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { ArrowLeft } from "react-feather";
// import { useParams } from "react-router-dom";

const Visit = (): React.ReactElement => {
  // url is /visit/caseId/visitId, commented for now to avoid lint
  // const params = useParams();
  return (
    <>
      <Box bg="gray.50" style={{ padding: "50px 100px 25px 100px" }}>
        <Text color="gray.600" textStyle="title-small">
          Case management
        </Text>
        <Flex>
          <Heading textStyle="display-medium">New Visit Log</Heading>
        </Flex>
      </Box>
      <Box
        width="100%"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          pt="10"
          gap="24"
        >
          <Box
            width="15%"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1vh",
              fontWeight: "bold",
            }}
          >
            <Box
              padding="0 0 30px 0"
              fontWeight="bold"
              display="flex"
              gap="8px"
            >
              <Button variant="ghost" width="fit-content">
                <ArrowLeft /> Save and Exit {/* TODO implement save and exit */}
              </Button>
            </Box>
            <Button variant="ghost" width="fit-content">
              <Text fontWeight="bold">Child Information</Text>
            </Button>
            <Button variant="ghost" width="fit-content">
              <Text fontWeight="bold">Visit Timestamp</Text>
            </Button>
            <Button variant="ghost" width="fit-content">
              <Text fontWeight="bold">Attendance</Text>
            </Button>
            <Button variant="ghost" width="fit-content">
              <Text fontWeight="bold">Transportation</Text>
            </Button>
            <Button variant="ghost" width="fit-content">
              <Text fontWeight="bold">Child and Family Support Worker</Text>
            </Button>
          </Box>
          <Box
            width="35%"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3vh",
            }}
          >
            <Text textStyle="header-medium">Child Information</Text>
            <Text textStyle="header-medium">Visit Timestamp</Text>
            <Text textStyle="header-medium">Attendance</Text>
            <Text textStyle="header-medium">Transportation</Text>
            <Text textStyle="header-medium">Notes</Text>
            <Text textStyle="header-medium">
              Child and Family Support Worker
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Visit;
