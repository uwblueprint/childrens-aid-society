import React from "react";
import {
  Center,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Button,
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
  return (
    <Box style={{ padding: "0px 100px 30px 100px" }}>
        <Heading textStyle="heading">
          Court Details
        </Heading>
        <FormControl style={{ padding: "30px" }}>
          <FormLabel pt="15px" htmlFor="currentCourtStatus">
            Current Court Status
          </FormLabel>
          <Select
            id="courtStatus"
            placeholder="Select Status..."
            onChange={(event) =>
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
          <Button>Attach Order Referral:</Button>
        </FormControl>
        <FormControl style={{ padding: "30px" }}>
          <FormLabel pt="15px" htmlFor="firstNationHeritage">
            First Nation Heritage
          </FormLabel>
          <Select
            id="heritage"
            placeholder="Select Heritage..."
            onChange={(event) =>
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
            onChange={(event) =>
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
