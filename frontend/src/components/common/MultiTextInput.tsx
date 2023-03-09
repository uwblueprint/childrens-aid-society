import React, { useState, useRef, useEffect } from "react";
import { Field } from "formik";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { X } from "react-feather";
import CustomInput from "./CustomInput";

type MultiTextInputProps = {
  id: string;
  options: string[];
  values: string[];
  state: any;
  setState: any;
};

const MultiTextInput = ({
  id,
  options,
  values,
  state,
  setState,
}: MultiTextInputProps) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>(values);
  // const inputRef = useRef<HTMLInputElement>(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setShowAutocomplete(false);

    // const { relatedTarget } = event;
    // if (autocompleteRef.current?.contains(relatedTarget as Node)) {
    //   console.log("Blur event occurred outside of autocomplete");
    //   setShowAutocomplete(false);
    //   // handle onBlur logic here
    // }
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        !autocompleteRef.current?.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, keyCode } = event;
    console.log(`[${inputValue}]`);

    setFilteredOptions(
      options.filter((option) => {
        console.log(inputValue.toLowerCase());
        console.log(option.toLowerCase().startsWith(inputValue.toLowerCase()));
        return option.toLowerCase().startsWith(inputValue.toLowerCase());
      }),
    );

    if ((key === "Enter" || keyCode === 13) && inputValue.trim() !== "") {
      setTags((prevState) => [...prevState, inputValue.trim()]);
      setInputValue("");
    } else if (
      (key === "Backspace" ||
        key === "Delete" ||
        keyCode === 8 ||
        keyCode === 46) &&
      inputValue === "" &&
      tags.length > 0
    ) {
      setTags((prevState) => prevState.slice(0, -1));
    }
  };

  const handleDeleteTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <Box>
      <Box
        padding="4px"
        borderWidth="1px"
        borderStyle="solid"
        borderRadius="4px"
        borderColor="gray.100"
        backgroundColor="gray.50"
        _hover={{ backgroundColor: "gray.100" }}
      >
        <Flex flexWrap="wrap">
          {tags.map((tag, i) => {
            return (
              <Box
                margin="4px 0px 4px 7px"
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
                <Box>{tag}</Box>

                <Box onClick={() => handleDeleteTag(i)} cursor="pointer">
                  <X height="16px" />
                </Box>
              </Box>
            );
          })}
          <Box
            color="gray.600"
            textStyle="button-medium"
            padding="10px 12px"
            minWidth="250px"
            flex="1"
          >
            <Input
              ref={inputRef}
              variant="unstyled"
              borderRadius={0}
              placeholder="Select familial concerns..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyUp={handleKeyPress}
              onFocus={() => setShowAutocomplete(true)}
              // onBlur={handleBlur}
              // ref={inputRef}
            />
          </Box>
        </Flex>
      </Box>
      <Box
        ref={autocompleteRef}
        display={showAutocomplete ? "" : "none"} // {filteredOptions.length > 0 && inputValue !== "" ? "" : "none"}
        position="absolute"
        top="100%"
        width="100%"
        backgroundColor="gray.100"
        borderWidth="1px"
        borderColor="gray.300"
        boxShadow="sm"
        zIndex="1"
        padding="4px"
        maxHeight="150px"
        overflowY="auto"
      >
        {filteredOptions.map((option, i) => {
          return (
            <Box
              key={i}
              margin="4px 0px 4px 7px"
              color="gray.600"
              textStyle="button-medium"
              textAlign="left"
              overflowWrap="break-word"
              wordBreak="break-word"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.600"
              borderRadius="4px"
              padding="8px 12px"
              display="flex"
              alignItems="center"
              width="fit-content"
              cursor="pointer"
              backgroundColor="gray.50"
              _hover={{ backgroundColor: "gray.100" }}
              onClick={() => {
                setTags((prevState) => [...prevState, option]);
                setInputValue("");
                setShowAutocomplete(false);
              }}
            >
              {option}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MultiTextInput;
