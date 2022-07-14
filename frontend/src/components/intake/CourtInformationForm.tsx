import React from "react";
import { Center, Grid, Heading, FormControl, FormLabel, Select, FormErrorMessage} from "@chakra-ui/react";

export type CourtDetails = {
  currentCourtStatus: string;
  firstNationHeritage: string;
  firstNationBand: string;
}

type CourtInformationFormProps = {
  courtDetails: CourtDetails,
  setCourtDetails: React.Dispatch<React.SetStateAction<CourtDetails>>;
}

const CourtInformationForm = ({
  courtDetails,
  setCourtDetails,
}:  CourtInformationFormProps): React.ReactElement => {

  return (
    <Center >
    <Grid w='1000px'>
      <Heading style={{ textAlign: "center", padding: "10px" }}>
        Court Details
      </Heading>
      <FormControl style={{ padding: "30px" }}>
        <FormLabel pt="15px" htmlFor="currentCourtStatus">
         Current Court Status
        </FormLabel>
        <Select id='courtStatus' placeholder='Select Status...'  
          onChange={(event) =>
                setCourtDetails({
                  ...courtDetails,
                  currentCourtStatus: event.currentTarget.value,
                })
              }
              value={courtDetails.currentCourtStatus} >
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
          </Select>
      </FormControl>
      <FormControl>
        {/* This File Upload Button Will Need to Be Updated */}
        <Center> 
        <FormLabel >Attach Order Referral:</FormLabel>
        </Center>
        <input type='file' id="OrderReferral" name="OrderReferral"  /> 
        <FormErrorMessage>
        {/* {invalid} */}
        </FormErrorMessage>
      </FormControl>
      <FormControl style={{ padding: "30px" }}>
      <FormLabel pt="15px" htmlFor="firstNationHeritage">
        First Nation Heritage
      </FormLabel>
      <Select id='heritage' placeholder='Select Heritage...'
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
      <Select id='band' placeholder='Select Band...'
      onChange={(event) =>
        setCourtDetails({
          ...courtDetails,
          firstNationBand: event.currentTarget.value,
        })
      }
      value={courtDetails.firstNationBand}>
        <option>United Arab Emirates</option>
        <option>Nigeria</option>
        </Select>
      </FormControl>
    </Grid>
    </Center>
  );
};

export default CourtInformationForm;
