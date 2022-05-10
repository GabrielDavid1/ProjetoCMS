/* React */
import React, { forwardRef } from 'react';

/* Contexto */
import dynamic from 'next/dynamic';
import { useList } from '../../../../contexts/useTopicos';
import { useConfig } from '../../../../contexts/useConfig';

/* Tipagens */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

/* Componentes */
let Draggable = require('react-draggable');

/* Componente Framework Material-UI */
import TextareaAutosize from '@mui/material/TextareaAutosize';

/* Divs */
import DivElemento from './DivElemento';

interface Props {
  id: string;
  config?: Config;
}

export const Elemento = forwardRef<HTMLDivElement,  Props>(({ 
 id, 
 config,
}, ref ) => {
  const { setIdTotal, configuracoes, setConfiguracoes } = useConfig();
  const { ativarToggleLateral, adicionaGrupo } = useList();

  function addElementoNoGrupo () {
      if (adicionaGrupo === false) {
          ativarToggleLateral("configs");
      }
  }

  const trocarLateral = (parametro: number) => {
    if (parametro === 2) {
        setIdTotal('');
        ativarToggleLateral('principal');
    } else if(parametro === 1 && config !== undefined) {
        setIdTotal(id);
        addElementoNoGrupo(); 
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

  function alterarTexto (event = {} as React.ChangeEvent<HTMLTextAreaElement>,) {
    setConfiguracoes(
      configuracoes.map(el => (el.id === id && el.config !== undefined
          ? {...el, config: 
            {...el.config, textoArea: event.target.value}}
          : el
      ))
    )       
  }

  return (
  <Draggable
    onStop={setarTransform}
    defaultPosition={{x: config?.x, y: config?.y}}
  >   
    <div>
      <DivElemento 
        ref={ref} 
        className="resizeable" 
        onClick={(e) => trocarLateral(e.detail)}
        opacity={config?.opacity}
        zIndex={config?.zIndex}
      >
        <TextareaAutosize
          aria-label="textarea vazio"
          value={config?.textoArea}
          onChange={(e) => alterarTexto(e)}
          style={{ 
            backgroundColor: config?.bgColor,
            width:config?.width,
            height:config?.height,
            fontSize:config?.fontSize,
            color: config?.fontColor,
          }}
        />
      </DivElemento>
      </div>
    </Draggable>
  )
});