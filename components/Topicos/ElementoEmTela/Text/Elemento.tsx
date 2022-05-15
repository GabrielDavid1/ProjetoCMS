/* React */
import React, { forwardRef } from 'react';

/* Contexto */
import { useList } from '../../../../contexts/useTopicos';
import { useConfig } from '../../../../contexts/useConfig';

/* Tipagens */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';
let Draggable = require('react-draggable');

/* Div */
import Paragrafo from './Paragrafo';

interface Props {
    id: string;
    config?: Config;
}
// eslint-disable-next-line react/display-name
export const Elemento = forwardRef<HTMLDivElement, Props>(( { id, config }, ref ) => {
  const { setIdTotal, configuracoes, setConfiguracoes, statusEdicao } = useConfig();
  const { ativarToggleLateral, adicionaGrupo } = useList();

  function addElementoNoGrupo () {
    if (adicionaGrupo === false) {
        ativarToggleLateral('configs');
    }
  }

  const trocarLateral = (parametro: number) => {    
    if (parametro === 2) {
        setIdTotal(id);
        ativarToggleLateral('principal')
    } else {
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

  return (
  <Draggable
    disabled={!statusEdicao} 
    onStop={setarTransform}
    defaultPosition={{x: config?.x, y: config?.y}}
  >  
    <div>
      <Paragrafo 
          ref={ref} 
          onClick={(e) => (statusEdicao) && trocarLateral(e.detail)}
          display="none"
          bgColor={config?.bgColor}
          fontSize={config?.fontSize}
          fontFamily={config?.fontFamily}
          marginBlockStart = {config?.marginBlockStart}
          marginBlockEnd = {config?.marginBlockEnd}
          marginInlineStart = {config?.marginInlineStart}
          marginInlineEnd = {config?.marginInlineEnd}
          fontWeight = {config?.fontWeight}
          webkitTextStroke = {config?.webkitTextStroke}
          opacity={config?.opacity}
          zIndex={config?.zIndex}
        > 
          {config?.textoArea}
      </Paragrafo>
    </div>
    </Draggable>
  )
});