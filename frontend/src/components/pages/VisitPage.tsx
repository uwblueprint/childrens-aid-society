import React, { useState } from "react";
import {useParams} from 'react-router-dom'
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { ArrowLeft, User } from "react-feather";
import ChildInfoForm, { ChildDetails } from "../visit/ChildInfoForm";
import VisitTimestampForm, { VisitDetails } from "../visit/VisitTimestampForm";
import AttendanceForm, { AttendanceEntries } from "../visit/AttendanceForm";
import TransportationForm, {
  TransportationEntries,
} from "../visit/TransportationForm";
import CustomInput from "../common/CustomInput";
import OptionalLabel from "../intake/OptionalLabel";
import VisitFormFooter from "../visit/VisitFormFooter";

const Visit = (): React.ReactElement => {
  const { caseId } = useParams<{ caseId: string}>();
  const caseNumber: number = parseInt(caseId, 10);

  const DEFAULT_CHILD_DETAILS = {
    familyName: "",
    children: [],
    childServiceWorker: "",
    childProtectionWorker: "",
    fosterCareCoordinator: "",
  };

  // Attendance Sheet

  const DEFAULT_VISIT_DETAILS = {
    visitDate: "",
    visitDay: "",
    visitSupervision: "",
    startTime: "",
    endTime: "",
    location: "",
  };

  // Attendance Records

  const DEFAULT_ATTENDANCE_DETAILS = {
    entries: [
      {
        visitingMembers: "",
        visitorRelationship: "",
        description: "",
        visitingMemberName: "",
        visitAttendance: "",
        absenceReason: "",
      },
    ],
  };

  // Visting Member

  const DEDAULT_TRANSPORTATION_DETAILS = {
    entries: [
      {
        gaurdian: "",
        name: "",
        duration: "",
      },
    ],
  };

  // Transportation
  const [childDetails, setChildDetails] = useState<ChildDetails>(
    DEFAULT_CHILD_DETAILS,
  );

  const [visitDetails, setVisitDetails] = useState<VisitDetails>(
    DEFAULT_VISIT_DETAILS,
  );

  const [attendanceEntries, setAttendanceEntries] = useState<AttendanceEntries>(
    DEFAULT_ATTENDANCE_DETAILS,
  );

  const [transportationEntries, setTransportationEntries] =
    useState<TransportationEntries>(DEDAULT_TRANSPORTATION_DETAILS);

  const scrollToHeader = (headerId: string) => {
    const headerElement = document.getElementById(headerId);

    if (headerElement) {
      headerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        marginBottom="125px"
        zIndex="1"
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
                <ArrowLeft /> Save and Exit
              </Button>
            </Box>
            <Button
              variant="ghost"
              width="fit-content"
              onClick={() => scrollToHeader("childInformation")}
            >
              <Text fontWeight="bold">Child Information</Text>
            </Button>
            <Button
              variant="ghost"
              width="fit-content"
              onClick={() => scrollToHeader("visitTimestamp")}
            >
              <Text fontWeight="bold">Visit Timestamp</Text>
            </Button>
            <Button
              variant="ghost"
              width="fit-content"
              onClick={() => scrollToHeader("attendance")}
            >
              <Text fontWeight="bold">Attendance</Text>
            </Button>
            <Button
              variant="ghost"
              width="fit-content"
              onClick={() => scrollToHeader("transportation")}
            >
              <Text fontWeight="bold">Transportation</Text>
            </Button>
            <Button
              variant="ghost"
              width="fit-content"
              onClick={() => scrollToHeader("childFamilySupportWorker")}
            >
              <Text fontWeight="bold">Child and Family Support Worker</Text>
            </Button>
          </Box>
          <Box
            width="60%"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3vh",
            }}
          >
            <Text textStyle="header-medium" id="childInformation">
              Child Information
            </Text>
            <ChildInfoForm
              childDetails={childDetails}
              setChildDetails={setChildDetails}
              readOnly={false}
            />
            <Text textStyle="header-medium" id="visitTimestamp">
              Visit Timestamp
            </Text>
            <VisitTimestampForm
              visitDetails={visitDetails}
              setVisitDetails={setVisitDetails}
              readOnly={false}
            />
            <Text textStyle="header-medium" id="attendance">
              Attendance
            </Text>
            <AttendanceForm
              attendanceEntries={attendanceEntries}
              setAttendanceEntries={setAttendanceEntries}
              readOnly={false}
            />
            <Text textStyle="header-medium" id="transportation">
              Transportation
            </Text>
            <TransportationForm
              transportationEntries={transportationEntries}
              setTransportationEntries={setTransportationEntries}
              readOnly={false}
            />
            <Text textStyle="header-medium">Notes</Text>
            <Box>
              <FormLabel htmlFor="visitNotes">
                VISITATION NOTES <OptionalLabel />
              </FormLabel>
              <CustomInput
                id="visitNotes"
                type="string"
                placeholder="Note any additional information in regards to this visit."
                height="10rem"
                paddingBottom="7rem"
              />
            </Box>
            <Text textStyle="header-medium" id="childFamilySupportWorker">
              Child and Family Support Worker
            </Text>
            <Box>
              <FormLabel htmlFor="">CHILD AND FAMILY SUPPORT WORKER</FormLabel>
              <CustomInput
                id="childFamilySupportWorker"
                name="childFamilySupportWorker"
                type="string"
                placeholder="Enter name of child and family support worker"
                icon={<Icon as={User} />}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="">CHILD AND FAMILY SUPPORT WORKER</FormLabel>
              <CustomInput
                id="childFamilySupportWorker"
                name="childFamilySupportWorker"
                type="string"
                placeholder="Enter name of child and family support worker"
                icon={<Icon as={User} />}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="">CHILD AND FAMILY SUPPORT WORKER</FormLabel>
              <CustomInput
                id="childFamilySupportWorker"
                name="childFamilySupportWorker"
                type="string"
                placeholder="Enter name of child and family support worker"
                icon={<Icon as={User} />}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <VisitFormFooter 
        childDetails={childDetails}
        visitDetails={visitDetails}
        attendanceEntries={attendanceEntries}
        transportationEntries={transportationEntries}
      />
    </>
  );
};

export default Visit;
