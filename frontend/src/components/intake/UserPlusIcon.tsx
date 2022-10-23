/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { IconProps, Icon } from "@chakra-ui/react";

export const UserPlusIcon = (props: IconProps) => 
<Icon viewBox="0 0 18 16" {...props}>
    <path d="M11.6667 14V12.6667C11.6667 11.9594 11.3858 11.2811 10.8857 10.781C10.3856 10.281 9.70733 10 9.00008 10H4.33341C3.62617 10 2.94789 10.281 2.4478 10.781C1.9477 11.2811 1.66675 11.9594 1.66675 12.6667V14" stroke="#00287D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.66667 7.33333C8.13943 7.33333 9.33333 6.13943 9.33333 4.66667C9.33333 3.19391 8.13943 2 6.66667 2C5.19391 2 4 3.19391 4 4.66667C4 6.13943 5.19391 7.33333 6.66667 7.33333Z" stroke="#00287D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.3333 5.33301V9.33301" stroke="#00287D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.3333 7.33301H12.3333" stroke="#00287D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
</Icon>;

export default UserPlusIcon;