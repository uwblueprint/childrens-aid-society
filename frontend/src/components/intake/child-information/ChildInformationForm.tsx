import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { User, File, Users, Calendar } from "react-feather";
import CustomInput from "../../common/CustomInput";

export type ChildDetails = {
  childName: string;
  cpinFileNumber: string;
  dateOfBirth: string;
  workerName: string;
  specialNeeds: string;
  childBehaviours: string;
};

type ChildFormProps = {
  childDetails: ChildDetails;
  setChildDetails: React.Dispatch<React.SetStateAction<ChildDetails>>;
};

const ChildInformationForm = ({
  childDetails,
  setChildDetails,
}: ChildFormProps): React.ReactElement => {
  const onSubmit = (values: ChildDetails) => {
    setChildDetails(values);
  };

  return (
    <Formik initialValues={childDetails} onSubmit={onSubmit}>
      <Form style={{ padding: "2rem 12rem" }}>
        <FormControl style={{ padding: "30px" }}>
          <SimpleGrid columns={2} spacingX="3rem" spacingY="0.75rem">
            <Box>
              <FormLabel htmlFor="childName">NAME</FormLabel>
              <Field
                as={CustomInput}
                id="childName"
                name="childName"
                type="string"
                placeholder="Enter name of child"
                icon={<Icon as={User} />}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="dateOfBirth">DATE OF BIRTH</FormLabel>
              <Field
                as={CustomInput}
                name="dateOfBirth"
                id="dateOfBirth"
                type="string"
                placeholder="YYYY-MM-DD"
                icon={<Icon as={Calendar} />}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="cpinFileNumber">
                CHILD FILE CPIN NUMBER
              </FormLabel>
              <Field
                as={CustomInput}
                id="cpinFileNumber"
                name="cpinFileNumber"
                type="string"
                placeholder="e.g. 123456789"
                icon={<Icon as={File} />}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="workerName">
                CHILDREN SERVICES OR KINSHIP WORKER (OPTIONAL)
              </FormLabel>
              <Field
                as={CustomInput}
                id="workerName"
                name="workerName"
                type="string"
                placeholder="Enter worker name"
              />
            </Box>
          </SimpleGrid>
          <Box paddingTop="10px">
            <FormLabel htmlFor="specialNeeds">
              SPECIAL NEEDS (OPTIONAL)
            </FormLabel>
            <Field
              as={CustomInput}
              id="specialNeeds"
              name="specialNeeds"
              type="string"
              placeholder="Enter any special needs of the child"
            />
          </Box>
          <Box paddingTop="10px">
            <FormLabel htmlFor="childBehaviours">
              CHILD BEHAVIOURS AND CONCERNS (OPTIONAL)
            </FormLabel>
            <Field
              as={CustomInput}
              id="childBehaviours"
              name="childBehaviours"
              type="string"
              placeholder="Select or enter any behaviours and concerns to note"
            />
          </Box>
        </FormControl>
      </Form>

      {/* TODO: trigger on submit when save child information button is clicked */}
    </Formik>
  );
};

export default ChildInformationForm;
