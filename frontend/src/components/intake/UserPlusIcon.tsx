import React from 'react';
import { Icon } from '@chakra-ui/react';

export type UserPlusIconProps = {
  boxSize: number;
  color: string;
};


export const UserPlusIcon = (props: UserPlusIconProps) => (
  <Icon viewBox="undefined" {...props}>
    
    <g clip-path="url(#a)" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.666 14.5v-1.333A2.667 2.667 0 0 0 8 10.5H3.333a2.667 2.667 0 0 0-2.666 2.667V14.5M5.667 7.833a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333ZM13.334 5.833v4M15.334 7.833h-4"/>
    </g>
    <defs>
        <clipPath id="a"><path fill="#fff" transform="translate(0 .5)" d="M0 0h16v16H0z"/></clipPath>
    </defs>

  </Icon>
);


