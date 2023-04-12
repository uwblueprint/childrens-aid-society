import React from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { User, File, Calendar } from "react-feather";
import CustomInput from "../../common/CustomInput";
import OptionalLabel from "../OptionalLabel";

const dateRegExp = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const validationSchema = Yup.object().shape({
  cpinFileNumber: Yup.number()
    .required("This is a required field")
    .typeError("CPIN file number must be a number"),
  childName: Yup.string().required("This is a required field"),
  dateOfBirth: Yup.string()
    .matches(
      dateRegExp,
      "Please enter a date in the desired format. ie. DD/MM/YYYY",
    )
    .required("This is a required field"),
});

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

  const formik = useFormik({
    initialValues: childDetails,
    onSubmit: (values: ChildDetails) => {
      onSubmit(values);
    },
    validationSchema,
  });

  return (
    <FormikProvider value={formik}>
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
                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setChildDetails({
                    ...childDetails,
                    childName: e.target.value,
                  })
                }
                backgroundColor={
                  formik.errors.childName && formik.touched.childName
                    ? "red.50"
                    : ""
                }
                borderColor={
                  formik.errors.childName && formik.touched.childName
                    ? "red.400"
                    : ""
                }
              />
              {formik.errors.childName && formik.touched.childName ? (
                <Text color="red">{formik.errors.childName}</Text>
              ) : null}
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
                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setChildDetails({
                    ...childDetails,
                    dateOfBirth: e.target.value,
                  })
                }
                backgroundColor={
                  formik.errors.dateOfBirth && formik.touched.dateOfBirth
                    ? "red.50"
                    : ""
                }
                borderColor={
                  formik.errors.dateOfBirth && formik.touched.dateOfBirth
                    ? "red.400"
                    : ""
                }
              />
              {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
                <Text color="red">{formik.errors.dateOfBirth}</Text>
              ) : null}
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
                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setChildDetails({
                    ...childDetails,
                    cpinFileNumber: e.target.value,
                  })
                }
                backgroundColor={
                  formik.errors.cpinFileNumber && formik.touched.cpinFileNumber
                    ? "red.50"
                    : ""
                }
                borderColor={
                  formik.errors.cpinFileNumber && formik.touched.cpinFileNumber
                    ? "red.400"
                    : ""
                }
              />
              {formik.errors.cpinFileNumber && formik.touched.cpinFileNumber ? (
                <Text color="red">{formik.errors.cpinFileNumber}</Text>
              ) : null}
            </Box>
            <Box>
              <FormLabel htmlFor="workerName">
                CHILDREN SERVICES OR KINSHIP WORKER <OptionalLabel />
              </FormLabel>
              <Field
                as={CustomInput}
                id="workerName"
                name="workerName"
                type="string"
                placeholder="Enter worker name"
                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setChildDetails({
                    ...childDetails,
                    workerName: e.target.value,
                  })
                }
              />
            </Box>
          </SimpleGrid>
          <Box paddingTop="10px">
            <FormLabel htmlFor="specialNeeds">
              SPECIAL NEEDS <OptionalLabel />
            </FormLabel>
            <Field
              as={CustomInput}
              id="specialNeeds"
              name="specialNeeds"
              type="string"
              placeholder="Enter any special needs of the child"
              onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChildDetails({
                  ...childDetails,
                  specialNeeds: e.target.value,
                })
              }
            />
          </Box>
          <Box paddingTop="10px">
            <FormLabel htmlFor="childBehaviours">
              CHILD BEHAVIOURS AND CONCERNS <OptionalLabel />
            </FormLabel>
            <Field
              as={CustomInput}
              id="childBehaviours"
              name="childBehaviours"
              type="string"
              placeholder="Select or enter any behaviours and concerns to note"
              onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                setChildDetails({
                  ...childDetails,
                  childBehaviours: e.target.value,
                })
              }
            />
          </Box>
        </FormControl>
      </Form>
    </FormikProvider>
  );
};

export default ChildInformationForm;
