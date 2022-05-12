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
}

export const Elemento = forwardRef<HTMLDivElement,  Props>(({ 
   id, 
   config,
}, ref ) => {
  const { setIdTotal, configuracoes, setConfiguracoes, statusEdicao } = useConfig();
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
      <DivElemento 
        ref={ref}
        className="resizeable" 
        onClick={(e) => (statusEdicao) && trocarLateral(e.detail)}
        opacity={config?.opacity}
        zIndex={config?.zIndex}
      > 
        <EstruturaTabela 
           width={config?.width}  
           height={config?.height}
           rows={config?.rows}
        />
      </DivElemento>
    </div>
  </Draggable>
  )
});