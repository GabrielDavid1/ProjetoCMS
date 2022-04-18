import React from "react";

/* State */
import { useState } from 'react';

  interface ModalContextValue {
    open: boolean;
    open2: boolean;
    setOpen: (data: boolean) => void;
    setOpen2: (data: boolean) => void;

    handleOpen: () => void;
    handleClose: () => void;

    handleOpen2: () => void;
    handleClose2: () => void;
  }
  
  interface Props {
    children: React.ReactNode;
  }
  
  const listInitial: ModalContextValue = {
    open: false,
    open2: false,
    setOpen: data => {},
    setOpen2: data => {}, 

    handleOpen:  () => {},
    handleClose: () => {},

    handleOpen2:  () => {},
    handleClose2: () => {}
  };
  
  const ModalContext = React.createContext<ModalContextValue>(listInitial);
  
  export function ModalProvider({ children }: Props) {

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    
    /*********************  Funções *************************/
    const handleOpen  =  () => { setOpen(true);   }
    const handleClose =  () => { setOpen(false);  }
  
    const handleOpen2  = () => { setOpen2(true);  }
    const handleClose2 = () => { setOpen2(false); }

    return (
      <ModalContext.Provider 
          value={{ 
                  open, setOpen, 
                  open2, setOpen2,
                  handleOpen, handleClose,
                  handleOpen2, handleClose2
                }}
      >
        {children}
      </ModalContext.Provider>
    );
  }
  
  export function useModal() {
      const context = React.useContext(ModalContext);

      const { 
        open, setOpen, 
        open2, setOpen2,
        handleOpen, handleClose,
        handleOpen2, handleClose2
      } = context;

      return { 
        open, setOpen, 
        open2, setOpen2,
        handleOpen, handleClose,
        handleOpen2, handleClose2
      };
  }