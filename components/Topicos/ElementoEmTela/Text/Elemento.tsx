/* React */
import React, { forwardRef } from 'react';

/* Contexto */
import { useList } from '../../../../contexts/useTopicos';
import { useConfig } from '../../../../contexts/useConfig';

/* Tipagens */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';
let Draggable = require('react-draggable');

/* Divs */
import DivElemento from './DivElemento';
import { InputTexto } from './InputTexto';

interface Props {
    id: string;
    config?: Config;
}

export const Elemento = forwardRef<HTMLDivElement, Props>(( { id, config }, ref ) => {
  const { setIdTotal, configuracoes, setConfiguracoes } = useConfig();
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
    onStop={setarTransform}
    defaultPosition={{x: config?.x, y: config?.y}}
  >  
    <div>
      <DivElemento 
          className="resizeable"  
          ref={ref} 
          onClick={(e) => trocarLateral(e.detail)}
      >
       <InputTexto config={config} />
      </DivElemento>
    </div>
    </Draggable>
  )
});