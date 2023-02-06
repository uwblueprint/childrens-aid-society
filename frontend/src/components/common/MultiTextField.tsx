/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from "react";
import {
  FormControl,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Box,
} from "@chakra-ui/react";
import { useField } from "formik";
import CustomInput, { CustomInputProps } from "./CustomInput";
import CustomTag from "./CustomTag";
// import { Fields } from "@rjsf/bootstrap-4";

export type MultiTextProps = CustomInputProps & {
  name: string;
  hints: string[];
};

export const MultiTextSuggestions = ({
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

export const MultiTextField = ({
  name,
  hints,
  ...props
}: MultiTextProps): React.ReactElement => {
  const [fields, setFields] = useState(["test1", "test2"]);
  const [currField, , setCurrField] = useField<string>(name);

  // wip
  const addField = (e: any) => {
    if (e.keyCode === 13) {
      // adds field if user presses 'enter'
      setFields((oldState) => [...oldState, e.target.value]);
    }
  };

  const [isFocused, setFocus] = useState(false);

  const filtered = React.useMemo(() => {
    const search = currField.value.toLowerCase();
    return hints.filter((h) => h.toLowerCase().includes(search));
  }, [currField.value, hints]);

  return (
    <Popover autoFocus={false} isOpen={isFocused} placement="bottom-start">
      <PopoverTrigger>
        <FormControl>
          <CustomInput
            {...{ ...currField, ...props }}
            multitext={fields}
            type="string"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </FormControl>
      </PopoverTrigger>
      <MultiTextSuggestions
        hints={filtered}
        onSelect={(value) => setCurrField.setValue(value)}
      />
    </Popover>
  );
};
