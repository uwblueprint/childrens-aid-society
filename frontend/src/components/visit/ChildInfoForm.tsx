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
import { User } from "react-feather";
import CustomInput from "../common/CustomInput";

export type ChildDetails = {
  familyName: string;
  children: Array<string>;
  childServiceWorker: string;
  childProtectionWorker: string;
  fosterCareCoordinator: string;
};

type ChildInfoFormProps = {
  childDetails: ChildDetails;
  setChildDetails: React.Dispatch<React.SetStateAction<ChildDetails>>;
  readOnly?: boolean;
};

const ChildInfoForm = ({
  childDetails,
  setChildDetails,
  readOnly = false,
}: ChildInfoFormProps): React.ReactElement => {
  const onSubmit = (values: ChildDetails) => {
    setChildDetails(values);
  };

  const formik = useFormik({
    initialValues: childDetails,
    onSubmit: (values: ChildDetails) => {
      onSubmit(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <FormControl>
          <Box>
            <FormLabel htmlFor="familyName">FAMILY NAME</FormLabel>
            <Field
              disabled={readOnly}
              as={CustomInput}
              id="familyName"
              name="familyName"
              type="string"
              placeholder="Enter family name for this visit"
              icon={<Icon as={User} />}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="children">CHILDREN</FormLabel>
            <Field
              disabled={readOnly}
              as={Select}
              id="children"
              name="children"
              type="string"
              placeholder="Select child(ren)"
            />
          </Box>
          <SimpleGrid columns={3} spacingX="30px" spacingY="10px">
            <Box>
              <FormLabel htmlFor="childServiceWorker">
                CHILD SERVICE WORKER
              </FormLabel>
              <Field
                disabled={readOnly}
                as={CustomInput}
                id="childServiceWorker"
                name="childServiceWorker"
                type="string"
                placeholder="Enter name of CSW"
                icon={<Icon as={User} />}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="childProtectionWorker">
                CHILD PROTECTION WORKER
              </FormLabel>
              <Field
                disabled={readOnly}
                as={CustomInput}
                id="childProtectionWorker"
                name="childProtectionWorker"
                type="string"
                placeholder="Enter name of CPW"
                icon={<Icon as={User} />}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="fosterCareCoordinator">
                FOSTER CARE COORDINATOR
              </FormLabel>
              <Field
                disabled={readOnly}
                as={CustomInput}
                id="fosterCareCoordinator"
                name="fosterCareCoordinator"
                type="string"
                placeholder="Enter name of FCC"
                icon={<Icon as={User} />}
              />
            </Box>
          </SimpleGrid>
        </FormControl>
      </Form>
    </FormikProvider>
  );
};

export default ChildInfoForm;
