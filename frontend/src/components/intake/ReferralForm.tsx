/* eslint-disable react/prop-types */
import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";

export type ReferralDetails = {
  cpinFileNumber: string;
  cpinFileType: string;
  familyName: string;
  phoneNumber: string;
  referralDate: string;
  referringWorker: string;
  referringWorkerContact: string;
};

type ReferralFormProps = {
  referralDetails: ReferralDetails;
  setReferralDetails: React.Dispatch<React.SetStateAction<ReferralDetails>>;
};

const ReferralForm = ({
  referralDetails,
  setReferralDetails,
}: ReferralFormProps): React.ReactElement => {
  return (
    <Box
      style={{
        paddingLeft: "100px",
        paddingRight: "100px",
        paddingBottom: "30px",
      }}
    >
      <Heading>Referral Details</Heading>
      <FormControl style={{ padding: "30px" }}>
        <SimpleGrid columns={2} spacing="70px">
          <Box>
            <FormLabel htmlFor="referringWorker" style={{ marginTop: "0px" }}>
              REFERRING WORKER
            </FormLabel>
            <Input
              variant="customVariant"
              id="referringWorker"
              type="string"
              placeholder="Enter name of worker..."
              onChange={(event) =>
                setReferralDetails({
                  ...referralDetails,
                  referringWorker: event.currentTarget.value,
                })
              }
            />
          </Box>
          <Box>
            <FormLabel
              htmlFor="referringWorkerContact"
              style={{ marginTop: "0px" }}
            >
              REFERRING WORKER CONTACT
            </FormLabel>
            <Input
              variant="customVariant"
              id="referringWorkerContact"
              type="string"
              placeholder="(ie. 223-2232-2323)"
              onChange={(event) =>
                setReferralDetails({
                  ...referralDetails,
                  referringWorkerContact: event.currentTarget.value,
                })
              }
            />
          </Box>
        </SimpleGrid>
        <FormLabel pt="15px" htmlFor="familyName">
          FAMILY NAME
        </FormLabel>
        <Input
          variant="customVariant"
          id="familyName"
          type="string"
          placeholder="Enter family name..."
          onChange={(event) =>
            setReferralDetails({
              ...referralDetails,
              familyName: event.currentTarget.value,
            })
          }
        />
        <FormLabel pt="15px" htmlFor="referralDate">
          REFERRAL DATE
        </FormLabel>
        <Input
          variant="customVariant"
          id="referralDate"
          type="string"
          placeholder="Select a date..."
          onChange={(event) =>
            setReferralDetails({
              ...referralDetails,
              referralDate: event.currentTarget.value,
            })
          }
        />
        <SimpleGrid columns={2} spacing="70px">
          <Box>
            <FormLabel pt="15px" htmlFor="cpinFileNumber">
              CPIN FILE NUMBER
            </FormLabel>
            <Input
              variant="customVariant"
              id="cpinFileNumber"
              type="string"
              placeholder="(ie. 123456789)"
              onChange={(event) =>
                setReferralDetails({
                  ...referralDetails,
                  cpinFileNumber: event.currentTarget.value,
                })
              }
            />
          </Box>
          <Box>
            <FormLabel pt="15px" htmlFor="cpinFileType">
              CPIN FILE TYPE
            </FormLabel>
            <Input
              variant="customVariant"
              id="cpinFileType"
              type="string"
              placeholder="Select a file type..."
              onChange={(event) =>
                setReferralDetails({
                  ...referralDetails,
                  cpinFileType: event.currentTarget.value,
                })
              }
            />
          </Box>
        </SimpleGrid>
        <FormLabel pt="15px" htmlFor="phoneNUmber">
          PHONE NUMBER
        </FormLabel>
        <Input
          variant="customVariant"
          id="phoneNumber"
          type="string"
          placeholder="(ie. 223-2232-2323)"
          onChange={(event) =>
            setReferralDetails({
              ...referralDetails,
              phoneNumber: event.currentTarget.value,
            })
          }
        />
      </FormControl>
    </Box>
  );
};

export default ReferralForm;
