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
      color={field.value ? "black" : "gray.600"}
    >
      {children}
    </Select>
  );
};
