import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, UserPlus } from "react-feather";
import IntakeHeader from "../intake/IntakeHeader";
import CaseOverviewFooter from "../overview/CaseOverviewFooter";
import colors from "../../theme/colors";
import VisitCadenceModal from "../dashboard/VisitCadenceModal";
import intakeAPIClient from "../../APIClients/IntakeAPIClient";
import AddChild from "../intake/child-information/AddChildPage";
import { Providers } from "../intake/NewProviderModal";
import childAPIClient from "../../APIClients/ChildAPIClient";
import NewCaregiverModal from "../intake/NewCaregiverModal";
import { Children } from "../../types/ChildTypes";
import CaregiverAPIClient from "../../APIClients/CaregiverAPIClient";
import { Caregivers, CaregiverDetails } from "../../types/CaregiverDetailTypes";
import CasePromptBox, {
  IndividualDetailsOverview,
} from "../overview/CasePromptBox";
import OverviewSection from "../../types/OverviewSection";

interface CaseOverviewData {
  caregiversList: Caregivers;
  childrenList: Children;
  providerList: Providers;
}

type OverviewBodyProps = {
  setSectionIndex: React.Dispatch<React.SetStateAction<number>>;
  caseData: CaseOverviewData;
  setCaseData: React.Dispatch<React.SetStateAction<CaseOverviewData>>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  caseNumber: number;
};

const CaseOverviewBody = ({
  setSectionIndex,
  caseData,
  setCaseData,
  selectedIndex,
  setSelectedIndex,
  caseNumber,
}: OverviewBodyProps): React.ReactElement => {
  const history = useHistory();

  const { state } = useLocation<{ caseLead: string }>();
  const { caseLead } = state;

  const [leadName, setLeadName] = useState(caseLead);

  const dummyCaregiver = {
    intakeId: 1,
    caregiverName: "",
    dateOfBirth: "",
    email: "",
    primaryPhoneNo: "",
    secondaryPhoneNo: "",
    contactNotes: "",
    address: "",
    relationship: "",
    indivConsiderations: "",
  };
  const {
    onOpen: onOpenAddCaregiver,
    isOpen: isOpenNewCaregiverModal,
    onClose: onCloseNewCaregiverModal,
  } = useDisclosure();

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

  const changeLead = async () => {
    const intakeID = caseNumber;
    const changedData: Record<string, string> = {
      referringWorkerName: leadName,
    };
    try {
      const result = await intakeAPIClient.put({ changedData, intakeID });
      return result;
    } catch (error) {
      return error;
    }
  };

  const mapCaregiversToCaregiverDetailsOverview = (
    caregivers: Caregivers,
  ): IndividualDetailsOverview[] => {
    if (caregivers.length > 0) {
      return caregivers.map((caregiver) => ({
        name: caregiver.caregiverName,
      }));
    }
    return [];
  };

  const onClickNewCaregiver = (newCaregiver: CaregiverDetails) => {
    const list = caseData.caregiversList;
    if (selectedIndex >= 0) {
      list.splice(selectedIndex, 1, newCaregiver);
      setCaseData({
        ...caseData,
        caregiversList: [...list],
      });
    } else {
      setCaseData({
        ...caseData,
        caregiversList: [...list, newCaregiver],
      });
    }
  };

  const mapChildrenToChildrenDetailsOverview = (
    childrens: Children,
  ): IndividualDetailsOverview[] => {
    if (childrens.length > 0) {
      return childrens.map((child) => ({
        name: child.childDetails.childName,
      }));
    }
    return [];
  };

  const onClickChildren = () => {
    setSectionIndex(OverviewSection.CHILD_SECTION);
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
          <CasePromptBox
            descriptionText="No children under this case"
            buttonText="Add Child"
            buttonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
            onButtonClick={onClickChildren}
            individualDetails={mapChildrenToChildrenDetailsOverview(
              caseData.childrenList,
            )}
            setSelectedIndex={setSelectedIndex}
          />
          <Flex pt="50">
            <Text style={{ fontSize: "23px", fontWeight: 600 }}>
              Visiting Family
            </Text>
          </Flex>
          <CasePromptBox
            descriptionText="No visiting families under this case"
            buttonText="Add Visiting Family"
            buttonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
            onButtonClick={onOpenAddCaregiver}
            individualDetails={mapCaregiversToCaregiverDetailsOverview(
              caseData.caregiversList,
            )}
            setSelectedIndex={setSelectedIndex}
          />

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
        caseNumber={caseNumber}
        status="ARCHIVED"
        isOpen={isOpenVisitCadenceModal}
        onClick={() => {}}
        onClose={onCloseVisitCadenceModal}
        onDeleteClick={() => {}}
        goToIntake={goToIntake}
        childName="Anne Chovy"
      />
      <NewCaregiverModal
        isOpen={isOpenNewCaregiverModal}
        onClick={onClickNewCaregiver}
        onClose={onCloseNewCaregiverModal}
        caregiver={
          selectedIndex >= 0
            ? caseData.caregiversList[selectedIndex]
            : dummyCaregiver
        }
      />
    </Box>
  );
};

const CaseOverview = (): React.ReactElement => {
  const [sectionIndex, setSectionIndex] = useState(0);

  const [allProviders, setAllProviders] = useState<Providers>([]);
  const [children, setChildren] = useState<Children>([]);

  const { id } = useParams<{ id: string }>();
  const caseNumber: number = parseInt(id, 10);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [caseData, setCaseData] = useState<CaseOverviewData>({
    caregiversList: [],
    childrenList: [],
    providerList: [],
  });

  const setProviderList = (newProviders: Providers) => {
    setCaseData({ ...caseData, providerList: newProviders });
  };

  const setChildrenList = (newChildren: Children) => {
    setCaseData({ ...caseData, childrenList: newChildren });
  };

  useEffect(() => {
    const fetchData = async () => {
      const childrenData = await childAPIClient.get(caseNumber);
      const caregivers = await CaregiverAPIClient.getById(caseNumber);

      const childProviders: Providers = [];

      for (let i = 0; i < childrenData.length; i += 1) {
        for (let x = 0; x < childrenData[i].providers.length; x += 1) {
          childProviders.push(childrenData[i].providers[x]);
        }
      }

      setCaseData({
        ...caseData,
        caregiversList: caregivers,
        childrenList: childrenData,
        providerList: childProviders,
      });
    };

    fetchData();
  }, []);

  switch (sectionIndex) {
    case OverviewSection.MAIN_SECTION: {
      return (
        <Box>
          <IntakeHeader
            primaryTitle={`Case ${caseNumber}`}
            secondaryTitle="Case Management"
            hasLogout
          />
          <Box px="100px" pt="60px">
            <div style={{ paddingBottom: "100px" }}>
              <CaseOverviewBody
                setSectionIndex={setSectionIndex}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                caseNumber={caseNumber}
                caseData={caseData}
                setCaseData={setCaseData}
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
          allProviders={caseData.providerList}
          setAllProviders={setProviderList}
          childrens={caseData.childrenList}
          setChildren={setChildrenList}
          setStep={setSectionIndex}
          selectedIndexChild={selectedIndex}
          setSelectedIndexChild={setSelectedIndex}
          referrer="caseOverview"
          caseNumber={caseNumber}
        />
      );
    }
    default: {
      return <Text>Error</Text>;
    }
  }
};

export default CaseOverview;
