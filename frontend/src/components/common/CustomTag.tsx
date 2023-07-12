/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import {
  Tag,
  TagLabel,
  TagRightIcon,
  TagProps,
  Container,
} from "@chakra-ui/react";
import React, { useState } from "react";

type CustomTagProps = TagProps & {
  icon?: JSX.Element;
} & (
    | {
        controlled: true;
        pressed: boolean;
        setPressed: (pressed: boolean) => void;
      }
    | {
        controlled?: false;
      }
  );

const CustomTag = (props: CustomTagProps): React.ReactElement => {
  const { icon, controlled, children, ...otherProps } = props;
  const [rawPressed, setRawPressed] = useState(false);
  const pressed = props.controlled ? props.pressed : rawPressed;
  const setPressed = props.controlled
    ? props.setPressed.bind(props)
    : setRawPressed;
  const handleComponentClick = () => {
    setPressed(!pressed);
  };
  return (
    <Container
      variant="selectionTag"
      aria-pressed={pressed}
      onClick={handleComponentClick}
      cursor={controlled ? "pointer" : ""}
    >
      <Tag
        border="1px solid"
        borderColor="gray.700"
        padding="8px 12px"
        {...otherProps}
      >
        <TagLabel whiteSpace="normal" wordBreak="break-word" textAlign="left">
          {children}
        </TagLabel>
        {icon && <TagRightIcon pointerEvents="none">{icon}</TagRightIcon>}
      </Tag>
    </Container>
  );
};

export default CustomTag;
