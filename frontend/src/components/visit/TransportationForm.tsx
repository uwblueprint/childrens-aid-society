import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  Select,
  Button,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik, FieldArray } from "formik";
import { User, Clock, Trash, ChevronDown } from "react-feather";
import CustomInput from "../common/CustomInput";
import { CustomSelectField } from "../intake/CustomSelectField";

export type TransportationDetails = {
  gaurdian: string;
  name: string;
  duration: string;
};

export type TransportationEntries = {
  entries: Array<TransportationDetails>;
};

type TransportationFormProps = {
  transportationEntries: TransportationEntries;
  setTransportationEntries: React.Dispatch<
    React.SetStateAction<TransportationEntries>
  >;
  readOnly?: boolean;
};

const TransportationForm = ({
  transportationEntries,
  setTransportationEntries,
  readOnly = false,
}: TransportationFormProps): React.ReactElement => {
  const onSubmit = (values: TransportationEntries) => {
    setTransportationEntries(values);
  };

  const formik = useFormik({
    initialValues: transportationEntries,
    onSubmit: (values: TransportationEntries) => {
      onSubmit(values);
    },
  });

  const captureValue = (e: React.ChangeEvent<any>) => {
      const { name, value } = e.target;
      formik.handleChange(e);
      setTransportationEntries(prevState => ({
        ...prevState,
        [name]: value,
      }));
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
                      <FormLabel htmlFor="guardian">GUARDIAN</FormLabel>
                      <Select
                        disabled={readOnly}
                        as={Select}
                        id="guardian"
                        options={["Full", "Partial", "Unsupervised"]}
                        name={`entries[${index}].guardian`}
                        placeholder="Select"
                        iconRight={<Icon as={ChevronDown} />}
                        onChange={captureValue}
                      >
                        <option value="transport1">transport 1</option>
                        <option value="transport2">transport 2</option>
                        <option value="transport3">transport 3</option>
                      </Select>
                    </Box>
                    <Box>
                      {/* TODO: make ethis dropdown conditional on other visitor */}
                      <FormLabel htmlFor="name">NAME</FormLabel>
                      <Field
                        disabled={readOnly}
                        as={CustomInput}
                        id="name"
                        name={`entries[${index}].name`}
                        type="string"
                        placeholder="Enter name"
                        icon={<Icon as={User} />}
                        onChange={captureValue}
                      />
                    </Box>
                    <Box>
                      {/* TODO: make ethis dropdown conditional on other relationship */}
                      <FormLabel htmlFor="duration">DURATION</FormLabel>
                      <Field
                        disabled={readOnly}
                        as={CustomInput}
                        id="duration"
                        name={`entries[${index}].duration`}
                        type="string"
                        placeholder="00:00 MINUTES"
                        icon={<Icon as={Clock} />}
                        onChange={captureValue}
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
                    <>
                      <Button
                        marginTop="15px"
                        color="blue.300"
                        textStyle="button-small"
                        variant="secondary"
                        onClick={() => {
                          arrayHelpers.push({
                            guardian: "",
                            name: "",
                            duration: "",
                          });
                        }}
                      >
                        + Add transportation
                      </Button>
                    </>
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

export default TransportationForm;