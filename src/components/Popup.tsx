import React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { Typography } from '@mui/material';


interface Props {
    boxRef: React.MutableRefObject<undefined | HTMLElement>, 
    open: boolean,
    message: string
}

export default function SimplePopup( {boxRef, open, message } : Props) {
    const id = open ? 'simple-popper' : undefined;

    return (
      <div>
        <BasePopup id={id} open={open} anchor={boxRef.current}>
            <Typography color="#eb4f47">{message}</Typography>
        </BasePopup>
      </div>
    );
  }