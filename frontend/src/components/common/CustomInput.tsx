/* eslint-disable react/jsx-props-no-spreading */
import {
  InputGroup,
  Input,
  InputLeftElement,
  InputProps,
  Tag,
} from "@chakra-ui/react";
import React from "react";
import CustomTag from "./CustomTag";

export type CustomInputProps = InputProps & {
  icon?: JSX.Element;
  multitext?: string[];
};

const CustomInput = ({
  icon,
  multitext,
  ...props
}: CustomInputProps): React.ReactElement => {
  return (
    <InputGroup>
      {icon && <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>}
      <Input paddingLeft={icon ? "2.5rem" : "1rem"} {...props} />
      {multitext &&
        multitext.map((tag, tid) => <CustomTag key={tid}> {tag} </CustomTag>)}
    </InputGroup>
  );
};

export default CustomInput;
