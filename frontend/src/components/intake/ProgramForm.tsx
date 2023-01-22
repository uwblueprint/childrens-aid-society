import React from "react";
import {
  Button,
  FormControl,
  Text,
  Icon,
  SimpleGrid,
  Box,
  FormLabel
} from "@chakra-ui/react";
import { Truck, Clipboard, Calendar, CheckSquare, TrendingUp, UserPlus} from "react-feather";
import { Field, Form, Formik } from "formik";
import CustomInput from "../common/CustomInput";

export type ProgramDetails = {
  test: string;
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
  prevStep
}: ProgramFormProps): React.ReactElement => {
  const onSubmit = (values: ProgramDetails) => {
    setProgramDetails(values);
  };

  return (
    <Formik initialValues={programDetails} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <Form>
          <Text textAlign="left" fontSize="2xl">Logistic Needs</Text>
          <FormControl>
            <SimpleGrid columns={3} spacing ="30px">
                <Box>
                  <FormLabel htmlFor="transportationRequirements">TRANSPORTATION REQUIREMENTS</FormLabel>
                  <Field
                  as={CustomInput}
                  id="transportationRequirements"
                  name="transportationRequirements"
                  type="string"
                  placeholder="Select an option..."
                  icon={<Icon as={Truck} />}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="schedulingRequirements">SCHEDULING REQUIREMENTS</FormLabel>
                    <Field
                      as={CustomInput}
                      name="schedulingRequirements"
                      id="transportationRequirements"
                      type="string"
                      placeholder="Select a start date..."
                      icon={<Icon as={Clipboard} />}
                    />
                </Box>
                <Box>
                  <FormLabel htmlFor="suggestedStartDate">SUGGESTED START DATE</FormLabel>
                    <Field
                      as={CustomInput}
                      name="suggestedStartDate"
                      id="suggestedStartDate"
                      type="string"
                      placeholder="Select a start date..."
                      icon={<Icon as={Calendar} />}
                    />
                </Box>
            </SimpleGrid>
            <Text textAlign="left" paddingTop="35px" fontSize="2xl">Program goals</Text>
            <SimpleGrid columns={2} spacing="30px">
              <Box>
                <FormLabel htmlFor="shortTermGoals">SHORT-TERM GOALS</FormLabel>
                <Field
                    as={CustomInput}
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
                    id="longTermGoals"
                    name="longTermGoals"
                    placeholder="Select goals..."
                    icon={<Icon as={TrendingUp} />}
                />
              </Box>

            </SimpleGrid>
            <Box paddingTop="10px">
              <FormLabel htmlFor="familialConcerns">FAMILIAL CONCERNS (OPTIONAL)</FormLabel>
              <Field
                as={CustomInput}
                id="familialConcerns"
                name="familialConcerns"
                placeholder="Select familial concerns..."
              />
            </Box>
          </FormControl>
          <Box display="flex" justifyContent="space-between" paddingTop="35px">
            <Text alignSelf="start" fontSize="2xl">
              Other permitted individuals
            </Text>
            <Button alignSelf="end" leftIcon={<Icon as={UserPlus}/>} variant="outline" colorScheme="Facebook" mr={2}>
              Add
            </Button>
          </Box>

        </Form>

      )}
    </Formik>
  );
};

export default ProgramForm;
