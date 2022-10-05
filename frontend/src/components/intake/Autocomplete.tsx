/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import CustomInput, { CustomInputProps } from "../common/CustomInput";

export type AutocompleteFieldProps = CustomInputProps & {
  name: string;
  hints: string[];
};

export const AutocompleteSuggestions = ({
  hints,
  onSelect,
}: {
  hints: string[];
  onSelect: (value: string) => void;
}): React.ReactElement => {
  return (
    <PopoverContent
      bg="gray.100"
      borderColor="gray.50"
      shadow="none"
      maxHeight="300px"
      overflowY="auto"
      display={hints.length === 0 ? "none" : "block"}
    >
      <PopoverBody padding="8px">
        {hints.map((hint, index) => (
          <Button
            width="100%"
            key={index}
            justifyContent="left"
            padding="5px"
            borderRadius="8px"
            variant="ghost"
            sx={{
              ":hover": {
                backgroundColor: "gray.300",
              },
            }}
            // if the user holds down the mouse, the input loses
            // focus and the popover is automatically dismissed;
            // this prevents onClick from working, so we need to
            // perform the autofill in onMouseDown instead.
            onMouseDown={() => {
              onSelect(hint);
            }}
          >
            <Box
              bg="blue.50"
              color="gray.700"
              padding="8px 12px"
              borderRadius="4px"
              borderColor="gray.700"
              borderWidth="1px"
              fontSize="12px"
            >
              {hint}
            </Box>
          </Button>
        ))}
      </PopoverBody>
    </PopoverContent>
  );
};

export const AutocompleteField = ({
  name,
  hints,
  ...props
}: AutocompleteFieldProps): React.ReactElement => {
  const [field, , helpers] = useField<string>(name);

  const [isFocused, setFocus] = useState(false);

  const filtered = React.useMemo(() => {
    const search = field.value.toLowerCase();
    return hints.filter((h) => h.toLowerCase().includes(search));
  }, [field.value, hints]);

  return (
    <Popover autoFocus={false} isOpen={isFocused} placement="bottom-start">
      <PopoverTrigger>
        <FormControl>
          <CustomInput
            {...{ ...field, ...props }}
            type="string"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </FormControl>
      </PopoverTrigger>
      <AutocompleteSuggestions
        hints={filtered}
        onSelect={(value) => helpers.setValue(value)}
      />
    </Popover>
  );
};

export type SelectFieldProps = SelectProps & {
  name: string;
};

export const CustomSelectField = ({
  name,
  children,
  ...props
}: SelectFieldProps): React.ReactElement => {
  const [field] = useField<string>(name);

  return (
    <Select
      {...{ ...field, ...props }}
      name={name}
      variant="filled"
      height="48px"
      backgroundColor="gray.50"
      borderColor="gray.100"
      borderWidth="1px"
      fontSize="18px"
      color={field.value ? "black" : "gray.600"}
      sx={{ ":hover, :focus": { backgroundColor: "gray.100" } }}
    >
      {children}
    </Select>
  );
};
