import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { FilePlus } from "react-feather";
import { AutocompleteField } from "./Autocomplete";
import { CustomSelectField } from "./Select";
import CustomInput from "../common/CustomInput";
import OptionalLabel from "./OptionalLabel";

export type CourtDetails = {
  currentCourtStatus: string;
  firstNationHeritage: string;
  firstNationBand: string;
  orderReferral: File | null;
};

type CourtInformationFormProps = {
  courtDetails: CourtDetails;
  setCourtDetails: React.Dispatch<React.SetStateAction<CourtDetails>>;
};

const CourtInformationForm = ({
  courtDetails,
  setCourtDetails,
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
      {({ setFieldValue }) => (
        <Form style={{ padding: "0px 100px 30px 100px" }}>
          <Heading textStyle="heading">Court Details</Heading>
          <FormControl style={{ padding: "30px" }}>
            <FormLabel pt="15px" htmlFor="currentCourtStatus">
              Current Court Status
            </FormLabel>
            <Field
              as={Select}
              id="currentCourtStatus"
              name="currentCourtStatus"
              placeholder="Select Status..."
            >
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Field>
          </FormControl>
          <FormControl>
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
                  variant="tertiary"
                  leftIcon={<FilePlus />}
                >
                  Attach document
                </Button>
              </HStack>
            </FormControl>
            <HStack alignItems="end" padding="16px 0" spacing={10}>
              <FormControl>
                <FormLabel pt="15px" htmlFor="firstNationHeritage">
                  FIRST NATION HERITAGE <OptionalLabel />
                </FormLabel>
                <CustomSelectField
                  id="firstNationHeritage"
                  name="firstNationHeritage"
                  defaultValue=""
                >
                  <option value="">Select First Nation heritage status</option>
                  <option>First Nation Registered</option>
                  <option>Eligible for Registration</option>
                  <option>Inuit</option>
                  <option>Metis</option>
                  <option>Unknown</option>
                </CustomSelectField>
              </FormControl>
              <FormControl>
                <FormLabel pt="15px" htmlFor="firstNationBand">
                  FIRST NATION BAND <OptionalLabel />
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
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Field>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default CourtInformationForm;
