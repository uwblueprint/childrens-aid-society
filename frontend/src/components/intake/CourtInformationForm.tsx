import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Input,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

export type CourtDetails = {
  currentCourtStatus: string;
  firstNationHeritage: string;
  firstNationBand: string;
  orderReferral: File | null;
};

type CourtInformationFormProps = {
  setCourtDetails: React.Dispatch<React.SetStateAction<CourtDetails>>;
  nextStep: () => void;
  prevStep: () => void;
};

const CourtInformationForm = ({
  setCourtDetails,
  nextStep,
  prevStep,
}: CourtInformationFormProps): React.ReactElement => {
  const initialValues: CourtDetails = {
    currentCourtStatus: "",
    firstNationHeritage: "",
    firstNationBand: "",
    orderReferral: null,
  };

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

  const onSubmit = (values: CourtDetails) => {
    setCourtDetails(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, setFieldValue }) => (
        <Form style={{ padding: "0px 100px 30px 100px" }}>
          <Heading textStyle="heading">Court Details</Heading>
          <FormControl style={{ padding: "30px" }}>
            <FormLabel pt="15px" htmlFor="currentCourtStatus">
              Current Court Status
            </FormLabel>
            <Select
              id="currentCourtStatus"
              name="currentCourtStatus"
              placeholder="Select Status..."
              onChange={handleChange}
            >
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Select>
          </FormControl>
          <FormControl>
            {/* TODO: store the uploaded file and save in backend */}
            <Input
              style={{ display: "none" }}
              type="file"
              ref={inputRef}
              onChange={(e) => handleFileChange(e, setFieldValue)}
              id="orderReferral"
              name="orderReferral"
            />
            <Button onClick={handleClick}>Attach Order Referral</Button>
          </FormControl>
          <FormControl style={{ padding: "30px" }}>
            <FormLabel pt="15px" htmlFor="firstNationHeritage">
              First Nation Heritage
            </FormLabel>
            <Select
              id="firstNationHeritage"
              name="firstNationHeritage"
              placeholder="Select Heritage..."
              onChange={handleChange}
            >
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Select>
          </FormControl>
          <FormControl style={{ padding: "30px" }}>
            <FormLabel pt="15px" htmlFor="firstNationBand">
              First Nation Band
            </FormLabel>
            <Select
              id="firstNationBand"
              placeholder="Select Band..."
              onChange={handleChange}
              name="firstNationBand"
            >
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Select>
          </FormControl>
          <Button
            onClick={() => {
              handleSubmit();
              prevStep();
            }}
          >
            Previous Button
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              nextStep();
            }}
          >
            Next Button
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CourtInformationForm;
