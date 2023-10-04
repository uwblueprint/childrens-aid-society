/* eslint-disable react/jsx-props-no-spreading */

import React, { Dispatch, SetStateAction, useState } from "react";

import {
  FormControl,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  Tag,
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
  readOnly?: boolean;
  value?: string;
  setValue?: Dispatch<SetStateAction<any>>;
  handler?: () => void;
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
  readOnly = false,
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
      {!readOnly && (
        <CustomSelectDropDown
          options={options}
          onSelect={(value) => helpers.setValue(value)}
        />
      )}
    </Popover>
  );
};

export const CustomSelectNonFormik = ({
  options,
  placeholder,
  iconRight,
  readOnly = false,
  value,
  setValue,
  handler,
}: CustomSelectProps): React.ReactElement => {
  const [isFocused, setFocus] = useState(false);

  return (
    <Popover autoFocus={false} isOpen={isFocused} placement="bottom-start">
      <PopoverTrigger>
        <FormControl>
          <InputGroup>
            <InputLeftAddon
              width="auto"
              height="auto"
              backgroundColor="gray.50"
              paddingLeft="14px"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            >
              <Tag>{value || placeholder}</Tag>
            </InputLeftAddon>

            <Input
              border="transparent"
              isReadOnly
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              _hover={{ backgroundColor: "gray.50" }}
              _focus={{ boxShadow: "none" }}
            />
            <InputRightElement pointerEvents="none">
              {iconRight}
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </PopoverTrigger>
      {!readOnly && (
        <CustomSelectDropDown
          options={options}
          onSelect={(selected) => {
            if (setValue !== undefined) {
              setValue(selected);
            }
            if (handler !== undefined) {
              handler();
            }
          }}
        />
      )}
    </Popover>
  );
};
