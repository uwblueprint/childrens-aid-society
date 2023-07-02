/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from "react";

import {
  FormControl,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
  TagLabel,
  Tag,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import CustomTag from "../common/CustomTag";
import { CustomInputProps } from "../common/CustomInput";

export type VisitCadenceSelectProps = CustomInputProps & {
  name: string;
  placeholder: string;
  icon?: JSX.Element;
  iconRight?: JSX.Element;
  options: string[];
  readOnly?: boolean;
  // eslint-disable-next-line
  setSelected?: any;
  val: string;
  width: string;
  dropdownWidth: string;
};

export const VisitCadenceSelectDropDown = ({
  options,
  onSelect,
  placeholder,
  width,
}: {
  options: string[];
  onSelect: (value: string) => void;
  placeholder: string;
  width: string;
}): React.ReactElement => {
  return (
    <PopoverContent
      bg="gray.100"
      borderColor="gray.50"
      shadow="none"
      maxHeight="300px"
      overflowY="auto"
      display={options.length === 0 ? "none" : "block"}
      width={width}
    >
      <PopoverBody padding="12px 15px 12px 15px">
        <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
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
              style={{
                fontWeight: 400,
                fontSize: "20px",
                fontFamily: "Work Sans",
                cursor: "pointer",
              }}
            >
              {option}
            </Box>
          ))}
        </div>
      </PopoverBody>
    </PopoverContent>
  );
};

export const VisitCadenceSelectField = ({
  options,
  placeholder,
  iconRight,
  readOnly = false,
  setSelected,
  val,
  dropdownWidth,
  width,
}: VisitCadenceSelectProps): React.ReactElement => {
  const [isFocused, setFocus] = useState(false);
  const colorMap = new Map([
    ["SUBMITTED", "#3557BC"],
    ["ACTIVE", "#42A43D"],
    ["ARCHIVED", "#767680"],
    ["PENDING", "#BC8711"],
  ]);
  return (
    <Popover autoFocus={false} isOpen={isFocused} placement="bottom-start">
      <PopoverTrigger>
        <FormControl>
          <InputGroup>
            <Input
              border="transparent"
              placeholder={placeholder}
              value={val}
              style={{
                fontWeight: 400,
                fontSize: "20px",
                fontFamily: "Work Sans",
                color: "#000000",
                cursor: "pointer",
                width,
              }}
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
        <VisitCadenceSelectDropDown
          options={options}
          onSelect={(value) => setSelected(value)}
          placeholder={placeholder}
          width={dropdownWidth}
        />
      )}
    </Popover>
  );
};
