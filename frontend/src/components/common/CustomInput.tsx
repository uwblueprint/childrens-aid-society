import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import React from "react";

type CustomInputProps = {
  icon?: JSX.Element;
  [x: string]: unknown;
};

const CustomInput = React.forwardRef(
  (
    { icon, ...props }: CustomInputProps,
    ref: React.LegacyRef<HTMLInputElement> | undefined,
  ) => {
    return (
      <InputGroup>
        {icon ? (
          <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
        ) : null}
        <Input
          ref={ref}
          paddingLeft={icon ? "2.5rem" : "1rem"}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      </InputGroup>
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
