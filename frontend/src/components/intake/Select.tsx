/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Select, SelectProps } from "@chakra-ui/react";
import { useField } from "formik";

export type SelectFieldProps = SelectProps & {
  name: string;
};

export const CustomSelectField = ({
  name,
  children,
  ...props
}: SelectFieldProps): React.ReactElement => {
  const [field] = useField<string>(name);

  return (
    <Select
      {...{ ...field, ...props }}
      name={name}
      variant="filled"
      height="48px"
      backgroundColor="gray.50"
      borderColor="gray.100"
      borderWidth="1px"
      fontSize="18px"
      color={field.value ? "black" : "gray.600"}
      sx={{ ":hover, :focus": { backgroundColor: "gray.100" } }}
    >
      {children}
    </Select>
  );
};
