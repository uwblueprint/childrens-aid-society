import { Box, FormControl, FormLabel, Icon, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Field, Form, Formik } from "formik";
import { Clock, Home, Navigation, Phone } from "react-feather";
import CustomInput from "../../common/CustomInput";
import OptionalLabel from "../OptionalLabel";

export type SchoolDetails = {
  schoolName: string;
  schoolPhoneNo: string;
  schoolAddress: string;
  dismissalTime: string;
}

type SchoolDaycareFormProps = {
  schoolDetails: SchoolDetails;
  setSchoolDetails: React.Dispatch<React.SetStateAction<SchoolDetails>>;
}

const SchoolDaycareForm = ({
  schoolDetails,
  setSchoolDetails,
}: SchoolDaycareFormProps): React.ReactElement => {
  const onSubmit = (values: SchoolDetails) => {
    setSchoolDetails(values);
  };

  return (
    <Formik initialValues={schoolDetails} onSubmit={onSubmit}>
      <Form style={{ padding: "2rem 12rem" }}>
        <FormControl style={{ padding: "30px" }}>
          <SimpleGrid columns={2} spacingX="3rem" spacingY="0.75rem">
            <Box>
              <FormLabel htmlFor="schoolName">NAME</FormLabel>
              <Field
                as={CustomInput}
                id="schooName"
                name="schoolname"
                type="string"
                placeholder="Enter name of school or daycare"
                icon={<Icon as={Home} />}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="schoolPhoneNo">
                SCHOOL/DAYCARE CONTACT INFORMATION</FormLabel>
              <Field
                as={CustomInput}
                name="schoolPhoneNo"
                id="schoolPhoneNo"
                type="string"
                placeholder="e.g. 555-555-5555"
                icon={<Icon as={Phone} />}
              />
            </Box>
          </SimpleGrid>
          <Box paddingTop="10px">
            <FormLabel htmlFor="schoolAddress">ADDRESS</FormLabel>
            <Field
              as={CustomInput}
              id="schoolAddress"
              name="schoolAddress"
              type="string"
              placeholder="Enter address of school or daycare"
              icon={<Icon as={Navigation} />}
            />
          </Box>
          <Box paddingTop="10px">
            <FormLabel htmlFor="dismissalTime">
              DISMISSAL TIME <OptionalLabel />
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
