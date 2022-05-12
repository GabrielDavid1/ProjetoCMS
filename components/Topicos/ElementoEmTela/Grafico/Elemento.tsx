/* React */
import React, { useState, forwardRef, useEffect } from 'react';

/* Contexto */
import dynamic from 'next/dynamic';
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
    estado: boolean;
    setEstado: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr:false
});

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
   setEstado,
}, ref ) => {
  const { setIdTotal, configuracoes, setConfiguracoes, statusEdicao } = useConfig();
  const { ativarToggleLateral, adicionaGrupo } = useList();

  const [visibilidade, setVisibilidade] = useState(false);

  useEffect(() => {
    (statusEdicao === false) ? setEstado(true) : setEstado(false);
 }, [statusEdicao]);

  function addElementoNoGrupo () {
      if (adicionaGrupo === false) {
          ativarToggleLateral("configs");
      }
  }

  const trocarLateral = (parametro: number) => {
    (parseInt(width, 10) < 280) ? width = "280px" : width;
    (parseInt(height, 10) < 280) ? height = "235px" : height;

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
        onClick={(e) => (statusEdicao) && trocarLateral(e.detail)}
        width={config?.width}
        height={config?.height}
        opacity={config?.opacity}
        zIndex={config?.zIndex}
      >
        <Chart 
           type="area" 
           options={config?.options} 
           series={config?.series} 
           width={config?.width}
           height={config?.height}
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