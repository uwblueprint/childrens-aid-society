import React, { useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  SimpleGrid,
  FormControl,
  Icon,
} from "@chakra-ui/react";
import { ChevronDown, X, Plus } from "react-feather";
import ModalComponent from "../common/ModalComponent";
import CustomInput from "../common/CustomInput";
import OptionalLabel from "../intake/OptionalLabel";
import { VisitCadenceSelectField } from "./VisitCadenceSelectField";
import VisitCadenceAPIClient from "../../APIClients/VisitCadenceAPIClient";

export type VisitCadenceModalProps = {
  caseNumber?: number;
  status: string;
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
  onDeleteClick: () => void;
  goToIntake: () => void;
  childName: string;
};

const VisitCadenceModal = ({
  isOpen,
  onClose,
  onClick,
  childName,
}: VisitCadenceModalProps): React.ReactElement => {
  const [visitingFamilyMember, setVisitingFamilyMember] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("");
  const familyMembers = [
    "Mom",
    "Dad",
    "Cousin",
    "Aunt",
    "Uncle",
    "Grandpa",
    "Grandma",
  ];
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <Box>
      <ModalComponent
        primaryTitle={`Update Visit Cadence - ${childName}`}
        secondaryTitle=""
        modalContent={
          <Box>
            <FormControl>
              <FormLabel pt="15px" htmlFor="visitingFamily">
                VISITING FAMILY MEMBER
              </FormLabel>
              <VisitCadenceSelectField
                id="visitingFamily"
                name="visitingFamily"
                placeholder="Select Visiting Family Member"
                val={visitingFamilyMember}
                options={familyMembers}
                iconRight={<Icon as={ChevronDown} />}
                readOnly={false}
                setSelected={setVisitingFamilyMember}
                dropdownWidth="44.5vw"
                width="100%"
              />
            </FormControl>
            <SimpleGrid
              columns={3}
              spacingX="2.5rem"
              spacingY="0.75rem"
              mt="20px"
            >
              <Box>
                <FormControl>
                  <FormLabel pt="15px" htmlFor="date">
                    DATE
                  </FormLabel>
                  <VisitCadenceSelectField
                    dropdownWidth="13vw"
                    width="auto"
                    id="date"
                    name="date"
                    placeholder="Set Date"
                    val={date}
                    options={daysOfWeek}
                    iconRight={<Icon as={ChevronDown} />}
                    readOnly={false}
                    setSelected={setDate}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormLabel htmlFor="time">TIME</FormLabel>
                <CustomInput
                  id="time"
                  placeholder="00:00"
                  value={time}
                  rightIcon={
                    <div style={{ marginRight: "2rem", color: "#5D5E67" }}>
                      24HR
                    </div>
                  }
                  onChange={(event) => {
                    setTime(event.target.value);
                  }}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Box>
                  <FormLabel htmlFor="frequency">FREQUENCY</FormLabel>
                  <VisitCadenceSelectField
                    dropdownWidth="12vw"
                    width="12vw"
                    id="frequency"
                    name="frequency"
                    placeholder="Select"
                    val={frequency}
                    options={["Weekly", "Biweekly", "Monthly"]}
                    iconRight={<Icon as={ChevronDown} />}
                    readOnly={false}
                    setSelected={setFrequency}
                  />
                </Box>
                <Icon
                  as={X}
                  color="red"
                  cursor="pointer"
                  style={{ position: "absolute", right: "0", bottom: "18" }}
                />
              </Box>
            </SimpleGrid>
            <Button
              variant="tertiary"
              border="1px solid"
              paddingLeft="6"
              paddingRight="6"
              mt="20px"
            >
              <Icon as={Plus} cursor="pointer" />
              &nbsp;Add Another Cadence
            </Button>
            <Box marginTop="0.75rem">
              <FormLabel htmlFor="meetingNotes">
                NOTES <OptionalLabel />
              </FormLabel>
              <CustomInput
                id="meetingNotes"
                type="string"
                placeholder="Note any additional information in regards to this update."
                height="10rem"
                paddingBottom="7rem"
                value={notes}
                onChange={(event) => {
                  setNotes(event.target.value);
                }}
              />
            </Box>
          </Box>
        }
        disabled={!visitingFamilyMember || !time || !date || !frequency}
        primaryButtonTitle="Save"
        onClick={async () => {
          console.log(date, time, 6, frequency);
          console.log("hello");
          await VisitCadenceAPIClient.post(date, frequency, 6, time);
        }}
        isOpen={isOpen}
        onClose={onClose}
        unsavedProgressModal={false}
      />
    </Box>
  );
};
export default VisitCadenceModal;
