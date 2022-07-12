/* eslint-disable react/prop-types */
import React from "react";
import { FormControl, FormLabel, Input, Box, Heading } from "@chakra-ui/react";

import "./ReferralForm.css";

interface IReferralFormProps {
  referralDetails: Record<string, unknown>;
  setReferralDetails: React.Dispatch<
    React.SetStateAction<Record<string, unknown>>
  >;
}

const ReferralForm: React.FC<IReferralFormProps> = ({
  referralDetails,
  setReferralDetails,
}) => {
  return (
    <Box>
      <Heading style={{ textAlign: "center", padding: "10px" }}>
        Referral Details
      </Heading>
      <FormControl style={{ padding: "30px" }}>
        <div className="gridStyle">
          <div>
            <FormLabel htmlFor="referringWorker" textStyle="body-regular">
              REFERRING WORKER
            </FormLabel>
            <Input
              variant="filled"
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
          </div>
          <div>
            <FormLabel htmlFor="referringWorkerContact">
              REFERRING WORKER CONTACT
            </FormLabel>
            <Input
              variant="filled"
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
          </div>
        </div>
        <FormLabel pt="15px" htmlFor="familyName">
          FAMILY NAME
        </FormLabel>
        <Input
          variant="filled"
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
          variant="filled"
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
        <div className="gridStyle">
          <div>
            <FormLabel pt="15px" htmlFor="cpinFileNumber">
              CPIN FILE NUMBER
            </FormLabel>
            <Input
              variant="filled"
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
          </div>
          <div>
            <FormLabel pt="15px" htmlFor="cpinFileType">
              CPIN FILE TYPE
            </FormLabel>
            <Input
              variant="filled"
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
          </div>
        </div>
        <FormLabel pt="15px" htmlFor="phoneNUmber">
          PHONE NUMBER
        </FormLabel>
        <Input
          variant="filled"
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
