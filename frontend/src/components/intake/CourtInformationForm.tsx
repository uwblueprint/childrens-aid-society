import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { FilePlus } from "react-feather";
import { AutocompleteField } from "./Autocomplete";
import CustomInput from "../common/CustomInput";

export type CourtDetails = {
  currentCourtStatus: string;
  firstNationHeritage: string;
  firstNationBand: string;
  orderReferral: File | null;
};

type CourtInformationFormProps = {
  courtDetails: CourtDetails;
  setCourtDetails: React.Dispatch<React.SetStateAction<CourtDetails>>;
  nextStep: () => void;
  prevStep: () => void;
};

const optional = (
  <Box display="inline" color="gray.600">
    (OPTIONAL)
  </Box>
);

const CourtInformationForm = ({
  courtDetails,
  setCourtDetails,
  nextStep,
  prevStep,
}: CourtInformationFormProps): React.ReactElement => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File) => void,
  ) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setFieldValue("orderReferral", fileObj);
  };
  const onSubmit = (values: CourtDetails) => setCourtDetails(values);

  return (
    <Formik initialValues={courtDetails} onSubmit={onSubmit}>
      {({ handleSubmit, setFieldValue, values }) => {
        return (
          <Container maxWidth="container.xl" padding="30px 96px">
            <Form>
              <Box style={{ padding: "16px 0" }}>
                <FormLabel pt="15px" htmlFor="currentCourtStatus">
                  COURT STATUS
                </FormLabel>
                <AutocompleteField
                  id="currentCourtStatus"
                  name="currentCourtStatus"
                  placeholder="Enter or select a court status"
                  hints={[
                    "Interim care",
                    "Final order for Society Care",
                    "Extended Society Care",
                    "Supervision order",
                    "Kin service placement",
                    "Living with Biological family",
                  ]}
                />
              </Box>
              {/* TODO: store the uploaded file and save in backend */}
              <Input
                display="none"
                type="file"
                ref={inputRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFileChange(e, setFieldValue)
                }
                id="orderReferral"
                name="orderReferral"
              />
              <FormControl padding="16px 0">
                <FormLabel
                  pt="15px"
                  htmlFor="documentDisplay"
                  style={{ cursor: "pointer" }}
                >
                  ORDER REFERRAL
                </FormLabel>
                <HStack>
                  <Field
                    as={CustomInput}
                    isReadOnly
                    id="documentDisplay"
                    placeholder="No document attached"
                    value={values.orderReferral?.name}
                    onClick={handleClick}
                    marginRight="10px"
                    style={{ cursor: "pointer" }}
                  />
                  <Button
                    onClick={handleClick}
                    variant="ghost"
                    padding="24px 20px"
                    color="blue.400"
                    leftIcon={<FilePlus />}
                  >
                    Attach document
                  </Button>
                </HStack>
              </FormControl>
              <HStack alignItems="end" padding="16px 0" spacing={10}>
                <FormControl>
                  <FormLabel pt="15px" htmlFor="firstNationHeritage">
                    FIRST NATION HERITAGE {optional}
                  </FormLabel>
                  <Field
                    id="firstNationHeritage"
                    as={Select}
                    name="firstNationHeritage"
                    variant="filled"
                    height="48px"
                    backgroundColor="gray.50"
                    borderColor="gray.100"
                    borderWidth="1px"
                    fontSize="18px"
                    color={values.firstNationHeritage ? "black" : "gray.600"}
                    sx={{ ":hover, :focus": { backgroundColor: "gray.100" } }}
                  >
                    <option value="" selected>
                      Select First Nation heritage status
                    </option>
                    <option>First Nation Registered</option>
                    <option>Eligible for Registration</option>
                    <option>Inuit</option>
                    <option>Metis</option>
                    <option>Unknown</option>
                  </Field>
                </FormControl>
                <FormControl>
                  <FormLabel pt="15px" htmlFor="firstNationBand">
                    FIRST NATION BAND {optional}
                  </FormLabel>
                  <Field
                    as={CustomInput}
                    id="firstNationBand"
                    placeholder="Enter First Nation Band"
                    name="firstNationBand"
                  />
                </FormControl>
              </HStack>
              <Button
                onClick={() => {
                  handleSubmit();
                  prevStep();
                }}
                marginRight="10px"
              >
                Previous Button
              </Button>
              <Button
                onClick={() => {
                  handleSubmit();
                  nextStep();
                }}
                marginLeft="10px"
              >
                Next Button
              </Button>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
};

export default CourtInformationForm;
