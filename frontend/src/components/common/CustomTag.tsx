/* eslint-disable react/jsx-props-no-spreading */
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
};

const CustomTag = ({
  icon,
  placeholder,
  ...props
}: CustomTagProps): React.ReactElement => {
  const [pressed, setPressed] = useState(false);
  function handleComponentClick() {
    setPressed(!pressed);
  }
  return (
    <Container
      variant="selectionTag"
      aria-pressed={pressed}
      onClick={handleComponentClick}
    >
      <Tag
        border="1px solid"
        borderColor="gray.700"
        padding="8px 12px"
        {...props}
      >
        <TagLabel>{placeholder}</TagLabel>
        {icon && <TagRightIcon pointerEvents="none">{icon}</TagRightIcon>}
      </Tag>
    </Container>
  );
};

export default CustomTag;
