import React, { useState } from "react";
import { Box, Flex, Select, Text, Button, FormLabel, SimpleGrid } from "@chakra-ui/react";
import ModalComponent from "../common/ModalComponent";

import CustomInput from "../common/CustomInput";
import OptionalLabel from "../intake/OptionalLabel";


export type StatusChangeProps = {
   caseNum?: number;
   status?: string;
};

const StatusChange = ({caseNum, status}: StatusChangeProps): React.ReactElement => {
   const [isOpen, setIsOpen] = useState(true);
   const [selectedOption, setSelectedOption] = useState(status);
   const [workerName, setWorkerName] = useState("");
   const [meetingNotes, setMeetingNotes] = useState("");


   const openModal = () => {
      setIsOpen(true);
   };

   const closeModal = () => {
      setIsOpen(false);
   };

   return (
      <Box>
        <ModalComponent
            primaryTitle={`Case ${caseNum}`}
            secondaryTitle=""
            modalContent={
               <Box>
                  <Box borderWidth='1px' borderRadius='lg' padding='1rem' position="relative">
                  <Text fontWeight="semibold" fontSize='xl'>Case Submission</Text>
                  <Text>Lead: XXX</Text>
                  <Text>Date: XXX</Text>
                  <Text>Family Name: XXX</Text>
                  <Flex justify="flex-end" align="flex-end">
                  <Button variant="tertiary" border="1px solid" paddingLeft="6" paddingRight="6">Review</Button> 
                  </Flex>
                  </Box>
               <SimpleGrid columns={2} spacingX="3rem" spacingY="0.75rem">
                  <Box>
                     <FormLabel htmlFor="status">STATUS</FormLabel>
                     <Select
                     id="status"
                     placeholder = {selectedOption || "Select an option"}
                     value={selectedOption}
                     onChange={(event) => {
                        setSelectedOption(event.target.value);
                     }}
                     >
                     <option value="SUBMITTED" style={{"color":"red"}}>SUBMITTED</option> 
                     <option value="PENDING" style={{"color":"orange"}}>PENDING</option> 
                     <option value="ACTIVE" style={{"color":"green"}}>ACTIVE</option> 
                     <option value="ARCHIVED" style={{"color":"gray"}}>ARCHIVED</option> 
                  </Select>
                  </Box>
                  <Box>
                     <FormLabel htmlFor="childrenservicesworker">CHILDREN SERVICES OR KINSHIP WORKER</FormLabel>
                     <CustomInput
                     id="childrenservicesworker"
                     type="string"
                     placeholder="Enter worker name"
                     value={workerName}
                     onChange={(event) => {
                        setWorkerName(event.target.value);
                     }}
                     isDisabled = {!(selectedOption === "ARCHIVED")}
                     
                  />
               </Box>
               
                  
            </SimpleGrid>
            <Box marginTop="0.75rem">
               <FormLabel htmlFor="meetingnotes">
                  MEETING NOTES <OptionalLabel />
               </FormLabel>
               <CustomInput
                  id="meetingnotes"
                  type="string"
                  placeholder="Note any additional information in regards to this case."
                  height="10rem"
                  paddingBottom="7rem"
                  value={meetingNotes}
                  onChange={(event) => {
                     setMeetingNotes(event.target.value);
                  }}
               />
            </Box>
            {selectedOption === "ARCHIVED" ? <Button variant="primary" backgroundColor="red" position="absolute" bottom={9} >Delete</Button> : ""}
            { /* save button is part of ModalComponent so don't know how to make delete button aligned */ }
            </Box>
         }
         disabled={(selectedOption === "" || workerName === "")} 
         primaryButtonTitle="Save"
         onClick={() => {
         console.log("Primary button clicked");
         closeModal(); 
         }}
         isOpen={isOpen}
         onClose={closeModal}
         unsavedProgressModal={false} 
         />

      </Box>
    );
}

export default StatusChange;