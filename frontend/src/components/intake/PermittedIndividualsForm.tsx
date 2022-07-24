import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";

export type PermittedIndividualDetails = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relationship: string;
};

type PermittedIndividualFormProps = {
  permittedIndividualDetails: PermittedIndividualDetails;
  setPermittedIndividualDetails: React.Dispatch<
    React.SetStateAction<PermittedIndividualDetails>
  >;
};

const PermittedIndividualsForm = ({
  permittedIndividualDetails,
  setPermittedIndividualDetails,
}: PermittedIndividualFormProps): React.ReactElement => {
  
  return (
    <Box style={{ padding: "0px 100px 70px 100px" }}>
      <Heading textStyle="heading">Other Permitted Individuals</Heading>
      <FormControl style={{ padding: "30px" }}>
        <SimpleGrid columns={2} spacing="70px">
          <Box>
            <FormLabel htmlFor="firstName" style={{ marginTop: "0px" }}>
              FIRST NAME
            </FormLabel>
            <Input
              value={permittedIndividualDetails.firstName}
              id="firstName"
              type="string"
              placeholder="Enter name of worker..."
              onChange={(event) =>
                setPermittedIndividualDetails({
                  ...permittedIndividualDetails,
                  firstName: event.currentTarget.value,
                })
              }
            />
          </Box>
          <Box>
            <FormLabel htmlFor="lastName" style={{ marginTop: "0px" }}>
              LAST NAME
            </FormLabel>
            <Input
              value={permittedIndividualDetails.lastName}
              id="lastName"
              type="string"
              placeholder="Enter name of worker..."
              onChange={(event) =>
                setPermittedIndividualDetails({
                  ...permittedIndividualDetails,
                  lastName: event.currentTarget.value,
                })
              }
            />
          </Box>
        </SimpleGrid>
        <SimpleGrid columns={2} spacing="70px">
          <Box>
            <FormLabel htmlFor="relationship">RELATIONSHIP TO CHILD</FormLabel>
            <Select
              value={permittedIndividualDetails.relationship}
              placeholder="Choose relationship..."
              id="relationship"
              onChange={(event) => {
                setPermittedIndividualDetails({
                  ...permittedIndividualDetails,
                  relationship: event.currentTarget.value,
                });
              }}
            >
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </Select>
          </Box>
          <Box>
            <FormLabel htmlFor="phoneNumber">PHONE NUMBER</FormLabel>
            <Input
              value={permittedIndividualDetails.phoneNumber}
              id="phoneNumber"
              type="string"
              placeholder="(ie. 223-2232-2323)"
              onChange={(event) =>
                setPermittedIndividualDetails({
                  ...permittedIndividualDetails,
                  phoneNumber: event.currentTarget.value,
                })
              }
            />
          </Box>
        </SimpleGrid>
      </FormControl>
    </Box>
  );
};

export default PermittedIndividualsForm;
