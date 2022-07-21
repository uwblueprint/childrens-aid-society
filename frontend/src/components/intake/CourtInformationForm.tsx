import React, { useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Select,
} from "@chakra-ui/react";

export type CourtDetails = {
  currentCourtStatus: string;
  firstNationHeritage: string;
  firstNationBand: string;
};

type CourtInformationFormProps = {
  courtDetails: CourtDetails;
  setCourtDetails: React.Dispatch<React.SetStateAction<CourtDetails>>;
};

const CourtInformationForm = ({
  courtDetails,
  setCourtDetails,
}: CourtInformationFormProps): React.ReactElement => {
  const inputRef = useRef(null);
  const handleClick = () => {
    // 👇️ open file input box on click of other element
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    inputRef.current.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log("fileObj is", fileObj);

    // 👇️ reset file input
    // event.target.value = null;

    // 👇️ is now empty
    // console.log(event.target.files);

    // 👇️ can still access file object here
    // console.log(fileObj);
    // console.log(fileObj.name);
  };
  return (
    <Box style={{ padding: "0px 100px 30px 100px" }}>
      <Heading textStyle="heading">Court Details</Heading>
      <FormControl style={{ padding: "30px" }}>
        <FormLabel pt="15px" htmlFor="currentCourtStatus">
          Current Court Status
        </FormLabel>
        <Select
          id="courtStatus"
          placeholder="Select Status..."
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setCourtDetails({
              ...courtDetails,
              currentCourtStatus: event.currentTarget.value,
            })
          }
          value={courtDetails.currentCourtStatus}
        >
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>
      <FormControl>
        {/* TODO: store the uploaded file and save in backend */}
        <input
          style={{ display: "none" }}
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          id="OrderReferral"
          name="OrderReferral"
        />
        <Button onClick={handleClick}>Attach Order Referral</Button>
      </FormControl>
      <FormControl style={{ padding: "30px" }}>
        <FormLabel pt="15px" htmlFor="firstNationHeritage">
          First Nation Heritage
        </FormLabel>
        <Select
          id="heritage"
          placeholder="Select Heritage..."
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setCourtDetails({
              ...courtDetails,
              firstNationHeritage: event.currentTarget.value,
            })
          }
          value={courtDetails.firstNationHeritage}
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
          id="band"
          placeholder="Select Band..."
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setCourtDetails({
              ...courtDetails,
              firstNationBand: event.currentTarget.value,
            })
          }
          value={courtDetails.firstNationBand}
        >
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CourtInformationForm;
