import React, { useEffect, useState } from "react";
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
import { ArrowLeft, UserPlus } from "react-feather";
import IntakeHeader from "../intake/IntakeHeader";
import CaseOverviewFooter from "../overview/CaseOverviewFooter";
import colors from "../../theme/colors";
import VisitCadenceModal from "../dashboard/VisitCadenceModal";
import intakeAPIClient from "../../APIClients/IntakeAPIClient";
import NewCaregiverModal from "../intake/NewCaregiverModal";
import CaregiverAPIClient from "../../APIClients/CaregiverAPIClient";
import { Caregivers, CaregiverDetails } from "../../types/CaregiverDetailTypes";
import CasePromptBox, {
  IndividualDetailsOverview,
} from "../overview/CasePromptBox";

const CaseOverviewBody = (): React.ReactElement => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const caseNumber: number = parseInt(id, 10);

  const { state } = useLocation<{ referringWorker: string }>();
  const { referringWorker } = state;

  const [referringWorkerName, setReferringWorkerName] = useState(
    referringWorker,
  );

  const [selectedIndex, setSelectedIndex] = useState(-1);

  interface StateType {
    caregiversList: Caregivers;
    caregiversDetailsOverview: IndividualDetailsOverview[];
  }
  const [data, setData] = useState<StateType>({
    caregiversList: [],
    caregiversDetailsOverview: [],
  });

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

  const goToVisitation = () => {
    history.push(`/visits/${caseNumber}`)
  }

  const goToHomepage = () => {
    history.push("/");
  };
  const changeLead = async () => {
    const intakeID = caseNumber;
    const changedData: Record<string, string> = {
      referringWorkerName,
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
        id: caregiver.id,
      }));
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      const caregivers = await CaregiverAPIClient.getById(caseNumber);

      setData({
        caregiversList: caregivers,
        caregiversDetailsOverview: mapCaregiversToCaregiverDetailsOverview(
          caregivers,
        ),
      });
    };

    fetchData();
  }, [caseNumber]);

  const onClickNewCaregiver = (newCaregiver: CaregiverDetails) => {
    const list = data.caregiversList;
    if (selectedIndex >= 0) {
      list.splice(selectedIndex, 1, newCaregiver);
      setData({
        caregiversList: [...list],
        caregiversDetailsOverview: mapCaregiversToCaregiverDetailsOverview([
          ...list,
        ]),
      });
    } else {
      setData({
        caregiversList: [...list, newCaregiver],
        caregiversDetailsOverview: mapCaregiversToCaregiverDetailsOverview([
          ...list,
          newCaregiver,
        ]),
      });
    }
  };

  const deleteCaregiver = async (index: number, deleteId: number) => {
    const caregiverList = [...data.caregiversList];
    caregiverList.splice(index, 1);

    setData({
      caregiversList: [...caregiverList],
      caregiversDetailsOverview: mapCaregiversToCaregiverDetailsOverview([
        ...caregiverList,
      ]),
    });

    await CaregiverAPIClient.deleteCaregiver(deleteId);
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
              value={referringWorkerName}
              onChange={(event) => setReferringWorkerName(event.target.value)}
            />
            <Button
              backgroundColor="#f8fcfc"
              color="#8397c0"
              borderColor="#8397c0"
              variant="outline"
              disabled={referringWorkerName === ""}
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
          <CasePromptBox
            descriptionText="No visiting families under this case"
            buttonText="Add Visiting Family"
            buttonIcon={<Icon as={UserPlus} w="16px" h="16px" />}
            onButtonClick={onOpenAddCaregiver}
            individualDetails={data.caregiversDetailsOverview}
            setSelectedIndex={setSelectedIndex}
            deleteIndividual={deleteCaregiver}
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
              onClick={goToVisitation}
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
        intakeId={caseNumber}
        isOpen={isOpenNewCaregiverModal}
        onClick={onClickNewCaregiver}
        onClose={onCloseNewCaregiverModal}
        caregiver={
          selectedIndex >= 0
            ? data.caregiversList[selectedIndex]
            : dummyCaregiver
        }
      />
    </Box>
  );
};

const CaseOverview = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      <IntakeHeader
        primaryTitle={`Case ${id}`}
        secondaryTitle="Case Management"
        hasLogout
      />
      <Box px="100px" pt="60px">
        <div style={{ paddingBottom: "100px" }}>
          <CaseOverviewBody />
        </div>
      </Box>
      <CaseOverviewFooter />
    </Box>
  );
};

export default CaseOverview;
