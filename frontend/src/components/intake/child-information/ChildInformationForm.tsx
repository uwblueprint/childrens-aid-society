import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { User, File, Calendar } from "react-feather";
import CustomInput from "../../common/CustomInput";
import OptionalLabel from "../OptionalLabel";

export type ChildDetails = {
  childName: string;
  cpinFileNumber: string;
  dateOfBirth: string;
  workerName: string;
  specialNeeds: string;
  childBehaviours: string;
};

type ChildFormProps = {
  childDetails: ChildDetails;
  setChildDetails: React.Dispatch<React.SetStateAction<ChildDetails>>;
};

const ChildInformationForm = ({
  childDetails,
  setChildDetails,
}: ChildFormProps): React.ReactElement => {
  const onSubmit = (values: ChildDetails) => {
    setChildDetails(values);
  };

const [dateOfBirthError, setDateOfBirthError] = useState<string | null>(
  null
);

function validateDate(value: string) {
  if (!value) {
    setDateOfBirthError('Required');
  } else if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[01])$/.test(value)) {
    setDateOfBirthError('Invalid Date');
  } else {
    setDateOfBirthError(null);
  }
}

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={childDetails}
        onSubmit={onSubmit}
      >
      {({ errors, touched }) => (
        <Form style={{ padding: "2rem 12rem" }}>
          <FormControl style={{ padding: "30px" }}>
            <SimpleGrid columns={2} spacingX="3rem" spacingY="0.75rem">
              <Box>
                <FormLabel htmlFor="childName">NAME</FormLabel>
                <Field
                  as={CustomInput}
                  id="childName"
                  name="childName"
                  type="string"
                  placeholder="Enter name of child"
                  icon={<Icon as={User} />}
                  onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChildDetails({
                      ...childDetails,
                      childName: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                <FormLabel htmlFor="dateOfBirth">DATE OF BIRTH</FormLabel>
                <Field
                  as={CustomInput}
                  name="dateOfBirth"
                  id="dateOfBirth"
                  type="string"
                  placeholder="YYYY-MM-DD"
                  icon={<Icon as={Calendar} />}
                  onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChildDetails({
                      ...childDetails,
                      dateOfBirth: e.target.value,
                    })
                  }
                  validate={validateDate}
                />
                {dateOfBirthError && (
                  <div style={{ color: "red" }}>{dateOfBirthError}</div>
                )}
              </Box>
              <Box>
                <FormLabel htmlFor="cpinFileNumber">
                  CHILD FILE CPIN NUMBER
                </FormLabel>
                <Field
                  as={CustomInput}
                  id="cpinFileNumber"
                  name="cpinFileNumber"
                  type="string"
                  placeholder="e.g. 123456789"
                  icon={<Icon as={File} />}
                  onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChildDetails({
                      ...childDetails,
                      cpinFileNumber: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                <FormLabel htmlFor="workerName">
                  CHILDREN SERVICES OR KINSHIP WORKER <OptionalLabel />
                </FormLabel>
                <Field
                  as={CustomInput}
                  id="workerName"
                  name="workerName"
                  type="string"
                  placeholder="Enter worker name"
                  onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setChildDetails({
                      ...childDetails,
                      workerName: e.target.value,
                    })
                  }
                />
              </Box>
            </SimpleGrid>
            <Box paddingTop="10px">
              <FormLabel htmlFor="specialNeeds">
                SPECIAL NEEDS <OptionalLabel />
              </FormLabel>
              <Field
                as={CustomInput}
                id="specialNeeds"
                name="specialNeeds"
                type="string"
                placeholder="Enter any special needs of the child"
                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setChildDetails({
                    ...childDetails,
                    specialNeeds: e.target.value,
                  })
                }
              />
            </Box>
            <Box paddingTop="10px">
              <FormLabel htmlFor="childBehaviours">
                CHILD BEHAVIOURS AND CONCERNS <OptionalLabel />
              </FormLabel>
              <Field
                as={CustomInput}
                id="childBehaviours"
                name="childBehaviours"
                type="string"
                placeholder="Select or enter any behaviours and concerns to note"
                onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setChildDetails({
                    ...childDetails,
                    childBehaviours: e.target.value,
                  })
                }
              />
            </Box>
          </FormControl>
        </Form>
        )}
      </Formik>
    </>
  );
};

export default ChildInformationForm;
