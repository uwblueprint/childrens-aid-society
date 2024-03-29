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
  rightIconShowPointerEvents?: boolean;
  isInvalid?: boolean;
};

const CustomInput = ({
  icon,
  isReadOnly,
  rightIcon,
  rightIconShowPointerEvents,
  isInvalid,
  ...props
}: CustomInputProps): React.ReactElement => {
  return (
    <InputGroup>
      {icon && <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>}
      <Input
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        paddingLeft={icon ? "2.5rem" : "1rem"}
        {...props}
      />
      {rightIcon && (
        <InputRightElement
          pointerEvents={rightIconShowPointerEvents ? "auto" : "none"}
        >
          {rightIcon}
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default CustomInput;
