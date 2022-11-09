import { Box, Button, Icon, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChevronLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import IntakeHeader from "../IntakeHeader";
import ChildInformation from "./ChildInformationForm";
import ChildProviderForm from "./ChildProviderForm";
import FormSelector from "./FormSelector";
import SchoolDaycareForm from "./SchoolDaycareForm";

const AddChild = (): React.ReactElement => {
    const [activeFormIndex, setActiveFormIndex] = useState(0)
    const history = useHistory();

    const renderChildForm = () => {
        switch (activeFormIndex)  {
            case 0:
                return (
                    <ChildInformation/>
                )
            case 1:
                return (
                    <SchoolDaycareForm/>
                )
            case 2:
                return (
                    <ChildProviderForm/>
                )
            default:
                return (
                    <Text>Error</Text>
                )
        }
    }

    return (
        <>
            <IntakeHeader
                primaryTitle="Add child"
                secondaryTitle="Initiate New Case"
            />
            <VStack style={{ padding: "50px 100px 25px 100px" }} spacing="50px" align="flex-start">
                <Button 
                    color="blue.400"
                    variant="link"
                    onClick={() => {history.goBack()}}
                    leftIcon={<Icon as={ChevronLeft} h="16px"/>}
                >
                    Back to case individuals 
                </Button>
                <FormSelector formTitles={["Child information", "School / Daycare", "Providers"]} activeForm={activeFormIndex} onClick={setActiveFormIndex}/>
                {renderChildForm()}
            </VStack>
        </>
    )
};

export default AddChild