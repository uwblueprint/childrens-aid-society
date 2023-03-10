import React from "react";
import {
  Button,
  FormControl,
  Text,
  Icon,
  SimpleGrid,
  Box,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Truck,
  Clipboard,
  Calendar,
  CheckSquare,
  TrendingUp,
  UserPlus,
  ChevronDown,
} from "react-feather";
import { Field, Form, FormikProvider, useFormik } from "formik";
import CustomInput from "../common/CustomInput";
import OptionalLabel from "./OptionalLabel";
import { CustomSelectField } from "./CustomSelectField";
import Stepper from "./Stepper";
import IntakeSteps from "./intakeSteps";
import IntakeFooter from "./IntakeFormFooter";
import PermittedIndividualsModal from "./PermittedIndividualsModal";
import MultiTextInput from "../common/MultiTextInput";

export type ProgramDetails = {
  transportationRequirements: string;
  schedulingRequirements: string;
  suggestedStartDate: string;
  shortTermGoals: string;
  longTermGoals: string;
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

  const {
    onOpen: onOpenAddPermittedIndividuals,
    isOpen: isOpenAddPermittedIndividuals,
    onClose: onCloseAddPermittedIndividuals,
  } = useDisclosure();

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
                <Field
                  disabled={readOnly}
                  as={CustomInput}
                  // TODO change to multi-list selector component
                  id="shortTermGoals"
                  name="shortTermGoals"
                  placeholder="Select goals..."
                  icon={<Icon as={CheckSquare} />}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="longTermGoals">LONG-TERM GOALS</FormLabel>
                <Field
                  disabled={readOnly}
                  as={CustomInput}
                  // TODO change to multi-list selector component
                  id="longTermGoals"
                  name="longTermGoals"
                  placeholder="Select goals..."
                  icon={<Icon as={TrendingUp} />}
                />
              </Box>
            </SimpleGrid>
            <Box paddingTop="10px">
              <FormLabel htmlFor="familialConcerns">
                FAMILIAL CONCERNS <OptionalLabel />
              </FormLabel>
              <MultiTextInput
                placeholder="Select familial concerns..."
                options={["abc", "abcdef", "def", "ghi"]} // TODO: Replace with actual options
                values={programDetails.familialConcerns}
                setState={(e: string[]) =>
                  setProgramDetails((prevState) => ({
                    ...prevState,
                    familialConcerns: e,
                  }))
                }
              />
            </Box>
          </FormControl>
          <Box display="flex" justifyContent="space-between" paddingTop="35px">
            <Text alignSelf="start" textStyle="title-medium">
              Other permitted individuals
            </Text>
            {!readOnly && (
              <Button
                alignSelf="end"
                leftIcon={<Icon as={UserPlus} />}
                variant="secondary"
                mr={2}
                onClick={onOpenAddPermittedIndividuals}
              >
                Add
              </Button>
            )}
          </Box>
          <PermittedIndividualsModal
            isOpen={isOpenAddPermittedIndividuals}
            onClose={onCloseAddPermittedIndividuals}
          />
        </Form>
      </FormikProvider>
      {!hideFooter && (
        <IntakeFooter
          nextButtonText="Review case details"
          showClearPageBtn
          isStepComplete={() => true} // TODO: validate form
          registrationLoading={false}
          nextStepCallBack={onNextStep}
        />
      )}
    </>
  );
};

export default ProgramForm;
