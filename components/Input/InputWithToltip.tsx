import React from 'react';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


interface IInputWithTooltip {
    label:string;
    toltipText?: any;
    toltip:boolean;
    [x:string]:any;
}

const InputWithTooltip = ({label, toltipText, toltip, ...rest}: IInputWithTooltip) => {
  return (
    <TextField
      {...rest}
      label={label}
      InputProps={{
        endAdornment: (
            <Tooltip
            title={
              <span>
                This is a <a href='google.com'>custom</a> tooltip.
              </span>
            }
            arrow
          >
            <IconButton size="small">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        ),
      }}
    />
  );
};

export default InputWithTooltip;