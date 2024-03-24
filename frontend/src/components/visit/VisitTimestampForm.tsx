import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { Calendar, Clock, Navigation } from "react-feather";
import CustomInput from "../common/CustomInput";

export type VisitDetails = {
  visitDate: string;
  visitDay: string;
  visitSupervision: string;
  startTime: string;
  endTime: string;
  location: string;
};

type VisitTimestampFormProps = {
  visitDetails: VisitDetails;
  setVisitDetails: React.Dispatch<React.SetStateAction<VisitDetails>>;
  readOnly?: boolean;
};

const VisitTimestampForm = ({
  visitDetails,
  setVisitDetails,
  readOnly = false,
}: VisitTimestampFormProps): React.ReactElement => {
  const formik = useFormik({
    initialValues: visitDetails,
    onSubmit: (values: VisitDetails) => {
      console.log(values);
    },
  });

  const captureValue = (e: React.ChangeEvent<any>) => {
      const { name, value } = e.target;
      formik.handleChange(e);
      setVisitDetails(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

  return (
    <FormikProvider value={formik}>
      <Form>
        <FormControl>
          <SimpleGrid columns={3} spacingX="30px" spacingY="10px">
            <Box>
              <FormLabel htmlFor="visitDate">VISIT DATE</FormLabel>
              <Field
                disabled={readOnly}
                as={CustomInput}
                id="visitDate"
                name="visitDate"
                type="string"
                placeholder="MM/DD/YYYY"
                icon={<Icon as={Calendar} />}
                onChange={captureValue}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="visitDay">VISIT DAY</FormLabel>
              <Field
                disabled={readOnly}
                as={CustomInput}
                id="visitDay"
                name="visitDay"
                type="string"
                placeholder="Eg. Wednesday"
                icon={<Icon as={Calendar} />}
                onChange={captureValue}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="visitSupervision">
                VISIT SUPERVISION
              </FormLabel>
              <Select
                disabled={readOnly}
                as={Select}
                id="visitSupervision"
                options={["Full", "Partial", "Unsupervised"]}
                name="visitSupervision"
                type="string"
                placeholder="Select option"
                onChange={captureValue}
              >
                <option value="visit1">Visit 1</option>
                <option value="visit2">Visit 2</option>
                <option value="visit3">Visit 3</option>
              </Select>
            </Box>
          </SimpleGrid>
          <SimpleGrid columns={3} spacingX="30px" spacingY="10px">
            <Box>
              <FormLabel htmlFor="startTime">START TIME</FormLabel>
              <Field
                disabled={readOnly}
                as={CustomInput}
                id="startTime"
                name="startTime"
                type="string"
                placeholder="00:00      24HR"
                icon={<Icon as={Clock} />}
                onChange={captureValue}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="endTime">END TIME</FormLabel>
              <Field
                disabled={readOnly}
                as={CustomInput}
                id="endTime"
                name="endTime"
                type="string"
                placeholder="00:00"
                icon={<Icon as={Clock} />}
                onChange={captureValue}
              />
            </Box>
          </SimpleGrid>
          <Box>
            <FormLabel htmlFor="location">LOCATION</FormLabel>
            <Field
              disabled={readOnly}
              as={CustomInput}
              id="location"
              name="location"
              type="string"
              placeholder="Enter location of visit"
              icon={<Icon as={Navigation} />}
              onChange={captureValue}
            />
          </Box>
        </FormControl>
      </Form>
    </FormikProvider>
  );
};

export default VisitTimestampForm;