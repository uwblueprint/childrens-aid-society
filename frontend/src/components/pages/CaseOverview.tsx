import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, UserPlus } from "react-feather";
import IntakeHeader from "../intake/IntakeHeader";
import CaseOverviewFooter from "../overview/CaseOverviewFooter";
import colors from "../../theme/colors";
import VisitCadenceModal from "../dashboard/VisitCadenceModal";
import intakeAPIClient from "../../APIClients/IntakeAPIClient";
import AddChild from "../intake/child-information/AddChildPage";
import { Children } from "../../types/ChildTypes";
import { Providers } from "../intake/NewProviderModal";
import OverviewSection from "../../types/OverviewSection";
import CaseStatus from "../../types/CaseStatus";
import childAPIClient from "../../APIClients/ChildAPIClient";

type OverviewBodyProps = {
  setSectionIndex: React.Dispatch<React.SetStateAction<number>>;
  childrens: Children;
  setSelectedIndexChild: React.Dispatch<React.SetStateAction<number>>;
};

const CaseOverviewBody = ({
  setSectionIndex,
  childrens,
  setSelectedIndexChild,
}: OverviewBodyProps): React.ReactElement => {
  const [leadName, setLeadName] = useState("");
  const history = useHistory();

  const {
    onOpen: onOpenVisitCadenceModal,
    isOpen: isOpenVisitCadenceModal,
    onClose: onCloseVisitCadenceModal,
  } = useDisclosure();

  // TODO switch this with proper intake data passing
  const goToIntake = () => {
    history.push("/intake");
  };

  const goToHomepage = () => {
    history.push("/");
  };
  const goToAddChild = () => {
    setSelectedIndexChild(-1);
    setSectionIndex(OverviewSection.CHILD_SECTION);
  };
  const goToEditChild = (index: number) => {
    setSelectedIndexChild(index);
    setSectionIndex(OverviewSection.CHILD_SECTION);
  };
  const changeLead = async () => {
    const intakeID = 1; // TODO replace with actual intake id
    const changedData: Record<string, string> = {
      lead_access_worker_name: leadName,
    };
    try {
      const result = await intakeAPIClient.put({ changedData, intakeID });
      return result;
    } catch (error) {
      return error;
    }
  };

  return (
    <Box>
      <Button variant="ghost" onClick={goToHomepage}>
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
            <Input
              variant="filled"
              placeholder="Search name"
              value={leadName}
              onChange={(event) => setLeadName(event.target.value)}
            />
            <Button
              backgroundColor="#f8fcfc"
              color="#8397c0"
              borderColor="#8397c0"
              variant="outline"
              disabled={leadName === ""}
              onClick={() => {
                changeLead();
              }}
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
            alignItems={childrens.length === 0 ? "center" : "flex-start"}
            justifyContent={childrens.length === 0 ? "center" : "flex-start"}
            flexDirection="column"
          >
            <>
              {childrens.map((child, index) => {
                return (
                  <Box
                    borderBottomWidth="1px"
                    borderColor={colors.gray[100]}
                    p="3"
                    key={index}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    onClick={() => goToEditChild(index)}
                  >
                    <Text
                      style={{
                        color: colors.black.default,
                        fontSize: "20px",
                        fontWeight: 500,
                      }}
                    >
                      {child.childDetails.childName}
                    </Text>
                    <Icon
                      as={ArrowRight}
                      w="25px"
                      h="25px"
                      color={colors.blue[400]}
                    />
                  </Box>
                );
              })}

              {childrens.length === 0 && (
                <Text
                  style={{
                    color: colors.gray[700],
                    fontSize: "20px",
                    fontWeight: 500,
                  }}
                >
                  There are no children under this case
                </Text>
              )}
            </>

            <Button
              color={colors.blue[400]}
              variant="outline"
              position="absolute"
              bottom="4"
              right="4"
              borderColor={colors.blue[300]}
              backgroundColor={colors.blue[100]}
              onClick={goToAddChild}
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
              onClick={goToIntake}
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
              onClick={onOpenVisitCadenceModal}
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
      <VisitCadenceModal
        caseNumber={1} // TODO pass actual case data
        status="ARCHIVED"
        isOpen={isOpenVisitCadenceModal}
        onClick={() => {}}
        onClose={onCloseVisitCadenceModal}
        onDeleteClick={() => {}}
        goToIntake={goToIntake}
        childName="Anne Chovy"
      />
    </Box>
  );
};

const CaseOverview = (): React.ReactElement => {
  const [sectionIndex, setSectionIndex] = useState(0);

  const [allProviders, setAllProviders] = useState<Providers>([]);
  const [children, setChildren] = useState<Children>([]);
  const [selectedIndexChild, setSelectedIndexChild] = useState(-1);

  const caseId = 1;

  useEffect(() => {
    const fetchData = async () => {
      const childrenData = await childAPIClient.get(caseId);
      const childProviders: Providers = [];

      for (let i = 0; i < childrenData.length; i += 1) {
        for (let x = 0; x < childrenData[i].providers.length; x += 1) {
          childProviders.push(childrenData[i].providers[x]);
        }
      }
      console.log(childProviders);
      console.log(childrenData);
      setAllProviders(childProviders);
      setChildren(childrenData);
    };

    fetchData();
  }, []);

  switch (sectionIndex) {
    case OverviewSection.MAIN_SECTION: {
      return (
        <Box>
          <IntakeHeader
            primaryTitle="Case Name"
            secondaryTitle="Case Management"
            hasLogout
          />
          <Box px="100px" pt="60px">
            <div style={{ paddingBottom: "100px" }}>
              <CaseOverviewBody
                setSectionIndex={setSectionIndex}
                childrens={children}
                setSelectedIndexChild={setSelectedIndexChild}
              />
            </div>
          </Box>
          <CaseOverviewFooter />
        </Box>
      );
    }
    case OverviewSection.CHILD_SECTION: {
      return (
        <AddChild
          allProviders={allProviders}
          setAllProviders={setAllProviders}
          childrens={children}
          setChildren={setChildren}
          setStep={setSectionIndex}
          selectedIndexChild={selectedIndexChild}
          referrer="caseOverview"
        />
      );
    }
    default: {
      return <Text>Error</Text>;
    }
  }
};

export default CaseOverview;
