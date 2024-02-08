'use client';
import { FormControlLabel, Radio } from '@mui/material'

import React from 'react'

interface IRadio {
    label: any;
    [x: string]: any;
}
export default function RadioButton({ label, ...rest }: IRadio) {
    return (
        <FormControlLabel 
         control={<Radio />} 
         label={label} {...rest} 
         sx={{fontFamily: 'Poppins'}}
         />
    );
}
