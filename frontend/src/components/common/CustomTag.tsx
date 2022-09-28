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
    // aria-pressed=true;
    if (pressed === false) {
      setPressed(true);
    } else {
      setPressed(false);
    }
  }
  return (
    <Container aria-pressed={pressed} onClick={handleComponentClick}>
      <Tag border="1px solid" borderColor="gray.700" padding="8px 12px">
        <TagLabel>{placeholder}</TagLabel>
        {icon && <TagRightIcon pointerEvents="none">{icon}</TagRightIcon>}
      </Tag>
    </Container>
  );
};

export default CustomTag;
