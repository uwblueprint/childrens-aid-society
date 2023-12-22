import React from "react";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Icon,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, FormikProvider, useFormik } from "formik";
import { User, Trash, ChevronDown } from "react-feather";
import CustomInput from "../common/CustomInput";
import { CustomSelectField } from "../intake/CustomSelectField";

export type AttendanceDetails = {
  visitingMembers: string;
  visitorRelationship: string;
  description: string;
  visitingMemberName: string;
  visitAttendance: string;
  absenceReason: string;
};

export type AttendanceEntries = {
  entries: Array<AttendanceDetails>;
};

type AttendanceFormProps = {
  attendanceEntries: AttendanceEntries;
  setAttendanceEntries: React.Dispatch<React.SetStateAction<AttendanceEntries>>;
  readOnly?: boolean;
};

const AttendanceForm = ({
  attendanceEntries,
  setAttendanceEntries,
  readOnly = false,
}: AttendanceFormProps): React.ReactElement => {
  const onSubmit = (values: AttendanceEntries) => {
    setAttendanceEntries(values);
  };

  const formik = useFormik({
    initialValues: attendanceEntries,
    onSubmit: (values: AttendanceEntries) => {
      onSubmit(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <FieldArray
          name="entries"
          render={(arrayHelpers) => (
            <div>
              {formik.values.entries.map((entry, index: number) => (
                <FormControl key={index}>
                  <SimpleGrid columns={3} spacingX="30px" spacingY="10px">
                    <Box>
                      <FormLabel htmlFor="visitingMembers">
                        VISITING MEMBERS
                      </FormLabel>
                      <CustomSelectField
                        name={`entries[${index}].visitingMembers`}
                        id="visitingMembers"
                        options={["Other Visitor"]}
                        placeholder="Select visiting family"
                        iconRight={<Icon as={ChevronDown} />}
                        readOnly={readOnly}
                        onChange={formik.handleChange}
                      />
                    </Box>
                    <Box>
                      <FormLabel htmlFor="visitorRelationship">
                        VISITOR RELATIONSHIP
                      </FormLabel>
                      <CustomSelectField
                        readOnly={readOnly}
                        id="visitorRelationship"
                        options={["Full", "Partial", "Unsupervised"]}
                        name={`entries[${index}].visitorRelationship`}
                        iconRight={<Icon as={ChevronDown} />}
                        placeholder="Select relationship"
                      />
                    </Box>
                    <Box>
                      {/* TODO: make this dropdown conditional on other relationship */}
                      <FormLabel htmlFor="description">DESCRIPTION</FormLabel>
                      <Field
                        disabled={readOnly}
                        as={CustomInput}
                        id="description"
                        name={`entries[${index}].description`}
                        type="string"
                        placeholder="Other relative description"
                        icon={<Icon as={User} />}
                      />
                    </Box>
                  </SimpleGrid>
                  <Box>
                    <FormLabel htmlFor="visitingMemberName">
                      VISITING MEMBER NAME
                    </FormLabel>
                    <Field
                      disabled={readOnly}
                      as={CustomInput}
                      id="visitingMemberName"
                      name={`entries[${index}].visitingMemberName`}
                      type="string"
                      placeholder="Enter name for visiting family"
                      icon={<Icon as={User} />}
                    />
                  </Box>
                  <SimpleGrid columns={2} spacingX="30px" spacingY="10px">
                    <Box>
                      <FormLabel htmlFor="visitAttendance">
                        VISIT ATTENDANCE
                      </FormLabel>
                      <CustomSelectField
                        name={`entries[${index}].visitAttendance`}
                        id="visitAttendance"
                        options={["Cancelled", "Occurred"]}
                        placeholder="Select an option..."
                        iconRight={<Icon as={ChevronDown} />}
                        readOnly={readOnly}
                      />
                    </Box>
                    <Box>
                      <FormLabel htmlFor="absenceReason">
                        REASON FOR ABSENCE
                      </FormLabel>
                      <Field
                        disabled={readOnly}
                        as={CustomInput}
                        id="absenceReason"
                        name={`entries[${index}].absenceReason`}
                        type="string"
                        placeholder="Eg. Doctor's Appointment"
                      />
                    </Box>
                  </SimpleGrid>
                  {formik.values.entries.length > 1 ? (
                    <>
                      <Button
                        marginTop="25px"
                        marginBottom="15px"
                        color="red.600"
                        textStyle="button-small"
                        variant="secondaryDelete"
                        onClick={() => {
                          arrayHelpers.remove(index);
                        }}
                        leftIcon={<Icon as={Trash} h="16px" />}
                      >
                        Remove
                      </Button>
                      <Divider orientation="horizontal" w="full" />
                    </>
                  ) : (
                    ""
                  )}
                  {index === formik.values.entries.length - 1 ? (
                    <Button
                      marginTop="15px"
                      color="blue.300"
                      textStyle="button-small"
                      variant="secondary"
                      onClick={() => {
                        arrayHelpers.push({
                          visitingMembers: "",
                          visitorRelationship: "",
                          description: "",
                          visitingMemberName: "",
                          visitAttendance: "",
                          absenceReason: "",
                        });
                      }}
                    >
                      + Add visiting member
                    </Button>
                  ) : (
                    ""
                  )}
                </FormControl>
              ))}
            </div>
          )}
        />
      </Form>
    </FormikProvider>
  );
};

export default AttendanceForm;
