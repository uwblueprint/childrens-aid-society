import React from "react";
import {
  Button,
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
  UserPlus,
  ChevronDown,
} from "react-feather";
import { Field, Form, Formik } from "formik";
import CustomInput from "../common/CustomInput";
import OptionalLabel from "./OptionalLabel";
import { CustomSelectField } from "./CustomSelectField";

export type ProgramDetails = {
  transportationRequirements: string;
  schedulingRequirements: string;
  suggestedStartDate: string;
  shortTermGoals: string;
  longTermGoals: string;
  familialConcerns: string;
};

type ProgramFormProps = {
  programDetails: ProgramDetails;
  setProgramDetails: React.Dispatch<React.SetStateAction<ProgramDetails>>;
  nextStep: () => void;
  prevStep: () => void;
};

const ProgramForm = ({
  programDetails,
  setProgramDetails,
  nextStep,
  prevStep,
}: ProgramFormProps): React.ReactElement => {
  const onSubmit = (values: ProgramDetails) => {
    setProgramDetails(values);
  };

  return (
    <Formik initialValues={programDetails} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
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
                />
              </Box>
              <Box>
                <FormLabel htmlFor="suggestedStartDate">
                  SUGGESTED START DATE
                </FormLabel>
                <Field
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
              <Field
                as={CustomInput}
                // TODO change to multi-list selector component
                id="familialConcerns"
                name="familialConcerns"
                placeholder="Select familial concerns..."
              />
            </Box>
          </FormControl>
          <Box display="flex" justifyContent="space-between" paddingTop="35px">
            <Text alignSelf="start" textStyle="title-medium">
              Other permitted individuals
            </Text>
            <Button
              alignSelf="end"
              leftIcon={<Icon as={UserPlus} />}
              variant="secondary"
              mr={2}
            >
              Add
            </Button>
          </Box>
          <Button
            onClick={() => {
              handleSubmit();
              prevStep();
            }}
          >
            Previous Button
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              nextStep();
            }}
          >
            Next Button
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProgramForm;
