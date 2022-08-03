import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Input,
} from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";

export type CourtDetails = {
  currentCourtStatus: string;
  firstNationHeritage: string;
  firstNationBand: string;
  orderReferral: File | null;
};

const CourtInformationForm = (): React.ReactElement => {
  const { setFieldValue } = useFormikContext();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setFieldValue("orderReferral", fileObj);
  };

  return (
    <Box style={{ padding: "0px 100px 30px 100px" }}>
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
          // style={{ display: "none" }}
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          id="orderReferral"
          name="orderReferral"
        />
        <Button onClick={handleClick}>Attach Order Referral</Button>
      </FormControl>
      <FormControl style={{ padding: "30px" }}>
        <FormLabel pt="15px" htmlFor="firstNationHeritage">
          First Nation Heritage
        </FormLabel>
        <Field
          id="firstNationHeritage"
          as={Select}
          name="firstNationHeritage"
          placeholder="Select Heritage..."
        >
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Field>
      </FormControl>
      <FormControl style={{ padding: "30px" }}>
        <FormLabel pt="15px" htmlFor="firstNationBand">
          First Nation Band
        </FormLabel>
        <Field
          as={Select}
          id="firstNationBand"
          placeholder="Select Band..."
          name="firstNationBand"
        >
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Field>
      </FormControl>
    </Box>
  );
};

export default CourtInformationForm;
