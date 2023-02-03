/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from "react";

import {
  FormControl,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Box,
} from "@chakra-ui/react";
import { useField } from "formik";
import CustomTag from "../common/CustomTag";
import CustomInput, { CustomInputProps } from "../common/CustomInput";

export type CustomSelectProps = CustomInputProps & {
  name: string;
  placeholder: string;
  icon?: JSX.Element;
  iconRight?: JSX.Element;
  options: string[];
};

export const CustomSelectDropDown = ({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (value: string) => void;
}): React.ReactElement => {
  return (
    <PopoverContent
      bg="gray.100"
      borderColor="gray.50"
      shadow="none"
      maxHeight="300px"
      overflowY="auto"
      display={options.length === 0 ? "none" : "block"}
    >
      <PopoverBody padding="8px">
        {options.map((option, index) => (
          // if the user holds down the mouse, the input loses
          // focus and the popover is automatically dismissed;
          // this prevents onClick from working, so we need to
          // perform the autofill in onMouseDown instead.
          <Box
            key={index}
            onMouseDown={() => {
              onSelect(option);
            }}
          >
            <CustomTag controlled pressed={false} setPressed={() => {}}>
              {option}
            </CustomTag>
          </Box>
        ))}
      </PopoverBody>
    </PopoverContent>
  );
};

export const CustomSelectField = ({
  name,
  options,
  placeholder,
  icon,
  iconRight,
  ...props
}: CustomSelectProps): React.ReactElement => {
  const [field, , helpers] = useField<string>(name);

  const [isFocused, setFocus] = useState(false);

  return (
    <Popover autoFocus={false} isOpen={isFocused} placement="bottom-start">
      <PopoverTrigger>
        <FormControl>
          <CustomInput
            {...{ ...field, ...props }}
            placeholder={placeholder}
            isReadOnly
            icon={icon}
            rightIcon={iconRight}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </FormControl>
      </PopoverTrigger>
      <CustomSelectDropDown
        options={options}
        onSelect={(value) => helpers.setValue(value)}
      />
    </Popover>
  );
};
