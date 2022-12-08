/* eslint-disable react/jsx-props-no-spreading */
import {
  InputGroup,
  Input,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";
import React from "react";

export type CustomInputProps = InputProps & {
  icon?: JSX.Element;
};

const CustomInput = ({
  icon,
  ...props
}: CustomInputProps): React.ReactElement => {
  return (
    <InputGroup>
      {icon && <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>}
      <Input paddingLeft={icon ? "2.5rem" : "1rem"} {...props} />
    </InputGroup>
  );
};

export default CustomInput;
