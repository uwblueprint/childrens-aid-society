import { Button, HStack, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export type FormSelectorProps = {
    formTitles: string[];
    activeForm: number;
    onClick: (index: number) => void;
};

const FormSelector = ({formTitles, activeForm, onClick}: FormSelectorProps): React.ReactElement => {
    return (
        <HStack spacing="80px">
            {formTitles.map((formTitle, index) => {
                const isActive = index === activeForm;
                const color = isActive ? "blue.50" : "transparent";
                return (
                    // eslint-disable-next-line
                    <Link 
                        key={index} 
                        onClick={() => {onClick(index)}} 
                        padding="2px 16px" 
                        bg={color} 
                        color="gray.600" 
                        borderRadius="4px" 
                        style={{ textDecoration: 'none' }}
                    >
                        <Text textStyle="title-small">{formTitle}</Text>
                    </Link>
                )
            })}
        </HStack>
    );
};

export default FormSelector