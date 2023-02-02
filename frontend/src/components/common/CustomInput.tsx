/* eslint-disable react/jsx-props-no-spreading */
import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  InputProps,
} from "@chakra-ui/react";
import React from "react";

export type CustomInputProps = InputProps & {
  icon?: JSX.Element;
  isReadOnly?: boolean;
  rightIcon?: JSX.Element;
};

const CustomInput = ({
  icon,
  isReadOnly,
  rightIcon,

  ...props
}: CustomInputProps): React.ReactElement => {
  return (
    <InputGroup>
      {icon && <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>}
      <Input
        isReadOnly={isReadOnly}
        paddingLeft={icon ? "2.5rem" : "1rem"}
        {...props}
      />
      {rightIcon && (
        <InputRightElement pointerEvents="none">{rightIcon}</InputRightElement>
      )}
    </InputGroup>
  );
};

export default CustomInput;
