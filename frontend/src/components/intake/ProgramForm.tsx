import React from "react";
import {
  FormControl,
  Text,
  Icon,
  SimpleGrid,
  Box,
  FormLabel,
} from "@chakra-ui/react";
import {
  Truck,
  Clipboard,
  Calendar,
  CheckSquare,
  TrendingUp,
  ChevronDown,
} from "react-feather";
import { Field, Form, FormikProvider, useFormik } from "formik";
import CustomInput from "../common/CustomInput";
import OptionalLabel from "./OptionalLabel";
import { CustomSelectField } from "./CustomSelectField";
import Stepper from "./Stepper";
import IntakeSteps from "./intakeSteps";
// eslint-disable-next-line import/no-cycle
import IntakeFooter from "./IntakeFormFooter";
import MultiTextInput from "../common/MultiTextInput";

export type ProgramDetails = {
  transportationRequirements: string;
  schedulingRequirements: string;
  suggestedStartDate: string;
  shortTermGoals: string[];
  longTermGoals: string[];
  familialConcerns: string[];
};

type ProgramFormProps = {
  programDetails: ProgramDetails;
  setProgramDetails: React.Dispatch<React.SetStateAction<ProgramDetails>>;
  nextStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  readOnly?: boolean;
  hideStepper?: boolean;
  hideFooter?: boolean;
};

const shortTermGoalsOptions = [
  "Caregiver(s) attend consistently",
  "Caregiver(s) attend sober",
  "Caregiver(s) have positive, meaningful, and engaging access visits",
  "Caregiver(s) refrain from physical discipline",
  "Caregiver(s) demonstrate age appropriate parenting skills",
  "Caregiver(s) demonstrates/meets the child(ren) medical / mental health needs",
];

const longTermGoalsOptions = [
  "Caregiver(s) encourages child(ren) to meet age appropriate physical and cognitive skills",
  "Caregiver(s) engage appropriately with their support system (ie. approved visitors)",
  "Caregiver(s) appropriately encourages child(ren) to demonstrate age appropriate social skills",
  "Caregiver(s) appropriately mitigates family conflict (ie. sibiling conflict, parent/child conflict)",
  "Caregiver(s) demonstrates appropriate communication skills (ie. parent/child, parent/parent)",
  "Caregiver(s) mental/physical health has minimal impact on parenting/family functioning during visits",
  "Caregiver(s) cultural differences has minimal impact on parenting/family functioning during visits",
];

const ProgramForm = ({
  programDetails,
  setProgramDetails,
  nextStep,
  setStep,
  readOnly = false,
  hideStepper,
  hideFooter,
}: ProgramFormProps): React.ReactElement => {
  const onSubmit = (values: ProgramDetails) => {
    setProgramDetails(values);
    nextStep();
  };

  const formik = useFormik({
    initialValues: programDetails,
    onSubmit: (values: ProgramDetails) => {
      onSubmit(values);
    },
  });

  const onNextStep = () => {
    nextStep();
    setProgramDetails(formik.values);
  };

  const onClear = () => {
    formik.setValues({
      transportationRequirements: "",
      schedulingRequirements: "",
      suggestedStartDate: "",
      shortTermGoals: [],
      longTermGoals: [],
      familialConcerns: [],
    });
  };

  return (
    <>
      {!hideStepper && (
        <Stepper
          pages={[
            "Case referral",
            "Court information",
            "Individual details",
            "Program details",
          ]}
          setStep={setStep}
          activePage={IntakeSteps.PROGRAM_DETAILS}
          onClickCallback={() => {
            setProgramDetails(formik.values);
          }}
        />
      )}
      <FormikProvider value={formik}>
        <Form>
          <Text textAlign="left" textStyle="title-medium">
            Logistic Needs
          </Text>
          <FormControl>
            <SimpleGrid columns={3} spacing="30px">
              <Box>
                <FormLabel htmlFor="transportationRequirements">
                  TRANSPORTATION REQUIREMENTS
                </FormLabel>
                <CustomSelectField
                  name="transportationRequirements"
                  id="transportationRequirements"
                  options={[
                    "Agency driver needed",
                    "Kin provider will transport",
                    "Foster provider will transport",
                  ]}
                  placeholder="Select an option..."
                  icon={<Icon as={Truck} />}
                  iconRight={<Icon as={ChevronDown} />}
                  readOnly={readOnly}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="schedulingRequirements">
                  SCHEDULING REQUIREMENTS
                </FormLabel>
                <CustomSelectField
                  name="schedulingRequirements"
                  id="schedulingRequirements"
                  placeholder="Select an option..."
                  options={[
                    "Weekly and time",
                    "Weekly after school",
                    "Standard (2x per week)",
                  ]}
                  icon={<Icon as={Clipboard} />}
                  iconRight={<Icon as={ChevronDown} />}
                  readOnly={readOnly}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="suggestedStartDate">
                  SUGGESTED START DATE
                </FormLabel>
                <Field
                  disabled={readOnly}
                  as={CustomInput}
                  name="suggestedStartDate"
                  id="suggestedStartDate"
                  type="string"
                  placeholder="DD/MM/YYYY"
                  icon={<Icon as={Calendar} />}
                />
              </Box>
            </SimpleGrid>
            <Text textAlign="left" paddingTop="35px" textStyle="title-medium">
              Program goals
            </Text>
            <SimpleGrid columns={2} spacing="30px">
              <Box>
                <FormLabel htmlFor="shortTermGoals">SHORT-TERM GOALS</FormLabel>
                <MultiTextInput
                  name="shortTermGoals"
                  placeholder="Select goals..."
                  options={shortTermGoalsOptions}
                  icon={<Icon as={CheckSquare} />}
                  isReadOnly={readOnly}
                  values={programDetails.shortTermGoals}
                  newValue={(e: string[]) =>
                    setProgramDetails((prevState) => ({
                      ...prevState,
                      shortTermGoals: e,
                    }))
                  }
                />
              </Box>
              <Box>
                <FormLabel htmlFor="longTermGoals">LONG-TERM GOALS</FormLabel>
                <MultiTextInput
                  name="longTermGoals"
                  placeholder="Select goals..."
                  options={longTermGoalsOptions}
                  icon={<Icon as={TrendingUp} />}
                  isReadOnly={readOnly}
                  values={programDetails.longTermGoals}
                  newValue={(e: string[]) => {
                    setProgramDetails((prevState) => ({
                      ...prevState,
                      longTermGoals: e,
                    }));
                  }}
                />
              </Box>
            </SimpleGrid>
            <Box paddingTop="10px">
              <FormLabel htmlFor="familialConcerns">
                FAMILIAL CONCERNS <OptionalLabel />
              </FormLabel>
              <MultiTextInput
                name="familialConcerns"
                placeholder="Select familial concerns..."
                options={[
                  "abc",
                  "abcdef",
                  "def",
                  "ghi",
                  "sdfg",
                  "dfgh",
                  "345g6",
                  "asfjiod",
                  "45v2te ercew",
                  " sdf sd fas a",
                ]} // TODO: Replace with actual options
                isReadOnly={readOnly}
                values={programDetails.familialConcerns}
                newValue={(e: string[]) =>
                  setProgramDetails((prevState) => ({
                    ...prevState,
                    familialConcerns: e,
                  }))
                }
              />
            </Box>
          </FormControl>
        </Form>
      </FormikProvider>
      {!hideFooter && (
        <IntakeFooter
          nextButtonText="Review case details"
          showClearPageBtn
          isStepComplete={() => true} // TODO: validate form
          registrationLoading={false}
          nextStepCallBack={onNextStep}
          clearFields={onClear}
        />
      )}
    </>
  );
};

export default ProgramForm;
