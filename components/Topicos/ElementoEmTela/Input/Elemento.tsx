/* React */
import React, { useState, forwardRef } from 'react';

/* Framework Style Component */
import styled from 'styled-components';

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
    width: string;
    height: string;
    refLeft:React.MutableRefObject<HTMLDivElement>;
    refTop:React.MutableRefObject<HTMLDivElement>; 
    refRight:React.MutableRefObject<HTMLDivElement>;
    refBottom:React.MutableRefObject<HTMLDivElement>; 
    config?: Config;
    children?: React.ReactNode;
    estado: boolean;
    estadoTransform: string;
}

export const Elemento = forwardRef<HTMLDivElement,  Props>(( { 
   id, 
   width,
   height,
   refLeft, 
   refTop, 
   refRight, 
   refBottom,
   config,
   estado,
   estadoTransform,
}, ref ) => {
  const { setIdTotal, configuracoes, setConfiguracoes } = useConfig();
  const { ativarToggleLateral, adicionaGrupo } = useList();

  const [visibilidade, setVisibilidade] = useState(false);

  function addElementoNoGrupo () {
      if (adicionaGrupo === false) {
          ativarToggleLateral('configs');
      }
  }

  const trocarLateral = (parametro: number) => {
    if (parametro === 2) {
        setIdTotal('');
        ativarToggleLateral('principal');
    } else if(parametro === 1 && config !== undefined) {
        setIdTotal(id);
        addElementoNoGrupo();
        setConfiguracoes(
          configuracoes.map(el => (el.id === id && el.config !== undefined
              ? {...el, config: 
                {...el.config, width:width, height:height}}
              : el
          ))
        ) 
    }
  }

  function setarTransform (e:any, ui:any) {
    setConfiguracoes(
      configuracoes.map(el => (el.id === id && el.config !== undefined
          ? {...el, config: 
            {...el.config, x: ui.lastX, y: ui.lastY}}
          : el
      ))
    )
  }  

  return (
    <Draggable
      disabled={estado} 
      onStop={setarTransform}
      defaultPosition={{x: config?.x, y: config?.y}}
    >     
     <div>
      <DivElemento 
        ref={ref} 
        className="resizeable" 
        onMouseOver={() => setVisibilidade(true)} 
        onMouseOut={() => setVisibilidade(false)}
        onClick={(e) => trocarLateral(e.detail)}
        width={config?.width}
        height={config?.height}
        zIndex={config?.zIndex}
        bgColor='none'
      > 
        <InputElemento 
           width={config?.width} 
           height={config?.height} 
           fontSize={config?.fontSize} 
        />
        <SelectElemento
            visibilidade={visibilidade}
            refLeft={refLeft} 
            refTop={refTop}
            refRight={refRight}
            refBottom={refBottom}
        />
      </DivElemento>
      </div>
    </Draggable>
  )
});

const InputElemento = styled.input<Config>`
      width: ${(p) => p.width};
      height: ${(p) => p.height};
      font-size: ${(p) => p.fontSize};
      padding: 0.5em;
      margin: 0.5em;
      background: ${(p) => p.bgColor};
      border: none;
      border-radius: 3px;
      opacity: ${(p) => p.opacity};
      z-index: ${(p) => p.zIndex};
`;
