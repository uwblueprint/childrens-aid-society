import React, { useState, useRef, useEffect } from "react";
import { Box, Flex, Input } from "@chakra-ui/react";
import { X } from "react-feather";

type MultiTextInputProps = {
  placeholder: string;
  options: string[];
  values: string[];
  setState: React.Dispatch<React.SetStateAction<any>>;
};

const MultiTextInput = ({
  placeholder,
  options,
  values,
  setState,
}: MultiTextInputProps) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [inputValue, setInputValue] = useState<string>("");
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const newFilteredOptions = options.filter((option) => {
      return option.toLowerCase().startsWith(inputValue.toLowerCase());
    });

    setFilteredOptions(newFilteredOptions);
    setShowAutocomplete(newFilteredOptions.length !== 0);
  }, [inputValue]);

  useEffect(() => {
    setShowAutocomplete(false);
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === "Enter" && inputValue.trim() !== "") {
      setState([...values, inputValue.trim()]);
      setInputValue("");
    } else if (
      (key === "Backspace" || key === "Delete") &&
      inputValue === "" &&
      values.length > 0
    ) {
      setState(values.slice(0, -1));
    }
  };

  const handleDeleteTag = (index: number) => {
    const newTags = [...values];
    newTags.splice(index, 1);
    setState(newTags);
  };

  return (
    <Box>
      <Box
        padding="4px"
        borderWidth="1px"
        borderStyle="solid"
        borderTopRadius="4px"
        borderBottomRadius={showAutocomplete ? "0px" : "4px"}
        borderColor="gray.100"
        backgroundColor="gray.50"
        _hover={{ backgroundColor: "gray.100" }}
      >
        <Flex flexWrap="wrap">
          {values &&
            values.map((tag, i) => {
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
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() => setShowAutocomplete(true)}
            />
          </Box>
        </Flex>
      </Box>
      <Box
        ref={autocompleteRef}
        display={showAutocomplete ? "" : "none"}
        position="absolute"
        top="100%"
        width="100%"
        backgroundColor="gray.100"
        borderWidth="1px"
        borderColor="gray.300"
        borderTopRadius="0"
        borderBottomRadius="4px"
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
                setState([...values, option]);
                setInputValue("");
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
