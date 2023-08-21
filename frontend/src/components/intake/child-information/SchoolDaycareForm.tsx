import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import * as Yup from "yup";
import React from "react";
import { Field, Form, Formik, FormikProvider, useFormik } from "formik";
import { Clock, Home, Navigation, Phone } from "react-feather";
import CustomInput from "../../common/CustomInput";
import OptionalLabel from "../OptionalLabel";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  schoolName: Yup.string().required("This is a required field"),
  schoolAddress: Yup.string().required("This is a required field"),
  schoolPhoneNo: Yup.string()
    .matches(
      phoneRegExp,
      "Please provide a phone number or extension in the valid format. eg. 555-555-5555",
    )
    .required("This is a required field"),
});

export type SchoolDetails = {
  schoolName: string;
  schoolPhoneNo: string;
  schoolAddress: string;
  dismissalTime: string;
};

type SchoolDaycareFormProps = {
  schoolDetails: SchoolDetails;
  setSchoolDetails: React.Dispatch<React.SetStateAction<SchoolDetails>>;
};

const SchoolDaycareForm = ({
  schoolDetails,
  setSchoolDetails,
}: SchoolDaycareFormProps): React.ReactElement => {
  const onSubmit = (values: SchoolDetails) => {
    setSchoolDetails(values);
  };

  const formik = useFormik({
    initialValues: schoolDetails,
    onSubmit: (values: SchoolDetails) => {
      onSubmit(values);
    },
    validationSchema,
  });

  return (
    <Formik
      enableReinitialize
      initialValues={schoolDetails}
      onSubmit={onSubmit}
    >
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
                placeholder="Enter name of school or daycare"
                icon={<Icon as={Home} />}
                backgroundColor={
                  formik.errors.schoolName && formik.touched.schoolName
                    ? "red.50"
                    : ""
                }
                borderColor={
                  formik.errors.schoolName && formik.touched.schoolName
                    ? "red.400"
                    : ""
                }
                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSchoolDetails({
                    ...schoolDetails,
                    schoolName: e.target.value,
                  })
                }
              />
              {formik.errors.schoolName && formik.touched.schoolName ? (
                <Text color="red">{formik.errors.schoolName}</Text>
              ) : null}
            </Box>
            <Box>
              <FormLabel htmlFor="schoolPhoneNo">
                SCHOOL/DAYCARE CONTACT INFORMATION
              </FormLabel>
              <Field
                as={CustomInput}
                name="schoolPhoneNo"
                id="schoolPhoneNo"
                type="string"
                placeholder="e.g. 555-555-5555"
                icon={<Icon as={Phone} />}
                backgroundColor={
                  formik.errors.schoolPhoneNo && formik.touched.schoolPhoneNo
                    ? "red.50"
                    : ""
                }
                borderColor={
                  formik.errors.schoolPhoneNo && formik.touched.schoolPhoneNo
                    ? "red.400"
                    : ""
                }
                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSchoolDetails({
                    ...schoolDetails,
                    schoolPhoneNo: e.target.value,
                  })
                }
              />
              {formik.errors.schoolPhoneNo && formik.touched.schoolPhoneNo ? (
                <Text color="red">{formik.errors.schoolPhoneNo}</Text>
              ) : null}
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
              backgroundColor={
                formik.errors.schoolAddress && formik.touched.schoolAddress
                  ? "red.50"
                  : ""
              }
              borderColor={
                formik.errors.schoolAddress && formik.touched.schoolAddress
                  ? "red.400"
                  : ""
              }
              onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSchoolDetails({
                  ...schoolDetails,
                  schoolAddress: e.target.value,
                })
              }
            />
            {formik.errors.schoolAddress && formik.touched.schoolAddress ? (
              <Text color="red">{formik.errors.schoolAddress}</Text>
            ) : null}
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
              onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSchoolDetails({
                  ...schoolDetails,
                  dismissalTime: e.target.value,
                })
              }
            />
          </Box>
        </FormControl>
      </Form>
    </Formik>
  );
};

export default SchoolDaycareForm;
