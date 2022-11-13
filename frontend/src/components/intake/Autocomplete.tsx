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
import CustomInput, { CustomInputProps } from "../common/CustomInput";
import CustomTag from "../common/CustomTag";

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
          // if the user holds down the mouse, the input loses
          // focus and the popover is automatically dismissed;
          // this prevents onClick from working, so we need to
          // perform the autofill in onMouseDown instead.
          <Box
            key={index}
            onMouseDown={() => {
              onSelect(hint);
            }}
          >
            <CustomTag controlled pressed={false} setPressed={() => {}}>
              {hint}
            </CustomTag>
          </Box>
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
