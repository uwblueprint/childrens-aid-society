import React, { useState } from "react";
import {
  Box,
  Flex,
  Icon,
  InputGroup,
  Popover,
  PopoverTrigger,
} from "@chakra-ui/react";
import { ChevronDown } from "react-feather";
import CustomInput from "./CustomInput";
import { CustomSelectDropDown } from "../intake/CustomSelectField";

type MultiListSelectProps = {
  placeholder: string;
  options: string[];
  values: string[];
  isReadOnly?: boolean;
};

const MultiListSelect = ({
  placeholder,
  isReadOnly,
  options,
  values,
}: MultiListSelectProps): React.ReactElement => {
  const [isFocused, setFocus] = useState(false);

  return (
    <Popover autoFocus={false} isOpen={isFocused} placement="bottom-start">
      <PopoverTrigger>
        <InputGroup
          padding="4px"
          paddingLeft="12px"
          borderWidth="1px"
          borderStyle="solid"
          borderRadius="4px"
          borderColor={isFocused ? "black" : "gray.100"}
          backgroundColor="gray.50"
          _hover={{ backgroundColor: "gray.100" }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          <Flex flexWrap="wrap" width="auto" flexGrow={1}>
            {values &&
              values.map((tag) => {
                return (
                  <Box
                    margin="4px 7px 4px 0px"
                    color="gray.600"
                    textStyle="button-medium"
                    textAlign="left"
                    overflowWrap="break-word"
                    wordBreak="break-word"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="gray.600"
                    borderRadius="4px"
                    padding="8px 4px 8px 12px"
                    key={tag}
                    display="flex"
                    alignItems="center"
                    width="fit-content"
                  >
                    <Box marginRight={isReadOnly ? "8px" : ""}>{tag}</Box>
                  </Box>
                );
              })}
            <Box flexGrow={1}>
              <CustomInput
                placeholder={values.length > 0 ? "" : placeholder}
                isReadOnly
                rightIcon={<Icon as={ChevronDown} />}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
            </Box>
          </Flex>
        </InputGroup>
      </PopoverTrigger>
      <CustomSelectDropDown
        options={options}
        onSelect={
          () => {}
          // updateValues([...values, option]);
        }
      />
    </Popover>
  );
};

export default MultiListSelect;
