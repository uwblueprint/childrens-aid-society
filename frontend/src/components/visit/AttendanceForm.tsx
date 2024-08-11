import React from "react";
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Icon,
  Select,
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

  const captureValue = (e: React.ChangeEvent<any>) => {
    const { id, value } = e.target;
    const { entryIndex } = e.target.dataset;
    formik.handleChange(e);

    const temp = attendanceEntries;
    switch (id) {
      case "visitingMembers":
        temp.entries[entryIndex].visitingMembers = value;
        break;
      case "description":
        temp.entries[entryIndex].description = value;
        break;
      case "visitorRelationship":
        temp.entries[entryIndex].visitorRelationship = value;
        break;
      case "visitAttendance":
        temp.entries[entryIndex].visitAttendance = value;
        break;
      case "visitingMemberName":
        temp.entries[entryIndex].visitingMemberName = value;
        break;
      case "absenceReason":
        temp.entries[entryIndex].absenceReason = value;
        break;
      default:
        break;
    }
    setAttendanceEntries(temp);
  };


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
                      <Select
                        name={`entries[${index}].visitingMembers`}
                        as={Select}
                        id="visitingMembers"
                        options={["Other Visitor"]}
                        placeholder="Select visiting family"
                        iconRight={<Icon as={ChevronDown} />}
                        readOnly={readOnly}
                        onChange={captureValue}
                        data-entry-index={index}
                      >
                        <option value="Other Visitor">Other Visitor</option>
                      </Select>
                    </Box>
                    <Box>
                      <FormLabel htmlFor="visitorRelationship">
                        VISITOR RELATIONSHIP
                      </FormLabel>
                      <Select
                        disabled={readOnly}
                        id="visitorRelationship"
                        // options={["Full", "Partial", "Unsupervised"]}
                        name={`entries[${index}].visitorRelationship`}
                        // iconRight={<Icon as={ChevronDown} />}
                        placeholder="Select relationship"
                        onChange={captureValue}
                        data-entry-index={index}
                      >
                        <option value="FOSTER_CAREGIVER">Foster Caregiver</option>
                        <option value="KINSHIP_CAREGIVER">Kinship Caregiver</option>
                        <option value="BIOLOGICAL_FAMILY">Biological Family</option>
                        <option value="ADOPTIVE_PARENT">Adoptive Parent</option>
                        <option value="FOSTER_PARENT">Foster Parent</option>
                        <option value="BIOLOGICAL_PARENT">Biological Parent</option>
                        <option value="STEP_PARENT">Step Parent</option>
                        <option value="MATERNAL_GRANDPARENT">Maternal Grandparent</option>
                        <option value="PATERNAL_GRANDPARENT">Paternal Grandparent</option>
                        <option value="SIBLING">Sibling</option>
                        <option value="STEP_SIBLING">Step Sibling</option>
                        <option value="HALF_SIBLING">Half Sibling</option>
                        <option value="UNCLE_AUNT">Uncle/Aunt</option>
                        <option value="OTHER_RELATIVE">Other Relative</option>
                        <option value="OTHER">Other</option>
                      </Select>
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
                        onChange={captureValue}
                        data-entry-index={index}
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
                      onChange={captureValue}
                      data-entry-index={index}
                    />
                  </Box>
                  <SimpleGrid columns={2} spacingX="30px" spacingY="10px">
                    <Box>
                      <FormLabel htmlFor="visitAttendance">
                        VISIT ATTENDANCE
                      </FormLabel>
                      <Select
                        name={`entries[${index}].visitAttendance`}
                        id="visitAttendance"
                        placeholder="Select an option..."
                        disabled={readOnly}
                        onChange={captureValue}
                        data-entry-index={index}
                      >
                        <option value="PRESENT">Present</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="NO_SHOW">No Show</option>
                      </Select>
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
                        onChange={captureValue}
                        data-entry-index={index}
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
                        const temp = attendanceEntries;
                        temp.entries.push({
                          visitingMembers: "",
                          visitorRelationship: "",
                          description: "",
                          visitingMemberName: "",
                          visitAttendance: "",
                          absenceReason: "",
                        });
                        setAttendanceEntries(temp);
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