import { CircularProgress } from '@mui/material'
import { colors } from 'config/colors';
import React from 'react';

const style: any = {
    display: 'flex',
    alignItems: 'center',
    columnGap: '1rem',
    height:'100%'

}
export default function Loader() {
    return (
        <div style={style}>
            <CircularProgress style={{ color: colors.primary }} color={'info'} />Please wait....</div>
    )
}
