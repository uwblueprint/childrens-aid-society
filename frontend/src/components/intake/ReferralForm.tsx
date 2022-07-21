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
    <Box style={{ padding: "0px 100px 30px 100px" }}>
      <Heading textStyle="heading">Referral Details</Heading>
      <FormControl style={{ padding: "30px" }}>
        <SimpleGrid columns={2} spacing="70px">
          <Box>
            <FormLabel htmlFor="referringWorker" style={{ marginTop: "0px" }}>
              REFERRING WORKER
            </FormLabel>
            <Input
              value={referralDetails.referringWorker}
              id="referringWorker"
              type="string"
              placeholder="Enter name of worker..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
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
              value={referralDetails.referringWorkerContact}
              id="referringWorkerContact"
              type="string"
              placeholder="(ie. 223-2232-2323)"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setReferralDetails({
                  ...referralDetails,
                  referringWorkerContact: event.currentTarget.value,
                })
              }
            />
          </Box>
        </SimpleGrid>
        <FormLabel htmlFor="familyName">FAMILY NAME</FormLabel>
        <Input
          value={referralDetails.familyName}
          id="familyName"
          type="string"
          placeholder="Enter family name..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setReferralDetails({
              ...referralDetails,
              familyName: event.currentTarget.value,
            })
          }
        />
        <FormLabel htmlFor="referralDate">REFERRAL DATE</FormLabel>
        {/* TO DO : change to date picker */}
        <Input
          value={referralDetails.referralDate}
          id="referralDate"
          type="string"
          placeholder="Select a date..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setReferralDetails({
              ...referralDetails,
              referralDate: event.currentTarget.value,
            })
          }
        />
        <SimpleGrid columns={2} spacing="70px">
          <Box>
            <FormLabel htmlFor="cpinFileNumber">CPIN FILE NUMBER</FormLabel>
            <Input
              value={referralDetails.cpinFileNumber}
              id="cpinFileNumber"
              type="string"
              placeholder="(ie. 123456789)"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setReferralDetails({
                  ...referralDetails,
                  cpinFileNumber: event.currentTarget.value,
                })
              }
            />
          </Box>
          <Box>
            <FormLabel htmlFor="cpinFileType">CPIN FILE TYPE</FormLabel>
            <Input
              value={referralDetails.cpinFileType}
              id="cpinFileType"
              type="string"
              placeholder="Select a file type..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setReferralDetails({
                  ...referralDetails,
                  cpinFileType: event.currentTarget.value,
                })
              }
            />
          </Box>
        </SimpleGrid>
        <FormLabel htmlFor="phoneNumber">PHONE NUMBER</FormLabel>
        <Input
          value={referralDetails.phoneNumber}
          id="phoneNumber"
          type="string"
          placeholder="(ie. 223-2232-2323)"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
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
