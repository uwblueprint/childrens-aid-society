import React from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { ArrowLeft, UserPlus } from "react-feather";
import IntakeHeader from "../intake/IntakeHeader";
import CaseOverviewFooter from "../overview/CaseOverviewFooter";
import colors from "../../theme/colors";

const SecondaryHeader = (): React.ReactElement => {
  return (
    <Box>
      <Button variant="ghost">
        <ArrowLeft style={{ width: "50px", height: "50px" }} />
      </Button>

      <Flex pt="10" mt="1">
        <div>
          <Text
            fontWeight="bold"
            color={colors.black.default}
            style={{ fontSize: "12px" }}
          >
            CHILDREN SERVICES OR KINSHIP WORKER
          </Text>
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

      <Flex
        direction="row"
        justifyContent="space-between"
        gap="10"
        paddingBottom="100px"
      >
        <Flex direction="column" flex="1">
          <Flex pt="50">
            <Text style={{ fontSize: "23px", fontWeight: 600 }}>Children</Text>
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
            <Text
              style={{
                color: colors.gray[700],
                fontSize: "20px",
                fontWeight: 500,
              }}
            >
              There are no children under this case
            </Text>

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
            <Text style={{ fontSize: "23px", fontWeight: 600 }}>
              Visiting Family
            </Text>
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
            <Text
              style={{
                color: colors.gray[700],
                fontSize: "20px",
                fontWeight: 500,
              }}
            >
              There are no visiting families under this case
            </Text>

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
            <Text style={{ fontSize: "23px", fontWeight: 600 }}>
              Intake Information
            </Text>
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
            {/* TODO// implement design to dynamically change the email information */}
            <Text style={{ marginBottom: "100px" }}>
              By First Last@example.com
              <Text> Date </Text>
            </Text>

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
            <Text style={{ fontSize: "23px", fontWeight: 600 }}>
              Visit Cadence
            </Text>
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
            <Text
              style={{
                color: colors.gray[700],
                fontSize: "20px",
                fontWeight: 500,
              }}
            >
              There are no visit cadences under this case
            </Text>

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
            <Text style={{ fontSize: "23px", fontWeight: 600 }}>
              Visitation
            </Text>
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
            <Text
              style={{
                color: colors.gray[700],
                fontSize: "20px",
                fontWeight: 500,
              }}
            >
              There are no past visits under this case
            </Text>

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
