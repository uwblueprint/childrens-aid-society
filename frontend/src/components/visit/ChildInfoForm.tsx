import React from "react";
import { Box, FormControl, FormLabel, Icon, Select, SimpleGrid } from "@chakra-ui/react";
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

const ChildInfoForm = ({ childDetails, setChildDetails, readOnly = false }: ChildInfoFormProps): React.ReactElement => {
  const formik = useFormik({
    initialValues: childDetails,
    onSubmit: (values: ChildDetails) => {
      console.log(values);
    },
  });

  const captureValue = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    formik.handleChange(e);
    setChildDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

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
              type="text"
              placeholder="Enter family name for this visit"
              icon={<Icon as={User} />}
              onChange={captureValue}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="children">CHILDREN</FormLabel>
            <Select
              disabled={readOnly}
              id="children"
              name="children"
              onChange={captureValue}
              value={formik.values.children}
              placeholder="Select child(ren)"
            >
              {/* TODO: Update these options. */}
              <option value="child1">Child 1</option>
              <option value="child2">Child 2</option>
              <option value="child3">Child 3</option>
            </Select>
          </Box>
          <SimpleGrid columns={3} spacingX="30px" spacingY="10px">
            <Box>
              <FormLabel htmlFor="childServiceWorker">CHILD SERVICE WORKER</FormLabel>
              <Field
                disabled={readOnly}
                as={CustomInput}
                id="childServiceWorker"
                name="childServiceWorker"
                type="text"
                placeholder="Enter name of CSW"
                icon={<Icon as={User} />}
                onChange={captureValue}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="childProtectionWorker">CHILD PROTECTION WORKER</FormLabel>
              <Field
                disabled={readOnly}
                as={CustomInput}
                id="childProtectionWorker"
                name="childProtectionWorker"
                type="text"
                placeholder="Enter name of CPW"
                icon={<Icon as={User} />}
                onChange={captureValue}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="fosterCareCoordinator">FOSTER CARE COORDINATOR</FormLabel>
              <Field
                disabled={readOnly}
                as={CustomInput}
                id="fosterCareCoordinator"
                name="fosterCareCoordinator"
                type="text"
                placeholder="Enter name of FCC"
                icon={<Icon as={User} />}
                onChange={captureValue}
              />
            </Box>
          </SimpleGrid>
        </FormControl>
      </Form>
    </FormikProvider>
  );
};

export default ChildInfoForm;
