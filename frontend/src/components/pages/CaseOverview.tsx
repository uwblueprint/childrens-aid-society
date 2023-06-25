import React from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { ArrowLeft, UserPlus } from "react-feather";
import IntakeHeader from "../intake/IntakeHeader";
import CaseOverviewFooter from "../intake/CaseOverviewFooter";
import colors from "../../theme/colors";

const SecondaryHeader = (): React.ReactElement => {
  return (
    <Box>
      <Button variant="ghost">
        <ArrowLeft style={{ width: "50px", height: "50px" }} />
      </Button>

      <Flex pt="10" mt="-7">
        <div>
          <b color={colors.black.default} style={{ fontSize: "12px" }}>
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
            <Button
              backgroundColor="#f8fcfc"
              color="#8397c0"
              borderColor="#8397c0"
              variant="outline"
            >
              Save
            </Button>
          </div>
        </div>
      </Flex>

      <div style={{ paddingBottom: "100px" }}>
        <Flex direction="row" justifyContent="space-between" gap="10">
          <Flex direction="column" flex="1">
            <Flex pt="50">
              <h1 style={{ fontSize: "23px", fontWeight: 600 }}>Children</h1>
            </Flex>

            <Box
              border="1px"
              borderColor={colors.gray[100]}
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
              <b style={{ fontSize: "20px", fontWeight: 500 }}>
                <p style={{ color: colors.gray[700] }}>
                  There are no children under this case
                </p>
              </b>

              <Button
                color={colors.blue[400]}
                variant="outline"
                position="absolute"
                bottom="4"
                right="4"
                borderColor={colors.blue[300]}
                backgroundColor={colors.blue[100]}
              >
                <div style={{ paddingRight: "10px" }}>
                  <UserPlus width="13px" />
                </div>
                Add Child
              </Button>
            </Box>

            <Flex pt="50">
              <h1 style={{ fontSize: "23px", fontWeight: 600 }}>
                Visiting Family
              </h1>
            </Flex>
            <Box
              border="1px"
              borderColor={colors.gray[100]}
              borderRadius="md"
              p="4"
              mt="4"
              h="200px"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <b style={{ fontSize: "20px", fontWeight: 500 }}>
                <p style={{ color: colors.gray[700] }}>
                  There are no visiting families under this case
                </p>
              </b>

              <Button
                color={colors.blue[400]}
                variant="outline"
                position="absolute"
                bottom="4"
                right="4"
                borderColor={colors.blue[300]}
                backgroundColor={colors.blue[100]}
              >
                <div style={{ paddingRight: "10px" }}>
                  <UserPlus width="13px" />
                </div>
                Add visiting family
              </Button>
            </Box>

            <Flex pt="50">
              <h1 style={{ fontSize: "23px", fontWeight: 600 }}>
                Intake Information
              </h1>
            </Flex>

            <Box
              border="1px"
              borderColor={colors.gray[100]}
              borderRadius="md"
              p="4"
              mt="4"
              h="200px" // Adjust the height value here
              position="relative"
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-end"
              flexDirection="column"
            >
              <span style={{ marginBottom: "100px" }}>
                {/* TODO// implement design to dynamically change the email information */}
                <p>By First Last@example.com</p>
                <p>Date</p>
              </span>

              <Button
                color="#00287D"
                variant="outline"
                position="absolute"
                bottom="4"
                right="4"
                borderColor={colors.blue[300]}
                backgroundColor={colors.blue[100]}
                width="100px"
              >
                View
              </Button>
            </Box>
          </Flex>

          <Flex direction="column" flex="1" mt="-200">
            <Flex pt="50">
              <h1 style={{ fontSize: "23px", fontWeight: 600 }}>
                Visit Cadence
              </h1>
            </Flex>
            <Box
              border="1px"
              borderColor={colors.gray[100]}
              borderRadius="md"
              p="4"
              mt="4"
              h="250px"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              maxWidth="550px"
            >
              <b style={{ fontSize: "20px", fontWeight: 500 }}>
                <p style={{ color: colors.gray[700] }}>
                  There are no visit cadences under this case
                </p>
              </b>

              <Button
                color={colors.blue[400]}
                variant="outline"
                position="absolute"
                bottom="4"
                right="4"
                borderColor={colors.blue[300]}
                backgroundColor={colors.blue[100]}
                width="100px"
              >
                Add
              </Button>
            </Box>

            <Flex pt="50">
              <h1 style={{ fontSize: "23px", fontWeight: 600 }}>Visitation</h1>
            </Flex>
            <Box
              border="1px"
              borderColor={colors.gray[100]}
              borderRadius="md"
              p="4"
              mt="4"
              h="250px"
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              maxWidth="550px"
            >
              <b style={{ fontSize: "20px", fontWeight: 500 }}>
                <p style={{ color: colors.gray[700] }}>
                  There are no past visits under this case
                </p>
              </b>

              <Button
                color={colors.blue[400]}
                variant="outline"
                position="absolute"
                bottom="4"
                right="4"
                borderColor={colors.blue[300]}
                backgroundColor={colors.blue[100]}
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
      <CaseOverviewFooter />
    </Box>
  );
};

export default CaseOverview;
