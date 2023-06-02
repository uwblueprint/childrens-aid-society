import React from "react";
import { Box, Button, Flex, Input, IconButton } from "@chakra-ui/react";
import { ArrowLeft, UserPlus, Archive, FileText } from "react-feather";
import IntakeHeader from "../intake/IntakeHeader";
import CaseOverviewFooter from "../intake/CaseOverviewFooter";

const SecondaryHeader = (): React.ReactElement => {
  return (
    <Box>
      <Button variant="ghost">
        <ArrowLeft />
      </Button>

      <Flex pt="10">
        <div>
          <b style={{ color: "#45464F", fontSize: "12px" }}>
            CHILDREN SERVICES OR KINSHIP WORKER
          </b>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "20px",
            }}
          >
            <Input variant="filled" placeholder="Search name" />
            <Button color="#F7F7FF" variant="outline">
              <span style={{ color: "#8093BE" }}>Save</span>
            </Button>
          </div>
        </div>
      </Flex>

      <div style={{ paddingBottom: "100px" }}>
        <Flex direction="row" justifyContent="space-between" gap="10">
          <Flex direction="column" flex="1">
            <Flex pt="50">
              <p>hi</p>
              hellow
              <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Children</h1>
            </Flex>

            <Box
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              p="4"
              mt="4"
              h="250px"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <b>There are no children under this case</b>

              <Button
                color="#00287D"
                variant="outline"
                position="absolute"
                bottom="4"
                right="4"
                borderColor="#00287D"
                backgroundColor="#EFF0FF"
              >
                <div style={{ paddingRight: "10px" }}>
                  <UserPlus width="13px" />
                </div>
                Add Child
              </Button>
            </Box>

            <Flex pt="50">
              <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Visiting Family
              </h1>
            </Flex>
            <Box
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              p="4"
              mt="4"
              h="250px"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <b>There are no visiting families under this case</b>

              <Button
                color="#00287D"
                variant="outline"
                position="absolute"
                bottom="4"
                right="4"
                borderColor="#00287D"
                backgroundColor="#EFF0FF"
              >
                <div style={{ paddingRight: "10px" }}>
                  <UserPlus width="13px" />
                </div>
                Add visiting family
              </Button>
            </Box>

            <Flex pt="50">
              <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Intake Information
              </h1>
            </Flex>

            <Box
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              p="4"
              mt="4"
              h="250px"
              position="relative"
              display="flex"
              alignItems="left"
              flexDirection="column"
            >
              <p>By FirstLast@example.com</p>
              <p>Date</p>

              <Button
                color="#00287D"
                variant="outline"
                position="absolute"
                bottom="4"
                right="4"
                borderColor="#00287D"
                backgroundColor="#EFF0FF"
              >
                View
              </Button>
            </Box>
          </Flex>

          <Flex direction="column" flex="1" mt="-100">
            <Flex pt="50">
              <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Visit Cadence
              </h1>
            </Flex>
            <Box
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              p="4"
              mt="4"
              h="250px"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <b>There are no visit cadences under this case</b>

              <Button
                color="#00287D"
                variant="outline"
                position="absolute"
                bottom="4"
                right="4"
                borderColor="#00287D"
                backgroundColor="#EFF0FF"
              >
                Add
              </Button>
            </Box>

            <Flex pt="50">
              <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Visitation
              </h1>
            </Flex>
            <Box
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              p="4"
              mt="4"
              h="250px"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <b>There are no past visits under this case</b>

              <Button
                color="#00287D"
                variant="outline"
                position="absolute"
                bottom="4"
                right="4"
                borderColor="#00287D"
                backgroundColor="#EFF0FF"
              >
                <div style={{ paddingRight: "10px" }}>
                  <UserPlus width="13px" />
                </div>
                Add new visit
              </Button>
            </Box>
          </Flex>
        </Flex>
      </div>
    </Box>
  );
};

const CaseOverview = (): React.ReactElement => {
  return (
    <Box>
      <IntakeHeader
        primaryTitle="Case Name"
        secondaryTitle="Case Management"
        hasLogout
      />
      <Box px="100px" pt="60px">
        <div style={{ paddingBottom: "100px" }}>
          <SecondaryHeader />
        </div>
      </Box>
      <CaseOverviewFooter
        isStepComplete={() => true}
        registrationLoading={false}
        nextStepCallBack={() => {}}
      />
    </Box>
  );
};

export default CaseOverview;
