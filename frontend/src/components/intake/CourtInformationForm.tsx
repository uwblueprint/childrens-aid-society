import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Icon,
} from "@chakra-ui/react";
import { ChevronDown, Download, FilePlus } from "react-feather";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { AutocompleteField } from "./Autocomplete";
import { CustomSelectField } from "./CustomSelectField";
import CustomInput from "../common/CustomInput";
import OptionalLabel from "./OptionalLabel";
import Stepper from "./Stepper";
import IntakeSteps from "./intakeSteps";
import IntakeFooter from "./IntakeFormFooter";

export type CourtDetails = {
  currentCourtStatus: string;
  firstNationHeritage: string;
  firstNationBand: string;
  orderReferral: File | null;
};

type CourtInformationFormProps = {
  courtDetails: CourtDetails;
  setCourtDetails: React.Dispatch<React.SetStateAction<CourtDetails>>;
  nextStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  readOnly?: boolean;
  hideStepper?: boolean;
  hideFooter?: boolean;
};

const CourtInformationForm = ({
  courtDetails,
  setCourtDetails,
  setStep,
  nextStep,
  readOnly = false,
  hideStepper,
  hideFooter,
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

  const formik = useFormik({
    initialValues: courtDetails,
    onSubmit: (values: CourtDetails) => {
      onSubmit(values);
    },
  });

  const onNextStep = () => {
    nextStep();
    setCourtDetails(formik.values);
  };
  return (
    <>
      {!hideStepper && (
        <Stepper
          pages={[
            "Case referral",
            "Court information",
            "Individual details",
            "Program details",
          ]}
          setStep={setStep}
          activePage={IntakeSteps.COURT_INFORMATION}
          onClickCallback={() => {
            setCourtDetails(formik.values);
          }}
        />
      )}
      <FormikProvider value={formik}>
        <Form>
          <Box style={{ paddingBottom: "16px" }}>
            <FormLabel pt="15px" htmlFor="currentCourtStatus">
              COURT STATUS
            </FormLabel>
            <AutocompleteField
              id="currentCourtStatus"
              name="currentCourtStatus"
              placeholder="Enter or select a court status"
              hints={[
                "Interim care",
                "Final order for Society Care",
                "Extended Society Care",
                "Supervision order",
                "Kin service placement",
                "Living with Biological family",
              ]}
              readOnly={readOnly}
            />
          </Box>
          {/* TODO: store the uploaded file and save in backend */}
          <Input
            display="none"
            type="file"
            ref={inputRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFileChange(e, formik.setFieldValue)
            }
            id="orderReferral"
            name="orderReferral"
            disabled={readOnly}
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
                value={formik.values.orderReferral?.name}
                onClick={handleClick}
                marginRight="10px"
                style={{ cursor: "pointer" }}
              />
              {readOnly ? (
                <Button variant="tertiary" leftIcon={<Icon as={Download} />}>
                  Download attachment {/* TODO: implement download button */}
                </Button>
              ) : (
                <Button
                  onClick={handleClick}
                  variant="tertiary"
                  leftIcon={<FilePlus />}
                >
                  Attach document
                </Button>
              )}
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
                placeholder="Select First Nation heritage status"
                options={[
                  "First Nation Registered",
                  "Eligible for Registration",
                  "Inuit",
                  "Metis",
                  "Unknown",
                ]}
                iconRight={<Icon as={ChevronDown} />}
                readOnly={readOnly}
              />
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
                disabled={readOnly}
              />
            </FormControl>
          </HStack>
        </Form>
      </FormikProvider>
      {!hideFooter && (
        <IntakeFooter
          nextButtonText="Next section"
          showClearPageBtn
          isStepComplete={() => true} // TODO: validate form
          registrationLoading={false}
          nextStepCallBack={onNextStep}
        />
      )}
    </>
  );
};

export default CourtInformationForm;
