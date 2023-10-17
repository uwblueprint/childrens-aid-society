import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  Popover,
  PopoverTrigger,
  InputLeftElement,
} from "@chakra-ui/react";
import { X } from "react-feather";
import { useField } from "formik";
import { CustomSelectDropDown } from "../intake/CustomSelectField";

type MultiTextInputProps = {
  name: string;
  placeholder: string;
  icon?: JSX.Element;
  isReadOnly?: boolean;
  options: string[];
  values: string[];
  newValue: (e: string[]) => void;
};

const MultiTextInput = ({
  name,
  placeholder,
  icon,
  isReadOnly,
  options,
  values,
  newValue,
}: MultiTextInputProps): React.ReactElement => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setFocus] = useState(false);

  const [, , helpers] = useField<string[]>(name);

  const inputRef = useRef<HTMLInputElement>(null);

  const updateField = (newValues: string[]) => {
    newValue(newValues);
    helpers.setValue(newValues);
  };

  useEffect(() => {
    const newFilteredOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase()),
    );

    setFilteredOptions(newFilteredOptions);
  }, [inputValue, options]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === "Enter" && inputValue.trim() !== "") {
      updateField([...values, inputValue.trim()]);
      setInputValue("");
    } else if (
      (key === "Backspace" || key === "Delete") &&
      inputValue === "" &&
      values.length > 0
    ) {
      updateField(values.slice(0, -1));
    }
  };

  const handleDeleteTag = (index: number) => {
    const newTags = [...values];
    newTags.splice(index, 1);
    updateField(newTags);
  };

  return (
    <Popover autoFocus={false} isOpen={isFocused} placement="bottom-start">
      <Box>
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
            {icon &&
              (values.length !== 0 ? (
                <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
              ) : (
                <InputLeftElement pointerEvents="none" h="full">
                  {icon}
                </InputLeftElement>
              ))}
            <Flex
              flexWrap="wrap"
              marginLeft={icon ? "30px" : ""}
              width="auto"
              flexGrow={1}
            >
              {values &&
                values.map((tag, i) => {
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
                      key={i}
                      display="flex"
                      alignItems="center"
                      width="fit-content"
                    >
                      <Box marginRight={isReadOnly ? "8px" : ""}>{tag}</Box>

                      <Box
                        onClick={() => handleDeleteTag(i)}
                        cursor="pointer"
                        display={isReadOnly ? "none" : ""}
                      >
                        <X height="16px" />
                      </Box>
                    </Box>
                  );
                })}
              <Box
                color="gray.600"
                textStyle="button-medium"
                padding="10px 3px 10px 0px"
                minWidth="200px"
                flexGrow={1}
                flex="1"
              >
                <Input
                  ref={inputRef}
                  variant="unstyled"
                  borderRadius={0}
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  display={isReadOnly ? "none" : ""}
                />
              </Box>
            </Flex>
          </InputGroup>
        </PopoverTrigger>
        <CustomSelectDropDown
          options={filteredOptions}
          onSelect={(option) => {
            updateField([...values, option]);
            setInputValue("");
          }}
        />
      </Box>
    </Popover>
  );
};

export default MultiTextInput;
