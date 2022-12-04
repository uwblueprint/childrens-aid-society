import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Home, Phone, Navigation, Clock } from "react-feather";
import CustomInput from "../../common/CustomInput";

export type SchoolDaycareDetails = {
  schoolName: string;
  phoneNumber: string;
  address: string;
  dismissalTime: string;
};

type SchoolDaycareFormProps = {
  schoolDaycareDetails: SchoolDaycareDetails;
  setSchoolDaycareDetails: React.Dispatch<
    React.SetStateAction<SchoolDaycareDetails>
  >;
};

const SchoolDaycareForm = ({
  schoolDaycareDetails,
  setSchoolDaycareDetails,
}: SchoolDaycareFormProps): React.ReactElement => {
  const onSubmit = (values: SchoolDaycareDetails) => {
    setSchoolDaycareDetails(values);
  };

  return (
    <Formik initialValues={schoolDaycareDetails} onSubmit={onSubmit}>
      <Form style={{ padding: "2rem 12rem" }}>
        <FormControl style={{ padding: "30px" }}>
          <SimpleGrid columns={2} spacingX="3rem" spacingY="0.75rem">
            <Box>
              <FormLabel htmlFor="schoolName">NAME</FormLabel>
              <Field
                as={CustomInput}
                id="schoolName"
                name="schoolName"
                type="string"
                placeholder="Public School Name"
                icon={<Icon as={Home} />}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="phoneNumber">ADDRESS</FormLabel>
              <Field
                as={CustomInput}
                name="phoneNumber"
                id="phoneNumber"
                type="string"
                placeholder="123-456-7890"
                icon={<Icon as={Phone} />}
              />
            </Box>
          </SimpleGrid>
          <Box paddingTop="10px">
            <FormLabel htmlFor="address">ADDRESS</FormLabel>
            <Field
              as={CustomInput}
              id="address"
              name="address"
              type="string"
              placeholder="123 Really Good School St"
              icon={<Icon as={Navigation} />}
            />
          </Box>
          <Box paddingTop="10px">
            <FormLabel htmlFor="dismissalTime">
              DISMISSAL TIME (OPTIONAL)
            </FormLabel>
            <Field
              as={CustomInput}
              id="dismissalTime"
              name="dismissalTime"
              type="string"
              placeholder="Enter dismissal time of school or daycare"
              icon={<Icon as={Clock} />}
            />
          </Box>
        </FormControl>
      </Form>

      {/* TODO: trigger on submit when save child information button is clicked */}
    </Formik>
  );
};

export default SchoolDaycareForm;
