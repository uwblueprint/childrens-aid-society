/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */

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
} from "@chakra-ui/react";
import CustomTag from "../common/CustomTag";
import { CustomInputProps } from "../common/CustomInput";

export type StatusSelectProps = CustomInputProps & {
  name: string;
  placeholder: string;
  icon?: JSX.Element;
  iconRight?: JSX.Element;
  options: string[];
  readOnly?: boolean;
  // eslint-disable-next-line
  setSelected?: any;
};

export const StatusSelectDropDown = ({
  options,
  onSelect,
  placeholder,
}: {
  options: string[];
  onSelect: (value: string) => void;
  placeholder: string;
}): React.ReactElement => {
  const colorMap = new Map([
    ["SUBMITTED", "#3557BC"],
    ["ACTIVE", "#42A43D"],
    ["ARCHIVED", "#767680"],
    ["PENDING", "#BC8711"],
  ]);
  const lightercolorMap = new Map([
    ["SUBMITTED", "#8196d4"],
    ["ACTIVE", "#78b874"],
    ["ARCHIVED", "#99999e"],
    ["PENDING", "#cfae67"],
  ]);
  return (
    <PopoverContent
      bg="gray.100"
      borderColor="gray.50"
      shadow="none"
      maxHeight="300px"
      overflowY="auto"
      display={options.length === 0 ? "none" : "block"}
      width="430px"
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
            <CustomTag
              controlled
              pressed={false}
              setPressed={() => {}}
              backgroundColor={
                option === placeholder
                  ? lightercolorMap.get(option)
                  : colorMap.get(option)
              }
              _hover={{
                bg:
                  option === placeholder
                    ? `${lightercolorMap.get(option)}`
                    : `${colorMap.get(option)}`,
              }}
              color="white"
              border="transparent"
              borderRadius="6px"
            >
              {option}
            </CustomTag>
          </Box>
        ))}
      </PopoverBody>
    </PopoverContent>
  );
};

export const StatusSelectField = ({
  options,
  placeholder,
  iconRight,
  readOnly = false,
  setSelected,
  name,
  icon,
}: StatusSelectProps): React.ReactElement => {
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
            <InputLeftAddon
              width="auto"
              height="auto"
              backgroundColor="gray.50"
              paddingLeft="14px"
            >
              <Tag
                borderRadius="6px"
                border="transparent"
                padding="8px 12px"
                _hover={{
                  bg: `${colorMap.get(placeholder)}`,
                }}
                backgroundColor={colorMap.get(placeholder)}
                color="white"
              >
                <TagLabel
                  whiteSpace="normal"
                  wordBreak="break-word"
                  textAlign="left"
                >
                  {placeholder}
                </TagLabel>
              </Tag>
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
        <StatusSelectDropDown
          options={options}
          onSelect={(value) => setSelected(value)}
          placeholder={placeholder}
        />
      )}
    </Popover>
  );
};
