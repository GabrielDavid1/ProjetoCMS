/* React */
import React, { forwardRef } from 'react';

/* Contexto */
import { useList } from '../../../../contexts/useTopicos';
import { useConfig } from '../../../../contexts/useConfig';

/* Tipagens */
import { Config } from '../../../../Importacoes/Tipagens/Tipagem';

/* Componentes */
let Draggable = require('react-draggable');

/* Divs */
import DivElemento from './DivElemento';
import EstruturaTabela from './EstruturaTabela';


interface Props {
    id: string;
    config?: Config;
    estadoTransform: string;
}

export const Elemento = forwardRef<HTMLDivElement,  Props>(({ 
   id, 
   config,
   estadoTransform,
}, ref ) => {
  const { setIdTotal, configuracoes, setConfiguracoes } = useConfig();
  const { ativarToggleLateral, adicionaGrupo } = useList();

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
                {...el.config, transform:estadoTransform}}
              : el
          ))
        ) 
    }
  }

  return (
  <Draggable>  
      <DivElemento 
        ref={ref}
        className="resizeable" 
        onClick={(e) => trocarLateral(e.detail)}
        opacity={config?.opacity}
        zIndex={config?.zIndex}
      > 
        <EstruturaTabela 
           width={config?.width}  
           height={config?.height}
           rows={config?.rows}
        />
      </DivElemento>
    </Draggable>
  )
});