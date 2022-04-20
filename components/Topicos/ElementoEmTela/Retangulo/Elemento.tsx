/* React */
import React, { useState, forwardRef } from 'react';

/* Contexto */
import { useList } from '../../../../contexts/useTopicos';
import { useConfig } from '../../../../contexts/useConfig';

/* Tipagens */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

/* Componentes */
import { SelectElemento  } from '../SelectElemento'
let Draggable = require('react-draggable');

/* Divs */
import DivElemento from './DivElemento';

interface Props {
    id: string;
    refLeft:React.MutableRefObject<HTMLDivElement>;
    refTop:React.MutableRefObject<HTMLDivElement>; 
    refRight:React.MutableRefObject<HTMLDivElement>;
    refBottom:React.MutableRefObject<HTMLDivElement>; 
    config?: Config;
    children?: React.ReactNode;
    estado: boolean;
}

export const Elemento = forwardRef<HTMLDivElement, Props>(( { 
   id, 
   refLeft, 
   refTop, 
   refRight, 
   refBottom,
   config,
   children,
   estado
}, ref ) => {
  const { setIdTotal } = useConfig();
  const { setToggleLateral } = useList();

  const [visibilidade, setVisibilidade] = useState(false);

  const trocarLateral = (parametro: number) => {
    if (parametro === 2) {
        setIdTotal(id);
        setToggleLateral(false);
    } else {
        setIdTotal(id);
        setToggleLateral(true);
    }
  }

  return (
    <Draggable disabled={estado}>   
      <DivElemento 
        ref={ref} 
        className="resizeable" 
        onMouseOver={() => setVisibilidade(true)} 
        onMouseOut={() => setVisibilidade(false)}
        onClick={(e) => trocarLateral(e.detail)}
        bgColor={config?.bgColor}
        width={config?.width}
        height={config?.height}
        border={config?.pxBorder+' '+config?.typeBorder+' '+config?.colorBorder}
        boxShadow={config?.boxShadow}
        borderRadius={config?.borderRadius}
      >
        {children}
        <SelectElemento
            visibilidade={visibilidade}
            refLeft={refLeft} 
            refTop={refTop}
            refRight={refRight}
            refBottom={refBottom}
        />
      </DivElemento>
    </Draggable>
  )
});