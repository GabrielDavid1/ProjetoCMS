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
    estadoTransform: string;
}

export const Elemento = forwardRef<HTMLDivElement, Props>(( {id, config, estadoTransform}, ref ) => {
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
        setConfiguracoes(
            configuracoes.map(el => (el.id === id && el.config !== undefined
                ? {...el, config: {...el.config, transform:estadoTransform}}
                : el
            ))
        ) 
    }
  }

  return (
  <Draggable>   
      <DivElemento 
          className="resizeable"  
          ref={ref} 
          onClick={(e) => trocarLateral(e.detail)}
          zIndex={config?.zIndex}
      >
       <InputTexto config={config} />
      </DivElemento>
    </Draggable>
  )
});